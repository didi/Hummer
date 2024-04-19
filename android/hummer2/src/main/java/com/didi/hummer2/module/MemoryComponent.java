package com.didi.hummer2.module;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.component.Component;
import com.didi.hummer2.module.hummer.Memory;

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

    public MemoryComponent() {

    }

    @HMMethod("set")
    public void set(HummerContext context, String key, Object value) {
        Memory.set(context, key, value);
    }

    @HMMethod("get")
    public Object get(HummerContext context, String key) {
        return Memory.get(context, key);
    }

    @HMMethod("remove")
    public void remove(HummerContext context, String key) {
        Memory.remove(context, key);
    }

    @HMMethod("removeAll")
    public void removeAll(HummerContext context) {
        Memory.removeAll(context);
    }

    @HMMethod("getAll")
    public Map<String, Object> getAll(HummerContext context) {
        return Memory.getAll(context);
    }

    @HMMethod("allKeys")
    public List<String> allKeys(HummerContext context) {
        return Memory.allKeys(context);
    }

    @HMMethod("exist")
    public boolean exist(HummerContext context, String key) {
        return Memory.exist(context, key);
    }
}
