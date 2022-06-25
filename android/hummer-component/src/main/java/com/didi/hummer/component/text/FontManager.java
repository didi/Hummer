
package com.didi.hummer.component.text;


import android.content.res.AssetManager;
import android.graphics.Typeface;
import android.text.TextUtils;
import android.util.SparseArray;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.adapter.font.IFontAdapter;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.util.HMLog;

import java.util.HashMap;
import java.util.Map;

public class FontManager {

    private static final String[] EXTENSIONS = {
            "",
            "_bold",
            "_italic",
            "_bold_italic"
    };

    private static final String[] FILE_EXTENSIONS = {".ttf", ".otf"};

    private static final String FONTS_ASSET_PATH = "fonts/";

    public static final String DEFAULT_FONT_FAMILY = "DEFAULT_FONT_FAMILY";

    private static FontManager instance;

    private Map<String, FontFamily> mFontCache;

    private FontManager() {
        mFontCache = new HashMap<>();
    }

    public static FontManager getInstance() {
        if (instance == null) {
            instance = new FontManager();
        }
        return instance;
    }

    public Typeface getTypeface(HummerContext context, String fontFamilyName, int style) {
        FontFamily fontFamily = mFontCache.get(fontFamilyName);
        if (fontFamily == null) {
            fontFamily = new FontFamily();
            mFontCache.put(fontFamilyName, fontFamily);
        }

        Typeface typeface = fontFamily.getTypeface(style);
        if (typeface == null) {
            final IFontAdapter fontAdapter = HummerSDK.getHummerConfig(context.getNamespace()).getFontAdapter();
            typeface = fontAdapter.loadFont(context.getApplicationContext(), DEFAULT_FONT_FAMILY.equals(fontFamilyName) ? null : fontFamilyName, style);
            if (typeface != null) {
                fontFamily.setTypeface(style, typeface);
            }
        }

        return typeface;
    }

    @Deprecated
    public Typeface getTypeface(String fontFamilyName, int style, AssetManager assetManager) {
        return getTypeface(fontFamilyName, FONTS_ASSET_PATH, style, assetManager);
    }

    @Deprecated
    public Typeface getTypeface(String fontFamilyName, String fontsAssetsPath, int style, AssetManager assetManager) {
        FontFamily fontFamily = mFontCache.get(fontFamilyName);
        if (fontFamily == null) {
            fontFamily = new FontFamily();
            mFontCache.put(fontFamilyName, fontFamily);
        }

        Typeface typeface = fontFamily.getTypeface(style);
        if (typeface == null) {
            typeface = createTypeface(fontFamilyName, fontsAssetsPath, style, assetManager);
            if (typeface != null) {
                fontFamily.setTypeface(style, typeface);
            }
        }

        return typeface;
    }

    public void setTypeface(String fontFamilyName, int style, Typeface typeface) {
        if (typeface != null) {
            FontFamily fontFamily = mFontCache.get(fontFamilyName);
            if (fontFamily == null) {
                fontFamily = new FontFamily();
                mFontCache.put(fontFamilyName, fontFamily);
            }
            fontFamily.setTypeface(style, typeface);
        }
    }

    private static Typeface createTypeface(String fontFamilyName, String fontsAssetsPath, int style, AssetManager assetManager) {
        if (fontsAssetsPath == null) {
            // 保留默认字体assets路径
            fontsAssetsPath = FONTS_ASSET_PATH;
        } else if (!TextUtils.isEmpty(fontsAssetsPath) && !fontsAssetsPath.endsWith("/")) {
            // 如果设置了路径，则自动加上"/"，如果是空字符就不加了，空字符代表是在assets根目录下
            fontsAssetsPath += "/";
        }
        String extension = EXTENSIONS[style];
        for (String fileExtension : FILE_EXTENSIONS) {
            String fileName = fontsAssetsPath + fontFamilyName + extension + fileExtension;
            try {
                return Typeface.createFromAsset(assetManager, fileName);
            } catch (Exception e) {
                HMLog.w("HummerNative", e.getMessage());
            }
        }
//        return Typeface.create(fontFamilyName, style);
        // 需要知道字体到底有没有找到，返回null表示没有找到
        return null;
    }

    private static class FontFamily {

        private SparseArray<Typeface> mTypefaceSparseArray;

        private FontFamily() {
            mTypefaceSparseArray = new SparseArray<>(4);
        }

        public Typeface getTypeface(int style) {
            return mTypefaceSparseArray.get(style);
        }

        public void setTypeface(int style, Typeface typeface) {
            mTypefaceSparseArray.put(style, typeface);
        }
    }
}
