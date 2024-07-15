package com.didi.hummer2.render.event.base;

import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.bridge.convert.JsiValueEncoder;

import java.io.Serializable;

public abstract class Event implements Serializable, JsiValueEncoder {

    public static final String HM_EVENT_TYPE_TOUCH = "touch";
    public static final String HM_EVENT_TYPE_LONG_PRESS = "longPress";
    public static final String HM_EVENT_TYPE_TAP = "tap";
    public static final String HM_EVENT_TYPE_SWIPE = "swipe";
    public static final String HM_EVENT_TYPE_PINCH = "pinch";
    public static final String HM_EVENT_TYPE_PAN = "pan";

    public static final int HM_GESTURE_STATE_NORMAL = 0;
    public static final int HM_GESTURE_STATE_BEGAN = 1;
    public static final int HM_GESTURE_STATE_CHANGED = 2;
    public static final int HM_GESTURE_STATE_ENDED = 3;
    public static final int HM_GESTURE_STATE_CANCELLED = 4;

    protected String type;
    protected int state;
    protected long timestamp;

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setState(int state) {
        this.state = state;
    }

    public int getState() {
        return state;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public long getTimestamp() {
        return timestamp;
    }

    @Override
    public JsiObject toJsiValue() {
        JsiObject object = new JsiObject();
        object.put("type", new JsiString(type));
        object.put("state", new JsiNumber(state));
        object.put("timestamp", new JsiNumber(timestamp));
        return object;
    }


}
