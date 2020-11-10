
package com.didi.hummer.component.text;


import android.content.res.AssetManager;
import android.graphics.Typeface;
import android.util.SparseArray;

import java.util.HashMap;
import java.util.Map;

public class FontManager {

    private static final String[] EXTENSIONS = {
            "",
            "_bold",
            "_italic",
            "_bold_italic"};
    private static final String[] FILE_EXTENSIONS = {".ttf", ".otf"};
    private static final String FONTS_ASSET_PATH = "fonts/";

    private static FontManager sFontManagerInstance;

    private Map<String, FontFamily> mFontCache;

    private FontManager() {
        mFontCache = new HashMap<>();
    }

    public static FontManager getInstance() {
        if (sFontManagerInstance == null) {
            sFontManagerInstance = new FontManager();
        }
        return sFontManagerInstance;
    }

    public Typeface getTypeface(
            String fontFamilyName,
            int style,
            AssetManager assetManager) {
        FontFamily fontFamily = mFontCache.get(fontFamilyName);
        if (fontFamily == null) {
            fontFamily = new FontFamily();
            mFontCache.put(fontFamilyName, fontFamily);
        }

        Typeface typeface = fontFamily.getTypeface(style);
        if (typeface == null) {
            typeface = createTypeface(fontFamilyName, style, assetManager);
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

    private static
    Typeface createTypeface(
            String fontFamilyName,
            int style,
            AssetManager assetManager) {
        String extension = EXTENSIONS[style];
        for (String fileExtension : FILE_EXTENSIONS) {
            String fileName = new StringBuilder()
                    .append(FONTS_ASSET_PATH)
                    .append(fontFamilyName)
                    .append(extension)
                    .append(fileExtension)
                    .toString();
            try {
                return Typeface.createFromAsset(assetManager, fileName);
            } catch (RuntimeException e) {
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
