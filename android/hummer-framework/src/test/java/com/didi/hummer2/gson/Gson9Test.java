package com.didi.hummer2.gson;

import com.didi.hummer2.utils.F4NGsonUtil;
import com.google.gson.reflect.TypeToken;

import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

/**
 * didi Create on 2024/5/31 .
 * <p>
 * Copyright (c) 2024/5/31 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/5/31 4:40 PM
 * @Description 用一句话说明文件功能
 */


public class Gson9Test {


    private Map<String, Object> testObject;
    private Map<String, Object> resultObject;

    @Before
    public void setUp() {
        testObject = new HashMap<>();
        testObject.put("i1",1);
        testObject.put("i2",2);
//        testObject.put("d1",1.100D);
//        testObject.put("d2",2.222D);
//        testObject.put("f1",2.222F);
//        testObject.put("f2",2.222F);
//        testObject.put("L1",1234567890L);
//        testObject.put("L2",2020202020L);
    }

    @Test
    public void test() {
        String jsonText = F4NGsonUtil.toJson(testObject);
        System.out.println(jsonText);
        resultObject = F4NGsonUtil.fromJson(jsonText, new TypeToken<Map<String, Object>>() {
        }.getType());

    }
}
