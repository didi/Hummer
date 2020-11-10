package com.didi.hummer.core.util;

/**
 * Created by XiaoFeng on 2019-12-09.
 */
public class DebugUtil {

    private static boolean isDebug = false;

    public static boolean isDebuggable() {
        return isDebug;
    }

    public static void setDebuggable(boolean isDebug) {
        DebugUtil.isDebug = isDebug;
    }
}
