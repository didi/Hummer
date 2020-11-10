package com.didi.hummer.render.component.view;

import android.content.Context;
import android.graphics.Color;
import android.graphics.Rect;
import android.os.Looper;
import android.support.v4.view.ViewCompat;
import android.text.TextUtils;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.ScaleGestureDetector;
import android.view.View;
import android.widget.Button;

import com.didi.hummer.annotation.JsAttribute;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.lifecycle.ILifeCycle;
import com.didi.hummer.render.component.anim.BasicAnimation;
import com.didi.hummer.render.event.EventManager;
import com.didi.hummer.render.event.base.Event;
import com.didi.hummer.render.event.base.TraceEvent;
import com.didi.hummer.render.event.guesture.LongPressEvent;
import com.didi.hummer.render.event.guesture.PanEvent;
import com.didi.hummer.render.event.guesture.PinchEvent;
import com.didi.hummer.render.event.guesture.SwipeEvent;
import com.didi.hummer.render.event.guesture.TapEvent;
import com.didi.hummer.render.event.guesture.TouchEvent;
import com.didi.hummer.render.event.guesture.common.GestureUtils;
import com.didi.hummer.render.style.HummerLayoutExtendUtils;
import com.didi.hummer.render.style.HummerNode;
import com.didi.hummer.render.style.HummerStyleUtils;
import com.didi.hummer.render.utility.DPUtil;
import com.didi.hummer.render.utility.YogaAttrUtils;
import com.didi.hummer.tools.EventTracer;
import com.facebook.yoga.YogaNode;
import com.facebook.yoga.YogaPositionType;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * @author: linjizong
 * @date: 2019/4/23
 * @desc:
 */
public abstract class HMBase<T extends View> implements ILifeCycle {
    private HummerContext context;
    private T mTargetView;
    protected HummerNode hummerNode;
    private Map<String, BasicAnimation> animMap = new HashMap<>();
    protected BackgroundHelper backgroundHelper;
    protected EventManager mEventManager;
    private GestureDetector mGestureDetector;
    private ScaleGestureDetector mScaleGestureDetector;
    private MotionEvent mLatestMotionEvent;
    protected JSValue mJSValue;
    private InlineBox inlineBox;
    private PositionChangedListener positionChangedListener;
    private DisplayChangedListener displayChangedListener;
    private HummerLayoutExtendUtils.Position position = HummerLayoutExtendUtils.Position.YOGA;
    private HummerLayoutExtendUtils.Display display = HummerLayoutExtendUtils.Display.YOGA;

    public HMBase(HummerContext context, JSValue jsValue, String viewID) {
        this.context = context;
        mJSValue = jsValue;
        mTargetView = createView(context.getContext());
        hummerNode = new HummerNode(this, viewID);
        backgroundHelper = new BackgroundHelper(context, getView());
    }

    @Override
    public void onCreate() {
        mEventManager = new EventManager();
        mEventManager.onCreate();

        if (Looper.getMainLooper().getThread() == Thread.currentThread()) {
            initViewGestureEvent();
        } else {
            getView().post(this::initViewGestureEvent);
        }
    }

    @Override
    public void onDestroy() {
        if (mEventManager != null) {
            mEventManager.onDestroy();
        }

        if (animMap != null) {
            animMap.clear();
            animMap = null;
        }
    }

    public JSValue getJSValue() {
        return mJSValue;
    }

    public String getViewID() {
        return hummerNode.getNodeId();
    }

    public YogaNode getYogaNode() {
        return hummerNode.getYogaNode();
    }

    public HummerNode getNode() {
        return hummerNode;
    }

    private final T createView(Context context) {
        T view = createViewInstance(context);
        if (view == null) {
            throw new RuntimeException("createViewInstance must return a view");
        }
        return view;
    }

    protected abstract T createViewInstance(Context context);

    public T getView() {
        return mTargetView;
    }

    @JsProperty("style")
    public Map<String, Object> style;

    public void setStyle(Map<String, Object> style) {
        this.style = style;
        hummerNode.setStyle(style);
        onStyleUpdated(style);
    }

    protected void onStyleUpdated(Map<String, Object> newStyle) {
    }

    public BackgroundHelper getBackgroundHelper() {
        return backgroundHelper;
    }

    /**
     * 是否不响应交互事件
     */
    @JsProperty("enabled")
    public boolean enabled;

    public void setEnabled(boolean enabled) {
        getView().setEnabled(enabled);
    }

    public boolean getEnabled() {
        return enabled;
    }

    @JsMethod("addEventListener")
    public void addEventListener(String eventName, JSCallback callback) {
        mEventManager.addEventListener(eventName, callback);

        // Button控件单独设置单击和长按事件，为了使按钮按压状态不失效
        if (mTargetView instanceof Button) {
            getView().setOnClickListener((v) -> {
                // 埋点
                Map<String, Object> params = TraceEvent.makeTraceGestureEvent(Event.HM_EVENT_TYPE_TAP, this);
                EventTracer.traceEvent(context.getNamespace(), params);

                if (mEventManager.contains(Event.HM_EVENT_TYPE_TAP)) {
                    TapEvent event = new TapEvent();
                    event.setType(Event.HM_EVENT_TYPE_TAP);
                    event.setPosition(GestureUtils.findPositionInMotionEvent(null));
                    event.setTimestamp(System.currentTimeMillis());
                    event.setState(GestureUtils.findStateInMotionEvent(null));
                    event.setTarget(mJSValue);
                    mEventManager.dispatchEvent(Event.HM_EVENT_TYPE_TAP, event);
                }
            });
        }
    }

    @JsMethod("removeEventListener")
    public void removeEventListener(String eventName, JSCallback callback) {
        if (callback == null) {
            mEventManager.clearEventListeners(eventName);
        } else {
            mEventManager.removeEventListener(eventName, callback);
        }
    }

    private void initViewGestureEvent() {
        if (mTargetView instanceof Button) {
            return;
        }
        mGestureDetector = new GestureDetector(context, new GestureDetector.OnGestureListener() {
            private float startY;
            private float startX;

            @Override
            public boolean onDown(MotionEvent e) {
                // 埋点
                Map<String, Object> params = TraceEvent.makeTraceGestureEvent(Event.HM_EVENT_TYPE_PAN, HMBase.this);
                EventTracer.traceEvent(context.getNamespace(), params);

                startX = e.getRawX();
                startY = e.getRawY();
                if (mEventManager.contains(Event.HM_EVENT_TYPE_PAN)) {
                    PanEvent event = new PanEvent();
                    event.setType(Event.HM_EVENT_TYPE_PAN);
                    event.setTimestamp(System.currentTimeMillis());
                    event.setState(Event.HM_GESTURE_STATE_BEGAN);
                    mEventManager.dispatchEvent(Event.HM_EVENT_TYPE_PAN, event);
                }
                return true;
            }

            @Override
            public void onShowPress(MotionEvent e) {
            }

            @Override
            public boolean onSingleTapUp(MotionEvent e) {
                // 埋点
                Map<String, Object> params = TraceEvent.makeTraceGestureEvent(Event.HM_EVENT_TYPE_TAP, HMBase.this);
                EventTracer.traceEvent(context.getNamespace(), params);

                if (mEventManager.contains(Event.HM_EVENT_TYPE_TAP)) {
                    TapEvent event = new TapEvent();
                    event.setType(Event.HM_EVENT_TYPE_TAP);
                    event.setPosition(GestureUtils.findPositionInMotionEvent(e));
                    event.setTimestamp(System.currentTimeMillis());
                    event.setState(GestureUtils.findStateInMotionEvent(e));
                    event.setTarget(mJSValue);
                    mEventManager.dispatchEvent(Event.HM_EVENT_TYPE_TAP, event);
                }
                return false;
            }

            @Override
            public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX, float distanceY) {
                if (mEventManager.contains(Event.HM_EVENT_TYPE_PAN)) {
                    if (e2.getAction() == MotionEvent.ACTION_MOVE) {
                        PanEvent event = new PanEvent();
                        //获取移动后的坐标
                        int moveX = (int) e2.getRawX();
                        int moveY = (int) e2.getRawY();

                        event.setType(Event.HM_EVENT_TYPE_PAN);
                        event.setTimestamp(System.currentTimeMillis());
                        event.setTranslation(GestureUtils.findTranslationInMotionEvent(
                                DPUtil.px2dp(context, moveX - startX), DPUtil.px2dp(context, moveY - startY)));
                        event.setState(Event.HM_GESTURE_STATE_CHANGED);
                        mEventManager.dispatchEvent(Event.HM_EVENT_TYPE_PAN, event);
                        startX = moveX;
                        startY = moveY;
                    }
                }
                return true;
            }

            @Override
            public void onLongPress(MotionEvent e) {
                // 埋点
                Map<String, Object> params = TraceEvent.makeTraceGestureEvent(Event.HM_EVENT_TYPE_LONG_PRESS, HMBase.this);
                EventTracer.traceEvent(context.getNamespace(), params);

                if (mEventManager.contains(Event.HM_EVENT_TYPE_LONG_PRESS)) {
                    LongPressEvent event = new LongPressEvent();
                    event.setType(Event.HM_EVENT_TYPE_LONG_PRESS);
                    event.setPosition(GestureUtils.findPositionInMotionEvent(e));
                    event.setTimestamp(System.currentTimeMillis());
                    event.setState(GestureUtils.findStateInMotionEvent(e));
                    event.setTarget(mJSValue);
                    mEventManager.dispatchEvent(Event.HM_EVENT_TYPE_LONG_PRESS, event);
                }
            }

            @Override
            public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
                if (mEventManager.contains(Event.HM_EVENT_TYPE_SWIPE)) {
                    SwipeEvent event = new SwipeEvent();
                    event.setType(Event.HM_EVENT_TYPE_SWIPE);
                    event.setTimestamp(System.currentTimeMillis());

                    float minMove = 120;        //最小滑动距离
                    float minVelocity = 0;      //最小滑动速度
                    float beginX = e1.getX();
                    float endX = e2.getX();
                    float beginY = e1.getY();
                    float endY = e2.getY();

                    if (beginX - endX > minMove && Math.abs(velocityX) > minVelocity) {   //左滑
                        event.setDirection(SwipeEvent.DIRECTION_LEFT);
                    } else if (endX - beginX > minMove && Math.abs(velocityX) > minVelocity) {   //右滑
                        event.setDirection(SwipeEvent.DIRECTION_RIGHT);
                    } else if (beginY - endY > minMove && Math.abs(velocityY) > minVelocity) {   //上滑
                        event.setDirection(SwipeEvent.DIRECTION_UP);
                    } else if (endY - beginY > minMove && Math.abs(velocityY) > minVelocity) {   //下滑
                        event.setDirection(SwipeEvent.DIRECTION_DOWN);
                    }

                    event.setState(Event.HM_GESTURE_STATE_CHANGED);

                    if (e1.getAction() == MotionEvent.ACTION_DOWN) {
                        event.setState(Event.HM_GESTURE_STATE_BEGAN);
                    }

                    if (e2.getAction() == MotionEvent.ACTION_MOVE) {
                        event.setState(Event.HM_GESTURE_STATE_CHANGED);
                    } else if (e2.getAction() == MotionEvent.ACTION_UP) {
                        event.setState(Event.HM_GESTURE_STATE_ENDED);
                    } else if (e2.getAction() == MotionEvent.ACTION_CANCEL) {
                        event.setState(Event.HM_GESTURE_STATE_CANCELLED);
                    }
                    mEventManager.dispatchEvent(Event.HM_EVENT_TYPE_SWIPE, event);
                }
                return false;
            }
        });

        mScaleGestureDetector = new ScaleGestureDetector(context, new ScaleGestureDetector.SimpleOnScaleGestureListener() {
            @Override
            public boolean onScale(ScaleGestureDetector detector) {
                if (mEventManager.contains(Event.HM_EVENT_TYPE_PINCH)) {
                    // 控制缩放的最大值
                    final float scale = Math.max(0.1f, Math.min(detector.getScaleFactor(), 5.0f));
                    PinchEvent event = new PinchEvent();
                    event.setType(Event.HM_EVENT_TYPE_PINCH);
                    event.setScale(scale);
                    event.setTimestamp(System.currentTimeMillis());
                    event.setState(GestureUtils.findStateInMotionEvent(mLatestMotionEvent));
                    mEventManager.dispatchEvent(Event.HM_EVENT_TYPE_PINCH, event);
                }
                return true;
            }
        });

        mTargetView.setOnTouchListener((v, event) -> {
            if (mEventManager != null && mEventManager.hasBasicTouchEvent()) {
                mLatestMotionEvent = event;
                mScaleGestureDetector.onTouchEvent(event);
                mGestureDetector.onTouchEvent(event);

                // 处理touch事件
                if (mEventManager.contains(Event.HM_EVENT_TYPE_TOUCH)) {
                    TouchEvent touchEvent = new TouchEvent();
                    touchEvent.setType(Event.HM_EVENT_TYPE_TOUCH);
                    touchEvent.setPosition(GestureUtils.findPositionInMotionEvent(event));
                    touchEvent.setTimestamp(System.currentTimeMillis());

                    switch (event.getAction()) {
                        case MotionEvent.ACTION_DOWN: {
                            touchEvent.setState(Event.HM_GESTURE_STATE_BEGAN);
                            break;
                        }
                        case MotionEvent.ACTION_MOVE: {
                            touchEvent.setState(Event.HM_GESTURE_STATE_CHANGED);
                            break;
                        }
                        case MotionEvent.ACTION_UP: {
                            touchEvent.setState(Event.HM_GESTURE_STATE_ENDED);
                            break;
                        }
                        case MotionEvent.ACTION_CANCEL: {
                            touchEvent.setState(Event.HM_GESTURE_STATE_CANCELLED);
                            break;
                        }
                        default:
                            break;
                    }
                    mEventManager.dispatchEvent(Event.HM_EVENT_TYPE_TOUCH, touchEvent);
                }

                // pan的end事件，只能放在这里触发
                if (mEventManager.contains(Event.HM_EVENT_TYPE_PAN) &&
                        (event.getAction() == MotionEvent.ACTION_UP
                                || event.getAction() == MotionEvent.ACTION_CANCEL)) {
                    PanEvent e = new PanEvent();
                    e.setType(Event.HM_EVENT_TYPE_PAN);
                    e.setTimestamp(System.currentTimeMillis());
                    e.setState(Event.HM_GESTURE_STATE_ENDED);
                    mEventManager.dispatchEvent(Event.HM_EVENT_TYPE_PAN, e);
                }

                return true;
            }
            return false;
        });
    }

    @JsMethod("addAnimation")
    public void addAnimation(BasicAnimation anim, String id) {
        animMap.put(id, anim);
        anim.start(this);
    }

    @JsMethod("removeAnimationForKey")
    public void removeAnimationForKey(String id) {
        if (animMap.containsKey(id)) {
            BasicAnimation anim = animMap.get(id);
            anim.stop();
            animMap.remove(id);
        }
    }

    @JsMethod("removeAllAnimation")
    public void removeAllAnimation() {
        Iterator<Map.Entry<String, BasicAnimation>> iterator = animMap.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, BasicAnimation> entry = iterator.next();
            BasicAnimation animation = entry.getValue();
            animation.stop();
            iterator.remove();
        }
    }

    @JsMethod("getViewRect")
    public void getViewRect(JSCallback callback) {
        if (callback == null) {
            return;
        }

        getView().post(() -> {
            Rect rect = new Rect();
            getView().getHitRect(rect);
            Map<String, Integer> values = new HashMap<>();
            values.put("width", DPUtil.px2dp(context, getView().getWidth()));
            values.put("height", DPUtil.px2dp(context, getView().getHeight()));
            values.put("left", DPUtil.px2dp(context, rect.left));
            values.put("right", DPUtil.px2dp(context, rect.right));
            values.put("top", DPUtil.px2dp(context, rect.top));
            values.put("bottom", DPUtil.px2dp(context, rect.bottom));
            callback.call(values);
        });
    }

    @JsMethod("resetStyle")
    public void resetStyle() {
        hummerNode.resetStyle();
        setBackgroundColor(Color.TRANSPARENT);
        setBackgroundImage(null);
        setBorderWidth(0);
        setBorderColor(Color.TRANSPARENT);
        setBorderRadius(0);
        setBorderStyle(null);
        setShadow(null);
        setOpacity(1);
        setVisibility(VISIBILITY_VISIBLE);
    }

    public static final String VISIBILITY_VISIBLE = "visible";
    public static final String VISIBILITY_HIDDEN = "hidden";

    @JsAttribute("visibility")
    public void setVisibility(String hidden) {
        getView().setVisibility(VISIBILITY_HIDDEN.equals(hidden) ? View.INVISIBLE : View.VISIBLE);
    }

    @JsAttribute("backgroundColor")
    public void setBackgroundColor(Object color) {
        backgroundHelper.setBackgroundColor(color);
    }

    @JsAttribute("backgroundImage")
    public void setBackgroundImage(String image) {
        backgroundHelper.setBackgroundImage(image);
    }

    @JsAttribute("borderStyle")
    public void setBorderStyle(String style) {
        backgroundHelper.setBorderStyle(style);
    }

    @JsAttribute("borderLeftStyle")
    public void setBorderLeftStyle(String style) {
        backgroundHelper.setBorderLeftStyle(style);
    }

    @JsAttribute("borderTopStyle")
    public void setBorderTopStyle(String style) {
        backgroundHelper.setBorderTopStyle(style);
    }

    @JsAttribute("borderRightStyle")
    public void setBorderRightStyle(String style) {
        backgroundHelper.setBorderRightStyle(style);
    }

    @JsAttribute("borderBottomStyle")
    public void setBorderBottomStyle(String style) {
        backgroundHelper.setBorderBottomStyle(style);
    }

    @JsAttribute("borderWidth")
    public void setBorderWidth(float width) {
        backgroundHelper.setBorderWidth(width);
    }

    @JsAttribute("borderLeftWidth")
    public void setBorderLeftWidth(float width) {
        backgroundHelper.setBorderLeftWidth(width);
    }

    @JsAttribute("borderTopWidth")
    public void setBorderTopWidth(float width) {
        backgroundHelper.setBorderTopWidth(width);
    }

    @JsAttribute("borderRightWidth")
    public void setBorderRightWidth(float width) {
        backgroundHelper.setBorderRightWidth(width);
    }

    @JsAttribute("borderBottomWidth")
    public void setBorderBottomWidth(float width) {
        backgroundHelper.setBorderBottomWidth(width);
    }

    @JsAttribute("borderColor")
    public void setBorderColor(int color) {
        backgroundHelper.setBorderColor(color);
    }

    @JsAttribute("borderLeftColor")
    public void setBorderLeftColor(int color) {
        backgroundHelper.setBorderLeftColor(color);
    }

    @JsAttribute("borderTopColor")
    public void setBorderTopColor(int color) {
        backgroundHelper.setBorderTopColor(color);
    }

    @JsAttribute("borderRightColor")
    public void setBorderRightColor(int color) {
        backgroundHelper.setBorderRightColor(color);
    }

    @JsAttribute("borderBottomColor")
    public void setBorderBottomColor(int color) {
        backgroundHelper.setBorderBottomColor(color);
    }

    @JsAttribute("borderRadius")
    public void setBorderRadius(Object radius) {
        if (HummerStyleUtils.isPercentValue(radius)) {
            backgroundHelper.setBorderRadiusPercent(HummerStyleUtils.toPercent(radius));
        } else if (radius instanceof Float) {
            backgroundHelper.setBorderRadius((float) radius);
        }
    }

    @JsAttribute("borderTopLeftRadius")
    public void setBorderTopLeftRadius(Object radius) {
        if (HummerStyleUtils.isPercentValue(radius)) {
            backgroundHelper.setBorderTopLeftRadiusPercent(HummerStyleUtils.toPercent(radius));
        } else if (radius instanceof Float) {
            backgroundHelper.setBorderTopLeftRadius((float) radius);
        }
    }

    @JsAttribute("borderTopRightRadius")
    public void setBorderTopRightRadius(Object radius) {
        if (HummerStyleUtils.isPercentValue(radius)) {
            backgroundHelper.setBorderTopRightRadiusPercent(HummerStyleUtils.toPercent(radius));
        } else if (radius instanceof Float) {
            backgroundHelper.setBorderTopRightRadius((float) radius);
        }
    }

    @JsAttribute("borderBottomRightRadius")
    public void setBorderBottomRightRadius(Object radius) {
        if (HummerStyleUtils.isPercentValue(radius)) {
            backgroundHelper.setBorderBottomRightRadiusPercent(HummerStyleUtils.toPercent(radius));
        } else if (radius instanceof Float) {
            backgroundHelper.setBorderBottomRightRadius((float) radius);
        }
    }

    @JsAttribute("borderBottomLeftRadius")
    public void setBorderBottomLeftRadius(Object radius) {
        if (HummerStyleUtils.isPercentValue(radius)) {
            backgroundHelper.setBorderBottomLeftRadiusPercent(HummerStyleUtils.toPercent(radius));
        } else if (radius instanceof Float) {
            backgroundHelper.setBorderBottomLeftRadius((float) radius);
        }
    }

    @JsAttribute("shadow")
    public void setShadow(String shadow) {
        if (TextUtils.isEmpty(shadow)) {
            return;
        }

        String[] parts = shadow.split(" ");
        if (parts.length != 4) {
            return;
        }

        float[] values = new float[3];
        for (int i = 0; i < 3; i++) {
            values[i] = HummerStyleUtils.convertNumber(parts[i]);
        }

        int color = YogaAttrUtils.parseColor(parts[3]);

        backgroundHelper.setShadow(values[2], values[0], values[1], color);
    }

    @JsAttribute("opacity")
    public void setOpacity(float opacity) {
        getView().setAlpha(opacity);
    }

    @JsAttribute("zIndex")
    public void setZIndex(int zIndex) {
        ViewCompat.setElevation(getView(), zIndex);
    }

    public HummerLayoutExtendUtils.Position getPosition() {
        return position;
    }

    public HummerLayoutExtendUtils.Display getDisplay() {
        return display;
    }

    public void setInlineBox(InlineBox hmBase) {
        inlineBox = hmBase;
    }

    public InlineBox getInlineBox() {
        return inlineBox;
    }

    public void setPositionChangedListener(PositionChangedListener listener) {
        positionChangedListener = listener;
    }

    public void setDisplayChangedListener(DisplayChangedListener listener) {
        displayChangedListener = listener;
    }

    public Context getContext() {
        return context;
    }

    public boolean setStyle(String key, Object value) {
        return false;
    }

    public final boolean setHummerStyle(String key, Object value) {
        if (TextUtils.isEmpty(key) || value == null) {
            return false;
        }

        if (setStyle(key, value)) {
            return true;
        }

        switch (key) {
            case HummerStyleUtils.Hummer.BACKGROUND_COLOR:
                setBackgroundColor(value);
                break;
            case HummerStyleUtils.Hummer.BACKGROUND_IMAGE:
                setBackgroundImage(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.BORDER_STYLE:
                setBorderStyle(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.BORDER_STYLE_L:
                setBorderLeftStyle(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.BORDER_STYLE_T:
                setBorderTopStyle(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.BORDER_STYLE_R:
                setBorderRightStyle(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.BORDER_STYLE_B:
                setBorderBottomStyle(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.BORDER_WIDTH:
                setBorderWidth((float) value);
                break;
            case HummerStyleUtils.Hummer.BORDER_WIDTH_L:
                setBorderLeftWidth((float) value);
                break;
            case HummerStyleUtils.Hummer.BORDER_WIDTH_T:
                setBorderTopWidth((float) value);
                break;
            case HummerStyleUtils.Hummer.BORDER_WIDTH_R:
                setBorderRightWidth((float) value);
                break;
            case HummerStyleUtils.Hummer.BORDER_WIDTH_B:
                setBorderBottomWidth((float) value);
                break;
            case HummerStyleUtils.Hummer.BORDER_COLOR:
                setBorderColor((int) value);
                break;
            case HummerStyleUtils.Hummer.BORDER_COLOR_L:
                setBorderLeftColor((int) value);
                break;
            case HummerStyleUtils.Hummer.BORDER_COLOR_T:
                setBorderTopColor((int) value);
                break;
            case HummerStyleUtils.Hummer.BORDER_COLOR_R:
                setBorderRightColor((int) value);
                break;
            case HummerStyleUtils.Hummer.BORDER_COLOR_B:
                setBorderBottomColor((int) value);
                break;
            case HummerStyleUtils.Hummer.BORDER_RADIUS:
                setBorderRadius(value);
                break;
            case HummerStyleUtils.Hummer.BORDER_RADIUS_TL:
                setBorderTopLeftRadius(value);
                break;
            case HummerStyleUtils.Hummer.BORDER_RADIUS_TR:
                setBorderTopRightRadius(value);
                break;
            case HummerStyleUtils.Hummer.BORDER_RADIUS_BR:
                setBorderBottomRightRadius(value);
                break;
            case HummerStyleUtils.Hummer.BORDER_RADIUS_BL:
                setBorderBottomLeftRadius(value);
                break;
            case HummerStyleUtils.Hummer.SHADOW:
                setShadow(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.OPACITY:
                setOpacity((float) value);
                break;
            case HummerStyleUtils.Hummer.VISIBILITY:
                setVisibility(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.Z_INDEX:
                setZIndex((int) (float) value);
                break;
            case HummerStyleUtils.Hummer.POSITION:
            case HummerStyleUtils.Hummer.POSITION_TYPE:
                if (HummerLayoutExtendUtils.Position.FIXED.value().equals(value)) {
                    getYogaNode().setPositionType(YogaPositionType.ABSOLUTE);
                }
                return setPosition((String) value);
            case HummerStyleUtils.Hummer.DISPLAY:
                if (HummerLayoutExtendUtils.Display.BLOCK.value().equals(value)
                        || HummerLayoutExtendUtils.Display.INLINE.value().equals(value)
                        || HummerLayoutExtendUtils.Display.INLINE_BLOCK.value().equals(value)) {
                    HummerLayoutExtendUtils.markExtendCssView(this);
                }
                HummerLayoutExtendUtils.applyDisplayStyle(this, (String) value);
                return setDisplay((String) value);
            default:
                return false;
        }
        return true;
    }

    private boolean setPosition(String value) {
        HummerLayoutExtendUtils.Position resultPosition = HummerLayoutExtendUtils.Position.YOGA;
        if (HummerLayoutExtendUtils.Position.FIXED.value().equals(value)) {
            resultPosition = HummerLayoutExtendUtils.Position.FIXED;
        }
        if (resultPosition != position) {
            if (positionChangedListener != null) {
                positionChangedListener.dispatchChildPositionChanged(this, position, resultPosition);
            }
        }
        position = resultPosition;
        return resultPosition != HummerLayoutExtendUtils.Position.YOGA;
    }

    private boolean setDisplay(String value) {
        HummerLayoutExtendUtils.Display resultDisplay = HummerLayoutExtendUtils.Display.YOGA;
        if (HummerLayoutExtendUtils.Display.BLOCK.value().equals(value)) {
            resultDisplay = HummerLayoutExtendUtils.Display.BLOCK;
        }
        if (HummerLayoutExtendUtils.Display.INLINE.value().equals(value)) {
            resultDisplay = HummerLayoutExtendUtils.Display.INLINE;
        }
        if (HummerLayoutExtendUtils.Display.INLINE_BLOCK.value().equals(value)) {
            resultDisplay = HummerLayoutExtendUtils.Display.INLINE_BLOCK;
        }
        if (resultDisplay != display) {
            if (displayChangedListener != null) {
                displayChangedListener.dispatchChildDisplayChanged(this, display, resultDisplay);
            }
        }
        display = resultDisplay;
        return resultDisplay != HummerLayoutExtendUtils.Display.YOGA;
    }

    public interface PositionChangedListener {

        /**
         * 子元素 position 改变时 触发
         */
        void dispatchChildPositionChanged(HMBase child,
                                          HummerLayoutExtendUtils.Position origin,
                                          HummerLayoutExtendUtils.Position replace);
    }

    public interface DisplayChangedListener {

        /**
         * 子元素 display 改变时 触发
         */
        void dispatchChildDisplayChanged(HMBase child,
                                         HummerLayoutExtendUtils.Display origin,
                                         HummerLayoutExtendUtils.Display replace);
    }
}
