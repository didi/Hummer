package com.didi.hummer.utils;

import com.didi.hummer.adapter.HummerAdapter;
import com.didi.hummer.adapter.http.HttpCallback;
import com.didi.hummer.adapter.http.IHttpAdapter;

import java.lang.reflect.Type;

/**
 * Created by XiaoFeng on 2019-10-21.
 */
public class NetworkUtil {

    public static <T> void httpGet(String url, HttpCallback<T> callback) {
        HummerAdapter.getHttpAdapter().request(url, IHttpAdapter.METHOD_GET, 10000, null, null, callback, null);
    }

    public static <T> void httpGet(String url, HttpCallback<T> callback, Type type) {
        HummerAdapter.getHttpAdapter().request(url, IHttpAdapter.METHOD_GET, 10000, null, null, callback, type);
    }
}
