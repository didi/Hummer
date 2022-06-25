package com.didi.hummer.adapter.font;

import android.content.Context;
import android.graphics.Typeface;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

/**
 * @author: sunjian
 * created on: 2022/6/25 下午1:56
 * description: 字体适配接口
 */
public interface IFontAdapter {
    /**
     * 加载工程字体库
     *
     * @param context    上下文，Application
     * @param fontFamily 字体fontFamily，可空（判断设置默认字体fontFamily，可全局生效）
     * @param style      字体style {@link Typeface#NORMAL,Typeface#BOLD,Typeface#ITALIC,Typeface#BOLD_ITALIC}
     * @return Typeface
     */
    Typeface loadFont(@NonNull Context context, @Nullable String fontFamily, int style);
}
