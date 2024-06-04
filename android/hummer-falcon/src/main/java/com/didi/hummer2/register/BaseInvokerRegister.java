package com.didi.hummer2.register;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.invoke.Invoker;
import com.didi.hummer2.utils.F4NDebugUtil;
import com.didi.hummer2.utils.HMLog;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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
        invokers = new ConcurrentHashMap<>();
    }

    public BaseInvokerRegister(Map<String, Invoker> invokers) {
        this.invokers = invokers;
    }

    @Override
    public Object invoke(HummerContext hummerContext, HummerObject hummerObject, long type, long objId, long methodType, String componentName, String methodName, int argc, Object[] params) {
        Invoker invoker = hummerObject.getInvoker();
        if (invoker != null) {
            return invoker.invoke(hummerContext, hummerObject, methodName, params);
        } else {
            HMLog.e("HummerNative", "invoke() not found " + componentName + "." + methodName);
        }
        return null;
    }


    @Override
    public void registerInvoker(Invoker invoker) {
        if (F4NDebugUtil.isDebuggable()) {
            if (invokers.containsKey(invoker.getName())) {
                String className = tryFindClassName(invoker);
                HMLog.w("HummerNative", "registerInvoker() invoker already exist. name=" + invoker.getName() + ",className=" + className);
            }
        }
        invokers.put(invoker.getName(), invoker);
    }

    @Override
    public Invoker getInvoker(String name) {
        return invokers.get(name);
    }


    private String tryFindClassName(Invoker invoker) {
        String className = "unknown";
        try {
            className = invoker.createInstance(null).getClass().getName();
        } catch (Exception e) {
//            e.printStackTrace();
        }
        return className;
    }
}
