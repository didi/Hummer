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

public final class JsiObjectJava extends JsiObject {

    private final Map<String, JsiValue> properties = new HashMap<>();
//    private JsiObject jsiObject;

    public JsiObjectJava(JsiObject jsiObject) {
        super(0);
//        this.jsiObject = jsiObject;
        parse(jsiObject);

    }

    private void parse(JsiObject jsiObject) {
        if (jsiObject != null) {
            List<String> keys = jsiObject.keys();
            for (String key : keys) {
                properties.put(key, JsiValueUtils.toJavaValue(jsiObject.get(key)));
            }
        }
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
    public boolean isBoolean(String key) {
        return super.isBoolean(key);
    }

    @Override
    public boolean isNumber(String key) {
        return super.isNumber(key);
    }

    @Override
    public boolean isString(String key) {
        return super.isString(key);
    }

    @Override
    public boolean isObject(String key) {
        return super.isObject(key);
    }

    @Override
    public boolean isArray(String key) {
        return super.isArray(key);
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
        JsiValue jsiValue = properties.get("");
        if (!jsiValue.isBoolean()) {
            throw new HummerValueException("value is not boolean.");
        }
        return null;
    }

    @Override
    public List<String> keys() {
        return new ArrayList<>(properties.keySet());
    }

    @Override
    public boolean isObject() {
        return super.isObject();
    }

    @Override
    public long getIdentify() {
        return super.getIdentify();
    }

    @Override
    public boolean isNull() {
        return super.isNull();
    }

    @Override
    public boolean isBoolean() {
        return super.isBoolean();
    }

    @Override
    public boolean isNumber() {
        return super.isNumber();
    }

    @Override
    public boolean isString() {
        return super.isString();
    }

    @Override
    public boolean isArray() {
        return super.isArray();
    }

    @Override
    public void protect() {
        //not do
    }

    @Override
    public void unprotect() {
        //not do
    }

    @Override
    public boolean isJava() {
        return true;
    }

    @Override
    protected void finalize() throws Throwable {
        //not do
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
