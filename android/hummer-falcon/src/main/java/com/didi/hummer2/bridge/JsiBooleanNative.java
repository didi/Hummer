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

public final class JsiBooleanNative extends JsiBoolean {

    JsiBooleanNative(boolean value) {
        super(value);
        identify = init_boolean_(value);
    }

    private JsiBooleanNative(long identify, boolean value) {
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

    private native long init_boolean_(boolean value);

}
