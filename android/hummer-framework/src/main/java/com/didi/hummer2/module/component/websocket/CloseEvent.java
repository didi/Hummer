package com.didi.hummer2.module.component.websocket;

import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.render.event.base.Event;

/**
 * didi Create on 2024/4/28 .
 * <p>
 * Copyright (c) 2024/4/28 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/28 5:18 PM
 * @Description 用一句话说明文件功能
 */

public class CloseEvent extends Event {

    private int code;
    private String reason;

    public CloseEvent(int code, String reason) {
        this.code = code;
        this.reason = reason;
        setType("__onclose__");
        setState(0);
        setTimestamp(System.currentTimeMillis());
    }

    @Override
    public JsiObject toJsiValue() {
        JsiObject closeEvent = super.toJsiValue();
        closeEvent.put("code", new JsiNumber(code));
        closeEvent.put("reason", new JsiString(reason));
        return closeEvent;
    }
}
