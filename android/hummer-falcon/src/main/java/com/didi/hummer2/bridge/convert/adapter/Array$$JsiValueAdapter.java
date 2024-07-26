package com.didi.hummer2.bridge.convert.adapter;

import com.didi.hummer2.bridge.JsiArray;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.bridge.convert.BaseAdapter;
import com.didi.hummer2.bridge.convert.ValueParser;

import java.lang.reflect.Array;
import java.lang.reflect.Type;

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

public class Array$$JsiValueAdapter extends BaseAdapter<Object> {

    @Override
    public Class<?> getJavaClass() {
        return Array.class;
    }

    @Override
    public Object toJavaValue(ValueParser parser, JsiValue jsiValue, Type type) {
        if (jsiValue instanceof JsiArray) {
            Type valueType = parser.getComponentType(type);
            JsiArray jsiArray = (JsiArray) jsiValue;
            Object[] result = new Object[jsiArray.length()];
            int size = jsiArray.length();
            for (int i = 0; i < size; i++) {
                result[i] = parser.toJavaValue(jsiArray.getValue(i), valueType);
            }
            return result;
        }
        return null;
    }

    @Override
    public JsiValue toJsiValue(ValueParser parser, Object value) {
        if (value != null) {
            JsiArray jsiArray = parser.newJsiArray();
            int size = Array.getLength(value);
            for (int i = 0; i < size; i++) {
                JsiValue jsiValue = parser.toJsiValue(Array.get(value, i));
                jsiArray.push(jsiValue);
            }
            return jsiArray;
        }
        return null;
    }
}
