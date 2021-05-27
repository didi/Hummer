package com.didi.hummer.core.engine.jsc.jni;

import com.didi.hummer.core.debug.InvokerAnalyzerManager;
import com.didi.hummer.core.debug.InvokeTracker;
import com.didi.hummer.core.engine.jsc.JSCContext;
import com.didi.hummer.core.engine.jsc.JSCUtils;
import com.didi.hummer.core.util.DebugUtil;
import com.didi.hummer.core.util.ExceptionUtil;
import com.didi.hummer.core.util.HMLog;

import java.util.Arrays;

public class HummerBridge {

    private long jsContext;
    private InvokeCallback mCallback;

    public HummerBridge(long jsContext, InvokeCallback callback) {
        this.jsContext = jsContext;
        this.mCallback = callback;
        initHummerBridge(jsContext);
        InvokerAnalyzerManager.getInstance().init(jsContext);
        HMLog.d("HummerNative", "HummerBridge.init");
    }

    public void onDestroy() {
        HMLog.d("HummerNative", "HummerBridge.onDestroy");
        releaseHummerBridge(jsContext);
        InvokerAnalyzerManager.getInstance().release(jsContext);
        mCallback = null;
    }

    private long invoke(String className, long objectID, String methodName, long... params) {
        if (DebugUtil.isDebuggable()) {
            HMLog.d("HummerNative", String.format(
                    "[Java invoked][objectID=%d][className=%s][method=%s][params=%s]",
                    objectID, className, methodName, Arrays.toString(params)));
        }

        if (mCallback == null) {
            return JSCUtils.POINTER_NULL;
        }

        long result = JSCUtils.POINTER_NULL;
        Object[] parameters = null;

        try {
            // <for debug>
            InvokeTracker tracker = InvokerAnalyzerManager.getInstance().startTrack(jsContext);

            // 把long型的JS对象指针参数转换为Object或JSValue对象参数
            parameters = JSCUtils.jsValuesToObjects(jsContext, params);

            // <for debug>
            if (tracker != null) {
                tracker.track(className, objectID, methodName, parameters);
            }

            // 执行具体的invoke方法，并得到Object类型的返回值
            Object ret = mCallback.onInvoke(className, objectID, methodName, parameters);

            // 把Object类型的返回值转换成long型的JS对象指针
            result = JSCUtils.objectToJsValue(jsContext, ret);

            // <for debug>
            InvokerAnalyzerManager.getInstance().stopTrack(jsContext, tracker);
        } catch (Exception e) {
            String jsStack = ExceptionUtil.getJSErrorStack(JSCContext.wrapper(jsContext));
            ExceptionUtil.addStackTrace(e, new StackTraceElement("<<JS_Stack>>", "", "\n" + jsStack, -1));
            ExceptionUtil.addStackTrace(e, new StackTraceElement(String.format("<<Bridge>> (%d) %s", objectID, className), methodName, Arrays.toString(parameters), -1));
            HummerException.nativeException(jsContext, e);
        }

        return result;
    }

    private native void initHummerBridge(long jsContext);

    private native void releaseHummerBridge(long jsContext);

    public interface InvokeCallback {

        Object onInvoke(String className, long objectID, String methodName, Object... params);
    }
}