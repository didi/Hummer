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

public final class JsiNumberNative extends JsiNumber {

    JsiNumberNative(double value) {
        super(value);
        this.identify = init_number_(value);
    }

    private JsiNumberNative(long identify, double value) {
        super(value);
        this.identify = identify;
    }

    @Override
    public boolean isJava() {
        return true;
    }

    @NonNull
    @Override
    public String toString() {
        return super.toString();
    }

    public native long init_number_(double value);

}
