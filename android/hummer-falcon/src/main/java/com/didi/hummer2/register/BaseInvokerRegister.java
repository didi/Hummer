package com.didi.hummer2.register;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.invoke.Invoker;

import java.util.HashMap;
import java.util.Map;

/**
 * didi Create on 2024/3/27 .
 * <p>
 * Copyright (c) 2024/3/27 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/27 11:47 AM
 * @Description 基础Invoker注册器，存储组件的Invoker信息
 */

public class BaseInvokerRegister implements InvokerRegister {

    private Map<String, Invoker> invokers;


    public BaseInvokerRegister() {
        invokers = new HashMap<>();
    }

    public BaseInvokerRegister(Map<String, Invoker> invokers) {
        this.invokers = invokers;
    }

    @Override
    public Object invoke(HummerContext hummerContext, HummerObject hummerObject, long type, long objId, long methodType, String componentName, String methodName, int argc, Object[] params) {
        Invoker invoker = hummerObject.getInvoker();
        return invoker.invoke(hummerContext, hummerObject, methodName, params);
    }


    @Override
    public void registerInvoker(Invoker invoker) {
        invokers.put(invoker.getName(), invoker);
    }

    @Override
    public Invoker getInvoker(String name) {
        return invokers.get(name);
    }
}
