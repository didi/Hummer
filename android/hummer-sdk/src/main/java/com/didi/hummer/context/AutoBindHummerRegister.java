package com.didi.hummer.context;

import android.text.TextUtils;

import com.didi.hummer.core.util.DebugUtil;
import com.didi.hummer.core.util.HMLog;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.ServiceLoader;

/**
 * didi Create on 2023/3/15 .
 * <p>
 * Copyright (c) 2023/3/15 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/3/15 8:24 下午
 * @Description 用于自动注册Hummer组件 自动发现 HummerModuleRegister ，需要配合注解处理器同时工作
 */

public class AutoBindHummerRegister implements HummerRegister {

    private final Map<String, HummerModuleRegister> hummerRegisterMap = new HashMap<>();
    private boolean isLoad = false;


    private AutoBindHummerRegister() {
        //load();
    }

    private synchronized void load() {
        if (!isLoad) {
            long start = System.nanoTime();
            ServiceLoader<HummerModuleRegister> loader = ServiceLoader.load(HummerModuleRegister.class, getClass().getClassLoader());
            Iterator<HummerModuleRegister> iterator = loader.iterator();

            while (iterator.hasNext()) {
                HummerModuleRegister register = iterator.next();
                if (TextUtils.equals(register.getModuleName(), "com.didi.hummer.register.HummerRegister$$hummer_sdk")
                        || TextUtils.equals(register.getModuleName(), "com.didi.hummer.register.HummerRegister$$hummer_component")) {
                    continue;
                }
                hummerRegisterMap.put(register.getModuleName(), register);
            }
            isLoad = true;
            if (DebugUtil.isDebuggable()) {
                HMLog.i("HummerNative", "AutoBindHummerRegister.load() use time is " + (System.nanoTime() - start));
            }
        }
    }

    @Override
    public void register(HummerContext hummerContext) {
        if (!isLoad) {
            load();
        }
        Iterator<HummerModuleRegister> iterator = hummerRegisterMap.values().iterator();
        while (iterator.hasNext()) {
            HummerModuleRegister register = iterator.next();
            register.register(hummerContext);
        }
    }

    public static AutoBindHummerRegister instance() {
        return REGISTER;
    }


    private static final AutoBindHummerRegister REGISTER = new AutoBindHummerRegister();
}
