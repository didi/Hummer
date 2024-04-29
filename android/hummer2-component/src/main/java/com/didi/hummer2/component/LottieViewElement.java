package com.didi.hummer2.component;


import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMAttribute;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.bridge.JsiFunction;
import com.didi.hummer2.component.hummer.lottie.LottieView;
import com.didi.hummer2.render.Element;

/**
 * didi Create on 2024/4/9 .
 * <p>
 * Copyright (c) 2024/4/9 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/9 8:07 PM
 * @Description LottieView
 */

@HMComponent("LottieView")
public class LottieViewElement extends Element<LottieView> {


    public LottieViewElement(HummerContext context, Object[] properties) {
        super(context, properties);
    }

    @Override
    public LottieView createRenderView() {
        return new LottieView(context, null, null);
    }


    @HMAttribute("src")
    private String src;

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
        getView().setSrc(src);
    }

    @HMAttribute("autoPlay")
    private boolean autoPlay = true;

    public boolean getAutoPlay() {
        return getView().autoPlay;
    }

    public void setAutoPlay(boolean autoPlay) {
        this.autoPlay = autoPlay;
        getView().autoPlay = autoPlay;
    }


    @HMMethod("playAnimation")
    public void playAnimation() {
        getView().playAnimation();
    }

    @HMMethod("cancelAnimation")
    public void cancelAnimation() {
        getView().cancelAnimation();
    }

    @HMMethod("setLoop")
    public void setLoop(boolean loop) {
        getView().setLoop(loop);
    }

    @HMMethod("setOnCompletionCallback")
    public void setOnCompletionCallback(JsiFunction callback) {
        getView().setOnCompletionCallback(new EventListenerCallback(callback));
    }

    @HMMethod("setOnDataReadyCallback")
    public void setOnDataReadyCallback(JsiFunction callback) {
        getView().setOnDataReadyCallback(new EventListenerCallback(callback));
    }

    @HMMethod("setOnDataFailedCallback")
    public void setOnDataFailedCallback(JsiFunction callback) {
        getView().setOnDataFailedCallback(new EventListenerCallback(callback));
    }
}
