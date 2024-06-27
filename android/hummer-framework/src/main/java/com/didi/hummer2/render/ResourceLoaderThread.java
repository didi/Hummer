package com.didi.hummer2.render;

import android.os.Handler;
import android.os.HandlerThread;

import com.didi.hummer2.utils.HMLog;

/**
 * didi Create on 2024/6/13 .
 * <p>
 * Copyright (c) 2024/6/13 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/6/13 8:34 PM
 * @Description 用一句话说明文件功能
 */

public class ResourceLoaderThread {


    private final HandlerThread handlerThread;
    private Handler handler;

    public ResourceLoaderThread() {
        handlerThread = new HandlerThread("hummer-source-loader") {
            @Override
            protected void onLooperPrepared() {
                handler = new Handler(getLooper());
            }
        };
    }

    public void start() {
        handlerThread.start();
    }

    public void stop() {
        handlerThread.quitSafely();
        handler = null;
    }


    public void runOnHummerThread(Runnable runnable) {
        if (handler != null) {
            handler.post(runnable);
        } else {
            HMLog.w("HummerNative", "ResourceLoaderThread is not alive");
        }
    }


}
