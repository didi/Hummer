package com.didi.hummer.module;

import android.text.TextUtils;

import com.didi.hummer.adapter.HummerAdapter;
import com.didi.hummer.adapter.http.IHttpAdapter;
import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.lifecycle.ILifeCycle;

import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * 网络请求组件
 *
 * Created by XiaoFeng on 2019-07-24.
 */
@Component("Request")
public class Request implements ILifeCycle {

    @JsProperty("url")
    public String url;

    @JsProperty("method")
    public String method;

    @JsProperty("timeout")
    public int timeout;

    @JsProperty("header")
    public Map<String, Object> header;

    @JsProperty("param")
    public Map<String, Object> param;

    private JSValue jsValue;
    private IHttpAdapter httpAdapter;

    private AtomicBoolean isDestroyed = new AtomicBoolean(false);

    public Request(HummerContext context, JSValue jsValue) {
        this.method = "POST";
        this.timeout = 10000;//单位：毫秒
        this.url = "";
        this.jsValue = jsValue;

        httpAdapter = HummerAdapter.getHttpAdapter(context.getNamespace());
    }

    @Override
    public void onCreate() {}

    @Override
    public void onDestroy() {
        isDestroyed.set(true);
        jsValue.unprotect();
    }

    public void setUrl(String api) {
        if (httpAdapter != null) {
            String interceptedUrl = httpAdapter.onUrlIntercept(api);
            if (!TextUtils.isEmpty(interceptedUrl)) {
                this.url = interceptedUrl;
                return;
            }
        }

        this.url = api;
    }

    public void setMethod(String method) {
        if (!TextUtils.isEmpty(method)) {
            this.method = method.toUpperCase();
        }
    }

    /**
     * 发起网络请求
     * @param func 回调
     */
    @JsMethod("send")
    public void send(JSCallback func){
        jsValue.protect();
        httpAdapter.request(url, method, timeout, header, param,
                response -> {
                    if (isDestroyed.get()) {
                        return;
                    }

                    if (func != null) {
                        func.call(response);
                        func.release();
                    }
                    jsValue.unprotect();
                }, Object.class);
    }
}
