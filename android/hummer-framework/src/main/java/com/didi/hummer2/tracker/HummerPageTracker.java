package com.didi.hummer2.tracker;


import com.didi.hummer2.BuildConfig;
import com.didi.hummer2.adapter.HummerAdapter;
import com.didi.hummer2.adapter.tracker.ITrackerAdapter;
import com.didi.hummer2.adapter.tracker.PerfCustomInfo;
import com.didi.hummer2.adapter.tracker.PerfInfo;
import com.didi.hummer2.utils.HMLog;

import java.util.HashMap;
import java.util.Map;

/**
 * didi Create on 2024/6/13 .
 * <p>
 * Copyright (c) 2024/6/13 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/6/13 4:15 PM
 * @Description 用一句话说明文件功能
 */

public class HummerPageTracker {

    private ITrackerAdapter trackerAdapter;

    private PerfInfo perfInfo = new PerfInfo();
    private long scriptLength;
    private String scriptId;
    private String pageUrl;
    private long ctxInitStartTime;
    private long jsFetchStartTime;
    private long renderStartTime;
    private long jsEvalStartTime;

    public HummerPageTracker(String namespace) {
        trackerAdapter = HummerAdapter.getTrackerAdapter();
    }

    public void trackContextInitStart() {
        ctxInitStartTime = System.currentTimeMillis();
        trackerAdapter.trackEvent(ITrackerAdapter.EventName.CONTEXT_CREATE, null);
    }

    public void trackContextInitEnd() {
        perfInfo.ctxInitTimeCost = System.currentTimeMillis() - ctxInitStartTime;
        HMLog.v("HummerNative", "HummerContext初始化耗时：" + perfInfo.ctxInitTimeCost + " ms");
    }

    public void trackContextDestroy() {
        trackerAdapter.trackEvent(ITrackerAdapter.EventName.CONTEXT_DESTROY, null);
    }

    public void trackJSFetchStart() {
        if (isHotReload()) {
            return;
        }

        jsFetchStartTime = System.currentTimeMillis();
    }

    public void trackJSFetchFinish() {
        if (isHotReload()) {
            return;
        }

        perfInfo.jsFetchTimeCost = System.currentTimeMillis() - jsFetchStartTime;
        HMLog.v("HummerNative", "JS加载耗时：" + perfInfo.jsFetchTimeCost + " ms");
    }

    public void trackRenderStart(String pageUrl) {
        if (isHotReload()) {
            return;
        }

        renderStartTime = System.currentTimeMillis();
        trackerAdapter.trackEvent(ITrackerAdapter.EventName.RENDER_START, null);
        this.pageUrl = pageUrl;
    }

    public void trackJSEvalStart(long scriptLength, String scriptId) {
        if (isHotReload()) {
            return;
        }

        jsEvalStartTime = System.currentTimeMillis();
        trackerAdapter.trackEvent(ITrackerAdapter.EventName.JS_EVAL_START, null);
        this.scriptLength = scriptLength;
        this.scriptId = scriptId;
    }

    public void trackJSEvalFinish() {
        if (isHotReload()) {
            return;
        }

        trackerAdapter.trackEvent(ITrackerAdapter.EventName.JS_EVAL_FINISH, null);
        perfInfo.jsEvalTimeCost = System.currentTimeMillis() - jsEvalStartTime;
        HMLog.v("HummerNative", "JS执行耗时：" + perfInfo.jsEvalTimeCost + " ms");
    }

    public void trackRenderFinish(boolean isSuccess) {
        if (isHotReload()) {
            return;
        }

        float jsSize = scriptLength / 1024f;
        long timeCost = System.currentTimeMillis() - ctxInitStartTime;

        Map<String, Object> params = new HashMap<>();
        params.put(ITrackerAdapter.ParamKey.IS_RENDER_SUCCESS, isSuccess);
        params.put(ITrackerAdapter.ParamKey.SDK_VERSION, BuildConfig.VERSION_NAME);
        params.put(ITrackerAdapter.ParamKey.PAGE_URL, scriptId);
        params.put(ITrackerAdapter.ParamKey.RENDER_TIME_COST, timeCost);
        params.put(ITrackerAdapter.ParamKey.JS_SIZE, jsSize);

        perfInfo.pageRenderTimeCost = timeCost;
        perfInfo.jsBundleSize = jsSize;
        if (isSuccess) {
            trackerAdapter.trackPageSuccess(pageUrl);
        }
        trackerAdapter.trackPerfInfo(pageUrl, perfInfo);
        trackerAdapter.trackPerfCustomInfo(pageUrl, new PerfCustomInfo("whiteScreenRate2", "白屏率", "%", isSuccess ? 0 : 100));
        trackerAdapter.trackEvent(ITrackerAdapter.EventName.RENDER_FINISH, params);
        HMLog.v("HummerNative", "页面渲染成功：" + isSuccess);
        HMLog.v("HummerNative", "页面渲染耗时：" + timeCost + " ms");
    }

    public void trackPageView(String pageUrl) {
        trackerAdapter.trackPageView(pageUrl);
    }

    public void trackException(String pageUrl, Exception e) {
        trackerAdapter.trackException(pageUrl, e);
    }

    /**
     * 是否是热重载
     * <p>
     * 如果是开发阶段hot reload时的自动刷新页面，则不重复累加计算和埋点上报
     */
    private boolean isHotReload() {
        return perfInfo != null && perfInfo.pageRenderTimeCost != 0;
    }
}