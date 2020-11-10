package com.didi.hummer.render.event.guesture;

import com.didi.hummer.render.event.base.Event;

import java.util.Map;

public class TouchEvent extends Event {

    private Map<String, Float> position;

    public void setPosition(Map<String, Float> point) {
        this.position = point;
    }
}
