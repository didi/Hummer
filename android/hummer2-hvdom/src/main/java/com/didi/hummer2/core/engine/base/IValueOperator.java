package com.didi.hummer2.core.engine.base;

import java.lang.reflect.Type;

/**
 * JSValue的值相关的操作接口类
 *
 * Created by XiaoFeng on 2019-10-11.
 */
public interface IValueOperator {

    int intValue();

    long longValue();

    float floatValue();

    double doubleValue();

    boolean booleanValue();

    String stringValue();

    <T> T jsonValueOf(Type type);

    boolean isNumber();

    boolean isBoolean();

    boolean isString();

    boolean isFunction();

    boolean isNull();

    void protect();

    void unprotect();
}
