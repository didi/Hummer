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
 * @Date 2024/3/26 6:00 PM
 * @Description 用一句话说明文件功能
 */

public interface Invoker {

    static int METHOD_TYPE_NEW = 1;
    static int METHOD_TYPE_INVOKE = 2;
    static int METHOD_TYPE_DELETE = 0;

    String getName();

    HummerObject createInstance(HummerContext hummerContext,Object... params);

    Object invoke(HummerContext hummerContext, HummerObject hummerObject, String methodName, Object... params);

}
