package com.didi.hummer.module;

import com.didi.hummer.adapter.HummerAdapter;
import com.didi.hummer.adapter.tracker.PerfCustomInfo;
import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.exception.JSException;

/**
 * Created by XiaoFeng on 2021/10/14.
 */
@Component("Tracker")
public class Tracker {

    @JsMethod("trackPerformance")
    public static void trackPerformance(HummerContext context, String pageUrl, PerfCustomInfo info) {
        HummerAdapter.getTrackerAdapter(context.getNamespace()).trackPerfCustomInfo(pageUrl, info);
    }

    @JsMethod("trackException")
    public static void trackException(HummerContext context, String pageUrl, String errMsg) {
        HummerAdapter.getTrackerAdapter(context.getNamespace()).trackException(pageUrl, new JSException(errMsg));
    }
}
