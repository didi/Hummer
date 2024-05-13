package com.didi.hummer2.component;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMAttribute;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.component.hummer.scroller.HorizontalScroller;
import com.didi.hummer2.render.Element;

/**
 * didi Create on 2024/4/9 .
 * <p>
 * Copyright (c) 2024/4/9 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/9 8:07 PM
 * @Description HorizontalScroller
 */

@HMComponent("HorizontalScroller")
public class HorizontalScrollerElement extends Element<HorizontalScroller> {


    public HorizontalScrollerElement(HummerContext context, Object[] properties) {
        super(context, properties);
    }

    @Override
    public HorizontalScroller createRenderView() {
        return new HorizontalScroller(context,null,null);
    }


    @HMMethod("appendChild")
    public void appendChild(Element element) {
        getView().appendChild(element.getView());
    }

    @HMMethod("removeChild")
    public void removeChild(Element element) {
        getView().removeChild(element.getView());
    }

    @HMMethod("removeAll")
    public void removeAll() {
        getView().removeAll();
    }

    @HMMethod("insertBefore")
    public void insertBefore(Element child, Element existing) {
        getView().insertBefore(child.getView(), existing.getView());
    }

    @HMMethod("replaceChild")
    public void replaceChild(Element child, Element old) {
        getView().replaceChild(child.getView(), old.getView());
    }

    @HMMethod("updateContentSize")
    public void updateContentSize() {
        getView().updateContentSize();
    }


    @HMAttribute("showScrollerBar")
    private boolean showScrollerBar;

    public void setShowScrollerBar(boolean showScrollerBar) {
        this.showScrollerBar = showScrollerBar;
        getView().setShowScrollBar(showScrollerBar);
    }

    @HMAttribute("bounces")
    private boolean bounces;


    public void setBounces(boolean bounces) {
        this.bounces = bounces;
        getView().bounces = bounces;
    }

    @HMMethod("scrollTo")
    public void scrollTo(Object x, Object y) {
        getView().scrollTo(x, y);
    }

    @HMMethod("scrollBy")
    public void scrollBy(Object dx, Object dy) {
        getView().scrollBy(dx, dy);
    }

    @HMMethod("scrollToTop")
    public void scrollToTop() {
        getView().scrollToTop();
    }

    @HMMethod("scrollToBottom")
    public void scrollToBottom() {
        getView().scrollToBottom();
    }

}
