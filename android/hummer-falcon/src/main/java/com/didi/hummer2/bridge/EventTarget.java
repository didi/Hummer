package com.didi.hummer2.bridge;

import com.didi.hummer2.utils.F4NObjectUtil;
import com.didi.hummer2.utils.HMLog;

/**
 * didi Create on 2024/4/2 .
 * <p>
 * Copyright (c) 2024/4/2 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/2 10:24 PM
 * @Description 用一句话说明文件功能
 */

public class EventTarget {

    private JsiFunction jsiFunction;

    public EventTarget(JsiFunction jsiFunction) {
        this.jsiFunction = jsiFunction;
    }

    public JsiFunction getJsiFunction() {
        return jsiFunction;
    }

    public void dispatchEvent(String eventName, Object event) {
        JsiString jsiString = new JsiString(eventName);
        JsiValue value = F4NObjectUtil.toJsiValue(event);

        JsiValue result = jsiFunction.call(jsiString, value);
        if (result != null) {
            HMLog.i("EventTarget", "dispatchEvent() result=" + result);
        }
    }


}
