package com.didi.hummer2.register;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.invoke.Invoker;


/**
 * didi Create on 2024/3/26 .
 * <p>
 * Copyright (c) 2024/3/26 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/26 6:24 PM
 * @Description Hummer invoker 指令注册器
 */

public interface InvokerRegister {


    Object invoke(HummerContext hummerContext, HummerObject hummerObject, long type, long objId, long methodType, String componentName, String methodName, int argc, Object[] params);

    void registerInvoker(Invoker invoker);

    Invoker getInvoker(String name);
}
