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

public class JsiArray extends JsiValue implements IArray {


    public JsiArray() {
        identify = init_array_();
    }

    private JsiArray(long identify) {
        this.identify = identify;
    }

    @Override
    public int length() {
        return length_(identify);
    }

    @Override
    public JsiValue getValue(int index) {
        return get_value_(identify, index);
    }

    @Override
    public boolean setValue(int index, JsiValue value) {
        return set_value_(identify, index, value.identify);
    }

    @Override
    public void push(JsiValue value) {
        push_(identify, value.identify);
    }

    @Override
    public void pop() {
        pop_(identify);
    }

    @Override
    public JsiValue removeAt(int index) {
        return remove_value_at_(identify, index);
    }

    @Override
    public JsiValue remove(JsiValue value) {
        return remove_value_(identify, value.identify);
    }

    @Override
    public void clear() {
        clear_(identify);
    }

    private native long init_array_();

    private native int length_(long identify);

    private native JsiValue get_value_(long identify, int index);

    private native boolean set_value_(long identify, int index, long value);

    private native void push_(long identify, long value);

    private native JsiValue pop_(long identify);

    private native JsiValue remove_value_at_(long identify, int index);

    private native JsiValue remove_value_(long identify, long value);

    private native void clear_(long identify);

}
