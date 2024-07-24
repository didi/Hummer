package com.didi.hummer2.bridge;


import androidx.annotation.NonNull;

import com.didi.hummer2.exception.HummerValueException;

import java.util.List;

/**
 * didi Create on 2023/11/21 .
 * <p>
 * Copyright (c) 2023/11/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/21 6:11 下午
 * @Description 对象：类map
 */

public final class JsiObjectNative extends JsiObject {

    JsiObjectNative() {
        identify = init_object_();
    }

    private JsiObjectNative(long identify) {
        this.identify = identify;
    }


    @Override
    public JsiValue get(String key) {
        return get_value_(identify, key);
    }

    @Override
    public int getValueType(String key) {
        return get_value_type_(identify, key);
    }

    @Override
    public void put(String key, JsiValue value) {
        if (value != null){
            set_value_(identify, key, value.identify);
            value.unprotect();
        }
    }

    @Override
    public boolean remove(String key) {
        remove_value_(identify, key);
        return true;
    }

    @Override
    public boolean getBoolean(String key) {
        JsiValue hmValue = get_value_(identify, key);
        if (!hmValue.isBoolean()) {
            throw new HummerValueException("value is not boolean.");
        }
        return ((JsiBoolean) hmValue).getValue();
    }

    @Override
    public int getInt(String key) {
        JsiValue hmValue = get_value_(identify, key);
        if (!hmValue.isNumber()) {
            throw new HummerValueException("value is not number.");
        }
        return (int) ((JsiNumber) hmValue).getValue();
    }

    @Override
    public long getLong(String key) {
        JsiValue hmValue = get_value_(identify, key);
        if (!hmValue.isNumber()) {
            throw new HummerValueException("value is not number.");
        }
        return (long) ((JsiNumber) hmValue).getValue();
    }

    @Override
    public float getFloat(String key) {
        JsiValue hmValue = get_value_(identify, key);
        if (!hmValue.isNumber()) {
            throw new HummerValueException("value is not number.");
        }
        return (long) ((JsiNumber) hmValue).getValue();
    }

    @Override
    public double getDouble(String key) {
        JsiValue hmValue = get_value_(identify, key);
        if (!hmValue.isNumber()) {
            throw new HummerValueException("value is not number.");
        }
        return (long) ((JsiNumber) hmValue).getValue();
    }

    @Override
    public String getString(String key) {
        JsiValue hmValue = get_value_(identify, key);
        if (!hmValue.isString()) {
            throw new HummerValueException("value is not string.");
        }
        return ((JsiString) hmValue).getValue();
    }

    @Override
    public JsiArray allKeyArray() {
        return keys_array_(identify);
    }

    @Override
    public List<String> keys() {
        return keys_(identify);
    }

    @Override
    public boolean isObject() {
        return true;
    }

    @Override
    public boolean isJava() {
        return false;
    }

    @Override
    public int getType() {
        return ValueType.TYPE_OBJECT;
    }

    @NonNull
    @Override
    public String toString() {
        String result = string();
        if (result != null) {
            return result;
        }
        return "{}";
    }

    private native long init_object_();

    private native JsiValue get_value_(long identify, String key);

    private native int get_value_type_(long identify, String key);

    private native boolean set_value_(long identify, String key, long value);

    private native boolean remove_value_(long identify, String key);

    private native List<String> keys_(long identify);

    private native JsiArray keys_array_(long identify);

}
