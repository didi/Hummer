package com.didi.hummer.devtools.invoker;

import com.didi.hummer.context.HummerInvoker;
import com.didi.hummer.devtools.bean.LogBean;
import com.didi.hummer.devtools.manager.HummerLogManager;
import com.didi.hummer.render.component.view.HMBase;

/**
 * @author: linjizong
 * @date: 2020-04-20
 * @desc:
 */
public class HummerInvokerWrapper extends HummerInvoker {
    private HummerLogManager mLogManager;

    public HummerInvokerWrapper(HummerLogManager logManager) {
        mLogManager = logManager;
    }

    @Override
    protected Object invoke(HMBase instance, String methodName, Object... params) {
        int logType = 0;

        switch (methodName) {
            case "console.log":
                logType = LogBean.TYPE_LOG;
                break;
            case "console.debug":
                logType = LogBean.TYPE_DEBUG;
                break;
            case "console.info":
                logType = LogBean.TYPE_INFO;
                break;
            case "console.warn":
                logType = LogBean.TYPE_WARN;
                break;
            case "console.error":
                logType = LogBean.TYPE_ERROR;
                break;
            default:
                break;
        }

        if (logType > 0) {
            mLogManager.addLog(logType, String.valueOf(params[0]));
        }

        return super.invoke(instance, methodName, params);
    }
}
