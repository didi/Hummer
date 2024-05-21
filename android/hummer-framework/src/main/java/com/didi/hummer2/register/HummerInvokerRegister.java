package com.didi.hummer2.register;


import com.didi.hummer2.invoke.HummerInvoker;
import com.didi.hummer2.invoke.Invoker;
import com.didi.hummer2.invoke.RenderInvoker;
import com.didi.hummer2.utils.HMLog;

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

    private final List<HummerRegister> hummerRegisters;

    public HummerInvokerRegister(List<HummerRegister> hummerRegisters) {
        super(new HashMap<>());
        this.hummerRegisters = hummerRegisters;

//        for (HummerRegister register : hummerRegisters) {
//            register.register(this);
//        }
    }

    public InvokerRegister newInvokerRegister() {
        return new ContextInvokerRegister(hummerRegisters);
    }

    @Override
    public void registerInvoker(Invoker invoker) {
        //通过此处注册组件无效
        HMLog.w("Hummer-Native", "registerInvoker() is not enable.");
        super.registerInvoker(invoker);
    }

    /**
     * 给每个页面单独创建一个，支持页面级别单独更新组件
     */
    public static class ContextInvokerRegister extends BaseInvokerRegister {

        public ContextInvokerRegister(List<HummerRegister> hummerRegisters) {
            for (HummerRegister register : hummerRegisters) {
                register.register(this);
            }

            //注册必须的Context静态组件
            registerInvoker(RenderInvoker.INSTANCE);
            registerInvoker(HummerInvoker.INSTANCE);
        }
    }


}
