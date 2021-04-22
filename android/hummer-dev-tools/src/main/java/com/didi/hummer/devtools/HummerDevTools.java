package com.didi.hummer.devtools;

import android.text.TextUtils;
import android.widget.Toast;

import com.didi.hummer.adapter.http.HttpCallback;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.devtools.invoker.HummerInvokerWrapper;
import com.didi.hummer.devtools.manager.HummerLogManager;
import com.didi.hummer.devtools.widget.DevToolsEntrance;
import com.didi.hummer.devtools.ws.WebSocketManager;
import com.didi.hummer.utils.NetworkUtil;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * 【开发工具】按钮功能入口
 *
 * Created by XiaoFeng on 2021/4/22.
 */
public class HummerDevTools {

    /**
     * 注入参数
     */
    public interface IParameterInjector {
        void injectParameter(StringBuilder builder);
    }

    private HummerContext hmContext;
    private DevToolsEntrance entranceView;
    private WebSocketManager wsManager;
    private HummerLogManager logManager;

    @Deprecated
    public static void init(HummerContext context) {}
    @Deprecated
    public static void init(HummerContext context, IParameterInjector injector) {}

    public HummerDevTools(HummerContext context) {
        this(context, null);
    }

    public HummerDevTools(HummerContext context, DevToolsConfig config) {
        hmContext = context;
        entranceView = new DevToolsEntrance(context);
        wsManager = new WebSocketManager();
        logManager = new HummerLogManager(wsManager);
        hmContext.registerInvoker(new HummerInvokerWrapper(logManager));
        entranceView.setLogManager(logManager);

        if (config != null && config.getInjector() != null) {
            entranceView.setParameterInjector(config.getInjector());
        }
    }

    /**
     * 与CLI建立WebSocket连接，用于热更新和日志输出
     */
    public void connectWebSocket(String url) {
        wsManager.connect(url, msg -> {
            msg = getUrlFromWS(msg);
            if (url != null && url.equalsIgnoreCase(msg)) {
                // 热更新
                NetworkUtil.httpGet(url, (HttpCallback<String>) response -> {
                    hmContext.onRefresh();
                    hmContext.evaluateJavaScript(response.data, url);
                    Toast.makeText(hmContext, "页面已刷新", Toast.LENGTH_SHORT).show();
                });
            }
        });
    }

    public void release() {
        wsManager.close();
    }

    /**
     * 从websocket发来是消息中取出url
     *
     * @param wsMsg websocket发来是消息，{"type":"ReloadBundle","params":"http://x.x.x.x:9000/xxxx.js?_=1588147203265"}
     * @return
     */
    private static String getUrlFromWS(String wsMsg) {
        if (TextUtils.isEmpty(wsMsg)) {
            return null;
        }

        String url = null;
        try {
            JSONObject jo = new JSONObject(wsMsg);
            url = jo.getJSONObject("params").getString("url");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        if (TextUtils.isEmpty(url)) {
            return null;
        }

        if (url.contains("?")) {
            url = url.substring(0, url.indexOf("?"));
        }

        return url;
    }
}
