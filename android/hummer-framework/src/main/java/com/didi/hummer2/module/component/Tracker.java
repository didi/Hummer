package com.didi.hummer2.module.component;


import com.didi.hummer2.HummerContext;
import com.didi.hummer2.HummerScriptContext;
import com.didi.hummer2.adapter.HummerAdapter;
import com.didi.hummer2.adapter.tracker.PerfCustomInfo;
import com.didi.hummer2.annotation.HMJsiValue;
import com.didi.hummer2.annotationx.Component;
import com.didi.hummer2.annotationx.JsMethod;
import com.didi.hummer2.exception.JavaScriptException;

import java.io.Serializable;

/**
 * 性能上报组件
 * <p>
 * Created by XiaoFeng on 2021/10/14.
 */
//@Component("Tracker")
public class Tracker {

    @HMJsiValue
    public static class JSPerfCustomInfo implements Serializable {
        public String label;
        public String localizableLabel;
        public String value;
        public String unit;
    }

    @HMJsiValue
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
        HummerAdapter.getTrackerAdapter().trackPerfCustomInfo(((HummerScriptContext) context).getPageUrl(), perfInfo);
    }

    @JsMethod("trackException")
    public static void trackException(HummerContext context, JSErrorInfo info) {
        if (info == null) {
            return;
        }
        String strErr = info.name + ": " + info.message + "\n" + info.stack;
        HummerAdapter.getTrackerAdapter().trackException(((HummerScriptContext) context).getPageUrl(), new JavaScriptException(strErr));
    }
}
