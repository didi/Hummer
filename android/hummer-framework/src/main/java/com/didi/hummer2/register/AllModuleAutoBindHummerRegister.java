package com.didi.hummer2.register;


import com.didi.hummer2.utils.F4NDebugUtil;
import com.didi.hummer2.utils.HMLog;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.ServiceLoader;

/**
 * didi Create on 2024/3/21 .
 * <p>
 * Copyright (c) 2024/3/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/21 5:07 PM
 * @Description 用于自动注册Hummer组件 自动发现 HummerRegister ，需要配合注解处理器同时工作
 */

public class AllModuleAutoBindHummerRegister implements HummerRegister {

    private static final AllModuleAutoBindHummerRegister INSTANCE = new AllModuleAutoBindHummerRegister();

    private final Map<String, HummerRegister> hummerRegisterMap = new HashMap<>();
    private boolean isLoad = false;

    public static HummerRegister instance() {
        return INSTANCE;
    }


    private synchronized void load() {
        if (!isLoad) {
            long start = System.nanoTime();
            ServiceLoader<HummerRegister> loader = ServiceLoader.load(HummerRegister.class, getClass().getClassLoader());
            Iterator<HummerRegister> iterator = loader.iterator();

            while (iterator.hasNext()) {
                HummerRegister register = iterator.next();
                hummerRegisterMap.put(register.getClass().getSimpleName(), register);
            }
            isLoad = true;
            if (F4NDebugUtil.isDebuggable()) {
                HMLog.i("HummerNative", "AutoBindHummerRegister.load() use time is " + (System.nanoTime() - start));
            }
        }
    }


    @Override
    public void register(InvokerRegister invokerRegister) {
        if (!isLoad) {
            load();
        }
        Iterator<HummerRegister> iterator = hummerRegisterMap.values().iterator();

        while (iterator.hasNext()) {
            HummerRegister register = iterator.next();
            register.register(invokerRegister);
            if (F4NDebugUtil.isDebuggable()) {
                HMLog.i("HummerNative", "AutoBindHummerRegister.register() moduleName=" + register.getClass().getSimpleName());
            }
        }
    }
}
