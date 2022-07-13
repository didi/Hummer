package com.didi.hummer.hermes.debugger;

import android.content.Context;
import android.net.Uri;
import android.text.TextUtils;

import com.didi.hummer.adapter.http.HttpCallback;
import com.didi.hummer.adapter.http.HttpResponse;
import com.didi.hummer.context.HummerDefinition;
import com.didi.hummer.core.util.HMLog;
import com.didi.hummer.debug.plugin.IHermesDebugger;
import com.didi.hummer.hermes.inspector.Inspector;
import com.didi.hummer.hermes.inspector.InspectorPackagerConnection;
import com.didi.hummer.hermes.queue.MessageQueueThreadImpl;
import com.didi.hummer.hermes.queue.MessageQueueThreadSpec;
import com.didi.hummer.utils.AssetsUtil;
import com.didi.hummer.utils.NetworkUtil;
import com.google.gson.reflect.TypeToken;

import java.util.List;

/**
 * Created by XiaoFeng on 2020/9/4.
 */
public class DefaultHermesDebugger implements IHermesDebugger {

    private static String DEFAULT_DEBUGGER_IP = "localhost";
    private static int DEFAULT_DEBUGGER_PORT = 8081;

    static {
        System.loadLibrary("hermes-debugger");
    }

    private InspectorPackagerConnection inspectorConnection;
    private static String sIP;
    private static int sPort;

    private class UrlInfo {
        public String ip;
        public int port;

        public UrlInfo(String ip, int port) {
            this.ip = ip;
            this.port = port;
        }
    }

    private interface IPageListCallback {
        void onResult(List<String> pageList);
    }

    public DefaultHermesDebugger(Context context) {
        this(context, DEFAULT_DEBUGGER_IP, DEFAULT_DEBUGGER_PORT);
    }

    public DefaultHermesDebugger(Context context, String ip, int port) {
        sIP = ip;
        sPort = port;

        HummerDefinition.ES5_CORE = AssetsUtil.readFile(context, "HummerDefinition_es5.js");
        HummerDefinition.ES5_SDK = AssetsUtil.readFile(context,"hummer_sdk.js");
        HummerDefinition.ES5_COMP = AssetsUtil.readFile(context,"hummer_component.js");
        HummerDefinition.BABEL = AssetsUtil.readFile(context,"babel.js");
    }

    public void release() {
        if (inspectorConnection != null) {
            inspectorConnection.closeQuietly();
        }
    }

    @Override
    public void enableDebugging(long runtimeId, String jsSourcePath) {
        UrlInfo info = pickIpAndPortFromUrlIfNeed(jsSourcePath);
        if (info == null || TextUtils.isEmpty(info.ip) || info.port <= 0) {
            return;
        }

        // 如果用户没有设置过WS的IP，则从页面URL中解析出IP，做一次兼容；
        // 如果用户已设置了自定义的IP，则直接返回，不再做URL解析；
        if (TextUtils.isEmpty(sIP) || sIP.equals(DEFAULT_DEBUGGER_IP)) {
            sIP = info.ip;
        }

        requestDebugPageList(info.port, pageList -> {
            if (pageList == null || pageList.isEmpty()) {
                return;
            }

            connectDebuggerWS();

            MessageQueueThreadImpl mqt = MessageQueueThreadImpl.create(MessageQueueThreadSpec.mainThreadSpec(), e -> {
                HMLog.v("HummerDebug", "enableDebugging, mqt exception: " + e);
            });
            Inspector.enableDebugging(runtimeId, jsSourcePath, mqt, pageList.contains(jsSourcePath));
        });
    }

    @Override
    public void disableDebugging(long runtimeId) {
        Inspector.disableDebugging(runtimeId);
    }

    /**
     * 从URL中解析出IP
     */
    private UrlInfo pickIpAndPortFromUrlIfNeed(String url) {
        if (TextUtils.isEmpty(url)) {
            return null;
        }

        UrlInfo info = null;
        try {
            Uri uri = Uri.parse(url);
            String ip = uri.getHost();
            int port = uri.getPort();
            info = new UrlInfo(ip, port);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return info;
    }

    /**
     * 向Debugger服务请求当前的PageList，如果有内容返回，说明VSCode中的Debugger服务已开启；返回空数组说明没有开启。
     */
    private void requestDebugPageList(int devPort, IPageListCallback pageListCallback) {
        String url = String.format("http:%s:%d/dev/page/list?devPort=%d", sIP, sPort, devPort);
        NetworkUtil.httpGet(url, 2000, (HttpCallback<HttpResponse<List<String>>>) response -> {
            if (response.error != null && response.error.code != 0) {
                if (pageListCallback != null) {
                    pageListCallback.onResult(null);
                }
                return;
            }
            if (response.data == null || response.data.data == null) {
                if (pageListCallback != null) {
                    pageListCallback.onResult(null);
                }
                return;
            }

            if (pageListCallback != null) {
                pageListCallback.onResult(response.data.data);
            }
        }, new TypeToken<HttpResponse<List<String>>>(){}.getType());
    }

    /**
     * 向Debugger服务发起WebSocket连接，只有当Debugger服务已开启的情况下才会连接成功
     */
    private void connectDebuggerWS() {
        String url = String.format("ws://%s:%d/inspector/device?name=xxx&app=xxx", sIP, sPort);
        inspectorConnection = new InspectorPackagerConnection(url, "xxx", InspectorPackagerConnection.BundleStatus::new);
        inspectorConnection.connect();
    }
}
