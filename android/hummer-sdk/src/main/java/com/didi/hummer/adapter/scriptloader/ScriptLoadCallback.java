package com.didi.hummer.adapter.scriptloader;

/**
 * 脚本加载结果回调
 *
 * Created by XiaoFeng on 2021/2/16.
 */
public interface ScriptLoadCallback {

    void onScriptLoad(String script, int errCode, String errMsg);
}
