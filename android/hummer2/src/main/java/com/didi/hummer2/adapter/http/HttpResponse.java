package com.didi.hummer2.adapter.http;

import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.utils.HMGsonUtil;

import java.io.Serializable;
import java.util.Map;

/**
 * Created by XiaoFeng on 2019-10-21.
 */
public class HttpResponse<T> implements Serializable {

    public int status;

    public String message;

    public Map<String, String> header;

    public T data;

    public Error error = new Error(0, null);


    public JsiObject toJsiValue() {
        JsiObject jsiObject = new JsiObject();
        jsiObject.put("status", new JsiNumber(status));
        if (error != null) {
            jsiObject.put("error", error.toJsiValue());
        }
        if (message != null) {
            jsiObject.put("message", new JsiString(message));
        }
        if (data != null) {
            jsiObject.put("data", new JsiString(HMGsonUtil.toJson(data)));
        }
        if (header != null) {
            JsiObject headers = new JsiObject();
            for (Map.Entry<String, String> entry : header.entrySet()) {
                headers.put(entry.getKey(), new JsiString(entry.getValue()));
            }
            jsiObject.put("header", headers);
        }
        return jsiObject;
    }

    public static class Error implements Serializable {

        public int code;
        public String msg;

        public Error(int code, String msg) {
            this.code = code;
            this.msg = msg;
        }

        @Override
        public String toString() {
            return "Error{" + "code=" + code + ", msg='" + msg + '\'' + '}';
        }

        public JsiObject toJsiValue() {
            JsiObject jsiObject = new JsiObject();
            jsiObject.put("code", new JsiNumber(code));
            jsiObject.put("msg", new JsiString(msg == null ? "" : msg));
            return jsiObject;
        }
    }
}
