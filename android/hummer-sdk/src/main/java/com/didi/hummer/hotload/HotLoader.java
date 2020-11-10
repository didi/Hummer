package com.didi.hummer.hotload;

import android.net.Uri;
import android.text.TextUtils;
import android.widget.Toast;

import com.didi.hummer.adapter.http.HttpCallback;
import com.didi.hummer.adapter.websocket.OnWebSocketEventListener;
import com.didi.hummer.adapter.websocket.impl.DefaultWebSocketAdapter;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.utils.NetworkUtil;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by XiaoFeng on 2020/4/29.
 */
public class HotLoader {

    private DefaultWebSocketAdapter webSocketAdapter;

    public interface HotLoaderCallback {
        void onResult(String msg);
    }

    public void connect(HummerContext context, String url) {
        String wsUrl = httpUrl2WSUrl(url);
        if (TextUtils.isEmpty(wsUrl)) {
            return;
        }

        HotLoaderCallback callback = msg -> {
            if (url != null && url.equalsIgnoreCase(msg)) {
                NetworkUtil.httpGet(url, (HttpCallback<String>) response -> {
                    context.evaluateJavaScript(response.data, url);
                    Toast.makeText(context, "页面已刷新", Toast.LENGTH_SHORT).show();
                });
            }
        };

        if (webSocketAdapter != null) {
            webSocketAdapter.destroy();
        }
        webSocketAdapter = new DefaultWebSocketAdapter();
        webSocketAdapter.connect(wsUrl, new OnWebSocketEventListener() {
            @Override
            public void onOpen() {

            }

            @Override
            public void onClose(int code, String reason) {

            }

            @Override
            public void onError(String errMsg) {
                callback.onResult(null);
            }

            @Override
            public void onMessage(String text) {
                // text: {"type":"ReloadBundle","params":"http://x.x.x.x:9000/xxxx.js?_=1588147203265"}
                callback.onResult(getUrlFromWS(text));
            }
        });
    }

    public void destroy() {
        if (webSocketAdapter != null) {
            webSocketAdapter.destroy();
            webSocketAdapter = null;
        }
    }

    /**
     * 把http的url转换成websocket的url
     *
     * @param url
     * @return
     */
    private String httpUrl2WSUrl(String url) {
        if (TextUtils.isEmpty(url) || !url.toLowerCase().startsWith("http")) {
            return null;
        }

        Uri uri = Uri.parse(url);
        String authority = uri.getAuthority();
        if (TextUtils.isEmpty(authority)) {
            return null;
        }

        return "ws://" + authority;
    }

    /**
     * 从websocket发来是消息中取出url
     *
     * @param wsMsg websocket发来是消息，{"type":"ReloadBundle","params":"http://x.x.x.x:9000/xxxx.js?_=1588147203265"}
     * @return
     */
    private String getUrlFromWS(String wsMsg) {
        if (TextUtils.isEmpty(wsMsg)) {
            return null;
        }

        String url = null;
        try {
            JSONObject jo = new JSONObject(wsMsg);
            url = jo.getString("params");
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
