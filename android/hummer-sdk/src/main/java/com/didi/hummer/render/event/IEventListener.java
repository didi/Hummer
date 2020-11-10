package com.didi.hummer.render.event;

import com.didi.hummer.core.engine.JSCallback;

public interface IEventListener {

    void addEventListener(String eventName, JSCallback callback);

    void removeEventListener(String eventName, JSCallback callback);

    void clearEventListeners(String eventName);
}
