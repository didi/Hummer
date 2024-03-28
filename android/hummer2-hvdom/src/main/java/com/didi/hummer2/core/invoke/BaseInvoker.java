package com.didi.hummer2.core.invoke;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.core.HummerObject;

/**
 * didi Create on 2024/3/26 .
 * <p>
 * Copyright (c) 2024/3/26 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/26 6:01 PM
 * @Description 用一句话说明文件功能
 */

public abstract class BaseInvoker<T extends HummerObject> implements Invoker {


    @Override
    public HummerObject createInstance(HummerContext hummerContext, Object... params) {
        return onCreateInstance(hummerContext, params);
    }

    @Override
    public Object invoke(HummerContext hummerContext, HummerObject hummerObject, String methodName, Object... params) {
        return onInvoke(hummerContext, (T) hummerObject, methodName, params);
    }

    public abstract T onCreateInstance(HummerContext hummerContext, Object... params);

    public abstract Object onInvoke(HummerContext hummerContext, T instance, String methodName, Object... params);


}
