package com.didi.hummer.hermes.debugger;

import com.didi.hummer.hermes.inspector.Inspector;
import com.didi.hummer.hermes.inspector.InspectorPackagerConnection;
import com.didi.hummer.plugin.interfaze.IHermesDebugger;

/**
 * Created by XiaoFeng on 2020/9/4.
 */
public class DefaultHermesDebugger implements IHermesDebugger {

    private InspectorPackagerConnection inspectorConnection;

    public DefaultHermesDebugger() {
        String url = "ws://localhost:8081/inspector/device?name=xxx&app=xxx";
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
        Inspector.enableDebugging(runtimeId, jsSourcePath);
    }

    @Override
    public void disableDebugging(long runtimeId) {
        Inspector.disableDebugging(runtimeId);
    }
}
