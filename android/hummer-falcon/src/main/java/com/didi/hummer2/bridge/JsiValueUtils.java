package com.didi.hummer2.bridge;

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
                if (jsiValue instanceof JsiObject) {
                    return toJavaValueArr((JsiObject) jsiValue);
                }
                if (jsiValue instanceof JsiArray) {
                    return toJavaValueObj((JsiArray) jsiValue);
                }
            }
        }
        return null;
    }

    private static JsiObject toJavaValueArr(JsiObject jsiValue) {
        return new JsiObjectJava(jsiValue);
    }

    private static JsiArray toJavaValueObj(JsiArray jsiValue) {
        return new JsiArrayJava(jsiValue);
    }
}
