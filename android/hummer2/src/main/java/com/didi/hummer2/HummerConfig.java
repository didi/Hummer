package com.didi.hummer2;

import android.content.Context;

import com.didi.hummer2.adapter.font.IFontAdapter;
import com.didi.hummer2.adapter.font.impl.DefaultFontAdapter;
import com.didi.hummer2.adapter.http.IHttpAdapter;

import com.didi.hummer2.adapter.http.impl.DefaultHttpAdapter;
import com.didi.hummer2.adapter.imageloader.IImageLoaderAdapter;
import com.didi.hummer2.adapter.imageloader.impl.DefaultImageLoaderAdapter;
import com.didi.hummer2.adapter.navigator.INavigatorAdapter;
import com.didi.hummer2.adapter.navigator.impl.DefaultNavigatorAdapter;
import com.didi.hummer2.adapter.scriptloader.IScriptLoaderAdapter;
import com.didi.hummer2.adapter.scriptloader.impl.DefaultScriptLoaderAdapter;
import com.didi.hummer2.adapter.storage.IStorageAdapter;
import com.didi.hummer2.adapter.storage.impl.DefaultStorageAdapter;
import com.didi.hummer2.adapter.tracker.ITrackerAdapter;
import com.didi.hummer2.adapter.tracker.impl.EmptyTrackerAdapter;
import com.didi.hummer2.invoke.HummerInvoker;
import com.didi.hummer2.invoke.RenderInvoker;
import com.didi.hummer2.register.HummerInvokerRegister;
import com.didi.hummer2.register.InvokerRegister;
import com.didi.hummer2.handler.DefalutLogHandler;
import com.didi.hummer2.handler.DefaultEventTraceHandler;
import com.didi.hummer2.handler.DefaultJsConsoleHandler;
import com.didi.hummer2.handler.DefaultJsExceptionHandler;
import com.didi.hummer2.handler.EventTraceHandler;
import com.didi.hummer2.handler.JsConsoleHandler;
import com.didi.hummer2.handler.JsExceptionHandler;
import com.didi.hummer2.handler.LogHandler;
import com.didi.hummer2.register.AutoBindHummerRegister;
import com.didi.hummer2.register.HummerRegister;

import java.util.ArrayList;
import java.util.List;

/**
 * didi Create on 2024/3/21 .
 * <p>
 * Copyright (c) 2024/3/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/21 11:19 AM
 * @Description Hummer 配置选项
 */

public class HummerConfig {

    /**
     * 命名空间（用于隔离不同业务线）
     */
    private String namespace;
    /**
     * debug 开关
     */
    private boolean debuggable;

    /**
     * 是否支持RTL布局（默认不支持）
     */
    private boolean isSupportRTL;
    /**
     * 是否支持字节码（默认不支持）
     */
    private boolean isSupportBytecode;

    /**
     * 字体文件Assets目录
     */
    private String fontsAssetsPath;
    /**
     * Hummer日志信息
     */
    private LogHandler logHandler;
    /**
     * JS端的Logger
     */
    private JsConsoleHandler jsConsoleHandler;
    /**
     * JS执行抛出的异常信息
     */
    private JsExceptionHandler jsExceptionHandler;
    /**
     * 埋点事件
     */
    private EventTraceHandler eventTraceHandler;

    /**
     * 网络请求适配器
     */
    private IHttpAdapter httpAdapter;
    /**
     * 字体适配器
     */
    private IFontAdapter fontAdapter;
    /**
     * 图片加载适配器
     */
    private IImageLoaderAdapter imageLoaderAdapter;
    /**
     * 存储适配器
     */
    private IStorageAdapter storageAdapter;
    /**
     * 导航适配器
     */
    private INavigatorAdapter navAdapter;
    /**
     * 脚本加载适配器
     */
    private IScriptLoaderAdapter scriptLoaderAdapter;
    /**
     * 数据统计适配器
     */
    private ITrackerAdapter trackerAdapter;
    /**
     * 组件注册器
     */
    private List<HummerRegister> hummerRegisters;

    private InvokerRegister invokerRegister;
    private Context context;

    private HummerConfig(Builder builder) {
        this.context = builder.context;
        this.namespace = builder.namespace;
        this.debuggable = builder.debuggable;
        this.logHandler = builder.logHandler;
        this.jsConsoleHandler = builder.jsConsoleHandler;
        this.eventTraceHandler = builder.eventTraceHandler;
        this.jsExceptionHandler = builder.jsExceptionHandler;
        this.isSupportRTL = builder.isSupportRTL;
        this.isSupportBytecode = builder.isSupportBytecode;
        this.fontsAssetsPath = builder.fontsAssetsPath;
        this.httpAdapter = builder.httpAdapter;
        this.fontAdapter = builder.fontAdapter;
        this.imageLoaderAdapter = builder.imageLoaderAdapter;
        this.storageAdapter = builder.storageAdapter;
        this.navAdapter = builder.navAdapter;
        this.scriptLoaderAdapter = builder.scriptLoaderAdapter;
        this.trackerAdapter = builder.trackerAdapter;
        this.hummerRegisters = builder.hummerRegisters;
        this.invokerRegister = new HummerInvokerRegister(hummerRegisters);

        //注册必须接口
        invokerRegister.registerInvoker(RenderInvoker.INSTANCE);
        invokerRegister.registerInvoker(HummerInvoker.INSTANCE);
    }


    public String getNamespace() {
        return namespace;
    }

    public Context getContext() {
        return context;
    }

    public boolean isDebuggable() {
        return debuggable;
    }


    public InvokerRegister getInvokerRegister() {
        return invokerRegister;
    }

    public LogHandler getLogHandler() {
        if (logHandler == null) {
            logHandler = new DefalutLogHandler();
        }
        return logHandler;
    }

    public JsConsoleHandler getJsConsoleHandler() {
        if (jsConsoleHandler == null) {
            jsConsoleHandler = new DefaultJsConsoleHandler();
        }
        return jsConsoleHandler;
    }

    public JsExceptionHandler getJsExceptionHandler() {
        if (jsExceptionHandler == null) {
            jsExceptionHandler = new DefaultJsExceptionHandler();
        }
        return jsExceptionHandler;
    }

    public EventTraceHandler getEventTraceHandler() {
        if (eventTraceHandler == null) {
            eventTraceHandler = new DefaultEventTraceHandler();
        }
        return eventTraceHandler;
    }

    public boolean isSupportRTL() {
        return isSupportRTL;
    }

    public boolean isSupportBytecode() {
        return isSupportBytecode;
    }

    /**
     * 方法过时
     * {@link #getFontAdapter()}
     */
    @Deprecated
    public String getFontsAssetsPath() {
        return fontsAssetsPath;
    }

    public IHttpAdapter getHttpAdapter() {
        if (httpAdapter == null) {
            httpAdapter = new DefaultHttpAdapter();
        }
        return httpAdapter;
    }

    public IFontAdapter getFontAdapter() {
        if (fontAdapter == null) {
            fontAdapter = new DefaultFontAdapter(fontsAssetsPath);
        }
        return fontAdapter;
    }

    public IImageLoaderAdapter getImageLoaderAdapter() {
        if (imageLoaderAdapter == null) {
            imageLoaderAdapter = new DefaultImageLoaderAdapter();
        }
        return imageLoaderAdapter;
    }

    public IStorageAdapter getStorageAdapter() {
        if (storageAdapter == null) {
            storageAdapter = new DefaultStorageAdapter();
        }
        storageAdapter.setNamespace(namespace);
        return storageAdapter;
    }

    public INavigatorAdapter getNavAdapter() {
        if (navAdapter == null) {
            navAdapter = new DefaultNavigatorAdapter();
        }
        return navAdapter;
    }

    public IScriptLoaderAdapter getScriptLoaderAdapter() {
        if (scriptLoaderAdapter == null) {
            scriptLoaderAdapter = new DefaultScriptLoaderAdapter();
        }
        return scriptLoaderAdapter;
    }

    public ITrackerAdapter getTrackerAdapter() {
        if (trackerAdapter == null) {
            trackerAdapter = new EmptyTrackerAdapter();
        }
        return trackerAdapter;
    }

    public List<HummerRegister> getHummerRegisters() {

        return hummerRegisters;
    }

    public static class Builder {
        private String namespace = Hummer.NAMESPACE_DEFAULT;
        private boolean debuggable = true;

        private LogHandler logHandler;
        private JsConsoleHandler jsConsoleHandler;
        private EventTraceHandler eventTraceHandler;
        private JsExceptionHandler jsExceptionHandler;
        private boolean isSupportRTL;
        private boolean isSupportBytecode;
        private String fontsAssetsPath;
        private IHttpAdapter httpAdapter;
        private IFontAdapter fontAdapter;
        private IImageLoaderAdapter imageLoaderAdapter;
        private IStorageAdapter storageAdapter;
        private INavigatorAdapter navAdapter;
        private IScriptLoaderAdapter scriptLoaderAdapter;
        private ITrackerAdapter trackerAdapter;
        private List<HummerRegister> hummerRegisters = new ArrayList<>();
        private boolean autoRegisterHummerModule = false;

        private Context context;

        public Builder(Context context) {
            this.context = context;
        }

        public Builder setNamespace(String namespace) {
            this.namespace = namespace;
            return this;
        }

        public Builder setDebuggable(boolean debuggable) {
            this.debuggable = debuggable;
            return this;
        }

        public Builder setLogHandler(LogHandler logHandler) {
            this.logHandler = logHandler;
            return this;
        }

        public Builder setJSLogger(JsConsoleHandler logger) {
            this.jsConsoleHandler = logger;
            return this;
        }

        @Deprecated
        public Builder setEventTracer(EventTraceHandler trace) {
            this.eventTraceHandler = trace;
            return this;
        }

        public Builder setExceptionCallback(JsExceptionHandler callback) {
            jsExceptionHandler = callback;
            return this;
        }

        public Builder setSupportRTL(boolean supportRTL) {
            isSupportRTL = supportRTL;
            return this;
        }

        public Builder setSupportBytecode(boolean supportBytecode) {
            isSupportBytecode = supportBytecode;
            return this;
        }

        /**
         * 方法过时
         * {@link #setFontAdapter(IFontAdapter)}
         */
        @Deprecated
        public Builder setFontsAssetsPath(String fontsAssetsPath) {
            this.fontsAssetsPath = fontsAssetsPath;
            return this;
        }

        public Builder setHttpAdapter(IHttpAdapter adapter) {
            httpAdapter = adapter;
            return this;
        }

        public Builder setFontAdapter(IFontAdapter adapter) {
            fontAdapter = adapter;
            return this;
        }

        public Builder setImageLoaderAdapter(IImageLoaderAdapter adapter) {
            imageLoaderAdapter = adapter;
            return this;
        }

        public Builder setStorageAdapter(IStorageAdapter adapter) {
            storageAdapter = adapter;
            return this;
        }

        public Builder setNavigatorAdapter(INavigatorAdapter adapter) {
            navAdapter = adapter;
            return this;
        }

        public Builder setScriptLoaderAdapter(IScriptLoaderAdapter adapter) {
            scriptLoaderAdapter = adapter;
            return this;
        }

        public Builder setTrackerAdapter(ITrackerAdapter adapter) {
            trackerAdapter = adapter;
            return this;
        }

        public Builder addHummerRegister(HummerRegister register) {
            hummerRegisters.add(register);
            return this;
        }

        /**
         * 自动注册Hummer组件
         *
         * @param autoHummerRegister
         */
        public Builder setAutoHummerRegister(boolean autoHummerRegister) {
            autoRegisterHummerModule = autoHummerRegister;
            return this;
        }

        public HummerConfig build() {
            if (autoRegisterHummerModule) {
                hummerRegisters.add(0, AutoBindHummerRegister.instance());
            }
            return new HummerConfig(this);
        }
    }
}
