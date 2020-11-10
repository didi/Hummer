package com.didi.hummer.render.component.anim;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ArgbEvaluator;
import android.animation.ObjectAnimator;
import android.animation.PropertyValuesHolder;
import android.animation.TimeInterpolator;
import android.view.View;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.DecelerateInterpolator;
import android.view.animation.LinearInterpolator;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.style.HummerStyleUtils;
import com.didi.hummer.render.utility.YogaAttrUtils;

import java.util.Map;

/**
 * 基础动画组件
 *
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

    public static final int AXIS_X = 1;
    public static final int AXIS_Y = 2;
    public static final int AXIS_Z = 3;

    public static final int DIRECTION_X = 11;
    public static final int DIRECTION_Y = 12;
    public static final int DIRECTION_XY = 13;

    protected Animator animator;
    protected String animType;
    protected JSCallback animStartCallback;
    protected JSCallback animEndCallback;

    /**
     * View包装类，方便做属性动画用
     */
    protected static class ViewWrapper {
        private HMBase mTarget;

        public ViewWrapper(HMBase base) {
            mTarget = base;
        }

        public void setWidth(int width) {
            mTarget.getYogaNode().setWidth(width);
            mTarget.getView().requestLayout();
        }

        public void setHeight(int height) {
            mTarget.getYogaNode().setHeight(height);
            mTarget.getView().requestLayout();
        }
    }

    public BasicAnimation(String animType) {
        this.animType = animType;
    }

    protected long getAnimDuration() {
        return (long) (duration * 1000);
    }

    protected int getAnimDelay() {
        return (int) (delay * 1000);
    }

    protected TimeInterpolator getInterpolator() {
        if ("linear".equalsIgnoreCase(easing)) {
            return new LinearInterpolator();
        } else if ("ease-in".equalsIgnoreCase(easing)) {
            return new AccelerateInterpolator();
        } else if ("ease-out".equalsIgnoreCase(easing)) {
            return new DecelerateInterpolator();
        } else if ("ease-in-out".equalsIgnoreCase(easing)) {
            return new AccelerateDecelerateInterpolator();
        } else {
            return new AccelerateDecelerateInterpolator();
        }
    }

    protected Object[] trans2Array(Object value) {
        Object[] array = null;
        if (value instanceof Map) {
            Map map = (Map) value;
            array = new Object[2];
            Object objX = map.get("x");
            Object objY = map.get("y");
            array[0] = objX;
            array[1] = objY;
        }
        return array;
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
        View view = base.getView();
        if ("position".equalsIgnoreCase(animType)) {
            animTranslation(view);
        } else if ("opacity".equalsIgnoreCase(animType)) {
            animAlpha(view);
        } else if ("scale".equalsIgnoreCase(animType)) {
            animScale(view, DIRECTION_XY);
        } else if ("scaleX".equalsIgnoreCase(animType)) {
            animScale(view, DIRECTION_X);
        } else if ("scaleY".equalsIgnoreCase(animType)) {
            animScale(view, DIRECTION_Y);
        } else if ("rotationX".equalsIgnoreCase(animType)) {
            animRotation(view, AXIS_X);
        } else if ("rotationY".equalsIgnoreCase(animType)) {
            animRotation(view, AXIS_Y);
        } else if ("rotationZ".equalsIgnoreCase(animType)) {
            animRotation(view, AXIS_Z);
        } else if ("backgroundColor".equalsIgnoreCase(animType)) {
            animBackgroundColor(base);
        } else if ("width".equalsIgnoreCase(animType)) {
            animWidth(base);
        } else if ("height".equalsIgnoreCase(animType)) {
            animHeight(base);
        }
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

    /**
     * 平移动画
     */
    protected void animTranslation(View view) {
        if (value == null) {
            return;
        }

        float[] vs = null;
        Object[] valueArray = trans2Array(value);
        if (valueArray != null && valueArray.length == 2) {
            vs = new float[2];
            vs[0] = HummerStyleUtils.convertNumber(valueArray[0]);
            vs[1] = HummerStyleUtils.convertNumber(valueArray[1]);
        }

        if (vs == null) {
            return;
        }

        float[] fs = null;
        Object[] fromArray = trans2Array(from);
        if (fromArray != null && fromArray.length == 2) {
            fs = new float[2];
            fs[0] = HummerStyleUtils.convertNumber(fromArray[0]);
            fs[1] = HummerStyleUtils.convertNumber(fromArray[1]);
        }

        ObjectAnimator anim;
        if (fs != null) {
            PropertyValuesHolder holderX = PropertyValuesHolder.ofFloat("translationX", fs[0], vs[0]);
            PropertyValuesHolder holderY = PropertyValuesHolder.ofFloat("translationY", fs[1], vs[1]);
            anim = ObjectAnimator.ofPropertyValuesHolder(view, holderX, holderY);
        } else {
            PropertyValuesHolder holderX = PropertyValuesHolder.ofFloat("translationX", vs[0]);
            PropertyValuesHolder holderY = PropertyValuesHolder.ofFloat("translationY", vs[1]);
            anim = ObjectAnimator.ofPropertyValuesHolder(view, holderX, holderY);
        }

        animator = anim;
        anim.setDuration(getAnimDuration());
        anim.setRepeatCount(repeatCount);
        anim.setStartDelay(getAnimDelay());
        anim.setInterpolator(getInterpolator());
        anim.addListener(animatorListener);
        anim.start();
    }

    /**
     * 缩放动画
     */
    protected void animScale(View view, int direction) {
        if (value == null) {
            return;
        }

        float f = HummerStyleUtils.convertNumber(from, false);
        float v = HummerStyleUtils.convertNumber(value, false);
        ObjectAnimator anim;
        switch (direction) {
            case DIRECTION_X:
                if (from != null) {
                    anim = ObjectAnimator.ofFloat(view, "scaleX", f, v);
                } else {
                    anim = ObjectAnimator.ofFloat(view, "scaleX", v);
                }
                break;
            case DIRECTION_Y:
                if (from != null) {
                    anim = ObjectAnimator.ofFloat(view, "scaleY", f, v);
                } else {
                    anim = ObjectAnimator.ofFloat(view, "scaleY", v);
                }
                break;
            case DIRECTION_XY:
            default:
                if (from != null) {
                    PropertyValuesHolder holderX = PropertyValuesHolder.ofFloat("scaleX", f, v);
                    PropertyValuesHolder holderY = PropertyValuesHolder.ofFloat("scaleY", f, v);
                    anim = ObjectAnimator.ofPropertyValuesHolder(view, holderX, holderY);
                } else {
                    PropertyValuesHolder holderX = PropertyValuesHolder.ofFloat("scaleX", v);
                    PropertyValuesHolder holderY = PropertyValuesHolder.ofFloat("scaleY", v);
                    anim = ObjectAnimator.ofPropertyValuesHolder(view, holderX, holderY);
                }
                break;
        }
        animator = anim;
        anim.setDuration(getAnimDuration());
        anim.setRepeatCount(repeatCount);
        anim.setStartDelay(getAnimDelay());
        anim.setInterpolator(getInterpolator());
        anim.addListener(animatorListener);
        anim.start();
    }

    /**
     * 旋转动画
     */
    protected void animRotation(View view, int axis) {
        if (value == null) {
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

        float f = HummerStyleUtils.convertNumber(from, false);
        float v = HummerStyleUtils.convertNumber(value, false);

        ObjectAnimator anim;
        if (from != null) {
            anim = ObjectAnimator.ofFloat(view, animName, f, v);
        } else {
            anim = ObjectAnimator.ofFloat(view, animName, v);
        }
        animator = anim;
        anim.setDuration(getAnimDuration());
        anim.setRepeatCount(repeatCount);
        anim.setStartDelay(getAnimDelay());
        anim.setInterpolator(getInterpolator());
        anim.addListener(animatorListener);
        anim.start();
    }


    /**
     * 透明度动画
     */
    protected void animAlpha(View view) {
        if (value == null) {
            return;
        }

        float f = HummerStyleUtils.convertNumber(from, false);
        float v = HummerStyleUtils.convertNumber(value, false);

        ObjectAnimator anim;
        if (from != null) {
            anim = ObjectAnimator.ofFloat(view, "alpha", f, v);
        } else {
            anim = ObjectAnimator.ofFloat(view, "alpha", v);
        }
        animator = anim;
        anim.setDuration(getAnimDuration());
        anim.setRepeatCount(repeatCount);
        anim.setStartDelay(getAnimDelay());
        anim.setInterpolator(getInterpolator());
        anim.addListener(animatorListener);
        anim.start();
    }

    /**
     * 背景颜色渐变动画
     */
    protected void animBackgroundColor(HMBase base) {
        if (value == null) {
            return;
        }

        int f = YogaAttrUtils.parseColor(String.valueOf(from));
        int v = YogaAttrUtils.parseColor(String.valueOf(value));

        ObjectAnimator anim;
        if (from != null) {
            anim = ObjectAnimator.ofInt(base.getBackgroundHelper(), "backgroundColor", f, v);
        } else {
            anim = ObjectAnimator.ofInt(base.getBackgroundHelper(), "backgroundColor", v);
        }
        animator = anim;
        anim.setDuration(getAnimDuration());
        anim.setRepeatCount(repeatCount);
        anim.setStartDelay(getAnimDelay());
        anim.setInterpolator(getInterpolator());
        anim.setEvaluator(new ArgbEvaluator());
        anim.addListener(animatorListener);
        anim.start();
    }

    /**
     * 控件宽度动画
     */
    protected void animWidth(HMBase base) {
        if (value == null) {
            return;
        }

        Runnable runnable = () -> {
            int f = from != null ? (int) HummerStyleUtils.convertNumber(from) : base.getView().getWidth();
            int v = (int) HummerStyleUtils.convertNumber(value);
            if (f == v) {
                return;
            }

            ObjectAnimator anim = ObjectAnimator.ofInt(new ViewWrapper(base), "width", f, v);
            animator = anim;
            anim.setDuration(getAnimDuration());
            anim.setRepeatCount(repeatCount);
            anim.setStartDelay(getAnimDelay());
            anim.setInterpolator(getInterpolator());
            anim.addListener(animatorListener);
            anim.start();
        };

        if (from != null) {
            runnable.run();
        } else {
            base.getView().post(runnable);
        }

    }

    /**
     * 控件高度动画
     */
    protected void animHeight(HMBase base) {
        if (value == null) {
            return;
        }

        Runnable runnable = () -> {
            int f = from != null ? (int) HummerStyleUtils.convertNumber(from) : base.getView().getHeight();
            int v = (int) HummerStyleUtils.convertNumber(value);
            if (f == v) {
                return;
            }

            ObjectAnimator anim = ObjectAnimator.ofInt(new ViewWrapper(base), "height", f, v);
            animator = anim;
            anim.setDuration(getAnimDuration());
            anim.setRepeatCount(repeatCount);
            anim.setStartDelay(getAnimDelay());
            anim.setInterpolator(getInterpolator());
            anim.addListener(animatorListener);
            anim.start();
        };

        if (from != null) {
            runnable.run();
        } else {
            base.getView().post(runnable);
        }
    }

}
