package com.didi.hummer2.component;

import com.didi.hummer2.adapter.http.HttpResponse;
import com.didi.hummer2.bridge.JsiFunction;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.component.module.hummer.NoOpJSCallback;
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

    private JsiFunction hmFunction;

    public EventListenerCallback(JsiFunction hmFunction) {
        this.hmFunction = hmFunction;
    }

    @Override
    public Object call(Object... params) {
        JsiValue result = null;
        if (params.length > 0 && params[0] instanceof Event) {
            String type = ((Event) params[0]).getType();
            result = hmFunction.call(new JsiString(type), ((Event) params[0]).toJsiValue());
        } else {
            JsiValue[] jsiValues = toJsiValues(params);
            result = hmFunction.call(jsiValues);
        }
        if (result != null) {
            HMLog.w("ProxyJSCallback", "call() result= " + result);
        }
        return null;
    }

    private JsiValue[] toJsiValues(Object[] objects) {
        if (objects != null && objects.length > 0) {
            int size = objects.length;
            JsiValue[] data = new JsiValue[size];
            for (int i = 0; i < size; i++) {
                data[i] = toJsiValue(objects[i]);
            }
            return data;
        }
        return new JsiValue[0];
    }

    private JsiValue toJsiValue(Object value) {
        if (value instanceof Event) {
            return ((Event) value).toJsiValue();
        }
        if (value instanceof HttpResponse) {
            return ((HttpResponse<?>) value).toJsiValue();
        }
        return new JsiObject();
    }

}
