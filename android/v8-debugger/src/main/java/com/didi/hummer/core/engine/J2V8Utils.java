package com.didi.hummer.core.engine;

import com.didi.hummer.core.util.HMGsonUtil;
import com.eclipsesource.v8.V8;
import com.eclipsesource.v8.V8Array;
import com.eclipsesource.v8.V8Function;
import com.eclipsesource.v8.V8Object;
import com.eclipsesource.v8.utils.V8ObjectUtils;
import com.google.gson.reflect.TypeToken;

import java.util.List;
import java.util.Map;

/**
 * Created by XiaoFeng on 2019-11-03.
 */
public class J2V8Utils {

    public static boolean isBasicType(Object object) {
        return object instanceof Number
                || object instanceof Boolean
                || object instanceof String;
    }

    public static Object objectToV8Object(V8 v8, Object object) {
        if (object == null) {
            return null;
        }
        // J2V8返回值暂时不支持long型，需要先转成int
        if (object instanceof Long) {
            object = ((Number) object).intValue();
        }
        if (isBasicType(object) || object instanceof V8Object) {
            return object;
        } else if (object instanceof J2V8Value) {
            return ((J2V8Value) object).v8Object;
        } else {
            V8Object ret = new V8Object(v8);
            String jsonStr = HMGsonUtil.toJson(object);
            if (HMGsonUtil.isValidJsonString(jsonStr)) {
                if (object instanceof List) {
                    List<Object> list = HMGsonUtil.fromJson(jsonStr, new TypeToken<List<Object>>() {}.getType());
                    ret = V8ObjectUtils.toV8Array(v8, list);
                } else {
                    Map<String, Object> map = HMGsonUtil.fromJson(jsonStr, new TypeToken<Map<String, Object>>() {}.getType());
                    ret = V8ObjectUtils.toV8Object(v8, map);
                }
            }
            return ret;
        }
    }

    public static V8Array objectsToV8Array(V8 v8, Object... objects) {
        V8Array parameters = new V8Array(v8);
        if (objects == null) {
            return parameters;
        }
        for (Object obj : objects) {
            if (isBasicType(obj)) {
                parameters.push(obj);
            } else {
                parameters.push(objectToV8Object(v8, obj));
            }
        }
        return parameters;
    }

    public static Object[] objectsToV8Objects(V8 v8, Object... objects) {
        if (objects == null) {
            return null;
        }
        Object[] parameters = new Object[objects.length];
        for (int i = 0; i < objects.length; i++) {
            if (isBasicType(objects[i])) {
                parameters[i] = objects[i];
            } else {
                parameters[i] = objectToV8Object(v8, objects[i]);
            }
        }
        return parameters;
    }

    public static Object objectToJ2V8Object(J2V8Context context, Object object) {
        if (object == null || ((object instanceof V8Object) && ((V8Object) object).isUndefined())) {
            return null;
        }

        Object obj = object;
        if (object instanceof V8Function) {
            // 把参数中的V8Function转成V8JSCallback，防止V8Function被提前释放
            obj = J2V8Callback.wrapper(context, ((V8Function) object).twin());
        } else if (object instanceof V8Object) {
            // 把参数中的V8Object转成J2V8Value，防止V8Object被提前释放
            obj = J2V8Value.wrapper(context, ((V8Object) object).twin());
        }
        return obj;
    }

    public static Object[] objectsToJ2V8Objects(J2V8Context context, Object... objects) {
        if (objects == null) {
            return new Object[0];
        }
        Object[] ret = new Object[objects.length];
        for (int i = 0; i < objects.length; i++) {
            ret[i] = objectToJ2V8Object(context, objects[i]);
        }
        return ret;
    }
}
