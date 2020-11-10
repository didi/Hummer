package com.didi.hummer.pool;

public interface ObjectPool {

    void put(long objId, Object value);

    <T> T get(long objId);

    <T> T remove(long objId);

}