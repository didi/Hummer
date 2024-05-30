package com.didi.hummer2.render.event.guesture;

import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.render.event.base.Event;

import java.util.Iterator;
import java.util.Map;

/**
 * 触摸事件
 */
public class TouchEvent extends Event {

    private Map<String, Float> position;

    public void setPosition(Map<String, Float> point) {
        this.position = point;
    }

    @Override
    public JsiObject toJsiValue() {
        JsiObject object = super.toJsiValue();
        if (position != null) {
            JsiObject value = new JsiObject();
            Iterator<Map.Entry<String, Float>> iterator = position.entrySet().iterator();
            while (iterator.hasNext()) {
                Map.Entry<String, Float> entry = iterator.next();
                value.put(entry.getKey(), new JsiNumber(entry.getValue()));
            }
            object.put("translation", value);
        }
        return object;
    }
}
