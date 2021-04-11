package com.didi.hummer.adapter.http;

import java.io.Serializable;
import java.util.Map;

/**
 * Created by XiaoFeng on 2019-10-21.
 */
public class HttpResponse<T> implements Serializable {

    public static class Error implements Serializable {

        public int code;
        public String msg;

        public Error(int code, String msg) {
            this.code = code;
            this.msg = msg;
        }
    }

    public int status;

    public String message;

    public Map<String, String> header;

    public T data;

    public Error error = new Error(0, null);
}
