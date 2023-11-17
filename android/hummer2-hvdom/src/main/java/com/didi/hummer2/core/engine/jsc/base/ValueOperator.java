package com.didi.hummer2.core.engine.jsc.base;

import com.didi.hummer2.core.engine.base.IValueOperator;
import com.didi.hummer2.core.engine.jsc.jni.TypeConvertor;
import com.didi.hummer2.core.util.HMGsonUtil;

import java.lang.reflect.Type;

/**
 * JSValue的值相关的操作实现类
 *
 * Created by XiaoFeng on 2019-10-11.
 */
public class ValueOperator implements IValueOperator {

    public long jsContext;
    public long jsValue;

    public ValueOperator(long jsContext, long jsValue) {
        this.jsContext = jsContext;
        this.jsValue = jsValue;
    }

    @Override
    public int intValue() {
        return (int) TypeConvertor.JSValue2Double(jsContext, jsValue);
    }

    @Override
    public long longValue() {
        return (long) TypeConvertor.JSValue2Double(jsContext, jsValue);
    }

    @Override
    public float floatValue() {
        return (float) TypeConvertor.JSValue2Double(jsContext, jsValue);
    }

    @Override
    public double doubleValue() {
        return TypeConvertor.JSValue2Double(jsContext, jsValue);
    }

    @Override
    public boolean booleanValue() {
        return TypeConvertor.JSValue2Boolean(jsContext, jsValue);
    }

    @Override
    public String stringValue() {
        return TypeConvertor.JSValue2String(jsContext, jsValue);
    }

    @Override
    public <T> T jsonValueOf(Type type) {
        return HMGsonUtil.fromJson(stringValue(), type);
    }

    @Override
    public boolean isNumber() {
        return TypeConvertor.isJSNumber(jsContext, jsValue);
    }

    @Override
    public boolean isBoolean() {
        return TypeConvertor.isJSBoolean(jsContext, jsValue);
    }

    @Override
    public boolean isString() {
        return TypeConvertor.isJSString(jsContext, jsValue);
    }

    @Override
    public boolean isFunction() {
        return TypeConvertor.isJSFunction(jsContext, jsValue);
    }

    @Override
    public boolean isNull() {
        return TypeConvertor.isJSNull(jsContext, jsValue) || TypeConvertor.isJSUndefined(jsContext, jsValue);
    }

    @Override
    public void protect() {
        TypeConvertor.JSValueProtect(jsContext, jsValue);
    }

    @Override
    public void unprotect() {
        TypeConvertor.JSValueUnProtect(jsContext, jsValue);
    }
}
