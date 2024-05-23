package com.didi.hummer2.render.anim;

import android.text.TextUtils;

import com.didi.hummer2.render.component.anim.BasicAnimation;
import com.didi.hummer2.render.component.anim.KeyframeAnimation;

import java.io.Serializable;
import java.util.List;

/**
 * didi Create on 2024/4/22 .
 * <p>
 * Copyright (c) 2024/4/22 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/22 3:08 PM
 * @Description HummerAnimation
 */

public class HummerAnimation implements Serializable {

    /**
     * 上面两个动画组件，均支持以下几种动画类型，通过组件对象的构造函数参数传入：
     * position- 平移动画，单位：px、hm、dp/pt
     * scale- 缩放动画（x轴和y轴同时）
     * scaleX- 缩放动画（x轴）
     * scaleY- 缩放动画（y轴）
     * rotationX- 旋转动画（x轴），单位：度
     * rotationY- 旋转动画（y轴），单位：度
     * rotationZ- 旋转动画（z轴），单位：度
     * opacity- 透明度动画，取值为[0, 1]（0-全透明, 1-不透明）
     * backgroundColor- 背景色动画
     * width- 宽度动画
     * height- 高度动画
     */

    /**
     * 动画类别
     * basic/keyframe
     */
    private String type;
    /**
     * 动画类型：
     */
    private String property;

    private Object from;

    private Object value;

    private float duration;

    private float delay;

    private int repeatCount;

    private String repeatMode;

    private String easing;

    private List<KeyFrame> keyframes;


    public BasicAnimation getOriginAnimation() {
        if (TextUtils.equals(type, "keyframe")) {
            return toKeyframeAnimation();
        } else {
            return toBasicAnimation();
        }
    }


    public BasicAnimation toBasicAnimation() {
        BasicAnimation animation = new BasicAnimation(property);
        animation.value = value;
        animation.from = from;
        animation.duration = duration;
        animation.delay = delay;
        animation.repeatCount = repeatCount;
        animation.repeatMode = repeatMode;
        animation.easing = easing;
        return animation;
    }

    public KeyframeAnimation toKeyframeAnimation() {
        KeyframeAnimation animation = new KeyframeAnimation(property);
        animation.value = value;
        animation.from = from;
        animation.duration = duration;
        animation.delay = delay;
        animation.repeatCount = repeatCount;
        animation.repeatMode = repeatMode;
        animation.setKeyframes(keyframes);
        return animation;
    }


}
