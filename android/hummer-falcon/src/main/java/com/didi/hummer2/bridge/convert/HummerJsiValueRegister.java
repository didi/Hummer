package com.didi.hummer2.bridge.convert;

import com.didi.hummer2.bridge.JsiValue;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * didi Create on 2024/7/2 .
 * <p>
 * Copyright (c) 2024/7/2 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/2 5:03 PM
 * @Description HummerJsiValueRegister
 */

public class HummerJsiValueRegister implements JsiValueRegister {


    private final Map<Class, JsiValueAdapter> valueParserMap = new HashMap<>();


    @Override
    public void register(JsiValueAdapter jsiValueAdapter) {
        if (jsiValueAdapter != null) {
            Class classV = getValueClass(jsiValueAdapter);
            if (classV != null) {
                valueParserMap.put(classV, jsiValueAdapter);
            }
        }
    }


    private Class getValueClass(JsiValueAdapter jsiValueAdapter) {
        Class classT = jsiValueAdapter.getJavaClass();
        if (classT != null) {
            return classT;
        }

        Type superclass = jsiValueAdapter.getClass().getGenericSuperclass();
        if (superclass instanceof ParameterizedType) {
            Type valueType = ((ParameterizedType) superclass).getActualTypeArguments()[0];
            if (valueType instanceof ParameterizedType) {
                return (Class) ((ParameterizedType) valueType).getRawType();
            }
            return (Class) valueType;
        }
        return null;
    }

    public Object toJavaValue(ValueParser valueParser, JsiValue jsiValue, Type type) {
        if (jsiValue != null && type != null) {
            JsiValueAdapter parser = searchParser(type);
            if (parser != null) {
                return parser.toJavaValue(valueParser, jsiValue, type);
            }
        }
        return null;
    }

    public JsiValue toJsiValue(ValueParser valueParser, Object value) {
        if (value != null) {
            JsiValueAdapter parser = searchParser(value.getClass());
            return parser.toJsiValue(valueParser, value);
        }
        return null;
    }

    private JsiValueAdapter searchParser(Type type) {
        if (type instanceof ParameterizedType) {
            type = ((ParameterizedType) type).getRawType();
        }
        JsiValueAdapter parser = valueParserMap.get(type);
        if (isInterfaceOfType(type, List.class)) {
            parser = valueParserMap.get(List.class);
        } else if (isInterfaceOfType(type, Map.class)) {
            parser = valueParserMap.get(Map.class);
        }
        return parser;
    }

    private boolean isInterfaceOfType(Type type, Class classT) {
        if (type instanceof Class) {
            Class[] interfaces = ((Class<?>) type).getInterfaces();
            if (interfaces != null) {
                for (Class classZ : interfaces) {
                    if (classZ == classT) {
                        return true;
                    }
                }
            }
            Class supperClassZ = ((Class<?>) type).getSuperclass();
            if (supperClassZ != null) {
                return isInterfaceOfType(supperClassZ, classT);
            }
        }
        return false;
    }


}
