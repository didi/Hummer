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
     * 页面url
     */
    public String url;

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
