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

    HMValue get(int index);

    boolean set(int index, HMValue value);

    void add(HMValue value);

    void add(int index, HMValue value);

    HMValue remove(int index);

    HMValue remove(HMValue value);

}
