
package com.didi.hummer.thread;

import android.os.Handler;
import android.os.Handler.Callback;
import android.os.HandlerThread;
import android.os.Message;


public class JSThread extends HandlerThread {

    private Handler mHandler;

    public JSThread(String name) {
        super(name);
        start();
        mHandler = new Handler(getLooper());
    }

    public JSThread(String name, int priority) {
        super(name, priority);
        start();
        mHandler = new Handler(getLooper());
    }

    public JSThread(String name, Callback callback) {
        super(name);
        start();
        mHandler = new Handler(getLooper(), postCallback(callback));
    }


    public JSThread(String name, int priority, Callback callback) {
        super(name, priority);
        start();
        mHandler = new Handler(getLooper(), postCallback(callback));
    }

    public static Runnable postRunnable(Runnable runnable) {
        if (runnable == null || runnable instanceof SafeRunnable) {
            return runnable;
        }
        return new SafeRunnable(runnable);
    }

    public static Callback postCallback(Callback callback) {
        if (callback == null || callback instanceof SafeCallback) {
            return callback;
        }
        return new SafeCallback(callback);
    }

    public Handler getHandler() {
        return mHandler;
    }

    public boolean isThreadAlive() {
        return (mHandler != null && getLooper() != null && isAlive());
    }

    @Override
    public boolean quit() {
        if (mHandler != null) {
            mHandler.removeCallbacksAndMessages(null);
        }
        return super.quit();
    }


    static class SafeRunnable implements Runnable {

        final Runnable mTask;

        SafeRunnable(Runnable task) {
            mTask = task;
        }

        @Override
        public void run() {
            try {
                if (mTask != null)
                    mTask.run();
            } catch (Throwable e) {
                e.printStackTrace();
            }
        }
    }

    static class SafeCallback implements Callback {
        final Callback mCallback;

        SafeCallback(Callback cb) {
            mCallback = cb;
        }

        @Override
        public boolean handleMessage(Message msg) {
            boolean result = false;
            try {
                if (mCallback != null) {
                    result = mCallback.handleMessage(msg);
                }
            } catch (Throwable e) {
                e.printStackTrace();
            }
            return result;
        }
    }


}
