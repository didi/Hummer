package com.didi.hummer.adapter.tracker.impl;

import com.didi.hummer.adapter.tracker.ITrackerAdapter;
import com.didi.hummer.adapter.tracker.BundleInfo;
import com.didi.hummer.adapter.tracker.PerfCustomInfo;
import com.didi.hummer.adapter.tracker.PerfInfo;
import com.didi.hummer.adapter.tracker.SDKCustomInfo;
import com.didi.hummer.adapter.tracker.SDKInfo;

import java.util.List;
import java.util.Map;

/**
 * 提供事件和信息上报适配器的空实现
 *
 * Created by XiaoFeng on 2021/9/27.
 */
public class EmptyTrackerAdapter implements ITrackerAdapter {
    @Override
    public void trackEvent(String eventName, Map<String, Object> params) {

    }

    @Override
    public void trackSDKInfo(SDKInfo info) {

    }

    @Override
    public void trackSDKCustomInfo(SDKCustomInfo info) {

    }

    @Override
    public void trackPerfInfo(String pageUrl, PerfInfo info) {

    }

    @Override
    public void trackPerfCustomInfo(String pageUrl, PerfCustomInfo info) {

    }

    @Override
    public void trackPerfCustomInfo(String pageUrl, List<PerfCustomInfo> infoList) {

    }

    @Override
    public void trackPageView(String pageUrl) {

    }

    @Override
    public void trackPageSuccess(String pageUrl) {

    }

    @Override
    public void trackException(String pageUrl, Exception e) {

    }

    @Override
    public void storeBundleInfo(String pageUrl, String moduleName, String moduleVersion) {

    }

    @Override
    public void storeBundleInfo(BundleInfo info) {

    }
}
