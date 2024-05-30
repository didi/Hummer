package com.didi.hummer2.render.event.view;


import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.render.event.base.Event;

public class InputEvent extends Event {

    public static final String HM_EVENT_TYPE_INPUT = "input";

    public static final int HM_INPUT_STATE_NORMAL = 0;
    public static final int HM_INPUT_STATE_BEGAN = 1;
    public static final int HM_INPUT_STATE_CHANGED = 2;
    public static final int HM_INPUT_STATE_ENDED = 3;
    public static final int HM_INPUT_STATE_CONFIRMED = 4;

    private String text;

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public JsiObject toJsiValue() {
        JsiObject object = super.toJsiValue();
        object.put("text", new JsiString(text));
        return object;
    }
}
