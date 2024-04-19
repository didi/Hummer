package com.didi.hummer2.devtools;


import com.didi.hummer2.HummerContext;

/**
 * didi Create on 2023/3/7 .
 * <p>
 * Copyright (c) 2023/3/7 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/3/7 10:58 上午
 * @Description HummerDevTools
 */

public interface HummerDevTools {
    /**
     * 注入参数
     */
    interface IParameterInjector {
        void injectParameter(StringBuilder builder);
    }

    /**
     * 刷新回调
     */
    interface IHotReloadCallback {
        void onHotReload();
    }

    void release(HummerContext hummerContext);

    void initConnection(HummerContext context, String url, IHotReloadCallback callback);
}
