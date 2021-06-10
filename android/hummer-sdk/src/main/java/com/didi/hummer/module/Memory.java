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

    @JsMethod("set")
    public static void set(HummerContext context, String key, Object value) {
        set(context.getNamespace(), key, value);
    }

    @JsMethod("get")
    public static Object get(HummerContext context, String key) {
        return get(context.getNamespace(), key);
    }

    @JsMethod("remove")
    public static void remove(HummerContext context, String key) {
        remove(context.getNamespace(), key);
    }

    @JsMethod("removeAll")
    public static void removeAll(HummerContext context) {
        removeAll(context.getNamespace());
    }

    @JsMethod("exist")
    public static boolean exist(HummerContext context, String key) {
        return exist(context.getNamespace(), key);
    }

    public static void set(String namespace, String key, Object value) {
        Map<String, Object> memoryStore = memoryStoreMap.get(namespace);
        if (memoryStore == null) {
            memoryStore = new ConcurrentHashMap<>();
            memoryStoreMap.put(namespace, memoryStore);
        }
        memoryStore.put(key, value);
    }

    public static Object get(String namespace, String key) {
        Map<String, Object> memoryStore = memoryStoreMap.get(namespace);
        if (memoryStore == null) {
            return null;
        }
        return memoryStore.get(key);
    }

    public static void remove(String namespace, String key) {
        Map<String, Object> memoryStore = memoryStoreMap.get(namespace);
        if (memoryStore == null) {
            return;
        }
        memoryStore.remove(key);
    }

    public static void removeAll(String namespace) {
        Map<String, Object> memoryStore = memoryStoreMap.get(namespace);
        if (memoryStore == null) {
            return;
        }
        memoryStore.clear();
    }

    public static Map<String, Object> getAll(HummerContext context) {
        return memoryStoreMap.get(context.getNamespace());
    }

    public static boolean exist(String namespace, String key) {
        Map<String, Object> memoryStore = memoryStoreMap.get(namespace);
        if (memoryStore == null) {
            return false;
        }
        return memoryStore.containsKey(key);
    }
}
