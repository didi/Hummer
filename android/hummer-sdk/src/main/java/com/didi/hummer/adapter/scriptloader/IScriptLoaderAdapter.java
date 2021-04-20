package com.didi.hummer.adapter.scriptloader;

/**
 * 脚本加载适配器（URL -> Script）
 *
 * Created by XiaoFeng on 2021/2/16.
 */
public interface IScriptLoaderAdapter {

    /**
     * 通过URL加载JS代码
     *
     * ScriptLoadCallback中的errCode和errMsg说明：
     *   1. 网络错误：>0，如：{errCode: 404, errMsg: "[http error]"}；
     *   2. JS文件读取错误：>-100，如：{errCode: -101, errMsg: "JavaScript file read error"}；
     *
     * @param url
     * @param callback
     */
    void loadScriptWithUrl(String url, ScriptLoadCallback callback);
}
