package com.didi.hummer2.component;


import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.annotation.HMStyle;
import com.didi.hummer2.component.hummer.view.View;


/**
 * didi Create on 2023/12/4 .
 * <p>
 * Copyright (c) 2023/12/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/12/4 3:59 PM
 * @Description View 组件
 */

@HMComponent("View")
public class ViewElement extends Element<View> {

    public ViewElement(HummerContext context) {
        super(context, null);
    }

    @Override
    public View createRenderView() {
        return new View(context, null, null);
    }

    @HMStyle("overflow")
    public void setOverflow(String overflow) {
        getView().setOverflow(overflow);
    }

    @Override
    @HMMethod("appendChild")
    public void appendChild(Element element) {
        getView().appendChild(element.getView());
    }

    @Override
    @HMMethod("removeChild")
    public void removeChild(Element element) {
        getView().removeChild(element.getView());
    }

    @Override
    @HMMethod("removeAll")
    public void removeAll() {
        getView().removeAll();
    }

    @Override
    @HMMethod("insertBefore")
    public void insertBefore(Element child, Element existing) {
        getView().insertBefore(child.getView(), existing.getView());
    }

    @Override
    @HMMethod("replaceChild")
    public void replaceChild(Element child, Element old) {
        getView().replaceChild(child.getView(), old.getView());
    }


}
