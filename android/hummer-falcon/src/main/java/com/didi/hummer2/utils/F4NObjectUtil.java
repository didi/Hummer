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
import java.util.ArrayList;
import java.util.HashMap;
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

public class F4NObjectUtil {


    private static Type MAP_TYPE = new TypeToken<Map<String, Object>>() {
    }.getType();

    public static <T> T toJavaModel(Object object, Type type) {
        if (object instanceof JsiObject || object instanceof JsiArray) {
            String value = ((JsiValue) object).toString();
            return F4NGsonUtil.fromJson(value, type);
        }
        return null;
    }


    public static <T> T toJavaMap(Object object) {
        if (object instanceof JsiObject || object instanceof JsiArray) {
            String value = ((JsiValue) object).toString();
            return F4NGsonUtil.fromJson(value, MAP_TYPE);
        }
        return null;
    }


    public static Object toJavaObject(JsiValue object) {
        if (object != null) {
            if (object instanceof JsiNumber) {
                Object result = ((JsiNumber) object).valueDouble();
                return result;
            }
            if (object instanceof JsiString) {
                Object result = ((JsiString) object).valueString();
                return result;
            }
            if (object instanceof JsiBoolean) {
                Object result = ((JsiBoolean) object).getValue();
                return result;
            }
            if (object instanceof JsiObject) {
                JsiObject jsiObject = (JsiObject) object;
                List<String> keys = jsiObject.keys();
                Map<String, Object> result = new HashMap<>();
                for (String key : keys) {
                    result.put(key, toJavaObject(jsiObject.get(key)));
                }
                return result;
            }
            if (object instanceof JsiArray) {
                JsiArray jsiArray = (JsiArray) object;
                int size = jsiArray.length();
                List<Object> result = new ArrayList<>();
                for (int i = 0; i < size; i++) {
                    result.add(toJavaObject(jsiArray.getValue(i)));
                }
                return result;
            }
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
            Map<String, Object> map = (Map) object;
            JsiObject jsiObject = new JsiObject();
            for (Map.Entry<String, Object> entry : map.entrySet()) {
                JsiValue jsiValue = toJsiValue(entry.getValue());
                if (jsiValue != null) {
                    jsiObject.put(entry.getKey(), jsiValue);
                }
            }
            return jsiObject;
        }
        if (object instanceof List) {
            List<Object> list = (List) object;
            JsiArray jsiArray = new JsiArray();
            for (Object obj : list) {
                JsiValue jsiValue = toJsiValue(obj);
                if (jsiValue != null) {
                    jsiArray.push(jsiValue);
                }
            }
            return jsiArray;
        }
        if (object instanceof Array) {
            Object[] array = (Object[]) object;
            JsiArray jsiArray = new JsiArray();
            for (Object obj : array) {
                JsiValue jsiValue = toJsiValue(obj);
                if (jsiValue != null) {
                    jsiArray.push(jsiValue);
                }
            }
            return jsiArray;
        }
        return null;
    }


}
