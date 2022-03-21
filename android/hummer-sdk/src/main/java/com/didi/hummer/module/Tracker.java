package com.didi.hummer.module;

import com.didi.hummer.adapter.HummerAdapter;
import com.didi.hummer.adapter.tracker.PerfCustomInfo;
import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.exception.JSException;

import java.io.Serializable;

/**
 * 性能上报组件
 *
 * Created by XiaoFeng on 2021/10/14.
 */
@Component("Tracker")
public class Tracker {

    public static class JSPerfCustomInfo implements Serializable {
        public String label;
        public String localizableLabel;
        public String value;
        public String unit;
    }

    public static class JSErrorInfo implements Serializable {
        public String name;
        public String message;
        public String stack;
        public String line;
        public String column;
    }

    @JsMethod("trackPerformance")
    public static void trackPerformance(HummerContext context, JSPerfCustomInfo info) {
        if (info == null) {
            return;
        }
        PerfCustomInfo perfInfo = new PerfCustomInfo(info.label, info.localizableLabel, info.unit, info.value);
        HummerAdapter.getTrackerAdapter(context.getNamespace()).trackPerfCustomInfo(context.getPageUrl(), perfInfo);
    }

    @JsMethod("trackException")
    public static void trackException(HummerContext context, JSErrorInfo info) {
        if (info == null) {
            return;
        }
        String strErr = info.name + ": " + info.message + "\n" + info.stack;
        HummerAdapter.getTrackerAdapter(context.getNamespace()).trackException(context.getPageUrl(), new JSException(strErr));
    }
}
