package com.didi.hummer2.invoke;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.HummerScriptContext;
import com.didi.hummer2.bridge.JsiValue;

/**
 * didi Create on 2024/4/7 .
 * <p>
 * Copyright (c) 2024/4/7 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/7 5:02 PM
 * @Description 负责Hummer基础数据传输
 */

public class HummerInvoker extends SelfBindInvoker<HummerInvoker> {


    public static final HummerInvoker INSTANCE = new HummerInvoker();


    private HummerInvoker() {

    }

    @Override
    public String getName() {
        return "Hummer";
    }


    @Override
    protected HummerInvoker onCreateInstance(HummerContext hummerContext, Object... params) {
        //没有组件实例
        return new HummerInvoker();
    }

    @Override
    protected Object onInvoke(HummerContext hummerContext, HummerInvoker instance, String methodName, Object... params) {
        HummerScriptContext hummerScriptContext = getHummerScriptContext(hummerContext);
        if (hummerScriptContext != null) {
            if ("getEnv".equals(methodName)) {
                return getEnv(hummerScriptContext);
            }
            if ("getPageInfo".equals(methodName)) {
                return getPageInfo(hummerScriptContext);
            }

            if ("setPageResult".equals(methodName)) {
                return setPageResult(hummerScriptContext, params);
            }
        }
        return null;
    }


    private Object getEnv(HummerScriptContext hummerContext) {
        return hummerContext.getHummerEnv();
    }

    private Object getPageInfo(HummerScriptContext hummerContext) {
        return hummerContext.getPageInfo();
    }

    private Object setPageResult(HummerScriptContext hummerContext, Object[] params) {
        if (params != null && params.length > 0) {
            JsiValue jsiValue = (JsiValue) params[0];
            hummerContext.setPageResult(jsiValue);
        }
        return null;
    }


    private HummerScriptContext getHummerScriptContext(HummerContext hummerContext) {
        if (hummerContext instanceof HummerScriptContext) {
            return (HummerScriptContext) hummerContext;
        }
        return null;
    }
}
