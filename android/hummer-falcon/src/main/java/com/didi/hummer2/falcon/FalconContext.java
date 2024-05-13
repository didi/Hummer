package com.didi.hummer2.falcon;


import android.text.TextUtils;

import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.register.InvokerRegister;
import com.didi.hummer2.exception.JSException;
import com.didi.hummer2.invoke.Invoker;
import com.didi.hummer2.handler.EventTraceHandler;
import com.didi.hummer2.handler.JsConsoleHandler;
import com.didi.hummer2.handler.JsExceptionHandler;
import com.didi.hummer2.handler.LogHandler;
import com.didi.hummer2.utils.F4NObjectUtil;

import java.util.ArrayList;
import java.util.List;


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

public class FalconContext implements PageLifeCycle {



    public static final int STATE_ON_CONTEXT_CREATE = 1;

    public static final int STATE_ON_CONTEXT_START = 2;

    public static final int STATE_ON_CONTEXT_STOP = 3;

    public static final int STATE_ON_CONTEXT_DESTROY = 4;


    public static final int PAGE_EVENT_ON_CREATE = 11;

    public static final int PAGE_EVENT_ON_APPEAR = 12;

    public static final int PAGE_EVENT_ON_DISAPPEAR = 13;

    public static final int PAGE_EVENT_ON_DESTROY = 14;

    public static final int PAGE_EVENT_ON_BACK = 15;


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

    protected OnContextStateListener onContextStateListener;

    protected List<PageLifeCycle> pageLifeCycles;

    public FalconContext() {
        FalconEngine.createEngine();
        identify = FalconEngine.createFalconContext();
        pageLifeCycles = new ArrayList<>();
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


    // C++ 直接回调
    public Object invoke(long type, long objId, long methodType, String componentName, String methodName, int argc, JsiValue[] value) {
        Object result = invokerRegister.invoke(null, null, type, objId, methodType, componentName, methodName, argc, value);
        if (result != null) {
            JsiValue jsiValue = F4NObjectUtil.toJsiValue(result);
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

    // C++ 直接回调
    public void printNativeLog(int level, String message) {
        if (logHandler != null) {
            logHandler.printLog(this.namespace, level, message);
        }
    }

    // C++ 直接回调
    public void printJsLog(int level, String message) {
        if (jsConsoleHandler != null) {
            jsConsoleHandler.printLog(this.namespace, level, message);
        }
    }

    // C++ 直接回调
    public void onCatchJsException(String exception) {
        if (jsExceptionHandler != null) {
            jsExceptionHandler.onCatchException(this.namespace, new JSException(exception));
        }
    }

    // C++ 直接回调
    public void onTraceEvent(String event, Object params) {
        if (eventTraceHandler != null) {
            eventTraceHandler.onEvent(this.namespace, event, F4NObjectUtil.toJavaMap(params));
        }
    }

    public Object dispatchEvent(String eventName, JsiValue[] params) {
        if (TextUtils.isEmpty(eventName)) {
            return null;
        }
        long[] paramsLong;
        if (params == null || params.length == 0) {
            paramsLong = null;
        } else {
            int size = params.length;
            paramsLong = new long[size];
            for (int i = 0; i < size; i++) {
                paramsLong[i] = params[i].getIdentify();
            }
        }
        return FalconEngine.dispatchEvent(identify, eventName, paramsLong);
    }

    // C++ 直接回调
    public void onContextStateChanged(int state) {
        if (onContextStateListener != null) {
            switch (state) {
                case STATE_ON_CONTEXT_CREATE:
                    onContextStateListener.onContextCreate();
                    break;
                case STATE_ON_CONTEXT_START:
                    onContextStateListener.onContextStart();
                    break;
                case STATE_ON_CONTEXT_STOP:
                    onContextStateListener.onContextStop();
                    break;
                case STATE_ON_CONTEXT_DESTROY:
                    onContextStateListener.onContextDestroy();
                    break;
            }
        }
    }

    // C++ 直接回调
    public void onReceivePageLifeCycle(int event) {
        switch (event) {
            case PAGE_EVENT_ON_CREATE:
                onPageCreate();
                break;
            case PAGE_EVENT_ON_APPEAR:
                onPageAppear();
                break;
            case PAGE_EVENT_ON_DISAPPEAR:
                onPageDisappear();
                break;
            case PAGE_EVENT_ON_DESTROY:
                onPageDestroy();
                break;
            case PAGE_EVENT_ON_BACK:
                onPageBack();
                break;
        }
    }

    @Override
    public void onPageCreate() {
        if (pageLifeCycles.size() > 0) {
            for (PageLifeCycle cycle : pageLifeCycles) {
                cycle.onPageCreate();
            }
        }
    }

    @Override
    public void onPageAppear() {
        if (pageLifeCycles.size() > 0) {
            for (PageLifeCycle cycle : pageLifeCycles) {
                cycle.onPageAppear();
            }
        }
    }

    @Override
    public void onPageDisappear() {
        if (pageLifeCycles.size() > 0) {
            for (PageLifeCycle cycle : pageLifeCycles) {
                cycle.onPageDisappear();
            }
        }
    }

    @Override
    public void onPageDestroy() {
        if (pageLifeCycles.size() > 0) {
            for (PageLifeCycle cycle : pageLifeCycles) {
                cycle.onPageDestroy();
            }
        }
    }

    @Override
    public void onPageBack() {
        if (pageLifeCycles.size() > 0) {
            for (PageLifeCycle cycle : pageLifeCycles) {
                cycle.onPageBack();
            }
        }
    }

    public OnContextStateListener getOnContextStateListener() {
        return onContextStateListener;
    }

    public void setOnContextStateListener(OnContextStateListener onContextStateListener) {
        this.onContextStateListener = onContextStateListener;
    }


    public void registerPageLifeCycle(PageLifeCycle pageLifeCycle) {
        if (!pageLifeCycles.contains(pageLifeCycle)) {
            pageLifeCycles.add(pageLifeCycle);
        }
    }

    public void unregisterPageLifeCycle(PageLifeCycle pageLifeCycle) {
        if (pageLifeCycle != null) {
            pageLifeCycles.remove(pageLifeCycle);
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

    public void destroyFalconContext() {
        FalconEngine.destroyFalconContext(identify);
    }

    public static void releaseEngine() {
        FalconEngine.releaseEngine();
    }


}
