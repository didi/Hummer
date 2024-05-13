package com.didi.hummer2.debug;

/**
 * didi Create on 2023/3/7 .
 * <p>
 * Copyright (c) 2023/3/7 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/3/7 5:06 下午
 * @Description HummerInvokerAnalyzerFactory
 */

public class HummerInvokerAnalyzerFactory {

    private static InvokerAnalyzerFactory factory;


    public static InvokerAnalyzer create() {
        if (factory != null) {
            return factory.create();
        }
        return null;
    }

    public static void setFactory(InvokerAnalyzerFactory factory) {
        HummerInvokerAnalyzerFactory.factory = factory;
    }
}
