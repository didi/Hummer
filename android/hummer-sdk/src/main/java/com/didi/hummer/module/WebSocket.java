package com.didi.hummer.module;

import android.text.TextUtils;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.lifecycle.ILifeCycle;
import com.didi.hummer.utils.UIThreadUtil;

import java.io.EOFException;
import java.util.HashMap;
import java.util.Map;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.WebSocketListener;

/**
 * WebSocket组件
 *
 * Created by XiaoFeng on 2020-01-09.
 */
@Component("WebSocket")
public class WebSocket implements ILifeCycle {

    public enum CloseCodes {
        CLOSE_NORMAL(1000),
        CLOSE_GOING_AWAY(1001),
        CLOSE_PROTOCOL_ERROR(1002),
        CLOSE_UNSUPPORTED(1003),
        CLOSE_NO_STATUS(1005),
        CLOSE_ABNORMAL(1006),
        UNSUPPORTED_DATA(1007),
        POLICY_VIOLATION(1008),
        CLOSE_TOO_LARGE(1009),
        MISSING_EXTENSION(1010),
        INTERNAL_ERROR(1011),
        SERVICE_RESTART(1012),
        TRY_AGAIN_LATER(1013),
        TLS_HANDSHAKE(1015);

        private int code;

        CloseCodes(int code) {
            this.code = code;
        }

        public int getCode() {
            return code;
        }
    }

    private static OkHttpClient client;
    private okhttp3.WebSocket webSocket;
    private JSValue jsValue;

    public WebSocket(JSValue jsValue, String url) {
        if (client == null) {
            client = new OkHttpClient();
        }

        this.jsValue = jsValue;
        if (jsValue != null) {
            jsValue.protect();
        }

        connect(url);
    }

    @Override
    public void onCreate() {}

    @Override
    public void onDestroy() {
        if (webSocket != null) {
            webSocket.close(CloseCodes.CLOSE_GOING_AWAY.getCode(), CloseCodes.CLOSE_GOING_AWAY.name());
        }
        if (onopen != null) {
            onopen.release();
            onopen = null;
        }
        if (onmessage != null) {
            onmessage.release();
            onmessage = null;
        }
        if (onclose != null) {
            onclose.release();
            onclose = null;
        }
        if (onerror != null) {
            onerror.release();
            onerror = null;
        }
    }

    private void connect(String url) {
        if (TextUtils.isEmpty(url)) {
            return;
        }

        this.url = url;

        okhttp3.Request request = new Request.Builder()
                .url(url)
                .build();

        client.newWebSocket(request, new WebSocketListener() {
            @Override
            public void onOpen(okhttp3.WebSocket webSocket, Response response) {
                WebSocket.this.webSocket = webSocket;
                UIThreadUtil.runOnUiThread(() -> {
                    if (onopen != null) {
                        onopen.call();
                    }
                });
            }

            @Override
            public void onClosed(okhttp3.WebSocket webSocket, int code, String reason) {
                UIThreadUtil.runOnUiThread(() -> {
                    if (onclose != null) {
                        // 包装一层CloseEvent结构体，对齐Web端WebSocket API
                        Map<String, Object> closeEvent = new HashMap<>();
                        closeEvent.put("code", code);
                        closeEvent.put("reason", reason);
                        onclose.call(closeEvent);
                    }
                });
            }

            @Override
            public void onFailure(okhttp3.WebSocket webSocket, Throwable t, Response response) {
                t.printStackTrace();
                UIThreadUtil.runOnUiThread(() -> {
                    if (t instanceof EOFException) {
                        if (onclose != null) {
                            onclose.call(CloseCodes.CLOSE_NORMAL.getCode(), CloseCodes.CLOSE_NORMAL.name());
                        }
                    } else {
                        if (onerror != null) {
                            onerror.call();
                        }
                    }
                });
            }

            @Override
            public void onMessage(okhttp3.WebSocket webSocket, String text) {
                UIThreadUtil.runOnUiThread(() -> {
                    if (onmessage != null) {
                        // 包装一层MessageEvent结构体，对齐Web端WebSocket API
                        Map<String, Object> messageEvent = new HashMap<>();
                        messageEvent.put("data", text);
                        onmessage.call(messageEvent);
                    }
                });
            }
        });
    }

    @JsMethod("close")
    public void close() {
        if (webSocket != null) {
            webSocket.close(CloseCodes.CLOSE_NORMAL.getCode(), CloseCodes.CLOSE_NORMAL.name());
        }
        if (jsValue != null) {
            jsValue.unprotect();
        }
    }

    @JsMethod("send")
    public void send(String text) {
        if (webSocket != null) {
            webSocket.send(text);
        }
    }

    @JsMethod("addEventListener")
    public void addEventListener(String eventName, JSCallback callback) {
        switch (eventName) {
            case "open":
                onopen = callback;
                break;
            case "message":
                onmessage = callback;
                break;
            case "close":
                onclose = callback;
                break;
            case "error":
                onerror = callback;
                break;
            default:
                break;
        }
    }

    @JsProperty("url")
    public String url;
    public void setUrl(String url) {
        this.url = url;
    }
    public String getUrl() {
        return url;
    }

    @JsProperty("onopen")
    private JSCallback onopen;
    public void setOnopen(JSCallback callback) {
        onopen = callback;
    }

    @JsProperty("onmessage")
    private JSCallback onmessage;
    public void setOnmessage(JSCallback callback) {
        onmessage = callback;
    }

    @JsProperty("onclose")
    private JSCallback onclose;
    public void setOnclose(JSCallback callback) {
        onclose = callback;
    }

    @JsProperty("onerror")
    private JSCallback onerror;
    public void setOnerror(JSCallback callback) {
        onerror = callback;
    }
}
