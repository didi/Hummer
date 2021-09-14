package com.didi.hummer.core.exception;

import android.text.TextUtils;

/**
 * 错误格式举例：
 * ReferenceError: 'a' is not defined
 *     at RootView (http://x.x.x.x:8000/HelloWorld.js:314)
 *     at <anonymous> (http://x.x.x.x:8000/HelloWorld.js:330)
 *     at <anonymous> (http://x.x.x.x:8000/HelloWorld.js:331)
 *     at <eval> (http://x.x.x.x:8000/HelloWorld.js:333)
 *
 * [errType]：ReferenceError
 * [errMsg]：ReferenceError: 'a' is not defined
 * [stackTrace]：上面一整段全部
 *
 * Created by XiaoFeng on 2019-11-20.
 */
public class JSException extends Exception {

    /**
     * 错误类型，如：ReferenceError
     */
    private String errType;
    /**
     * 错误信息：如：ReferenceError: 'a' is not defined
     */
    private String errMsg;
    /**
     * 错误完整堆栈信息，如：
     * ReferenceError: 'a' is not defined
     *     at RootView (http://x.x.x.x:8000/HelloWorld.js:314)
     *     at <anonymous> (http://x.x.x.x:8000/HelloWorld.js:330)
     *     at <anonymous> (http://x.x.x.x:8000/HelloWorld.js:331)
     *     at <eval> (http://x.x.x.x:8000/HelloWorld.js:333)
     */
    private String errStack;

    public JSException(String stackTrace) {
        super(stackTrace);
        try {
            setStackTrace(new StackTraceElement[0]);
            parseStackTrace(stackTrace);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void parseStackTrace(String stackTrace) {
        errStack = stackTrace;

        if (TextUtils.isEmpty(stackTrace)) {
            errMsg = stackTrace;
            errType = "unknown";
            return;
        }

        int index = stackTrace.indexOf("\n");
        if (index <= 0) {
            errMsg = stackTrace;
            errType = "unknown";
            return;
        }

        errMsg = stackTrace.substring(0, index);
        if (TextUtils.isEmpty(errMsg)) {
            errType = "unknown";
            return;
        }

        index = errMsg.indexOf(":");
        if (index <= 0) {
            errType = "unknown";
            return;
        }
        errType = errMsg.substring(0, index);
    }

    public String getErrType() {
        return errType;
    }

    public String getErrMsg() {
        return errMsg;
    }

    public String getErrStack() {
        return errStack;
    }
}
