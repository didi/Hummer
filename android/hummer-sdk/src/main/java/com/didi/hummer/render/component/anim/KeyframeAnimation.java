package com.didi.hummer.render.component.anim;

import android.animation.ArgbEvaluator;
import android.animation.Keyframe;
import android.animation.ObjectAnimator;
import android.animation.PropertyValuesHolder;
import android.view.View;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.style.HummerStyleUtils;
import com.didi.hummer.render.utility.YogaAttrUtils;

import java.io.Serializable;
import java.util.List;

/**
 * 关键帧动画组件
 *
 * Created by XiaoFeng on 2019/3/27.
 */
@Component("KeyframeAnimation")
public class KeyframeAnimation extends BasicAnimation {

    @JsProperty("keyframes")
    private List<KeyFrame> keyframes;

    public class KeyFrame implements Serializable {
        public float percent;
        public Object value;
    }

    public KeyframeAnimation(String animType) {
        super(animType);
    }

    public void setKeyframes(List<KeyFrame> keyframes) {
        this.keyframes = keyframes;
    }

    @Override
    protected void animTranslation(View view) {
        if (keyframes == null) {
            return;
        }

        Keyframe[] frameXArray = new Keyframe[keyframes.size()];
        Keyframe[] frameYArray = new Keyframe[keyframes.size()];
        for (int i = 0; i < keyframes.size(); i++) {
            KeyFrame kf = keyframes.get(i);
            Object[] array = trans2Array(kf.value);
            Keyframe frameX = Keyframe.ofFloat(kf.percent, HummerStyleUtils.convertNumber(array[0]));
            Keyframe frameY = Keyframe.ofFloat(kf.percent, HummerStyleUtils.convertNumber(array[1]));
            frameXArray[i] = frameX;
            frameYArray[i] = frameY;
        }

        PropertyValuesHolder frameXHolder = PropertyValuesHolder.ofKeyframe("translationX", frameXArray);
        PropertyValuesHolder frameYHolder = PropertyValuesHolder.ofKeyframe("translationY", frameYArray);
        ObjectAnimator anim = ObjectAnimator.ofPropertyValuesHolder(view, frameXHolder, frameYHolder);
        animator = anim;
        anim.setDuration(getAnimDuration());
        anim.setRepeatCount(repeatCount);
        anim.setStartDelay(getAnimDelay());
        anim.setInterpolator(getInterpolator());
        anim.addListener(animatorListener);
        anim.start();
    }

    @Override
    protected void animScale(View view, int direction) {
        if (keyframes == null) {
            return;
        }

        Keyframe[] frameArray = new Keyframe[keyframes.size()];
        for (int i = 0; i < keyframes.size(); i++) {
            KeyFrame kf = keyframes.get(i);
            Keyframe frame = Keyframe.ofFloat(kf.percent, HummerStyleUtils.convertNumber(kf.value, false));
            frameArray[i] = frame;
        }

        ObjectAnimator anim;
        switch (direction) {
            case DIRECTION_X: {
                PropertyValuesHolder holderX = PropertyValuesHolder.ofKeyframe("scaleX", frameArray);
                anim = ObjectAnimator.ofPropertyValuesHolder(view, holderX);
                break;
            }
            case DIRECTION_Y: {
                PropertyValuesHolder holderY = PropertyValuesHolder.ofKeyframe("scaleY", frameArray);
                anim = ObjectAnimator.ofPropertyValuesHolder(view, holderY);
                break;
            }
            case DIRECTION_XY:
            default: {
                PropertyValuesHolder holderX = PropertyValuesHolder.ofKeyframe("scaleX", frameArray);
                PropertyValuesHolder holderY = PropertyValuesHolder.ofKeyframe("scaleY", frameArray);
                anim = ObjectAnimator.ofPropertyValuesHolder(view, holderX, holderY);
                break;
            }
        }

        animator = anim;
        anim.setDuration(getAnimDuration());
        anim.setRepeatCount(repeatCount);
        anim.setStartDelay(getAnimDelay());
        anim.setInterpolator(getInterpolator());
        anim.addListener(animatorListener);
        anim.start();
    }

    @Override
    protected void animRotation(View view, int axis) {
        if (keyframes == null) {
            return;
        }

        String animName;
        switch (axis) {
            case AXIS_X:
                animName = "rotationX";
                break;
            case AXIS_Y:
                animName = "rotationY";
                break;
            case AXIS_Z:
            default:
                animName = "rotation";
                break;
        }

        Keyframe[] frameArray = new Keyframe[keyframes.size()];
        for (int i = 0; i < keyframes.size(); i++) {
            KeyFrame kf = keyframes.get(i);
            Keyframe frame = Keyframe.ofFloat(kf.percent, HummerStyleUtils.convertNumber(kf.value, false));
            frameArray[i] = frame;
        }

        PropertyValuesHolder frameHolder = PropertyValuesHolder.ofKeyframe(animName, frameArray);
        ObjectAnimator anim = ObjectAnimator.ofPropertyValuesHolder(view, frameHolder);
        animator = anim;
        anim.setDuration(getAnimDuration());
        anim.setRepeatCount(repeatCount);
        anim.setStartDelay(getAnimDelay());
        anim.setInterpolator(getInterpolator());
        anim.addListener(animatorListener);
        anim.start();
    }

    @Override
    protected void animAlpha(View view) {
        if (keyframes == null) {
            return;
        }

        Keyframe[] frameArray = new Keyframe[keyframes.size()];
        for (int i = 0; i < keyframes.size(); i++) {
            KeyFrame kf = keyframes.get(i);
            Keyframe frame = Keyframe.ofFloat(kf.percent, HummerStyleUtils.convertNumber(kf.value, false));
            frameArray[i] = frame;
        }

        PropertyValuesHolder frameHolder = PropertyValuesHolder.ofKeyframe("alpha", frameArray);
        ObjectAnimator anim = ObjectAnimator.ofPropertyValuesHolder(view, frameHolder);
        animator = anim;
        anim.setDuration(getAnimDuration());
        anim.setRepeatCount(repeatCount);
        anim.setStartDelay(getAnimDelay());
        anim.setInterpolator(getInterpolator());
        anim.addListener(animatorListener);
        anim.start();
    }

    @Override
    protected void animBackgroundColor(HMBase base) {
        if (keyframes == null) {
            return;
        }

        Keyframe[] frameArray = new Keyframe[keyframes.size()];
        for (int i = 0; i < keyframes.size(); i++) {
            KeyFrame kf = keyframes.get(i);
            Keyframe frame = Keyframe.ofInt(kf.percent, YogaAttrUtils.parseColor(String.valueOf(kf.value)));
            frameArray[i] = frame;
        }

        PropertyValuesHolder frameHolder = PropertyValuesHolder.ofKeyframe("backgroundColor", frameArray);
        ObjectAnimator anim = ObjectAnimator.ofPropertyValuesHolder(base.getBackgroundHelper(), frameHolder);
        animator = anim;
        anim.setDuration(getAnimDuration());
        anim.setEvaluator(new ArgbEvaluator());
        anim.setRepeatCount(repeatCount);
        anim.setStartDelay(getAnimDelay());
        anim.setInterpolator(getInterpolator());
        anim.addListener(animatorListener);
        anim.start();
    }

    @Override
    protected void animWidth(HMBase base) {
        if (keyframes == null) {
            return;
        }

        Keyframe[] frameArray = new Keyframe[keyframes.size()];
        for (int i = 0; i < keyframes.size(); i++) {
            KeyFrame kf = keyframes.get(i);
            Keyframe frame = Keyframe.ofInt(kf.percent, (int) HummerStyleUtils.convertNumber(kf.value));
            frameArray[i] = frame;
        }

        PropertyValuesHolder frameHolder = PropertyValuesHolder.ofKeyframe("width", frameArray);
        ObjectAnimator anim = ObjectAnimator.ofPropertyValuesHolder(new ViewWrapper(base), frameHolder);
        animator = anim;
        anim.setDuration(getAnimDuration());
        anim.setRepeatCount(repeatCount);
        anim.setStartDelay(getAnimDelay());
        anim.setInterpolator(getInterpolator());
        anim.addListener(animatorListener);
        anim.start();
    }

    @Override
    protected void animHeight(HMBase base) {
        if (keyframes == null) {
            return;
        }

        Keyframe[] frameArray = new Keyframe[keyframes.size()];
        for (int i = 0; i < keyframes.size(); i++) {
            KeyFrame kf = keyframes.get(i);
            Keyframe frame = Keyframe.ofInt(kf.percent, (int) HummerStyleUtils.convertNumber(kf.value));
            frameArray[i] = frame;
        }

        PropertyValuesHolder frameHolder = PropertyValuesHolder.ofKeyframe("height", frameArray);
        ObjectAnimator anim = ObjectAnimator.ofPropertyValuesHolder(new ViewWrapper(base), frameHolder);
        animator = anim;
        anim.setDuration(getAnimDuration());
        anim.setRepeatCount(repeatCount);
        anim.setStartDelay(getAnimDelay());
        anim.setInterpolator(getInterpolator());
        anim.addListener(animatorListener);
        anim.start();
    }
}
