package com.didi.hummer2.bridge;

/**
 * didi Create on 2024/7/3 .
 * <p>
 * Copyright (c) 2024/7/3 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/3 3:42 PM
 * @Description 用一句话说明文件功能
 */

public class JsiValueBuilder {


    public JsiString newJsiString(String value) {
        return new JsiStringNative(value);
    }

    public JsiNumber newJsiNumber(double value) {
        return new JsiNumberNative(value);
    }

    public JsiBoolean newJsiBoolean(boolean value) {
        return new JsiBooleanNative(value);
    }

    public JsiObject newJsiObject() {
        return new JsiObjectNative();
    }

    public JsiArray newJsiArray() {
        return new JsiArrayNative();
    }
}
