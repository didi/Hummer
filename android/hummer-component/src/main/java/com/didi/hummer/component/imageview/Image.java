package com.didi.hummer.component.imageview;

import android.content.Context;
import android.graphics.Color;
import android.text.TextUtils;
import android.widget.ImageView;

import com.didi.hummer.adapter.imageloader.ImageSizeCallback;
import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsAttribute;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.util.HMGsonUtil;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.style.HummerStyleUtils;
import com.facebook.yoga.YogaUnit;

import java.io.Serializable;
import java.util.Map;

@Component("Image")
public class Image extends HMBase<RoundedImageView> {

    private class ImageStyle implements Serializable {
        public String src;
        public String placeholder;
        public String failedImage;
        public String gifSrc;
        public int gifRepeatCount;
    }

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

    private void requestLayout() {
        getYogaNode().dirty();
        getView().requestLayout();
    }

    /**
     * 如果Image控件本身没有设置大小，这里重新根据图片大小调整Image控件的大小
     *
     * 详细逻辑如下：
     * 1. 如果Image控件的宽和搞都没有设置，那么以图片的实际宽高作为Image控件的宽高；
     * 2. 如果Image控件的宽或高有一个设置了，那么按图片宽高比来计算Image控件的另一个未设置的宽过高；
     * 3. 如果Image控件的宽或高有一个是百分比值，那么需要转换成真实的宽高值再计算；
     *
     * @param imgWidth
     * @param imgHeight
     */
    private void adjustWidthAndHeight(int imgWidth, int imgHeight) {
        if (getYogaNode().getWidth().unit == YogaUnit.AUTO && getYogaNode().getHeight().unit == YogaUnit.AUTO) {
            setWidthAndHeight(imgWidth, imgHeight);
        } else if (getYogaNode().getWidth().unit != YogaUnit.AUTO && getYogaNode().getHeight().unit == YogaUnit.AUTO) {
            if (getYogaNode().getWidth().unit == YogaUnit.PERCENT) {
                getView().post(() -> {
                    float width = getView().getWidth();
                    float height = width / imgWidth * imgHeight;
                    setWidthAndHeight(width, height);
                });
            } else {
                float width = getYogaNode().getWidth().value;
                float height = width / imgWidth * imgHeight;
                setWidthAndHeight(width, height);
            }
        } else if (getYogaNode().getWidth().unit == YogaUnit.AUTO && getYogaNode().getHeight().unit != YogaUnit.AUTO) {
            if (getYogaNode().getHeight().unit == YogaUnit.PERCENT) {
                getView().post(() -> {
                    float height = getView().getHeight();
                    float width = height / imgHeight * imgWidth;
                    setWidthAndHeight(width, height);
                });
            } else {
                float height = getYogaNode().getHeight().value;
                float width = height / imgHeight * imgWidth;
                setWidthAndHeight(width, height);
            }
        }

    }

    private void setWidthAndHeight(float width, float height) {
        getYogaNode().setWidth(width);
        getYogaNode().setHeight(height);
        requestLayout();
    }

    /**
     * 普通图片
     */
    @Deprecated
    @JsProperty("src")
    private String src;

    @Deprecated
    public void setSrc(String src) {
        this.src = src;
        loadImage(src);
    }

    /**
     * Gif图片
     */
    @Deprecated
    @JsProperty("gifSrc")
    private String gifSrc;

    @Deprecated
    public void setGifSrc(String gifSrc) {
        this.gifSrc = gifSrc;
        loadGif(gifSrc, gifRepeatCount);
    }

    /**
     * Gif图片循环次数（默认是0，无限循环）
     */
    @Deprecated
    @JsProperty("gifRepeatCount")
    private int gifRepeatCount;

    @Deprecated
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

    @JsMethod("load")
    public void load(Object src) {
        if (src instanceof String) {
            // 普通图片处理
            loadImage((String) src);
        } else if (src instanceof Map) {
            ImageStyle style = HMGsonUtil.fromJson(HMGsonUtil.toJson(src), ImageStyle.class);
            if (style != null) {
                if (!TextUtils.isEmpty(style.gifSrc)) {
                    // gif图片处理
                    loadGif(style.gifSrc, style.placeholder, style.failedImage, style.gifRepeatCount);
                } else if (!TextUtils.isEmpty(style.src)) {
                    // 普通图片处理
                    loadImage(style.src, style.placeholder, style.failedImage);
                }
            }
        }
    }

    private void loadImage(String url) {
        loadImage(url, null, null);
    }

    private void loadImage(String url, String placeholder, String failedImage) {
        ImageSizeCallback callback = null;
        if (getYogaNode().getWidth().unit == YogaUnit.AUTO || getYogaNode().getHeight().unit == YogaUnit.AUTO) {
            callback = this::adjustWidthAndHeight;
        }
        ImageRenderUtil.renderImage((HummerContext) getContext(), getView(), url, placeholder, failedImage, callback);
    }

    private void loadGif(String url, int repeatCount) {
        loadGif(url, null, null, repeatCount);
    }

    private void loadGif(String url, String placeholder, String failedImage, int repeatCount) {
        ImageSizeCallback callback = null;
        if (getYogaNode().getWidth().unit == YogaUnit.AUTO || getYogaNode().getHeight().unit == YogaUnit.AUTO) {
            callback = this::adjustWidthAndHeight;
        }
        ImageRenderUtil.renderGif((HummerContext) getContext(), getView(), url, placeholder, failedImage, repeatCount, callback);
    }

    @Override
    public void setBorderWidth(float width) {
        getView().setBorderWidth(width);
    }

    @Override
    public void setBorderColor(int color) {
        getView().setBorderColor(color);
    }

    @Override
    public void setBorderStyle(String style) {
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
