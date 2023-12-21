package com.didi.hummer2.bridge;

/**
 * didi Create on 2023/11/21 .
 * <p>
 * Copyright (c) 2023/11/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/21 6:18 下午
 * @Description Hummer 值对象，与Hummer交互的数据基本类型，其他类型均为其子类型
 */

public interface IValue {

    long getIdentify();

    boolean isNull();

    boolean isBoolean();

    boolean isNumber();

    boolean isString();

    boolean isArray();

    boolean isObject();

//    暂不支持传递方法
//    boolean isFunction();

    /**
     * 引用计数+1
     */
    void protect();

    /**
     * 引用计数-1
     */
    void unprotect();
}
