package com.didi.hummer2.utils;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.bridge.JsiArray;
import com.didi.hummer2.bridge.JsiBoolean;
import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.component.Component;
import com.didi.hummer2.component.Element;
import com.didi.hummer2.register.HummerObject;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        if (hummerObject instanceof Element) {
            return (T) hummerObject;
        }
        return null;
    }

    public static <T> T toComponent(HummerContext hummerContext, Object object) {
        long objId = toLong(object);
        HummerObject hummerObject = hummerContext.searchObject(objId);
        if (hummerObject instanceof Component) {
            return (T) hummerObject;
        }
        return null;
    }

    public static <T> T toHummerObject(HummerContext hummerContext, Object object) {
        long objId = toLong(object);
        HummerObject hummerObject = hummerContext.searchObject(objId);
        if (hummerObject != null) {
            return (T) hummerObject;
        }
        return null;
    }

    public static <T> T toJavaModel(Object object, Type type) {
        if (object instanceof JsiObject || object instanceof JsiArray) {
            String value = ((JsiValue) object).toString();
            return HMGsonUtil.fromJson(value, type);
        }
        if (object instanceof JsiNumber) {
            Object result = ((JsiNumber) object).valueDouble();
            return (T) result;
        }
        if (object instanceof JsiString) {
            Object result = ((JsiString) object).valueString();
            return (T) result;
        }
        if (object instanceof JsiBoolean) {
            Object result = ((JsiBoolean) object).getValue();
            return (T) result;
        }
        return null;
    }

    public static <T> T toJavaArray(Object object) {
        if (object instanceof JsiArray) {
            String value = ((JsiValue) object).toString();
            return HMGsonUtil.fromJson(value, new TypeToken<List<Object>>() {
            }.getType());
        }
        return null;
    }

    public static <T> T toJavaMap(Object object) {
        if (object instanceof JsiObject) {
            String value = ((JsiValue) object).toString();
            return HMGsonUtil.fromJson(value, new TypeToken<Map<String, Object>>() {
            }.getType());
        }
        return null;
    }

    public static Map<String, Object> toFlatJavaMap(Object object) {
        if (object instanceof JsiObject) {
            Map<String, Object> result = new HashMap<>();
            JsiObject value = (JsiObject) object;
            for (String key : value.keys()) {
                result.put(key, value.get(key));
            }
            return result;
        }
        return null;
    }


}
