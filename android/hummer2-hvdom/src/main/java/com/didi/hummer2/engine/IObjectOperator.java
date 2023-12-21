package com.didi.hummer2.engine;

import com.didi.hummer2.core.engine.JSValue;

/**
 * didi Create on 2023/11/21 .
 * <p>
 * Copyright (c) 2023/11/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/21 5:49 下午
 * @Description 用一句话说明文件功能
 */

public interface IObjectOperator {

    Number getNumber(String key);

    boolean getBoolean(String key);

    String getString(String key);

    JSValue getJSValue(String key);

    void set(String key, Number value);

    void set(String key, boolean value);

    void set(String key, String value);

    void set(String key, JSValue value);

    Object callFunction(String funcName, Object... params);
}
