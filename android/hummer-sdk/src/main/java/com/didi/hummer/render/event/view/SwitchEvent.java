package com.didi.hummer.render.event.view;

import com.didi.hummer.render.event.base.Event;

public class SwitchEvent extends Event {

    public static final String HM_EVENT_TYPE_SWITCH = "switch";

    public void setState(boolean checked) {
        super.setState(checked ? 1 : 0);
    }
}
