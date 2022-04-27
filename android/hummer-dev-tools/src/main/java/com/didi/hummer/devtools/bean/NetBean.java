package com.didi.hummer.devtools.bean;

/**
 * @author: xingjingmin
 * @date: 2020-04-08
 * @desc:
 */
public class NetBean {

    private String url;
    private Object data;
    private Object error;

    public NetBean(String url, Object data, Object error) {
        this.url = url;
        this.data = data;
        this.error = error;
    }

    public String getUrl() {
        return url;
    }

    public Object getData() {
        return data;
    }

    public Object getError() {
        return error;
    }
}
