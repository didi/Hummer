package com.didi.hummer.module;

import com.didi.hummer.adapter.HummerAdapter;
import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.context.HummerContext;

import java.util.List;
import java.util.Map;

/**
 * 存储组件
 *
 * Created by XiaoFeng on 2019-07-24.
 */
@Component("Storage")
public class Storage {

    @JsMethod("set")
    public static void set(HummerContext context, String key, String value) {
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

    public static void set(String namespace, String key, String value) {
        HummerAdapter.getStorageAdapter(namespace).set(key, value);
    }

    public static Object get(String namespace, String key) {
        return HummerAdapter.getStorageAdapter(namespace).get(key);
    }

    public static void remove(String namespace, String key) {
        HummerAdapter.getStorageAdapter(namespace).remove(key);
    }

    public static void removeAll(String namespace) {
        HummerAdapter.getStorageAdapter(namespace).removeAll();
    }

    public static Map<String, Object> getAll(String namespace) {
        return HummerAdapter.getStorageAdapter(namespace).getAll();
    }

    public static List<String> allKeys(String namespace) {
        return HummerAdapter.getStorageAdapter(namespace).allKeys();
    }

    public static boolean exist(String namespace, String key) {
        return HummerAdapter.getStorageAdapter(namespace).exist(key);
    }
}
