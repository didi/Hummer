package com.didi.hummer.module;

import android.os.Handler;
import android.os.Looper;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.lifecycle.ILifeCycle;

import java.util.concurrent.atomic.AtomicBoolean;

/**
 * 计时器组件
 *
 * Created by XiaoFeng on 2019-07-24.
 */
@Component("Timer")
public class Timer implements ILifeCycle {

    private static Handler timerHandler = new Handler(Looper.getMainLooper());

    private JSValue jsValue;
    private Runnable intervalRunnable;
    private Runnable timeoutRunnable;
    private JSCallback intervalCallback;
    private JSCallback timeoutCallback;
    private boolean isIntervalRunning;
    private boolean isIntervalCleared;
    private boolean isTimeoutRunning;
    private AtomicBoolean isDestroyed = new AtomicBoolean(false);

    public Timer(JSValue jsValue) {
        this.jsValue = jsValue;
    }

    @Override
    public void onCreate() {

    }

    @Override
    public void onDestroy() {
        isDestroyed.set(true);
        clearInterval();
        clearTimeout();
    }

    /**
     * 设置定时器间隔时间，定时器以一定频率回调
     * @param callback 定时器回调
     * @param interval 间隔时间 单位：ms
     */
    @JsMethod("setInterval")
    public void setInterval(JSCallback callback, long interval) {
        jsValue.protect();
        intervalCallback = callback;

        if (intervalRunnable != null) {
            timerHandler.removeCallbacks(intervalRunnable);
        }
        intervalRunnable = () -> {
            if (isDestroyed.get()) {
                return;
            }

            isIntervalRunning = true;

            timerHandler.postDelayed(intervalRunnable, interval);

            if (callback != null) {
                callback.call();

                if (isIntervalCleared) {
                    callback.release();
                    isIntervalCleared = false;
                }
            }

            isIntervalRunning = false;
        };
        timerHandler.postDelayed(intervalRunnable, interval);
    }

    /**
     * 取消定时器
     */
    @JsMethod("clearInterval")
    public void clearInterval() {
        if (intervalRunnable != null) {
            timerHandler.removeCallbacks(intervalRunnable);
        }

        if (!isIntervalRunning) {
            if (intervalCallback != null) {
                intervalCallback.release();
                intervalCallback = null;
            }
        } else {
            isIntervalCleared = true;
        }

        jsValue.unprotect();
    }

    /**
     * 设置计时器超时时间
     * @param callback 超时回调
     * @param timeout 超时时间
     */
    @JsMethod("setTimeout")
    public void setTimeout(JSCallback callback, long timeout) {
        jsValue.protect();
        timeoutCallback = callback;

        if (timeoutRunnable != null) {
            timerHandler.removeCallbacks(timeoutRunnable);
        }
        timeoutRunnable = () -> {
            if (isDestroyed.get()) {
                return;
            }

            isTimeoutRunning = true;

            if (callback != null) {
                callback.call();
                callback.release();
            }
            jsValue.unprotect();

            isTimeoutRunning = false;
        };
        timerHandler.postDelayed(timeoutRunnable, timeout);
    }

    /**
     * 取消超时触发事件
     */
    @JsMethod("clearTimeout")
    public void clearTimeout() {
        if (timeoutRunnable != null) {
            timerHandler.removeCallbacks(timeoutRunnable);
        }

        if (!isTimeoutRunning) {
            if (timeoutCallback != null) {
                timeoutCallback.release();
                timeoutCallback = null;
            }
        }

        jsValue.unprotect();
    }

//    /**
//     * 挂起timer
//     */
//    @JsMethod("suspend")
//    public void suspend(){
//
//    }
//
//    /**
//     * 恢复timer
//     */
//    @JsMethod("resume")
//    public void resume(){
//
//    }
}
