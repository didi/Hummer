package com.didi.hummer.core.engine.napi.jni;

import android.util.LongSparseArray;

import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.exception.ExceptionCallback;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by XiaoFeng on 2021/6/29.
 */
public class JSException {

    public interface JSExceptionCallback {
        void onException(long jsContext, String errMsg);
    }

    private static LongSparseArray<List<ExceptionCallback>> contextCallbacks = new LongSparseArray<>();

    public static void init() {
        // JS代码产生的Exception
        init((jsContext, errMsg) -> {
            dispatchExceptionCallback(jsContext, new com.didi.hummer.core.exception.JSException(errMsg));
        });
    }

    private static native void init(JSExceptionCallback callback);

    // Native代码产生的Exception
    public static void nativeException(JSContext jsContext, Exception e) {
        nativeException(jsContext.getIdentify(), e);
    }

    // Native代码产生的Exception
    public static void nativeException(long jsContext, Exception e) {
        dispatchExceptionCallback(jsContext, e);
    }

    /**
     * 添加ExceptionCallback
     */
    public static void addJSContextExceptionCallback(JSContext jsContext, ExceptionCallback callback) {
        List<ExceptionCallback> cbList = contextCallbacks.get(jsContext.getIdentify());
        if (cbList == null) {
            cbList = new ArrayList<>();
            contextCallbacks.put(jsContext.getIdentify(), cbList);
        }
        cbList.add(callback);
    }

    /**
     * 删除指定ExceptionCallback
     */
    public static void removeJSContextExceptionCallback(JSContext jsContext, ExceptionCallback callback) {
        List<ExceptionCallback> cbList = contextCallbacks.get(jsContext.getIdentify());
        if (cbList != null) {
            Iterator<ExceptionCallback> iterator = cbList.iterator();
            while (iterator.hasNext()) {
                ExceptionCallback cb = iterator.next();
                if (cb == callback) {
                    iterator.remove();
                }
            }
        }
    }

    /**
     * 删除指定JSContext下的所有ExceptionCallback
     */
    public static void removeJSContextExceptionCallback(JSContext jsContext) {
        contextCallbacks.remove(jsContext.getIdentify());
    }

    /**
     * 统一派发异常回调
     */
    private static void dispatchExceptionCallback(long jsContext, Exception e) {
        List<ExceptionCallback> cbList = contextCallbacks.get(jsContext);
        if (cbList != null) {
            for (ExceptionCallback cb : cbList) {
                if (cb != null) {
                    cb.onException(e);
                }
            }
        }
    }
}
