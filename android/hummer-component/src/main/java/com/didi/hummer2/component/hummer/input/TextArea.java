package com.didi.hummer2.component.hummer.input;


import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotationx.JsAttribute;
import com.didi.hummer2.engine.JSValue;
import com.didi.hummer2.render.style.HummerStyleUtils;

//@Component("TextArea")
public class TextArea extends Input {
    public TextArea(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
    }

    @Override
    protected boolean isSingleLine() {
        return false;
    }

    /**
     * 设置最大行数
     *
     * @param lines
     */
    @JsAttribute("textLineClamp")
    public void setTextLineClamp(int lines) {
        maxLines = lines;
    }

    @Override
    public void resetStyle() {
        super.resetStyle();
        setTextLineClamp(0);
    }

    @Override
    public boolean setStyle(String key, Object value) {
        switch (key) {
            case HummerStyleUtils.Hummer.TEXT_LINE_CLAMP:
                setTextLineClamp(Float.valueOf(String.valueOf(value)).intValue());
                break;
            default:
                return super.setStyle(key, value);
        }
        return true;
    }
}