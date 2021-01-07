package com.didi.hummer.plugin.interfaze;

/**
 * Created by XiaoFeng on 2020/9/7.
 */
public interface IHermesDebugger {

    void enableDebugging(long runtimeId, String jsSourcePath);

    void disableDebugging(long runtimeId);
}
