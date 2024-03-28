package com.didi.hummer2.core;

import com.didi.hummer2.core.invoke.Invoker;

/**
 * didi Create on 2024/3/27 .
 * <p>
 * Copyright (c) 2024/3/27 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/27 2:36 PM
 * @Description 基础组件需要具备的接口
 */

public interface HummerObject {

    Invoker getInvoker();

    void setInvoker(Invoker invoker);

    void onCreate();

    void onDestroy();
}
