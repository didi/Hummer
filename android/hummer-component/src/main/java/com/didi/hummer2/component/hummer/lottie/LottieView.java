package com.didi.hummer2.component.hummer.lottie;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ValueAnimator;
import android.content.Context;
import android.text.TextUtils;

import com.airbnb.lottie.LottieAnimationView;
import com.airbnb.lottie.LottieDrawable;
import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotationx.Component;
import com.didi.hummer2.annotationx.JsMethod;
import com.didi.hummer2.annotationx.JsProperty;
import com.didi.hummer2.engine.JSCallback;
import com.didi.hummer2.utils.HMLog;
import com.didi.hummer2.engine.JSValue;
import com.didi.hummer2.render.component.view.HMBase;

/**
 * Lottie动画组件
 *
 * Created by XiaoFeng on 2023-3-20.
 */
@Component("LottieView")
public class LottieView extends HMBase<LottieAnimationView> {
    private static final String TAG = "LottieView";
    private JSCallback onDataReadyCallback;
    private JSCallback onDataFailedCallback;

    @JsProperty("src")
    private String src;

    @JsProperty("autoPlay")
    public boolean autoPlay = true;

    public LottieView(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
    }

    @Override
    protected LottieAnimationView createViewInstance(Context context) {
        LottieAnimationView view = new LottieAnimationView(context);
        view.addLottieOnCompositionLoadedListener(composition -> {
            HMLog.d(TAG, "onCompositionLoaded");
            if (autoPlay) {
                view.playAnimation();
            }
            if (onDataReadyCallback != null) {
                onDataReadyCallback.call();
            }
        });
        // 这里在初始化时就提前设置FailureListener，是为了避免当传入非法json文件时，
        // 走到LottieAnimationView中默认的DEFAULT_FAILURE_LISTENER而抛出异常，导致crash。
        view.setFailureListener(result -> {
            HMLog.d(TAG, "onFailure: " + result);
            if (onDataFailedCallback != null) {
                onDataFailedCallback.call();
            }
        });
        return view;
    }

    /**
     * 设置Lottie动画
     * @param src : 动画资源路径
     *
     * 支持两种格式文件：
     * 1. .json格式文件，一般为矢量动画；
     * 2. .zip格式文件，一般为位图动画；
     *
     * 支持两种加载方式：
     * 1. 本地动画资源，文件需放置在assets目录下；
     * 2. 远程动画资源，即http(s)链接；
     */
    public void setSrc(String src) {
        HMLog.d(TAG, "src: " + src);
        if (TextUtils.isEmpty(src)) {
            return;
        }
        this.src = src;
        if (isRemoteImage(src)) {
            getView().setAnimationFromUrl(src);
        } else {
            getView().setAnimation(src);
        }
        getView().setRepeatCount(LottieDrawable.INFINITE);
    }

    private boolean isRemoteImage(String imageSrc) {
        return imageSrc != null && (imageSrc.startsWith("//") || imageSrc.toLowerCase().startsWith("http"));
    }

    @JsMethod("playAnimation")
    public void playAnimation() {
        getView().playAnimation();
    }

    @JsMethod("cancelAnimation")
    public void cancelAnimation() {
        getView().cancelAnimation();
    }

    @JsMethod("setLoop")
    public void setLoop(boolean loop) {
        getView().setRepeatCount(loop ? ValueAnimator.INFINITE : 0);
    }

    @JsMethod("setOnCompletionCallback")
    public void setOnCompletionCallback(JSCallback callback) {
        getView().addAnimatorListener(new AnimatorListenerAdapter() {
            @Override
            public void onAnimationEnd(Animator animation) {
                HMLog.d(TAG, "onAnimationEnd");
                if (callback != null) {
                    callback.call();
                }
                getView().removeAllAnimatorListeners();
            }
        });
    }

    @JsMethod("setOnDataReadyCallback")
    public void setOnDataReadyCallback(JSCallback callback) {
        onDataReadyCallback = callback;
    }

    @JsMethod("setOnDataFailedCallback")
    public void setOnDataFailedCallback(JSCallback callback) {
        onDataFailedCallback = callback;
    }
}
