package com.didi.hummer2.component;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMAttribute;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMStyle;
import com.didi.hummer2.component.hummer.button.Button;

import java.util.Map;

/**
 * didi Create on 2024/4/9 .
 * <p>
 * Copyright (c) 2024/4/9 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/9 8:07 PM
 * @Description Button
 */

@HMComponent("Button")
public class ButtonElement extends Element<Button> {


    public ButtonElement(HummerContext context, Object[] properties) {
        super(context, properties);
    }

    @Override
    public Button createRenderView() {
        return new Button(context,null,"Button");
    }

    @HMStyle("color")
    public void setColor(int value) {
        getView().setColor(value);
    }

    @HMStyle("textAlign")
    public void setTextAlign(String value) {
        getView().setTextAlign(value);
    }

    @HMStyle("fontFamily")
    public void setFontFamily(String value) {
        getView().setFontFamily(value);
    }

    @HMStyle("fontSize")
    public void setFontSize(int value) {
        getView().setFontSize(value);
    }

    @HMAttribute("text")
    private String text;

    public void setText(String text) {
        this.text = text;
        getView().setText(text);
    }

    @HMAttribute("pressed")
    private Map<String, Object> pressed;

    public void setPressed(Map<String, Object> value) {
        getView().setPressed(value);
    }

    @HMAttribute("disabled")
    private Map<String, Object> disabled;

    public void setDisabled(Map<String, Object> disabled) {
        getView().setDisabled(disabled);
    }
}
