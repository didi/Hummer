package com.didi.hummer.demo;

import android.app.Application;
import android.content.Context;

import com.didi.hummer.Hummer;
import com.didi.hummer.HummerConfig;
import com.didi.hummer.adapter.http.impl.DefaultHttpAdapter;
import com.didi.hummer.adapter.imageloader.impl.DefaultImageLoaderAdapter;
import com.didi.hummer.adapter.navigator.impl.DefaultIntentCreator;
import com.didi.hummer.adapter.navigator.impl.DefaultNavigatorAdapter;
import com.didi.hummer.adapter.scriptloader.impl.DefaultScriptLoaderAdapter;
import com.didi.hummer.adapter.storage.impl.DefaultStorageAdapter;
import com.didi.hummer.adapter.tracker.impl.EmptyTrackerAdapter;

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

//        Hummer.setJsEngine(HummerSDK.JsEngine.QUICK_JS);
//        Hummer.initHermesDebugger(new DefaultHermesDebugger(this));

        // Hummer SDK
        HummerConfig config = new HummerConfig.Builder()
                // 自定义namespace（用于业务线隔离，需和Hummer容器中的namespace配合使用，可选）
                .setNamespace("test_namespace")
                // JS日志回调（可选）
                .setJSLogger((level, msg) -> {})
                // JS异常回调（可选）
                .setExceptionCallback(e -> {})
                // RTL支持（可选）
                .setSupportRTL(false)
                // 字节码支持（可选）
                .setSupportBytecode(true)
                // 自定义上报SDK内部埋点和性能统计数据（可选）
                .setTrackerAdapter(new EmptyTrackerAdapter())
                // 自定义字体库（可选）
                .setFontAdapter(new TestFontAdapter())
                // 自定义路由（可在这里指定自定义Hummer容器，可选）
                .setNavigatorAdapter(new DefaultNavigatorAdapter(new DefaultIntentCreator()))
                // 自定义图片库（可选）
                .setImageLoaderAdapter(new DefaultImageLoaderAdapter())
                // 自定义网络库（可选）
                .setHttpAdapter(new DefaultHttpAdapter())
                // 自定义持久化存储（可选）
                .setStorageAdapter(new DefaultStorageAdapter())
                // 自定义Hummer.loadScriptWithUrl()时加载脚本的方式（可选）
                .setScriptLoaderAdapter(new DefaultScriptLoaderAdapter())
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
