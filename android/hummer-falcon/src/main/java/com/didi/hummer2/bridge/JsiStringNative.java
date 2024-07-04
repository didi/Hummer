package com.didi.hummer2.bridge;


import androidx.annotation.NonNull;

/**
 * didi Create on 2023/11/21 .
 * <p>
 * Copyright (c) 2023/11/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/21 6:13 下午
 * @Description 不可变对象，不能为null
 */

public final class JsiStringNative extends JsiString {


    JsiStringNative(String value) {
        super(value);
        this.identify = init_string_(value);
    }

    private JsiStringNative(long identify, String value) {
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

    private native long init_string_(String value);

}
