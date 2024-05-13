package com.didi.hummer2.handler;

import com.didi.hummer2.utils.HMGsonUtil;
import com.didi.hummer2.utils.HMLog;

import java.util.Map;

/**
 * didi Create on 2024/4/1 .
 * <p>
 * Copyright (c) 2024/4/1 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/1 3:24 PM
 * @Description EventTraceHandler
 */

public class DefaultEventTraceHandler implements EventTraceHandler {


    @Override
    public void onEvent(String namespace, String event, Map<String, Object> params) {
        HMLog.i("HummerNative", "[" + namespace + "] event:" + event + ",params=" + getTextString(params));
    }

    private String getTextString(Object value) {
        if (value != null) {
            return HMGsonUtil.toJson(value);
        }
        return "null";
    }

}
