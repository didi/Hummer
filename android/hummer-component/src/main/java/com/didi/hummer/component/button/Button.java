package com.didi.hummer.component.button;

import android.content.Context;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.StateListDrawable;
import android.os.Build;
import android.text.TextUtils;
import android.util.TypedValue;
import android.view.Gravity;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsAttribute;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.component.text.FontManager;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.style.HummerStyleUtils;

import java.util.HashMap;
import java.util.Map;

@Component("Button")
public class Button extends HMBase<android.widget.Button> {

    private Drawable orgBackground;
    private ColorStateList orgTextColors;
    private float orgTextSize;
    private Typeface orgTypeface;
    private Map<Integer, Integer> textColorMap = new HashMap<>();
    private Map<Integer, Drawable> bgDrawableMap = new HashMap<>();

    public Button(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
    }

    @Override
    protected android.widget.Button createViewInstance(Context context) {
        return new android.widget.Button(context);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        orgBackground = getView().getBackground();
        orgTextColors = getView().getTextColors();
        orgTextSize = getView().getTextSize();
        getView().setBackground(null);
        getView().setAllCaps(false);
        getView().setTypeface(null, Typeface.NORMAL);
        setFontFamily(FontManager.DEFAULT_FONT_FAMILY);
        orgTypeface = getView().getTypeface();
        //fixed Button 总是在图层最上层的问题
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            getView().setStateListAnimator(null);
        }
    }

    private void requestLayout() {
        getYogaNode().dirty();
        getView().requestLayout();
    }

    @Override
    public void setBackgroundColor(Object color) {
        super.setBackgroundColor(color);
        getView().setMinWidth(0);
        getView().setMinHeight(0);
        getView().setMinimumHeight(0);
        getView().setMinimumWidth(0);
        getView().setPadding(0, 0, 0, 0);
    }

    @Override
    public void setBackgroundImage(String image) {
        super.setBackgroundImage(image);
        getView().setMinWidth(0);
        getView().setMinHeight(0);
        getView().setMinimumHeight(0);
        getView().setMinimumWidth(0);
        getView().setPadding(0, 0, 0, 0);
    }

    /**
     * 标题
     */
    @JsProperty("text")
    private String text;

    public void setText(String text) {
        getView().setText(text);
        requestLayout();

        getNode().setContent(text);
    }

    @JsProperty("pressed")
    private Map<String, Object> pressed;

    public void setPressed(Map<String, Object> pressed) {
        this.pressed = pressed;
        mergePressedStyle();
        updateBackground();
    }

    @JsProperty("disabled")
    private Map<String, Object> disabled;

    public void setDisabled(Map<String, Object> disabled) {
        this.disabled = disabled;
        mergeDisabledStyle();
        updateBackground();
    }

    private void mergePressedStyle() {
        ButtonStyleHelper.fillButtonPressedAndDisabledStyle(style, pressed);
        Drawable bgDrawable = ButtonStyleHelper.pickButtonBackgroundDrawable(pressed);
        if (bgDrawable != null) {
            bgDrawableMap.put(ButtonStyleHelper.KEY_ON_PRESS, bgDrawable);
        }
        Integer textColor = ButtonStyleHelper.pickButtonTextColor(pressed);
        if (textColor != null) {
            textColorMap.put(ButtonStyleHelper.KEY_ON_PRESS, textColor);
        }
    }

    private void mergeDisabledStyle() {
        ButtonStyleHelper.fillButtonPressedAndDisabledStyle(style, disabled);
        Drawable bgDrawable = ButtonStyleHelper.pickButtonBackgroundDrawable(disabled);
        if (bgDrawable != null) {
            bgDrawableMap.put(ButtonStyleHelper.KEY_ON_DISABLE, bgDrawable);
        }
        Integer textColor = ButtonStyleHelper.pickButtonTextColor(disabled);
        if (textColor != null) {
            textColorMap.put(ButtonStyleHelper.KEY_ON_DISABLE, textColor);
        }
    }

    /**
     * 标题文本对齐方式
     */
    @JsAttribute("textAlign")
    public void setTextAlign(String textAlign) {
        switch (textAlign.toLowerCase()) {
            case "center":
            default:
                getView().setGravity(Gravity.CENTER);
                break;
            case "left":
                getView().setGravity(Gravity.START | Gravity.CENTER_VERTICAL);
                break;
            case "right":
                getView().setGravity(Gravity.END | Gravity.CENTER_VERTICAL);
                break;
        }
    }

    /**
     * 字体
     */
    @JsAttribute("fontFamily")
    public void setFontFamily(String fontFamily) {
        if (TextUtils.isEmpty(fontFamily)) {
            return;
        }

        String[] fontArray = fontFamily.split(",");
        if (fontArray.length == 0) {
            return;
        }

        int style = Typeface.NORMAL;
        if (getView().getTypeface() != null) {
            style = getView().getTypeface().getStyle();
        }

        for (String font : fontArray) {
            Typeface typeface = FontManager.getInstance().getTypeface((HummerContext) getContext(), font.trim(), style);
            if (typeface != null) {
                getView().setTypeface(typeface);
                requestLayout();
                break;
            }
        }
    }

    /**
     * 字体大小
     */
    @JsAttribute("fontSize")
    public void setFontSize(float fontSize) {
        getView().setTextSize(TypedValue.COMPLEX_UNIT_PX, fontSize);
        requestLayout();
    }

    @JsAttribute("color")
    public void setColor(int color) {
        getView().setTextColor(color);
    }

    @Override
    public void onStyleUpdated(Map<String, Object> newStyle) {
        if (newStyle.containsKey(ButtonStyleHelper.KEY_BACKGROUND_COLOR)) {
            bgDrawableMap.put(ButtonStyleHelper.KEY_ON_NORMAL, backgroundHelper.getBackgroundDrawable());
        }
        if (newStyle.containsKey(ButtonStyleHelper.KEY_TEXT_COLOR)) {
            textColorMap.put(ButtonStyleHelper.KEY_ON_NORMAL, ButtonStyleHelper.pickButtonTextColor(newStyle));
        }
        mergePressedStyle();
        mergeDisabledStyle();
        updateBackground();
    }

    private void updateBackground() {
        updateBackgroundDrawable();
        updateTextColor();
    }

    private void updateBackgroundDrawable() {
        // 如果有设置press或disable状态，正常设置这两个状态；如果没有设置press或disable状态，使用NJBase中默认的背景设置
        if (bgDrawableMap.containsKey(ButtonStyleHelper.KEY_ON_PRESS) || bgDrawableMap.containsKey(ButtonStyleHelper.KEY_ON_DISABLE)) {
            StateListDrawable stateListDrawable = ButtonStyleHelper.makeButtonBackgroundColorStateList(bgDrawableMap);
            backgroundHelper.setBackgroundDrawable(stateListDrawable);
        }
    }

    private void updateTextColor() {
        if (textColorMap.containsKey(ButtonStyleHelper.KEY_ON_PRESS) || textColorMap.containsKey(ButtonStyleHelper.KEY_ON_DISABLE)) {
            // 如果有设置press或disable状态，默认给一个normal状态的颜色
            if (!textColorMap.containsKey(ButtonStyleHelper.KEY_ON_NORMAL)) {
                textColorMap.put(ButtonStyleHelper.KEY_ON_NORMAL, Color.BLACK);
            }

            ColorStateList color = ButtonStyleHelper.makeButtonTextColorStateList(textColorMap);
            if (color != null) {
                getView().setTextColor(color);
            }
        } else if (textColorMap.containsKey(ButtonStyleHelper.KEY_ON_NORMAL)) {
            // 如果没有设置press和disable状态，只需要设置简单的normal状态颜色
            Integer color = textColorMap.get(ButtonStyleHelper.KEY_ON_NORMAL);
            if (color != null) {
                getView().setTextColor(color);
            }
        }
    }

    @Override
    public void resetStyle() {
        super.resetStyle();
        getView().setBackground(orgBackground);
        getView().setTextColor(orgTextColors);
        getView().setTextSize(TypedValue.COMPLEX_UNIT_PX, orgTextSize);
        getView().setTypeface(orgTypeface);
        setTextAlign("center");
    }

    @Override
    public boolean setStyle(String key, Object value) {
        switch (key) {
            case HummerStyleUtils.Hummer.COLOR:
                setColor((int) value);
                break;
            case HummerStyleUtils.Hummer.FONT_SIZE:
                setFontSize((float) value);
                break;
            case HummerStyleUtils.Hummer.FONT_FAMILY:
                setFontFamily(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.TEXT_ALIGN:
                setTextAlign(String.valueOf(value));
                break;
            default:
                return false;
        }
        return true;
    }
}
