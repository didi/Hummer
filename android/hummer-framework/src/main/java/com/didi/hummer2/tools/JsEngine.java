package com.didi.hummer2.tools;

import androidx.annotation.IntDef;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * didi Create on 2024/4/29 .
 * <p>
 * Copyright (c) 2024/4/29 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/29 3:16 PM
 * @Description JsEngine
 */


@IntDef({JsEngine.JSC, JsEngine.QUICK_JS, JsEngine.V8, JsEngine.HERMES, JsEngine.NAPI_QJS, JsEngine.NAPI_HERMES, JsEngine.FALCON_HERMES})
@Retention(RetentionPolicy.SOURCE)
public @interface JsEngine {
    int JSC = 1;
    int QUICK_JS = 2;
    int V8 = 3;
    int HERMES = 4;
    int NAPI_QJS = 5;
    int NAPI_HERMES = 6;
    int FALCON_HERMES = 7;
}
