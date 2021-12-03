package com.didi.hummer.adapter.navigator;

import android.net.Uri;
import android.text.TextUtils;

import java.io.Serializable;
import java.util.Map;

public class NavPage implements Serializable {

    /**
     * 页面标识（用于入栈出栈查找指定页面用）
     */
    public String id;

    /**
     * 页面URL
     *
     * 具体格式如下：
     * 网络URL: http(s)://x.x.x.x/xxx/index.js
     * Hummer URL: hummer://home/index.js
     * 相对URL: ./index.js
     *
     * 详见：https://hummer.didi.cn/doc#/zh-CN/navigator
     */
    public String url;

    /**
     * js文件源路径
     *
     * 有以下几种路径类型：
     * 网络URL：http(s)://x.x.x.x/xxx/index.js
     * Assets文件：assets:///xxx/index.js
     * 本地文件：file:///data/data/xxx/files/xxx/index.js
     */
    public String sourcePath;

    /**
     * 是否需要转场动画
     */
    public boolean animated = true;

    /**
     * 打开时是否关闭自身
     */
    public boolean closeSelf;

    /**
     * 页面间传递的参数
     */
    public Map<String, Object> params;

    public NavPage() {}

    public NavPage(String url) {
        this.url = url;
    }

    public NavPage(String id, String url) {
        this.id = id;
        this.url = url;
    }

    @Override
    public String toString() {
        return "NavPage{" +
                "id='" + id + '\'' +
                ", url='" + url + '\'' +
                ", sourcePath='" + sourcePath + '\'' +
                ", animated=" + animated +
                ", closeSelf=" + closeSelf +
                ", params=" + params +
                '}';
    }

    /**
     * 是否是JS文件路径
     *
     * @return
     */
    public boolean isJsUrl() {
        return url != null && url.toLowerCase().endsWith(".js");
    }

    /**
     * 是否是Http链接
     *
     * @return
     */
    public boolean isHttpUrl() {
        return url != null && url.toLowerCase().startsWith("http");
    }

    public String getScheme() {
        if (TextUtils.isEmpty(url)) {
            return null;
        }
        Uri uri = Uri.parse(url);
        return uri.getScheme();
    }

    public String getHost() {
        if (TextUtils.isEmpty(url)) {
            return null;
        }
        Uri uri = Uri.parse(url);
        return uri.getHost();
    }

    public String getPath() {
        if (TextUtils.isEmpty(url)) {
            return null;
        }
        Uri uri = Uri.parse(url);
        return uri.getPath();
    }

    public String getPageName() {
        return getHost() + getPath();
    }
}
