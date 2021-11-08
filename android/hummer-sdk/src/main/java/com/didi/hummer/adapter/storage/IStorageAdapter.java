package com.didi.hummer.adapter.storage;

import java.util.List;
import java.util.Map;

/**
 * 存储适配器适配器
 *
 * Created by XiaoFeng on 2019-12-24.
 */
public interface IStorageAdapter {

    void setNamespace(String namespace);

    void set(String key, Object value);

    Object get(String key);

    void remove(String key);

    void removeAll();

    Map<String, Object> getAll();

    List<String> allKeys();

    boolean exist(String key);
}
