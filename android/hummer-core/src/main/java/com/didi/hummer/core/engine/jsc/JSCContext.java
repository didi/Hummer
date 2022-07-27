package com.didi.hummer.core.engine.jsc;

import android.os.Handler;
import android.os.Looper;
import android.text.TextUtils;

import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.base.IRecycler;
import com.didi.hummer.core.engine.jsc.jni.JavaScriptRuntime;
import com.didi.hummer.core.engine.jsc.jni.TypeConvertor;
import com.didi.hummer.core.util.BytecodeCacheUtil;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * JS全局环境
 *
 * Created by XiaoFeng on 2019-09-25.
 */
public class JSCContext extends JSCValue implements JSContext {

    private ExecutorService jsExecutor;
    private Handler mainHandler;

    public static JSCContext create() {
        return wrapper(JavaScriptRuntime.createJSContext());
    }

    public static JSCContext wrapper(long context) {
        return new JSCContext(context);
    }

    private JSCContext(long context) {
        super(context, -1);
    }

    @Override
    public Object evaluateJavaScript(String script) {
        return evaluateJavaScript(script, "");
    }

    @Override
    public Object evaluateJavaScript(String script, String scriptId) {
        if (TextUtils.isEmpty(script)) {
            return null;
        }
        if (scriptId == null) {
            scriptId = "";
        }

        long jsValue;
        if (TextUtils.isEmpty(scriptId)) {
            jsValue = JavaScriptRuntime.evaluateJavaScript(context, script, scriptId);
        } else {
            byte[] bytecode = BytecodeCacheUtil.getBytecode(scriptId);
            if (bytecode == null || bytecode.length <= 0) {
                bytecode = JavaScriptRuntime.compileJavaScript(context, script, scriptId);
            }
            if (bytecode == null || bytecode.length <= 0) {
                jsValue = JavaScriptRuntime.evaluateJavaScript(context, script, scriptId);
            } else {
                BytecodeCacheUtil.putBytecode(scriptId, bytecode);
                jsValue = JavaScriptRuntime.evaluateBytecode(context, bytecode);
            }
        }

        return JSCUtils.jsValueToObject(context, jsValue);
    }

    @Override
    public Object evaluateJavaScriptOnly(String script, String scriptId) {
        if (TextUtils.isEmpty(script)) {
            return null;
        }
        if (scriptId == null) {
            scriptId = "";
        }

        long jsValue = JavaScriptRuntime.evaluateJavaScript(context, script, scriptId);
        return JSCUtils.jsValueToObject(context, jsValue);
    }

    @Override
    public void evaluateJavaScriptAsync(String script, String scriptId, JSEvaluateCallback callback) {
        // 如果之前已有缓存字节码，直接主线程执行
        byte[] bytecode = BytecodeCacheUtil.getBytecode(scriptId);
        if (bytecode != null && bytecode.length > 0) {
            long jsValue = JavaScriptRuntime.evaluateBytecode(context, bytecode);
            Object ret = JSCUtils.jsValueToObject(context, jsValue);
            if (callback != null) {
                callback.onJSEvaluated(ret);
            }
            return;
        }

        // 如果没有缓存过，或者scriptId为空，则需要异步预编译字节码
        if (jsExecutor == null) {
            jsExecutor = Executors.newSingleThreadExecutor();
        }
        jsExecutor.submit(() -> {
            JSCContext ctx = JSCContext.create();
            byte[] bytecode2 = JavaScriptRuntime.compileJavaScript(ctx.context, script, scriptId);
            BytecodeCacheUtil.putBytecode(scriptId, bytecode2);
            ctx.release();

            if (mainHandler == null) {
                mainHandler = new Handler(Looper.getMainLooper());
            }
            mainHandler.post(() -> {
                long jsValue = JavaScriptRuntime.evaluateBytecode(context, bytecode2);
                Object ret = JSCUtils.jsValueToObject(context, jsValue);

                if (callback != null) {
                    callback.onJSEvaluated(ret);
                }
            });
        });
    }

    @Override
    public Object evaluateBytecode(byte[] bytecode) {
        if (bytecode == null || bytecode.length <= 0) {
            return null;
        }
        long jsValue = JavaScriptRuntime.evaluateBytecode(context, bytecode);
        return JSCUtils.jsValueToObject(context, jsValue);
    }

    @Override
    public void setRecycler(IRecycler recycler) {

    }

    @Override
    public long getIdentify() {
        return context;
    }

    @Override
    public void release() {
        if (jsExecutor != null) {
            jsExecutor.shutdown();
        }
        if (mainHandler != null) {
            mainHandler.removeCallbacksAndMessages(null);
        }
        JavaScriptRuntime.destroyJSContext(context);
    }

    @Override
    public boolean isValid() {
        return TypeConvertor.isJSContextValid(context);
    }
}
