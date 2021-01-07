package com.didi.hummer.core.engine.debugger;

import com.didi.hummer.V8Thread;
import com.didi.hummer.core.engine.J2V8Context;
import com.didi.hummer.core.engine.J2V8Value;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.JSValue;
import com.eclipsesource.v8.V8Object;

import java.lang.reflect.Type;

/**
 * Created by XiaoFeng on 2019-11-01.
 */
public class J2V8ValueDebugger extends J2V8Value {

    public static J2V8Value wrapper(J2V8Context context, V8Object v8Object) {
        return new J2V8ValueDebugger(context, v8Object);
    }

    protected J2V8ValueDebugger(J2V8Context context, V8Object v8Object) {
        super(context, v8Object);
    }

    protected J2V8ValueDebugger(J2V8Context context, Object object) {
        super(context, object);
    }

    @Override
    public JSContext getJSContext() {
        return context;
    }

    @Override
    public boolean isValid() {
        return context != null && (basicObj != null || v8Object != null);
    }

    @Override
    public long getIdentify() {
        // TODO: 临时处理成异步的，后续改进
        V8Thread.checkThreadAsync(super::getIdentify);
        return 0;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof J2V8ValueDebugger)) {
            return false;
        }

        J2V8ValueDebugger jsValue = (J2V8ValueDebugger) obj;
        return jsValue.getIdentify() == this.getIdentify();
    }

    @Override
    public void release() {
        V8Thread.checkThreadAsync(super::release);
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
        return V8Thread.checkThread(() -> super.getJSValue(key));
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
        // TODO: 先临时这么处理
        if ("onCreate".equals(funcName) || "onAppear".equals(funcName) || "onDisappear".equals(funcName) || "onDestroy".equals(funcName)) {
            V8Thread.checkThreadAsync(() -> super.callFunction(funcName, params));
            return null;
        } else {
            return V8Thread.checkThread(() -> super.callFunction(funcName, params));
        }
    }

    @Override
    public int intValue() {
        return V8Thread.checkThread(super::intValue);
    }

    @Override
    public long longValue() {
        return V8Thread.checkThread(super::longValue);
    }

    @Override
    public float floatValue() {
        return V8Thread.checkThread(super::floatValue);
    }

    @Override
    public double doubleValue() {
        return V8Thread.checkThread(super::doubleValue);
    }

    @Override
    public boolean booleanValue() {
        return V8Thread.checkThread(super::booleanValue);
    }

    @Override
    public String stringValue() {
        return V8Thread.checkThread(super::stringValue);
    }

    @Override
    public <T> T jsonValueOf(Type type) {
        return V8Thread.checkThread(() -> super.jsonValueOf(type));
    }

    @Override
    public boolean isNumber() {
        return V8Thread.checkThread(super::isNumber);
    }

    @Override
    public boolean isBoolean() {
        return V8Thread.checkThread(super::isBoolean);
    }

    @Override
    public boolean isString() {
        return V8Thread.checkThread(super::isString);
    }

    @Override
    public boolean isFunction() {
        return V8Thread.checkThread(super::isFunction);
    }

    @Override
    public boolean isNull() {
        return V8Thread.checkThread(super::isNull);
    }

    @Override
    public void protect() {
        V8Thread.checkThreadAsync(super::protect);
    }

    @Override
    public void unprotect() {
        V8Thread.checkThreadAsync(super::unprotect);
    }
}
