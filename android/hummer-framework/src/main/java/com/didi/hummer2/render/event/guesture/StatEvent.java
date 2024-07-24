package com.didi.hummer2.render.event.guesture;

import com.didi.hummer2.annotation.HMJsiValue;
import com.didi.hummer2.render.event.base.Event;

/**
 * didi Create on 2024/4/26 .
 * <p>
 * Copyright (c) 2024/4/26 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/26 12:04 PM
 * @Description 用一句话说明文件功能
 */

@HMJsiValue
public class StatEvent extends Event {

    private String key;

    public StatEvent() {
    }


    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
