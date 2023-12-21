package com.didi.hummer2.bridge;


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

public class HMObject extends HMValue implements IObject {

    public HMObject() {
        identify = init_object_();
    }

    private HMObject(long identify) {
        this.identify = identify;
    }


    @Override
    public HMValue get(String key) {
        return get_value_(identify, key);
    }

    @Override
    public void put(String key, HMValue value) {
        set_value_(identify, key, value.identify);
    }

    @Override
    public boolean isBoolean(String key) {
        return is_boolean_(identify, key);
    }

    @Override
    public boolean isNumber(String key) {
        return is_number_(identify, key);
    }

    @Override
    public boolean isString(String key) {
        return is_string_(identify, key);
    }

    @Override
    public boolean isObject(String key) {
        return is_object_(identify, key);
    }

    @Override
    public boolean isArray(String key) {
        return is_array_(identify, key);
    }

    @Override
    public boolean getBoolean(String key) {
        return get_boolean_(identify, key);
    }

    @Override
    public int getInt(String key) {
        return (int) get_number_(identify, key);
    }

    @Override
    public long getLong(String key) {
        return (long) get_number_(identify, key);
    }

    @Override
    public float getFloat(String key) {
        return (float) get_number_(identify, key);
    }

    @Override
    public double getDouble(String key) {
        return get_number_(identify, key);
    }

    @Override
    public String getString(String key) {
        return get_string_(identify, key);
    }

    @Override
    public HMArray allKeys() {
        return all_keys_(identify);
    }

    @Override
    public boolean isObject() {
        return true;
    }


    private native long init_object_();

    private native HMValue get_value_(long identify, String key);

    private native void set_value_(long identify, String key, long value);

    private native boolean is_boolean_(long identify, String key);

    private native boolean is_number_(long identify, String key);

    private native boolean is_string_(long identify, String key);

    private native boolean is_object_(long identify, String key);

    private native boolean is_array_(long identify, String key);

    private native boolean get_boolean_(long identify, String key);

    private native String get_string_(long identify, String key);

    private native double get_number_(long identify, String key);

    private native HMArray all_keys_(long identify);

}
