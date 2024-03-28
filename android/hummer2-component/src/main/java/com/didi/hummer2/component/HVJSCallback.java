package com.didi.hummer2.component;

import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer2.bridge.JsiFunction;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;

import java.lang.reflect.Type;

/**
 * didi Create on 2023/12/4 .
 * <p>
 * Copyright (c) 2023/12/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/12/4 8:41 PM
 * @Description 用一句话说明文件功能
 */

public class HVJSCallback implements JSCallback {

    private JsiFunction hmFunction;

    public HVJSCallback(JsiFunction hmFunction) {
        this.hmFunction = hmFunction;
    }

    @Override
    public JSContext getJSContext() {
        return null;
    }

    @Override
    public boolean isValid() {
        return false;
    }

    @Override
    public Object call(Object... params) {
        JsiObject hmObject = new JsiObject();
        hmObject.put("test", new JsiString("call..."));
        Object o = hmFunction.call(hmObject);
        return null;
    }

    @Override
    public int getInt(String key) {
        return 0;
    }

    @Override
    public long getLong(String key) {
        return 0;
    }

    @Override
    public double getDouble(String key) {
        return 0;
    }

    @Override
    public boolean getBoolean(String key) {
        return false;
    }

    @Override
    public String getString(String key) {
        return null;
    }

    @Override
    public JSValue getJSValue(String key) {
        return null;
    }

    @Override
    public void set(String key, Number value) {

    }

    @Override
    public void set(String key, boolean value) {

    }

    @Override
    public void set(String key, String value) {

    }

    @Override
    public void set(String key, Object value) {

    }

    @Override
    public void set(String key, JSValue value) {

    }

    @Override
    public void set(String key, JSCallback value) {

    }

    @Override
    public Object callFunction(String funcName, Object... params) {
        return null;
    }

    @Override
    public int intValue() {
        return 0;
    }

    @Override
    public long longValue() {
        return 0;
    }

    @Override
    public float floatValue() {
        return 0;
    }

    @Override
    public double doubleValue() {
        return 0;
    }

    @Override
    public boolean booleanValue() {
        return false;
    }

    @Override
    public String stringValue() {
        return null;
    }

    @Override
    public <T> T jsonValueOf(Type type) {
        return null;
    }

    @Override
    public boolean isNumber() {
        return false;
    }

    @Override
    public boolean isBoolean() {
        return false;
    }

    @Override
    public boolean isString() {
        return false;
    }

    @Override
    public boolean isFunction() {
        return false;
    }

    @Override
    public boolean isNull() {
        return false;
    }

    @Override
    public void protect() {

    }

    @Override
    public void unprotect() {

    }

    @Override
    public long getIdentify() {
        return 0;
    }

    @Override
    public void release() {

    }
}
