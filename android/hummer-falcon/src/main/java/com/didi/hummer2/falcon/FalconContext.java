package com.didi.hummer2.falcon;


import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.register.InvokerRegister;
import com.didi.hummer2.exception.JSException;
import com.didi.hummer2.invoke.Invoker;
import com.didi.hummer2.handler.EventTraceHandler;
import com.didi.hummer2.handler.JsConsoleHandler;
import com.didi.hummer2.handler.JsExceptionHandler;
import com.didi.hummer2.handler.LogHandler;
import com.didi.hummer2.utils.FAObjectUtil;
import com.google.gson.reflect.TypeToken;

import java.util.Map;


/**
 * didi Create on 2023/11/27 .
 * <p>
 * Copyright (c) 2023/11/27 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/27 5:02 下午
 * @Description Falcon引擎上下文，与引擎直接交互
 */

public class FalconContext {

    private long identify;


    /**
     * invoker注册器
     */
    private InvokerRegister invokerRegister;


    /**
     * 命名空间：namespace
     */
    private String namespace;

    /**
     * falcon引擎配置
     */
    private ConfigOption configOption;
    /**
     * JS引擎类型
     * 暂时无实际用处
     */
    private HMEngineType engineType;
    /**
     * 异常处理
     */
    private JsExceptionHandler jsExceptionHandler;

    /**
     * JS日志，不使用组件，保证在js代码执行的第一时间可以输出日志
     */
    private JsConsoleHandler jsConsoleHandler;

    /**
     * 埋点事件处理器
     */
    private EventTraceHandler eventTraceHandler;

    /**
     * 普通日志:引起本身日志输出
     */
    private LogHandler logHandler;

    public FalconContext() {
        FalconEngine.createEngine();
        identify = FalconEngine.createFalconContext();
        invokerRegister = null;
    }

    public void bindVdomContext(String namespace, ConfigOption configOption) {
        this.namespace = namespace;
        this.configOption = configOption;
        FalconEngine.bindFalconContext(identify, this, configOption);
    }

    public Object evaluateJavaScript(String script, String scriptId) {
        return FalconEngine.evaluateJavaScript(identify, script, scriptId);
    }

    public Object evaluateBytecode(byte[] script, String scriptId) {
        return FalconEngine.evaluateBytecode(identify, script, scriptId);
    }


    public Object invoke(long type, long objId, long methodType, String componentName, String methodName, int argc, JsiValue[] value) {
        Object result = invokerRegister.invoke(null, null, type, objId, methodType, componentName, methodName, argc, value);
        if (result != null) {
            JsiValue jsiValue = FAObjectUtil.toJsiValue(result);
            return jsiValue;
        }
        return null;
    }

    public void setInvokerRegister(InvokerRegister invokerRegister) {
        this.invokerRegister = invokerRegister;
    }

    public void registerInvoker(Invoker invoker) {
        invokerRegister.registerInvoker(invoker);
    }

    public void printNativeLog(int level, String message) {
        if (logHandler != null) {
            logHandler.printLog(this.namespace, level, message);
        }
    }

    public void printJsLog(int level, String message) {
        if (jsConsoleHandler != null) {
            jsConsoleHandler.printLog(this.namespace, level, message);
        }
    }

    public void onCatchJsException(String exception) {
        if (jsExceptionHandler != null) {
            jsExceptionHandler.onCatchException(this.namespace, new JSException(exception));
        }
    }

    public void onTraceEvent(String event, Object params) {
        if (eventTraceHandler != null) {
            eventTraceHandler.onEvent(this.namespace, event, FAObjectUtil.toJavaMap(params));
        }
    }

    public void setJsExceptionHandler(JsExceptionHandler jsExceptionHandler) {
        this.jsExceptionHandler = jsExceptionHandler;
    }

    public void setJsConsoleHandler(JsConsoleHandler jsConsoleHandler) {
        this.jsConsoleHandler = jsConsoleHandler;
    }

    public void setEventTraceHandler(EventTraceHandler eventTraceHandler) {
        this.eventTraceHandler = eventTraceHandler;
    }

    public void setLogHandler(LogHandler logHandler) {
        this.logHandler = logHandler;
    }

    public void destroyVdomContext() {
        FalconEngine.destroyFalconContext(identify);
    }

    public static void releaseEngine() {
        FalconEngine.releaseEngine();
    }


}
