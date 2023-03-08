package com.didi.hummer.core.debug;

import android.text.TextUtils;

import com.didi.hummer.core.util.DebugUtil;
import com.didi.hummer.core.util.HMLog;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * didi Create on 2023/3/7 .
 * <p>
 * Copyright (c) 2023/3/7 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/3/7 3:27 下午
 * @Description 用于配置按 namespace配置 debug开关
 */

public class DebugConfig {

    private final Map<String, Debuggable> configs = new HashMap<>();

    private DebugConfig() {
        // no op
    }


    public boolean isDebuggable(String namespace) {
        Debuggable debuggable = configs.get(namespace);
        if (debuggable != null) {
            return debuggable.isDebuggable();
        }
        return true;
    }

    public void setDebuggable(String namespace, boolean debuggable) {
        setDebuggable(new Debuggable(namespace, debuggable));
    }

    public void setDebuggable(Debuggable debuggable) {
        String namespace = debuggable.getNamespace();
        // 如果configs中不存在namespace对应的config，或者存在一个sdk默认设置的config，那么可以覆盖掉
        Debuggable tempDebug = configs.get(namespace);
        if (tempDebug == null || TextUtils.isEmpty(tempDebug.getNamespace())) {
            configs.put(namespace, debuggable);
        } else {
            if (DebugUtil.isDebuggable()) {
                HMLog.w("HummerNative", "There is already a duplicate namespace: " + namespace);
            }
        }
    }

    public static DebugConfig getInstance() {
        return mHolder;
    }

    private static DebugConfig mHolder = new DebugConfig();
}
