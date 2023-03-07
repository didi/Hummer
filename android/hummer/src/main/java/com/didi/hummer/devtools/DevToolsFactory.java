package com.didi.hummer.devtools;

import com.didi.hummer.context.HummerContext;

/**
 * didi Create on 2023/3/7 .
 * <p>
 * Copyright (c) 2023/3/7 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/3/7 11:03 上午
 * @Description HummerDevTools 构建工厂
 */

public interface DevToolsFactory {

    HummerDevTools create(HummerContext context, DevToolsConfig config);
}
