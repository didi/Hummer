package com.didi.hummer.utils;

import android.text.TextUtils;

/**
 * Created by XiaoFeng on 2020/3/31.
 */
public class JsSourceUtil {

    /**
     * js文件源的前缀
     */
    public static final String JS_SOURCE_PREFIX_ASSETS = "assets:///";
    public static final String JS_SOURCE_PREFIX_FILE = "file:///";
    public static final String JS_SOURCE_PREFIX_HTTP = "http";

    /**
     * js文件源的类型定义
     */
    public static final int JS_SOURCE_TYPE_UNKNOWN = 0; // Unknown
    public static final int JS_SOURCE_TYPE_ASSETS = 1; // Assets文件
    public static final int JS_SOURCE_TYPE_FILE = 2;  // 本地缓存文件
    public static final int JS_SOURCE_TYPE_HTTP = 3;   // 网络文件

    /**
     * 获取js文件源的类型
     */
    public static int getJsSourceType(String jsSourcePath) {
        if (TextUtils.isEmpty(jsSourcePath)) {
            return JS_SOURCE_TYPE_UNKNOWN;
        }

        jsSourcePath = jsSourcePath.toLowerCase();
        if (jsSourcePath.startsWith(JS_SOURCE_PREFIX_ASSETS)) {
            return JS_SOURCE_TYPE_ASSETS;
        } else if (jsSourcePath.startsWith(JS_SOURCE_PREFIX_FILE)) {
            return JS_SOURCE_TYPE_FILE;
        } else if (jsSourcePath.startsWith(JS_SOURCE_PREFIX_HTTP)) {
            return JS_SOURCE_TYPE_HTTP;
        }

        return JS_SOURCE_TYPE_UNKNOWN;
    }

    /**
     * 获取js文件源的根目录
     *
     * 网络：http(s)://xxx/xxxx.js
     * 本地缓存：file:///data/data/xxx/files/JsBundles/xxx.js
     * Assets：assets:///xxx/xxx.js
     */
    public static String getJsSourceDir(String jsSourcePath) {
        if (TextUtils.isEmpty(jsSourcePath)) {
            return "";
        }

        int lastIndex = jsSourcePath.lastIndexOf("/");
        if (lastIndex < 0) {
            return "";
        }

        return jsSourcePath.substring(0, lastIndex + 1);
    }

    /**
     * 根据相对路径获取真实的资源路径
     *
     * 网络：http(s)://xxx/xxxx.png
     * 本地缓存：/data/data/xxx/files/JsBundles/xxx.png
     * Assets：xxx/xxx.png
     */

    public static String getRealResourcePath(String relativePath, String jsSourcePath) {
        if (TextUtils.isEmpty(relativePath) || TextUtils.isEmpty(jsSourcePath)) {
            return relativePath;
        }

        // 如果不是相对路径
        if (!relativePath.startsWith("./")) {
            return relativePath;
        }

        String jsSourceDir = getJsSourceDir(jsSourcePath);
        if (TextUtils.isEmpty(jsSourceDir)) {
            return relativePath;
        }

        String realPath = relativePath.substring(2);
        int jsSourceType = getJsSourceType(jsSourcePath);
        switch (jsSourceType) {
            case JS_SOURCE_TYPE_ASSETS:
                jsSourceDir = jsSourceDir.substring(JS_SOURCE_PREFIX_ASSETS.length());
                realPath = jsSourceDir + realPath;
                break;
            case JS_SOURCE_TYPE_FILE:
                jsSourceDir = jsSourceDir.substring(JS_SOURCE_PREFIX_FILE.length() - 1);
                realPath = jsSourceDir + realPath;
                break;
            case JS_SOURCE_TYPE_HTTP:
                realPath = jsSourceDir + realPath;
            default:
                break;
        }
        return realPath;
    }
}
