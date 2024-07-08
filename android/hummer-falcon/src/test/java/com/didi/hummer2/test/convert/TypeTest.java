package com.didi.hummer2.test.convert;

import com.google.gson.reflect.TypeToken;

import org.junit.Test;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Map;

/**
 * didi Create on 2024/7/2 .
 * <p>
 * Copyright (c) 2024/7/2 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/2 9:21 PM
 * @Description 用一句话说明文件功能
 */


public class TypeTest {


    @Test
    public void test() {


        Type type = new TypeToken<Request<Map<String, String>,String>>() {
        }.getType();


        if (type instanceof ParameterizedType) {
            ParameterizedType parameterizedType = (ParameterizedType) type;
            System.out.println("XXX::" + type.getTypeName());
            System.out.println("XXX::" + type.getClass().getSimpleName());
            System.out.println("XXX::getRawType=" + parameterizedType.getRawType().getTypeName());
            System.out.println("XXX::getOwnerType=" + (parameterizedType.getOwnerType() == null ? "" : parameterizedType.getOwnerType().getTypeName()));
            Type[] typeArray = parameterizedType.getActualTypeArguments();
            for (Type t : typeArray) {
                System.out.println("XXX::" + t.getTypeName());
                System.out.println("XXX::" + t.getClass().getSimpleName());
            }
        }

        Class classZ = Request.class;

        Field[] fields = classZ.getDeclaredFields();
        Type tt = fields[0].getType();
    }


}
