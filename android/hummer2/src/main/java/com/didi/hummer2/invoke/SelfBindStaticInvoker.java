package com.didi.hummer2.invoke;

import com.didi.hummer2.register.HummerObject;

/**
 * didi Create on 2024/4/7 .
 * <p>
 * Copyright (c) 2024/4/7 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/7 5:02 PM
 * @Description 不绑定实例
 */

public abstract class SelfBindStaticInvoker<T extends HummerObject> extends AbsInvoker<T> implements HummerObject {


    private long objectId = 0;

    @Override
    public Invoker getInvoker() {
        return this;
    }

    @Override
    public void setInvoker(Invoker invoker) {

    }

    @Override
    public long getObjectId() {
        return objectId;
    }

    @Override
    public void setObjectId(long objectId) {
        this.objectId = objectId;
    }


    @Override
    public void onCreate() {

    }

    @Override
    public void onDestroy() {

    }
}
