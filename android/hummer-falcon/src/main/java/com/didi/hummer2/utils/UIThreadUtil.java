package com.didi.hummer2.utils;

import android.os.Handler;
import android.os.Looper;

import com.didi.hummer2.exception.HummerThreadException;

/**
 * didi Create on 2023/3/20 .
 * <p>
 * Copyright (c) 2023/3/20 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/3/20 2:41 下午
 * @Description Thread 帮助类
 */
public class UIThreadUtil {

    private static Handler sMainHandler;

    /**
     * 判断是否是UI线程
     *
     * @return
     */
    public static boolean isOnMainThread() {
        return Looper.getMainLooper() == Looper.myLooper();
    }

    public static boolean isNotOnMainThread() {
        return Looper.getMainLooper() != Looper.myLooper();
    }


    public static boolean isOnUiThread() {
        return Looper.getMainLooper() == Looper.myLooper();
    }

    public static boolean isNotOnUiThread() {
        return Looper.getMainLooper() != Looper.myLooper();
    }


    private static void checkHandler() {
        if (sMainHandler == null) {
            synchronized (UIThreadUtil.class) {
                if (sMainHandler == null) {
                    sMainHandler = new Handler(Looper.getMainLooper());
                }
            }
        }
    }

    /**
     * 给定任务添加到UI线程
     *
     * @param runnable
     */
    public static void runOnUiThread(Runnable runnable) {
        checkHandler();
        sMainHandler.post(runnable);
    }

    public static void runOnUiThread(Runnable runnable, long delay) {
        checkHandler();
        sMainHandler.postDelayed(runnable, delay);
    }

    /**
     * //TODO 临时处理，ALooper与Handler队列顺序问题
     */
    public static void runOnUiThreadX(Runnable runnable, long delay) {
        checkHandler();
        sMainHandler.postDelayed(new XRunnable(runnable), delay);
    }


    public static void assetOnMainThread() {
        if (UIThreadUtil.isNotOnUiThread()) {
            if (F4NDebugUtil.isDebuggable()) {
                throw new HummerThreadException("this is not on main thread.");
            }
        }
    }

    public static void assetOnMainThreadCall(String method) {
        if (UIThreadUtil.isNotOnUiThread()) {
            if (F4NDebugUtil.isDebuggable()) {
                throw new HummerThreadException("call " + method + "() is not on main thread.");
            }
        }
    }

    public static void assetOnMainThread(String message) {
        if (UIThreadUtil.isNotOnUiThread()) {
            if (F4NDebugUtil.isDebuggable()) {
                throw new HummerThreadException(message);
            }
        }
    }

    private static class XRunnable implements Runnable {

        private Runnable runnable;

        public XRunnable(Runnable runnable) {
            this.runnable = runnable;
        }

        @Override
        public void run() {
            runOnUiThread(runnable);
        }
    }
}
