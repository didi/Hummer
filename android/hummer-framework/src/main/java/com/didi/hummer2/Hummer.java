package com.didi.hummer2;

import android.content.Context;

import com.didi.hummer2.tools.HummerGlobal;

/**
 * didi Create on 2024/3/21 .
 * <p>
 * Copyright (c) 2024/3/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/21 11:19 AM
 * @Description 用一句话说明文件功能
 */

public class Hummer {


    public static final String NAMESPACE_DEFAULT = "__hummer_default__";


    private static final HummerEngine hummerEngine = new HummerEngine();

    private static Context appContext = null;


    public static void init(HummerConfig hummerConfig) {
        if (hummerConfig != null) {
            appContext = hummerConfig.getContext().getApplicationContext();
            HummerGlobal.appContext = appContext;
            hummerEngine.initHummer(appContext);
            hummerEngine.registerHummerConfig(hummerConfig);
        }
    }


    public static Context getAppContext() {
        return appContext;
    }

    public static HummerEngine getHummerEngine() {
        return hummerEngine;
    }


    public static HummerConfig getDefaultConfig() {
        return hummerEngine.getDefaultConfig();
    }


    public static HummerConfig getHummerConfig(String namespace) {
        return hummerEngine.getHummerConfig(namespace);
    }

    public static HummerConfig getHummerConfig(HummerContext hummerContext) {
        if (hummerContext != null) {
            return hummerEngine.getHummerConfig(hummerContext.getNamespace());
        }
        return null;
    }

    public static void release(String namespace) {
        hummerEngine.release(namespace);
    }

    public static void releaseAll() {
        hummerEngine.releaseAll();
    }

}
