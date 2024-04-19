package com.didi.hummer2.render.component.anim;

import android.graphics.Matrix;
import android.os.Build;
import android.view.View;

import com.didi.hummer2.render.component.view.HMBase;

//import com.didi.hummer.render.component.view.HMBase;

public class AnimViewWrapper {

    private HMBase mTarget;

    public AnimViewWrapper(HMBase base) {
        mTarget = base;
    }


    public void setBackgroundColor(int color) {
        mTarget.getBackgroundHelper().setBackgroundColor(color);
    }

    public int getBackgroundColor() {
        return mTarget.getBackgroundHelper().getBackgroundColor();
    }

    public void setRotation(float rotation) {

        mTarget.getView().setRotation(rotation);
    }

    public float getRotation() {
        return mTarget.getView().getRotation();
    }

    public void setRotationY(float rotationY) {
        mTarget.getView().setRotationY(rotationY);
    }

    public float getRotationY() {
        return mTarget.getView().getRotationY();
    }

    public void setRotationX(float rotationX) {
        mTarget.getView().setRotationX(rotationX);
    }

    public float getRotationX() {
        return mTarget.getView().getRotationX();
    }

    public float getScaleY() {

        return mTarget.getView().getScaleY();

    }

    public void setScaleY(float scaleY) {
        mTarget.getView().setScaleY(scaleY);
    }

    public float getScaleX() {
        return mTarget.getView().getScaleX();
    }

    public void setScaleX(float scaleX) {
        mTarget.getView().setScaleX(scaleX);
    }

    public void setTranslationX(float translationX) {
        mTarget.getView().setTranslationX(translationX);

    }

    public float getTranslationX() {
        return mTarget.getView().getTranslationX();
    }

    public void setTranslationY(float translationY) {
        mTarget.getView().setTranslationY(translationY);
    }

    public float getTranslationY() {
        return mTarget.getView().getTranslationY();
    }

    public void setAlpha(float alpha) {
        mTarget.getView().setAlpha(alpha);
    }

    public float getAlpha() {
        return mTarget.getView().getAlpha();
    }

    public void setWidth(int width) {
        mTarget.getYogaNode().setWidth(width);
        mTarget.getView().requestLayout();
    }

    public int getWidth() {
        return mTarget.getView().getWidth();
    }

    public void setHeight(int height) {
        mTarget.getYogaNode().setHeight(height);
        mTarget.getView().requestLayout();
    }

    public int getHeight() {
        return mTarget.getView().getHeight();
    }

    public void setSkewX(float x) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            View view = mTarget.getView();
            Matrix matrix = view.getAnimationMatrix();
            if (matrix == null) {
                matrix = new Matrix();
            }
            float[] values = new float[9];
            matrix.getValues(values);

            matrix.setSkew(x, values[Matrix.MSKEW_Y]);
            view.setAnimationMatrix(matrix);
        }
    }

    public float getSkewX() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            Matrix matrix = mTarget.getView().getAnimationMatrix();
            if (matrix == null) {
                matrix = mTarget.getView().getMatrix();
            }
            float[] values = new float[9];
            matrix.getValues(values);
            return values[Matrix.MSKEW_X];
        }
        return 0;
    }

    public void setSkewY(float y) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            View view = mTarget.getView();
            Matrix matrix = view.getAnimationMatrix();
            if (matrix == null) {
                matrix = new Matrix();
            }
            float[] values = new float[9];
            matrix.getValues(values);

            matrix.setSkew(values[Matrix.MSKEW_X], y);
            view.setAnimationMatrix(matrix);
        }
    }

    public float getSkewY() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            Matrix matrix = mTarget.getView().getAnimationMatrix();
            if (matrix == null) {
                matrix = mTarget.getView().getMatrix();
            }
            float[] values = new float[9];
            matrix.getValues(values);
            return values[Matrix.MSKEW_Y];
        }
        return 0;
    }

}
