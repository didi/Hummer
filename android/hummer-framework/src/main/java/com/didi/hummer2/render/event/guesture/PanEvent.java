package com.didi.hummer2.render.event.guesture;


import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.render.event.base.Event;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * 平移手势事件
 */
public class PanEvent extends Event {

    private HashMap<String, Float> translation;

    public void setTranslation(HashMap<String, Float> translation) {
        this.translation = translation;
    }

    @Override
    public JsiObject toJsiValue() {
        JsiObject object = super.toJsiValue();
        if (translation != null) {
            JsiObject value = new JsiObject();
            Iterator<Map.Entry<String, Float>> iterator = translation.entrySet().iterator();
            while (iterator.hasNext()) {
                Map.Entry<String, Float> entry = iterator.next();
                value.put(entry.getKey(), new JsiNumber(entry.getValue()));
            }
            object.put("translation", value);
        }
        return object;
    }
}
