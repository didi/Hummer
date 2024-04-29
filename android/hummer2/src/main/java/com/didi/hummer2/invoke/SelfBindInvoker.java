package com.didi.hummer2.invoke;

import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.bridge.EventTarget;
import com.didi.hummer2.component.EventDispatcher;
import com.didi.hummer2.register.HummerObject;
import com.didi.hummer2.render.event.base.Event;

/**
 * didi Create on 2024/4/7 .
 * <p>
 * Copyright (c) 2024/4/7 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/7 5:02 PM
 * @Description 支持绑定实例
 */

public abstract class SelfBindInvoker<T extends HummerObject> extends SelfBindStaticInvoker<T> {


    protected EventTarget eventTarget;

    protected EventDispatcher eventDispatcher = new EventDispatcher();


    @HMMethod("setEventTarget")
    public void setEventTarget(EventTarget eventTarget) {
        this.eventTarget = eventTarget;
        this.eventDispatcher.setEventTarget(eventTarget);
    }


    @HMMethod("addEventListener")
    public void addEventListener(String eventName) {
        eventDispatcher.addEventListener(eventName);
    }

    @HMMethod("removeEventListener")
    public void removeEventListener(String eventName) {
        eventDispatcher.removeEventListener(eventName);
    }

    /**
     * 分发监听的事件
     *
     * @param event
     */
    public void dispatchEvent(Event event) {
        if (eventDispatcher != null) {
            eventDispatcher.dispatchEvent(event.getType(), event.toJsiValue());
        }
    }

    /**
     * 直接分发事件，即时未设置监听
     *
     * @param event
     */
    public void directDispatchEvent(Event event) {
        if (eventTarget != null && event != null) {
            eventTarget.dispatchEvent(event.getType(), event.toJsiValue());
        }
    }
}
