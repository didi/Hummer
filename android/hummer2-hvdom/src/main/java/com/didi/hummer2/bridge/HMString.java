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

public class HMString extends HMValue {

    private String value;

    public HMString(String value) {
        this.identify = init_string_(value);
        this.value = value;
    }

    private HMString(long identify, String value) {
        this.identify = identify;
        this.value = value;
    }

    public String valueString() {
        return value;
    }

    public String getValue(){
        return value;
    }

    @Override
    public boolean isString() {
        return true;
    }

    private native long init_string_(String value);

}
