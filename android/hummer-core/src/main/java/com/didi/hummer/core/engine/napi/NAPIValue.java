package com.didi.hummer.core.engine.napi;

import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.engine.napi.jni.JSEngine;

import java.lang.reflect.Type;

/**
 * Created by XiaoFeng on 2021/6/29.
 */
public class NAPIValue implements JSValue {

    public long context;
    public long value;
    private volatile boolean isUnprotected = true;

    public static NAPIValue wrapper(long context, long value) {
        return new NAPIValue(context, value);
    }

    protected NAPIValue(long context, long value) {
        this.context = context;
        this.value = value;
    }

    @Override
    public JSContext getJSContext() {
        return NAPIContext.wrapper(context);
    }

    @Override
    public boolean isValid() {
        return JSEngine.isJSValueValid(context, value);
    }

    @Override
    public int getInt(String key) {
        Object obj = JSEngine.getProperty(this.context, this.value, key);
        if (!(obj instanceof Number)) {
            return 0;
        }
        return ((Number) obj).intValue();
    }

    @Override
    public long getLong(String key) {
        Object obj = JSEngine.getProperty(this.context, this.value, key);
        if (!(obj instanceof Number)) {
            return 0;
        }
        return ((Number) obj).longValue();
    }

    @Override
    public double getDouble(String key) {
        Object obj = JSEngine.getProperty(this.context, this.value, key);
        if (!(obj instanceof Number)) {
            return 0;
        }
        return ((Number) obj).doubleValue();
    }

    @Override
    public boolean getBoolean(String key) {
        Object obj = JSEngine.getProperty(this.context, this.value, key);
        if (!(obj instanceof Boolean)) {
            return false;
        }
        return (boolean) obj;
    }

    @Override
    public String getString(String key) {
        Object obj = JSEngine.getProperty(this.context, this.value, key);
        if (!(obj instanceof String)) {
            return null;
        }
        return (String) obj;
    }

    @Override
    public JSValue getJSValue(String key) {
        Object obj = JSEngine.getProperty(this.context, this.value, key);
        if (obj instanceof JSCallback) {
            return (JSCallback) obj;
        } else if (obj instanceof JSValue) {
            return (JSValue) obj;
        }
        return null;
    }

    @Override
    public void set(String key, Number value) {
        JSEngine.setProperty(this.context, this.value, key, value);
    }

    @Override
    public void set(String key, boolean value) {
        JSEngine.setProperty(this.context, this.value, key, value);
    }

    @Override
    public void set(String key, String value) {
        JSEngine.setProperty(this.context, this.value, key, value);
    }

    @Override
    public void set(String key, Object value) {
        JSEngine.setProperty(this.context, this.value, key, value);
    }

    @Override
    public void set(String key, JSValue value) {
        JSEngine.setProperty(this.context, this.value, key, value);
    }

    @Override
    public void set(String key, JSCallback value) {
        JSEngine.setProperty(this.context, this.value, key, value);
    }

    @Override
    public Object callFunction(String funcName, Object... params) {
        Object obj = JSEngine.getProperty(this.context, this.value, funcName);
        if (!(obj instanceof JSCallback)) {
            return null;
        }
        return JSEngine.callFunction(this.context, this.value, ((JSCallback) obj).getIdentify(), params);
    }

    @Deprecated
    @Override
    public int intValue() {
        return 0;
    }

    @Deprecated
    @Override
    public long longValue() {
        return 0;
    }

    @Deprecated
    @Override
    public float floatValue() {
        return 0;
    }

    @Deprecated
    @Override
    public double doubleValue() {
        return 0;
    }

    @Deprecated
    @Override
    public boolean booleanValue() {
        return false;
    }

    @Deprecated
    @Override
    public String stringValue() {
        return null;
    }

    @Deprecated
    @Override
    public <T> T jsonValueOf(Type type) {
        return null;
    }

    @Deprecated
    @Override
    public boolean isNumber() {
        return false;
    }

    @Deprecated
    @Override
    public boolean isBoolean() {
        return false;
    }

    @Deprecated
    @Override
    public boolean isString() {
        return false;
    }

    @Deprecated
    @Override
    public boolean isFunction() {
        return false;
    }

    @Deprecated
    @Override
    public boolean isNull() {
        return false;
    }

    @Override
    public void protect() {
        if (isUnprotected) {
            isUnprotected = false;
            JSEngine.protect(context, value);
        }
    }

    @Override
    public void unprotect() {
        if (!isUnprotected) {
            isUnprotected = true;
            JSEngine.unProtect(context, value);
        }
    }

    @Override
    public long getIdentify() {
        return value;
    }

    @Override
    public void release() {
        unprotect();
    }
}
