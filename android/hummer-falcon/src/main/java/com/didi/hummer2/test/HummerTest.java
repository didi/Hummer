package com.didi.hummer2.test;


import android.util.Log;

import com.didi.hummer2.bridge.JsiArray;
import com.didi.hummer2.bridge.JsiBoolean;
import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;

import java.util.HashMap;

/**
 * didi Create on 2024/1/4 .
 * <p>
 * Copyright (c) 2024/1/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/1/4 11:00 AM
 * @Description 用一句话说明文件功能
 */

public class HummerTest {

//    private static final String TEXT = "HMString";

    public static void toCreateJavaNumber(double number) {
        int size = (int) number;
        long start, end;
        start = System.currentTimeMillis();
        for (int i = 0; i < number; i++) {
            JsiBoolean value = new JsiBoolean(true);
            JsiNumber hmNumber = new JsiNumber(0);
            JsiObject hmObject = new JsiObject();
        }
        end = System.currentTimeMillis();
        Log.e("Hummer2J", "HummerTest::testCreateValue() use Java [new HMBoolean()] count=" + size + ", time=" + (end - start) + "ms");


        start = System.currentTimeMillis();
        for (int i = 0; i < number; i++) {
            JsiNumber value = new JsiNumber(number);
        }
        end = System.currentTimeMillis();
        Log.e("Hummer2J", "HummerTest::testCreateValue() use Java [new HMNumber()] count=" + size + ", time=" + (end - start) + "ms");


        start = System.currentTimeMillis();
        for (int i = 0; i < number; i++) {
//            String TEXT = "HMString";
//            HMString value = new HMString(TEXT);
            JsiString value2 = new JsiString("HMString");
        }
        end = System.currentTimeMillis();
        Log.e("Hummer2J", "HummerTest::testCreateValue() use Java [new HMString()] count=" + size + ", time=" + (end - start) + "ms");


        start = System.currentTimeMillis();
        for (int i = 0; i < number; i++) {
            JsiObject value = new JsiObject();
        }
        end = System.currentTimeMillis();
        Log.e("Hummer2J", "HummerTest::testCreateValue() use Java [new HMObject()] count=" + size + ", time=" + (end - start) + "ms");


        start = System.currentTimeMillis();
        for (int i = 0; i < number; i++) {
            JsiArray value = new JsiArray();
        }
        end = System.currentTimeMillis();
        Log.e("Hummer2J", "HummerTest::testCreateValue() use Java [new HMArray()] count=" + size + ", time=" + (end - start) + "ms");

        new HummerTest().testCreateJava(size);

    }

    public void testCreateJava(int number) {
        int size = (int) number;
        long start, end;
        start = System.currentTimeMillis();
        for (int i = 0; i < number; i++) {
//            String TEXT = "HMString";
//            HMString value = new HMString(TEXT);
            JsiString value2 = new JsiString("HMString");
        }
        end = System.currentTimeMillis();
        Log.e("Hummer2J", "HummerTest::testCreateValue() use Java [new HMString()] count=" + size + ", time=" + (end - start) + "ms");

    }

    public static void toJavaNumber1(double number) {

    }

    public static void toJavaNumber2(JsiNumber number) {

    }

    public static void toJavaString1(String text) {

//        Object obj = HMGsonUtil.fromJson(text, HashMap.class);
    }

    public static void toJavaString2(JsiString text) {

    }

    public static void toJavaObject1(Object text) {
        if (text instanceof HashMap) {
            String v = ((HashMap<String, String>) text).get("name-key-1");
            v = ((HashMap<String, String>) text).get("name-key-2");
            v = ((HashMap<String, String>) text).get("name-key-3");
            v = ((HashMap<String, String>) text).get("name-key-4");
            v = ((HashMap<String, String>) text).get("name-key-5");
            v = ((HashMap<String, String>) text).get("name-key-6");
            v = ((HashMap<String, String>) text).get("name-key-7");
            v = ((HashMap<String, String>) text).get("name-key-8");
            v = ((HashMap<String, String>) text).get("name-key-9");
            v = ((HashMap<String, String>) text).get("name-key-10");

//            Log.e("TAG", "toJavaObject2() " + v);
        }
    }

    public static void toJavaObject2(Object text) {
        if (text instanceof JsiObject) {
            JsiObject hmObject = (JsiObject) text;

//            HMValue v = hmObject.get("name-key-1");
//            hmObject.get("name-key-2");
//            hmObject.get("name-key-3");
//            hmObject.get("name-key-4");
//            hmObject.get("name-key-5");
//            hmObject.get("name-key-6");
//            hmObject.get("name-key-7");
//            hmObject.get("name-key-8");
//            hmObject.get("name-key-9");
//            hmObject.get("name-key-10");


            String v = hmObject.getString("name-key-1");
            hmObject.getString("name-key-2");
            hmObject.getString("name-key-3");
            hmObject.getString("name-key-4");
            hmObject.getString("name-key-5");
            hmObject.getString("name-key-6");
            hmObject.getString("name-key-7");
            hmObject.getString("name-key-8");
            hmObject.getString("name-key-9");
            hmObject.getString("name-key-10");

//            Log.e("TAG", "toJavaObject2() " + v);
        }

    }
}
