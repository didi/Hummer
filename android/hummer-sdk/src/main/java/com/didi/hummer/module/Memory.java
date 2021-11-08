package com.didi.hummer.module;

import android.text.TextUtils;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.context.HummerContext;

import java.util.ArrayList;
import java.util.List;
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

    @JsMethod("getAll")
    public static Map<String, Object> getAll(HummerContext context) {
        return getAll(context.getNamespace());
    }

    @JsMethod("allKeys")
    public static List<String> allKeys(HummerContext context) {
        return allKeys(context.getNamespace());
    }

    @JsMethod("exist")
    public static boolean exist(HummerContext context, String key) {
        return exist(context.getNamespace(), key);
    }

    private static String checkNamespace(String namespace) {
        if (TextUtils.isEmpty(namespace)) {
            return HummerSDK.NAMESPACE_DEFAULT;
        }
        return namespace;
    }

    public static void set(String namespace, String key, Object value) {
        namespace = checkNamespace(namespace);
        Map<String, Object> memoryStore = memoryStoreMap.get(namespace);
        if (memoryStore == null) {
            memoryStore = new ConcurrentHashMap<>();
            memoryStoreMap.put(namespace, memoryStore);
        }
        memoryStore.put(key, value);
    }

    public static Object get(String namespace, String key) {
        namespace = checkNamespace(namespace);
        Map<String, Object> memoryStore = memoryStoreMap.get(namespace);
        if (memoryStore == null) {
            return null;
        }
        return memoryStore.get(key);
    }

    public static void remove(String namespace, String key) {
        namespace = checkNamespace(namespace);
        Map<String, Object> memoryStore = memoryStoreMap.get(namespace);
        if (memoryStore == null) {
            return;
        }
        memoryStore.remove(key);
    }

    public static void removeAll(String namespace) {
        namespace = checkNamespace(namespace);
        Map<String, Object> memoryStore = memoryStoreMap.get(namespace);
        if (memoryStore == null) {
            return;
        }
        memoryStore.clear();
    }

    public static Map<String, Object> getAll(String namespace) {
        namespace = checkNamespace(namespace);
        return memoryStoreMap.get(namespace);
    }

    public static List<String> allKeys(String namespace) {
        namespace = checkNamespace(namespace);
        return new ArrayList<>(memoryStoreMap.get(namespace).keySet());
    }

    public static boolean exist(String namespace, String key) {
        namespace = checkNamespace(namespace);
        Map<String, Object> memoryStore = memoryStoreMap.get(namespace);
        if (memoryStore == null) {
            return false;
        }
        return memoryStore.containsKey(key);
    }
}
