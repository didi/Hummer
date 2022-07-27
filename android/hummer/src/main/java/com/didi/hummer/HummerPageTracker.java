package com.didi.hummer;

import com.didi.hummer.adapter.HummerAdapter;
import com.didi.hummer.adapter.tracker.ITrackerAdapter;
import com.didi.hummer.adapter.tracker.PerfCustomInfo;
import com.didi.hummer.adapter.tracker.PerfInfo;
import com.didi.hummer.core.BuildConfig;
import com.didi.hummer.core.util.HMLog;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by XiaoFeng on 2022/7/27.
 */
class HummerPageTracker {
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
      trackerAdapter = HummerAdapter.getTrackerAdapter(namespace);
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
      trackerAdapter.trackPerfCustomInfo(pageUrl, new PerfCustomInfo("whiteScreenRate", "白屏率", "%", isSuccess ? 0 : 100));
      trackerAdapter.trackEvent(ITrackerAdapter.EventName.RENDER_FINISH, params);
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
    *
    * 如果是开发阶段hot reload时的自动刷新页面，则不重复累加计算和埋点上报
    */
   private boolean isHotReload() {
      return perfInfo != null && perfInfo.pageRenderTimeCost != 0;
   }
}
