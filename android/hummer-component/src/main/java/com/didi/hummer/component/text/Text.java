package com.didi.hummer.component.text;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.res.ColorStateList;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.os.Build;
import android.text.Html;
import android.text.Spanned;
import android.text.TextUtils;
import android.util.TypedValue;
import android.view.Gravity;
import android.widget.TextView;
import android.widget.Toast;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsAttribute;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.style.HummerStyleUtils;

@Component("Text")
public class Text extends HMBase<TextView> {

    private ColorStateList orgTextColors;
    private float orgTextSize;
    private Typeface orgTypeface;
    private String fontWeight;
    private String fontStyle;

    // x轴定位
    private int xGravity = 0;
    // y轴定位
    private int yGravity = 0;

    public Text(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
    }

    @Override
    protected TextView createViewInstance(Context context) {
        return new TextView(context);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        orgTextColors = getView().getTextColors();
        orgTextSize = getView().getTextSize();
        orgTypeface = getView().getTypeface();
        getView().setGravity(Gravity.START | Gravity.CENTER_VERTICAL);
        getView().setEllipsize(TextUtils.TruncateAt.END);
//        getView().setIncludeFontPadding(false);
    }

    private void requestLayout() {
        getYogaNode().dirty();
        getView().requestLayout();
    }

    private void setRowText(CharSequence text) {
        getView().setText(text);
        requestLayout();
    }

    @SuppressWarnings("deprecation")
    private Spanned fromHtml(String html) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            return Html.fromHtml(html, Html.FROM_HTML_MODE_LEGACY);
        } else {
            return Html.fromHtml(html);
        }
    }

    @JsProperty("text")
    private String text;
    public void setText(String text) {
        setRowText(text);
    }

    @JsProperty("richText")
    private Object richText;
    public void setRichText(Object richText) {
        if (richText instanceof String) {
            return;
        }
        RichTextHelper.generateRichText(this, richText, this::setRowText);
    }

    @JsProperty("formattedText")
    private String formattedText;
    public void setFormattedText(String formattedText) {
        setRowText(fromHtml(formattedText));
    }

    @JsProperty("textCopyEnable")
    private boolean textCopyEnable;
    public void setTextCopyEnable(boolean textCopyEnable) {
        if (textCopyEnable) {
            getView().setOnLongClickListener(v -> {
                ClipboardManager clipboardManager = (ClipboardManager) getContext().getSystemService(Context.CLIPBOARD_SERVICE);
                ClipData clipData = ClipData.newPlainText("copyText", getView().getText());
                clipboardManager.setPrimaryClip(clipData);
                Toast toast = Toast.makeText(getContext(), null, Toast.LENGTH_SHORT);
                toast.setText("复制成功");
                toast.setGravity(Gravity.CENTER, 0, 0);
                toast.show();
                return false;
            });
        }
    }

    @JsAttribute("color")
    public void setColor(int color) {
        getView().setTextColor(color);
    }

    @JsAttribute("fontFamily")
    public void setFontFamily(String fontFamily) {
        if (TextUtils.isEmpty(fontFamily)) {
            return;
        }

        String[] fontArray = fontFamily.split(",");
        if (fontArray.length == 0) {
            return;
        }

        String fontsAssetsPath = HummerSDK.getFontsAssetsPath(((HummerContext) getContext()).getNamespace());

        int style = Typeface.NORMAL;
        if (getView().getTypeface() != null) {
            style = getView().getTypeface().getStyle();
        }

        for (String font : fontArray) {
            Typeface typeface = FontManager.getInstance().getTypeface(font.trim(), fontsAssetsPath, style, getContext().getAssets());
            if (typeface != null) {
                getView().setTypeface(typeface);
                requestLayout();
                break;
            }
        }
    }

    @JsAttribute("fontSize")
    public void setFontSize(float fontSize) {
        getView().setTextSize(TypedValue.COMPLEX_UNIT_PX, fontSize);
        requestLayout();
    }

    @JsAttribute("fontWeight")
    public void setFontWeight(String fontWeight) {
        if (TextUtils.isEmpty(fontWeight)) {
            return;
        }
        this.fontWeight = fontWeight.toLowerCase();
        processTextTypeface(this.fontWeight, this.fontStyle);
        requestLayout();
    }

    @JsAttribute("fontStyle")
    public void setFontStyle(String fontStyle) {
        if (TextUtils.isEmpty(fontStyle)) {
            return;
        }
        this.fontStyle = fontStyle.toLowerCase();
        processTextTypeface(this.fontWeight, this.fontStyle);
        requestLayout();
    }

    private void processTextTypeface(String fontWeight, String fontStyle) {
        if ("bold".equals(fontWeight) && "italic".equals(fontStyle)) {
            getView().setTypeface(getView().getTypeface(), Typeface.BOLD_ITALIC);
        } else if ("bold".equals(fontWeight)) {
            getView().setTypeface(getView().getTypeface(), Typeface.BOLD);
        } else if ("italic".equals(fontStyle)) {
            getView().setTypeface(getView().getTypeface(), Typeface.ITALIC);
        } else { // normal or other
            getView().setTypeface(null, Typeface.NORMAL);
        }
    }

    @JsAttribute("textAlign")
    public void setTextAlign(String textAlign) {
        if (TextUtils.isEmpty(textAlign)) {
            return;
        }
        switch (textAlign.toLowerCase()) {
            case "center":
                getView().setGravity(Gravity.CENTER);
                xGravity = Gravity.CENTER;
                break;
            case "left":
            default:
                getView().setGravity(Gravity.START | Gravity.CENTER_VERTICAL);
                xGravity = Gravity.START | Gravity.CENTER_VERTICAL;
                break;
            case "right":
                getView().setGravity(Gravity.END | Gravity.CENTER_VERTICAL);
                xGravity = Gravity.END | Gravity.CENTER_VERTICAL;
                break;
        }

        if (yGravity != 0) {
            getView().setGravity(xGravity | yGravity);
        }
    }

    @JsAttribute("textVerticalAlign")
    public void setTextVerticalAlign(String textVerticalAlign) {
        if (TextUtils.isEmpty(textVerticalAlign)) {
            return;
        }
        switch (textVerticalAlign.toLowerCase()) {
            case "center":
                getView().setGravity(Gravity.CENTER_VERTICAL);
                yGravity = Gravity.CENTER_VERTICAL;
                break;
            case "top":
            default:
                getView().setGravity(Gravity.TOP);
                yGravity = Gravity.TOP;
                break;
            case "bottom":
                getView().setGravity(Gravity.BOTTOM);
                yGravity = Gravity.BOTTOM;
                break;
        }

        if (xGravity != 0) {
            getView().setGravity(xGravity | yGravity);
        }
    }

    @JsAttribute("textDecoration")
    public void setTextDecoration(String textDecoration) {
        if (TextUtils.isEmpty(textDecoration)) {
            return;
        }
        switch (textDecoration.toLowerCase()) {
            case "underline":
                getView().getPaint().setFlags(Paint.UNDERLINE_TEXT_FLAG);
                break;
            case "line-through":
                getView().getPaint().setFlags(Paint.STRIKE_THRU_TEXT_FLAG);
                break;
            default:
                getView().getPaint().setFlags(0);
                break;
        }
    }

    @JsAttribute("textOverflow")
    public void setTextOverflow(String overflow) {
        if (TextUtils.isEmpty(overflow)) {
            return;
        }
        switch (overflow.toLowerCase()) {
            case "clip":
                getView().setEllipsize(null);
                break;
            case "ellipsis":
            default:
                getView().setEllipsize(TextUtils.TruncateAt.END);
                break;
        }
    }

    @JsAttribute("textLineClamp")
    public void setTextLineClamp(int lines) {
        getView().setSingleLine(lines == 1);
        getView().setMaxLines(lines > 0 ? lines : Integer.MAX_VALUE);
        requestLayout();
    }

    @JsAttribute("letterSpacing")
    public void setLetterSpacing(float letterSpacing) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            getView().setLetterSpacing(letterSpacing);
            requestLayout();
        }
    }

    @JsAttribute("lineSpacingMulti")
    public void setLineSpacingMulti(float lineSpacingMulti) {
        getView().setLineSpacing(0, lineSpacingMulti);
        requestLayout();
    }

    @Override
    public void resetStyle() {
        super.resetStyle();
        getView().setTextColor(orgTextColors);
        getView().setTextSize(TypedValue.COMPLEX_UNIT_PX, orgTextSize);
        getView().setTypeface(orgTypeface);
        setTextAlign("left");
        setTextDecoration("none");
        setTextOverflow("ellipsis");
        setTextLineClamp(Integer.MAX_VALUE);
        setLetterSpacing(0);
        setLetterSpacing(1);
    }

    @Override
    public boolean setStyle(String key, Object value) {
        switch (key) {
            case HummerStyleUtils.Hummer.COLOR:
                setColor((int) value);
                break;
            case HummerStyleUtils.Hummer.FONT_FAMILY:
                setFontFamily(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.FONT_SIZE:
                setFontSize((float) value);
                break;
            case HummerStyleUtils.Hummer.FONT_WEIGHT:
                setFontWeight(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.FONT_STYLE:
                setFontStyle(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.TEXT_ALIGN:
                setTextAlign(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.TEXT_DECORATION:
                setTextDecoration(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.TEXT_OVERFLOW:
                setTextOverflow(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.TEXT_LINE_CLAMP:
                setTextLineClamp((int) (float) value);
                break;
            case HummerStyleUtils.Hummer.LETTER_SPACING:
                setLetterSpacing((float) value);
                break;
            case HummerStyleUtils.Hummer.LINE_SPACING_MULTI:
                setLineSpacingMulti((float) value);
                break;
            case HummerStyleUtils.Hummer.TEXT_VERTICAL_ALIGN:
                setTextVerticalAlign(String.valueOf(value));
            default:
                return false;
        }
        return true;
    }
}
