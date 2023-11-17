package com.didi.hummer.component.toast;

import android.os.Build;
import android.os.Handler;
import android.os.Message;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.render.component.view.HMBase;

import java.lang.reflect.Field;

/**
 * Created by XiaoFeng on 2019-12-25.
 */
@Component("Toast")
public class Toast {

    @JsMethod("show")
    public static void show(String msg, int duration) {
        android.widget.Toast toast = android.widget.Toast.makeText(HummerSDK.appContext, msg, duration <= 2000 ? android.widget.Toast.LENGTH_SHORT : android.widget.Toast.LENGTH_LONG);
        hook(toast);
        toast.show();
    }

    @JsMethod("custom")
    public static void custom(HMBase baseView, int duration) {
        android.widget.Toast toast = new android.widget.Toast(HummerSDK.appContext);
        hook(toast);
        toast.setDuration(duration <= 2000 ? android.widget.Toast.LENGTH_SHORT : android.widget.Toast.LENGTH_LONG);
        toast.setView(baseView.getView());
        toast.show();
    }

    /**
     * 修复 Toast 在 Android 7.1.1 系统中出现的 BadTokenException 异常
     */
    private static void hook(android.widget.Toast toast) {
        if (Build.VERSION.SDK_INT != 25) { // 7.1.1
            return;
        }
        try {
            Field sField_TN = android.widget.Toast.class.getDeclaredField("mTN");
            sField_TN.setAccessible(true);
            Field sField_TN_Handler = sField_TN.getType().getDeclaredField("mHandler");
            sField_TN_Handler.setAccessible(true);
            Object tn = sField_TN.get(toast);
            Handler preHandler = (Handler) sField_TN_Handler.get(tn);
            sField_TN_Handler.set(tn, new SafelyHandlerWrapper(preHandler));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static class SafelyHandlerWrapper extends Handler {
        private Handler impl;

        public SafelyHandlerWrapper(Handler impl) {
            this.impl = impl;
        }

        @Override
        public void dispatchMessage(Message msg) {
            try {
                impl.dispatchMessage(msg);
            } catch (Exception ignored) {}
        }

        @Override
        public void handleMessage(Message msg) {
            impl.handleMessage(msg);
        }
    }
}
