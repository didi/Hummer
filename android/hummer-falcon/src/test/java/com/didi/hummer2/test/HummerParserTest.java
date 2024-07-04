package com.didi.hummer2.test;

import com.didi.hummer2.bridge.JsiArray;
import com.didi.hummer2.bridge.JsiBoolean;
import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.bridge.convert.HummerJsiValueRegister;
import com.didi.hummer2.bridge.convert.HummerParser;
import com.didi.hummer2.test.convert.JsiValueBuilderX;
import com.didi.hummer2.test.convert.Request;
import com.didi.hummer2.test.convert.Request$$JsiValueParser;
import com.didi.hummer2.utils.F4NGsonUtil;
import com.google.gson.reflect.TypeToken;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * didi Create on 2024/7/3 .
 * <p>
 * Copyright (c) 2024/7/3 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/3 4:56 PM
 * @Description 用一句话说明文件功能
 */

public class HummerParserTest {

    private HummerParser hummerParser;
    private HummerJsiValueRegister register;

    @Before
    public void setUp() {
        register = new HummerJsiValueRegister();
        register.register(new Request$$JsiValueParser());
        hummerParser = new HummerParser(new JsiValueBuilderX(), register);
    }


    @Test
    public void testRequestParser() {
        Request<List<String>, Map<String, Object>> request = new Request<>();

        request.url = "http://test.com";
        request.headers = new HashMap<>();
        request.headers.put("header", "testH");
        request.headers.put("name", "nameValue");
        request.data = new ArrayList<>();
        request.data.add("e1");
        request.data.add("e2");
        request.data.add("e3");
        request.web = new HashMap<>();
        request.web.put("n1", 1);
        request.web.put("n2", 1.2d);
        request.web.put("s1", "");
        request.web.put("s2", "name2");

        JsiValue jsiValue = hummerParser.toJsiValue(request);

        Assert.assertNotNull(jsiValue);
        Assert.assertEquals(((JsiObject) jsiValue).keys().size(), 4);

        String reqJson = F4NGsonUtil.toJson(request);
        String jsiJson = jsiValue.toString();

        Type type = new TypeToken<Request<List<String>, Map<String, Object>>>() {
        }.getType();
        Type tType = new TypeToken<Map<String, Object>>() {
        }.getType();

        Request jsireq = hummerParser.toJavaValue(jsiValue, type);
        Object jsireq2 = hummerParser.toJavaValue(jsiValue, Map.class);

        //request->转string转map用于比较
        Object req = F4NGsonUtil.fromJson(reqJson, tType);
        //request转jsi->转string转map用于比较
        Object reqjsi = F4NGsonUtil.fromJson(jsiJson, tType);
        //request转jsi转request->转string转map用于比较
        Object reqjsiO = F4NGsonUtil.fromJson(F4NGsonUtil.toJson(jsireq), tType);
        Object reqjsi2O = F4NGsonUtil.fromJson(F4NGsonUtil.toJson(jsireq2), tType);

        Assert.assertEquals(req, reqjsi);
        Assert.assertEquals(req, reqjsiO);
        Assert.assertEquals(req, reqjsi2O);
    }


    @Test
    public void testToJsi() {
        Map<String, Object> map = new HashMap<>();
        map.put("b1", false);
        map.put("b2", true);
        map.put("s1", "");
        map.put("s2", "name2");
        map.put("n1", 1);
        map.put("n2", 1.2d);

        List<Object> list1 = new ArrayList<>();
        list1.add("");
        list1.add("name2");

        List<Object> list2 = new ArrayList<>();
        list2.add(1);
        list2.add(1.2d);

        map.put("list1", list1);
        map.put("list2", list2);

        Object result = hummerParser.toJsiValue(map);

        Assert.assertNotNull(result);
        Assert.assertEquals(((JsiObject) result).keys().size(), 8);

        Assert.assertEquals(((JsiBoolean) ((JsiObject) result).get("b1")).getValue(), false);
        Assert.assertEquals(((JsiBoolean) ((JsiObject) result).get("b2")).getValue(), true);
        Assert.assertEquals(((JsiString) ((JsiObject) result).get("s1")).getValue(), "");
        Assert.assertEquals(((JsiString) ((JsiObject) result).get("s2")).getValue(), "name2");
        Assert.assertEquals(((JsiNumber) ((JsiObject) result).get("n1")).valueLong(), 1L);
        Assert.assertEquals(((JsiNumber) ((JsiObject) result).get("n2")).valueDouble(), (Object) 1.2d);
    }


    @Test
    public void testSimpleListMapData() {
        JsiArray jsiObject = new JsiArray();
        jsiObject.push(new JsiBoolean(false));
        jsiObject.push(new JsiBoolean(true));
        jsiObject.push(new JsiString(""));
        jsiObject.push(new JsiString("name2"));
        jsiObject.push(new JsiNumber(1));
        jsiObject.push(new JsiNumber(1.2d));

        JsiObject sub1 = new JsiObject();
        sub1.put("s1", new JsiString(""));
        sub1.put("s2", new JsiString("name2"));
        JsiObject sub2 = new JsiObject();
        sub2.put("n1", new JsiNumber(1));
        sub2.put("n2", new JsiNumber(1.2d));
        jsiObject.push(sub1);
        jsiObject.push(sub2);

        List<Object> result;

        result = hummerParser.toJavaValue(jsiObject, null);
        Assert.assertNotNull(result);
        Assert.assertEquals(result.size(), 8);
        Assert.assertEquals(result.get(0), false);
        Assert.assertEquals(result.get(1), true);
        Assert.assertEquals(result.get(2), "");
        Assert.assertEquals(result.get(3), "name2");
        Assert.assertEquals(result.get(4), 1L);
        Assert.assertEquals(result.get(5), 1.2d);

        Assert.assertNotNull(result.get(6));
        Assert.assertEquals(((Map) result.get(6)).get("s1"), "");
        Assert.assertEquals(((Map) result.get(6)).get("s2"), "name2");

        Assert.assertNotNull(result.get(7));
        Assert.assertEquals(((Map) result.get(7)).get("n1"), 1L);
        Assert.assertEquals(((Map) result.get(7)).get("n2"), 1.2d);

    }


    @Test
    public void testSimpleMapListData() {

        JsiArray list1 = new JsiArray();
        list1.push(new JsiBoolean(false));
        list1.push(new JsiBoolean(true));
        list1.push(new JsiString(""));
        list1.push(new JsiString("name2"));
        list1.push(new JsiNumber(1));
        list1.push(new JsiNumber(1.2d));

        JsiArray list2 = new JsiArray();
        list2.push(new JsiBoolean(false));
        list2.push(new JsiBoolean(true));
        list2.push(new JsiString(""));
        list2.push(new JsiString("name2"));
        list2.push(new JsiNumber(1));
        list2.push(new JsiNumber(1.2d));

        JsiObject jsiObject = new JsiObject();
        jsiObject.put("b1", new JsiBoolean(false));
        jsiObject.put("b2", new JsiBoolean(true));
        jsiObject.put("s1", new JsiString(""));
        jsiObject.put("s2", new JsiString("name2"));
        jsiObject.put("n1", new JsiNumber(1));
        jsiObject.put("n2", new JsiNumber(1.2d));

        jsiObject.put("list1", list1);
        jsiObject.put("list2", list2);

        Map<String, Object> result;

        result = hummerParser.toJavaValue(jsiObject, null);

        Assert.assertNotNull(result);
        Assert.assertEquals(result.size(), 8);

        Assert.assertEquals(result.get("b1"), false);
        Assert.assertEquals(result.get("b2"), true);
        Assert.assertEquals(result.get("s1"), "");
        Assert.assertEquals(result.get("s2"), "name2");
        Assert.assertEquals(result.get("n1"), 1L);
        Assert.assertEquals(result.get("n2"), 1.2d);

        Assert.assertNotNull(result.get("list1"));
        Assert.assertEquals(((List) result.get("list1")).get(0), false);
        Assert.assertEquals(((List) result.get("list1")).get(1), true);
        Assert.assertEquals(((List) result.get("list1")).get(2), "");
        Assert.assertEquals(((List) result.get("list1")).get(3), "name2");
        Assert.assertEquals(((List) result.get("list1")).get(4), 1L);
        Assert.assertEquals(((List) result.get("list1")).get(5), 1.2d);

        Assert.assertNotNull(result.get("list2"));
        Assert.assertEquals(((List) result.get("list2")).get(0), false);
        Assert.assertEquals(((List) result.get("list2")).get(1), true);
        Assert.assertEquals(((List) result.get("list2")).get(2), "");
        Assert.assertEquals(((List) result.get("list2")).get(3), "name2");
        Assert.assertEquals(((List) result.get("list2")).get(4), 1L);
        Assert.assertEquals(((List) result.get("list2")).get(5), 1.2d);

    }


    @Test
    public void testSimpleListData() {
        JsiArray jsiObject = new JsiArray();
        jsiObject.push(new JsiBoolean(false));
        jsiObject.push(new JsiBoolean(true));
        jsiObject.push(new JsiString(""));
        jsiObject.push(new JsiString("name2"));
        jsiObject.push(new JsiNumber(1));
        jsiObject.push(new JsiNumber(1.2d));

        List<Object> result;

        result = hummerParser.toJavaValue(jsiObject, null);
        Assert.assertNotNull(result);
        Assert.assertEquals(result.size(), 6);
        Assert.assertEquals(result.get(0), false);
        Assert.assertEquals(result.get(1), true);
        Assert.assertEquals(result.get(2), "");
        Assert.assertEquals(result.get(3), "name2");
        Assert.assertEquals(result.get(4), 1L);
        Assert.assertEquals(result.get(5), 1.2d);

        result = hummerParser.toJavaValue(jsiObject, Object.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(result.size(), 6);
        Assert.assertEquals(result.get(0), false);
        Assert.assertEquals(result.get(1), true);
        Assert.assertEquals(result.get(2), "");
        Assert.assertEquals(result.get(3), "name2");
        Assert.assertEquals(result.get(4), 1L);
        Assert.assertEquals(result.get(5), 1.2d);

        result = hummerParser.toJavaValue(jsiObject, List.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(result.size(), 6);
        Assert.assertEquals(result.get(0), false);
        Assert.assertEquals(result.get(1), true);
        Assert.assertEquals(result.get(2), "");
        Assert.assertEquals(result.get(3), "name2");
        Assert.assertEquals(result.get(4), 1L);
        Assert.assertEquals(result.get(5), 1.2d);


        result = hummerParser.toJavaValue(jsiObject, new TypeToken<List<String>>() {
        }.getType());
        Assert.assertNotNull(result);
        Assert.assertEquals(result.size(), 6);
        Assert.assertEquals(result.get(0), null);
        Assert.assertEquals(result.get(1), null);
        Assert.assertEquals(result.get(2), "");
        Assert.assertEquals(result.get(3), "name2");
        Assert.assertEquals(result.get(4), null);
        Assert.assertEquals(result.get(5), null);


    }

    @Test
    public void testSimpleMapData() {

        JsiObject jsiObject = new JsiObject();
        jsiObject.put("b1", new JsiBoolean(false));
        jsiObject.put("b2", new JsiBoolean(true));
        jsiObject.put("s1", new JsiString(""));
        jsiObject.put("s2", new JsiString("name2"));
        jsiObject.put("n1", new JsiNumber(1));
        jsiObject.put("n2", new JsiNumber(1.2d));

        Map<String, Object> result;


        result = hummerParser.toJavaValue(jsiObject, null);

        Assert.assertNotNull(result);
        Assert.assertEquals(result.size(), 6);
        Assert.assertEquals(result.get("b1"), false);
        Assert.assertEquals(result.get("b2"), true);
        Assert.assertEquals(result.get("s1"), "");
        Assert.assertEquals(result.get("s2"), "name2");
        Assert.assertEquals(result.get("n1"), 1L);
        Assert.assertEquals(result.get("n2"), 1.2d);


        result = hummerParser.toJavaValue(jsiObject, Map.class);

        Assert.assertNotNull(result);
        Assert.assertEquals(result.size(), 6);
        Assert.assertEquals(result.get("b1"), false);
        Assert.assertEquals(result.get("b2"), true);
        Assert.assertEquals(result.get("s1"), "");
        Assert.assertEquals(result.get("s2"), "name2");
        Assert.assertEquals(result.get("n1"), 1L);
        Assert.assertEquals(result.get("n2"), 1.2d);


        result = hummerParser.toJavaValue(jsiObject, new TypeToken<Map<String, Object>>() {
        }.getType());

        Assert.assertNotNull(result);
        Assert.assertEquals(result.size(), 6);
        Assert.assertEquals(result.get("b1"), false);
        Assert.assertEquals(result.get("b2"), true);
        Assert.assertEquals(result.get("s1"), "");
        Assert.assertEquals(result.get("s2"), "name2");
        Assert.assertEquals(result.get("n1"), 1L);
        Assert.assertEquals(result.get("n2"), 1.2d);


        result = hummerParser.toJavaValue(jsiObject, new TypeToken<Map<String, Boolean>>() {
        }.getType());

        Assert.assertNotNull(result);
        Assert.assertEquals(result.size(), 6);
        Assert.assertEquals(result.get("b1"), false);
        Assert.assertEquals(result.get("b2"), true);
        Assert.assertEquals(result.get("s1"), false);
        Assert.assertEquals(result.get("s2"), false);
        Assert.assertEquals(result.get("n1"), false);
        Assert.assertEquals(result.get("n2"), false);


        result = hummerParser.toJavaValue(jsiObject, new TypeToken<Map<String, Integer>>() {
        }.getType());

        Assert.assertNotNull(result);
        Assert.assertEquals(result.size(), 6);
        Assert.assertEquals(result.get("b1"), 0L);
        Assert.assertEquals(result.get("b2"), 0L);
        Assert.assertEquals(result.get("s1"), 0L);
        Assert.assertEquals(result.get("s2"), 0L);
        Assert.assertEquals(result.get("n1"), 1L);
        Assert.assertEquals(result.get("n2"), 1L);

        result = hummerParser.toJavaValue(jsiObject, new TypeToken<Map<String, Long>>() {
        }.getType());

        Assert.assertNotNull(result);
        Assert.assertEquals(result.size(), 6);
        Assert.assertEquals(result.get("b1"), 0L);
        Assert.assertEquals(result.get("b2"), 0L);
        Assert.assertEquals(result.get("s1"), 0L);
        Assert.assertEquals(result.get("s2"), 0L);
        Assert.assertEquals(result.get("n1"), 1L);
        Assert.assertEquals(result.get("n2"), 1L);

        result = hummerParser.toJavaValue(jsiObject, new TypeToken<Map<String, Double>>() {
        }.getType());

        Assert.assertNotNull(result);
        Assert.assertEquals(result.size(), 6);
        Assert.assertEquals(result.get("b1"), 0D);
        Assert.assertEquals(result.get("b2"), 0D);
        Assert.assertEquals(result.get("s1"), 0D);
        Assert.assertEquals(result.get("s2"), 0D);
        Assert.assertEquals(result.get("n1"), 1.0D);
        Assert.assertEquals(result.get("n2"), 1.2D);


        result = hummerParser.toJavaValue(jsiObject, new TypeToken<Map<String, String>>() {
        }.getType());

        Assert.assertNotNull(result);
        Assert.assertEquals(result.size(), 6);
        Assert.assertEquals(result.get("b1"), null);
        Assert.assertEquals(result.get("b2"), null);
        Assert.assertEquals(result.get("s1"), "");
        Assert.assertEquals(result.get("s2"), "name2");
        Assert.assertEquals(result.get("n1"), null);
        Assert.assertEquals(result.get("n2"), null);


    }
}
