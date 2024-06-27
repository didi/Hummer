package com.didi.hummer2.test;

import android.app.Application;
import android.content.Context;

import com.didi.hummer2.Hummer;
import com.didi.hummer2.HummerConfig;
import com.didi.hummer2.utils.F4NDebugUtil;

/**
 * Created by XiaoFeng on 2019/3/25.
 */
public class App extends Application {

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
    }

    public Context getApplication() {
        return this;
    }

    @Override
    public void onCreate() {
        super.onCreate();


        F4NDebugUtil.setDebuggable(true);


        HummerConfig config = new HummerConfig.Builder(this)
                .setFontAdapter(new TestFontAdapter())
                .setDebuggable(false).setAutoHummerRegister(true).build();
        Hummer.init(config);

    }

    @Override
    public void onTerminate() {
        super.onTerminate();
        Hummer.releaseAll();
    }
}
