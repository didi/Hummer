package com.didi.hummer.component.input;

import android.content.Context;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.Typeface;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.util.TypedValue;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.EditText;
import android.widget.TextView;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsAttribute;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.event.view.InputEvent;
import com.didi.hummer.render.style.HummerStyleUtils;

@Component("Input")
public class Input extends HMBase<EditText> {

    protected final HMInputProperty mProperty;
    private ColorStateList orgTextColors;
    private ColorStateList orgHintColors;
    private float orgTextSize;
    private Typeface orgTypeface;

    public Input(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
        mProperty = new HMInputProperty(getView(), isSingleLine());
    }

    @Override
    public void onCreate() {
        super.onCreate();
        orgTextColors = getView().getTextColors();
        orgHintColors = getView().getHintTextColors();
        orgTextSize = getView().getTextSize();
        orgTypeface = getView().getTypeface();
        getView().setBackgroundColor(Color.TRANSPARENT);
        getView().setImeOptions(EditorInfo.IME_ACTION_DONE);
        getView().addTextChangedListener(mTextWatcher);
        getView().setOnFocusChangeListener(mOnFocusChangeListener);
        getView().setOnEditorActionListener(mOnEditorActionListener);
        getView().setOnKeyListener(mOnKeyListener);
    }

    @Override
    public void setEnabled(boolean enabled) {
        super.setEnabled(enabled);
        getView().setFocusable(enabled);
        getView().setFocusableInTouchMode(enabled);
    }

    private TextWatcher mTextWatcher = new TextWatcher() {
        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {

        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {

        }

        @Override
        public void afterTextChanged(Editable s) {
            InputEvent inputEvent = new InputEvent();
            inputEvent.setType(InputEvent.HM_EVENT_TYPE_INPUT);
            inputEvent.setText(s.toString());
            inputEvent.setState(InputEvent.HM_INPUT_STATE_CHANGED);
            inputEvent.setTimestamp(System.currentTimeMillis());
            mEventManager.dispatchEvent(InputEvent.HM_EVENT_TYPE_INPUT, inputEvent);

            requestLayout();
        }
    };

    private View.OnFocusChangeListener mOnFocusChangeListener = (v, hasFocus) -> {
        if (hasFocus) {
            InputEvent inputEvent = new InputEvent();
            inputEvent.setType(InputEvent.HM_EVENT_TYPE_INPUT);
            inputEvent.setText(getView().getText().toString());
            inputEvent.setState(InputEvent.HM_INPUT_STATE_BEGAN);
            inputEvent.setTimestamp(System.currentTimeMillis());
            mEventManager.dispatchEvent(InputEvent.HM_EVENT_TYPE_INPUT, inputEvent);
        } else {
            InputEvent inputEvent = new InputEvent();
            inputEvent.setType(InputEvent.HM_EVENT_TYPE_INPUT);
            inputEvent.setText(getView().getText().toString());
            inputEvent.setState(InputEvent.HM_INPUT_STATE_ENDED);
            inputEvent.setTimestamp(System.currentTimeMillis());
            mEventManager.dispatchEvent(InputEvent.HM_EVENT_TYPE_INPUT, inputEvent);

            KeyboardUtil.hideKeyboard(getView());
        }
    };

    private View.OnKeyListener mOnKeyListener = (v, keyCode, event) -> {
        if (keyCode == KeyEvent.KEYCODE_DEL && event.getAction() == KeyEvent.ACTION_DOWN) {
            // 当输入框已无输入文字时，点击键盘的删除键，可以继续响应input事件
            if (getView() != null && TextUtils.isEmpty(getView().getText())) {
                InputEvent inputEvent = new InputEvent();
                inputEvent.setType(InputEvent.HM_EVENT_TYPE_INPUT);
                inputEvent.setText("");
                inputEvent.setState(InputEvent.HM_INPUT_STATE_CHANGED);
                inputEvent.setTimestamp(System.currentTimeMillis());
                mEventManager.dispatchEvent(InputEvent.HM_EVENT_TYPE_INPUT, inputEvent);
            }
        }
        return false;
    };

    private TextView.OnEditorActionListener mOnEditorActionListener = (v, actionId, event) -> {
        boolean handled = false;
        if (actionId == EditorInfo.IME_ACTION_GO
                || actionId == EditorInfo.IME_ACTION_SEARCH
                || actionId == EditorInfo.IME_ACTION_SEND
                || actionId == EditorInfo.IME_ACTION_NEXT
                || actionId == EditorInfo.IME_ACTION_DONE) {
            handled = true;

            InputEvent inputEvent = new InputEvent();
            inputEvent.setType(InputEvent.HM_EVENT_TYPE_INPUT);
            inputEvent.setText(getView().getText().toString());
            inputEvent.setState(InputEvent.HM_INPUT_STATE_CONFIRMED);
            inputEvent.setTimestamp(System.currentTimeMillis());
            mEventManager.dispatchEvent(InputEvent.HM_EVENT_TYPE_INPUT, inputEvent);
        }
        return handled;
    };

    @Override
    public void onDestroy() {
        super.onDestroy();
        getView().removeTextChangedListener(mTextWatcher);
        getView().setOnKeyListener(null);
    }

    protected boolean isSingleLine() {
        return true;
    }

    @Override
    protected EditText createViewInstance(Context context) {
        return new EditText(context);
    }

    private void requestLayout() {
        getYogaNode().dirty();
        getView().requestLayout();
    }

    /**
     * 设置文本
     */
    @JsProperty("text")
    private String text;

    public void setText(String text) {
        mProperty.setText(text);
        requestLayout();
    }

    public String getText() {
        return mProperty.getText();
    }

    /**
     * 设置占位文案
     */
    @JsProperty("placeholder")
    private String placeholder;

    public void setPlaceholder(String placeholder) {
        mProperty.setPlaceholder(placeholder);
        requestLayout();
    }

    /**
     * 设置是否取得焦点
     *
     * @param focused
     */
    @JsProperty("focused")
    private boolean focused;
    public void setFocused(boolean focused) {
        if (getView().isFocused() && focused) {
            return;
        }
        mProperty.setFocused(focused);
    }

    public boolean getFocused() {
        return getView().isFocused();
    }

    /**
     * 设置键盘可输入字符类型
     *
     * @param type
     */
    @JsAttribute("type")
    public void setType(String type) {
        mProperty.setType(type);
    }


    /**
     * 设置字体颜色
     *
     * @param color
     */
    @JsAttribute("color")
    public void setColor(int color) {
        mProperty.setTextColor(color);
    }

    /**
     * 设置占位字体颜色
     *
     * @param color
     */
    @JsAttribute("placeholderColor")
    public void setPlaceholderColor(int color) {
        mProperty.setPlaceholderColor(color);
    }

    /**
     * 设置光标颜色，无公开api，使用反射设置
     *
     * @param cursorColor
     */
    @JsAttribute("cursorColor")
    public void setCursorColor(int cursorColor) {
        mProperty.setCursorColor(cursorColor);
    }

    /**
     * 设置标题文本对齐方式
     *
     * @param align
     */
    @JsAttribute("textAlign")
    public void setTextAlign(String align) {
        mProperty.setTextAlign(align);
    }
    /**
     * 设置字体
     *
     * @param fontFamily
     */
    @JsAttribute("fontFamily")
    public void setFontFamily(String fontFamily) {
        mProperty.setFontFamily(getContext(), fontFamily);
        requestLayout();
    }

    /**
     * 设置文本字体大小
     *
     * @param fontSize
     */
    @JsAttribute("fontSize")
    public void setFontSize(float fontSize) {
        mProperty.setFontSize(fontSize);
        requestLayout();
    }

    /**
     * 设置占位字体大小，当前效果和设置字体大小一致
     *
     * @param fontSize
     */
    @Deprecated
    @JsAttribute("placeholderFontSize")
    public void setPlaceholderFontSize(float fontSize) {
        mProperty.setPlaceholderFontSize(fontSize);
        requestLayout();
    }

    /**
     * 设置最大字数
     *
     * @param length
     */
    @JsAttribute("maxLength")
    public void setMaxLength(int length) {
        mProperty.setMaxLength(length);
    }

    /**
     * 设置软键盘回车键类型
     *
     * @param type
     */
    @JsAttribute("returnKeyType")
    public void setReturnKeyType(String type) {
        mProperty.setReturnKeyType(type);
    }

    @Override
    public void resetStyle() {
        super.resetStyle();
        getView().setBackgroundColor(Color.TRANSPARENT);
        getView().setTextColor(orgTextColors);
        getView().setHintTextColor(orgHintColors);
        getView().setTextSize(TypedValue.COMPLEX_UNIT_PX, orgTextSize);
        getView().setTypeface(orgTypeface);
        setType(NJInputType.DEFAULT);
        setReturnKeyType(NJReturnKeyType.DONE);
        setTextAlign(NJTextAlign.LEFT);
        mProperty.resetCursorColor();
    }

    @Override
    public boolean setStyle(String key, Object value) {
        switch (key) {
            case HummerStyleUtils.Hummer.TYPE:
                setType(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.COLOR:
                setColor((int) value);
                break;
            case HummerStyleUtils.Hummer.FONT_FAMILY:
                setFontFamily(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.FONT_SIZE:
                setFontSize((float) value);
                break;
            case HummerStyleUtils.Hummer.PLACEHOLDER_COLOR:
                setPlaceholderColor((int) value);
                break;
            case HummerStyleUtils.Hummer.PLACEHOLDER_FONT_SIZE:
                setPlaceholderFontSize((float) value);
                break;
            case HummerStyleUtils.Hummer.TEXT_ALIGN:
                setTextAlign(String.valueOf(value));
                break;
            case HummerStyleUtils.Hummer.CURSOR_COLOR:
                setCursorColor((int) value);
                break;
            case HummerStyleUtils.Hummer.MAX_LENGTH:
                setMaxLength((int) (float) value);
                break;
            case HummerStyleUtils.Hummer.RETURN_KEY_TYPE:
                setReturnKeyType(String.valueOf(value));
                break;
            default:
                return false;
        }
        return true;
    }
}
