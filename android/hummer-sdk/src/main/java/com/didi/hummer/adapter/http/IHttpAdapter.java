package com.didi.hummer.adapter.http;

import java.lang.reflect.Type;
import java.util.Map;

/**
 * 网络请求适配器接口
 */
public interface IHttpAdapter {

    String METHOD_GET = "GET";
    String METHOD_POST = "POST";
    String METHOD_HEAD = "HEAD";
    String METHOD_OPTIONS = "OPTIONS";
    String METHOD_PUT = "PUT";
    String METHOD_DELETE = "DELETE";
    String METHOD_TRACE = "TRACE";
    String METHOD_CONNECT = "CONNECT";

    /**
     * url拦截
     *
     * @param orgUrl
     * @return
     */
    String onUrlIntercept(String orgUrl);

    /**
     * 发起网络请求
     *
     * @param url       API请求路径
     * @param method    请求方式：GET或者POST(不区分大小写)
     * @param timeout   超时时间
     * @param headers   网络请求头部
     * @param params    网络请求的参数
     * @param callback  网络请求回调
     */
    <T> void request(String url, String method, int timeout, Map<String, Object> headers, Map<String, Object> params, HttpCallback<T> callback, Type type);
}
