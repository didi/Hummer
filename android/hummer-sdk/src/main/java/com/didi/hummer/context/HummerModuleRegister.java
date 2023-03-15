package com.didi.hummer.context;

/**
 * didi Create on 2023/3/15 .
 * <p>
 * Copyright (c) 2023/3/15 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/3/15 8:29 下午
 * @Description Hummer 模块注册器
 */

public interface HummerModuleRegister {

    String getModuleName();

    void register(HummerContext hummerContext);
}
