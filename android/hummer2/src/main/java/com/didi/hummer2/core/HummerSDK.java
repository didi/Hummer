package com.didi.hummer2.core;

import android.content.Context;

import com.didi.hummer2.Hummer;
import com.didi.hummer2.debug.plugin.IHermesDebugger;

/**
 * didi Create on 2024/3/21 .
 * <p>
 * Copyright (c) 2024/3/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/21 4:31 PM
 * @Description 用一句话说明文件功能
 */

public class HummerSDK {

    public static Context appContext;

    public static String NAMESPACE_DEFAULT = Hummer.NAMESPACE_DEFAULT;


    public static IHermesDebugger getHermesDebugger() {
        return null;
    }
}
