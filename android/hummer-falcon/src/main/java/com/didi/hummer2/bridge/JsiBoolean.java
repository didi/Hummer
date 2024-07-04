package com.didi.hummer2.bridge;

import androidx.annotation.NonNull;

/**
 * didi Create on 2023/11/21 .
 * <p>
 * Copyright (c) 2023/11/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/21 6:18 下午
 * @Description 不可变对象：boolean
 */

public class JsiBoolean extends JsiValue {

    private final boolean value;

    public JsiBoolean(boolean value) {
        this.value = value;
    }

    public boolean getValue() {
        return value;
    }

    @Override
    public boolean isBoolean() {
        return true;
    }


    @Override
    public boolean isJava() {
        return true;
    }

    @Override
    public int getType() {
        return ValueType.TYPE_BOOLEAN;
    }

    @NonNull
    @Override
    public String toString() {
        return "" + value;
    }

}
