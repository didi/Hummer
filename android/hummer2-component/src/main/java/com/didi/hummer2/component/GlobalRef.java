package com.didi.hummer2.component;

import android.content.Context;

import com.didi.hummer.context.HummerContext;
import com.didi.hummer.context.napi.NAPIHummerContext;

/**
 * didi Create on 2023/12/4 .
 * <p>
 * Copyright (c) 2023/12/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/12/4 9:02 PM
 * @Description 用一句话说明文件功能
 */

public class GlobalRef {


    private static HummerContext hummerContext;

    public static HummerContext getHummerContext(Context context) {

        if (hummerContext == null) {
            hummerContext = new NAPIHummerContext(context);
        }
        return hummerContext;
    }
}
