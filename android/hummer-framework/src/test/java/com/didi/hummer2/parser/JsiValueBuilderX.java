package com.didi.hummer2.parser;

import com.didi.hummer2.bridge.JsiArray;
import com.didi.hummer2.bridge.JsiBoolean;
import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.bridge.JsiValueBuilder;

/**
 * didi Create on 2024/7/3 .
 * <p>
 * Copyright (c) 2024/7/3 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/3 9:13 PM
 * @Description 用一句话说明文件功能
 */

public class JsiValueBuilderX extends JsiValueBuilder {

    @Override
    public JsiString newJsiString(String value) {
        return new JsiString(value);
    }

    @Override
    public JsiNumber newJsiNumber(double value) {
        return new JsiNumber(value);
    }

    @Override
    public JsiBoolean newJsiBoolean(boolean value) {
        return new JsiBoolean(value);
    }

    @Override
    public JsiObject newJsiObject() {
        return new JsiObject();
    }

    @Override
    public JsiArray newJsiArray() {
        return new JsiArray();
    }
}
