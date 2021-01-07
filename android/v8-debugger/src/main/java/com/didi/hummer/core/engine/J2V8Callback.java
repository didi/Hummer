package com.didi.hummer.core.engine;

import com.didi.hummer.context.V8HummerContext;
import com.didi.hummer.core.engine.debugger.J2V8CallbackDebugger;
import com.didi.hummer.core.engine.jsc.JSCContext;
import com.didi.hummer.core.engine.jsc.jni.HummerException;
import com.eclipsesource.v8.V8Array;
import com.eclipsesource.v8.V8Function;

/**
 * Created by XiaoFeng on 2019-11-01.
 */
public class J2V8Callback implements JSCallback {

    public J2V8Context context;
    public V8Function function;

    public static J2V8Callback wrapper(J2V8Context context, V8Function function) {
        if (V8HummerContext.isNeedDebug) {
            return J2V8CallbackDebugger.wrapper(context, function);
        } else {
            return new J2V8Callback(context, function);
        }
    }

    protected J2V8Callback() {
    }

    protected J2V8Callback(J2V8Context context, V8Function function) {
        this.context = context;
        this.function = function;
    }

    @Override
    public long getIdentify() {
        if (function != null) {
            // TODO: 待确认是否可用
            return function.hashCode();
        } else {
            return super.hashCode();
        }
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
        if (function != null) {
            function.close();
        }
    }

    @Override
    public Object call(Object... params) {
        try {
            V8Array parameters = J2V8Utils.objectsToV8Array(function.getRuntime(), params);
            Object ret = function.call(null, parameters);
            return J2V8Utils.objectToJ2V8Object(context, ret);
        } catch (Exception e) {
            HummerException.nativeException(context, e);
        }
        return null;
    }
}
