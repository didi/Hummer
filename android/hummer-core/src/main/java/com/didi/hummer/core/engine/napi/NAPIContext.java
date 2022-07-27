package com.didi.hummer.core.engine.napi;

import android.os.Handler;
import android.os.Looper;
import android.text.TextUtils;

import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.base.IRecycler;
import com.didi.hummer.core.engine.napi.jni.JSEngine;
import com.didi.hummer.core.util.BytecodeCacheUtil;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by XiaoFeng on 2021/6/29.
 */
public class NAPIContext extends NAPIValue implements JSContext {

    private ExecutorService jsExecutor;
    private Handler mainHandler;

    public static NAPIContext create() {
        return wrapper(JSEngine.createJSContext());
    }

    public static NAPIContext wrapper(long context) {
        return new NAPIContext(context);
    }

    private NAPIContext(long context) {
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
        Object ret;
        if (TextUtils.isEmpty(scriptId)) {
            ret = JSEngine.evaluateJavaScript(context, script, scriptId);
        } else {
            byte[] bytecode = BytecodeCacheUtil.getBytecode(scriptId);
            if (bytecode == null || bytecode.length <= 0) {
                bytecode = JSEngine.compileJavaScript(context, script, scriptId);
            }
            if (bytecode == null || bytecode.length <= 0) {
                ret = JSEngine.evaluateJavaScript(context, script, scriptId);
            } else {
                BytecodeCacheUtil.putBytecode(scriptId, bytecode);
                ret = JSEngine.evaluateBytecode(context, bytecode);
            }
        }
        return ret;
    }

    @Override
    public Object evaluateJavaScriptOnly(String script, String scriptId) {
        if (TextUtils.isEmpty(script)) {
            return null;
        }
        if (scriptId == null) {
            scriptId = "";
        }
        return JSEngine.evaluateJavaScript(context, script, scriptId);
    }

    @Override
    public void evaluateJavaScriptAsync(String script, String scriptId, JSEvaluateCallback callback) {
        // 如果之前已有缓存字节码，直接主线程执行
        byte[] bytecode = BytecodeCacheUtil.getBytecode(scriptId);
        if (bytecode != null && bytecode.length > 0) {
            Object ret = JSEngine.evaluateBytecode(context, bytecode);
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
            NAPIContext ctx = NAPIContext.create();
            byte[] bytecode2 = JSEngine.compileJavaScript(ctx.context, script, scriptId);
            BytecodeCacheUtil.putBytecode(scriptId, bytecode2);
            ctx.release();

            if (mainHandler == null) {
                mainHandler = new Handler(Looper.getMainLooper());
            }
            mainHandler.post(() -> {
                Object ret = JSEngine.evaluateBytecode(context, bytecode2);

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
        return JSEngine.evaluateBytecode(context, bytecode);
    }

    @Override
    public void setRecycler(IRecycler recycler) {
        JSEngine.registerJSRecycler(context, recycler);
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
        JSEngine.unregisterJSCallback(context);
        JSEngine.unregisterJSRecycler(context);
        JSEngine.destroyJSContext(context);
    }

    @Override
    public boolean isValid() {
        return JSEngine.isJSContextValid(context);
    }
}
