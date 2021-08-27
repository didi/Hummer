package com.didi.hummer.debug.plugin;

/**
 * Created by XiaoFeng on 2019-11-07.
 */
public interface IV8Debugger {

    void addScriptSource(String scriptId);

    void addScriptSource(String scriptId, String scriptSource);
}
