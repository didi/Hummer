package com.didi.hummer.context.napi;

import android.support.annotation.NonNull;
import android.widget.Toast;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.napi.NAPIContext;
import com.didi.hummer.core.engine.napi.jni.JSBridge;
import com.didi.hummer.core.engine.napi.jni.JSException;
import com.didi.hummer.core.engine.napi.jni.JSRecycler;
import com.didi.hummer.core.util.DebugUtil;
import com.didi.hummer.core.util.ExceptionUtil;
import com.didi.hummer.core.util.HMLog;
import com.didi.hummer.lifecycle.ILifeCycle;
import com.didi.hummer.render.component.view.Invoker;
import com.didi.hummer.render.style.HummerLayout;


public class NAPIHummerContext extends HummerContext implements JSBridge.InvokeCallback, JSRecycler.RecycleCallback {

    private JSBridge bridge;
    private JSRecycler recycler;

    public NAPIHummerContext(@NonNull HummerLayout container) {
        this(container, null);
    }

    public NAPIHummerContext(@NonNull HummerLayout container, String namespace) {
        super(container, namespace);
        mJsContext = NAPIContext.create();
        bridge = new JSBridge(mJsContext.getIdentify(), this);
        recycler = new JSRecycler(mJsContext.getIdentify(), this);

        // 异常回调注册
        JSException.addJSContextExceptionCallback(mJsContext, e -> {
            ExceptionUtil.addStackTrace(e, new StackTraceElement("<<Bundle>>", "", jsSourcePath, -1));
            HummerSDK.getException(namespace).onException(e);

            if (DebugUtil.isDebuggable()) {
                HMLog.e("HummerException", "Hummer Exception", e);
                Toast.makeText(HummerSDK.appContext, e.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

        onCreate();
    }

    @Override
    public void releaseJSContext() {
        JSException.removeJSContextExceptionCallback(mJsContext);
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
        Invoker invoker = mRegistry.get(className);
        if (invoker == null) {
            HMLog.w("HummerNative", String.format("Invoker error: can't find this class [%s]", className));
            return null;
        }
        return invoker.onInvoke(this, objectID, methodName, params);
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
