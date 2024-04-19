package com.didi.hummer2.tools;

import java.util.Map;

/**
 * didi Create on 2024/4/1 .
 * <p>
 * Copyright (c) 2024/4/1 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/1 5:12 PM
 * @Description 用一句话说明文件功能
 */

public class EventTracer {

    public static class EventName {
        public static final String HUMMER_SDK_TRACE_EVENT = "hummer_sdk_trace_event";
    }


    @Deprecated
    public static void traceEvent(String namespace, String eventName) {
//        traceEvent(namespace, eventName, null);
    }

    @Deprecated
    public static void traceEvent(String namespace, String eventName, Map<String, Object> params) {
//        safeExecute(executor, () -> {
//            Trace trace = HummerSDK.getEventTracer(namespace);
//            if (trace != null) {
//                trace.onEvent(eventName, params);
//
//                if (DebugUtil.isDebuggable(namespace)) {
//                    HMLog.i("HummerEvent", "event: " + eventName + ", params: " + params);
//                }
//            }
//        });
    }
}
