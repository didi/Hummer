package com.didi.hummer.devtools.ws;

import java.io.Serializable;

/**
 * 通过WebSocket发送给CLI的数据格式
 * {
 *   type: 'log',
 *   data: {
 *      level: '', // Log Level：log 1, debug 2, info 3, warn 4, error 5
 *      message: '' // Log Message
 *   }
 * }
 *
 * Created by XiaoFeng on 2021/4/22.
 */
public class WSMsg<T> implements Serializable {

    public static final String TYPE_LOG = "log";

    private String type;
    private T data;

    public WSMsg(String type, T data) {
        this.type = type;
        this.data = data;
    }

    public String getType() {
        return type;
    }

    public T getData() {
        return data;
    }
}
