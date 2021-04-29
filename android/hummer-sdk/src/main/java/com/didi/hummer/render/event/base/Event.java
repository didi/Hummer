package com.didi.hummer.render.event.base;

import java.io.Serializable;

public abstract class Event implements Serializable {

    public static final String HM_EVENT_TYPE_TOUCH          = "touch";
    public static final String HM_EVENT_TYPE_LONG_PRESS     = "longPress";
    public static final String HM_EVENT_TYPE_TAP            = "tap";
    public static final String HM_EVENT_TYPE_SWIPE          = "swipe";
    public static final String HM_EVENT_TYPE_PINCH          = "pinch";
    public static final String HM_EVENT_TYPE_PAN            = "pan";

    public static final int HM_GESTURE_STATE_NORMAL    = 0;
    public static final int HM_GESTURE_STATE_BEGAN     = 1;
    public static final int HM_GESTURE_STATE_CHANGED   = 2;
    public static final int HM_GESTURE_STATE_ENDED     = 3;
    public static final int HM_GESTURE_STATE_CANCELLED = 4;

    private String type;
    private int state;
    private long timestamp;

    public void setType(String type) {
        this.type = type;
    }

    public void setState(int state) {
        this.state = state;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
