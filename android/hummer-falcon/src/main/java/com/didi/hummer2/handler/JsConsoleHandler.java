package com.didi.hummer2.handler;

import com.didi.hummer2.log.Logger;

/**
 * didi Create on 2024/3/21 .
 * <p>
 * Copyright (c) 2024/3/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/21 11:24 AM
 * @Description jsConsole日志处理器
 */

public interface JsConsoleHandler {


    /**
     * 打印日志
     *
     * @param namespace 命名空间
     * @param level     {@link Logger#WARN}
     * @param message   消息
     */
    void printLog(String namespace, int level, String message);
}
