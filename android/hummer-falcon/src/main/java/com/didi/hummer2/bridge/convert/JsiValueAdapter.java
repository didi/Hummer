package com.didi.hummer2.bridge.convert;

import com.didi.hummer2.bridge.JsiValue;

import java.lang.reflect.Type;

/**
 * didi Create on 2024/7/2 .
 * <p>
 * Copyright (c) 2024/7/2 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/2 4:36 PM
 * @Description 用一句话说明文件功能
 */

public interface JsiValueAdapter<T> {

    Class<T> getJavaClass();

    T toJavaValue(ValueParser parser, JsiValue jsiValue, Type type);

    JsiValue toJsiValue(ValueParser parser, T value);
}
