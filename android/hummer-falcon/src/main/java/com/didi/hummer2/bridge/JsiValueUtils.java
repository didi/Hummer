package com.didi.hummer2.bridge;

import java.lang.reflect.Array;
import java.util.List;
import java.util.Map;

/**
 * didi Create on 2024/6/26 .
 * <p>
 * Copyright (c) 2024/6/26 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/6/26 10:48 AM
 * @Description 将数据转换成纯Java数据类型
 */

public class JsiValueUtils {

    private JsiValueUtils() {
    }

    public static JsiValue toJavaJsiValue(Object value) {
        if (value instanceof JsiValue) {
            return toJavaValue((JsiValue) value);
        }
        return null;
    }

    public static void toJavaValue(JsiValue[] value) {
        if (value != null && value.length > 0) {
            int size = value.length;
            for (int i = 0; i < size; i++) {
                value[i] = toJavaValue(value[i]);
            }
        }
    }

    public static JsiValue toJavaValue(JsiValue jsiValue) {
        if (jsiValue != null) {
            if (jsiValue.isJava()) {
                return jsiValue;
            } else {
                if (jsiValue instanceof JsiObjectNative) {
                    return toJavaValueObj((JsiObjectNative) jsiValue);
                }
                if (jsiValue instanceof JsiArrayNative) {
                    return toJavaValueArr((JsiArrayNative) jsiValue);
                }
            }
        }
        return null;
    }

    private static JsiObject toJavaValueObj(JsiObjectNative jsiValue) {
        JsiObject jsiObject = new JsiObject();
        List<String> keys = jsiValue.keys();
        for (String key : keys) {
            jsiObject.put(key, toJavaValue(jsiValue.get(key)));
        }
        return jsiObject;
    }

    private static JsiArray toJavaValueArr(JsiArrayNative jsiValue) {
        JsiArray jsiArray = new JsiArray();
        int size = jsiValue.length();
        for (int i = 0; i < size; i++) {
            jsiArray.push(toJavaValue(jsiValue.getValue(i)));
        }
        return jsiArray;
    }


    public static void toNativeValue(JsiValue[] value) {
        if (value != null && value.length > 0) {
            int size = value.length;
            for (int i = 0; i < size; i++) {
                value[i] = toNativeValue(value[i]);
            }
        }
    }

    public static JsiValue toNativeValue(Object value) {
        if (value instanceof JsiValue) {
            return toNativeValue((JsiValue) value);
        }
        return null;
    }

    public static JsiValue toNativeValue(JsiValue jsiValue) {
        if (jsiValue != null) {
            if (jsiValue.isJava()) {
                if (jsiValue instanceof JsiBoolean) {
                    return new JsiBooleanNative(((JsiBoolean) jsiValue).getValue());
                }
                if (jsiValue instanceof JsiNumber) {
                    return new JsiNumberNative(((JsiNumber) jsiValue).getValue());
                }
                if (jsiValue instanceof JsiString) {
                    return new JsiStringNative(((JsiString) jsiValue).getValue());
                }
                if (jsiValue instanceof JsiObject) {
                    return toNativeValueObj((JsiObject) jsiValue);
                }
                if (jsiValue instanceof JsiArray) {
                    return toNativeValueArr((JsiArray) jsiValue);
                }
            }
        }
        return null;
    }


    private static JsiObject toNativeValueObj(JsiObject jsiValue) {
        JsiObject jsiObject = new JsiObjectNative();
        List<String> keys = jsiValue.keys();
        for (String key : keys) {
            jsiObject.put(key, toNativeValue(jsiValue.get(key)));
        }
        return jsiObject;
    }

    private static JsiArray toNativeValueArr(JsiArray jsiValue) {
        JsiArray jsiArray = new JsiArrayNative();
        int size = jsiValue.length();
        for (int i = 0; i < size; i++) {
            jsiArray.push(toNativeValue(jsiValue.getValue(i)));
        }
        return jsiArray;
    }


    /**
     * 将Java基础数据类型转化为JsiValue(C++可用数据)
     *
     * @param object 基础数据类型，自定义类型被忽略
     * @return JsiValue
     */
    public static JsiValue toNativeJsiValue(Object object) {
        if (object instanceof JsiValue) {
            return toNativeValue((JsiValue) object);
        }
        if (object instanceof Number) {
            return new JsiNumberNative(((Number) object).doubleValue());
        }
        if (object instanceof String) {
            return new JsiStringNative((String) object);
        }

        if (object instanceof Boolean) {
            return new JsiBooleanNative((Boolean) object);
        }
        if (object instanceof Map) {
            Map<String, Object> map = (Map) object;
            JsiObject jsiObject = new JsiObjectNative();
            for (Map.Entry<String, Object> entry : map.entrySet()) {
                JsiValue jsiValue = toNativeJsiValue(entry.getValue());
                if (jsiValue != null) {
                    jsiObject.put(entry.getKey(), jsiValue);
                }
            }
            return jsiObject;
        }
        if (object instanceof List) {
            List<Object> list = (List) object;
            JsiArray jsiArray = new JsiArrayNative();
            for (Object obj : list) {
                JsiValue jsiValue = toNativeJsiValue(obj);
                if (jsiValue != null) {
                    jsiArray.push(jsiValue);
                }
            }
            return jsiArray;
        }
        if (object instanceof Array) {
            Object[] array = (Object[]) object;
            JsiArray jsiArray = new JsiArrayNative();
            for (Object obj : array) {
                JsiValue jsiValue = toNativeJsiValue(obj);
                if (jsiValue != null) {
                    jsiArray.push(jsiValue);
                }
            }
            return jsiArray;
        }
        return null;
    }

}
