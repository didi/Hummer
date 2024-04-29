package com.didi.hummer2.register;

import com.didi.hummer2.invoke.Invoker;

/**
 * didi Create on 2024/3/27 .
 * <p>
 * Copyright (c) 2024/3/27 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/27 2:36 PM
 * @Description Hummer基础对象类型，基础组件需要具备的接口
 */

public interface HummerObject {

    Invoker getInvoker();

    void setInvoker(Invoker invoker);

    long getObjectId();

    void setObjectId(long objectId);

    void onCreate();

    void onDestroy();
}
