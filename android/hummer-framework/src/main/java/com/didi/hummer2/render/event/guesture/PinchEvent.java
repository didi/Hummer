package com.didi.hummer2.render.event.guesture;


import com.didi.hummer2.annotation.HMJsiValue;
import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.render.event.base.Event;


/**
 * 捏合手势事件
 */
@HMJsiValue
public class PinchEvent extends Event {

    private float scale;

    public void setScale(float scale) {
        this.scale = scale;
    }

    public float getScale() {
        return scale;
    }

    @Override
    public JsiObject toJsiValue() {
        JsiObject object = super.toJsiValue();
        object.put("scale", new JsiNumber(scale));
        return object;
    }
}
