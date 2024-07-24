package com.didi.hummer2.bridge;

import android.util.Log;

import androidx.annotation.NonNull;

import java.io.Serializable;

/**
 * didi Create on 2023/11/21 .
 * <p>
 * Copyright (c) 2023/11/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/21 6:18 下午
 * @Description 用一句话说明文件功能
 */

public abstract class JsiValue implements IValue, Serializable {

    /**
     * c++ 映射数据对象指针
     */
    protected long identify = 0;

    public JsiValue() {

    }

    private JsiValue(long identify) {
        this.identify = identify;
        Log.i("Hummer2", "HMValue<> identify=" + identify);
    }

    @Override
    public long getIdentify() {
        return identify;
    }

    @Override
    public boolean isNull() {
        return !(isArray() || isNumber() || isObject() || isString() || isBoolean());
    }

    @Override
    public boolean isBoolean() {
        return false;
    }

    @Override
    public boolean isNumber() {
        return false;
    }

    @Override
    public boolean isString() {
        return false;
    }

    @Override
    public boolean isArray() {
        return false;
    }

    @Override
    public boolean isObject() {
        return false;
    }

    @Override
    public void protect() {
        if (identify != 0) {
            protect_(identify);
        }
    }

    @Override
    public void unprotect() {
        if (identify != 0) {
            unprotect_(identify);
        }
    }

    @Override
    public boolean isJava() {
        return false;
    }

    @Override
    public int getType() {
        return ValueType.TYPE_VALUE;
    }

    @Override
    protected void finalize() throws Throwable {
        super.finalize();
//        if (identify != 0) {
//            unprotect_(identify);
//        }
    }

    @NonNull
    @Override
    public String toString() {
        if (identify != 0) {
            return string_(identify);
        }
        return "";
    }

    protected String string() {
        if (identify != 0) {
            return string_(identify);
        }
        return null;
    }

    private native long init_value_();

    private native void protect_(long identify);

    private native void unprotect_(long identify);

    private native String string_(long identify);

}
