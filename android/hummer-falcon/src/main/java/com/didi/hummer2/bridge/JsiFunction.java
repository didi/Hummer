package com.didi.hummer2.bridge;

import androidx.annotation.NonNull;

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

    public JsiValue call(JsiValue... args) {
        int size = args.length;
        long[] params = null;
        if (size > 0) {
            params = new long[size];
            for (int i = 0; i < size; i++) {
                params[i] = args[i].getIdentify();
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
