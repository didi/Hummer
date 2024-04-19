package com.didi.hummer2.component;

import com.didi.hummer2.bridge.EventTarget;

import java.util.HashSet;
import java.util.Set;

/**
 * didi Create on 2024/4/17 .
 * <p>
 * Copyright (c) 2024/4/17 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/17 6:05 PM
 * @Description EventDispatcher
 */

public class EventDispatcher {


    protected EventTarget eventTarget;

    protected Set<String> eventNames = new HashSet<>();

    public EventDispatcher() {
    }

    public void addEventListener(String eventName) {
        eventNames.add(eventName);
    }

    public void removeEventListener(String eventName) {
        eventNames.remove(eventName);
    }


    public void setEventTarget(EventTarget eventTarget) {
        this.eventTarget = eventTarget;
    }

    protected void dispatchEvent(String eventName, Object event) {
        if (eventTarget != null && eventNames.contains(eventName)) {
            eventTarget.dispatchEvent(eventName, event);
        }
    }
}
