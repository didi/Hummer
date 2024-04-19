package com.didi.hummer2.exception;

/**
 * didi Create on 2023/3/20 .
 * <p>
 * Copyright (c) 2023/3/20 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/3/20 4:04 下午
 * @Description JS 线程异常
 */

public class JSThreadCallException extends RuntimeException {

    public JSThreadCallException() {
    }

    public JSThreadCallException(String message) {
        super(message);
    }

    public JSThreadCallException(String message, Throwable cause) {
        super(message, cause);
    }

    public JSThreadCallException(Throwable cause) {
        super(cause);
    }
}
