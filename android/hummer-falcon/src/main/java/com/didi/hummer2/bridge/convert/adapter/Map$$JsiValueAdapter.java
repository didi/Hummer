package com.didi.hummer2.bridge.convert.adapter;

import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.bridge.convert.JsiValueAdapter;
import com.didi.hummer2.bridge.convert.ValueParser;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

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

public class Map$$JsiValueAdapter implements JsiValueAdapter<Map> {

    @Override
    public Class<Map> getJavaClass() {
        return Map.class;
    }

    @Override
    public Map toJavaValue(ValueParser parser, JsiValue jsiValue, Type type) {
        if (jsiValue instanceof JsiObject) {
            Type valueType = parser.getArgumentType(type, 1);
            Map<String, Object> result = new HashMap<>();
            JsiObject jsiObject = (JsiObject) jsiValue;
            for (String key : jsiObject.keys()) {
                result.put(key, parser.toJavaValue(jsiObject.get(key), valueType));
            }
            return result;
        }
        return null;
    }

    @Override
    public JsiValue toJsiValue(ValueParser parser, Map value) {
        if (value != null) {
            JsiObject jsiObject = parser.newJsiObject();
            Map<String, Object> map = (Map<String, Object>) value;
            for (Map.Entry<String, Object> entry : map.entrySet()) {
                JsiValue jsiValue = parser.toJsiValue(entry.getValue());
                jsiObject.put(entry.getKey(), jsiValue);
            }
            return jsiObject;
        }
        return null;
    }
}
