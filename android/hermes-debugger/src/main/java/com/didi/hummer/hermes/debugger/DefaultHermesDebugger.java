package com.didi.hummer.hermes.debugger;

import com.didi.hummer.debug.plugin.IHermesDebugger;
import com.didi.hummer.hermes.inspector.Inspector;
import com.didi.hummer.hermes.inspector.InspectorPackagerConnection;

/**
 * Created by XiaoFeng on 2020/9/4.
 */
public class DefaultHermesDebugger implements IHermesDebugger {

    static {
        // 这里后续会替换成加载专属debug库
        System.loadLibrary("hermes");
        System.loadLibrary("hermes-debugger");
    }

    private InspectorPackagerConnection inspectorConnection;

    public DefaultHermesDebugger() {
        this("localhost", 8081);
    }

    public DefaultHermesDebugger(String ip, int port) {
        String url = String.format("ws://%s:%d/inspector/device?name=xxx&app=xxx", ip, port);
        inspectorConnection = new InspectorPackagerConnection(url, "xxx", InspectorPackagerConnection.BundleStatus::new);
        inspectorConnection.connect();
    }

    public void release() {
        if (inspectorConnection != null) {
            inspectorConnection.closeQuietly();
        }
    }

    @Override
    public void enableDebugging(long runtimeId, String jsSourcePath) {
        Inspector.enableDebugging(runtimeId, "Hummer - " + jsSourcePath);
    }

    @Override
    public void disableDebugging(long runtimeId) {
        Inspector.disableDebugging(runtimeId);
    }
}
