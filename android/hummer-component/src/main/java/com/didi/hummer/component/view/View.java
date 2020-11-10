package com.didi.hummer.component.view;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsAttribute;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.component.imageview.Image;
import com.didi.hummer.component.list.List;
import com.didi.hummer.component.scroller.HorizontalScroller;
import com.didi.hummer.component.scroller.Scroller;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.component.view.HummerLayoutExtendView;
import com.didi.hummer.render.style.HummerStyleUtils;

/**
 * @author: linjizong
 * @date: 2019/4/23
 * @desc:
 */
@Component("View")
public class View extends HummerLayoutExtendView {

    private static final String OVERFLOW_VISIBLE = "visible";
    private static final String OVERFLOW_HIDDEN = "hidden";

    public View(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        // 默认改成子View可以超出父容器，和iOS保持对齐
        getView().setClipChildren(false);
    }

    @Override
    @JsMethod("appendChild")
    public void appendChild(HMBase child) {
        super.appendChild(child);

        hummerNode.appendChild(child.getNode());

        // 以下控件需要限制子元素超出父容器
        if (child instanceof Image || child instanceof Scroller || child instanceof HorizontalScroller || child instanceof List) {
            getView().setClipChildren(true);
        }
    }

    @Override
    @JsMethod("removeChild")
    public void removeChild(HMBase child) {
        super.removeChild(child);

        hummerNode.removeChild(child.getNode());
    }

    @Override
    @JsMethod("removeAll")
    public void removeAll() {
        super.removeAll();

        hummerNode.removeAll();
    }

    @Override
    @JsMethod("insertBefore")
    public void insertBefore(HMBase child, HMBase existing) {
        super.insertBefore(child, existing);

        hummerNode.insertBefore(child.getNode(), existing.getNode());
    }

    @Override
    @JsMethod("replaceChild")
    public void replaceChild(HMBase child, HMBase old) {
        super.replaceChild(child, old);

        hummerNode.replaceChild(child.getNode(), old.getNode());
    }

    @Override
    @JsMethod("getElementById")
    public HMBase getElementById(String viewID) {
        return super.getElementById(viewID);
    }

    @JsMethod("layout")
    public void layout() {
        getView().requestLayout();
    }

    @JsAttribute("overflow")
    public void setOverflow(String overflow) {
        boolean needClip = OVERFLOW_HIDDEN.equals(overflow);
        getView().setNeedClipChildren(needClip);
    }

    @JsMethod("empty")
    public void empty() {
        // 该方法用于测试
    }

    @Override
    public void resetStyle() {
        super.resetStyle();
        setOverflow(OVERFLOW_VISIBLE);
    }

    @Override
    public boolean setStyle(String key, Object value) {
        switch (key) {
            case HummerStyleUtils.Hummer.OVERFLOW:
                setOverflow((String) value);
                break;
            default:
                return false;
        }
        return true;
    }
}
