package com.didi.hummer2.core.util;

import com.didi.hummer2.core.debug.DebugConfig;


/**
 * Created by XiaoFeng on 2019-12-09.
 */
public class DebugUtil {

    private static boolean isGlobalDebug = false;

    public static boolean isDebuggable() {
        return isGlobalDebug;
    }

    /**
     * 是否开启 debug
     * 备注：只有在全局debug开启时，指定命名空间才允许开启
     *
     * @param namespace hummer 命名空间
     * @return false 关闭，ture 开启
     */
    public static boolean isDebuggable(String namespace) {
        if (isGlobalDebug) {
            return DebugConfig.getInstance().isDebuggable(namespace);
        }
        return false;
    }

    public static void setDebuggable(boolean isDebug) {
        DebugUtil.isGlobalDebug = isDebug;
    }
}
