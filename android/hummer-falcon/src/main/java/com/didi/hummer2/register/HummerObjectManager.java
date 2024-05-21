package com.didi.hummer2.register;


import com.didi.hummer2.HummerContext;
import com.didi.hummer2.invoke.Invoker;
import com.didi.hummer2.utils.HMLog;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * didi Create on 2024/3/27 .
 * <p>
 * Copyright (c) 2024/3/27 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/27 2:35 PM
 * @Description 组件生命周期管理+组件方法调用
 */

public class HummerObjectManager implements InvokerRegister {


    private HummerContext hummerContext;
    private InvokerRegister invokerRegister;
    private Map<Long, HummerObject> objectMap;

    public HummerObjectManager(HummerContext hummerContext, InvokerRegister invokerRegister) {
        this.hummerContext = hummerContext;
        this.invokerRegister = invokerRegister;
        this.objectMap = new ConcurrentHashMap<>();
    }


    public HummerObject searchObject(long objId) {
        return objectMap.get(objId);
    }

    public List<HummerObject> getAllObject() {
        return new ArrayList<>(objectMap.values());
    }

    public void clear() {
        objectMap.clear();
    }

    @Override
    public Object invoke(HummerContext hummerContext, HummerObject hummerObject, long type, long objId, long methodType, String componentName, String methodName, int argc, Object[] params) {
        switch ((int) methodType) {
            case Invoker.METHOD_TYPE_NEW:
                return onCreateInstance(type, objId, methodType, componentName, methodName, argc, params);
            case Invoker.METHOD_TYPE_INVOKE:
                return onInvoke(type, objId, methodType, componentName, methodName, argc, params);
            case Invoker.METHOD_TYPE_DELETE:
                return onDeletedInstance(type, objId, methodType, componentName, methodName, argc, params);
            default:
        }
        return null;
    }

    private Object onCreateInstance(long type, long objId, long methodType, String componentName, String methodName, int argc, Object... params) {
        Invoker invoker = invokerRegister.getInvoker(componentName);
        if (invoker != null) {
            HummerObject object = invoker.createInstance(hummerContext, params);
            object.setInvoker(invoker);
            objectMap.put(objId, object);
            object.onCreate();
        } else {
            HMLog.e("HummerNative", "onCreateInstance() not found " + componentName + "." + methodName);
        }
        return null;
    }

    private Object onInvoke(long type, long objId, long methodType, String componentName, String methodName, int argc, Object... params) {
        HummerObject object = objectMap.get(objId);
        if (object != null) {
            return invokerRegister.invoke(hummerContext, object, type, objId, methodType, componentName, methodName, argc, params);
        } else {
            HMLog.e("HummerNative", "onInvoke() not found " + componentName + methodName + ",id=" + objId);
        }
        return null;
    }

    private Object onDeletedInstance(long type, long objId, long methodType, String componentName, String methodName, int argc, Object... params) {
        HummerObject object = objectMap.remove(objId);
        if (object != null) {
            object.onDestroy();
        }
        return null;
    }


    @Override
    public Invoker getInvoker(String name) {
        return invokerRegister.getInvoker(name);
    }

    @Override
    public void registerInvoker(Invoker invoker) {
        invokerRegister.registerInvoker(invoker);
    }
}
