package com.didi.hummer.devtools.bean;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.text.SimpleDateFormat;

/**
 * @author: linjizong
 * @date: 2020-04-20
 * @desc:
 */
public class LogBean implements Serializable {

    public static final int LEVEL_LOG = 1;
    public static final int LEVEL_DEBUG = 2;
    public static final int LEVEL_INFO = 3;
    public static final int LEVEL_WARN = 4;
    public static final int LEVEL_ERROR = 5;
    public static final int LEVEL_EXCEPTION = 6;

    @SerializedName("level")
    private int level;
    @SerializedName("message")
    private String msg;

    // 序列化时忽略该字段
    private transient String rawMsg;
    // 序列化时忽略该字段
    private transient long timestamp;

    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("HH:mm:ss");

    public LogBean(int level, String msg) {
        this.level = level;
        this.rawMsg = msg;
        this.timestamp = System.currentTimeMillis();

        String time = DATE_FORMAT.format(timestamp) + "." + (timestamp % 1000);
        this.msg = String.format("[%s] %s", time, msg);
    }

    public int getLevel() {
        return level;
    }

    public String getMsg() {
        return msg;
    }

    public String getRawMsg() {
        return rawMsg;
    }
}
