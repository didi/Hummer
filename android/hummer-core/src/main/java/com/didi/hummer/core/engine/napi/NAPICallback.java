package com.didi.hummer.core.engine.napi;

import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.napi.jni.JSEngine;

/**
 * Created by XiaoFeng on 2021/6/29.
 */
public class NAPICallback extends NAPIValue implements JSCallback {

    public static NAPICallback wrapper(long context, long value) {
        return new NAPICallback(context, value);
    }

    private NAPICallback(long context, long value) {
        super(context, value);
        protect();
    }

    @Override
    public Object call(Object... params) {
        if (!isValid()) {
            return null;
        }

        return JSEngine.callFunction(context, -1, value, params);
    }
}
