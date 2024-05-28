package com.didi.hummer2.module;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.HummerScriptContext;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;

import java.util.List;
import java.util.Map;

/**
 * didi Create on 2024/4/10 .
 * <p>
 * Copyright (c) 2024/4/10 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/10 3:40 PM
 * @Description Memory
 */

@HMComponent("Memory")
public class MemoryComponent extends Component {

    public MemoryComponent(HummerContext hummerContext) {
        super(hummerContext);
    }

    @HMMethod("set")
    public void set(HummerContext context, String key, Object value) {
        ((HummerScriptContext) context).getHummerConfig().getMemoryAdapter().set(key, value);
    }

    @HMMethod("get")
    public Object get(HummerContext context, String key) {
        return ((HummerScriptContext) context).getHummerConfig().getMemoryAdapter().get(key);
    }

    @HMMethod("remove")
    public void remove(HummerContext context, String key) {
        ((HummerScriptContext) context).getHummerConfig().getMemoryAdapter().remove(key);
    }

    @HMMethod("removeAll")
    public void removeAll(HummerContext context) {
        ((HummerScriptContext) context).getHummerConfig().getMemoryAdapter().removeAll();
    }

    @HMMethod("getAll")
    public Map<String, Object> getAll(HummerContext context) {
        return ((HummerScriptContext) context).getHummerConfig().getMemoryAdapter().getAll();
    }

    @HMMethod("allKeys")
    public List<String> allKeys(HummerContext context) {
        return ((HummerScriptContext) context).getHummerConfig().getMemoryAdapter().allKeys();
    }

    @HMMethod("exist")
    public boolean exist(HummerContext context, String key) {
        return ((HummerScriptContext) context).getHummerConfig().getMemoryAdapter().exist(key);
    }
}