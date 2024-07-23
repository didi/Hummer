package com.didi.hummer2.bridge;

import androidx.annotation.NonNull;

import com.didi.hummer2.utils.F4NObjectUtil;

/**
 * didi Create on 2023/12/5 .
 * <p>
 * Copyright (c) 2023/12/5 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/12/5 8:48 PM
 * @Description 只允许C 传递到java，不允许Java创建
 */

public class JsiFunction extends JsiValue {

    private final long functionId;

    protected JsiFunction() {
        functionId = 0;
    }

    protected JsiFunction(long functionId) {
        this.identify = 0;
        this.functionId = functionId;
    }

    /**
     * 向引擎回调数据
     * 将Java数据转换为与C++绑定{@link JsiObjectNative}等
     *
     * @param args 参数
     * @return 一般返回null，非null只在同步接口支持
     */
    public JsiValue call(Object... args) {
        int size = args.length;
        JsiValue[] jsiValues = new JsiValue[size];
        for (int i = 0; i < size; i++) {
            jsiValues[i] = F4NObjectUtil.toHummerJsiValue(args[i]);
        }
        return callNative(jsiValues);
    }

    private JsiValue callNative(JsiValue... args) {
        int size = args.length;
        long[] params = null;
        if (size > 0) {
            params = new long[size];
            for (int i = 0; i < size; i++) {
                if (args[i] == null) {
                    params[i] = 0;
                } else {
                    params[i] = args[i].getIdentify();
                }
            }
        }
        return calls_(functionId, params);
    }


    @Override
    public boolean isJava() {
        return true;
    }

    @Override
    public int getType() {
        return ValueType.TYPE_FUNCTION;
    }

    @NonNull
    @Override
    public String toString() {
        return "\"JsiFunction\"";
    }

    @Override
    protected void finalize() throws Throwable {
        //not do
    }

    private native JsiValue calls_(long identify, long... value);


}
