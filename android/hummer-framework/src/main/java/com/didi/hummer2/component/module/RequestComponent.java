package com.didi.hummer2.component.module;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMAttribute;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.bridge.JsiFunction;
import com.didi.hummer2.component.Component;
import com.didi.hummer2.component.EventListenerCallback;
import com.didi.hummer2.component.module.hummer.Request;

import java.util.Map;

/**
 * didi Create on 2024/4/10 .
 * <p>
 * Copyright (c) 2024/4/10 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/10 3:40 PM
 * @Description Request
 */

@HMComponent("Request")
public class RequestComponent extends Component {

    private Request delegate;

    public RequestComponent(HummerContext hummerContext) {
        super(hummerContext);
        delegate = new Request(hummerContext);
    }

    @HMAttribute("url")
    public String url;

    @HMMethod("setUrl")
    public void setUrl(String url) {
        this.url = url;
        delegate.setUrl(url);
    }

    @HMAttribute("method")
    public String method;

    @HMMethod("setMethod")
    public void setMethod(String method) {
        this.method = method;
        delegate.setMethod(method);
    }

    @HMAttribute("timeout")
    public int timeout;

    @HMMethod("setTimeout")
    public void setTimeout(int timeout) {
        this.timeout = timeout;
        delegate.timeout = timeout;
    }

    @HMAttribute("header")
    public Map<String, Object> header;

    @HMMethod("setHeader")
    public void setHeader(Map<String, Object> header) {
        this.header = header;
        delegate.header = header;
    }

    @HMAttribute("param")
    public Map<String, Object> param;

    @HMMethod("setParam")
    public void setParam(Map<String, Object> param) {
        this.param = param;
        delegate.param = param;
    }

    /**
     * 发起网络请求
     *
     * @param func 回调
     */
    @HMMethod("send")
    public void send(JsiFunction func) {
        delegate.send(new EventListenerCallback(func));
    }

    @Override
    public void onCreate() {
        super.onCreate();
        delegate.onCreate();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        delegate.onDestroy();
    }
}
