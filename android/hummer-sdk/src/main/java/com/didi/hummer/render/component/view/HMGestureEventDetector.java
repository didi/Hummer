package com.didi.hummer.render.component.view;

import android.content.Context;
import android.os.Looper;
import android.text.TextUtils;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.ScaleGestureDetector;
import android.view.View;

import com.didi.hummer.context.HummerContext;
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
import com.didi.hummer.tools.EventTracer;

import java.util.Map;

/**
 * 手势事件管理类
 *
 * 关于事件传递规则：
 * iOS：父子关系：事件穿透；兄弟关系：事件拦截
 * Android：父子关系：事件穿透；兄弟关系：事件穿透
 * Button始终是不能穿透的
 *
 * Created by XiaoFeng on 2021/2/4.
 */
class HMGestureEventDetector {

    private Context context;
    private HummerContext hummerContext;
    private View view;
    private String viewId;
    private EventManager eventManager;
    private GestureDetector mGestureDetector;
    private ScaleGestureDetector mScaleGestureDetector;
    private MotionEvent latestMotionEvent;

    public HMGestureEventDetector(HMBase base) {
        if (base == null || base.getView() == null) {
            return;
        }

        this.hummerContext = (HummerContext) base.getContext();
        this.eventManager = base.getEventManager();
        this.view = base.getView();
        this.viewId = base.getViewID();
        this.context = view.getContext();

        if (Looper.getMainLooper().getThread() == Thread.currentThread()) {
            init();
        } else {
            view.post(this::init);
        }
    }

    private void init() {
        mGestureDetector = new GestureDetector(context, new GestureDetector.SimpleOnGestureListener() {
            @Override
            public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
                if (eventManager.contains(Event.HM_EVENT_TYPE_SWIPE)) {
                    SwipeEvent event = makeSwipeEvent(e2);

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
                    eventManager.dispatchEvent(Event.HM_EVENT_TYPE_SWIPE, event);
                    return true;
                }
                return false;
            }
        });

        mScaleGestureDetector = new ScaleGestureDetector(context, new ScaleGestureDetector.SimpleOnScaleGestureListener() {
            @Override
            public boolean onScale(ScaleGestureDetector detector) {
                if (eventManager.contains(Event.HM_EVENT_TYPE_PINCH)) {
                    // 控制缩放的最大值
                    final float scale = Math.max(0.1f, Math.min(detector.getScaleFactor(), 5.0f));
                    PinchEvent event = makePinchEvent(latestMotionEvent);
                    event.setScale(scale);
                    eventManager.dispatchEvent(Event.HM_EVENT_TYPE_PINCH, event);
                    return true;
                }
                return false;
            }
        });

        View.OnTouchListener touchListener = new View.OnTouchListener() {
            private float downX = 0;
            private float downY = 0;

            @Override
            public boolean onTouch(View v, MotionEvent event) {
                // 埋点
                Map<String, Object> params = TraceEvent.makeTraceGestureEvent(Event.HM_EVENT_TYPE_TOUCH, view, viewId);
                EventTracer.traceEvent(hummerContext.getNamespace(), params);

                TouchEvent touchEvent = null;
                if (eventManager.contains(Event.HM_EVENT_TYPE_TOUCH)) {
                    touchEvent = makeTouchEvent(v.getContext(), event);
                }

                PanEvent panEvent = null;
                if (eventManager.contains(Event.HM_EVENT_TYPE_PAN)) {
                    panEvent = makePanEvent(event);
                }

                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        latestMotionEvent = MotionEvent.obtain(event);
                        if (panEvent != null) {
                            downX = event.getRawX();
                            downY = event.getRawY();
                        }
                        break;
                    case MotionEvent.ACTION_MOVE:
                        if (panEvent != null) {
                            float moveX = event.getRawX();
                            float moveY = event.getRawY();
                            panEvent.setTranslation(GestureUtils.findTranslationInMotionEvent(context, moveX - downX, moveY - downY));
                            downX = moveX;
                            downY = moveY;
                        }
                        break;
                    case MotionEvent.ACTION_UP:
                    case MotionEvent.ACTION_CANCEL:
                    default:
                        latestMotionEvent = MotionEvent.obtain(event);
                        break;
                }

                boolean isTouchConsumed = false;
                if (touchEvent != null) {
                    isTouchConsumed = true;
                    eventManager.dispatchEvent(Event.HM_EVENT_TYPE_TOUCH, touchEvent);
                }
                if (panEvent != null) {
                    isTouchConsumed = true;
                    eventManager.dispatchEvent(Event.HM_EVENT_TYPE_PAN, panEvent);
                }

                /**
                 * 如果设置了单击或长按事件，则这里不消费事件，之后会在View.onTouchEvent中自动消费掉本事件
                 */
                boolean isClickable = eventManager.contains(Event.HM_EVENT_TYPE_TAP)
                        || eventManager.contains(Event.HM_EVENT_TYPE_LONG_PRESS);
                if (isClickable) {
                    return false;
                }

                /**
                 * 如果没有设置单击或长按事件，则看是否设置了其他Touch相关事件
                 */
                if (eventManager.contains(Event.HM_EVENT_TYPE_SWIPE)) {
                    mGestureDetector.onTouchEvent(event);
                    isTouchConsumed = true;
                }
                if (eventManager.contains(Event.HM_EVENT_TYPE_PINCH)) {
                    mScaleGestureDetector.onTouchEvent(event);
                    isTouchConsumed = true;
                }
                return isTouchConsumed;
            }
        };
        view.setOnTouchListener(touchListener);
    }

    public void initClickListener(String eventName) {
        if (hummerContext == null || eventManager == null || view == null || TextUtils.isEmpty(eventName)) {
            return;
        }

        if (eventName.equals(Event.HM_EVENT_TYPE_TAP)) {
            view.setOnClickListener((v) -> {
                // 埋点
                Map<String, Object> params = TraceEvent.makeTraceGestureEvent(Event.HM_EVENT_TYPE_TAP, view, viewId);
                EventTracer.traceEvent(hummerContext.getNamespace(), params);

                if (eventManager.contains(Event.HM_EVENT_TYPE_TAP)) {
                    TapEvent event = makeTapEvent(view.getContext(), latestMotionEvent);
                    eventManager.dispatchEvent(Event.HM_EVENT_TYPE_TAP, event);
                }
            });
        }

        if (eventName.equals(Event.HM_EVENT_TYPE_LONG_PRESS)) {
            view.setOnLongClickListener((v) -> {
                // 埋点
                Map<String, Object> params = TraceEvent.makeTraceGestureEvent(Event.HM_EVENT_TYPE_LONG_PRESS, view, viewId);
                EventTracer.traceEvent(hummerContext.getNamespace(), params);

                if (eventManager.contains(Event.HM_EVENT_TYPE_LONG_PRESS)) {
                    LongPressEvent event = makeLongPressEvent(view.getContext(), latestMotionEvent);
                    eventManager.dispatchEvent(Event.HM_EVENT_TYPE_LONG_PRESS, event);
                }
                return true;
            });
        }
    }

    private TouchEvent makeTouchEvent(Context context, MotionEvent event) {
        TouchEvent e = new TouchEvent();
        e.setTimestamp(System.currentTimeMillis());
        e.setType(Event.HM_EVENT_TYPE_TOUCH);
        e.setState(GestureUtils.findStateInMotionEvent(event));
        e.setPosition(GestureUtils.findPositionInMotionEvent(context, event));
        return e;
    }

    private PanEvent makePanEvent(MotionEvent event) {
        PanEvent e = new PanEvent();
        e.setTimestamp(System.currentTimeMillis());
        e.setType(Event.HM_EVENT_TYPE_PAN);
        e.setState(GestureUtils.findStateInMotionEvent(event));
        return e;
    }

    private SwipeEvent makeSwipeEvent(MotionEvent event) {
        SwipeEvent e = new SwipeEvent();
        e.setTimestamp(System.currentTimeMillis());
        e.setType(Event.HM_EVENT_TYPE_SWIPE);
        e.setState(GestureUtils.findStateInMotionEvent(event));
        return e;
    }

    private PinchEvent makePinchEvent(MotionEvent event) {
        PinchEvent e = new PinchEvent();
        e.setTimestamp(System.currentTimeMillis());
        e.setType(Event.HM_EVENT_TYPE_PINCH);
        e.setState(GestureUtils.findStateInMotionEvent(event));
        return e;
    }

    private TapEvent makeTapEvent(Context context, MotionEvent event) {
        TapEvent e = new TapEvent();
        e.setTimestamp(System.currentTimeMillis());
        e.setType(Event.HM_EVENT_TYPE_TAP);
        e.setState(GestureUtils.findStateInMotionEvent(event));
        e.setPosition(GestureUtils.findPositionInMotionEvent(context, event));
        return e;
    }

    private LongPressEvent makeLongPressEvent(Context context, MotionEvent event) {
        LongPressEvent e = new LongPressEvent();
        e.setTimestamp(System.currentTimeMillis());
        e.setType(Event.HM_EVENT_TYPE_LONG_PRESS);
        e.setState(GestureUtils.findStateInMotionEvent(event));
        e.setPosition(GestureUtils.findPositionInMotionEvent(context, event));
        return e;
    }
}
