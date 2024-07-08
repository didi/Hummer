package com.didi.hummer2.bridge.convert;

/**
 * didi Create on 2024/7/4 .
 * <p>
 * Copyright (c) 2024/7/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/4 3:12 PM
 * @Description 用一句话说明文件功能
 */

public abstract class BaseAdapter<T> implements JsiValueAdapter<T> {

    @Override
    public Class<T> getJavaClass() {
        return null;
    }


}
