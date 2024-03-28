package com.didi.hummer2.core;

import com.didi.hummer2.core.invoke.Invoker;

import java.util.Map;

/**
 * didi Create on 2024/3/27 .
 * <p>
 * Copyright (c) 2024/3/27 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/27 5:51 PM
 * @Description 用一句话说明文件功能
 */

public class HummerInvokerRegister extends BaseInvokerRegister {


    public HummerInvokerRegister() {
    }

    public HummerInvokerRegister(Map<String, Invoker> invokers) {
        super(invokers);
    }
}
