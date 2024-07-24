package com.didi.hummer2.render;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMAttribute;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.annotationx.JsMethod;
import com.didi.hummer2.bridge.JsiFunction;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.module.Component;
import com.didi.hummer2.module.component.EventListenerCallback;
import com.didi.hummer2.render.anim.HummerAnimation;
import com.didi.hummer2.engine.JSCallback;
import com.didi.hummer2.invoke.BaseInvoker;
import com.didi.hummer2.invoke.Invoker;
import com.didi.hummer2.render.component.anim.BasicAnimation;
import com.didi.hummer2.render.component.view.HMBase;
import com.didi.hummer2.render.event.base.Event;

import java.util.Map;

/**
 * didi Create on 2023/12/4 .
 * <p>
 * Copyright (c) 2023/12/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/12/4 3:58 PM
 * @Description 用一句话说明文件功能
 */

//@HMComponent("Element")
public abstract class Element<VIEW extends HMBase> extends Component {


    protected HummerContext context;
    protected Object[] properties;
    protected VIEW renderView;


    public Element(HummerContext context, Object[] properties) {
        super(context);
        this.context = context;
        this.properties = properties;
        this.renderView = createRenderView();
        this.renderView.setElementNode(this);
    }

    public abstract VIEW createRenderView();

    public void onCreate() {
        super.onCreate();
        renderView.onCreate();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        renderView.onDestroy();
    }

    public VIEW getRenderView() {
        return renderView;
    }

    public VIEW getView() {
        return renderView;
    }


    @HMAttribute("enabled")
    public boolean enabled;

    public void setEnabled(boolean enabled) {
        getView().setEnabled(enabled);
    }

    public boolean getEnabled() {
        return getView().getEnabled();
    }

    @HMAttribute("accessible")
    public boolean accessible;

    public void setAccessible(boolean accessible) {
        getView().setAccessible(accessible);
    }

    /**
     * 无障碍标签
     */
    @HMAttribute("accessibilityLabel")
    public String accessibilityLabel;

    public void setAccessibilityLabel(String label) {
        getView().setAccessibilityLabel(label);
    }

    /**
     * 无障碍提示
     */
    @HMAttribute("accessibilityHint")
    public String accessibilityHint;

    public void setAccessibilityHint(String hint) {
        getView().setAccessibilityHint(hint);
    }

    @HMAttribute("accessibilityRole")
    public String accessibilityRole;

    public void setAccessibilityRole(String role) {
        getView().setAccessibilityRole(role);
    }

    /**
     * 无障碍状态
     * <p>
     * 目前支持以下几种状态：
     * selected
     * disabled
     */
    @HMAttribute("accessibilityState")
    public Map<String, Object> accessibilityState;


    @HMMethod("setStyles")
    public void setStyles(Map<String, Object> styles) {
        getView().setStyle(styles);
        onStyleUpdated();
    }

    protected void onStyleUpdated() {

    }

    public boolean setElementStyle(String key, Object value) {
        return onUpdateStyle(key, value);
    }


    protected boolean onUpdateStyle(String key, Object value) {
        Invoker invoker = getInvoker();
        if (invoker instanceof BaseInvoker) {
            return ((BaseInvoker) invoker).onUpdateStyle((HummerContext) context, this, key,value);
        }
        return false;
    }


    public void setAccessibilityState(Map<String, Object> state) {
        getView().setAccessibilityState(state);
    }

    @HMMethod("setAttributes")
    public void setAttributes(JsiObject attributes) {
        //TODO  暂时不使用
    }

    @HMMethod("setAttribute")
    public void setAttribute(String name, JsiValue hmValue) {
        //TODO  暂时不使用
    }

    @HMMethod("getAttribute")
    public JsiValue getAttribute(String name, JsiFunction callback) {
        //TODO  暂时不使用
        return null;
    }

    @Override
    protected JSCallback getEventTargetListener() {
        return new EventListenerCallback(eventTarget.getJsiFunction());
    }


    @HMMethod("appendChild")
    public void appendChild(Element element) {
//        getView().appendChild(element.getView());
    }

    @HMMethod("removeChild")
    public void removeChild(Element element) {
//        getView().removeChild(element.getView());
    }

    @HMMethod("removeAll")
    public void removeAll() {
//        getView().removeAll();
    }

    @HMMethod("insertBefore")
    public void insertBefore(Element child, Element existing) {
//        getView().insertBefore(child.getView(), existing.getView());
    }

    @HMMethod("replaceChild")
    public void replaceChild(Element child, Element old) {
//        getView().replaceChild(child.getView(), old.getView());
    }

    @Override
    @HMMethod("addEventListener")
    public void addEventListener(String eventName) {
        super.addEventListener(eventName);
        getView().addEventListener(eventName, getEventTargetListener());
    }

    @Override
    @HMMethod("removeEventListener")
    public void removeEventListener(String eventName) {
        super.removeEventListener(eventName);
        getView().removeEventListener(eventName, null);
    }

    @Override
    public void dispatchEvent(Event event) {
        super.dispatchEvent(event);
    }

    @Override
    public void directDispatchEvent(Event event) {
        super.directDispatchEvent(event);
    }

    @HMMethod("addAnimation")
    public void addAnimation(HummerAnimation anim, String id) {
        if (anim != null) {
            BasicAnimation animation = anim.getOriginAnimation();
            animation.key = id;
            animation.on("start", getEventTargetListener());
            animation.on("end", getEventTargetListener());
            getView().addAnimation(animation, id);
        }
    }

    @HMMethod("removeAnimationForKey")
    public void removeAnimationForKey(String id) {
        getView().removeAnimationForKey(id);
    }

    @HMMethod("removeAllAnimation")
    public void removeAllAnimation() {
        getView().removeAllAnimation();
    }

    @HMMethod("getRect")
    public void getRect(JsiFunction callback) {
        getView().getRect(new EventListenerCallback(callback));
    }

    @HMMethod("resetStyle")
    public void resetStyle() {
        getView().resetStyle();
    }

    @HMMethod("dbg_highlight")
    public void dbg_highlight(Object config) {
        getView().dbg_highlight(config);
    }

    @JsMethod("dbg_getDescription")
    public void dbg_getDescription(JsiFunction callback, int depth) {
        getView().dbg_getDescription(new EventListenerCallback(callback), depth);
    }

}
