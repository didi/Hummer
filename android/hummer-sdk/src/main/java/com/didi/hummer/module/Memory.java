package com.didi.hummer.module;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.context.HummerContext;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 存储组件
 *
 * Created by XiaoFeng on 2019-07-24.
 */
@Component("Memory")
public class Memory {

    private static Map<String, Map<String, Object>> memoryStoreMap = new ConcurrentHashMap<>();

    public static Map<String, Object> getAll(HummerContext context) {
        return memoryStoreMap.get(context.getNamespace());
    }

    @JsMethod("set")
    public static void set(HummerContext context, String key, Object value) {
        Map<String, Object> memoryStore = memoryStoreMap.get(context.getNamespace());
        if (memoryStore == null) {
            memoryStore = new ConcurrentHashMap<>();
            memoryStoreMap.put(context.getNamespace(), memoryStore);
        }
        memoryStore.put(key, value);
    }

    @JsMethod("get")
    public static Object get(HummerContext context, String key) {
        Map<String, Object> memoryStore = memoryStoreMap.get(context.getNamespace());
        if (memoryStore == null) {
            return null;
        }
        return memoryStore.get(key);
    }

    @JsMethod("remove")
    public static void remove(HummerContext context, String key) {
        Map<String, Object> memoryStore = memoryStoreMap.get(context.getNamespace());
        if (memoryStore == null) {
            return;
        }
        memoryStore.remove(key);
    }

    @JsMethod("exist")
    public static boolean exist(HummerContext context, String key) {
        Map<String, Object> memoryStore = memoryStoreMap.get(context.getNamespace());
        if (memoryStore == null) {
            return false;
        }
        return memoryStore.containsKey(key);
    }
}
