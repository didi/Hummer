package com.didi.hummer2.demo;

import android.app.Application;
import android.content.Context;

import com.didi.hummer2.Hummer;
import com.didi.hummer2.HummerConfig;
import com.didi.hummer2.register.HummerRegister;
import com.didi.hummer2.register.HummerRegister$$hummer2;
import com.didi.hummer2.register.HummerRegister$$hummer2_component;
import com.didi.hummer2.register.InvokerRegister;
import com.didi.hummer2.utils.F4NDebugUtil;
import com.facebook.soloader.SoLoader;
import com.getkeepsafe.relinker.ReLinker;

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

    public Context getApplication() {
        return this;
    }

    @Override
    public void onCreate() {
        super.onCreate();


        F4NDebugUtil.setDebuggable(true);
        SoLoader.init(getApplication(), false);
        SoLoader.loadLibrary("yoga");
//        ReLinker.loadLibrary(getApplication(), "yoga");
        ReLinker.loadLibrary(getApplication(), "hummer2");
        ReLinker.loadLibrary(getApplication(), "falcon");


        HummerConfig config = new HummerConfig.Builder(this)
                .addHummerRegister(new HummerRegister() {
                    @Override
                    public void register(InvokerRegister invokerRegister) {
                        new HummerRegister$$hummer2_component().register(invokerRegister);
                        new HummerRegister$$hummer2().register(invokerRegister);
                    }
                })
                .setDebuggable(false)
                .build();
        Hummer.init(config);

//        DoraemonKit.install(this, null, "cfe007137560fd511dfbcbbb3c9889c8");

//        Hummer.setJsEngine(HummerSDK.JsEngine.QUICK_JS);
//        Hummer.initHermesDebugger(new DefaultHermesDebugger(this));

//        // Hummer SDK
//        HummerConfig config = new HummerConfig.Builder()
//                // 自定义namespace（用于业务线隔离，需和Hummer容器中的namespace配合使用，可选）
//                .setNamespace("test_namespace")
//                //开启debug模式（日志，开发工具）
//                .setDebuggable(true)
//                // JS日志回调（可选）
//                .setJSLogger((level, msg) -> {})
//                // JS异常回调（可选）
//                .setExceptionCallback(e -> {})
//                // RTL支持（可选）
//                .setSupportRTL(false)
//                // 字节码支持（可选）
//                .setSupportBytecode(true)
//                // 自定义上报SDK内部埋点和性能统计数据（可选）
//                .setTrackerAdapter(new EmptyTrackerAdapter())
//                // 自定义字体库（可选）
////                .setFontAdapter(new TestFontAdapter())
//                // 自定义路由（可在这里指定自定义Hummer容器，可选）
//                .setNavigatorAdapter(new DefaultNavigatorAdapter(new DefaultIntentCreator()))
//                // 自定义图片库（可选）
//                .setImageLoaderAdapter(new DefaultImageLoaderAdapter())
//                // 自定义网络库（可选）
//                .setHttpAdapter(new DefaultHttpAdapter())
//                // 自定义持久化存储（可选）
//                .setStorageAdapter(new DefaultStorageAdapter())
//                // 自定义Hummer.loadScriptWithUrl()时加载脚本的方式（可选）
//                .setScriptLoaderAdapter(new DefaultScriptLoaderAdapter())
////                .addHummerRegister(HummerRegister$$hummer_demo_app::init)
////                .addHummerRegister(AutoBindHummerRegister.instance())
//                .setAutoHummerRegister(true)
//                // 构造HummerConfig
//                .builder();
//        Hummer.init(this, config);
////        Hummer.init(this);
//
//        // Hummer SDK
//        HummerConfig config2 = new HummerConfig.Builder()
//                // 自定义namespace（用于业务线隔离，需和Hummer容器中的namespace配合使用，可选）
//                .setNamespace("test_namespace_no_debug")
//                //开启debug模式（日志，开发工具）
//                .setDebuggable(false)
////                .addHummerRegister(hummerContext -> {
////                    //HummerRegister$$hummer_sdk.init(hummerContext);
////                    HummerRegister$$hummer_demo_app.init(hummerContext);
////                })
////                .addHummerRegister(AutoBindHummerRegister.instance())
//                .setAutoHummerRegister(true)
//                .builder();
//        Hummer.init(this, config2);

    }

    @Override
    public void onTerminate() {
        super.onTerminate();
//        Hummer.release();
    }
}
