package com.didi.hummer2.handler;

import com.didi.hummer2.utils.HMLog;

/**
 * didi Create on 2024/4/1 .
 * <p>
 * Copyright (c) 2024/4/1 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/1 3:25 PM
 * @Description JsExceptionHandler
 */

public class DefaultJsExceptionHandler implements JsExceptionHandler {
    @Override
    public void onCatchException(String namespace, Exception exception) {
        HMLog.e("HummerNative", "[" + namespace + "] Error: " + exception.getMessage());
    }


}
