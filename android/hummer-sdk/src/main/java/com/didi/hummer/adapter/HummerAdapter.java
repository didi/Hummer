package com.didi.hummer.adapter;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.adapter.http.IHttpAdapter;
import com.didi.hummer.adapter.imageloader.IImageLoaderAdapter;
import com.didi.hummer.adapter.location.ILocationAdapter;
import com.didi.hummer.adapter.navigator.INavigatorAdapter;
import com.didi.hummer.adapter.scriptloader.IScriptLoaderAdapter;
import com.didi.hummer.adapter.storage.IStorageAdapter;
import com.didi.hummer.adapter.websocket.IWebSocketAdapter;

/**
 * 全局适配器调度类
 *
 * Created by XiaoFeng on 2019-12-24.
 */
public class HummerAdapter {

    public static IHttpAdapter getHttpAdapter() {
        return getHttpAdapter(null);
    }

    public static IHttpAdapter getHttpAdapter(String namespace) {
        return HummerSDK.getHummerConfig(namespace).getHttpAdapter();
    }

    public static IWebSocketAdapter getWebSocketAdapter() {
        return getWebSocketAdapter(null);
    }

    public static IWebSocketAdapter getWebSocketAdapter(String namespace) {
        return HummerSDK.getHummerConfig(namespace).getWebSocketAdapter();
    }

    public static IImageLoaderAdapter getImageLoaderAdapter() {
        return getImageLoaderAdapter(null);
    }

    public static IImageLoaderAdapter getImageLoaderAdapter(String namespace) {
        return HummerSDK.getHummerConfig(namespace).getImageLoaderAdapter();
    }

    public static IStorageAdapter getStorageAdapter() {
        return getStorageAdapter(null);
    }

    public static IStorageAdapter getStorageAdapter(String namespace) {
        return HummerSDK.getHummerConfig(namespace).getStorageAdapter();
    }

    public static ILocationAdapter getLocationAdapter() {
        return getLocationAdapter(null);
    }

    public static ILocationAdapter getLocationAdapter(String namespace) {
        return HummerSDK.getHummerConfig(namespace).getLocationAdapter();
    }

    public static INavigatorAdapter getNavigatorAdapter() {
        return getNavigatorAdapter(null);
    }

    public static INavigatorAdapter getNavigatorAdapter(String namespace) {
        return HummerSDK.getHummerConfig(namespace).getNavAdapter();
    }

    public static IScriptLoaderAdapter getScriptLoaderAdapter() {
        return getScriptLoaderAdapter(null);
    }

    public static IScriptLoaderAdapter getScriptLoaderAdapter(String namespace) {
        return HummerSDK.getHummerConfig(namespace).getScriptLoaderAdapter();
    }
}
