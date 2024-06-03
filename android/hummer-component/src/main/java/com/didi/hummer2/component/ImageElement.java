package com.didi.hummer2.component;

import android.text.TextUtils;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMAttribute;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMStyle;
import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.component.hummer.image.Image;
import com.didi.hummer2.render.Element;
import com.didi.hummer2.render.event.base.Event;

/**
 * didi Create on 2024/4/9 .
 * <p>
 * Copyright (c) 2024/4/9 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/9 8:07 PM
 * @Description Image
 */

@HMComponent("Image")
public class ImageElement extends Element<Image> {


    public ImageElement(HummerContext context, Object[] properties) {
        super(context, properties);
    }

    @Override
    public Image createRenderView() {
        return new Image(context, null, null);
    }

    @HMStyle("resize")
    public void setContentMode(String value) {
        getView().setContentMode(value);
    }

    @HMAttribute("gifRepeatCount")
    private int gifRepeatCount;

    public void setGifRepeatCount(int gifRepeatCount) {
        this.gifRepeatCount = gifRepeatCount;
        getView().setGifRepeatCount(gifRepeatCount);
    }

    @HMAttribute("placeholder")
    private String placeholder;

    public void setPlaceholder(String placeholder) {
        this.placeholder = placeholder;
    }

    @HMAttribute("failedImage")
    private String failedImage;

    public void setFailedImage(String failedImage) {
        this.failedImage = failedImage;
    }

    @HMAttribute("src")
    private String src;

    public void setSrc(String src) {
        this.src = src;
    }

    @HMAttribute("gifSrc")
    private String gifSrc;

    public void setGifSrc(String gifSrc) {
        this.gifSrc = gifSrc;
    }

    @Override
    protected void onAttributesUpdated() {
        if (TextUtils.isEmpty(placeholder) && TextUtils.isEmpty(failedImage)) {
            if (!TextUtils.isEmpty(src)) {
                getView().load(src, getEventTargetListener());
            } else {
                if (!TextUtils.isEmpty(gifSrc)) {
                    getView().loadGif(gifSrc, getEventTargetListener());
                }
            }
        } else {
            Image.ImageStyle imageStyle = new Image.ImageStyle();
            imageStyle.failedImage = failedImage;
            imageStyle.placeholder = placeholder;
            imageStyle.src = src;
            imageStyle.gifSrc = gifSrc;
            imageStyle.gifRepeatCount = gifRepeatCount;
            getView().load(imageStyle, getEventTargetListener());
        }

    }



}
