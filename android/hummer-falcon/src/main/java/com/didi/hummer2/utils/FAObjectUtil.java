package com.didi.hummer2.utils;

import com.didi.hummer2.bridge.JsiArray;
import com.didi.hummer2.bridge.JsiBoolean;
import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.bridge.JsiValue;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Array;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

/**
 * didi Create on 2024/4/11 .
 * <p>
 * Copyright (c) 2024/4/11 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/11 2:53 PM
 * @Description FAObjectUtil
 */

public class FAObjectUtil {


    private static Type MAP_TYPE = new TypeToken<Map<String, Object>>() {
    }.getType();

    public static <T> T toJavaModel(Object object, Type type) {
        if (object instanceof JsiObject || object instanceof JsiArray) {
            String value = ((JsiValue) object).toString();
            return FAGsonUtil.fromJson(value, type);
        }
        return null;
    }


    public static <T> T toJavaMap(Object object) {
        if (object instanceof JsiObject || object instanceof JsiArray) {
            String value = ((JsiValue) object).toString();
            return FAGsonUtil.fromJson(value, MAP_TYPE);
        }
        return null;
    }


    public static JsiValue toJsiValue(Object object) {
        if (object instanceof JsiValue) {
            return (JsiValue) object;
        }
        if (object instanceof Number) {
            return new JsiNumber(((Number) object).doubleValue());
        }
        if (object instanceof String) {
            return new JsiString((String) object);
        }
        if (object instanceof Boolean) {
            return new JsiBoolean((Boolean) object);
        }
        if (object instanceof Map) {
            //TODO 实现Map的转换
        }
        if (object instanceof List) {
            //TODO 实现List的转换
        }
        if (object instanceof Array) {
            //TODO 实现Array的转换
        }
        return null;
    }


}
