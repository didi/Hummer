package com.didi.hummer;

import com.didi.hummer.adapter.font.IFontAdapter;
import com.didi.hummer.adapter.font.impl.DefaultFontAdapter;
import com.didi.hummer.adapter.http.IHttpAdapter;
import com.didi.hummer.adapter.http.impl.DefaultHttpAdapter;
import com.didi.hummer.adapter.imageloader.IImageLoaderAdapter;
import com.didi.hummer.adapter.imageloader.impl.DefaultImageLoaderAdapter;
import com.didi.hummer.adapter.navigator.INavigatorAdapter;
import com.didi.hummer.adapter.navigator.impl.DefaultNavigatorAdapter;
import com.didi.hummer.adapter.tracker.ITrackerAdapter;
import com.didi.hummer.adapter.scriptloader.IScriptLoaderAdapter;
import com.didi.hummer.adapter.scriptloader.impl.DefaultScriptLoaderAdapter;
import com.didi.hummer.adapter.storage.IStorageAdapter;
import com.didi.hummer.adapter.storage.impl.DefaultStorageAdapter;
import com.didi.hummer.adapter.tracker.impl.EmptyTrackerAdapter;
import com.didi.hummer.context.AutoBindHummerRegister;
import com.didi.hummer.core.exception.ExceptionCallback;
import com.didi.hummer.context.HummerRegister;
import com.didi.hummer.tools.EventTracer;
import com.didi.hummer.tools.JSLogger;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by XiaoFeng on 2019-10-16.
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
     * JS端的Logger
     */
    private JSLogger.Logger jsLogger;
    /**
     * 埋点事件
     */
    private EventTracer.Trace eventTracer;
    /**
     * JS执行抛出的异常信息
     */
    private ExceptionCallback exceptionCallback;
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

    private HummerConfig(Builder builder) {
        this.namespace = builder.namespace;
        this.debuggable = builder.debuggable;
        this.jsLogger = builder.jsLogger;
        this.eventTracer = builder.eventTracer;
        this.exceptionCallback = builder.exceptionCallback;
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
    }

    public String getNamespace() {
        return namespace;
    }

    public boolean isDebuggable() {
        return debuggable;
    }

    public JSLogger.Logger getJsLogger() {
        if (jsLogger == null) {
            jsLogger = (level, msg) -> {
            };
        }
        return jsLogger;
    }

    public EventTracer.Trace getEventTracer() {
        if (eventTracer == null) {
            eventTracer = (event, params) -> {
            };
        }
        return eventTracer;
    }

    public ExceptionCallback getExceptionCallback() {
        if (exceptionCallback == null) {
            exceptionCallback = e -> {
            };
        }
        return exceptionCallback;
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
        private String namespace = HummerSDK.NAMESPACE_DEFAULT;
        private boolean debuggable = true;
        private JSLogger.Logger jsLogger;
        private EventTracer.Trace eventTracer;
        private ExceptionCallback exceptionCallback;
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

        public Builder setNamespace(String namespace) {
            this.namespace = namespace;
            return this;
        }

        public Builder setDebuggable(boolean debuggable) {
            this.debuggable = debuggable;
            return this;
        }

        public Builder setJSLogger(JSLogger.Logger logger) {
            this.jsLogger = logger;
            return this;
        }

        @Deprecated
        public Builder setEventTracer(EventTracer.Trace trace) {
            this.eventTracer = trace;
            return this;
        }

        public Builder setExceptionCallback(ExceptionCallback callback) {
            exceptionCallback = callback;
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

        public HummerConfig builder() {
            if (autoRegisterHummerModule) {
                hummerRegisters.add(0, AutoBindHummerRegister.instance());
            }
            return new HummerConfig(this);
        }
    }
}
