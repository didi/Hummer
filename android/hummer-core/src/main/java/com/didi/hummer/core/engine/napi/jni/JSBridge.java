package com.didi.hummer.core.engine.napi.jni;

import com.didi.hummer.core.debug.InvokeTracker;
import com.didi.hummer.core.debug.InvokerAnalyzerManager;
import com.didi.hummer.core.engine.napi.NAPIContext;
import com.didi.hummer.core.util.DebugUtil;
import com.didi.hummer.core.util.ExceptionUtil;
import com.didi.hummer.core.util.HMLog;

import java.util.Arrays;

/**
 * Created by XiaoFeng on 2021/6/29.
 */
public class JSBridge {

    private long jsContext;
    private InvokeCallback mCallback;

    public JSBridge(long jsContext, InvokeCallback callback) {
        this.jsContext = jsContext;
        this.mCallback = callback;
        initBridge(jsContext);
        InvokerAnalyzerManager.getInstance().init(jsContext);
        HMLog.d("HummerNative", "JSBridge.init");
    }

    public void onDestroy() {
        HMLog.d("HummerNative", "JSBridge.onDestroy");
        releaseBridge(jsContext);
        InvokerAnalyzerManager.getInstance().release(jsContext);
        mCallback = null;
    }

    private Object invoke(String className, long objectID, String methodName, Object... params) {
        if (DebugUtil.isDebuggable()) {
            HMLog.d("HummerNative", String.format(
                    "[Java invoked][objectID=%d][className=%s][method=%s][params=%s]",
                    objectID, className, methodName, Arrays.toString(params)));
        }

        if (mCallback == null) {
            return null;
        }

        Object result = null;

        try {
            // <for debug>
            InvokeTracker tracker = InvokerAnalyzerManager.getInstance().startTrack(jsContext);
            if (tracker != null) {
                tracker.track(className, objectID, methodName, params);
            }

            // 执行具体的invoke方法，并得到Object类型的返回值
            result = mCallback.onInvoke(className, objectID, methodName, params);

            // <for debug>
            InvokerAnalyzerManager.getInstance().stopTrack(jsContext, tracker);
        } catch (Exception e) {
            String jsStack = ExceptionUtil.getJSErrorStack(NAPIContext.wrapper(jsContext));
            ExceptionUtil.addStackTrace(e, new StackTraceElement("<<JS_Stack>>", "", "\n" + jsStack, -1));
            JSException.nativeException(jsContext, e);
        }

        return result;
    }

    private native void initBridge(long jsContext);

    private native void releaseBridge(long jsContext);

    public interface InvokeCallback {

        Object onInvoke(String className, long objectID, String methodName, Object... params);
    }
}
