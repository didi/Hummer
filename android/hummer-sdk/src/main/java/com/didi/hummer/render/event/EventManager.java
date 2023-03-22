package com.didi.hummer.render.event;

import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.render.event.base.Event;
import com.didi.hummer.lifecycle.ILifeCycle;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class EventManager implements ILifeCycle, IEventListener {
    public HashMap<String, List<JSCallback>> mEventListeners;

    @Override
    public void onCreate() {
        mEventListeners = new HashMap<>();
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

            if (callbacks.contains(callback)) {
                return;
            }

            callbacks.add(callback);
        } else {
            List<JSCallback> callbacks = new ArrayList<>();

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

        JSCallback cbToRemove = null;
        for (JSCallback cb : callbacks) {
            if (cb != null && cb.equals(callback)) {
                cb.release();
                callback.release();
                cbToRemove = callback;
                break;
            }
        }

        if (cbToRemove != null) {
            callbacks.remove(cbToRemove);
        }
    }

    @Override
    public void clearEventListeners(String eventName) {
        if (!mEventListeners.containsKey(eventName)) {
            return;
        }

        List<JSCallback> callbacks = mEventListeners.get(eventName);
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
