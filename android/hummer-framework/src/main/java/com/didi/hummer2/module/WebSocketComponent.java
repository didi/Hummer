package com.didi.hummer2.module;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMAttribute;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.module.component.websocket.WebSocket;


/**
 * didi Create on 2024/4/10 .
 * <p>
 * Copyright (c) 2024/4/10 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/10 3:40 PM
 * @Description WebSocket
 */

@HMComponent("WebSocket")
public class WebSocketComponent extends Component {

    private WebSocket delegate;

    public WebSocketComponent(HummerContext hummerContext) {
        super(hummerContext);
        delegate = new WebSocket("");
    }


    @HMMethod("connect")
    public void connect(String url) {
        delegate.setOnopen(getEventTargetListener());
        delegate.setOnmessage(getEventTargetListener());
        delegate.setOnclose(getEventTargetListener());
        delegate.setOnerror(getEventTargetListener());

        delegate.connect(url);
    }

    @HMMethod("close")
    public void close() {
        delegate.close();
    }

    @HMMethod("send")
    public void send(String text) {
        delegate.send(text);
    }

    @HMMethod("addEventListener")
    public void addEventListener(String eventName) {
        delegate.addEventListener(eventName, getEventTargetListener());
    }

    @HMAttribute("url")
    public String url;

    public void setUrl(String url) {
        delegate.setUrl(url);
    }

    public String getUrl() {
        return delegate.getUrl();
    }


    @Override
    public void onCreate() {
        super.onCreate();
        delegate.onCreate();
    }


    @Override
    public void onDestroy() {
        super.onDestroy();
        delegate.onDestroy();
    }
}

