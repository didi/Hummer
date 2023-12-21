package com.didi.hummer2.bridge;


/**
 * didi Create on 2023/11/21 .
 * <p>
 * Copyright (c) 2023/11/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/21 6:11 下午
 * @Description 数组：类list
 */

public class HMArray extends HMValue implements IArray {

    public HMArray() {
        identify = init_array_();
    }

    public HMArray(long identify) {
        this.identify = identify;
    }

    @Override
    public int length() {
        return length_(identify);
    }

    @Override
    public HMValue get(int index) {
        return get_value_(identify, index);
    }

    @Override
    public boolean set(int index, HMValue value) {
        return set_value_(identify, index, value.identify);
    }

    @Override
    public void add(HMValue value) {
        add_value_(identify, value.identify);
    }

    @Override
    public void add(int index, HMValue value) {
        set_value_(identify, index, value.identify);
    }

    @Override
    public HMValue remove(int index) {
        return remove_value_(identify, index);
    }

    @Override
    public HMValue remove(HMValue value) {
        return remove_value_(identify, value);
    }

    private native long init_array_();

    private native int length_(long identify);

    private native HMValue get_value_(long identify, int index);

    private native boolean set_value_(long identify, int index, long value);

    private native void add_value_(long identify, long value);

    private native HMValue remove_value_(long identify, int index);

    private native HMValue remove_value_(long identify, HMValue value);

}
