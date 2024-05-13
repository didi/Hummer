package com.didi.hummer2.register;


import java.util.HashMap;
import java.util.List;

/**
 * didi Create on 2024/3/27 .
 * <p>
 * Copyright (c) 2024/3/27 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/27 5:51 PM
 * @Description 用一句话说明文件功能
 */

public class HummerInvokerRegister extends BaseInvokerRegister {

    private List<HummerRegister> hummerRegisters;

    public HummerInvokerRegister(List<HummerRegister> hummerRegisters) {
        super(new HashMap<>());

        this.hummerRegisters = hummerRegisters;

        for (HummerRegister register : hummerRegisters) {
            register.register(this);
        }
    }


}
