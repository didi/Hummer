package com.didi.hummer.core.engine.jsc;

import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.engine.base.IObjectOperator;
import com.didi.hummer.core.engine.base.IValueOperator;
import com.didi.hummer.core.engine.jsc.base.ObjectOperator;
import com.didi.hummer.core.engine.jsc.base.ValueOperator;
import com.didi.hummer.core.engine.jsc.jni.TypeConvertor;
import com.didi.hummer.core.util.HMGsonUtil;

import java.lang.reflect.Type;

/**
 * JS对象基类
 *
 * Created by XiaoFeng on 2019-09-25.
 */
public class JSCValue implements JSValue {

    public long context;
    public long value;
    private IValueOperator valueOperator;
    private IObjectOperator objectOperator;
    private volatile boolean isUnprotected = true;

    public static JSCValue create(long context, Number value) {
        return wrapper(context, TypeConvertor.makeNumber(context, value.doubleValue()));
    }

    public static JSCValue create(long context, boolean value) {
        return wrapper(context, TypeConvertor.makeBoolean(context, value));
    }

    public static JSCValue create(long context, String value) {
        return wrapper(context, TypeConvertor.makeString(context, value));
    }

    public static JSCValue create(long context, Object object) {
        if (object instanceof Number) {
            return create(context, (Number) object);
        } else if (object instanceof Boolean) {
            return create(context, (Boolean) object);
        } else if (object instanceof String) {
            return create(context, (String) object);
        } else {
            long value = TypeConvertor.makeFromJsonString(context, HMGsonUtil.toJson(object));
            return wrapper(context, value);
        }
    }

    public static JSCValue createEmptyObject(long context) {
        long value = TypeConvertor.makeFromJsonString(context, "{}");
        return wrapper(context, value);
    }

    public static JSCValue createEmptyArray(long context) {
        long value = TypeConvertor.makeFromJsonString(context, "[]");
        return wrapper(context, value);
    }

    public static JSCValue wrapper(long context, long value) {
        return new JSCValue(context, value);
    }

    protected JSCValue(long context, long value) {
        this.context = context;
        this.value = value;
        valueOperator = new ValueOperator(context, value);
        objectOperator = new ObjectOperator(context, value);
    }

    @Override
    public JSContext getJSContext() {
        return JSCContext.wrapper(context);
    }

    @Override
    public boolean isValid() {
        return TypeConvertor.isJSValueValid(context, value);
    }

    @Override
    public long getIdentify() {
        return value;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof JSCValue)) {
            return false;
        }

        JSCValue jsValue = (JSCValue) obj;
        return jsValue.context == this.context && jsValue.value == this.value;
    }

    @Override
    public int intValue() {
        return valueOperator.intValue();
    }

    @Override
    public long longValue() {
        return valueOperator.longValue();
    }

    @Override
    public float floatValue() {
        return valueOperator.floatValue();
    }

    @Override
    public double doubleValue() {
        return valueOperator.doubleValue();
    }

    @Override
    public boolean booleanValue() {
        return valueOperator.booleanValue();
    }

    @Override
    public String stringValue() {
        return valueOperator.stringValue();
    }

    @Override
    public <T> T jsonValueOf(Type type) {
        return valueOperator.jsonValueOf(type);
    }

    @Override
    public boolean isNumber() {
        return valueOperator.isNumber();
    }

    @Override
    public boolean isBoolean() {
        return valueOperator.isBoolean();
    }

    @Override
    public boolean isString() {
        return valueOperator.isString();
    }

    @Override
    public boolean isFunction() {
        return valueOperator.isFunction();
    }

    @Override
    public boolean isNull() {
        return valueOperator.isNull();
    }

    @Override
    public void protect() {
        if (isUnprotected) {
            isUnprotected = false;
            valueOperator.protect();
        }
    }

    @Override
    public void unprotect() {
        if (!isUnprotected) {
            isUnprotected = true;
            valueOperator.unprotect();
        }
    }

    @Override
    public int getInt(String key) {
        return objectOperator.getInt(key);
    }

    @Override
    public long getLong(String key) {
        return objectOperator.getLong(key);
    }

    @Override
    public double getDouble(String key) {
        return objectOperator.getDouble(key);
    }

    @Override
    public boolean getBoolean(String key) {
        return objectOperator.getBoolean(key);
    }

    @Override
    public String getString(String key) {
        return objectOperator.getString(key);
    }

    @Override
    public JSValue getJSValue(String key) {
        return objectOperator.getJSValue(key);
    }

    @Override
    public void set(String key, Number value) {
        objectOperator.set(key, value);
    }

    @Override
    public void set(String key, boolean value) {
        objectOperator.set(key, value);
    }

    @Override
    public void set(String key, String value) {
        objectOperator.set(key, value);
    }

    @Override
    public void set(String key, Object value) {
        objectOperator.set(key, value);
    }

    @Override
    public void set(String key, JSValue value) {
        objectOperator.set(key, value);
    }

    @Override
    public void set(String key, JSCallback value) {
        objectOperator.set(key, value);
    }

    @Override
    public Object callFunction(String funcName, Object... params) {
        return objectOperator.callFunction(funcName, params);
    }

    @Override
    public void release() {
        unprotect();
    }
}
