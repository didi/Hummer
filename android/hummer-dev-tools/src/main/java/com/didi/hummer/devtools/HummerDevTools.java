package com.didi.hummer.devtools;

import android.content.Context;
import android.support.v4.view.ViewCompat;
import android.text.TextUtils;
import android.view.View;

import com.didi.hummer.context.HummerContext;
import com.didi.hummer.devtools.invoker.HummerInvokerWrapper;
import com.didi.hummer.devtools.manager.HummerLogManager;
import com.didi.hummer.devtools.widget.DevToolsEntrance;
import com.didi.hummer.devtools.widget.FloatLayout;
import com.didi.hummer.devtools.ws.WebSocketManager;
import com.didi.hummer.render.component.view.HMBase;
import com.facebook.yoga.YogaEdge;
import com.facebook.yoga.YogaPositionType;

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

    public interface IRefreshCallback {
        void onRefresh();
    }

    private HummerContext hmContext;
    private DevToolsEntrance entrance;
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
        entrance = new DevToolsEntrance(context);
        wsManager = new WebSocketManager();
        logManager = new HummerLogManager(wsManager);
        hmContext.registerInvoker(new HummerInvokerWrapper(logManager));
        entrance.setLogManager(logManager);

        if (config != null && config.getInjector() != null) {
            entrance.setParameterInjector(config.getInjector());
        }
    }

    public void release() {
        wsManager.close();
        entrance.release();
    }

    /**
     * 初始化连接
     */
    public void initConnection(HummerContext context, String url, IRefreshCallback callback) {
        connectWebSocket(url, callback);
        initRefreshView(context, callback);
    }

    /**
     * 与CLI建立WebSocket连接，用于热更新和日志输出
     */
    private void connectWebSocket(String url, IRefreshCallback callback) {
        wsManager.connect(url, msg -> {
            msg = getUrlFromWS(msg);
            if (url != null && url.equalsIgnoreCase(msg)) {
                // 热更新
                if (callback != null) {
                    callback.onRefresh();
                }
            }
        });
    }

    /**
     * 初始化刷新按钮
     */
    private void initRefreshView(HummerContext context, IRefreshCallback callback) {
        FloatLayout floatLayout = new FloatLayout(context);
        floatLayout.setOnClickListener(v -> {
            if (callback != null) {
                callback.onRefresh();
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
        context.getContainer().addView(base);
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
