package com.didi.hummer2;


import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.core.HMEngineType;
import com.didi.hummer2.core.InvokerRegister;
import com.didi.hummer2.handler.EventTraceHandler;
import com.didi.hummer2.handler.JsConsoleHandler;
import com.didi.hummer2.handler.JsExceptionHandler;
import com.didi.hummer2.handler.LogHandler;

import java.util.Map;


/**
 * didi Create on 2023/11/27 .
 * <p>
 * Copyright (c) 2023/11/27 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/27 5:02 下午
 * @Description 用一句话说明文件功能
 */

public class FalconContext {

    private long identify;


    private InvokerRegister invokerRegister;


    private String namespace;

    private ConfigOption configOption;
    /**
     * JS引擎类型
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
        return invokerRegister.invoke(null, null, type, objId, methodType, componentName, methodName, argc, value);
    }

    public void onCatchJsException(String namespace, Exception exception) {
        if (jsExceptionHandler != null) {
            jsExceptionHandler.onCatchException(namespace, exception);
        }
    }

    public void printJsLog(int level, String namespace, String message) {
        if (jsConsoleHandler != null) {
            jsConsoleHandler.printLog(level, namespace, message);
        }
    }

    public void onTraceEvent(String event, Map<String, Object> params) {
        if (eventTraceHandler != null) {
            eventTraceHandler.onEvent(event, params);
        }
    }

    public void printNativeLog(int level, String namespace, String message) {
        if (logHandler != null) {
            logHandler.printLog(level, namespace, message);
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
