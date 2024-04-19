package com.didi.hummer2.component;

import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.bridge.EventTarget;
import com.didi.hummer2.engine.JSCallback;

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

    protected void dispatchEvent(String eventName, Object event) {
        eventDispatcher.dispatchEvent(eventName, event);
    }

    protected JSCallback getEventTargetListener() {
        return new EventListenerCallback(eventTarget.getJsiFunction());
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
