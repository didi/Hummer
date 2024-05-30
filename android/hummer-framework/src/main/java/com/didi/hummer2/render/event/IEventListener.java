package com.didi.hummer2.render.event;


import com.didi.hummer2.engine.JSCallback;

public interface IEventListener {

    void addEventListener(String eventName, JSCallback callback);

    void removeEventListener(String eventName, JSCallback callback);

    void clearEventListeners(String eventName);
}
