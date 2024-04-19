package com.didi.hummer2.bridge;

/**
 * didi Create on 2023/11/21 .
 * <p>
 * Copyright (c) 2023/11/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/21 6:28 下午
 * @Description 用一句话说明文件功能
 */

public interface IArray {
    int length();

    JsiValue getValue(int index);

    boolean setValue(int index, JsiValue value);

    void push(JsiValue value);

    void pop();

    JsiValue removeAt(int index);

    JsiValue remove(JsiValue value);

    void clear();

}
