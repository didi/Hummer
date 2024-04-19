package com.didi.hummer2.component;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMAttribute;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMStyle;
import com.didi.hummer2.component.hummer.image.Image;

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
        return new Image(context,null,null);
    }

    @HMStyle("reSize")
    public void setColor(String value) {
        getView().setContentMode(value);
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

    @HMAttribute("gifRepeatCount")
    private int gifRepeatCount;

    public void setGifRepeatCount(int gifRepeatCount) {
        this.gifRepeatCount = gifRepeatCount;
    }


}
