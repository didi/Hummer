package com.didi.hummer2.module.component.notifycenter;

import com.didi.hummer2.annotation.HMJsiValue;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.render.event.base.Event;

/**
 * didi Create on 2024/4/29 .
 * <p>
 * Copyright (c) 2024/4/29 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/29 12:13 PM
 * @Description NotifyCenter 消息事件类型
 */
@HMJsiValue
public class NotifyCenterEvent extends Event {

    /**
     * 消息的数据内容
     */
    private JsiValue value;

    public NotifyCenterEvent() {
        setState(0);
    }

    public NotifyCenterEvent(String type, JsiValue jsiValue) {
        setType(type);
        setState(0);
        setTimestamp(System.currentTimeMillis());
        this.value = jsiValue;
    }

    public void setValue(JsiValue value) {
        this.value = value;
    }

    public JsiValue getValue() {
        return value;
    }

    @Override
    public JsiObject toJsiValue() {
        JsiObject object = super.toJsiValue();
        if (value != null) {
            object.put("value", value);
        }
        return object;
    }


    public NotifyCenterEvent newEvent() {
        NotifyCenterEvent event = new NotifyCenterEvent(getType(), value);
        return event;
    }
}
