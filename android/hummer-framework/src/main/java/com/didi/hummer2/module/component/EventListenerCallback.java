package com.didi.hummer2.module.component;

import com.didi.hummer2.adapter.http.HttpResponse;
import com.didi.hummer2.bridge.JsiFunction;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.render.event.base.Event;
import com.didi.hummer2.utils.HMLog;

/**
 * didi Create on 2023/12/4 .
 * <p>
 * Copyright (c) 2023/12/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/12/4 8:41 PM
 * @Description 用一句话说明文件功能
 */

public class EventListenerCallback extends NoOpJSCallback {

    private JsiFunction jsiFunction;

    public EventListenerCallback(JsiFunction jsiFunction) {
        this.jsiFunction = jsiFunction;
    }

    @Override
    public Object call(Object... params) {
        JsiValue result = null;
        if (params.length > 0 && params[0] instanceof Event) {
            String type = ((Event) params[0]).getType();
            result = jsiFunction.call(type,  params[0]);
        } else {
            result = jsiFunction.call(params);
        }
        if (result != null) {
            HMLog.w("HummerNative", "EventListenerCallback::call() result= " + result);
        }
        return null;
    }

}
