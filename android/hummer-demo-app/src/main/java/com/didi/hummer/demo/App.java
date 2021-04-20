package com.didi.hummer.demo;

import android.app.Application;
import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import com.didi.hummer.Hummer;
import com.didi.hummer.HummerConfig;
import com.didi.hummer.adapter.navigator.NavCallback;
import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.adapter.navigator.impl.DefaultNavigatorAdapter;

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

//        Hummer.initHermesDebugger(new DefaultHermesDebugger());

        // Hummer SDK
        HummerConfig config = new HummerConfig.Builder()
                .setJSLogger((level, msg) -> Log.d("HummerJS", msg))
                .setEventTracer((event, params) -> Log.i("zdf", "[EventTracer] event: " + event + ", params: " + params))
                .setExceptionCallback(e -> {
                    Log.e("zdf", "HummerException", e);
                    Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
                })
                .builder();
        Hummer.init(this, config);

        HummerConfig config2 = new HummerConfig.Builder()
                .setNamespace("my_demo")
                .setJSLogger((level, msg) -> Log.d("HummerJS_2", msg))
                .setEventTracer((event, params) -> Log.i("zdf", "[EventTracer_2] event: " + event + ", params: " + params))
                .setExceptionCallback(e -> {
                    Log.e("zdf", "HummerException_2", e);
                    Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
                })
                .setNavigatorAdapter(new DefaultNavigatorAdapter() {
                    @Override
                    public void openPage(Context context, NavPage page, NavCallback callback) {
                        Log.v("zdf", "my_demo, openPage");
                    }
                })
                .builder();
        Hummer.init(this, config2);
    }

    @Override
    public void onTerminate() {
        super.onTerminate();
        Hummer.release();
    }
}
