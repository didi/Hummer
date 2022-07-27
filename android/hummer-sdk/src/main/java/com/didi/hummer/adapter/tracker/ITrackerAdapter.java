package com.didi.hummer.adapter.tracker;

import java.util.List;
import java.util.Map;

/**
 * 事件和信息上报适配器
 *
 * Created by XiaoFeng on 2021/8/26.
 */
public interface ITrackerAdapter {

    class EventName {
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
         * RootView 页面渲染开始
         */
        public static final String RENDER_START = "tech_hummer_render_start";
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
    }

    class ParamKey {
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

    /**
     * 普通埋点上报（可用于关键路径统计）
     *
     * @param eventName
     * @param params
     */
    void trackEvent(String eventName, Map<String, Object> params);

    /**
     * 框架（SDK）信息上报
     *
     * @param info
     */
    void trackSDKInfo(SDKInfo info);

    /**
     * 框架（SDK）自定义信息上报
     *
     * @param info
     */
    void trackSDKCustomInfo(SDKCustomInfo info);

    /**
     * 性能信息上报
     *
     * @param pageUrl
     * @param info
     */
    void trackPerfInfo(String pageUrl, PerfInfo info);

    /**
     * 性能自定义信息上报
     *
     * @param pageUrl
     * @param info
     */
    void trackPerfCustomInfo(String pageUrl, PerfCustomInfo info);

    /**
     * 性能自定义信息上报
     *
     * @param pageUrl
     * @param infoList
     */
    void trackPerfCustomInfo(String pageUrl, List<PerfCustomInfo> infoList);

    /**
     * 页面PV统计（页面进入时埋点）
     *
     * @param pageUrl
     */
    void trackPageView(String pageUrl);

    /**
     * 页面渲染成功统计
     *
     * @param pageUrl
     */
    void trackPageSuccess(String pageUrl);

    /**
     * JS异常上报
     *
     * @param pageUrl
     * @param e
     */
    void trackException(String pageUrl, Exception e);

    /**
     * 保存bundle包信息
     *
     * @param pageUrl
     * @param moduleName
     * @param moduleVersion
     */
    void storeBundleInfo(String pageUrl, String moduleName, String moduleVersion);

    /**
     * 保存bundle包信息
     *
     * @param info
     */
    void storeBundleInfo(BundleInfo info);
}
