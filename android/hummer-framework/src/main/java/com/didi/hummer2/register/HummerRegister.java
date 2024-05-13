package com.didi.hummer2.register;

/**
 * didi Create on 2024/3/21 .
 * <p>
 * Copyright (c) 2024/3/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/21 11:21 AM
 *
 * @Description Hummer组件注册器，用于注册Hummer组件，自动注入组件
 */

public interface HummerRegister {

    void register(InvokerRegister invokerRegister);
}
