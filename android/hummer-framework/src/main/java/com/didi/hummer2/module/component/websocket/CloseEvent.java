package com.didi.hummer2.module.component.websocket;

import com.didi.hummer2.annotation.HMJsiValue;
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
@HMJsiValue
public class CloseEvent extends Event {


    public static final String TYPE_ON_CLOSE = "__onclose__";
    private int code;
    private String reason;


    public CloseEvent() {
        setType(TYPE_ON_CLOSE);
    }

    public CloseEvent(int code, String reason) {
        this.code = code;
        this.reason = reason;
        setType(TYPE_ON_CLOSE);
        setState(0);
        setTimestamp(System.currentTimeMillis());
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    @Override
    public JsiObject toJsiValue() {
        JsiObject closeEvent = super.toJsiValue();
        closeEvent.put("code", new JsiNumber(code));
        closeEvent.put("reason", new JsiString(reason));
        return closeEvent;
    }
}
