package com.didi.hummer.core.engine.debugger;

import com.alexii.j2v8debugger.V8Debugger;
import com.didi.hummer.V8Thread;
import com.didi.hummer.core.engine.J2V8Context;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.eclipsesource.v8.V8;
import com.eclipsesource.v8.V8Object;

import java.util.concurrent.ExecutionException;

/**
 * Created by XiaoFeng on 2020/6/19.
 */
public class J2V8ContextDebugger extends J2V8Context {

    public static J2V8Context create() {
        return wrapper(createDebuggableV8Runtime());
    }

    private static V8 createDebuggableV8Runtime() {
        try {
            return V8Debugger.INSTANCE.createDebuggableV8Runtime(V8Thread.executor, "global", false).get();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return V8.createV8Runtime();
    }

    public static J2V8Context wrapper(V8 v8) {
        return new J2V8ContextDebugger(v8);
    }

    protected J2V8ContextDebugger(V8 v8) {
        super(v8);
    }

    @Override
    public V8Object registerJavaMethod(Object object, String methodName, String jsFunctionName, Class<?>[] parameterTypes) {
        return V8Thread.checkThread(() -> super.registerJavaMethod(object, methodName, jsFunctionName, parameterTypes));
    }

    @Override
    public Object evaluateJavaScript(String script, String scriptId) {
        V8Thread.checkThreadAsync(() -> super.evaluateJavaScript(script, scriptId));
        return null;
    }

    @Override
    public void release() {
        V8Thread.checkThreadAsync(super::release);
    }

    @Override
    public long getIdentify() {
        // TODO: 临时处理成异步的，后续改进
        V8Thread.checkThreadAsync(super::getIdentify);
        return 0;
    }

    @Override
    public int getInt(String key) {
        return V8Thread.checkThread(() -> super.getInt(key));
    }

    @Override
    public long getLong(String key) {
        return V8Thread.checkThread(() -> super.getLong(key));
    }

    @Override
    public double getDouble(String key) {
        return V8Thread.checkThread(() -> super.getDouble(key));
    }

    @Override
    public boolean getBoolean(String key) {
        return V8Thread.checkThread(() -> super.getBoolean(key));
    }

    @Override
    public String getString(String key) {
        return V8Thread.checkThread(() -> super.getString(key));
    }

    @Override
    public JSValue getJSValue(String key) {
        return V8Thread.checkThread(() -> {
            if (v8Object != null) {
                try {
                    return J2V8ValueDebugger.wrapper(context, v8Object.getObject(key));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            return null;
        });
    }

    @Override
    public void set(String key, Number value) {
        V8Thread.checkThreadAsync(() -> super.set(key, value));
    }

    @Override
    public void set(String key, boolean value) {
        V8Thread.checkThreadAsync(() -> super.set(key, value));
    }

    @Override
    public void set(String key, String value) {
        V8Thread.checkThreadAsync(() -> super.set(key, value));
    }

    @Override
    public void set(String key, Object value) {
        V8Thread.checkThreadAsync(() -> super.set(key, value));
    }

    @Override
    public void set(String key, JSValue value) {
        V8Thread.checkThreadAsync(() -> super.set(key, value));
    }

    @Override
    public void set(String key, JSCallback value) {
        V8Thread.checkThreadAsync(() -> super.set(key, value));
    }

    @Override
    public Object callFunction(String funcName, Object... params) {
        return V8Thread.checkThread(() -> super.callFunction(funcName, params));
    }
}
