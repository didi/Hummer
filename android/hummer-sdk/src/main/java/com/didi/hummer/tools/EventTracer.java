package com.didi.hummer.tools;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.core.util.DebugUtil;
import com.didi.hummer.core.util.HMLog;

import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Hummer 埋点统计
 */
@Deprecated
public class EventTracer {

    public static class EventName {
        public static final String HUMMER_SDK_TRACE_EVENT = "hummer_sdk_trace_event";
    }

    public interface Trace {
        void onEvent(String event, Map<String, Object> params);
    }

    private static ExecutorService executor = Executors.newSingleThreadExecutor();

    private static void safeExecute(ExecutorService executor, Runnable runnable) {
        executor.submit(() -> {
            try {
                runnable.run();
            } catch (Throwable t) {
                t.printStackTrace();
            }
        });
    }

    @Deprecated
    public static void traceEvent(String namespace, String eventName) {
        traceEvent(namespace, eventName, null);
    }

    @Deprecated
    public static void traceEvent(String namespace, String eventName, Map<String, Object> params) {
        safeExecute(executor, () -> {
            Trace trace = HummerSDK.getEventTracer(namespace);
            if (trace != null) {
                trace.onEvent(eventName, params);

                if (DebugUtil.isDebuggable()) {
                    HMLog.i("HummerEvent", "event: " + eventName + ", params: " + params);
                }
            }
        });
    }
}
