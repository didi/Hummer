package com.didi.hummer2.bridge;

/**
 * didi Create on 2023/11/21 .
 * <p>
 * Copyright (c) 2023/11/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/21 7:02 下午
 * @Description 用一句话说明文件功能
 */

public interface IObject {

    HMValue get(String key);

    void put(String key, HMValue value);

    boolean isBoolean(String key);

    boolean isNumber(String key);

    boolean isString(String key);

    boolean isObject(String key);

    boolean isArray(String key);

    boolean getBoolean(String key);

    int getInt(String key);

    long getLong(String key);

    float getFloat(String key);

    double getDouble(String key);

    String getString(String key);


    HMArray allKeys();

}
