package com.didi.hummer2.devtools.invoker;

import com.didi.hummer2.devtools.manager.HummerLogManager;
import com.didi.hummer2.handler.JsConsoleHandler;

/**
 * @author: linjizong
 * @date: 2020-04-20
 * @desc:
 */
public class HummerInvokerWrapper implements JsConsoleHandler {
    private HummerLogManager mLogManager;

    public HummerInvokerWrapper(HummerLogManager logManager) {
        mLogManager = logManager;
    }

    @Override
    public void printLog(String namespace, int level, String message) {
        if (level > 0) {
            mLogManager.addLog(level, message);
        }
    }
}
