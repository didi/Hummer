package com.didi.hummer2.component;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.bridge.EventTarget;
import com.didi.hummer2.bridge.JsiFunction;
import com.didi.hummer2.engine.JSCallback;
import com.didi.hummer2.invoke.BaseInvoker;
import com.didi.hummer2.invoke.Invoker;
import com.didi.hummer2.render.event.base.Event;

import java.util.Map;

/**
 * didi Create on 2024/4/2 .
 * <p>
 * Copyright (c) 2024/4/2 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/2 4:09 PM
 * @Description 用一句话说明文件功能
 */

public class Component extends AbsHummerObject {

    protected EventTarget eventTarget;
    protected HummerContext hummerContext;

    protected EventDispatcher eventDispatcher = new EventDispatcher();


    public Component(HummerContext hummerContext) {
        this.hummerContext = hummerContext;
    }

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


    @HMMethod("setAttributes")
    public void setAttributes(Map<String, Object> attributes) {
        Invoker invoker = getInvoker();
        if (invoker instanceof BaseInvoker && attributes != null && attributes.size() > 0) {
            for (Map.Entry<String, Object> entry : attributes.entrySet()) {
                onUpdateAttribute((BaseInvoker) invoker, entry.getKey(), entry.getValue());
            }
        }
        onAttributesUpdated();
    }

    protected void onUpdateAttribute(BaseInvoker invoker, String attributeName, Object value) {
        invoker.onUpdateAttribute(hummerContext, this, attributeName, value);
    }


    protected void onAttributesUpdated() {

    }

    protected void dispatchEvent(String eventName, Object event) {
        eventDispatcher.dispatchEvent(eventName, event);
    }

    protected JSCallback getEventTargetListener() {
        if (eventTarget != null) {
            return new EventListenerCallback(eventTarget.getJsiFunction());
        }
        return null;
    }

    protected JSCallback getCallback(JsiFunction jsiFunction) {
        if (jsiFunction != null) {
            return new EventListenerCallback(jsiFunction);
        }
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }


    @Override
    public void onDestroy() {
        super.onDestroy();
    }
}
