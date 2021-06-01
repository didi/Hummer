package com.didi.hummer.render.component.view;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.view.View;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.render.utility.RTLUtil;
import com.didi.hummer.render.utility.YogaDrawableUtil;

/**
 * 控件背景设置帮助类
 *
 * Created by XiaoFeng on 2019-09-09.
 */
public class BackgroundHelper {

    private Context context;
    private View view;
    private BackgroundDrawable backgroundDrawable;

    public BackgroundHelper(Context context, View view) {
        this.context = context;
        this.view = view;
    }

    private BackgroundDrawable getBgDrawable() {
        if (backgroundDrawable == null) {
            boolean supportRTL = context instanceof HummerContext && HummerSDK.isSupportRTL(((HummerContext) context).getNamespace());
            boolean needRTL = supportRTL && RTLUtil.isRTL(context);
            backgroundDrawable = new BackgroundDrawable(needRTL);
            if (view != null) {
                view.setBackground(backgroundDrawable);
            }
        }
        return backgroundDrawable;
    }

    // 给ObjectAnimator调用
    public void setBackgroundColor(int color) {
        getBgDrawable().setColor(color);
    }

    // 给ObjectAnimator调用
    public int getBackgroundColor() {
        return getBgDrawable().getColor();
    }

    public void setBackgroundColor(Object color) {
        getBgDrawable().setColor(color);
    }

    public void setBackgroundImage(String image) {
        YogaDrawableUtil.renderDrawable((HummerContext) context, getBgDrawable(), image);
    }

    public void setBorderStyle(String style) {
        getBgDrawable().setBorderStyle(style);
    }

    public void setBorderLeftStyle(String style) {
        getBgDrawable().setBorderLeftStyle(style);
    }

    public void setBorderTopStyle(String style) {
        getBgDrawable().setBorderTopStyle(style);
    }

    public void setBorderRightStyle(String style) {
        getBgDrawable().setBorderRightStyle(style);
    }

    public void setBorderBottomStyle(String style) {
        getBgDrawable().setBorderBottomStyle(style);
    }

    public void setBorderWidth(float width) {
        getBgDrawable().setBorderWidth(width);
    }

    public void setBorderLeftWidth(float width) {
        getBgDrawable().setBorderLeftWidth(width);
    }

    public void setBorderTopWidth(float width) {
        getBgDrawable().setBorderTopWidth(width);
    }

    public void setBorderRightWidth(float width) {
        getBgDrawable().setBorderRightWidth(width);
    }

    public void setBorderBottomWidth(float width) {
        getBgDrawable().setBorderBottomWidth(width);
    }

    public void setBorderColor(int color) {
        getBgDrawable().setBorderColor(color);
    }

    public void setBorderLeftColor(int color) {
        getBgDrawable().setBorderLeftColor(color);
    }

    public void setBorderTopColor(int color) {
        getBgDrawable().setBorderTopColor(color);
    }

    public void setBorderRightColor(int color) {
        getBgDrawable().setBorderRightColor(color);
    }

    public void setBorderBottomColor(int color) {
        getBgDrawable().setBorderBottomColor(color);
    }

    public void setBorderRadius(float radius) {
        getBgDrawable().setBorderRadius(radius);
    }

    public void setBorderTopLeftRadius(float radius) {
        getBgDrawable().setBorderTopLeftRadius(radius);
    }

    public void setBorderTopRightRadius(float radius) {
        getBgDrawable().setBorderTopRightRadius(radius);
    }

    public void setBorderBottomRightRadius(float radius) {
        getBgDrawable().setBorderBottomRightRadius(radius);
    }

    public void setBorderBottomLeftRadius(float radius) {
        getBgDrawable().setBorderBottomLeftRadius(radius);
    }

    public void setBorderRadiusPercent(float radiusPercent) {
        getBgDrawable().setBorderRadiusPercent(radiusPercent);
    }

    public void setBorderTopLeftRadiusPercent(float radiusPercent) {
        getBgDrawable().setBorderTopLeftRadiusPercent(radiusPercent);
    }

    public void setBorderTopRightRadiusPercent(float radiusPercent) {
        getBgDrawable().setBorderTopRightRadiusPercent(radiusPercent);
    }

    public void setBorderBottomRightRadiusPercent(float radiusPercent) {
        getBgDrawable().setBorderBottomRightRadiusPercent(radiusPercent);
    }

    public void setBorderBottomLeftRadiusPercent(float radiusPercent) {
        getBgDrawable().setBorderBottomLeftRadiusPercent(radiusPercent);
    }

    BackgroundDrawable.Border getBorder() {
        return getBgDrawable().getBorder();
    }

    public float[] getBorderRadii() {
        return getBgDrawable().getBorderRadii();
    }

    public void setShadow(float radius, float dx, float dy, int color) {
        getBgDrawable().setShadow(radius, dx, dy, color);
    }

    public Drawable getBackgroundDrawable() {
        if (view == null) {
            return null;
        }
        return view.getBackground();
    }

    public void setBackgroundDrawable(Drawable drawable) {
        if (view == null) {
            return;
        }
        view.setBackground(drawable);
    }
}
