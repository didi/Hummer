package com.didi.hummer.devtools;

import com.didi.hummer.context.HummerContext;

/**
 * didi Create on 2023/3/7 .
 * <p>
 * Copyright (c) 2023/3/7 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/3/7 11:01 上午
 * @Description DevToolsFactory 工厂
 */

public class HummerDevToolsFactory {

    private static DevToolsFactory devToolsFactory;

    private HummerDevToolsFactory() {
    }

    public static HummerDevTools create(HummerContext context, DevToolsConfig config) {
        if (devToolsFactory != null) {
            return devToolsFactory.create(context, config);
        }
        return null;
    }


    public static void setDevToolsFactory(DevToolsFactory devToolsFactory) {
        HummerDevToolsFactory.devToolsFactory = devToolsFactory;
    }
}
