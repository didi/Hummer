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
     * 获取一个路径的目录
     *
     * 网络路径：http(s)://xxx/xxx.js -> http(s)://xxx/
     * Hummer路径：hummer://xxx/xxx.js -> hummer://xxx/
     * 本地缓存：file:///data/data/xxx/files/JsBundles/xxx.js -> file:///data/data/xxx/files/JsBundles/
     * Assets：assets:///xxx/xxx.js -> assets:///xxx/
     */
    public static String getPathDir(String path) {
        if (TextUtils.isEmpty(path)) {
            return "";
        }

        int lastIndex = path.lastIndexOf("/");
        if (lastIndex < 0) {
            return "";
        }

        return path.substring(0, lastIndex + 1);
    }

    /**
     * 相对路径转成绝对路径
     *
     * 有以下几种路径转换：
     * 网络路径：./xxx.js -> http(s)://x.x.x.x/xxx.js
     * Hummer路径：./xxx.js -> hummer://xxx/xxx.js
     * 本地路径：./xxx.js -> file:///data/data/xxx/files/xxx/xxx.js
     * Assets路径：./xxx.js -> assets:///xxx/xxx.js
     *
     * @param relativePath 相对路径
     * @param referAbsolutePath 作为参考的绝对路径
     * @return 转换后的绝对路径
     */
    public static String relativePath2AbsolutePath(String relativePath, String referAbsolutePath) {
        if (TextUtils.isEmpty(relativePath) || TextUtils.isEmpty(referAbsolutePath)) {
            return relativePath;
        }

        // 如果不是相对路径
        if (!relativePath.startsWith("./")) {
            return relativePath;
        }

        String pathDir = getPathDir(referAbsolutePath);
        if (TextUtils.isEmpty(pathDir)) {
            return relativePath.substring(2);
        }

        return pathDir + relativePath.substring(2);
    }

    /**
     * 根据相对路径获取真实的资源路径
     *
     * 网络路径：./xxx.png -> http(s)://x.x.x.x/xxx.png
     * Hummer路径：./xxx.png -> hummer://xxx/xxx.png
     * 本地路径：./xxx.png -> /data/data/xxx/files/xxx/xxx.png
     * Assets路径：./xxx.png -> xxx/xxx.png
     */
    public static String getRealResourcePath(String relativePath, String jsSourcePath) {
        if (TextUtils.isEmpty(relativePath) || TextUtils.isEmpty(jsSourcePath)) {
            return relativePath;
        }

        // 如果不是相对路径
        if (!relativePath.startsWith("./")) {
            return relativePath;
        }

        String jsSourceDir = getPathDir(jsSourcePath);
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
