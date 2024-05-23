package com.didi.hummer2.module;

import com.didi.hummer2.invoke.Invoker;
import com.didi.hummer2.register.HummerObject;

/**
 * didi Create on 2024/4/2 .
 * <p>
 * Copyright (c) 2024/4/2 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/2 4:09 PM
 * @Description 抽象Hummer实体类型
 */

public abstract class AbsHummerObject implements HummerObject {

    private Invoker invoker;

    private long objectId = 0;

    @Override
    public long getObjectId() {
        return objectId;
    }

    @Override
    public void setObjectId(long objectId) {
        this.objectId = objectId;
    }

    @Override
    public Invoker getInvoker() {
        return invoker;
    }

    @Override
    public void setInvoker(Invoker invoker) {
        this.invoker = invoker;
    }

    @Override
    public void onCreate() {

    }

    @Override
    public void onDestroy() {

    }
}
