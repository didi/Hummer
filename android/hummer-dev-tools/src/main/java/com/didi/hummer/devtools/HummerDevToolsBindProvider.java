package com.didi.hummer.devtools;


import com.didi.hummer.context.HummerContext;

/**
 * didi Create on 2023/3/7 .
 * <p>
 * Copyright (c) 2023/3/7 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/3/7 11:19 上午
 * @Description 用于绑定 HummerDevTools
 */

public class HummerDevToolsBindProvider extends NopContentProvider {

    @Override
    public boolean onCreate() {
        HummerDevToolsFactory.setDevToolsFactory(new DevToolsFactory() {
            @Override
            public HummerDevTools create(HummerContext context, DevToolsConfig config) {
                return new DefaultHummerDevTools(context, config);
            }
        });
        return true;
    }

}
