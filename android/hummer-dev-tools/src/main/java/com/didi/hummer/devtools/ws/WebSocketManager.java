package com.didi.hummer.devtools.ws;

import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.text.TextUtils;

import com.didi.hummer.adapter.websocket.OnWebSocketEventListener;
import com.didi.hummer.adapter.websocket.impl.DefaultWebSocketAdapter;

/**
 * 开发调试模式下的WebSocket管理类，负责和CLI建立连接，带有重连功能
 *
 * Created by XiaoFeng on 2021/4/22.
 */
public class WebSocketManager {

    public interface WSMsgListener {
        void onMsgReceived(String msg);
    }

    private DefaultWebSocketAdapter webSocketAdapter;

    private static final int RECONNECT_DELAY_MS = 2000;

    private String mWsUrl;
    private Handler mHandler;
    private boolean mClosed;
    private boolean mIsReconnecting;

    public void connect(String url, WSMsgListener listener) {
        mHandler = new Handler(Looper.getMainLooper());
        mWsUrl = toWSUrl(url);
        if (TextUtils.isEmpty(mWsUrl)) {
            return;
        }

        if (webSocketAdapter != null) {
            webSocketAdapter.destroy();
        }

        webSocketAdapter = new DefaultWebSocketAdapter();
        webSocketAdapter.connect(mWsUrl, new OnWebSocketEventListener() {
            @Override
            public void onOpen() {

            }

            @Override
            public void onClose(int code, String reason) {
                if (!mClosed) {
                    reconnect(listener);
                }
            }

            @Override
            public void onError(String errMsg) {
                if (!mClosed) {
                    reconnect(listener);
                }
            }

            @Override
            public void onMessage(String text) {
                if (listener != null) {
                    listener.onMsgReceived(text);
                }
            }
        });
    }

    private void reconnect(WSMsgListener listener) {
        if (mClosed || mIsReconnecting) {
            return;
        }
        mIsReconnecting = true;
        mHandler.postDelayed((Runnable) () -> {
            if (!mClosed) {
                connect(mWsUrl, listener);
            }
            mIsReconnecting = false;
        }, RECONNECT_DELAY_MS);
    }

    public void sendMsg(String msg) {
        if (webSocketAdapter != null) {
            webSocketAdapter.send(msg);
        }
    }

    public void close() {
        mClosed = true;
        if (webSocketAdapter != null) {
            try {
                webSocketAdapter.close(1000, "End of session");
            } catch (Exception e) {
                // swallow, no need to handle it here
            }
            webSocketAdapter = null;
        }
    }

    /**
     * 把http的url转换成websocket的url
     *
     * @param url
     * @return
     */
    private String toWSUrl(String url) {
        if (TextUtils.isEmpty(url)) {
            return null;
        }

        url = url.toLowerCase();
        if (!url.startsWith("http://")) {
            if (url.startsWith("ws://")) {
                return url;
            }
            return null;
        }

        Uri uri = Uri.parse(url);
        String authority = uri.getAuthority();
        if (TextUtils.isEmpty(authority)) {
            return null;
        }

        return "ws://" + authority;
    }
}
