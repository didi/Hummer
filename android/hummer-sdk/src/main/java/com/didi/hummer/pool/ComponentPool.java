package com.didi.hummer.pool;

import com.didi.hummer.lifecycle.IFullLifeCycle;
import com.didi.hummer.lifecycle.ILifeCycle;

import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ComponentPool implements ObjectPool, IFullLifeCycle {

    private ConcurrentHashMap<Long, Object> mInstance =  new ConcurrentHashMap<>();

    @Override
    public void put(long objId, Object value) {
        if (value == null) {
            return;
        }
        mInstance.put(objId, value);
    }

    @Override
    public <T> T get(long objId) {
        return (T) mInstance.get(objId);
    }

    @Override
    public <T> T remove(long objId) {
        return (T)mInstance.remove(objId);
    }

    @Override
    public void onCreate() {

    }

    @Override
    public void onStart() {
        for (Map.Entry<Long, Object> entry : mInstance.entrySet()) {
            Object value = entry.getValue();
            if (value instanceof IFullLifeCycle) {
                ((IFullLifeCycle) value).onStart();
            }
        }
    }

    @Override
    public void onResume() {
        for (Map.Entry<Long, Object> entry : mInstance.entrySet()) {
            Object value = entry.getValue();
            if (value instanceof IFullLifeCycle) {
                ((IFullLifeCycle) value).onResume();
            }
        }
    }

    @Override
    public void onPause() {
        for (Map.Entry<Long, Object> entry : mInstance.entrySet()) {
            Object value = entry.getValue();
            if (value instanceof IFullLifeCycle) {
                ((IFullLifeCycle) value).onPause();
            }
        }
    }

    @Override
    public void onStop() {
        for (Map.Entry<Long, Object> entry : mInstance.entrySet()) {
            Object value = entry.getValue();
            if (value instanceof IFullLifeCycle) {
                ((IFullLifeCycle) value).onStop();
            }
        }
    }

    @Override
    public void onDestroy() {
        Iterator<Map.Entry<Long, Object>> entries = mInstance.entrySet().iterator();
        while (entries.hasNext()) {
            Object value = entries.next().getValue();
            entries.remove();
            if (value instanceof ILifeCycle) {
                ((ILifeCycle) value).onDestroy();
            }
        }
    }
}
