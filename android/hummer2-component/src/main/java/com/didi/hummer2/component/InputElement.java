package com.didi.hummer2.component;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMAttribute;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMStyle;
import com.didi.hummer2.component.hummer.input.Input;

/**
 * didi Create on 2024/4/9 .
 * <p>
 * Copyright (c) 2024/4/9 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/9 8:07 PM
 * @Description Input
 */

@HMComponent("Input")
public class InputElement extends Element<Input> {


    public InputElement(HummerContext context, Object[] properties) {
        super(context, properties);
    }

    @Override
    public Input createRenderView() {
        return new Input(context,null,null);
    }

    @HMStyle("type")
    public void setType(String value) {
        getView().setType(value);
    }

    @HMStyle("color")
    public void setColor(int color) {
        getView().setColor(color);
    }

    @HMStyle("placeholderColor")
    public void setPlaceholderColor(int value) {
        getView().setPlaceholderColor(value);
    }

    @HMStyle("cursorColor")
    public void setCursorColor(int value) {
        getView().setCursorColor(value);
    }

    @HMStyle("textAlign")
    public void setTextAlign(String value) {
        getView().setTextAlign(value);
    }

    @HMStyle("fontFamily")
    public void setFontFamily(String fontFamily) {
        getView().setFontFamily(fontFamily);
    }


    @HMStyle("fontSize")
    public void setFontSize(float value) {
        getView().setFontSize(value);
    }

    @HMStyle("maxLength")
    public void setMaxLength(int value) {
        getView().setMaxLength(value);
    }

    @HMStyle("returnKeyType")
    public void setReturnKeyType(String value) {
        getView().setReturnKeyType(value);
    }


    @HMAttribute("text")
    private String text;

    public String getText() {
        return getView().getText();
    }

    public void setText(String text) {
        this.text = text;
        getView().setText(text);
    }

    @HMAttribute("focused")
    private boolean focused;

    public boolean isFocused() {
        return getView().getFocused();

    }

    public void setFocused(boolean focused) {
        getView().setFocused(focused);
    }

    @HMAttribute("placeholder")
    private String placeholder;


    public void setPlaceholder(String placeholder) {
        getView().setPlaceholder(placeholder);
    }
}
