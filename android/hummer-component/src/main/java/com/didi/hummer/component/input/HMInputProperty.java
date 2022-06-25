package com.didi.hummer.component.input;

import android.content.Context;
import android.graphics.BlendMode;
import android.graphics.BlendModeColorFilter;
import android.graphics.ColorFilter;
import android.graphics.PorterDuff;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.support.v4.content.ContextCompat;
import android.text.InputFilter;
import android.text.InputType;
import android.text.TextUtils;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.TextView;

import com.didi.hummer.component.text.FontManager;
import com.didi.hummer.context.HummerContext;

import java.lang.reflect.Field;
import java.util.LinkedList;

/**
 * @desc: Input属性处理类，包含style内的非yoga属性、其他属性、注册方法的处理
 */
public class HMInputProperty {
    private final EditText mView;
    private static final InputFilter[] EMPTY_FILTERS = new InputFilter[0];
    private int defaultInputType;
    private boolean isSingleLine;

    public HMInputProperty(EditText editText, boolean singleLine) {
        this.isSingleLine = singleLine;
        mView = editText;
        mView.setPadding(0, 0, 0, 0);
        mView.setSingleLine(singleLine);
        mView.setTextSize(16);
        if (!isSingleLine) {
            mView.setGravity(Gravity.START);
        }

        defaultInputType = editText.getInputType();
        if (defaultInputType == InputType.TYPE_NULL) {
            defaultInputType = InputType.TYPE_CLASS_TEXT;
        }
    }

    public void setText(String text) {
        mView.setText(text);
        if (mView.getText().length() > 0) {
            mView.setSelection(mView.getText().length());
        }
    }

    public String getText() {
        return mView.getText().toString();
    }

    public void setPlaceholder(String placeholder) {
        mView.setHint(placeholder);
    }

    public void setType(String type) {
        mView.setInputType(getInputType(type));
    }

    /**
     * js端输入类型转原生类型
     *
     * @param type
     * @return
     */
    private int getInputType(String type) {
        int inputType;
        switch (type) {
            case NJInputType.EMAIL:
                inputType = defaultInputType | InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS;
                break;
            case NJInputType.NUMBER:
                inputType = defaultInputType | InputType.TYPE_CLASS_NUMBER;
                break;
            case NJInputType.TEL:
                inputType = defaultInputType | InputType.TYPE_CLASS_PHONE;
                break;
            case NJInputType.PASSWORD:
                inputType = defaultInputType | InputType.TYPE_TEXT_VARIATION_PASSWORD;
                break;
            case NJInputType.DEFAULT:
            default:
                inputType = defaultInputType;
                break;
        }
        return inputType;
    }

    public void setTextColor(int color) {
        mView.setTextColor(color);
    }

    public void setPlaceholderColor(int color) {
        mView.setHintTextColor(color);
    }

    public void setCursorColor(int cursorColor) {
        try {
            // Android Q (10)
            if (Build.VERSION.SDK_INT >= 29) {
                ColorFilter colorFilter = new BlendModeColorFilter(cursorColor, BlendMode.SRC_ATOP);
                mView.getTextCursorDrawable().mutate().setColorFilter(colorFilter);
                return;
            }

            Field cursorDrawableResField = TextView.class.getDeclaredField("mCursorDrawableRes");
            cursorDrawableResField.setAccessible(true);
            int drawableResId = cursorDrawableResField.getInt(mView);
            if (drawableResId == 0) {
                return;
            }
            Drawable drawable = ContextCompat.getDrawable(mView.getContext(), drawableResId);
            drawable.setColorFilter(cursorColor, PorterDuff.Mode.SRC_ATOP);

            Field editorField = TextView.class.getDeclaredField("mEditor");
            editorField.setAccessible(true);
            Object editor = editorField.get(mView);
            Class<?> clazz = editor.getClass();

            // Android P (9)
            if (Build.VERSION.SDK_INT >= 28) {
                Field drawableForCursorField = clazz.getDeclaredField("mDrawableForCursor");
                drawableForCursorField.setAccessible(true);
                drawableForCursorField.set(editor, drawable);
            } else {
                Field cursorDrawableField = clazz.getDeclaredField("mCursorDrawable");
                cursorDrawableField.setAccessible(true);
                Drawable[] drawables = {drawable, drawable};
                cursorDrawableField.set(editor, drawables);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void resetCursorColor() {
        try {
            // Android Q (10)
            if (Build.VERSION.SDK_INT >= 29) {
                mView.getTextCursorDrawable().mutate().setColorFilter(null);
                return;
            }

            Field cursorDrawableResField = TextView.class.getDeclaredField("mCursorDrawableRes");
            cursorDrawableResField.setAccessible(true);
            int drawableResId = cursorDrawableResField.getInt(mView);
            if (drawableResId == 0) {
                return;
            }
            Drawable drawable = ContextCompat.getDrawable(mView.getContext(), drawableResId);

            Field editorField = TextView.class.getDeclaredField("mEditor");
            editorField.setAccessible(true);
            Object editor = editorField.get(mView);
            Class<?> clazz = editor.getClass();

            // Android P (9)
            if (Build.VERSION.SDK_INT >= 28) {
                Field drawableForCursorField = clazz.getDeclaredField("mDrawableForCursor");
                drawableForCursorField.setAccessible(true);
                drawableForCursorField.set(editor, drawable);
            } else {
                Field cursorDrawableField = clazz.getDeclaredField("mCursorDrawable");
                cursorDrawableField.setAccessible(true);
                Drawable[] drawables = {drawable, drawable};
                cursorDrawableField.set(editor, drawables);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setTextAlign(String align) {
        mView.setGravity(getGravity(align));
    }

    private int getGravity(String align) {
        switch (align) {
            case NJTextAlign.LEFT:
            default:
                return isSingleLine ? Gravity.START | Gravity.CENTER_VERTICAL : Gravity.START;
            case NJTextAlign.RIGHT:
                return isSingleLine ? Gravity.END | Gravity.CENTER_VERTICAL : Gravity.END;
            case NJTextAlign.CENTER:
                return isSingleLine ? Gravity.CENTER : Gravity.CENTER_HORIZONTAL;
        }
    }

    public void setFontFamily(Context context, String fontFamily) {
        if (TextUtils.isEmpty(fontFamily)) {
            return;
        }

        String[] fontArray = fontFamily.split(",");
        if (fontArray.length == 0) {
            return;
        }

        int style = Typeface.NORMAL;
        if (mView.getTypeface() != null) {
            style = mView.getTypeface().getStyle();
        }

        for (String font : fontArray) {
            Typeface typeface = FontManager.getInstance().getTypeface((HummerContext) context, font.trim(), style);
            if (typeface != null) {
                mView.setTypeface(typeface);
                break;
            }
        }
    }

    public void setFontSize(float fontSize) {
        mView.setTextSize(TypedValue.COMPLEX_UNIT_PX, fontSize);
    }

    public void setPlaceholderFontSize(float fontSize) {
        mView.setTextSize(TypedValue.COMPLEX_UNIT_PX, fontSize);
    }

    public void setMaxLength(int maxLength) {
        InputFilter[] currentFilters = mView.getFilters();
        InputFilter[] newFilters = EMPTY_FILTERS;

        if (maxLength == 0) {
            if (currentFilters.length > 0) {
                LinkedList<InputFilter> list = new LinkedList<>();
                for (int i = 0; i < currentFilters.length; i++) {
                    if (!(currentFilters[i] instanceof InputFilter.LengthFilter)) {
                        list.add(currentFilters[i]);
                    }
                }
                if (!list.isEmpty()) {
                    newFilters = list.toArray(new InputFilter[list.size()]);
                }
            }
        } else {
            if (currentFilters.length > 0) {
                newFilters = currentFilters;
                boolean replaced = false;
                for (int i = 0; i < currentFilters.length; i++) {
                    if (currentFilters[i] instanceof InputFilter.LengthFilter) {
                        currentFilters[i] = new InputFilter.LengthFilter(maxLength);
                        replaced = true;
                    }
                }
                if (!replaced) {
                    newFilters = new InputFilter[currentFilters.length + 1];
                    System.arraycopy(currentFilters, 0, newFilters, 0, currentFilters.length);
                    currentFilters[currentFilters.length] = new InputFilter.LengthFilter(maxLength);
                }
            } else {
                newFilters = new InputFilter[1];
                newFilters[0] = new InputFilter.LengthFilter(maxLength);
            }
        }

        mView.setFilters(newFilters);
    }

    public void setReturnKeyType(String type) {
        mView.setImeOptions(getImeOption(type));

        // 刷新键盘
        InputMethodManager imm = (InputMethodManager) mView.getContext().getSystemService(Context.INPUT_METHOD_SERVICE);
        if (imm != null && imm.isActive()) {
            imm.restartInput(mView);
        }
    }

    private int getImeOption(String type) {
        switch (type) {
            case NJReturnKeyType.GO:
                return EditorInfo.IME_ACTION_GO;
            case NJReturnKeyType.SEARCH:
                return EditorInfo.IME_ACTION_SEARCH;
            case NJReturnKeyType.SEND:
                return EditorInfo.IME_ACTION_SEND;
            case NJReturnKeyType.NEXT:
                return EditorInfo.IME_ACTION_NEXT;
            case NJReturnKeyType.DONE:
            default:
                return EditorInfo.IME_ACTION_DONE;
        }
    }

    public void setFocused(boolean focused) {
        if (focused) {
            FocusUtil.requestFocus(mView);
        } else {
            FocusUtil.clearFocus(mView);
        }
    }
}
