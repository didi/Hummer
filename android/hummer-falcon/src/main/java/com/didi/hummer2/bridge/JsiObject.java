package com.didi.hummer2.bridge;

import androidx.annotation.NonNull;

import com.didi.hummer2.exception.HummerValueException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * didi Create on 2024/6/26 .
 * <p>
 * Copyright (c) 2024/6/26 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/6/26 10:06 AM
 * @Description 对象：类map (纯Java数据类型)
 */

public class JsiObject extends JsiValue implements IObject {

    private final Map<String, JsiValue> properties = new HashMap<>();

    public JsiObject() {

    }

    @Override
    public JsiValue get(String key) {
        return properties.get(key);
    }

    @Override
    public int getValueType(String key) {
        return properties.get(key).getType();
    }

    @Override
    public void put(String key, JsiValue value) {
        properties.put(key, value);
    }


    @Override
    public boolean remove(String key) {
        properties.remove(key);
        return true;
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
        JsiValue jsiValue = properties.get(key);
        if (!jsiValue.isBoolean()) {
            throw new HummerValueException("value is not boolean.");
        }
        return ((JsiBoolean) jsiValue).getValue();
    }

    @Override
    public int getInt(String key) {
        JsiValue jsiValue = properties.get(key);
        if (!jsiValue.isNumber()) {
            throw new HummerValueException("value is not int.");
        }
        return (int) ((JsiNumber) jsiValue).getValue();
    }

    @Override
    public long getLong(String key) {
        JsiValue jsiValue = properties.get(key);
        if (!jsiValue.isNumber()) {
            throw new HummerValueException("value is not long.");
        }
        return (long) ((JsiNumber) jsiValue).getValue();
    }

    @Override
    public float getFloat(String key) {
        JsiValue jsiValue = properties.get(key);
        if (!jsiValue.isNumber()) {
            throw new HummerValueException("value is not float.");
        }
        return (float) ((JsiNumber) jsiValue).getValue();
    }

    @Override
    public double getDouble(String key) {
        JsiValue jsiValue = properties.get(key);
        if (!jsiValue.isNumber()) {
            throw new HummerValueException("value is not double.");
        }
        return ((JsiNumber) jsiValue).getValue();
    }

    @Override
    public String getString(String key) {
        JsiValue jsiValue = properties.get(key);
        if (!jsiValue.isString()) {
            throw new HummerValueException("value is not string.");
        }
        return ((JsiString) jsiValue).getValue();
    }

    @Override
    public JsiArray allKeyArray() {
        JsiArray jsiArray = new JsiArray();
        for (String key : properties.keySet()) {
            jsiArray.push(new JsiString(key));
        }
        return jsiArray;
    }

    @Override
    public List<String> keys() {
        return new ArrayList<>(properties.keySet());
    }

    @Override
    public boolean isObject() {
        return true;
    }

    @Override
    public boolean isJava() {
        return true;
    }


    @NonNull
    @Override
    public String toString() {
        StringBuffer sb = new StringBuffer();
        sb.append("{");
        Iterator<Map.Entry<String, JsiValue>> iterator = properties.entrySet().iterator();
        boolean first = true;
        while (iterator.hasNext()) {
            Map.Entry<String, JsiValue> entry = iterator.next();
            if (!first) {
                sb.append(",");
            }
            sb.append("\"").append(entry.getKey()).append("\":").append(entry.getValue() == null ? "null" : entry.getValue().toString());
            first = false;
        }
        sb.append("}");
        return sb.toString();
    }
}
