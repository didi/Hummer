package com.didi.hummer.module.notifycenter;

import android.content.Context;

import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSContext;

/**
 * 用于Native向JS注册消息的回调
 *
 * Created by XiaoFeng on 2019-10-08.
 */
public abstract class NotifyCallback implements JSCallback {

    private JSContext jsContext;
    private long contextId;
    private long callbackId;

    public NotifyCallback(Context context) {
        contextId = context.hashCode();
        callbackId = hashCode();
    }

    public NotifyCallback(JSContext jsContext) {
        this.jsContext = jsContext;
        contextId = jsContext.getIdentify();
        callbackId = hashCode();
    }

    public long getContextId() {
        return contextId;
    }

    @Override
    public JSContext getJSContext() {
        return jsContext;
    }

    @Override
    public boolean isValid() {
        return true;
    }

    @Override
    public long getIdentify() {
        return callbackId;
    }

    @Override
    public void release() {

    }

    protected abstract void onNotify(Object event);

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof JSCallback)) {
            return false;
        }

        JSCallback jsCallback = (JSCallback) obj;
        return jsCallback.getJSContext().getIdentify() == getContextId() && jsCallback.getIdentify() == getIdentify();
    }

    @Override
    public Object call(Object... params) {
        Object obj = null;
        if (params.length > 0) {
            obj = params[0];
        }
        onNotify(obj);
        return null;
    }
}
