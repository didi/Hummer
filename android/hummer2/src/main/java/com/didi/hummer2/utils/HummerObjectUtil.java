package com.didi.hummer2.utils;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.bridge.JsiArray;
import com.didi.hummer2.bridge.JsiBoolean;
import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.register.HummerObject;

import java.lang.reflect.Type;

/**
 * didi Create on 2024/4/2 .
 * <p>
 * Copyright (c) 2024/4/2 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/2 8:48 PM
 * @Description Hummer数据类型转换工具类
 */

public class HummerObjectUtil {

    public static boolean toBoolean(Object object) {
        if (object instanceof JsiBoolean) {
            return ((JsiBoolean) object).getValue();
        } else if (object instanceof Boolean) {
            return (Boolean) object;
        }
        return false;
    }

    public static int toInt(Object object) {
        if (object instanceof JsiNumber) {
            return ((JsiNumber) object).valueInt();
        } else if (object instanceof Number) {
            return ((Number) object).intValue();
        }
        return 0;
    }

    public static long toLong(Object object) {
        if (object instanceof JsiNumber) {
            return ((JsiNumber) object).valueLong();
        } else if (object instanceof Number) {
            return ((Number) object).longValue();
        }
        return 0;
    }

    public static float toFloat(Object object) {
        if (object instanceof JsiNumber) {
            return ((JsiNumber) object).valueFloat();
        } else if (object instanceof Number) {
            return ((Number) object).floatValue();
        }
        return 0;
    }

    public static double toDouble(Object object) {
        if (object instanceof JsiNumber) {
            return ((JsiNumber) object).valueDouble();
        } else if (object instanceof Number) {
            return ((Number) object).doubleValue();
        }
        return 0;
    }

    public static String toUTFString(Object object) {
        if (object instanceof JsiString) {
            return ((JsiString) object).getValue();
        } else if (object instanceof String) {
            return (String) object;
        }
        return null;
    }

    public static JsiValue toJsiValue(Object object) {
        if (object instanceof JsiValue) {
            return (JsiValue) object;
        }
        return null;
    }

    public static <T> T toElement(HummerContext hummerContext, Object object) {
        long objId = toLong(object);
        HummerObject hummerObject = hummerContext.searchObject(objId);
        if (hummerObject != null) {
            return (T) hummerObject;
        }
        return null;
    }

    public static <T> T toComponent(HummerContext hummerContext, Object object) {
        return null;
    }

    public static <T> T toHummerObject(HummerContext hummerContext, Object object) {
        return null;
    }

    public static <T> T toJavaModel(Object object, Type type) {
        if (object instanceof JsiObject || object instanceof JsiArray) {
            String value = ((JsiValue) object).toString();
            return HMGsonUtil.fromJson(value, type);
        }
        return null;
    }


    public static <T> T toJavaArray(Object object) {
        return null;
    }

    public static <T> T toJavaMap(Object object) {
        return null;
    }


}
