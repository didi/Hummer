package com.didi.hummer2.bridge;

import androidx.annotation.NonNull;

/**
 * didi Create on 2023/12/5 .
 * <p>
 * Copyright (c) 2023/12/5 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/12/5 8:48 PM
 * @Description 只允许C 传递到java，不允许Java创建
 */

public class HMFunction extends HMValue {

    private HMFunction() {
    }

    private HMFunction(long identify) {
        this.identify = identify;
    }

    public HMValue call(HMValue hmValue) {
        return call_(identify, hmValue.identify);
    }


    @NonNull
    @Override
    public String toString() {
        return "HMFunction{}";
    }

    private native HMValue call_(long identify, long value);


}
