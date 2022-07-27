package com.didi.hummer.core.engine.napi.jni;

import com.didi.hummer.core.engine.base.ICallback;
import com.didi.hummer.core.engine.base.IRecycler;
import com.didi.hummer.core.util.HMGsonUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by XiaoFeng on 2021/6/29.
 */
public class JSEngine {

    /**
     * 按每个ICallback的hashCode作为Map的key，所以一个上下文中可以注册多个ICallback
     */
    private static final Map<Long, Map<Integer, ICallback>> callbackMaps = new ConcurrentHashMap<>();
    /**
     * 按context作为Map的key，所以一个上下文中只能有一个IRecycler
     */
    private static final Map<Long, IRecycler> recyclerMap = new ConcurrentHashMap<>();

    public static String toJsonString(Object object) {
        return HMGsonUtil.toJson(object);
    }

    private static Object callJavaCallback(long context, int callbackId, Object... params) {
        Map<Integer, ICallback> map = callbackMaps.get(context);
        if (map == null) {
            return null;
        }
        ICallback callback = map.get(callbackId);
        if (callback == null) {
            return null;
        }
        return callback.call(params);
    }

    private static void callJavaRecycler(long context, long objId) {
        IRecycler recycler = recyclerMap.get(context);
        if (recycler == null) {
            return;
        }
        recycler.onRecycle(objId);
    }

    public static void registerJSCallback(long context, long object, String funcName, ICallback callback) {
        int callbackId = callback.hashCode();
        registerFunction(context, object, funcName, callbackId);

        Map<Integer, ICallback> map = callbackMaps.get(context);
        if (map == null) {
            map = new HashMap<>();
            callbackMaps.put(context, map);
        }
        map.put(callbackId, callback);
    }

    public static void unregisterJSCallback(long context) {
        Map<Integer, ICallback> map = callbackMaps.remove(context);
        if (map != null) {
            map.clear();
        }
    }

    public static void unregisterJSCallback(long context, ICallback callback) {
        Map<Integer, ICallback> map = callbackMaps.get(context);
        if (map != null) {
            int callbackId = callback.hashCode();
            map.remove(callbackId);
        }
    }

    public static void registerJSRecycler(long context, IRecycler recycler) {
        recyclerMap.put(context, recycler);
    }

    public static void unregisterJSRecycler(long context) {
        recyclerMap.remove(context);
    }

    public static native long createJSContext();
    public static native void destroyJSContext(long jsContext);
    public static native Object evaluateJavaScript(long jsContext, String script, String scriptId);
    public static native byte[] compileJavaScript(long jsContext, String script, String scriptId);
    public static native Object evaluateBytecode(long jsContext, byte[] bytecode);
    public static native void setProperty(long jsContext, long object, String key, Object value);
    public static native Object getProperty(long jsContext, long object, String key);
    public static native boolean delProperty(long jsContext, long object, String key);
    public static native void registerFunction(long jsContext, long object, String funcName, int funcId);
    public static native Object callFunction(long jsContext, long thisObj, long funcObj, Object... params);
    public static native boolean isJSContextValid(long jsContext);
    public static native boolean isJSValueValid(long jsContext, long jsValue);
    public static native boolean isJSValueEqual(long jsContext, long jsValueLeft, long jsValueRight);
    public static native void protect(long jsContext, long jsValue);
    public static native void unprotect(long jsContext, long jsValue);
}
