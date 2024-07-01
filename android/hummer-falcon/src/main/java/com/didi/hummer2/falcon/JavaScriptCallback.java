package com.didi.hummer2.falcon;

import com.didi.hummer2.bridge.JsiValue;

/**
 * didi Create on 2024/6/27 .
 * <p>
 * Copyright (c) 2024/6/27 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/6/27 5:27 PM
 * @Description 用一句话说明文件功能
 */

public interface JavaScriptCallback {

    void onJavaScriptResult(int status, String message, JsiValue jsiValue);
}
