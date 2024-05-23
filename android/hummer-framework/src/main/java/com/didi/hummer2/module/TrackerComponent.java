package com.didi.hummer2.module;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.HummerScriptContext;
import com.didi.hummer2.adapter.HummerAdapter;
import com.didi.hummer2.adapter.tracker.PerfCustomInfo;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.module.component.Tracker;
import com.didi.hummer2.exception.JavaScriptException;


/**
 * didi Create on 2024/4/10 .
 * <p>
 * Copyright (c) 2024/4/10 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/10 3:40 PM
 * @Description Tracker
 */

@HMComponent("Tracker")
public class TrackerComponent extends Component {

    public TrackerComponent(HummerContext hummerContext) {
        super(hummerContext);
    }

    @HMMethod("trackPerformance")
    public void trackPerformance(HummerContext context, Tracker.JSPerfCustomInfo info) {
        if (info == null) {
            return;
        }
        PerfCustomInfo perfInfo = new PerfCustomInfo(info.label, info.localizableLabel, info.unit, info.value);
        HummerAdapter.getTrackerAdapter().trackPerfCustomInfo(((HummerScriptContext) context).getPageUrl(), perfInfo);
    }

    @HMMethod("trackException")
    public void trackException(HummerContext context, Tracker.JSErrorInfo info) {
        if (info == null) {
            return;
        }
        String strErr = info.name + ": " + info.message + "\n" + info.stack;
        HummerAdapter.getTrackerAdapter().trackException(((HummerScriptContext) context).getPageUrl(), new JavaScriptException(strErr));
    }

}
