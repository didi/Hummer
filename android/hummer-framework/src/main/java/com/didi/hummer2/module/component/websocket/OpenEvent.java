package com.didi.hummer2.module.component.websocket;

import com.didi.hummer2.render.event.base.Event;

/**
 * didi Create on 2024/4/28 .
 * <p>
 * Copyright (c) 2024/4/28 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/28 5:24 PM
 * @Description 用一句话说明文件功能
 */

public class OpenEvent extends Event {

    public OpenEvent() {
        setType("__onopen__");
        setState(0);
        setTimestamp(System.currentTimeMillis());
    }
}
