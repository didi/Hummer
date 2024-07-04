package com.didi.hummer2.test.convert;

import java.util.Map;

/**
 * didi Create on 2024/7/2 .
 * <p>
 * Copyright (c) 2024/7/2 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/2 9:23 PM
 * @Description 用一句话说明文件功能
 */

public class Request<T,W> extends Data {

    public String url;
    public Map<String, String> headers;

    public T data;
    public W web;


    public class ViewMoX {
        public String key;
    }

}
