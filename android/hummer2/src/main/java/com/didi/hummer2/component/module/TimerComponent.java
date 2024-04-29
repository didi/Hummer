//package com.didi.hummer2.module;
//
//import com.didi.hummer2.HummerContext;
//import com.didi.hummer2.annotation.HMComponent;
//import com.didi.hummer2.annotationx.JsMethod;
//import com.didi.hummer2.bridge.JsiFunction;
//import com.didi.hummer2.component.Component;
//import com.didi.hummer2.component.EventListenerCallback;
//import com.didi.hummer2.module.hummer.Timer;
//
//
///**
// * didi Create on 2024/4/10 .
// * <p>
// * Copyright (c) 2024/4/10 by didiglobal.com.
// *
// * @author <a href="realonlyone@126.com">zhangjun</a>
// * @version 1.0
// * @Date 2024/4/10 3:40 PM
// * @Description Timer
// */
//
//@HMComponent("Timer")
//public class TimerComponent extends Component {
//
//    private Timer delegate;
//
//    public TimerComponent(HummerContext hummerContext) {
//        super(hummerContext);
//        delegate = new Timer();
//    }
//
//
//    /**
//     * 设置定时器间隔时间，定时器以一定频率回调
//     *
//     * @param callback 定时器回调
//     * @param interval 间隔时间 单位：ms
//     */
//    @JsMethod("setInterval")
//    public void setInterval(JsiFunction callback, long interval) {
//        delegate.setInterval(new EventListenerCallback(callback), interval);
//    }
//
//    /**
//     * 取消定时器
//     */
//    @JsMethod("clearInterval")
//    public void clearInterval() {
//        delegate.clearInterval();
//    }
//
//    /**
//     * 设置计时器超时时间
//     *
//     * @param callback 超时回调
//     * @param timeout  超时时间
//     */
//    @JsMethod("setTimeout")
//    public void setTimeout(JsiFunction callback, long timeout) {
//        delegate.setTimeout(new EventListenerCallback(callback), timeout);
//    }
//
//    /**
//     * 取消超时触发事件
//     */
//    @JsMethod("clearTimeout")
//    public void clearTimeout() {
//        delegate.clearTimeout();
//    }
//
//    @Override
//    public void onCreate() {
//        super.onCreate();
//        delegate.onCreate();
//    }
//
//    @Override
//    public void onDestroy() {
//        super.onDestroy();
//        delegate.onDestroy();
//    }
//}
