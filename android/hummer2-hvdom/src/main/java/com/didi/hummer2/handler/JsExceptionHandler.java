package com.didi.hummer2.handler;

/**
 * didi Create on 2024/3/21 .
 * <p>
 * Copyright (c) 2024/3/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/21 11:23 AM
 * @Description 用一句话说明文件功能
 */

public interface JsExceptionHandler {

    /**
     * 捕获到js异常
     *
     * @param namespace 命名空间
     * @param exception 异常信息
     */
    void onCatchException(String namespace, Exception exception);


}
