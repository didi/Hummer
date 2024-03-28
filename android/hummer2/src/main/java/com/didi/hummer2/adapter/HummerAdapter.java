package com.didi.hummer2.adapter;

import com.didi.hummer2.adapter.http.IHttpAdapter;
import com.didi.hummer2.adapter.http.impl.DefaultHttpAdapter;

/**
 * didi Create on 2024/3/21 .
 * <p>
 * Copyright (c) 2024/3/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/21 4:38 PM
 * @Description 用一句话说明文件功能
 */

public class HummerAdapter {

    public static IHttpAdapter getHttpAdapter() {
        return new DefaultHttpAdapter();
    }

}
