package com.didi.hummer2.register;

/**
 * didi Create on 2024/3/21 .
 * <p>
 * Copyright (c) 2024/3/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/21 5:07 PM
 * @Description 用一句话说明文件功能
 */

public class AutoBindHummerRegister implements HummerRegister {

    private static final AutoBindHummerRegister INSTANCE = new AutoBindHummerRegister();

    public static HummerRegister instance() {
        return INSTANCE;
    }
//
//    @Override
//    public void register(HummerContext hummerFalconContext) {
//
//    }


    @Override
    public void register(InvokerRegister invokerRegister) {

    }
}
