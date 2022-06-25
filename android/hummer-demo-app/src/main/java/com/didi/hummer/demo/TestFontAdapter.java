package com.didi.hummer.demo;

import android.content.Context;
import android.graphics.Typeface;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.TextUtils;

import com.didi.hummer.adapter.font.IFontAdapter;
import com.didi.hummer.adapter.font.impl.DefaultFontAdapter;

/**
 * @author: sunjian
 * created on: 2022/6/25 下午2:02
 * description: 字体适配器示例
 */
public class TestFontAdapter implements IFontAdapter {

    public TestFontAdapter() {
    }

    @Override
    public Typeface loadFont(@NonNull Context context, @Nullable String fontFamily, int style) {
        if (TextUtils.isEmpty(fontFamily)) {
            // 全局默认字体
            return loadFont(context, "SourceSansPro-Bold", style);
        }
        return new DefaultFontAdapter("fonts/").loadFont(context, fontFamily, style);
    }
}
