package com.didi.hummer2.adapter.http;

/**
 * didi Create on 2024/3/21 .
 * <p>
 * Copyright (c) 2024/3/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/21 4:03 PM
 * @Description 用一句话说明文件功能
 */

public interface HttpCallback<T> {

    void onResult(HttpResponse<T> response);
}
