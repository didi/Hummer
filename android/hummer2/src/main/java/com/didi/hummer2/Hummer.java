package com.didi.hummer2;

import android.content.Context;

import com.didi.hummer2.core.HummerSDK;

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
            HummerSDK.appContext = appContext;
            hummerEngine.registerHummerConfig(hummerConfig);
        }
    }


    public static Context getAppContext() {
        return appContext;
    }

    public static HummerEngine getHummerEngine() {
        return hummerEngine;
    }


}
