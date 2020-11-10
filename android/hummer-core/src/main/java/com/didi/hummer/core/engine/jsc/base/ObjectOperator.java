package com.didi.hummer.core.engine.jsc.base;

import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.engine.base.ICallback;
import com.didi.hummer.core.engine.base.IObjectOperator;
import com.didi.hummer.core.engine.jsc.JSCCallback;
import com.didi.hummer.core.engine.jsc.JSCValue;
import com.didi.hummer.core.engine.jsc.jni.TypeConvertor;

/**
 * JSValue的对象相关的操作实现类
 *
 * Created by XiaoFeng on 2019-09-25.
 */
public class ObjectOperator implements IObjectOperator {

    public long jsContext;
    public long jsValue;

    public ObjectOperator(long context, long value) {
        jsContext = context;
        jsValue = value;
    }

    public void setProperty(String key, long value) {
        TypeConvertor.JSValueSetProperty(jsContext, jsValue, key, value);
    }

    public long getProperty(String key) {
        return TypeConvertor.JSValueGetProperty(jsContext, jsValue, key);
    }

    public boolean delProperty(String key) {
        return TypeConvertor.JSValueDelProperty(jsContext, jsValue, key);
    }

    @Override
    public int getInt(String key) {
        return (int) TypeConvertor.JSValue2Double(jsContext, getProperty(key));
    }

    @Override
    public long getLong(String key) {
        return (long) TypeConvertor.JSValue2Double(jsContext, getProperty(key));
    }

    @Override
    public double getDouble(String key) {
        return TypeConvertor.JSValue2Double(jsContext, getProperty(key));
    }

    @Override
    public boolean getBoolean(String key) {
        return TypeConvertor.JSValue2Boolean(jsContext, getProperty(key));
    }

    @Override
    public String getString(String key) {
        return TypeConvertor.JSValue2String(jsContext, getProperty(key));
    }

    @Override
    public JSValue getJSValue(String key) {
        return JSCValue.wrapper(jsContext, getProperty(key));
    }

    @Override
    public void set(String key, Number value) {
        set(key, JSCValue.create(jsContext, value));
    }

    @Override
    public void set(String key, boolean value) {
        set(key, JSCValue.create(jsContext, value));
    }

    @Override
    public void set(String key, String value) {
        set(key, JSCValue.create(jsContext, value));
    }

    @Override
    public void set(String key, Object value) {
        set(key, JSCValue.create(jsContext, value));
    }

    @Override
    public void set(String key, JSValue value) {
        setProperty(key, ((JSCValue) value).value);
    }

    @Override
    public void set(String key, JSCallback value) {
        setProperty(key, ((JSCCallback) value).value);
    }

    @Override
    public Object callFunction(String funcName, Object... params) {
        ICallback callback = new CallbackImpl(jsContext, getProperty(funcName), jsValue);
        return callback.call(params);
    }
}
