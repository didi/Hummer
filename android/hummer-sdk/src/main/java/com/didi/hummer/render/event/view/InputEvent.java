package com.didi.hummer.render.event.view;

import com.didi.hummer.render.event.base.Event;

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
}
