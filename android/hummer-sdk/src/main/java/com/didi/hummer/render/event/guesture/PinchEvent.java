package com.didi.hummer.render.event.guesture;

import com.didi.hummer.render.event.base.Event;

public class PinchEvent extends Event {

    private float scale;

    public void setScale(float scale) {
        this.scale = scale;
    }
}
