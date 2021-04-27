package com.didi.hummer.render.component.view;

import android.animation.ObjectAnimator;
import android.animation.PropertyValuesHolder;
import android.content.Context;
import android.content.res.Resources;
import android.graphics.Color;
import android.graphics.Rect;
import android.support.v4.view.AccessibilityDelegateCompat;
import android.support.v4.view.ViewCompat;
import android.support.v4.view.accessibility.AccessibilityNodeInfoCompat;
import android.text.TextUtils;
import android.view.View;
import android.view.accessibility.AccessibilityEvent;

import com.didi.hummer.annotation.JsAttribute;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.lifecycle.ILifeCycle;
import com.didi.hummer.render.component.anim.AnimViewWrapper;
import com.didi.hummer.render.component.anim.BasicAnimation;
import com.didi.hummer.render.component.anim.HummerAnimationUtils;
import com.didi.hummer.render.component.anim.Transition;
import com.didi.hummer.render.event.EventManager;
import com.didi.hummer.render.style.HummerLayoutExtendUtils;
import com.didi.hummer.render.style.HummerNode;
import com.didi.hummer.render.style.HummerStyleUtils;
import com.didi.hummer.render.utility.DPUtil;
import com.didi.hummer.render.utility.YogaAttrUtils;
import com.didi.hummer.sdk.R;
import com.facebook.yoga.YogaNode;
import com.facebook.yoga.YogaPositionType;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
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
    protected HMGestureEventDetector hmGestureEventDetector;
    protected JSValue mJSValue;
    private InlineBox inlineBox;
    private PositionChangedListener positionChangedListener;
    private DisplayChangedListener displayChangedListener;
    private HummerLayoutExtendUtils.Position position = HummerLayoutExtendUtils.Position.YOGA;
    private HummerLayoutExtendUtils.Display display = HummerLayoutExtendUtils.Display.YOGA;
    private AnimViewWrapper animViewWrapper;

    public HMBase(HummerContext context, JSValue jsValue, String viewID) {
        this.context = context;
        mJSValue = jsValue;
        mTargetView = createView(context.getContext());
        hummerNode = new HummerNode(this, viewID);
        backgroundHelper = new BackgroundHelper(context, mTargetView);
        animViewWrapper = new AnimViewWrapper(this);

        ViewCompat.setAccessibilityDelegate(mTargetView, new AccessibilityDelegateCompat() {
            @Override
            public void onInitializeAccessibilityNodeInfo(View host, AccessibilityNodeInfoCompat info) {
                super.onInitializeAccessibilityNodeInfo(host, info);
                // 处理 accessibilityLabel 和 accessibilityHint
                List<String> contents = new ArrayList<>();
                if (accessibilityLabel != null) {
                    contents.add(accessibilityLabel);
                }
                if (accessibilityHint != null) {
                    if (accessibilityLabel == null && info.getText() != null) {
                        contents.add(info.getText().toString());
                    }
                    contents.add(accessibilityHint);
                }
                if (!contents.isEmpty()) {
                    info.setContentDescription(TextUtils.join(", ", contents));
                }

                // 处理 accessibilityRole
                if (accessibilityRole != null) {
                    info.setRoleDescription(accessibilityRole);
                }

                // 处理 accessibilityState
                if (accessibilityState != null) {
                    for (String key : accessibilityState.keySet()) {
                        Object value = accessibilityState.get(key);
                        if ("selected".equalsIgnoreCase(key)) {
                            if (value instanceof Boolean) {
                                info.setSelected((Boolean) value);
                            }
                        } else if ("disabled".equalsIgnoreCase(key)) {
                            if (value instanceof Boolean) {
                                info.setEnabled(!(Boolean) value);
                            }
                        }
                    }
                }
            }
        });
    }

    @Override
    public void onCreate() {
        mEventManager = new EventManager();
        mEventManager.onCreate();
        hmGestureEventDetector = new HMGestureEventDetector(this);
    }

    @Override
    public void onDestroy() {
        if (animMap != null) {
            animMap.clear();
            animMap = null;
        }
        if (mEventManager != null) {
            /**
             * 当JSCallback正在被调用的生命周期中，触发了控件回收时，也会到这里onDestroy中，这时JSCallback不能被释放，会有野指针问题，
             * 所以用post到下一个消息事件中处理，这样就可以走完当前JSCallback了。
             *
             * 示例代码：
             * let callback = () => {
             *     console.log("222");
             * }
             * let layout = new View();
             * let view = new View();
             * view.style = {
             *     width: 100,
             *     height: 100,
             *     backgroundColor: '#FF000022',
             * }
             * view.addEventListener('tap', () => {
             *     layout.removeAll();  // 这一步会释放view，连带会释放EventListener
             *     console.log('111');
             *
             *     callback(); // !!这一步会挂，因为当前EventListener已经被回收了
             * });
             * layout.appendChild(view);
             */
            getView().post(() -> mEventManager.onDestroy());
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

    public AnimViewWrapper getAnimViewWrapper() {
        return animViewWrapper;
    }

    public EventManager getEventManager() {
        return mEventManager;
    }

    @JsProperty("style")
    public Map<String, Object> style = new HashMap<>();

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
        return getView().isEnabled();
    }

    /**
     * 是否响应无障碍焦点（Image/Text/Button等叶子节点默认是true，其余容器组件默认是false）
     */
    @JsProperty("accessible")
    public boolean accessible;
    public void setAccessible(boolean accessible) {
        getView().setImportantForAccessibility(accessible ? View.IMPORTANT_FOR_ACCESSIBILITY_YES : View.IMPORTANT_FOR_ACCESSIBILITY_NO);
    }

    /**
     * 无障碍标签
     */
    @JsProperty("accessibilityLabel")
    public String accessibilityLabel;
    public void setAccessibilityLabel(String label) {
        accessibilityLabel = label;
    }

    /**
     * 无障碍提示
     */
    @JsProperty("accessibilityHint")
    public String accessibilityHint;
    public void setAccessibilityHint(String hint) {
        accessibilityHint = hint;
    }

    /**
     * 无障碍角色
     *
     * 目前支持以下几种角色：
     * none "" （没有角色）
     * text "文本"
     * button "按钮"
     * image "图片"
     * switch "开关"
     * input "输入框"
     * link "链接"
     * search "搜索框"
     * key "键盘"
     */
    @JsProperty("accessibilityRole")
    public String accessibilityRole;
    public void setAccessibilityRole(String role) {
        Resources r = getContext().getResources();
        if ("none".equalsIgnoreCase(role)) {
            accessibilityRole = "";
        } else if ("text".equalsIgnoreCase(role)) {
            accessibilityRole = r.getString(R.string.accessibility_role_text);
        } else if ("button".equalsIgnoreCase(role)) {
            accessibilityRole = r.getString(R.string.accessibility_role_button);
        } else if ("image".equalsIgnoreCase(role)) {
            accessibilityRole = r.getString(R.string.accessibility_role_image);
        } else if ("switch".equalsIgnoreCase(role)) {
            accessibilityRole = r.getString(R.string.accessibility_role_switch);
        } else if ("input".equalsIgnoreCase(role)) {
            accessibilityRole = r.getString(R.string.accessibility_role_input);
        } else if ("link".equalsIgnoreCase(role)) {
            accessibilityRole = r.getString(R.string.accessibility_role_link);
        } else if ("search".equalsIgnoreCase(role)) {
            accessibilityRole = r.getString(R.string.accessibility_role_search);
        } else if ("key".equalsIgnoreCase(role)) {
            accessibilityRole = r.getString(R.string.accessibility_role_key);
        } else {
            accessibilityRole = role;
        }
    }

    /**
     * 无障碍状态
     *
     * 目前支持以下几种状态：
     * selected
     * disabled
     */
    @JsProperty("accessibilityState")
    public Map<String, Object> accessibilityState;
    public void setAccessibilityState(Map<String, Object> state) {
        accessibilityState = state;
        if (accessibilityState != null) {
            for (String key : accessibilityState.keySet()) {
                Object value = accessibilityState.get(key);
                if ("selected".equalsIgnoreCase(key)) {
                    if (value instanceof Boolean && (Boolean) value) {
                        // 直接send在某些机型上会不起作用，所以这里加一个post
                        getView().post(() -> getView().sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_ACCESSIBILITY_FOCUSED));
                    }
                }
            }
        }
    }

    @JsMethod("addEventListener")
    public void addEventListener(String eventName, JSCallback callback) {
        mEventManager.addEventListener(eventName, callback);
        hmGestureEventDetector.initClickListener(eventName);
    }

    @JsMethod("removeEventListener")
    public void removeEventListener(String eventName, JSCallback callback) {
        if (callback == null) {
            mEventManager.clearEventListeners(eventName);
        } else {
            mEventManager.removeEventListener(eventName, callback);
        }
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

    @JsMethod("getRect")
    public void getRect(JSCallback callback) {
        if (callback == null) {
            return;
        }

        getView().post(() -> {
            Rect rect = new Rect();
            getView().getHitRect(rect);
            Map<String, Object> values = new HashMap<>();
            values.put("width", DPUtil.px2dpF(context, getView().getWidth()));
            values.put("height", DPUtil.px2dpF(context, getView().getHeight()));
            values.put("left", DPUtil.px2dpF(context, rect.left));
            values.put("right", DPUtil.px2dpF(context, rect.right));
            values.put("top", DPUtil.px2dpF(context, rect.top));
            values.put("bottom", DPUtil.px2dpF(context, rect.bottom));
            callback.call(values);
        });
    }

    @Deprecated
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

    public final boolean setTransitionStyle(String key, Object value) {
        switch (key) {
            case HummerStyleUtils.Hummer.TRANSITION_DURATION:
                setTransitionDuration(value);
                break;
            case HummerStyleUtils.Hummer.TRANSITION_DELAY:
                setTransitionDelay(value);
                break;
            case HummerStyleUtils.Hummer.TRANSITION_TIMING_FUNCTION:
                setTransitionTimingFunction((String) value);
                break;
            case HummerStyleUtils.Hummer.TRANSITION_PROPERTY:
                setTransitionProperty(value);
                break;
            default:
                return false;
        }
        return true;

    }

    private List<Transition> transitions = new ArrayList<>();
    List<Double> durationList = new ArrayList<>();
    double transitionDelay = 0;
    String transitionTimingFunction = null;

//    transitionDuration: 0.5,
//    transitionDuration: '0.5,1.0',
//    transitionDuration: [0.5,1.0],
//    transitionDuration: ['0.5',1.0],

    public void setTransitionDuration(Object transitionDuration) {
        durationList = new ArrayList<>();
        if (transitionDuration instanceof List) {
            for (Object durationObj : ((ArrayList) transitionDuration)) {
                float duration = HummerStyleUtils.convertNumber(durationObj, false);
                durationList.add((double) duration);
            }

        } else if (transitionDuration instanceof String) {
            String durationStr = (String) transitionDuration;
            durationStr = durationStr.replace(" ", "");
            String[] durationStrList = durationStr.split(",");
            for (String duration : durationStrList) {
                durationList.add((double) HummerStyleUtils.convertNumber(duration, false));
            }
        } else if (transitionDuration instanceof Number) {
            durationList.add((double) HummerStyleUtils.convertNumber(transitionDuration, false));
        }

        if (durationList.size() > 0 && transitions != null) {
            for (int i = 0; i < transitions.size(); i++) {
                Transition transition = transitions.get(i);
                transition.setDuration(durationList.get(i % durationList.size()));
            }
        }
    }

    public void setTransitionDelay(Object delay) {
        transitionDelay = (double) HummerStyleUtils.convertNumber(delay, false);

        if (transitions != null) {
            for (int i = 0; i < transitions.size(); i++) {
                Transition transition = transitions.get(i);
                transition.setDelay(transitionDelay);
            }
        }
    }

    public void setTransitionTimingFunction(String timingFunction) {
        transitionTimingFunction = timingFunction;

        if (transitions != null) {
            for (int i = 0; i < transitions.size(); i++) {
                Transition transition = transitions.get(i);
                transition.setTimingFunction(transitionTimingFunction);
            }
        }
    }

    public void setTransitionProperty(Object transitionProperty) {
        transitions = new ArrayList<>();

        if (transitionProperty instanceof String) {
            String propertyStr = (String) transitionProperty;
            propertyStr = propertyStr.replace(" ", "");
            String[] propertyStrList = propertyStr.split(",");

            for (int i = 0; i < propertyStrList.length; i++) {

                String property = propertyStrList[i];

                Transition transition = new Transition(property);
                transition.setDelay(transitionDelay);
                transition.setTimingFunction(transitionTimingFunction);
                if (durationList.size() > 0) {
                    transition.setDuration(durationList.get(i % durationList.size()));
                }
                transitions.add(transition);
            }

        } else if (transitionProperty instanceof List) {
            List<String> propertyList = (ArrayList<String>) transitionProperty;
            if (!propertyList.isEmpty()) {
                for (int i = 0; i < propertyList.size(); i++) {

                    String property = propertyList.get(i);

                    Transition transition = new Transition(property);
                    transition.setDelay(transitionDelay);
                    transition.setTimingFunction(transitionTimingFunction);
                    if (durationList.size() > 0) {
                        transition.setDuration(durationList.get(i % durationList.size()));
                    }
                    transitions.add(transition);
                }
            }
        }
    }

    public Transition getTransition(String property) {
        Transition result = null;
        for (Transition transition : transitions) {
            if (property.equals(transition.getProperty())) {
                result = transition;
            } else if ("all".equals(transition.getProperty())) {
                result = transition;
                break;
            }
        }

        // transform 在未设置transition时 使用默认参数 瞬时变化
        if (HummerStyleUtils.Hummer.TRANSFORM.equals(property)) {
            if (result == null) {
                result = new Transition(property);
            }
        }
        return result;
    }

    public boolean supportTransitionStyle(String style) {
        for (Transition transition : transitions) {
            if (style.equals(transition.getProperty())) {
                return true;
            }
        }
        return false;

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

    List<ObjectAnimator> objectAnimatorList = new ArrayList<>();

    public void handleTransitionStyle(String key, Object value) {
        List<PropertyValuesHolder> propertyValuesHolderList = new ArrayList<>();
        if (HummerStyleUtils.Hummer.TRANSFORM.equals(key)) {
//                    todo 用正则方式取内容
//                    Pattern pattern = Pattern.compile("(\\w+-*\\w*)([^}]*)");
//                    Matcher matcher = pattern.matcher((CharSequence) value);
            String transformStr = value.toString().trim();
            transformStr = transformStr.replace("),", ");");
            String[] transformProperty = transformStr.split(";");
            for (int i = 0; i < transformProperty.length; i++) {
                String property = transformProperty[i];
                int leftIndex = property.indexOf("(");
                int rightIndex = property.indexOf(")");

                String animType = property.substring(0, leftIndex).trim();
                Object params = HummerStyleUtils.transformValue(property.substring(leftIndex + 1, rightIndex));
                propertyValuesHolderList.addAll(HummerAnimationUtils.parser(animType, params));
            }

        } else {
            propertyValuesHolderList.addAll(HummerAnimationUtils.parser(key, value));
        }

        ObjectAnimator anim = ObjectAnimator.ofPropertyValuesHolder(new AnimViewWrapper(this),
                propertyValuesHolderList.toArray(new PropertyValuesHolder[propertyValuesHolderList.size()]));

        getTransition(key).warpAnim(anim);
        if (objectAnimatorList == null) {
            objectAnimatorList = new ArrayList<>();
        }
        objectAnimatorList.add(anim);

    }

    public void runAnimator() {
        if (objectAnimatorList != null) {
            getView().post(new Runnable() {
                @Override
                public void run() {
                    for (ObjectAnimator objectAnimator : objectAnimatorList) {
                        objectAnimator.start();
                    }

                    // todo 执行完后暂时进行清空 后续加完成的队列，做完成监听
                    objectAnimatorList.clear();
                }
            });
        }

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
