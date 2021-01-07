package com.didi.hummer.render.component.anim;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ObjectAnimator;
import android.animation.PropertyValuesHolder;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.render.component.view.HMBase;

import java.util.List;

/**
 * 基础动画组件
 * <p>
 * Created by XiaoFeng on 2019/3/27.
 */
@Component("BasicAnimation")
public class BasicAnimation {

    @JsProperty("from")
    protected Object from;
    @JsProperty("value")
    protected Object value;
    @JsProperty("duration")
    protected float duration; //单位(s)
    @JsProperty("delay")
    protected float delay; //单位(s)
    @JsProperty("repeatCount")
    protected int repeatCount;
    @JsProperty("easing")
    protected String easing;

    protected Animator animator;
    protected String animType;
    protected JSCallback animStartCallback;
    protected JSCallback animEndCallback;

    public BasicAnimation(String animType) {
        this.animType = animType;
    }


    public static final int AXIS_X = 1;
    public static final int AXIS_Y = 2;
    public static final int AXIS_Z = 3;

    public static final int DIRECTION_X = 11;
    public static final int DIRECTION_Y = 12;
    public static final int DIRECTION_XY = 13;


    protected static Object[] trans2Array(Object value) {
        return HummerAnimationUtils.trans2Array(value);
    }


    @JsMethod("on")
    public void on(String event, JSCallback callback) {
        if ("start".equalsIgnoreCase(event)) {
            animStartCallback = callback;
        } else if ("end".equalsIgnoreCase(event)) {
            animEndCallback = callback;
        }
    }

    public void start(HMBase base) {
        List<PropertyValuesHolder> list = HummerAnimationUtils.parser(animType, value, from);
        ObjectAnimator anim = ObjectAnimator.ofPropertyValuesHolder(base.getAnimViewWrapper(), list.toArray(new PropertyValuesHolder[0]));

        animator = anim;
        anim.setDuration(HummerAnimationUtils.getAnimDuration(duration));
        anim.setRepeatCount(repeatCount);
        anim.setStartDelay(HummerAnimationUtils.getAnimDelay(delay));
        anim.setInterpolator(HummerAnimationUtils.getInterpolator(easing));
        anim.addListener(animatorListener);
        anim.start();
    }

    public void stop() {
        if (isRunning()) {
            animator.cancel();
            animator = null;
        }
        if (animStartCallback != null) {
            animStartCallback.release();
        }
        if (animEndCallback != null) {
            animEndCallback.release();
        }
    }

    public boolean isRunning() {
        return animator != null && animator.isRunning();
    }

    protected AnimatorListenerAdapter animatorListener = new AnimatorListenerAdapter() {
        @Override
        public void onAnimationStart(Animator animation) {
            super.onAnimationStart(animation);
            if (animStartCallback != null) {
                animStartCallback.call();
            }
        }

        @Override
        public void onAnimationEnd(Animator animation) {
            super.onAnimationEnd(animation);
            if (animEndCallback != null) {
                animEndCallback.call();
            }
        }
    };
}
