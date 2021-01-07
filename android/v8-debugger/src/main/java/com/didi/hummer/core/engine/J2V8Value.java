package com.didi.hummer.core.engine;

import com.didi.hummer.context.V8HummerContext;
import com.didi.hummer.core.engine.debugger.J2V8ValueDebugger;
import com.didi.hummer.core.util.HMGsonUtil;
import com.eclipsesource.v8.V8;
import com.eclipsesource.v8.V8Array;
import com.eclipsesource.v8.V8Function;
import com.eclipsesource.v8.V8Object;
import com.eclipsesource.v8.V8Value;
import com.eclipsesource.v8.utils.V8ObjectUtils;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

/**
 * Created by XiaoFeng on 2019-11-01.
 */
public class J2V8Value implements JSValue {

    public J2V8Context context;
    public V8Object v8Object;
    public BasicObject basicObj;

    private class BasicObject {
        public V8 v8;
        public Object obj;

        public BasicObject(Object object) {
            this.obj = object;
        }

        public BasicObject(V8 v8, Object object) {
            this.v8 = v8;
            this.obj = object;
        }
    }

    public static J2V8Value create(J2V8Context context, Number value) {
        return new J2V8Value(context, value);
    }
    public static J2V8Value create(J2V8Context context, boolean value) {
        return new J2V8Value(context,value);
    }
    public static J2V8Value create(J2V8Context context, String value) {
        return new J2V8Value(context,value);
    }

    public static J2V8Value createEmptyObject(J2V8Context context) {
        return wrapper(context, new V8Object(context.getV8()));
    }

    public static J2V8Value createEmptyArray(J2V8Context context) {
        return wrapper(context, new V8Array(context.getV8()));
    }

    public static J2V8Value wrapper(J2V8Context context, V8Object v8Object) {
        if (V8HummerContext.isNeedDebug) {
            return J2V8ValueDebugger.wrapper(context, v8Object);
        } else {
            return new J2V8Value(context, v8Object);
        }
    }

    protected J2V8Value() {

    }

    protected J2V8Value(J2V8Context context, V8Object v8Object) {
        this.context = context;
        this.v8Object = v8Object;
    }

    protected J2V8Value(J2V8Context context, Object object) {
        this.context = context;
        if (J2V8Utils.isBasicType(object)) {
            this.basicObj = new BasicObject(context.getV8(), object);
        } else {
            this.v8Object = (V8Object) J2V8Utils.objectToV8Object(context.getV8(), object);
        }
    }

    public V8 getV8() {
        if (basicObj != null) {
            return basicObj.v8;
        } else if (v8Object != null && !v8Object.isUndefined()) {
            return v8Object.getRuntime();
        } else {
            return null;
        }
    }

    @Override
    public JSContext getJSContext() {
        return context;
    }

    @Override
    public boolean isValid() {
        return context != null && (basicObj != null || v8Object != null);
    }

    @Override
    public long getIdentify() {
        try {
            if (basicObj != null) {
                return basicObj.hashCode();
            } else if (v8Object != null) {
                return v8Object.hashCode();
            } else {
                return super.hashCode();
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof J2V8Value)) {
            return false;
        }

        J2V8Value jsValue = (J2V8Value) obj;
        return jsValue.getIdentify() == this.getIdentify();
    }

    @Override
    public void release() {
        if (v8Object != null) {
            v8Object.close();
        }
    }

    @Override
    public int getInt(String key) {
        if (v8Object != null) {
            try {
                return v8Object.getInteger(key);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return 0;
    }

    @Override
    public long getLong(String key) {
        if (v8Object != null) {
            try {
                return v8Object.getInteger(key);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return 0;
    }

    @Override
    public double getDouble(String key) {
        if (v8Object != null) {
            try {
                return v8Object.getDouble(key);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return 0d;
    }

    @Override
    public boolean getBoolean(String key) {
        if (v8Object != null) {
            try {
                return v8Object.getBoolean(key);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return false;
    }

    @Override
    public String getString(String key) {
        if (v8Object != null) {
            try {
                return v8Object.getString(key);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    @Override
    public JSValue getJSValue(String key) {
        if (v8Object != null) {
            try {
                return J2V8Value.wrapper(context, v8Object.getObject(key));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    @Override
    public void set(String key, Number value) {
        if (v8Object == null) {
            return;
        }
        if (value instanceof Integer) {
            v8Object.add(key, value.doubleValue());
        } else if (value instanceof Long) {
            v8Object.add(key, value.longValue());
        } else if (value instanceof Float) {
            v8Object.add(key, value.floatValue());
        } else if (value instanceof Double) {
            v8Object.add(key, value.doubleValue());
        }
    }

    @Override
    public void set(String key, boolean value) {
        if (v8Object == null) {
            return;
        }
        v8Object.add(key, value);
    }

    @Override
    public void set(String key, String value) {
        if (v8Object == null) {
            return;
        }
        v8Object.add(key, value);
    }

    @Override
    public void set(String key, Object value) {
        if (v8Object == null) {
            return;
        }
        if (value instanceof V8Value) {
            v8Object.add(key, (V8Value) value);
        } else if (value instanceof List) {
            v8Object.add(key, V8ObjectUtils.toV8Array(getV8(), (List) value));
        } else if (value instanceof Map) {
            v8Object.add(key, V8ObjectUtils.toV8Object(getV8(), (Map) value));
        } else {
            v8Object.add(key, (V8Value) J2V8Utils.objectToV8Object(getV8(), value));
        }
    }

    @Override
    public void set(String key, JSValue value) {
        if (!(value instanceof J2V8Value)) {
            return;
        }
        J2V8Value v = (J2V8Value) value;
        if (v.basicObj != null) {
            set(key, v.basicObj);
        } else {
            set(key, v.v8Object);
        }
    }

    @Override
    public void set(String key, JSCallback value) {
        if (!(value instanceof J2V8Callback)) {
            return;
        }
        J2V8Callback cb = (J2V8Callback) value;
        set(key, cb.function);
    }

    @Override
    public Object callFunction(String funcName, Object... params) {
        if (v8Object == null) {
            return null;
        }
        try {
            return v8Object.executeJSFunction(funcName, J2V8Utils.objectsToV8Objects(getV8(), params));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int intValue() {
        if (!(basicObj.obj instanceof Number)) {
            return 0;
        }
        return ((Number) basicObj.obj).intValue();
    }

    @Override
    public long longValue() {
        if (!(basicObj.obj instanceof Number)) {
            return 0;
        }
        return ((Number) basicObj.obj).longValue();
    }

    @Override
    public float floatValue() {
        if (!(basicObj.obj instanceof Float)) {
            return 0;
        }
        return ((Number) basicObj.obj).floatValue();
    }

    @Override
    public double doubleValue() {
        if (!(basicObj.obj instanceof Number)) {
            return 0;
        }
        return ((Number) basicObj.obj).doubleValue();
    }

    @Override
    public boolean booleanValue() {
        if (!(basicObj.obj instanceof Boolean)) {
            return false;
        }
        return (boolean) basicObj.obj;
    }

    @Override
    public String stringValue() {
        if (!(basicObj.obj instanceof String)) {
            return null;
        }
        return (String) basicObj.obj;
    }

    @Override
    public <T> T jsonValueOf(Type type) {
        return HMGsonUtil.fromJson(stringValue(), type);
    }

    @Override
    public boolean isNumber() {
        return basicObj.obj instanceof Number;
    }

    @Override
    public boolean isBoolean() {
        return basicObj.obj instanceof Boolean;
    }

    @Override
    public boolean isString() {
        return basicObj.obj instanceof String;
    }

    @Override
    public boolean isFunction() {
        return v8Object instanceof V8Function;
    }

    @Override
    public boolean isNull() {
        return v8Object == null || v8Object.isUndefined();
    }

    @Override
    public void protect() {
        v8Object = v8Object.twin();
    }

    @Override
    public void unprotect() {
        v8Object.close();
    }
}
