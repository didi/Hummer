package com.didi.hummer.demo;

import android.app.Application;
import android.content.Context;

import com.didi.hummer.Hummer;
import com.didi.hummer.HummerConfig;
import com.didi.hummer.HummerSDK;
import com.didi.hummer.adapter.http.impl.DefaultHttpAdapter;
import com.didi.hummer.adapter.imageloader.impl.DefaultImageLoaderAdapter;
import com.didi.hummer.adapter.location.impl.DefaultLocationAdapter;
import com.didi.hummer.adapter.navigator.impl.DefaultNavigatorAdapter;
import com.didi.hummer.adapter.storage.impl.DefaultStorageAdapter;
import com.didi.hummer.adapter.websocket.impl.DefaultWebSocketAdapter;

/**
 * Created by XiaoFeng on 2019/3/25.
 */
public class App extends Application {

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);

//        XCrash.InitParameters params = new XCrash.InitParameters()
//                .setNativeCallback((logPath, emergency) -> Log.d("zdf", "log path: " + (logPath != null ? logPath : "(null)") + ", emergency: " + (emergency != null ? emergency : "(null)")));
//        XCrash.init(this, params);
    }

    @Override
    public void onCreate() {
        super.onCreate();

//        DoraemonKit.install(this, null, "cfe007137560fd511dfbcbbb3c9889c8");

        Hummer.setJsEngine(HummerSDK.JsEngine.NAPI_QJS);
//        Hummer.initHermesDebugger(new DefaultHermesDebugger());

        // Hummer SDK
        HummerConfig config = new HummerConfig.Builder()
                // 自定义namespace（用于业务线隔离，需和Hummer容器中的namespace配合使用）
                .setNamespace("test_namespace")
                // JS日志回调
                .setJSLogger((level, msg) -> {})
                // JS异常回调
                .setExceptionCallback(e -> {})
                // RTL支持
                .setSupportRTL(false)
                // 字体文件Assets目录
                .setFontsAssetsPath("fonts")
                // SDK内部埋点回调
                .setEventTracer((event, params) -> {})
                // 自定义路由（可在这里指定自定义Hummer容器）
                .setNavigatorAdapter(new DefaultNavigatorAdapter())
                // 自定义图片库
                .setImageLoaderAdapter(new DefaultImageLoaderAdapter())
                // 自定义网络库
                .setHttpAdapter(new DefaultHttpAdapter())
                // 自定义长链接
                .setWebSocketAdapter(new DefaultWebSocketAdapter())
                // 自定义定位
                .setLocationAdapter(new DefaultLocationAdapter())
                // 自定义持久化存储
                .setStorageAdapter(new DefaultStorageAdapter())
                // 构造HummerConfig
                .builder();
//        Hummer.init(this, config);
        Hummer.init(this);
    }

    @Override
    public void onTerminate() {
        super.onTerminate();
        Hummer.release();
    }
}
