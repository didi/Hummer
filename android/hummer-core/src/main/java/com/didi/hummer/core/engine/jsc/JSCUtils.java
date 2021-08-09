package com.didi.hummer.core.engine.jsc;

import com.didi.hummer.core.engine.jsc.jni.TypeConvertor;
import com.didi.hummer.core.util.HMGsonUtil;

/**
 * Created by XiaoFeng on 2019-11-02.
 */
public class JSCUtils {

    public static final long POINTER_NULL = -1L;

    public static Object jsValueToObject(long jsContext, long jsValue) {
        return jsValueToObject(JSCValue.wrapper(jsContext, jsValue));
    }

    public static Object jsValueToObject(JSCValue jsValue) {
        if (jsValue == null || jsValue.isNull()) {
            return null;
        }
        if (jsValue.isNumber()) {
            return jsValue.doubleValue();
        } else if (jsValue.isBoolean()) {
            return jsValue.booleanValue();
        } else if (jsValue.isString()) {
            return jsValue.stringValue();
        } else if (jsValue.isFunction()) {
            return JSCCallback.wrapper(jsValue.context, jsValue.value);
        }
        return jsValue;
    }

    public static Object[] jsValuesToObjects(long jsContext, long... jsValues) {
        Object[] params;
        if (jsValues != null && jsValues.length > 0) {
            params = new Object[jsValues.length];
            for (int i = 0; i < jsValues.length; i++) {
                params[i] = jsValueToObject(jsContext, jsValues[i]);
            }
        } else {
            params = new Object[0];
        }
        return params;
    }

    public static long objectToJsValue(long jsContext, Object object) {
        if (object == null) {
            return POINTER_NULL;
        }
        long value;
        if (object instanceof Number) {
            value = TypeConvertor.makeNumber(jsContext, ((Number) object).doubleValue());
        } else if (object instanceof Boolean) {
            value = TypeConvertor.makeBoolean(jsContext, (boolean) object);
        } else if (object instanceof String) {
            value = TypeConvertor.makeString(jsContext, (String) object);
        } else if (object instanceof JSCValue) {
            value = ((JSCValue) object).value;
        } else {
            value = TypeConvertor.makeFromJsonString(jsContext, HMGsonUtil.toJson(object));
        }
        return value;
    }

    public static long[] objectsToJsValues(long jsContext, Object... objects) {
        if (objects == null) {
            return null;
        }
        long[] values = new long[objects.length];
        for (int i = 0; i < objects.length; i++) {
            values[i] = objectToJsValue(jsContext, objects[i]);
        }
        return values;
    }
}
