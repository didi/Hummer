package com.didi.hummer2.bridge;

import com.didi.hummer2.utils.HMLog;

import java.io.Serializable;

/**
 * didi Create on 2024/4/2 .
 * <p>
 * Copyright (c) 2024/4/2 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/2 10:24 PM
 * @Description EventTarget 组件事件回调处理
 */

public class EventTarget implements Serializable {

    private JsiFunction jsiFunction;

    public EventTarget(JsiFunction jsiFunction) {
        this.jsiFunction = jsiFunction;
    }

    public JsiFunction getJsiFunction() {
        return jsiFunction;
    }

    public void dispatchEvent(String eventName, Object event) {
        JsiValue result = jsiFunction.call(eventName, event);
        if (result != null) {
            HMLog.i("EventTarget", "dispatchEvent() result=" + result);
        }
    }


}
