package com.didi.hummer.render.event.guesture.common;

import android.content.Context;
import android.view.MotionEvent;

import com.didi.hummer.render.event.base.Event;
import com.didi.hummer.render.utility.DPUtil;

import java.util.HashMap;
import java.util.Map;

public class GestureUtils {
    public static int findStateInMotionEvent(MotionEvent e) {
        int ret = Event.HM_GESTURE_STATE_NORMAL;

        if (e == null) return ret;

        switch (e.getAction()) {
            case MotionEvent.ACTION_DOWN: {
                return Event.HM_GESTURE_STATE_BEGAN;
            }
            case MotionEvent.ACTION_MOVE: {
                return Event.HM_GESTURE_STATE_CHANGED;
            }
            case MotionEvent.ACTION_UP: {
                return Event.HM_GESTURE_STATE_ENDED;
            }
            case MotionEvent.ACTION_CANCEL: {
                return Event.HM_GESTURE_STATE_CANCELLED;
            }
            default:
                return ret;
        }
    }

    public static Map<String, Float> findPositionInMotionEvent(Context context, MotionEvent e) {
        Map<String, Float> ret = new HashMap<>();

        if (e == null) {
            ret.put("x", 0f);
            ret.put("y", 0f);
            ret.put("rawX", 0f);
            ret.put("rawY", 0f);
            return ret;
        }

        ret.put("x", DPUtil.px2dpF(context, e.getX()));
        ret.put("y", DPUtil.px2dpF(context, e.getY()));
        ret.put("rawX", DPUtil.px2dpF(context, e.getRawX()));
        ret.put("rawY", DPUtil.px2dpF(context, e.getRawY()));

        return ret;
    }

    public static HashMap<String, Float> findTranslationInMotionEvent(Context context, float distanceX, float distanceY) {
        HashMap<String, Float> ret = new HashMap<>();
        ret.put("deltaX", DPUtil.px2dpF(context, distanceX));
        ret.put("deltaY", DPUtil.px2dpF(context, distanceY));
        return ret;
    }
}
