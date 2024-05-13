package com.didi.hummer2.component.hummer.viewpager;

import android.view.View;

import com.zhpan.bannerview.transform.ScaleInTransformer;

/**
 * Created by XiaoFeng on 2020/8/17.
 */
public class ScaleAndAlphaTransformer extends ScaleInTransformer {

    public static final float DEFAULT_MIN_ALPHA = 0.5f;
    public static final float MAX_ALPHA = 1f;

    private float mMinAlpha;

    public ScaleAndAlphaTransformer(float minScale, float minAlpha) {
        super(minScale);
        mMinAlpha = minAlpha;
    }

    @Override
    public void transformPage(View view, float position) {
        super.transformPage(view, position);
        if (position < -1 || position > 1) {
            view.setAlpha(mMinAlpha);
        } else {
            if (position < 0) {
                float alphaFactor = (1 + position) * (1 - mMinAlpha) + mMinAlpha;
                view.setAlpha(alphaFactor);
            } else {
                float alphaFactor = (1 - position) * (1 - mMinAlpha) + mMinAlpha;
                view.setAlpha(alphaFactor);
            }
        }
    }
}
