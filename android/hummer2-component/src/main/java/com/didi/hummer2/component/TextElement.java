package com.didi.hummer2.component;


import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMAttribute;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMStyle;
import com.didi.hummer2.component.hummer.text.Text;

/**
 * didi Create on 2023/12/4 .
 * <p>
 * Copyright (c) 2023/12/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/12/4 3:59 PM
 * @Description Text组件
 */

@HMComponent("Text")
public class TextElement extends Element<Text> {

    public TextElement(HummerContext context) {
        super(context, null);
    }

    @Override
    public Text createRenderView() {
        return new Text(context, null, "Text");
    }

    @HMStyle("color")
    public void setColor(int color) {
        getView().setColor(color);
    }

    @HMStyle("fontFamily")
    public void setFontFamily(String fontFamily) {
        getView().setFontFamily(fontFamily);
    }

    @HMStyle("fontSize")
    public void setFontSize(float value) {
        getView().setFontSize(value);
    }

    @HMStyle("fontWeight")
    public void setFontWeight(String value) {
        getView().setFontWeight(value);
    }

    @HMStyle("fontStyle")
    public void setFontStyle(String value) {
        getView().setFontStyle(value);
    }

    @HMStyle("textAlign")
    public void setTextAlign(String value) {
        getView().setTextAlign(value);
    }

    @HMStyle("textVerticalAlign")
    public void setTextVerticalAlign(String value) {
        getView().setTextVerticalAlign(value);
    }

    @HMStyle("textDecoration")
    public void setTextDecoration(String value) {
        getView().setTextDecoration(value);
    }

    @HMStyle("textOverflow")
    public void setTextOverflow(String value) {
        getView().setTextOverflow(value);
    }

    @HMStyle("textLineClamp")
    public void setTextLineClamp(int value) {
        getView().setTextLineClamp(value);
    }

    @HMStyle("letterSpacing")
    public void setLetterSpacing(float value) {
        getView().setLetterSpacing(value);
    }

    @HMStyle("lineSpacingMulti")
    public void setLineSpacingMulti(float value) {
        getView().setLineSpacingMulti(value);
    }

    @HMAttribute("text")
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
        getView().setText(text);
    }

    @HMAttribute("richText")
    private String richText;

    public String getRichText() {
        return richText;
    }

    public void setRichText(String richText) {
        this.richText = richText;
        getView().setRichText(richText);
    }

    @HMAttribute("textCopyEnable")
    private boolean textCopyEnable = false;

    public boolean isTextCopyEnable() {
        return textCopyEnable;
    }

    public void setTextCopyEnable(boolean textCopyEnable) {
        this.textCopyEnable = textCopyEnable;
        getView().setTextCopyEnable(textCopyEnable);
    }
}
