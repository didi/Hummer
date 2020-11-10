package com.didi.hummer.devtools.bean;

/**
 * @author: linjizong
 * @date: 2020-04-20
 * @desc:
 */
public class LogBean {
    public static final int TYPE_LOG = 1;
    public static final int TYPE_DEBUG = 2;
    public static final int TYPE_INFO = 3;
    public static final int TYPE_WARN = 4;
    public static final int TYPE_ERROR = 5;
    public static final int TYPE_EXCEPTION = 6;

    public final int type;
    public final String msg;
    public final long timestamp;

    public LogBean(int type, String msg) {
        this.type = type;
        this.msg = msg;
        this.timestamp = System.currentTimeMillis();
    }
}
