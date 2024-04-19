package com.didi.hummer2;

import android.content.Context;
import android.content.ContextWrapper;

import com.didi.hummer2.falcon.HMEngineType;
import com.didi.hummer2.register.HummerObject;
import com.didi.hummer2.register.InvokerRegister;
import com.didi.hummer2.falcon.ConfigOption;
import com.didi.hummer2.falcon.FalconContext;
import com.didi.hummer2.handler.EventTraceHandler;
import com.didi.hummer2.handler.JsConsoleHandler;
import com.didi.hummer2.handler.JsExceptionHandler;
import com.didi.hummer2.handler.LogHandler;
import com.didi.hummer2.invoke.Invoker;


/**
 * didi Create on 2023/11/20 .
 * <p>
 * Copyright (c) 2023/11/20 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/20 4:36 下午
 * @Description Hummer2Context 注册及绑定Hummer2的相关组件，初始设置数据状态等
 */

public abstract class HummerContext extends ContextWrapper {

    /**
     * Hummer 命名空间
     */
    private String namespace;
    /**
     * Android 上下文
     */
    private Context context;
    /**
     * Falcon引擎上下文
     */
    private FalconContext falconContext;
    /**
     * 引擎配置信息
     */
    private ConfigOption configOption;
    /**
     * 渲染器
     */
    private HummerRender hummerRender;

    /**
     * JS引擎类型
     */
    private HMEngineType engineType;

    /**
     * 普通日志:引起本身日志输出
     */
    private LogHandler logHandler;
    /**
     * JS日志，不使用组件，保证在js代码执行的第一时间可以输出日志
     */
    private JsConsoleHandler jsConsoleHandler;
    /**
     * 异常处理
     */
    private JsExceptionHandler jsExceptionHandler;
    /**
     * 埋点事件处理器
     */
    private EventTraceHandler eventTraceHandler;

    private InvokerRegister invokerRegister;

    private String jsSourcePath;


    public HummerContext(Context context) {
        super(context);
        this.context = context;
        this.falconContext = new FalconContext();
    }


    public void init() {
        falconContext.bindVdomContext(namespace, configOption);
    }


    public Context getContext() {
        return context;
    }

    public ConfigOption getConfigOption() {
        return configOption;
    }

    public void setHummerRender(HummerRender hummerRender) {
        this.hummerRender = hummerRender;
    }

    public HummerRender getHummerRender() {
        return hummerRender;
    }

    public void setNamespace(String namespace) {
        this.namespace = namespace;
    }


    public String getNamespace() {
        return namespace;
    }


    public void setEngineType(HMEngineType engineType) {
        this.engineType = engineType;
    }


    public void setInvokerRegister(InvokerRegister invokerRegister) {
        if (this.invokerRegister != null) {
            //TODO  如果已经存在了，需要做一定处理，防止保存的对象丢失
        }
        this.invokerRegister = invokerRegister;
        this.falconContext.setInvokerRegister(invokerRegister);
    }


    public abstract HummerObject searchObject(long objId);

    public void setJsSourcePath(String jsSourcePath) {
        this.jsSourcePath = jsSourcePath;
    }

    public String getJsSourcePath() {
        return jsSourcePath;
    }

    public void registerInvoker(Invoker invoker) {
        this.invokerRegister.registerInvoker(invoker);
    }


    public void setLogHandler(LogHandler logHandler) {
        this.logHandler = logHandler;
        this.falconContext.setLogHandler(logHandler);
    }

    public void setJsConsoleHandler(JsConsoleHandler jsConsoleHandler) {
        this.jsConsoleHandler = jsConsoleHandler;
        this.falconContext.setJsConsoleHandler(jsConsoleHandler);
    }

    public void setJsExceptionHandler(JsExceptionHandler jsExceptionHandler) {
        this.jsExceptionHandler = jsExceptionHandler;
        this.falconContext.setJsExceptionHandler(jsExceptionHandler);
    }

    public void setEventTraceHandler(EventTraceHandler eventTraceHandler) {
        this.eventTraceHandler = eventTraceHandler;
        this.falconContext.setEventTraceHandler(eventTraceHandler);
    }

    public Object evaluateJavaScript(String script, String scriptId) {
        return falconContext.evaluateJavaScript(script, scriptId);
    }

    public Object evaluateBytecode(byte[] script, String scriptId) {
        return falconContext.evaluateBytecode(script, scriptId);
    }

    public void destroy() {
        falconContext.destroyVdomContext();
    }


}
