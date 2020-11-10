package com.didi.hummer.utils;

import android.os.Handler;
import android.os.Looper;

public class UIThreadUtil {
    private static Handler sMainHandler;

    /**
     * 判断是否是UI线程
     * @return
     */
    public static boolean isOnMainThread() {
        return Looper.getMainLooper().getThread() == Thread.currentThread();
    }

    /**
     * 给定任务添加到UI线程
     * @param runnable
     */
    public static void runOnUiThread(Runnable runnable) {
        synchronized (UIThreadUtil.class) {
            if (sMainHandler == null) {
                sMainHandler = new Handler(Looper.getMainLooper());
            }
        }
        sMainHandler.post(runnable);
    }
}
