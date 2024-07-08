package com.didi.hummer2.parser;

import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.bridge.convert.HummerJsiValueRegister;
import com.didi.hummer2.bridge.convert.HummerParser;
import com.didi.hummer2.module.RequestFalcon;
import com.didi.hummer2.module.RequestFalcon$$JsiValueAdapter;
import com.google.gson.reflect.TypeToken;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * didi Create on 2024/7/8 .
 * <p>
 * Copyright (c) 2024/7/8 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/8 11:55 AM
 * @Description 用一句话说明文件功能
 */

public class RequestFalconTest {


    private HummerParser hummerParser;
    private HummerJsiValueRegister register;

    @Before
    public void setUp() {
        register = new HummerJsiValueRegister();
        register.register(new RequestFalcon$$JsiValueAdapter());
        hummerParser = new HummerParser(new JsiValueBuilderX(), register);
    }


    @Test
    public void test() {


        RequestFalcon<String, String, Long> requestFalconX = new RequestFalcon<>();

        requestFalconX.url = "url";
        requestFalconX.name = "name";
        requestFalconX.namespace = "namespace";
        requestFalconX.owner = "owner";
        requestFalconX.data = "data";
        requestFalconX.d1 = new ArrayList<>();
        ((ArrayList) requestFalconX.d1).add(1);
        requestFalconX.d2 = new ArrayList<>();
        ((ArrayList) requestFalconX.d2).add("d2");
        requestFalconX.d3 = new ArrayList<>();
        ((ArrayList) requestFalconX.d3).add("d3");
        requestFalconX.dd = new ArrayList<>();
        ((ArrayList) requestFalconX.dd).add("dd");
        requestFalconX.tt = new HashMap<>();
        requestFalconX.tt.put("key", "tt");
        requestFalconX.DX = new HashMap<>();
        Map<String, Long> p = new HashMap<>();
        p.put("subDX", 100L);
        requestFalconX.DX.put("key", p);


        JsiValue jsiValue = hummerParser.toJsiValue(requestFalconX);


        RequestFalcon xx = hummerParser.toJavaValue((JsiValue) jsiValue, new TypeToken<RequestFalcon<String, String, Long>>() {
        }.getType());

        Assert.assertNotNull(xx);
    }

}
