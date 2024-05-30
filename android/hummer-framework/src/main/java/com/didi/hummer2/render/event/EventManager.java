package com.didi.hummer2.render.event;

import com.didi.hummer2.engine.JSCallback;
import com.didi.hummer2.render.lifecycle.ILifeCycle;
import com.didi.hummer2.render.event.base.Event;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

public class EventManager implements ILifeCycle, IEventListener {
    public Map<String, List<JSCallback>> mEventListeners;

    @Override
    public void onCreate() {
        mEventListeners = new ConcurrentHashMap<>();
    }

    @Override
    public void onDestroy() {
        if (mEventListeners != null) {
            for (List<JSCallback> callbackList : mEventListeners.values()) {
                if (callbackList != null) {
                    for (JSCallback callback : callbackList) {
                        if (callback != null) {
                            callback.release();
                        }
                    }
                    callbackList.clear();
                }
            }
            mEventListeners.clear();
        }
    }

    @Override
    public void addEventListener(String eventName, JSCallback callback) {
        if (mEventListeners.containsKey(eventName)) {
            List<JSCallback> callbacks = mEventListeners.get(eventName);
            if (callbacks == null) {
                callbacks = new CopyOnWriteArrayList<>();
                callbacks.add(callback);
            } else if (!callbacks.contains(callback)) {
                callbacks.add(callback);
            }
        } else {
            List<JSCallback> callbacks = new CopyOnWriteArrayList<>();
            callbacks.add(callback);
            mEventListeners.put(eventName, callbacks);
        }
    }

    @Override
    public void removeEventListener(String eventName, JSCallback callback) {
        if (!mEventListeners.containsKey(eventName) || callback == null) {
            return;
        }

        List<JSCallback> callbacks = mEventListeners.get(eventName);
        if (callbacks == null) {
            return;
        }

        int index = callbacks.indexOf(callback);
        callback.release();
        if (index >= 0) {
            JSCallback cb = callbacks.get(index);
            if (cb != null) {
                cb.release();
            }
        }
    }

    @Override
    public void clearEventListeners(String eventName) {
        if (!mEventListeners.containsKey(eventName)) {
            return;
        }

        List<JSCallback> callbacks = mEventListeners.get(eventName);
        if (callbacks == null) {
            return;
        }

        for (JSCallback cb : callbacks) {
            if (cb != null) {
                cb.release();
            }
        }
        callbacks.clear();
    }

    public void dispatchEvent(String eventName, Event event) {
        if (!mEventListeners.containsKey(eventName)) {
            return;
        }

        List<JSCallback> callbacks = mEventListeners.get(eventName);
        if (callbacks == null) {
            return;
        }

        for (JSCallback callback : callbacks) {
            callback.call(event);
        }
    }

    public boolean contains(String event) {
        return mEventListeners.containsKey(event);
    }

    public boolean isEmpty() {
        return mEventListeners == null || mEventListeners.isEmpty();
    }
}
