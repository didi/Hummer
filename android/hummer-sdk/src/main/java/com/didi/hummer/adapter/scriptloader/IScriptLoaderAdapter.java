package com.didi.hummer.adapter.scriptloader;

/**
 * 脚本加载适配器（URL -> Script）
 *
 * Created by XiaoFeng on 2021/2/16.
 */
public interface IScriptLoaderAdapter {

    void loadScriptWithUrl(String url, ScriptLoadCallback callback);
}
