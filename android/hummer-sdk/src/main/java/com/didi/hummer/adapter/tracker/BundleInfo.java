package com.didi.hummer.adapter.tracker;

import java.io.Serializable;

/**
 * 页面和模块相关信息
 *
 * Created by XiaoFeng on 2021/9/27.
 */
public class BundleInfo implements Serializable {

    /**
     * 页面URL
     */
    public String url;

    /**
     * 页面对应的模块名
     */
    public String moduleName;

    /**
     * 页面对应的模块版本
     */
    public String moduleVersion;

    public BundleInfo(String url, String moduleName, String moduleVersion) {
        this.url = url;
        this.moduleName = moduleName;
        this.moduleVersion = moduleVersion;
    }
}
