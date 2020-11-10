package com.didi.hummer.module;

import com.didi.hummer.adapter.HummerAdapter;
import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.context.HummerContext;

/**
 * 存储组件
 *
 * Created by XiaoFeng on 2019-07-24.
 */
@Component("Storage")
public class Storage {

    @JsMethod("set")
    public static void set(HummerContext context, String key, String value) {
        HummerAdapter.getStorageAdapter(context.getNamespace()).set(key, value);
    }

    @JsMethod("get")
    public static Object get(HummerContext context, String key) {
        return HummerAdapter.getStorageAdapter(context.getNamespace()).get(key);
    }

    @JsMethod("remove")
    public static void remove(HummerContext context, String key) {
        HummerAdapter.getStorageAdapter(context.getNamespace()).remove(key);
    }

    @JsMethod("exist")
    public static boolean exist(HummerContext context, String key) {
        return HummerAdapter.getStorageAdapter(context.getNamespace()).exist(key);
    }
}
