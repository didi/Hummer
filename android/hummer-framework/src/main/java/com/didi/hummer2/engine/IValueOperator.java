package com.didi.hummer2.engine;

import java.lang.reflect.Type;

/**
 * didi Create on 2023/11/21 .
 * <p>
 * Copyright (c) 2023/11/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/21 5:50 下午
 * @Description 用一句话说明文件功能
 */

public interface IValueOperator {

    int intValue();

    long longValue();

    float floatValue();

    double doubleValue();

    boolean booleanValue();

    String stringValue();

    boolean isArray();

    boolean isObject();

    boolean isNumber();

    boolean isBoolean();

    boolean isString();

    boolean isFunction();

    boolean isNull();

    void protect();

    void unprotect();
}
