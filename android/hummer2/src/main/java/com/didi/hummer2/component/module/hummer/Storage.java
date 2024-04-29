package com.didi.hummer2.component.module.hummer;


import com.didi.hummer2.HummerContext;
import com.didi.hummer2.HummerScriptContext;
import com.didi.hummer2.annotationx.Component;
import com.didi.hummer2.annotationx.JsMethod;

import java.util.List;
import java.util.Map;

/**
 * 存储组件
 * <p>
 * Created by XiaoFeng on 2019-07-24.
 */
@Component("Storage")
public class Storage {

    @JsMethod("set")
    public static void set(HummerContext context, String key, String value) {
        set0(context, key, value);
    }

    @JsMethod("get")
    public static Object get(HummerContext context, String key) {
        return get0(context, key);
    }

    @JsMethod("remove")
    public static void remove(HummerContext context, String key) {
        remove0(context, key);
    }

    @JsMethod("removeAll")
    public static void removeAll(HummerContext context) {
        removeAll0(context);
    }

    @JsMethod("getAll")
    public static Map<String, Object> getAll(HummerContext context) {
        return getAll0(context);
    }

    @JsMethod("allKeys")
    public static List<String> allKeys(HummerContext context) {
        return allKeys0(context);
    }

    @JsMethod("exist")
    public static boolean exist(HummerContext context, String key) {
        return exist0(context, key);
    }

    public static void set0(HummerContext context, String key, String value) {
        ((HummerScriptContext) context).getHummerConfig().getStorageAdapter().set(key, value);
    }

    public static Object get0(HummerContext context, String key) {
        return ((HummerScriptContext) context).getHummerConfig().getStorageAdapter().get(key);
    }

    public static void remove0(HummerContext context, String key) {
        ((HummerScriptContext) context).getHummerConfig().getStorageAdapter().remove(key);
    }

    public static void removeAll0(HummerContext context) {
        ((HummerScriptContext) context).getHummerConfig().getStorageAdapter().removeAll();
    }

    public static Map<String, Object> getAll0(HummerContext context) {
        return ((HummerScriptContext) context).getHummerConfig().getStorageAdapter().getAll();
    }

    public static List<String> allKeys0(HummerContext context) {
        return ((HummerScriptContext) context).getHummerConfig().getStorageAdapter().allKeys();
    }

    public static boolean exist0(HummerContext context, String key) {
        return ((HummerScriptContext) context).getHummerConfig().getStorageAdapter().exist(key);
    }
}
