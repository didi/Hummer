package com.didi.hummer.core.engine.debugger;

import com.didi.hummer.V8Thread;
import com.didi.hummer.core.engine.J2V8Callback;
import com.didi.hummer.core.engine.J2V8Context;
import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.jsc.JSCContext;
import com.eclipsesource.v8.V8Function;

/**
 * Created by XiaoFeng on 2019-11-01.
 */
public class J2V8CallbackDebugger extends J2V8Callback {

    public static J2V8CallbackDebugger wrapper(J2V8Context context, V8Function function) {
        return new J2V8CallbackDebugger(context, function);
    }

    protected J2V8CallbackDebugger(J2V8Context context, V8Function function) {
        super(context, function);
    }

    @Override
    public long getIdentify() {
        return V8Thread.checkThread(super::getIdentify);
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof JSCContext)) {
            return false;
        }

        JSCContext jsCallback = (JSCContext) obj;
        return jsCallback.getJSContext().getIdentify() == this.getJSContext().getIdentify()
                && jsCallback.getIdentify() == this.getIdentify();
    }

    @Override
    public JSContext getJSContext() {
        return context;
    }

    @Override
    public boolean isValid() {
        return context != null && function != null;
    }

    @Override
    public void release() {
        V8Thread.checkThread(() -> {
            super.release();
            return null;
        });
    }

    @Override
    public Object call(Object... params) {
        return V8Thread.checkThread(() -> super.call(params));
    }
}
