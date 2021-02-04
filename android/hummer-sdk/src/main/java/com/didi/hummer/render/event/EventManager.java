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
                    // 当JSCallback正在被调用的生命周期中，触发了控件回收时，也会到这里onDestroy中，这时不该被释放，会有野指针问题，
                    // 所以在onDestroy暂时不做callback.release()了，统一在系统GC时自动触发JSCallback的release
//                    for (JSCallback callback : callbackList) {
//                        if (callback != null) {
//                            callback.release();
//                        }
//                    }
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
                cbToRemove = cb;
                break;
            }
        }

        if (cbToRemove != null) {
            cbToRemove.release();
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
