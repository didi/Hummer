package com.didi.hummer.context.jsc;

import android.content.Context;
import android.support.annotation.NonNull;
import android.util.Log;
import android.widget.Toast;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.jsc.JSCContext;
import com.didi.hummer.core.engine.jsc.jni.HummerBridge;
import com.didi.hummer.core.engine.jsc.jni.HummerException;
import com.didi.hummer.core.engine.jsc.jni.HummerRecycler;
import com.didi.hummer.core.util.DebugUtil;
import com.didi.hummer.core.util.ExceptionUtil;
import com.didi.hummer.core.util.HMLog;
import com.didi.hummer.debug.InvokerAnalyzer;
import com.didi.hummer.lifecycle.ILifeCycle;
import com.didi.hummer.render.component.view.Invoker;
import com.didi.hummer.render.style.HummerLayout;


public class JSCHummerContext extends HummerContext implements HummerBridge.InvokeCallback, HummerRecycler.RecycleCallback {

    private HummerBridge bridge;
    private HummerRecycler recycler;

    public JSCHummerContext(@NonNull Context context) {
        super(context);
        mJsContext = JSCContext.create();

        // 异常回调注册
        HummerException.addJSContextExceptionCallback(mJsContext, e -> {
            HummerSDK.getException(namespace).onException(e);
            if (DebugUtil.isDebuggable()) {
                mJsContext.evaluateJavaScript("console.error(`" + Log.getStackTraceString(e) + "`)");
            }
        });
    }

    public JSCHummerContext(@NonNull HummerLayout container) {
        this(container, null);
    }

    public JSCHummerContext(@NonNull HummerLayout container, String namespace) {
        super(container, namespace);
        mJsContext = JSCContext.create();
        bridge = new HummerBridge(mJsContext.getIdentify(), this);
        recycler = new HummerRecycler(mJsContext.getIdentify(), this);

        // 异常回调注册
        HummerException.addJSContextExceptionCallback(mJsContext, e -> {
            ExceptionUtil.addStackTrace(e, new StackTraceElement("<<Bundle>>", "", jsSourcePath, -1));
            HummerSDK.getException(namespace).onException(e);

            if (DebugUtil.isDebuggable()) {
                mJsContext.evaluateJavaScript("console.error(`" + Log.getStackTraceString(e) + "`)");
                Toast.makeText(HummerSDK.appContext, e.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

        onCreate();
    }

    @Override
    public void releaseJSContext() {
        HummerException.removeJSContextExceptionCallback(mJsContext);
        if (bridge != null) {
            bridge.onDestroy();
        }
        if (recycler != null) {
            recycler.onDestroy();
        }
        super.releaseJSContext();
    }

    @Override
    public Object onInvoke(String className, long objectID, String methodName, Object... params) {
        // <for debug>
        InvokerAnalyzer.startTrack(invokerAnalyzer, className, objectID, methodName, params);

        Invoker invoker = mRegistry.get(className);
        if (invoker == null) {
            HMLog.w("HummerNative", String.format("Invoker error: can't find this class [%s]", className));
            return null;
        }
        Object ret = invoker.onInvoke(this, objectID, methodName, params);

        // <for debug>
        InvokerAnalyzer.stopTrack(invokerAnalyzer);

        return ret;
    }

    @Override
    public void onRecycle(long objId) {
        HMLog.v("HummerNative", "** onRecycle, objId = " + objId);
        Object obj = getObjectPool().remove(objId);
        if (obj instanceof ILifeCycle) {
            ((ILifeCycle) obj).onDestroy();
        }
    }
}
