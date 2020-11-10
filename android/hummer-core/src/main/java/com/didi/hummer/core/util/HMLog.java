package com.didi.hummer.core.util;

import android.util.Log;

/**
 * Created by XiaoFeng on 2019-11-05.
 */
public class HMLog {

    public static void v(String tag, String msg) {
        if (DebugUtil.isDebuggable()) {
            Log.v(tag, msg);
        }
    }

    public static void d(String tag, String msg) {
        if (DebugUtil.isDebuggable()) {
            Log.d(tag, msg);
        }
    }

    public static void i(String tag, String msg) {
        if (DebugUtil.isDebuggable()) {
            Log.i(tag, msg);
        }
    }

    public static void w(String tag, String msg) {
        if (DebugUtil.isDebuggable()) {
            Log.w(tag, msg);
        }
    }

    public static void w(String tag, String msg, Throwable e) {
        if (DebugUtil.isDebuggable()) {
            Log.w(tag, msg, e);
        }
    }

    public static void e(String tag, String msg) {
        if (DebugUtil.isDebuggable()) {
            Log.e(tag, msg);
        }
    }

    public static void e(String tag, String msg, Throwable e) {
        if (DebugUtil.isDebuggable()) {
            Log.e(tag, msg, e);
        }
    }

    public static void wtf(String tag, String msg) {
        if (DebugUtil.isDebuggable()) {
            Log.wtf(tag, msg);
        }
    }

    public static void wtf(String tag, String msg, Throwable e) {
        if (DebugUtil.isDebuggable()) {
            Log.wtf(tag, msg, e);
        }
    }
}
