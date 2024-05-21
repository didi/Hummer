package com.didi.hummer2.devtools;

import android.content.Context;
import android.text.TextUtils;
import android.view.View;

import androidx.core.view.ViewCompat;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.HummerScriptContext;
import com.didi.hummer2.devtools.invoker.HummerInvokerWrapper;
import com.didi.hummer2.devtools.invoker.RequestInvokerWrapper;
import com.didi.hummer2.devtools.manager.HummerLogManager;
import com.didi.hummer2.devtools.manager.HummerNetManager;
import com.didi.hummer2.devtools.widget.DevToolsEntrance;
import com.didi.hummer2.devtools.widget.FloatLayout;
import com.didi.hummer2.devtools.ws.WebSocketManager;
import com.didi.hummer2.render.component.view.HMBase;
import com.facebook.yoga.YogaEdge;
import com.facebook.yoga.YogaPositionType;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * 【开发工具】按钮功能入口
 * <p>
 * Created by XiaoFeng on 2021/4/22.
 */
public class DefaultHummerDevTools implements HummerDevTools {

    private HummerContext hmContext;
    private DevToolsEntrance entrance;
    private WebSocketManager wsManager;
    private HummerLogManager logManager;
    private HummerNetManager netManager;

    @Deprecated
    public static void init(HummerContext context) {
    }

    @Deprecated
    public static void init(HummerContext context, HummerDevTools.IParameterInjector injector) {
    }

    public DefaultHummerDevTools(HummerContext context) {
        this(context, null);
    }

    public DefaultHummerDevTools(HummerContext context, DevToolsConfig config) {
        hmContext = context;
        entrance = new DevToolsEntrance(context);
        wsManager = WebSocketManager.getInstance();
        logManager = new HummerLogManager();
        hmContext.setJsConsoleHandler(new HummerInvokerWrapper(logManager));
        entrance.setLogManager(logManager);
        netManager = new HummerNetManager();
        hmContext.registerInvoker(new RequestInvokerWrapper(netManager));
        entrance.setNetManager(netManager);

        if (config != null && config.getInjector() != null) {
            entrance.setParameterInjector(config.getInjector());
        }
    }

    public void release(HummerContext hmContext) {
        wsManager.release(hmContext.getPageUrl());
    }

    /**
     * 初始化连接
     */
    public void initConnection(HummerContext context, String url, HummerDevTools.IHotReloadCallback callback) {
        connectWebSocket(url, callback);
        initRefreshView(context, callback);
    }

    /**
     * 与CLI建立WebSocket连接，用于热重载和日志输出
     */
    private void connectWebSocket(String url, HummerDevTools.IHotReloadCallback callback) {
        wsManager.connect(url, msg -> {
            msg = getUrlFromWS(msg);
            if (url != null && url.equalsIgnoreCase(msg)) {
                // 热重载
                if (callback != null) {
                    callback.onHotReload();
                }
            }
        });
    }

    /**
     * 初始化刷新按钮
     */
    private void initRefreshView(HummerContext context, HummerDevTools.IHotReloadCallback callback) {
        FloatLayout floatLayout = new FloatLayout(context);
        floatLayout.setOnClickListener(v -> {
            if (callback != null) {
                callback.onHotReload();
            }
        });
        ViewCompat.setElevation(floatLayout, 9000);
        View.inflate(context, R.layout.layout_refresh_btn, floatLayout);

        HMBase<FloatLayout> base = new HMBase<FloatLayout>(context, null, null) {
            @Override
            protected FloatLayout createViewInstance(Context context) {
                return floatLayout;
            }
        };
        base.getYogaNode().setPositionType(YogaPositionType.ABSOLUTE);
        base.getYogaNode().setPosition(YogaEdge.END, 0);
        base.getYogaNode().setPositionPercent(YogaEdge.BOTTOM, 50);

        ((HummerScriptContext)context).getContainer().addView(base);
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
