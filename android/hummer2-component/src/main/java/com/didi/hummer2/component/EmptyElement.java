package com.didi.hummer2.component;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMAttribute;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.annotation.HMStyle;
import com.didi.hummer2.component.hummer.view.View;

/**
 * didi Create on 2024/4/9 .
 * <p>
 * Copyright (c) 2024/4/9 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/9 8:07 PM
 * @Description Empty
 */

@HMComponent("Empty")
public class EmptyElement extends Element<View> {


    public EmptyElement(HummerContext context, Object[] properties) {
        super(context, properties);
    }

    @Override
    public View createRenderView() {
        return new View(context,null,null);
    }

    @HMStyle("color")
    public void setColor(int value) {
    }

    @HMAttribute("text")
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @HMMethod("replaceChild")
    public void replaceChild(Element child, Element old) {
    }

}
