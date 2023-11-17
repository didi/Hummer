package com.didi.hummer.component.text;

import android.graphics.Color;
import android.text.TextPaint;
import android.text.style.URLSpan;

import androidx.annotation.NonNull;

/**
 * URLSpan扩展类，支持修改url文字颜色和去掉下划线
 *
 * Created by XiaoFeng on 2020-02-12.
 */
public class URLSpanEx extends URLSpan {

    private int linkColor = Color.TRANSPARENT;
    private boolean showUnderline = true;

    public URLSpanEx(String url) {
        super(url);
    }

    public URLSpanEx(String url, int linkColor) {
        super(url);
        this.linkColor = linkColor;
    }

    public URLSpanEx(String url, int linkColor, boolean showUnderline) {
        super(url);
        this.linkColor = linkColor;
        this.showUnderline = showUnderline;
    }

    @Override
    public void updateDrawState(@NonNull TextPaint ds) {
        if (linkColor == Color.TRANSPARENT) {
            linkColor = ds.linkColor;
        }
        ds.setColor(linkColor);
        ds.setUnderlineText(showUnderline);
    }
}
