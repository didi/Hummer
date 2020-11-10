package com.didi.hummer.render.event.guesture;

import com.didi.hummer.render.event.base.Event;

import java.util.HashMap;

public class PanEvent extends Event {

    private HashMap<String, Float> translation;

    public void setTranslation(HashMap<String, Float> translation) {
        this.translation = translation;
    }
}
