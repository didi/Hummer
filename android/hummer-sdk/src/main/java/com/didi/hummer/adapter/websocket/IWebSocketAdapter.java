package com.didi.hummer.adapter.websocket;

/**
 * WebSocket适配器接口
 *
 * Created by XiaoFeng on 2020-01-09.
 */
public interface IWebSocketAdapter {

    /**
     * 连接WebSocket
     *
     * @param url 链接地址
     * @param listener 事件回调
     */
    void connect(String url, OnWebSocketEventListener listener);

    /**
     * 关闭WebSocket
     *
     * @param code
     * @param reason
     */
    void close(int code, String reason);

    /**
     * 销毁WebSocket
     */
    void destroy();

    /**
     * 发送消息
     *
     * @param data
     */
    void send(String data);
}
