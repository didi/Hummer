package com.didi.hummer2.utils;

import com.didi.hummer2.bridge.JsiArray;
import com.didi.hummer2.bridge.JsiBoolean;
import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.bridge.convert.HummerParser;

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

    private static HummerParser hummerParser;


    private static HummerParser getHummerParser() {
        if (hummerParser == null) {
            synchronized (F4NObjectUtil.class) {
                if (hummerParser == null) {
                    hummerParser = new HummerParser();
                }
            }
        }
        return hummerParser;
    }

    /**
     * JsiValue 转换成Java数据
     */
    public static <T> T toHummerJavaModel(Object object, Type type) {
        return (T) getHummerParser().toJavaValue((JsiValue) object, type);
    }


    /**
     * Java数据转换成NativeJsiValue
     */
    public static JsiValue toHummerJsiValue(Object object) {
        return getHummerParser().toJsiValue(object);
    }

    /**
     * 将JsiObject 转化为基础Map类型（通过遍历转化，不支持支持自定义类型数据转化）
     * <p>
     * 仅支持转化复杂类型，基础类型不支持
     *
     * @param object
     */
    public static <T> T toSimpleJavaMap(Object object) {
        if (object instanceof JsiObject) {
            return (T) toSimpleJavaObject(object);
        }
        return null;
    }

    /**
     * 将JsiValue转化为纯java数据类型
     *
     * @param object
     * @return 本身是基础类型的不做处理，是JsiValue的将被转化为Java基础数据类型
     */
    public static Object toSimpleJavaObject(Object object) {
        if (object != null) {
            if (object instanceof JsiNumber) {
                JsiNumber jsiNumber = ((JsiNumber) object);
                boolean integer = jsiNumber.isInteger();
                Object result = integer ? jsiNumber.valueLong() : jsiNumber.valueDouble();
                return result;
            }
            if (object instanceof JsiString) {
                Object result = ((JsiString) object).getValue();
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
                    result.put(key, toSimpleJavaObject(jsiObject.get(key)));
                }
                return result;
            }
            if (object instanceof JsiArray) {
                JsiArray jsiArray = (JsiArray) object;
                int size = jsiArray.length();
                List<Object> result = new ArrayList<>();
                for (int i = 0; i < size; i++) {
                    result.add(toSimpleJavaObject(jsiArray.getValue(i)));
                }
                return result;
            }
            return object;
        }
        return null;
    }


    /**
     * 将Java基础数据类型转化为JsiValue
     *
     * @param object 基础数据类型，自定义类型被忽略
     * @return JsiValue
     */
    public static JsiValue toSimpleJsiValue(Object object) {
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
                JsiValue jsiValue = toSimpleJsiValue(entry.getValue());
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
                JsiValue jsiValue = toSimpleJsiValue(obj);
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
                JsiValue jsiValue = toSimpleJsiValue(obj);
                if (jsiValue != null) {
                    jsiArray.push(jsiValue);
                }
            }
            return jsiArray;
        }
        return null;
    }


}
