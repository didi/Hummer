package com.didi.hummer2.falcon;

import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * didi Create on 2024/6/27 .
 * <p>
 * Copyright (c) 2024/6/27 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/6/27 5:40 PM
 * @Description 用一句话说明文件功能
 */

public class ContextCallbackManager {

    private static long lastCallbackId = 100L;

    private Map<Long, JavaScriptCallback> scriptCallbackMap = new ConcurrentHashMap<>();


    public long register(JavaScriptCallback callback) {
        if (callback != null) {
            long callbackId = ++lastCallbackId;
            scriptCallbackMap.put(callbackId, callback);
            return callbackId;
        }
        return 0;
    }

    public JavaScriptCallback unregister(long callbackId) {
        if (callbackId != 0) {
            return scriptCallbackMap.remove(callbackId);
        }
        return null;
    }

    public void unregister(JavaScriptCallback callback) {
        if (callback != null) {
            Iterator<Map.Entry<Long, JavaScriptCallback>> integer = scriptCallbackMap.entrySet().iterator();
            while (integer.hasNext()) {
                Map.Entry<Long, JavaScriptCallback> entry = integer.next();
                if (entry.getValue() == callback) {
                    integer.remove();
                }
            }
        }
    }

    public void onDestroy() {
        scriptCallbackMap.clear();
    }


}
