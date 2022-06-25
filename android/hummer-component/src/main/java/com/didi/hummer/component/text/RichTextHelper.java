package com.didi.hummer.component.text;

import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.TextUtils;
import android.text.method.LinkMovementMethod;
import android.text.style.AbsoluteSizeSpan;
import android.text.style.BackgroundColorSpan;
import android.text.style.ForegroundColorSpan;
import android.text.style.StrikethroughSpan;
import android.text.style.StyleSpan;
import android.text.style.UnderlineSpan;
import android.widget.TextView;

import com.didi.hummer.context.HummerContext;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.style.HummerStyleUtils;
import com.didi.hummer.render.utility.YogaAttrUtils;
import com.didi.hummer.render.utility.YogaDrawableUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 富文本帮助类
 * <p>
 * Created by XiaoFeng on 2020-02-06.
 */
public class RichTextHelper {

    private static final String RT_TEXT = "text";
    private static final String RT_COLOR = "color";
    private static final String RT_BACKGROUND_COLOR = "backgroundColor";
    private static final String RT_FONT_FAMILY = "fontFamily";
    private static final String RT_FONT_SIZE = "fontSize";
    private static final String RT_FONT_WEIGHT = "fontWeight";
    private static final String RT_FONT_STYLE = "fontStyle";
    private static final String RT_TEXT_DECORATION = "textDecoration";
    private static final String RT_IMAGE = "image";
    private static final String RT_IMAGE_WIDTH = "imageWidth";
    private static final String RT_IMAGE_HEIGHT = "imageHeight";
    private static final String RT_IMAGE_ALIGN = "imageAlign";
    private static final String RT_HREF = "href";
    private static final String RT_HREF_COLOR = "hrefColor";

    private static final String IMAGE_ALIGN_BASELINE = "baseline";
    private static final String IMAGE_ALIGN_TOP = "top";
    private static final String IMAGE_ALIGN_CENTER = "center";
    private static final String IMAGE_ALIGN_BOTTOM = "bottom";

    public static class RichText {

        public String text = "";
        public int color = Color.TRANSPARENT;
        public int backgroundColor = Color.TRANSPARENT;
        public String fontFamily;
        public int fontSize;
        public String fontWeight;
        public String fontStyle;
        public String textDecoration;
        public String image;
        public int imageWidth;
        public int imageHeight;
        public String imageAlign;
        public String href;
        public int hrefColor = Color.TRANSPARENT;

        public RichText() {

        }

        public RichText(String text) {
            this.text = text;
        }
    }

    public static void generateRichText(HMBase hmBase, Object richText, OnRichTextGenerateListener listener) {
        if (richText instanceof Map) {
            generateRichText(hmBase, parseObjectRichText((Map) richText), listener);
        } else if (richText instanceof List) {
            generateRichText(hmBase, parseArrayRichText((List) richText), listener);
        }
    }

    private static RichText parseObjectRichText(Map richText) {
        Object objText = richText.get(RT_TEXT);
        Object objColor = richText.get(RT_COLOR);
        Object objBackgroundColor = richText.get(RT_BACKGROUND_COLOR);
        Object objFontFamily = richText.get(RT_FONT_FAMILY);
        Object objFontSize = richText.get(RT_FONT_SIZE);
        Object objFontWeight = richText.get(RT_FONT_WEIGHT);
        Object objFontStyle = richText.get(RT_FONT_STYLE);
        Object objTextDecoration = richText.get(RT_TEXT_DECORATION);
        Object objImage = richText.get(RT_IMAGE);
        Object objImageWidth = richText.get(RT_IMAGE_WIDTH);
        Object objImageHeight = richText.get(RT_IMAGE_HEIGHT);
        Object objImageAlign = richText.get(RT_IMAGE_ALIGN);
        Object objHref = richText.get(RT_HREF);
        Object objHrefColor = richText.get(RT_HREF_COLOR);

        RichText rt = new RichText();
        if (objText instanceof String) {
            rt.text = (String) objText;
        }
        if (objColor instanceof String) {
            rt.color = YogaAttrUtils.parseColor((String) objColor);
        }
        if (objBackgroundColor instanceof String) {
            rt.backgroundColor = YogaAttrUtils.parseColor((String) objBackgroundColor);
        }
        if (objFontFamily instanceof String) {
            rt.fontFamily = (String) objFontFamily;
        }
        if (objFontWeight instanceof String) {
            rt.fontWeight = (String) objFontWeight;
        }
        if (objFontStyle instanceof String) {
            rt.fontStyle = (String) objFontStyle;
        }
        if (objTextDecoration instanceof String) {
            rt.textDecoration = (String) objTextDecoration;
        }
        rt.fontSize = (int) HummerStyleUtils.convertNumber(objFontSize);
        if (objImage instanceof String) {
            rt.image = (String) objImage;
        }
        rt.imageWidth = (int) HummerStyleUtils.convertNumber(objImageWidth);
        rt.imageHeight = (int) HummerStyleUtils.convertNumber(objImageHeight);
        if (objImageAlign instanceof String) {
            rt.imageAlign = (String) objImageAlign;
        }
        if (objHref instanceof String) {
            rt.href = (String) objHref;
        }
        if (objHrefColor instanceof String) {
            rt.hrefColor = YogaAttrUtils.parseColor((String) objHrefColor);
        }
        return rt;
    }

    private static List<RichText> parseArrayRichText(List richText) {
        List<RichText> rtList = new ArrayList<>();
        for (Object obj : richText) {
            if (obj instanceof String) {
                rtList.add(new RichText((String) obj));
            } else if (obj instanceof Map) {
                rtList.add(parseObjectRichText((Map) obj));
            }
        }
        return rtList;
    }

    private static void generateRichText(HMBase hmBase, RichText richText, OnRichTextGenerateListener listener) {
        if (richText == null) {
            if (listener != null) {
                listener.onGenerated("");
            }
            return;
        }

        // 如果只设置了图片，没有设置文字，加一个默认文字，要不然图片显示不了
        if (!TextUtils.isEmpty(richText.image) && TextUtils.isEmpty(richText.text)) {
            richText.text = " ";
        }

        SpannableString spanText = new SpannableString(richText.text);

        // 优先处理超链接，因为图片和文字可能都会有超链接
        processHrefSpannableString(hmBase, spanText, richText, 0, spanText.length());

        // 处理图片
        if (!TextUtils.isEmpty(richText.image)) {
            processImageSpannableString(hmBase, spanText, richText, 0, spanText.length(), listener);
            return;
        }

        // 处理其他文字效果
        processTextStyleSpannableString(hmBase, spanText, richText, 0, spanText.length());

        if (listener != null) {
            listener.onGenerated(spanText);
        }
    }

    private static void generateRichText(HMBase hmBase, List<RichText> richTextList, OnRichTextGenerateListener listener) {
        if (richTextList == null || richTextList.isEmpty()) {
            if (listener != null) {
                listener.onGenerated("");
            }
            return;
        }

        StringBuilder wholeText = new StringBuilder();
        for (RichText richText : richTextList) {
            // 如果只设置了图片，没有设置文字，加一个默认文字，要不然图片显示不了
            if (!TextUtils.isEmpty(richText.image) && TextUtils.isEmpty(richText.text)) {
                richText.text = " ";
            }

            wholeText.append(richText.text);
        }

        int index = 0;
        SpannableString spanText = new SpannableString(wholeText);
        for (RichText rt : richTextList) {
            int textLength = rt.text.length();

            // 优先处理超链接，因为图片和文字可能都会有超链接
            processHrefSpannableString(hmBase, spanText, rt, index, index + textLength);

            // 处理图片
            if (!TextUtils.isEmpty(rt.image)) {
                processImageSpannableString(hmBase, spanText, rt, index, index + textLength, listener);
                index += textLength;
                continue;
            }

            // 处理其他文字效果
            processTextStyleSpannableString(hmBase, spanText, rt, index, index + textLength);

            index += textLength;
        }

        if (listener != null) {
            listener.onGenerated(spanText);
        }
    }

    private static void processTextStyleSpannableString(HMBase hmBase, SpannableString spanText, RichText richText, int start, int end) {
        if (richText.color != Color.TRANSPARENT) {
            spanText.setSpan(new ForegroundColorSpan(richText.color), start, end, Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
        }
        if (richText.backgroundColor != Color.TRANSPARENT) {
            spanText.setSpan(new BackgroundColorSpan(richText.backgroundColor), start, end, Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
        }
        if (!TextUtils.isEmpty(richText.fontFamily)) {
            int style = Typeface.NORMAL;
            if (hmBase.getView() instanceof TextView && ((TextView) hmBase.getView()).getTypeface() != null) {
                style = ((TextView) hmBase.getView()).getTypeface().getStyle();
            }
            Typeface typeface = FontManager.getInstance().getTypeface((HummerContext) hmBase.getContext(), richText.fontFamily, style);
            spanText.setSpan(new TypefaceSpanEx(typeface), start, end, Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
        }
        if (richText.fontSize > 0) {
            spanText.setSpan(new AbsoluteSizeSpan(richText.fontSize, false), start, end, Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
        }
        boolean isBold = false;
        boolean isItalic = false;
        if (!TextUtils.isEmpty(richText.fontWeight) && richText.fontWeight.toLowerCase().equals("bold")) {
            isBold = true;
        }
        if (!TextUtils.isEmpty(richText.fontStyle) && richText.fontStyle.toLowerCase().equals("italic")) {
            isItalic = true;
        }
        if (isBold && isItalic) {
            spanText.setSpan(new StyleSpan(Typeface.BOLD_ITALIC), start, end, Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
        } else if (isBold) {
            spanText.setSpan(new StyleSpan(Typeface.BOLD), start, end, Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
        } else if (isItalic) {
            spanText.setSpan(new StyleSpan(Typeface.ITALIC), start, end, Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
        }
        if (!TextUtils.isEmpty(richText.textDecoration)) {
            if (richText.textDecoration.equals("underline")) {
                spanText.setSpan(new UnderlineSpan(), start, end, Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
            } else if (richText.textDecoration.equals("line-through")) {
                spanText.setSpan(new StrikethroughSpan(), start, end, Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
            }
        }
    }

    private static void processImageSpannableString(HMBase hmBase, SpannableString spanText, RichText richText, int start, int end, OnRichTextGenerateListener listener) {
        if (!TextUtils.isEmpty(richText.image)) {
            YogaDrawableUtil.loadDrawable((HummerContext) hmBase.getContext(), richText.image, drawable -> {
                processDrawableSpannableString(spanText, richText, drawable, start, end);
                if (listener != null) {
                    listener.onGenerated(spanText);
                }
            });
        }
    }

    private static void processDrawableSpannableString(SpannableString spanText, RichText richText, Drawable drawable, int start, int end) {
        if (drawable == null) {
            return;
        }
        int imageWidth = drawable.getIntrinsicWidth();
        int imageHeight = drawable.getIntrinsicHeight();
        if (richText.imageWidth > 0) {
            imageWidth = richText.imageWidth;
        }
        if (richText.imageHeight > 0) {
            imageHeight = richText.imageHeight;
        }
        drawable.setBounds(0, 0, imageWidth, imageHeight);
        spanText.setSpan(new ImageSpanEx(drawable, getImageAlign(richText.imageAlign)), start, end, Spannable.SPAN_INCLUSIVE_EXCLUSIVE);
    }

    private static void processHrefSpannableString(HMBase hmBase, SpannableString spanText, RichText richText, int start, int end) {
        if (!TextUtils.isEmpty(richText.href)) {
            spanText.setSpan(new URLSpanEx(richText.href, richText.hrefColor), start, end, Spannable.SPAN_INCLUSIVE_EXCLUSIVE);

            // 超链接需要设置为可点击
            if (hmBase.getView() instanceof TextView) {
                ((TextView) hmBase.getView()).setMovementMethod(LinkMovementMethod.getInstance());
            }
        }
    }

    private static int getImageAlign(String imageAlign) {
        if (TextUtils.isEmpty(imageAlign)) {
            return ImageSpanEx.ALIGN_BASELINE;
        }
        switch (imageAlign) {
            case IMAGE_ALIGN_BASELINE:
            default:
                return ImageSpanEx.ALIGN_BASELINE;
            case IMAGE_ALIGN_TOP:
                return ImageSpanEx.ALIGN_TOP;
            case IMAGE_ALIGN_CENTER:
                return ImageSpanEx.ALIGN_CENTER;
            case IMAGE_ALIGN_BOTTOM:
                return ImageSpanEx.ALIGN_BOTTOM;
        }
    }
}
