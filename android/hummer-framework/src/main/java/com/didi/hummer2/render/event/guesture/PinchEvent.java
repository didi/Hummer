package com.didi.hummer2.render.event.guesture;

//import com.didi.hummer.render.event.base.Event;

import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.render.event.base.Event;

import java.util.Iterator;
import java.util.Map;

/**
 * 捏合手势事件
 */
public class PinchEvent extends Event {

    private float scale;

    public void setScale(float scale) {
        this.scale = scale;
    }

    @Override
    public JsiObject toJsiValue() {
        JsiObject object = super.toJsiValue();
        object.put("scale", new JsiNumber(scale));
        return object;
    }
}
