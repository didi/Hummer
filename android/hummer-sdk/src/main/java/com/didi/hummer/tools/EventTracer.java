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
public class EventTracer {

    public static class EventName {
        /**
         * SDK 初始化
         */
        public static final String SDK_INIT = "tech_hummer_sdk_init";
        /**
         * Hummer 上下文创建
         */
        public static final String CONTEXT_CREATE = "tech_hummer_context_create";
        /**
         * Hummer 上下文销毁
         */
        public static final String CONTEXT_DESTROY = "tech_hummer_context_destroy";
        /**
         * JS 代码执行开始
         */
        public static final String JS_EVAL_START = "tech_hummer_js_eval_start";
        /**
         * JS 代码执行结束
         */
        public static final String JS_EVAL_FINISH = "tech_hummer_js_eval_finish";
        /**
         * RootView 页面渲染结束
         */
        public static final String RENDER_FINISH = "tech_hummer_render_finish";

        /**
         * 通用EventName（保留之前老逻辑）
         */
        public static final String HUMMER_SDK_TRACE_EVENT = "hummer_sdk_trace_event";
    }

    public static class PARAM_KEY {
        /**
         * 页面渲染是否成功
         */
        public static final String IS_RENDER_SUCCESS = "is_render_success";
        /**
         * SDK版本号
         */
        public static final String SDK_VERSION = "sdk_version";
        /**
         * 页面url
         */
        public static final String PAGE_URL = "page_url";
        /**
         * 页面渲染时间（单位ms）
         */
        public static final String RENDER_TIME_COST = "render_time_cost";
        /**
         * JS 大小（单位kb）
         */
        public static final String JS_SIZE = "js_size";
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

    public static void traceEvent(String namespace, String eventName) {
        traceEvent(namespace, eventName, null);
    }

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
