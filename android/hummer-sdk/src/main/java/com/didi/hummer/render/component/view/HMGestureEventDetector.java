package com.didi.hummer.render.component.view;

import android.content.Context;
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
 * Created by XiaoFeng on 2021/2/4.
 */
class HMGestureEventDetector {

    private HummerContext context;
    private View view;
    private String viewId;
    private EventManager eventManager;
    private MotionEvent latestMotionEvent;

    public HMGestureEventDetector(HMBase base) {
        this.context = (HummerContext) base.getContext();
        this.eventManager = base.getEventManager();
        this.view = base.getView();
        this.viewId = base.getViewID();
        initEventListener();
    }

    public static HMGestureEventDetector init(HMBase base) {
        return new HMGestureEventDetector(base);
    }

    private void initEventListener() {
        if (context == null || eventManager == null || view == null) {
            return;
        }
        GestureDetector mGestureDetector = new GestureDetector(view.getContext(), new GestureDetector.SimpleOnGestureListener() {
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
                }
                return true;
            }
        });

        ScaleGestureDetector mScaleGestureDetector = new ScaleGestureDetector(view.getContext(), new ScaleGestureDetector.SimpleOnScaleGestureListener() {
            @Override
            public boolean onScale(ScaleGestureDetector detector) {
                if (eventManager.contains(Event.HM_EVENT_TYPE_PINCH)) {
                    // 控制缩放的最大值
                    final float scale = Math.max(0.1f, Math.min(detector.getScaleFactor(), 5.0f));
                    PinchEvent event = makePinchEvent(latestMotionEvent);
                    event.setScale(scale);
                    eventManager.dispatchEvent(Event.HM_EVENT_TYPE_PINCH, event);
                }
                return true;
            }
        });

        View.OnTouchListener touchListener = new View.OnTouchListener() {
            private float downX = 0;
            private float downY = 0;

            @Override
            public boolean onTouch(View v, MotionEvent event) {
                // 埋点
                Map<String, Object> params = TraceEvent.makeTraceGestureEvent(Event.HM_EVENT_TYPE_TOUCH, view, viewId);
                EventTracer.traceEvent(context.getNamespace(), params);

                TouchEvent touchEvent = null;
                if (eventManager.contains(Event.HM_EVENT_TYPE_TOUCH)) {
                    touchEvent = makeTouchEvent(v.getContext(), event);
                }

                PanEvent panEvent = null;
                if (eventManager.contains(Event.HM_EVENT_TYPE_PAN)) {
                    panEvent = makePanEvent(event);
                }

                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN: {
                        if (touchEvent != null) {
                            touchEvent.setState(Event.HM_GESTURE_STATE_BEGAN);
                        }
                        if (panEvent != null) {
                            downX = event.getRawX();
                            downY = event.getRawY();
                            panEvent.setState(Event.HM_GESTURE_STATE_BEGAN);
                        }
                        break;
                    }
                    case MotionEvent.ACTION_MOVE: {
                        float moveX = event.getRawX();
                        float moveY = event.getRawY();

                        if (touchEvent != null) {
                            touchEvent.setState(Event.HM_GESTURE_STATE_CHANGED);
                        }
                        if (panEvent != null) {
                            panEvent.setState(Event.HM_GESTURE_STATE_CHANGED);
                            panEvent.setTranslation(GestureUtils.findTranslationInMotionEvent(view.getContext(), moveX - downX, moveY - downY));
                            downX = moveX;
                            downY = moveY;
                        }
                        break;
                    }
                    case MotionEvent.ACTION_UP: {
                        if (touchEvent != null) {
                            touchEvent.setState(Event.HM_GESTURE_STATE_ENDED);
                        }
                        if (panEvent != null) {
                            panEvent.setState(Event.HM_GESTURE_STATE_ENDED);
                        }
                        break;
                    }
                    case MotionEvent.ACTION_CANCEL: {
                        if (touchEvent != null) {
                            touchEvent.setState(Event.HM_GESTURE_STATE_CANCELLED);
                        }
                        if (panEvent != null) {
                            panEvent.setState(Event.HM_GESTURE_STATE_CANCELLED);
                        }
                        break;
                    }
                    default:
                        break;
                }

                if (touchEvent != null) {
                    eventManager.dispatchEvent(Event.HM_EVENT_TYPE_TOUCH, touchEvent);
                }
                if (panEvent != null) {
                    eventManager.dispatchEvent(Event.HM_EVENT_TYPE_PAN, panEvent);
                }

                if (eventManager.contains(Event.HM_EVENT_TYPE_PINCH) || eventManager.contains(Event.HM_EVENT_TYPE_SWIPE)) {
                    latestMotionEvent = event;
                    return mGestureDetector.onTouchEvent(event) && mScaleGestureDetector.onTouchEvent(event);
                }

                return false;
            }
        };
        view.setOnTouchListener(touchListener);

        view.setOnClickListener((v) -> {
            // 埋点
            Map<String, Object> params = TraceEvent.makeTraceGestureEvent(Event.HM_EVENT_TYPE_TAP, view, viewId);
            EventTracer.traceEvent(context.getNamespace(), params);

            if (eventManager.contains(Event.HM_EVENT_TYPE_TAP)) {
                TapEvent event = makeTapEvent(context, latestMotionEvent);
                eventManager.dispatchEvent(Event.HM_EVENT_TYPE_TAP, event);
            }
        });

        view.setOnLongClickListener((v) -> {
            // 埋点
            Map<String, Object> params = TraceEvent.makeTraceGestureEvent(Event.HM_EVENT_TYPE_LONG_PRESS, view, viewId);
            EventTracer.traceEvent(context.getNamespace(), params);

            if (eventManager.contains(Event.HM_EVENT_TYPE_LONG_PRESS)) {
                LongPressEvent event = makeLongPressEvent(context, latestMotionEvent);
                eventManager.dispatchEvent(Event.HM_EVENT_TYPE_LONG_PRESS, event);
            }
            return true;
        });
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
