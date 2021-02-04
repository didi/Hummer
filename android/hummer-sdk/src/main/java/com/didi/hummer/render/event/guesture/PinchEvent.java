package com.didi.hummer.render.event.guesture;

import com.didi.hummer.render.event.base.Event;

/**
 * 捏合手势事件
 */
public class PinchEvent extends Event {

    private float scale;

    public void setScale(float scale) {
        this.scale = scale;
    }
}
