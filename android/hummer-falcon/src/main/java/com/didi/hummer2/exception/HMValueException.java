package com.didi.hummer2.exception;

/**
 * didi Create on 2024/3/20 .
 * <p>
 * Copyright (c) 2024/3/20 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/20 5:44 PM
 * @Description 用一句话说明文件功能
 */

public class HMValueException extends RuntimeException {

    public HMValueException(String message) {
        super(message);
    }

    public HMValueException(String message, Throwable cause) {
        super(message, cause);
    }

    public HMValueException(Throwable cause) {
        super(cause);
    }

    public HMValueException() {
    }
}
