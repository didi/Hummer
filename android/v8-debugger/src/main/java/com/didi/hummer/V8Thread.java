package com.didi.hummer;

import android.os.Looper;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by XiaoFeng on 2020/7/27.
 */
public class V8Thread {

    public static ExecutorService executor = Executors.newSingleThreadExecutor();

    public static boolean isMainThread() {
        return Looper.getMainLooper().getThread() == Thread.currentThread();
    }

    public static <T> T checkThread(Callable<T> callable) {
        try {
            if (isMainThread()) {
                return executor.submit(callable).get();
            } else {
                return callable.call();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void checkThreadAsync(Runnable runnable) {
        try {
            if (isMainThread()) {
                executor.submit(runnable);
            } else {
                runnable.run();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
