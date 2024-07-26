package com.didi.hummer2.bridge.convert;

import com.didi.hummer2.utils.F4NDebugUtil;
import com.didi.hummer2.utils.HMLog;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.ServiceLoader;

/**
 * didi Create on 2024/7/2 .
 * <p>
 * Copyright (c) 2024/7/2 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/2 4:45 PM
 * @Description JsiValue 与Java模型转换解析
 */

public final class HummerJsiValueAdapterLoader {

    private static final HummerJsiValueAdapterLoader INSTANCE = new HummerJsiValueAdapterLoader();

    private final Map<String, JsiValueAdapterRegister> valueParserMap = new HashMap<>();
    private boolean isLoad = false;
    private final HummerJsiValueRegister jsiValueRegister = new HummerJsiValueRegister();

    private HummerJsiValueAdapterLoader() {
    }

    public static HummerJsiValueAdapterLoader instance() {
        return INSTANCE;
    }

    private synchronized void load() {
        if (!isLoad) {
            long start = System.nanoTime();
            ServiceLoader<JsiValueAdapterRegister> loader = ServiceLoader.load(JsiValueAdapterRegister.class, getClass().getClassLoader());
            Iterator<JsiValueAdapterRegister> iterator = loader.iterator();

            while (iterator.hasNext()) {
                JsiValueAdapterRegister register = iterator.next();
                register.register(jsiValueRegister);
                valueParserMap.put(register.getClass().getSimpleName(), register);

            }
            isLoad = true;
            if (F4NDebugUtil.isDebuggable()) {
                HMLog.i("HummerNative", "HummerJsiValueParser.load() use time is " + (System.nanoTime() - start));
            }
        }
    }


    public void register(JsiValueAdapter parser) {
        jsiValueRegister.register(parser);
    }

    public HummerJsiValueRegister getJsiValueRegister() {
        load();
        return jsiValueRegister;
    }


}
