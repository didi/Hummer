package com.didi.hummer.core.engine.jsc;

import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.base.ICallback;
import com.didi.hummer.core.engine.jsc.base.CallbackImpl;

/**
 * JS回调方法
 *
 * Created by XiaoFeng on 2019-09-25.
 */
public class JSCCallback extends JSCValue implements JSCallback {

    private ICallback callback;

    public static JSCCallback wrapper(long context, long value) {
        return new JSCCallback(context, value);
    }

    private JSCCallback(long context, long value) {
        super(context, value);
        callback = new CallbackImpl(context, value, -1);
        protect();
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
    public Object call(Object... params) {
        if (!isValid()) {
            return null;
        }
        return callback.call(params);
    }
}
