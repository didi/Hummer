package com.didi.hummer2.adapter.memory.iml;


import com.didi.hummer2.adapter.memory.IMemoryAdapter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 存储适配器适配器
 * <p>
 * Created by XiaoFeng on 2019-12-24.
 */
public class DefaultMemoryAdapter implements IMemoryAdapter {

    private Map<String, Object> memoryStoreMap = new ConcurrentHashMap<>();

    private String namespace = "";

    @Override
    public void setNamespace(String namespace) {
        this.namespace = namespace;
    }

    @Override
    public void set(String key, Object value) {
        set(namespace, key, value);
    }

    @Override
    public Object get(String key) {
        return get(namespace, key);
    }

    @Override
    public void remove(String key) {
        remove(namespace, key);
    }

    @Override
    public void removeAll() {
        removeAll(namespace);
    }

    @Override
    public Map<String, Object> getAll() {
        return getAll(namespace);
    }

    @Override
    public List<String> allKeys() {
        return allKeys(namespace);
    }

    @Override
    public boolean exist(String key) {
        return exist(namespace, key);
    }

    private void set(String namespace, String key, Object value) {
        memoryStoreMap.put(key, value);
    }

    private Object get(String namespace, String key) {
        return memoryStoreMap.get(key);
    }

    private void remove(String namespace, String key) {
        memoryStoreMap.remove(key);
    }

    private void removeAll(String namespace) {
        memoryStoreMap.clear();
    }

    private Map<String, Object> getAll(String namespace) {
        return new HashMap<>(memoryStoreMap);
    }

    private List<String> allKeys(String namespace) {
        return new ArrayList<>(memoryStoreMap.keySet());
    }

    private boolean exist(String namespace, String key) {
        return memoryStoreMap.containsKey(key);
    }
}
