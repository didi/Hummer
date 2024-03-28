package com.didi.hummer2.bridge;


import com.didi.hummer2.core.exception.HMValueException;

import java.util.List;

/**
 * didi Create on 2023/11/21 .
 * <p>
 * Copyright (c) 2023/11/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/21 6:11 下午
 * @Description 用一句话说明文件功能
 */

public class JsiObject extends JsiValue implements IObject {

    public JsiObject() {
        identify = init_object_();
    }

    private JsiObject(long identify) {
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
        set_value_(identify, key, value.identify);
    }

    @Override
    public boolean isBoolean(String key) {
        return getValueType(key) == ValueType.TYPE_BOOLEAN;
    }

    @Override
    public boolean isNumber(String key) {
        return getValueType(key) == ValueType.TYPE_NUMBER;
    }

    @Override
    public boolean isString(String key) {
        return getValueType(key) == ValueType.TYPE_STRING;
    }

    @Override
    public boolean isObject(String key) {
        return getValueType(key) == ValueType.TYPE_OBJECT;
    }

    @Override
    public boolean isArray(String key) {
        return getValueType(key) == ValueType.TYPE_ARRAY;
    }

    @Override
    public boolean getBoolean(String key) {
        JsiValue hmValue = get_value_(identify, key);
        if (!hmValue.isBoolean()) {
            throw new HMValueException("value is not boolean.");
        }
        return ((JsiBoolean) hmValue).getValue();
    }

    @Override
    public int getInt(String key) {
        JsiValue hmValue = get_value_(identify, key);
        if (!hmValue.isNumber()) {
            throw new HMValueException("value is not number.");
        }
        return (int) ((JsiNumber) hmValue).getValue();
    }

    @Override
    public long getLong(String key) {
        JsiValue hmValue = get_value_(identify, key);
        if (!hmValue.isNumber()) {
            throw new HMValueException("value is not number.");
        }
        return (long) ((JsiNumber) hmValue).getValue();
    }

    @Override
    public float getFloat(String key) {
        JsiValue hmValue = get_value_(identify, key);
        if (!hmValue.isNumber()) {
            throw new HMValueException("value is not number.");
        }
        return (long) ((JsiNumber) hmValue).getValue();
    }

    @Override
    public double getDouble(String key) {
        JsiValue hmValue = get_value_(identify, key);
        if (!hmValue.isNumber()) {
            throw new HMValueException("value is not number.");
        }
        return (long) ((JsiNumber) hmValue).getValue();
    }

    @Override
    public String getString(String key) {
        JsiValue hmValue = get_value_(identify, key);
        if (!hmValue.isString()) {
            throw new HMValueException("value is not string.");
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

    private native long init_object_();

    private native JsiValue get_value_(long identify, String key);

    private native int get_value_type_(long identify, String key);

    private native boolean set_value_(long identify, String key, long value);

    private native boolean remove_value_(long identify, String key);

    private native List<String> keys_(long identify);

    private native JsiArray keys_array_(long identify);

}
