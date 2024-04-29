package com.didi.hummer2.bridge;


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

public class JsiString extends JsiValue {

    private String value;

    public JsiString(String value) {
        this.value = value == null ? "" : value;
        this.identify = init_string_(this.value);
    }

    private JsiString(long identify, String value) {
        this.identify = identify;
        this.value = value;
    }

    public String valueString() {
        return value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public boolean isString() {
        return true;
    }

    private native long init_string_(String value);

}
