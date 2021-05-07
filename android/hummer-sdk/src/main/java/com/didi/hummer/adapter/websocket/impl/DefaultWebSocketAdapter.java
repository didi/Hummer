package com.didi.hummer.adapter.websocket.impl;

import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.support.annotation.NonNull;

import com.didi.hummer.adapter.websocket.IWebSocketAdapter;
import com.didi.hummer.adapter.websocket.OnWebSocketEventListener;
import com.didi.hummer.adapter.websocket.WebSocketCloseCodes;

import java.io.EOFException;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.WebSocket;
import okhttp3.WebSocketListener;

/**
 * Created by XiaoFeng on 2020-01-09.
 */
public class DefaultWebSocketAdapter implements IWebSocketAdapter {

    private static final int MSG_MESSAGE = 1;

    private String url;
    private OkHttpClient client;
    private WebSocket ws;
    private Handler handler;
    private OnWebSocketEventListener eventListener;

    public DefaultWebSocketAdapter() {
        client = new OkHttpClient();
        handler = new Handler(Looper.getMainLooper()) {
            @Override
            public void handleMessage(@NonNull Message msg) {
                super.handleMessage(msg);
                switch (msg.what) {
                    case MSG_MESSAGE:
                        if (eventListener != null) {
                            eventListener.onMessage(String.valueOf(msg.obj));
                        }
                        break;
                    default:
                        break;
                }
            }
        };
    }

    @Override
    public void connect(String url, OnWebSocketEventListener listener) {
        if (ws != null) {
            // 如果有url为空，或者有相同的url已连接，则不再连接
            if (url == null || url.equals(this.url)) {
                return;
            }

            // 如果已有连接但url不相同，则断开之前的连接，重新创建新的连接
            close(WebSocketCloseCodes.CLOSE_NORMAL.getCode(), WebSocketCloseCodes.CLOSE_NORMAL.name());
        }

        this.url = url;
        this.eventListener = listener;

        Request request = new Request.Builder()
                .url(url)
                .build();

        client.newWebSocket(request, new WebSocketListener() {
            @Override
            public void onOpen(WebSocket webSocket, Response response) {
                ws = webSocket;

                if (listener != null) {
                    listener.onOpen();
                }
            }

            @Override
            public void onClosed(WebSocket webSocket, int code, String reason) {
                reset();

                handler.post(() -> {
                    if (listener != null) {
                        listener.onClose(code, reason);
                    }
                });
            }

            @Override
            public void onFailure(WebSocket webSocket, Throwable t, Response response) {
                t.printStackTrace();
                reset();

                handler.post(() -> {
                    if (listener != null) {
                        if (t instanceof EOFException) {
                            listener.onClose(WebSocketCloseCodes.CLOSE_NORMAL.getCode(), WebSocketCloseCodes.CLOSE_NORMAL.name());
                        } else {
                            listener.onError(t.getMessage());
                        }
                    }
                });
            }

            @Override
            public void onMessage(WebSocket webSocket, String text) {
                // 用Message的形式发送是为了可以在发送之前移除阻塞的消息，防止消息堆积阻塞
                handler.removeMessages(MSG_MESSAGE);
                handler.sendMessage(Message.obtain(handler, MSG_MESSAGE, text));
            }
        });
    }

    @Override
    public void close(int code, String reason) {
        if (ws != null) {
            ws.close(code, reason);
        }
        reset();
    }

    private void reset() {
        url = null;
        ws = null;
    }

    @Override
    public void destroy() {
        close(WebSocketCloseCodes.CLOSE_GOING_AWAY.getCode(), WebSocketCloseCodes.CLOSE_GOING_AWAY.name());
    }

    @Override
    public void send(String data) {
        if (ws != null) {
            ws.send(data);
        }
    }
}
