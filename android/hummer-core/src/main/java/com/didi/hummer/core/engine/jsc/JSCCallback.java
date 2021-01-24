package com.didi.hummer.core.engine.jsc;

import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.base.ICallback;
import com.didi.hummer.core.engine.jsc.base.CallbackImpl;
import com.didi.hummer.core.engine.jsc.jni.TypeConvertor;

/**
 * JS回调方法
 *
 * Created by XiaoFeng on 2019-09-25.
 */
public class JSCCallback implements JSCallback {

    public long context;
    public long value;
    private ICallback callback;
    private volatile boolean isUnprotected;

    public static JSCCallback wrapper(long context, long value) {
        return new JSCCallback(context, value);
    }

    private JSCCallback(long context, long value) {
        this.context = context;
        this.value = value;
        callback = new CallbackImpl(context, value, -1);
        TypeConvertor.JSValueProtect(context, value);
    }

    @Override
    protected void finalize() {
        // 如果Callback没有手动调用release释放js对象，那么在java对象被gc时，会再做一次release
        if (isValid()) {
            release();
        }
    }

    @Override
    public long getIdentify() {
        return value;
    }

    @Override
    public JSContext getJSContext() {
        return JSCContext.wrapper(context);
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof JSCallback)) {
            return false;
        }

        JSCallback jsCallback = (JSCallback) obj;
        return jsCallback.getJSContext().getIdentify() == this.getJSContext().getIdentify()
                && jsCallback.getIdentify() == this.getIdentify();
    }

    @Override
    public boolean isValid() {
        return TypeConvertor.isJSValueValid(context, value);
    }

    @Override
    public void release() {
        if (!isUnprotected) {
            isUnprotected = true;
            TypeConvertor.JSValueUnProtect(context, value);
        }
    }

    @Override
    public Object call(Object... params) {
        if (!isValid()) {
            return null;
        }
        return callback.call(params);
    }
}
