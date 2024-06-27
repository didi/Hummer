package com.didi.hummer2.bridge;

import androidx.annotation.NonNull;

import java.util.ArrayList;

/**
 * didi Create on 2024/6/26 .
 * <p>
 * Copyright (c) 2024/6/26 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/6/26 10:22 AM
 * @Description 数组：类list (纯Java数据类型)
 */

public class JsiArrayJava extends JsiArray {

    private final ArrayList<JsiValue> valueList = new ArrayList<>();

    public JsiArrayJava() {
        super(0);

    }

    public JsiArrayJava(JsiArray jsiArray) {
        super(0);
        parse(jsiArray);
    }

    private void parse(JsiArray jsiArray) {
        if (jsiArray != null) {
            int size = jsiArray.length();
            for (int i = 0; i < size; i++) {
                valueList.add(JsiValueUtils.toJavaValue(jsiArray.getValue(i)));
            }
        }
    }

    @Override
    public int length() {
        return valueList.size();
    }

    @Override
    public JsiValue getValue(int index) {
        return valueList.get(index);
    }

    @Override
    public boolean setValue(int index, JsiValue value) {
        valueList.add(index, value);
        return true;
    }

    @Override
    public void push(JsiValue value) {
        valueList.add(value);
    }

    @Override
    public void pop() {
        valueList.remove(valueList.size() - 1);
    }

    @Override
    public JsiValue removeAt(int index) {
        return valueList.remove(index);
    }

    @Override
    public JsiValue remove(JsiValue value) {
        boolean success = valueList.remove(value);
        if (success) {
            return value;
        }
        return null;
    }

    @Override
    public void clear() {
        valueList.clear();
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
    public boolean isObject() {
        return super.isObject();
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
    public int getType() {
        return super.getType();
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
        sb.append("[");
        boolean first = true;
        for (JsiValue value : valueList) {
            if (!first) {
                sb.append(",");
            }
            JsiValue jsiValue = value;
            sb.append(jsiValue == null ? "null" : jsiValue.toString());
            first = false;
        }
        sb.append("]");
        return sb.toString();
    }
}
