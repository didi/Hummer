package com.didi.hummer2.core.engine.base;

import com.didi.hummer2.core.engine.JSCallback;
import com.didi.hummer2.core.engine.JSValue;

/**
 * JSValue的对象相关的操作接口类
 *
 * Created by XiaoFeng on 2019-09-25.
 */
public interface IObjectOperator {

    int getInt(String key);

    long getLong(String key);

    double getDouble(String key);

    boolean getBoolean(String key);

    String getString(String key);

    JSValue getJSValue(String key);

    void set(String key, Number value);

    void set(String key, boolean value);

    void set(String key, String value);

    void set(String key, Object value);

    void set(String key, JSValue value);

    void set(String key, JSCallback value);

    Object callFunction(String funcName, Object... params);

}
