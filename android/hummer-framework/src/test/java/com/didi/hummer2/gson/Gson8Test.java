package com.didi.hummer2.gson;

import com.didi.hummer2.utils.HMGsonUtil;
import com.google.gson.reflect.TypeToken;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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


public class Gson8Test {


    private Map<String, Object> testObject;
    private Map<String, Object> resultObject;
    private Map<String, Object> resultObjectX;

    private List<Object> testList;
    private List<Object> resultList;
    private List<Object> resultListX;

    @Before
    public void setUp() {
        testObject = new HashMap<>();
        testObject.put("i1", 1);
        testObject.put("i2", 2);
        testObject.put("d1", 1.100D);
        testObject.put("d2", 2.222D);
        testObject.put("f1", 2.111F);
        testObject.put("f2", 2.222F);
        testObject.put("L1", 1234567890L);
        testObject.put("L2", 2020202020L);
        testObject.put("L2", "sdsadas");

        testList = new ArrayList<>();
        testList.add(1);
        testList.add(2);
        testList.add(1.100D);
        testList.add(2.222D);
        testList.add(2.111F);
        testList.add(2.222F);
        testList.add(1234567890L);
        testList.add(2020202020L);
    }

    @Test
    public void test1() {
        String jsonText = HMGsonUtil.toJson(testObject);
        System.out.println(jsonText);
        resultObject = HMGsonUtil.fromJson(jsonText, new TypeToken<Map<String, Integer>>() {
        }.getType());

        Assert.assertEquals(resultObject.get("i1"),1L);
        Assert.assertEquals(resultObject.get("i2"),2L);
        Assert.assertEquals(resultObject.get("d1"),1.100D);
        Assert.assertEquals(resultObject.get("d2"),2.222D);
        Assert.assertEquals(resultObject.get("f1"),2.111D);
        Assert.assertEquals(resultObject.get("f2"),2.222D);
        Assert.assertEquals(resultObject.get("L1"),1234567890L);
        Assert.assertEquals(resultObject.get("L2"),2020202020L);

    }

    @Test
    public void test2() {
        String jsonText = HMGsonUtil.toJson(testObject);
        System.out.println(jsonText);
        resultObjectX = HMGsonUtil.fromJson(jsonText, new TypeToken<Map>() {
        }.getType());

        Assert.assertEquals(resultObjectX.get("i1"),1L);
        Assert.assertEquals(resultObjectX.get("i2"),2L);
        Assert.assertEquals(resultObjectX.get("d1"),1.100D);
        Assert.assertEquals(resultObjectX.get("d2"),2.222D);
        Assert.assertEquals(resultObjectX.get("f1"),2.111D);
        Assert.assertEquals(resultObjectX.get("f2"),2.222D);
        Assert.assertEquals(resultObjectX.get("L1"),1234567890L);
        Assert.assertEquals(resultObjectX.get("L2"),2020202020L);
    }

    @Test
    public void test3() {
        String jsonText = HMGsonUtil.toJson(testList);
        System.out.println(jsonText);
        resultList = HMGsonUtil.fromJson(jsonText, new TypeToken<List<Object>>() {
        }.getType());

        Assert.assertEquals(resultList.get(0),1L);
        Assert.assertEquals(resultList.get(1),2L);
        Assert.assertEquals(resultList.get(2),1.100D);
        Assert.assertEquals(resultList.get(3),2.222D);
        Assert.assertEquals(resultList.get(4),2.111D);
        Assert.assertEquals(resultList.get(5),2.222D);
        Assert.assertEquals(resultList.get(6),1234567890L);
        Assert.assertEquals(resultList.get(7),2020202020L);

    }

    @Test
    public void test4() {
        String jsonText = HMGsonUtil.toJson(testList);
        System.out.println(jsonText);
        resultListX = HMGsonUtil.fromJson(jsonText, new TypeToken<List>() {
        }.getType());

        Assert.assertEquals(resultListX.get(0),1L);
        Assert.assertEquals(resultListX.get(1),2L);
        Assert.assertEquals(resultListX.get(2),1.100D);
        Assert.assertEquals(resultListX.get(3),2.222D);
        Assert.assertEquals(resultListX.get(4),2.111D);
        Assert.assertEquals(resultListX.get(5),2.222D);
        Assert.assertEquals(resultListX.get(6),1234567890L);
        Assert.assertEquals(resultListX.get(7),2020202020L);
    }
}
