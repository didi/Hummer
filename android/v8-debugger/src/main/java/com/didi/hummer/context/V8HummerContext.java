package com.didi.hummer.context;

import android.os.Handler;
import android.os.Looper;
import android.support.annotation.NonNull;

import com.didi.hummer.V8Thread;
import com.didi.hummer.core.engine.J2V8Context;
import com.didi.hummer.core.engine.J2V8Utils;
import com.didi.hummer.core.engine.debugger.J2V8ContextDebugger;
import com.didi.hummer.core.engine.jsc.jni.HummerException;
import com.didi.hummer.core.util.HMLog;
import com.didi.hummer.render.component.view.Invoker;
import com.didi.hummer.render.style.HummerLayout;

import java.util.Arrays;
import java.util.concurrent.FutureTask;

/**
 * Created by XiaoFeng on 2019-10-14.
 */
public class V8HummerContext extends HummerContext {

    private Handler mHandler;
    public static boolean isNeedDebug = true;

    public V8HummerContext(@NonNull HummerLayout container, String namespace) {
        super(container, namespace);
        mHandler = new Handler(Looper.getMainLooper());

        mJsContext = isNeedDebug ? J2V8ContextDebugger.create() : J2V8Context.create();

        if (isNeedDebug) {
            mJsContext = J2V8ContextDebugger.create();
            V8Thread.checkThreadAsync(this::init);
        } else {
            mJsContext = J2V8Context.create();
            init();
        }
    }

    private void init() {
        // V8引擎暂时还未实现块级内存回收机制，这里先简单处理下
        mJsContext.evaluateJavaScript("class Recycler {}");

        ((J2V8Context) mJsContext).registerJavaMethod(this, "invoke", "invoke", new Class[]{String.class, long.class, String.class, Object[].class});

        onCreate();
    }

    @Override
    public void onDestroy() {
        mHandler.removeCallbacksAndMessages(null);
        super.onDestroy();
    }

    public Object invoke(String className, long objectID, String methodName, Object... params) {
        HMLog.d("HummerNative", String.format(
                "[Java invoked][className=%s][objectID=%d][method=%s][params=%s]",
                className, objectID, methodName, Arrays.toString(params)));

        Invoker invoker = mRegistry.get(className);
        if (invoker == null) {
            HMLog.w("HummerNative", String.format("Invoker error: can't find this class [%s]", className));
            return null;
        }

        // J2V8从JS传到Native的参数都是Object类型的
        final Object[] parameters = J2V8Utils.objectsToJ2V8Objects((J2V8Context) mJsContext, params);

        Object ret = null;
        try {
            if (isNeedDebug && isNeedUIThread(className, methodName)) {
                FutureTask<Object> task = new FutureTask<>(() -> invoker.onInvoke(this, objectID, methodName, parameters));
                mHandler.post(task);
                // 解决线程死锁问题
                if (!isNotNeedReturn(className, methodName)) {
                    ret = task.get();
                }
            } else {
                ret = invoker.onInvoke(this, objectID, methodName, parameters);
            }
        } catch (Exception e) {
            e.printStackTrace();
            mHandler.post(() -> HummerException.nativeException(getJsContext(), e));
        }
        return J2V8Utils.objectToV8Object(((J2V8Context) mJsContext).getV8(), ret);
    }

    @Override
    public Object onJsFunctionCall(String funcName, Object... params) {

        // 自己注册的方法，也可能需要切换到主线程，先这么临时处理
        if ("Hummer.setTitle".equals(funcName)) {
            FutureTask<Object> task = new FutureTask<>(() -> super.onJsFunctionCall(funcName, params));
            mHandler.post(task);
            return null;
        }

        return super.onJsFunctionCall(funcName, params);
    }

    private boolean isNeedUIThread(String className, String methodName) {
        return
                // Hummer SDK
                ("View".equals(className) && !methodName.contains("constructor"))
                        || ("Hummer".equals(className) && "render".equals(methodName))
                        || "Text".equals(className)
                        || "Button".equals(className)
                        || "Image".equals(className)
                        || "Input".equals(className)
                        || "TextArea".equals(className)
                        || "Switch".equals(className)
                        || "List".equals(className)
                        || "Scroller".equals(className)
                        || "HorizontalScroller".equals(className)
                        || "Loading".equals(className)
                        || "Toast".equals(className)
                        || "Dialog".equals(className)
                        || "Navigator".equals(className)
                        // HummerX SDK
                        || "Banner".equals(className)
                        || "BottomSheetDialog".equals(className)
                        || "ImagePicker".equals(className)
                        || "Phone".equals(className)
                        || "PhotoViewer".equals(className)
                        || "ViewPager".equals(className)
                        || "WheelView".equals(className)
                        || "Label".equals(className)
                        || "UniPay".equals(className)
                        // DaiJia
                        || "LoginManager".equals(className)
                        || "HMXDDMapView".equals(className)
                        || "HMXDDMapBubbleView".equals(className)
                        || "HMXDDNavigationPage".equals(className)
                        || "HMXAMapView".equals(className)
                        || "HMXAMapBubbleView".equals(className)
                        // 596
                        || "NumberSecurity".equals(className)
                        || "HMX19Pay".equals(className)
                        || "HMOrderCard".equals(className)
                        || "LottieImage".equals(className)
                        || "SlideBar".equals(className)
                        || "LoginBusiness".equals(className);
    }

    private boolean isNotNeedReturn(String className, String methodName) {
        return  // Hummer SDK
                "Hummer".equals(className)
                        || "NotifyCenter".equals(className)
                        || "Timer".equals(className)
                        || "View".equals(className)
                        || "Text".equals(className)
                        || "Button".equals(className)
                        || "Image".equals(className)
                        || "Input".equals(className)
                        || "TextArea".equals(className)
                        || "Switch".equals(className)
                        || "List".equals(className)
                        || "Scroller".equals(className)
                        || "HorizontalScroller".equals(className)
                        || "Loading".equals(className)
                        || "Toast".equals(className)
                        || "Dialog".equals(className)
                        || "Navigator".equals(className)
                        || "Request".equals(className)
                        // HummerX SDK
                        || "Banner".equals(className)
                        || "BottomSheetDialog".equals(className)
                        || "ImagePicker".equals(className)
                        || "Phone".equals(className)
                        || "PhotoViewer".equals(className)
                        || "ViewPager".equals(className)
                        || "WheelView".equals(className)
                        || "HttpClient".equals(className)
                        || "KopHttpClient".equals(className)
                        || "UniPay".equals(className)
                        // DaiJia
                        || "HMXLabel".equals(className)
                        || "HMXDDMapView".equals(className)
                        || "HMXDDMapBubbleView".equals(className)
                        || "HMXDDNavigationPage".equals(className)
                        || "HMXAMapView".equals(className)
                        || "HMXAMapBubbleView".equals(className)
                        // 596
                        || "NumberSecurity".equals(className)
                        || "HMX19Pay".equals(className)
                        || "HMXToast".equals(className)
                        || "HMOrderCard".equals(className)
                        || "LottieImage".equals(className)
                        || "SlideBar".equals(className)
                        || "LoginBusiness".equals(className);
    }
}
