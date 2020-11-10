package com.didi.hummer.render.event.guesture.common;

import android.view.MotionEvent;

import com.didi.hummer.render.event.base.Event;

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

    public static Map<String, Float> findPositionInMotionEvent(MotionEvent e) {
        Map<String, Float> ret = new HashMap<>();
        ret.put("x", 0f);
        ret.put("y", 0f);

        if (e == null) {
            return ret;
        }

        ret.put("x", e.getX());
        ret.put("y", e.getY());

        return ret;
    }

    public static HashMap<String, Float> findTranslationInMotionEvent(float distanceX, float distanceY) {
        HashMap<String, Float> ret = new HashMap<>();
        ret.put("deltaX", distanceX);
        ret.put("deltaY", distanceY);
        return ret;
    }
}
