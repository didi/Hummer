package com.didi.hummer.component.imageview;

import android.content.Context;
import android.graphics.Color;
import android.text.TextUtils;
import android.widget.ImageView;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsAttribute;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.style.HummerStyleUtils;

@Component("Image")
public class Image extends HMBase<RoundedImageView> {

    public Image(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
    }

    @Override
    protected RoundedImageView createViewInstance(Context context) {
        return new RoundedImageView(context);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        getView().setScaleType(ImageView.ScaleType.CENTER);
        // 默认支持无障碍模式可聚焦
        getView().setFocusable(true);
    }

    /**
     * 普通图片
     */
    @JsProperty("src")
    private String src;

    public void setSrc(String src) {
        this.src = src;
        ImageRenderUtil.renderImage((HummerContext) getContext(), getView(), src);
    }

    /**
     * Gif图片
     */
    @JsProperty("gifSrc")
    private String gifSrc;

    public void setGifSrc(String gifSrc) {
        this.gifSrc = gifSrc;
        ImageRenderUtil.renderGif((HummerContext) getContext(), getView(), gifSrc, gifRepeatCount);
    }

    /**
     * Gif图片循环次数（默认是0，无限循环）
     */
    @JsProperty("gifRepeatCount")
    private int gifRepeatCount;

    public void setGifRepeatCount(int gifRepeatCount) {
        this.gifRepeatCount = gifRepeatCount;
    }

    @JsAttribute("resize")
    public void setContentMode(String resize) {
        switch (resize) {
            case "origin":
            default:
                getView().setScaleType(ImageView.ScaleType.CENTER);
                break;
            case "contain":
                getView().setScaleType(ImageView.ScaleType.FIT_CENTER);
                break;
            case "cover":
                getView().setScaleType(ImageView.ScaleType.CENTER_CROP);
                break;
            case "stretch":
                getView().setScaleType(ImageView.ScaleType.FIT_XY);
                break;
        }
    }

    @Override
    public void setBorderWidth(float width) {
        if (TextUtils.isEmpty(src)) {
            super.setBorderWidth(width);
        }
        getView().setBorderWidth(width);
    }

    @Override
    public void setBorderColor(int color) {
        if (TextUtils.isEmpty(src)) {
            super.setBorderColor(color);
        }
        getView().setBorderColor(color);
    }

    @Override
    public void setBorderStyle(String style) {
        if (TextUtils.isEmpty(src)) {
            super.setBorderStyle(style);
        }
        getView().setBorderStyle(style);
    }

    @Override
    public void setBorderRadius(Object radius) {
        super.setBorderRadius(radius);

        if (HummerStyleUtils.isPercentValue(radius)) {
            getView().setBorderRadiusPercent(HummerStyleUtils.toPercent(radius) / 100);
        } else if (radius instanceof Float) {
            getView().setBorderRadius((float) radius);
        }
    }

    @Override
    public void setBorderTopLeftRadius(Object radius) {
        super.setBorderTopLeftRadius(radius);
        getView().setCornerRadii(backgroundHelper.getBorderRadii());
    }

    @Override
    public void setBorderTopRightRadius(Object radius) {
        super.setBorderTopRightRadius(radius);
        getView().setCornerRadii(backgroundHelper.getBorderRadii());
    }

    @Override
    public void setBorderBottomRightRadius(Object radius) {
        super.setBorderBottomRightRadius(radius);
        getView().setCornerRadii(backgroundHelper.getBorderRadii());
    }

    @Override
    public void setBorderBottomLeftRadius(Object radius) {
        super.setBorderBottomLeftRadius(radius);
        getView().setCornerRadii(backgroundHelper.getBorderRadii());
    }

    @Override
    public void resetStyle() {
        super.resetStyle();
        setContentMode("origin");
        setBorderWidth(0);
        setBorderColor(Color.TRANSPARENT);
        setBorderRadius(0);
    }

    @Override
    public boolean setStyle(String key, Object value) {
        switch(key) {
            case HummerStyleUtils.Hummer.RESIZE:
                setContentMode(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.BORDER_WIDTH:
                setBorderWidth((float) value);
                break;
            case HummerStyleUtils.Hummer.BORDER_COLOR:
                setBorderColor((int) value);
                break;
            case HummerStyleUtils.Hummer.BORDER_STYLE:
                setBorderStyle((String) value);
                break;
            case HummerStyleUtils.Hummer.BORDER_RADIUS:
                setBorderRadius(value);
                break;
            default:
                return false;
        }
        return true;
    }
}
