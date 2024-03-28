package com.didi.hummer2;

import android.content.Context;
import android.content.ContextWrapper;

import com.didi.hummer2.core.HMEngineType;
import com.didi.hummer2.handler.EventTraceHandler;
import com.didi.hummer2.handler.JsConsoleHandler;
import com.didi.hummer2.handler.JsExceptionHandler;
import com.didi.hummer2.handler.LogHandler;


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

public class HummerContext extends ContextWrapper {

    private Context context;
    private FalconContext falconContext;
    private HummerRender hummerRender;

    private String namespace;

    private ConfigOption configOption;
    /**
     * JS引擎类型
     */
    private HMEngineType engineType;
    /**
     * 异常处理
     */
    private JsExceptionHandler exceptionHandler;

    /**
     * JS日志，不使用组件，保证在js代码执行的第一时间可以输出日志
     */
    private JsConsoleHandler consoleHandler;

    /**
     * 埋点事件处理器
     */
    private EventTraceHandler eventTraceHandler;

    /**
     * 普通日志:引起本身日志输出
     */
    private LogHandler logHandler;


    public HummerContext(Context context) {
        super(context);
        this.context = context;
        this.falconContext = new FalconContext();
    }


    public void init() {
        falconContext.bindVdomContext(namespace, configOption);
    }


    public void setHummerVdomRender(HummerRender hummerRender) {
        this.hummerRender = hummerRender;
    }

    public void setNamespace(String namespace) {
        this.namespace = namespace;
    }

    public void setEngineType(HMEngineType engineType) {
        this.engineType = engineType;
    }

    public void setExceptionHandler(JsExceptionHandler exceptionHandler) {
        this.exceptionHandler = exceptionHandler;
    }

    public void setConsoleHandler(JsConsoleHandler consoleHandler) {
        this.consoleHandler = consoleHandler;
    }

    public Object evaluateJavaScript(String script, String scriptId) {
        return falconContext.evaluateJavaScript(script, scriptId);
    }


    public void destroy() {
        falconContext.destroyVdomContext();
    }


}
