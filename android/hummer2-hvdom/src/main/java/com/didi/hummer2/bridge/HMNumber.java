package com.didi.hummer2.bridge;

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

public class HMNumber extends HMValue implements INumber {
    private double value;

    public HMNumber(double value) {
        this.identify = init_number_(value);
        this.value = value;
    }

    private HMNumber(long identify, double value) {
        this.identify = identify;
        this.value = value;
    }

    public double getValue(){
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


    public native long init_number_(double value);

}
