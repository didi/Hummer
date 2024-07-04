package com.didi.hummer2.bridge;

import androidx.annotation.NonNull;

/**
 * didi Create on 2023/11/21 .
 * <p>
 * Copyright (c) 2023/11/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/21 6:10 下午
 * @Description 不可变对象:数值
 */

public class JsiNumber extends JsiValue implements INumber {
    private final double value;

    public JsiNumber(double value) {
        this.value = value;
    }

    public double getValue() {
        return value;
    }

    @Override
    public int valueInt() {
        return (int) value;
    }

    @Override
    public long valueLong() {
        return (long) value;
    }

    @Override
    public float valueFloat() {
        return (float) value;
    }

    @Override
    public double valueDouble() {
        return value;
    }

    @Override
    public boolean isNumber() {
        return true;
    }

    @Override
    public boolean isJava() {
        return true;
    }

    @Override
    public int getType() {
        return ValueType.TYPE_NUMBER;
    }

    public boolean isInteger() {
        return (long) value == value;
    }

    @NonNull
    @Override
    public String toString() {
        long v = (long) value;
        if (v == value) {
            return Long.toString(v);
        }
        return Double.toString(value);
    }
}
