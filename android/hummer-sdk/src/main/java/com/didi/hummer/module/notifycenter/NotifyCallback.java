package com.didi.hummer.module.notifycenter;

import android.content.Context;

import com.didi.hummer.core.engine.base.ICallback;

/**
 * 用于Native向JS注册消息的回调
 *
 * Created by XiaoFeng on 2019-10-08.
 */
public abstract class NotifyCallback implements ICallback {

    private long contextId;
    private long callbackId;

    public NotifyCallback(Context context) {
        contextId = context.hashCode();
        callbackId = hashCode();
    }

    public long getContextId() {
        return contextId;
    }

    protected abstract void onNotify(Object event);

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof NotifyCallback)) {
            return false;
        }

        NotifyCallback callback = (NotifyCallback) obj;
        return callback.contextId == contextId && callback.callbackId == callbackId;
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
