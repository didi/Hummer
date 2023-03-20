package com.didi.hummer.core.engine.napi;

import androidx.annotation.MainThread;

import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.engine.base.ICallback;
import com.didi.hummer.core.engine.napi.jni.JSEngine;
import com.didi.hummer.utils.UIThreadUtil;

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

    @MainThread
    @Override
    public boolean isValid() {
        UIThreadUtil.assetOnMainThreadCall("NAPIValue.isValid");
        return JSEngine.isJSValueValid(context, value);
    }

    @MainThread
    @Override
    public int getInt(String key) {
        UIThreadUtil.assetOnMainThreadCall("NAPIValue.isValid");
        Object obj = JSEngine.getProperty(this.context, this.value, key);
        if (!(obj instanceof Number)) {
            return 0;
        }
        return ((Number) obj).intValue();
    }

    @MainThread
    @Override
    public long getLong(String key) {
        UIThreadUtil.assetOnMainThreadCall("NAPIValue.isValid");
        Object obj = JSEngine.getProperty(this.context, this.value, key);
        if (!(obj instanceof Number)) {
            return 0;
        }
        return ((Number) obj).longValue();
    }

    @MainThread
    @Override
    public double getDouble(String key) {
        UIThreadUtil.assetOnMainThreadCall("NAPIValue.isValid");
        Object obj = JSEngine.getProperty(this.context, this.value, key);
        if (!(obj instanceof Number)) {
            return 0;
        }
        return ((Number) obj).doubleValue();
    }

    @MainThread
    @Override
    public boolean getBoolean(String key) {
        UIThreadUtil.assetOnMainThreadCall("NAPIValue.isValid");
        Object obj = JSEngine.getProperty(this.context, this.value, key);
        if (!(obj instanceof Boolean)) {
            return false;
        }
        return (boolean) obj;
    }

    @MainThread
    @Override
    public String getString(String key) {
        UIThreadUtil.assetOnMainThreadCall("NAPIValue.isValid");
        Object obj = JSEngine.getProperty(this.context, this.value, key);
        if (!(obj instanceof String)) {
            return null;
        }
        return (String) obj;
    }

    @MainThread
    @Override
    public JSValue getJSValue(String key) {
        UIThreadUtil.assetOnMainThreadCall("NAPIValue.isValid");
        Object obj = JSEngine.getProperty(this.context, this.value, key);
        if (obj instanceof JSCallback) {
            return (JSCallback) obj;
        } else if (obj instanceof JSValue) {
            return (JSValue) obj;
        }
        return null;
    }

    @MainThread
    @Override
    public void set(String key, Number value) {
        UIThreadUtil.assetOnMainThread("call method NAPIValue.set(Number) is not on main thread.");
        JSEngine.setProperty(this.context, this.value, key, value);
    }

    @MainThread
    @Override
    public void set(String key, boolean value) {
        UIThreadUtil.assetOnMainThread("call method NAPIValue.set(boolean) is not on main thread.");
        JSEngine.setProperty(this.context, this.value, key, value);
    }

    @MainThread
    @Override
    public void set(String key, String value) {
        UIThreadUtil.assetOnMainThread("call method NAPIValue.set(String) is not on main thread.");
        JSEngine.setProperty(this.context, this.value, key, value);
    }

    @MainThread
    @Override
    public void set(String key, Object value) {
        UIThreadUtil.assetOnMainThread("call method NAPIValue.set(Object) is not on main thread.");
        if (value instanceof ICallback) {
            JSEngine.registerJSCallback(this.context, this.value, key, (ICallback) value);
        } else {
            JSEngine.setProperty(this.context, this.value, key, value);
        }
    }

    @MainThread
    @Override
    public void set(String key, JSValue value) {
        UIThreadUtil.assetOnMainThread("call method NAPIValue.set(JSValue) is not on main thread.");
        JSEngine.setProperty(this.context, this.value, key, value);
    }

    @MainThread
    @Override
    public void set(String key, JSCallback value) {
        UIThreadUtil.assetOnMainThread("call method NAPIValue.set(JSCallback) is not on main thread.");
        JSEngine.setProperty(this.context, this.value, key, value);
    }

    @MainThread
    @Override
    public Object callFunction(String funcName, Object... params) {
        UIThreadUtil.assetOnMainThreadCall("NAPIValue.callFunction");
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

    @MainThread
    @Override
    public void protect() {
        UIThreadUtil.assetOnMainThreadCall("NAPIValue.protect");
        if (isUnprotected) {
            isUnprotected = false;
            JSEngine.protect(context, value);
        }
    }

    @MainThread
    @Override
    public void unprotect() {
        UIThreadUtil.assetOnMainThreadCall("NAPIValue.unprotect");
        if (!isUnprotected) {
            isUnprotected = true;
            JSEngine.unprotect(context, value);
        }
    }

    @Override
    public long getIdentify() {
        return value;
    }

    @MainThread
    @Override
    public void release() {
        UIThreadUtil.assetOnMainThreadCall("NAPIValue.release");
        unprotect();
    }

    @MainThread
    @Override
    public boolean equals(Object obj) {
        UIThreadUtil.assetOnMainThreadCall("NAPIValue.equals");
        if (!(obj instanceof JSValue)) {
            return false;
        }

        JSValue jsValue = (JSValue) obj;
        return JSEngine.isJSValueEqual(jsValue.getJSContext().getIdentify(), jsValue.getIdentify(), this.getIdentify());
    }

    @Override
    public String toString() {
        return "NAPIValue{" +
                "context=" + context +
                ", value=" + value +
                ", isUnprotected=" + isUnprotected +
                '}';
    }
}
