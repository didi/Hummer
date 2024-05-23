package com.didi.hummer2.module.component;

import com.didi.hummer2.engine.JSCallback;

/**
 * didi Create on 2024/4/18 .
 * <p>
 * Copyright (c) 2024/4/18 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/18 4:13 PM
 * @Description 用一句话说明文件功能
 */

public class NoOpJSCallback implements JSCallback {

    @Override
    public Object call(Object... params) {
        return null;
    }

    @Override
    public int intValue() {
        return 0;
    }

    @Override
    public long longValue() {
        return 0;
    }

    @Override
    public float floatValue() {
        return 0;
    }

    @Override
    public double doubleValue() {
        return 0;
    }

    @Override
    public boolean booleanValue() {
        return false;
    }

    @Override
    public String stringValue() {
        return null;
    }

    @Override
    public boolean isArray() {
        return false;
    }

    @Override
    public boolean isObject() {
        return false;
    }

    @Override
    public boolean isNumber() {
        return false;
    }

    @Override
    public boolean isBoolean() {
        return false;
    }

    @Override
    public boolean isString() {
        return false;
    }

    @Override
    public boolean isFunction() {
        return false;
    }

    @Override
    public boolean isNull() {
        return false;
    }

    @Override
    public void protect() {

    }

    @Override
    public void unprotect() {

    }

    @Override
    public long getIdentify() {
        return 0;
    }

    @Override
    public void release() {

    }
}
