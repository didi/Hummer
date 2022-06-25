package com.didi.hummer.adapter.font.impl;

import android.content.Context;
import android.graphics.Typeface;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.TextUtils;

import com.didi.hummer.adapter.font.IFontAdapter;
import com.didi.hummer.core.util.HMLog;

/**
 * 加载Assets/fonts下字体，遵守命名规范
 * 可实现IFontAdapter获取自定义字体库，设置方法{@link com.didi.hummer.HummerConfig.Builder#setFontAdapter(IFontAdapter)}
 *
 * @author: sunjian
 * created on: 2022/6/25 下午2:02
 * description: 默认字体适配器
 */
public class DefaultFontAdapter implements IFontAdapter {

    private static final String[] EXTENSIONS = {
            "",
            "_bold",
            "_italic",
            "_bold_italic"
    };

    private static final String[] FILE_EXTENSIONS = {".ttf", ".otf"};

    private static final String FONTS_ASSET_PATH = "fonts/";

    private final String fontsAssetsPath;

    public DefaultFontAdapter(String fontsAssetsPath) {
        if (TextUtils.isEmpty(fontsAssetsPath)) {
            this.fontsAssetsPath = FONTS_ASSET_PATH;
            return;
        }
        if (!TextUtils.isEmpty(fontsAssetsPath) && !fontsAssetsPath.endsWith("/")) {
            // 如果设置了路径，则自动加上"/"，如果是空字符就不加了，空字符代表是在assets根目录下
            fontsAssetsPath += "/";
        }
        this.fontsAssetsPath = fontsAssetsPath;
    }

    @Override
    public Typeface loadFont(@NonNull Context context, @Nullable String fontFamily, int style) {
        if (TextUtils.isEmpty(fontFamily)) {
            return null;
        }
        final String extension = EXTENSIONS[style];
        for (String fileExtension : FILE_EXTENSIONS) {
            final String fileName = fontsAssetsPath + fontFamily + extension + fileExtension;
            try {
                return Typeface.createFromAsset(context.getAssets(), fileName);
            } catch (Exception e) {
                HMLog.w("HummerNative", e.getMessage());
            }
        }
        return null;
    }
}
