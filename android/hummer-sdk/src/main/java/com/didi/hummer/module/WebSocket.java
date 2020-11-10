package com.didi.hummer.module;

import com.didi.hummer.adapter.HummerAdapter;
import com.didi.hummer.adapter.websocket.OnWebSocketEventListener;
import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;

/**
 * WebSocket组件
 *
 * Created by XiaoFeng on 2020-01-09.
 */
@Component("WebSocket")
public class WebSocket {

    private static JSCallback onOpenCallback;
    private static JSCallback onCloseCallback;
    private static JSCallback onErrorCallback;
    private static JSCallback onMessageCallback;

    @JsMethod("connect")
    public static void connect(HummerContext context, String url) {
        HummerAdapter.getWebSocketAdapter(context.getNamespace()).connect(url, new OnWebSocketEventListener() {
            @Override
            public void onOpen() {
                if (onOpenCallback != null) {
                    onOpenCallback.call();
                }
            }

            @Override
            public void onClose(int code, String reason) {
                if (onCloseCallback != null) {
                    onCloseCallback.call(code, reason);
                }
            }

            @Override
            public void onError(String errMsg) {
                if (onErrorCallback != null) {
                    onErrorCallback.call(errMsg);
                }
            }

            @Override
            public void onMessage(String data) {
                if (onMessageCallback != null) {
                    onMessageCallback.call(data);
                }
            }
        });
    }

    @JsMethod("close")
    public static void close(HummerContext context, int code, String reason) {
        HummerAdapter.getWebSocketAdapter(context.getNamespace()).close(code, reason);
    }

    @JsMethod("send")
    public static void send(HummerContext context, String data) {
        HummerAdapter.getWebSocketAdapter(context.getNamespace()).send(data);
    }

    @JsMethod("onOpen")
    public static void onOpen(JSCallback callback) {
        onOpenCallback = callback;
    }

    @JsMethod("onClose")
    public static void onClose(JSCallback callback) {
        onCloseCallback = callback;
    }

    @JsMethod("onError")
    public static void onError(JSCallback callback) {
        onErrorCallback = callback;
    }

    @JsMethod("onMessage")
    public static void onMessage(JSCallback callback) {
        onMessageCallback = callback;
    }
}
