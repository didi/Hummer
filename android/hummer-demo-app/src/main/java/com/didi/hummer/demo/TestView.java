package com.didi.hummer.demo;

import android.content.Context;
import android.view.View;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsAttribute;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.style.HummerStyleUtils;

/**
 * 视图组件导出组件
 *
 * Created by XiaoFeng on 2021/4/21.
 */
@Component("TestView")
public class TestView extends HMBase<View> {

    public TestView(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
    }

    @Override
    protected View createViewInstance(Context context) {
        return new View(context);
    }

    @JsProperty("text")
    private String text;
    public void setText(String text) {
        this.text = text;
    }

    @JsAttribute("color")
    public void setColor(int color) {

    }

    @JsMethod("layout")
    public void layout() {
        getView().requestLayout();
    }

    @Override
    public boolean setStyle(String key, Object value) {
        switch (key) {
            case HummerStyleUtils.Hummer.COLOR:
                setColor((int) value);
                break;
            default:
                return false;
        }
        return true;
    }
}
