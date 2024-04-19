package com.didi.hummer2.render.component.anim;

import android.animation.ObjectAnimator;

public class Transition {

    private String property;

    private float duration = 0; //单位(s)

    private float delay = 0; //单位(s)

    private String timingFunction = "linear";

    public Transition(String property) {
        this.property = property;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public float getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = (float) duration;
    }

    public float getDelay() {
        return delay;
    }

    public void setDelay(double delay) {
        this.delay = (float) delay;
    }

    public String getTimingFunction() {
        return timingFunction;
    }

    public void setTimingFunction(String timingFunction) {
        this.timingFunction = timingFunction;
    }

    public void warpAnim(ObjectAnimator anim) {
        anim.setRepeatCount(0);
        anim.setDuration(HummerAnimationUtils.getAnimDuration(getDuration()));
        anim.setStartDelay(HummerAnimationUtils.getAnimDelay(getDelay()));
        anim.setInterpolator(HummerAnimationUtils.getInterpolator(getTimingFunction()));
    }
}
