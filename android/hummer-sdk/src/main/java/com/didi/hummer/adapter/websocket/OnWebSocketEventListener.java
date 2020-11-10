package com.didi.hummer.adapter.websocket;

/**
 * WebSocket事件回调
 *
 * Created by XiaoFeng on 2020-01-09.
 */
public interface OnWebSocketEventListener {

    void onOpen();

    void onClose(int code, String reason);

    void onError(String errMsg);

    void onMessage(String data);
}
