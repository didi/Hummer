package com.didi.hummer2.test.engine;

/**
 * didi Create on 2024/6/14 .
 * <p>
 * Copyright (c) 2024/6/14 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/6/14 2:55 PM
 * @Description 用一句话说明文件功能
 */

public class TestEngineLoader {


    static {
        System.loadLibrary("hummer2");
        System.loadLibrary("falcon");
        System.loadLibrary("qjs");
        System.loadLibrary("HummerTest");
    }


    public static native void test(String script);

    public static native void testEvaluateJavaScript(String cmd, String script);


}
