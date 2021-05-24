package com.didi.hummer;

import com.didi.hummer.adapter.http.IHttpAdapter;
import com.didi.hummer.adapter.http.impl.DefaultHttpAdapter;
import com.didi.hummer.adapter.imageloader.IImageLoaderAdapter;
import com.didi.hummer.adapter.imageloader.impl.DefaultImageLoaderAdapter;
import com.didi.hummer.adapter.location.ILocationAdapter;
import com.didi.hummer.adapter.location.impl.DefaultLocationAdapter;
import com.didi.hummer.adapter.navigator.INavigatorAdapter;
import com.didi.hummer.adapter.navigator.impl.DefaultNavigatorAdapter;
import com.didi.hummer.adapter.scriptloader.IScriptLoaderAdapter;
import com.didi.hummer.adapter.scriptloader.impl.DefaultScriptLoaderAdapter;
import com.didi.hummer.adapter.storage.IStorageAdapter;
import com.didi.hummer.adapter.storage.impl.DefaultStorageAdapter;
import com.didi.hummer.adapter.websocket.IWebSocketAdapter;
import com.didi.hummer.adapter.websocket.impl.DefaultWebSocketAdapter;
import com.didi.hummer.core.exception.ExceptionCallback;
import com.didi.hummer.tools.EventTracer;
import com.didi.hummer.tools.JSLogger;

/**
 * Created by XiaoFeng on 2019-10-16.
 */
public class HummerConfig {

    /**
     * 命名空间（用于隔离不同业务线）
     */
    private String namespace;
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
     * 字体文件Assets目录
     */
    private String fontsAssetsPath;
    /**
     * 网络请求适配器
     */
    private IHttpAdapter httpAdapter;
    /**
     * WebSocket适配器
     */
    private IWebSocketAdapter webSocketAdapter;
    /**
     * 图片加载适配器
     */
    private IImageLoaderAdapter imageLoaderAdapter;
    /**
     * 存储适配器
     */
    private IStorageAdapter storageAdapter;
    /**
     * 定位适配器
     */
    private ILocationAdapter locationAdapter;
    /**
     * 导航适配器
     */
    private INavigatorAdapter navAdapter;
    /**
     * 脚本加载适配器
     */
    private IScriptLoaderAdapter scriptLoaderAdapter;

    private HummerConfig(Builder builder) {
        this.namespace = builder.namespace;
        this.jsLogger = builder.jsLogger;
        this.eventTracer = builder.eventTracer;
        this.exceptionCallback = builder.exceptionCallback;
        this.isSupportRTL = builder.isSupportRTL;
        this.fontsAssetsPath = builder.fontsAssetsPath;
        this.httpAdapter = builder.httpAdapter;
        this.webSocketAdapter = builder.webSocketAdapter;
        this.imageLoaderAdapter = builder.imageLoaderAdapter;
        this.storageAdapter = builder.storageAdapter;
        this.locationAdapter = builder.locationAdapter;
        this.navAdapter = builder.navAdapter;
        this.scriptLoaderAdapter = builder.scriptLoaderAdapter;
    }

    public String getNamespace() {
        return namespace;
    }

    public JSLogger.Logger getJsLogger() {
        if (jsLogger == null) {
            jsLogger = (level, msg) -> {};
        }
        return jsLogger;
    }

    public EventTracer.Trace getEventTracer() {
        if (eventTracer == null) {
            eventTracer = (event, params) -> {};
        }
        return eventTracer;
    }

    public ExceptionCallback getExceptionCallback() {
        if (exceptionCallback == null) {
            exceptionCallback = e -> {};
        }
        return exceptionCallback;
    }

    public boolean isSupportRTL() {
        return isSupportRTL;
    }

    public String getFontsAssetsPath() {
        return fontsAssetsPath;
    }

    public IHttpAdapter getHttpAdapter() {
        if (httpAdapter == null) {
            httpAdapter = new DefaultHttpAdapter();
        }
        return httpAdapter;
    }

    public IWebSocketAdapter getWebSocketAdapter() {
        if (webSocketAdapter == null) {
            webSocketAdapter = new DefaultWebSocketAdapter();
        }
        return webSocketAdapter;
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
        return storageAdapter;
    }

    public ILocationAdapter getLocationAdapter() {
        if (locationAdapter == null) {
            locationAdapter = new DefaultLocationAdapter();
        }
        return locationAdapter;
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

    public static class Builder {
        private String namespace = HummerSDK.NAMESPACE_DEFAULT;
        private JSLogger.Logger jsLogger;
        private EventTracer.Trace eventTracer;
        private ExceptionCallback exceptionCallback;
        private boolean isSupportRTL;
        private String fontsAssetsPath;
        private IHttpAdapter httpAdapter;
        private IWebSocketAdapter webSocketAdapter;
        private IImageLoaderAdapter imageLoaderAdapter;
        private IStorageAdapter storageAdapter;
        private ILocationAdapter locationAdapter;
        private INavigatorAdapter navAdapter;
        private IScriptLoaderAdapter scriptLoaderAdapter;

        public Builder setNamespace(String namespace) {
            this.namespace = namespace;
            return this;
        }

        public Builder setJSLogger(JSLogger.Logger logger) {
            this.jsLogger = logger;
            return this;
        }

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

        public Builder setFontsAssetsPath(String fontsAssetsPath) {
            this.fontsAssetsPath = fontsAssetsPath;
            return this;
        }

        public Builder setHttpAdapter(IHttpAdapter adapter) {
            httpAdapter = adapter;
            return this;
        }

        public Builder setWebSocketAdapter(IWebSocketAdapter adapter) {
            webSocketAdapter = adapter;
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

        public Builder setLocationAdapter(ILocationAdapter adapter) {
            locationAdapter = adapter;
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

        public HummerConfig builder() {
            return new HummerConfig(this);
        }
    }
}
