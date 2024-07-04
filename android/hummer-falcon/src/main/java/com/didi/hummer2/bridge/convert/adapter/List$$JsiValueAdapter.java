package com.didi.hummer2.bridge.convert.adapter;

import com.didi.hummer2.bridge.JsiArray;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.bridge.convert.JsiValueAdapter;
import com.didi.hummer2.bridge.convert.ValueParser;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

/**
 * didi Create on 2024/7/3 .
 * <p>
 * Copyright (c) 2024/7/3 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/3 3:00 PM
 * @Description 用一句话说明文件功能
 */

public class List$$JsiValueAdapter implements JsiValueAdapter<List> {

    @Override
    public Class<List> getJavaClass() {
        return List.class;
    }

    @Override
    public List toJavaValue(ValueParser parser, JsiValue jsiValue, Type type) {
        if (jsiValue instanceof JsiArray) {
            Type valueType = parser.getArgumentType(type, 0);
            List<Object> result = new ArrayList<>();
            JsiArray jsiArray = (JsiArray) jsiValue;
            int size = jsiArray.length();
            for (int i = 0; i < size; i++) {
                result.add(parser.toJavaValue(jsiArray.getValue(i), valueType));
            }
            return result;
        }
        return null;
    }

    @Override
    public JsiValue toJsiValue(ValueParser parser, List value) {
        if (value != null) {
            JsiArray jsiArray = parser.newJsiArray();
            List<Object> list = (List<Object>) value;
            int size = list.size();
            for (int i = 0; i < size; i++) {
                JsiValue jsiValue = parser.toJsiValue(list.get(i));
                jsiArray.push(jsiValue);
            }
            return jsiArray;
        }
        return null;
    }
}
