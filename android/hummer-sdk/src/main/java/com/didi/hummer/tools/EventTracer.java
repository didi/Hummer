package com.didi.hummer.tools;

import android.util.Log;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.core.util.DebugUtil;
import com.didi.hummer.core.util.HMLog;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Hummer 埋点统计
 */
public class EventTracer {

    public static class Event {
        public static final String TYPE = "hummer_sdk_trace_event";
    }

    public static class Performance {
        public static final String TYPE = "hummer_sdk_trace_performance";
        public static final String KEY_EVENT_NAME = "event_name";
        public static final String KEY_TIME_COST = "time_cost";
    }

    public static class Exception {
        public static final String TYPE = "hummer_sdk_trace_exception";
        public static final String KEY_EVENT_NAME = "event_name";
        public static final String KEY_EXCEPTION = "exception";
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

    public static void traceEvent(String namespace, Map<String, Object> params) {
        safeExecute(executor, () -> {
            Trace trace = HummerSDK.getEventTracer(namespace);
            if (trace != null) {
                trace.onEvent(Event.TYPE, params);

                if (DebugUtil.isDebuggable()) {
                    HMLog.i("HummerEvent", "event: " + Event.TYPE + ", params: " + params);
                }
            }
        });
    }

    public static void tracePerformance(String namespace, String eventName, long startTime) {
        tracePerformance(namespace, eventName, null, startTime);
    }

    public static void tracePerformance(String namespace, String eventName, Map<String, Object> params, long startTime) {
        safeExecute(executor, () -> {
            Trace trace = HummerSDK.getEventTracer(namespace);
            if (trace != null) {
                Map<String, Object> fParams = params != null ? new HashMap<>(params) : new HashMap<>();
                fParams.put(Performance.KEY_EVENT_NAME, eventName);
                fParams.put(Performance.KEY_TIME_COST, System.currentTimeMillis() - startTime);
                trace.onEvent(Performance.TYPE, fParams);

                if (DebugUtil.isDebuggable()) {
                    HMLog.i("HummerEvent", "event: " + Performance.TYPE + ", params: " + fParams);
                }
            }
        });
    }

    public static void traceException(String namespace, String eventName, Throwable e) {
        safeExecute(executor, () -> {
            Trace trace = HummerSDK.getEventTracer(namespace);
            if (trace != null) {
                Map<String, Object> params = new HashMap<>();
                params.put(Exception.KEY_EVENT_NAME, eventName);
                params.put(Exception.KEY_EXCEPTION, Log.getStackTraceString(e));
                trace.onEvent(Exception.TYPE, params);

                if (DebugUtil.isDebuggable()) {
                    HMLog.i("HummerEvent", "event: " + Exception.TYPE + ", params: " + params);
                }
            }
        });
    }
}
