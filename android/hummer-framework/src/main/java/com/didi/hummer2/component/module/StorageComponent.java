package com.didi.hummer2.component.module;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.component.Component;
import com.didi.hummer2.component.module.hummer.Storage;

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
 * @Description Storage
 */

@HMComponent("Storage")
public class StorageComponent extends Component {

    public StorageComponent(HummerContext hummerContext) {
        super(hummerContext);
    }

    @HMMethod("set")
    public void set(HummerContext context, String key, String value) {
        Storage.set(context, key, value);
    }

    @HMMethod("get")
    public Object get(HummerContext context, String key) {
        return Storage.get(context, key);
    }

    @HMMethod("remove")
    public void remove(HummerContext context, String key) {
        Storage.remove(context, key);
    }

    @HMMethod("removeAll")
    public void removeAll(HummerContext context) {
        Storage.removeAll(context);
    }

    @HMMethod("getAll")
    public Map<String, Object> getAll(HummerContext context) {
        return Storage.getAll(context);
    }

    @HMMethod("allKeys")
    public List<String> allKeys(HummerContext context) {
        return Storage.allKeys(context);
    }

    @HMMethod("exist")
    public boolean exist(HummerContext context, String key) {
        return Storage.exist(context, key);
    }
}
