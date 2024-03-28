package com.didi.hummer2.handler;

/**
 * didi Create on 2024/3/21 .
 * <p>
 * Copyright (c) 2024/3/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/21 11:24 AM
 * @Description 用一句话说明文件功能
 */

public interface JsConsoleHandler {


    /**
     * 打印日志
     *
     * @param level     {@link Logger#WARN}
     * @param namespace 命名空间
     * @param message   消息
     */
    void printLog(int level, String namespace, String message);
}
