package com.didi.hummer2.invoke;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.bridge.EventTarget;
import com.didi.hummer2.bridge.JsiFunction;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.component.Component;
import com.didi.hummer2.component.Element;
import com.didi.hummer2.register.HummerObject;
import com.didi.hummer2.render.component.anim.BasicAnimation;
import com.didi.hummer2.utils.HummerObjectUtil;
import com.google.gson.reflect.TypeToken;

import java.util.List;
import java.util.Map;

/**
 * didi Create on 2024/3/26 .
 * <p>
 * Copyright (c) 2024/3/26 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/26 6:01 PM
 * @Description Invoker 组件调用能力基类
 */

public abstract class BaseInvoker<T extends HummerObject> extends AbsInvoker<T> {

    @Override
    public HummerObject createInstance(HummerContext hummerContext, Object... params) {
        return onCreateInstance(hummerContext, params);
    }

    @Override
    public Object invoke(HummerContext hummerContext, HummerObject hummerObject, String methodName, Object... params) {
        Object invokeResult;
        if (hummerObject instanceof Element) {
            invokeResult = onElementInvoke(hummerContext, (T) hummerObject, methodName, params);
        } else {
            invokeResult = onComponentInvoke(hummerContext, (T) hummerObject, methodName, params);
        }
        return invokeResult;
    }

    protected Object setStyles(HummerContext hummerContext, T element, String methodName, Object... params) {
        if (params != null && params[0] instanceof JsiObject) {
            JsiObject styles = (JsiObject) params[0];
            List<String> keys = styles.keys();
            for (String key : keys) {
                Object value = styles.get(key);
                boolean success = onSetStyle(hummerContext, element, key, new Object[]{value});
//                if (!success) {
//                    element.setStyle(key, value);
//                }
            }
        }
        return null;
    }

    public boolean onSetStyle(HummerContext hummerContext, T element, String styleName, Object[] params) {
        return false;
    }


    /**
     * 属性集合处理
     *
     * @param hummerContext
     * @param element
     * @param methodName
     * @param params
     * @return
     */
    protected Object setAttributes(HummerContext hummerContext, T element, String methodName, Object... params) {
        if (params != null && params.length > 0 && params[0] instanceof JsiObject) {
            JsiObject attributes = (JsiObject) params[0];
            List<String> keys = attributes.keys();
            for (String name : keys) {
                Object value = attributes.get(name);
                onElementSetAttribute(hummerContext, element, name, value);
            }
        }
        return null;
    }

    /**
     * 单属性处理
     *
     * @param hummerContext
     * @param instance
     * @param methodName
     * @param params
     * @return
     */
    protected Object setAttribute(HummerContext hummerContext, T instance, String methodName, Object... params) {
        String param0 = params.length > 0 && params[0] != null ? HummerObjectUtil.toUTFString(params[0]) : null;
        JsiValue param1 = params.length > 1 && params[1] != null ? (JsiValue) HummerObjectUtil.toJsiValue(params[1]) : null;
        onElementSetAttribute(hummerContext, instance, param0, param1);
        return null;
    }

    /**
     * 视图组件扩展属性处理
     *
     * @param hummerContext
     * @param instance
     * @param attributeName
     * @param attribute
     */
    protected Object onInvokeAttribute(HummerContext hummerContext, T instance, String attributeName, Object[] attribute) {
        return null;
    }

    /**
     * 视图组件基础属性处理
     *
     * @param hummerContext
     * @param instance
     * @param attributeName
     * @param attribute
     */
    protected void onElementSetAttribute(HummerContext hummerContext, T instance, String attributeName, Object attribute) {
        Element element = (Element) instance;
        switch (attributeName) {
            case "enabled": {
                boolean param0 = attribute != null ? HummerObjectUtil.toBoolean(attribute) : false;
                element.setEnabled(param0);
            }
            break;
            case "accessible": {
                boolean param0 = attribute != null ? HummerObjectUtil.toBoolean(attribute) : false;
                element.setAccessible(param0);
            }
            break;
            case "accessibilityLabel": {
                String param0 = attribute != null ? HummerObjectUtil.toUTFString(attribute) : null;
                element.setAccessibilityLabel(param0);
            }
            break;
            case "accessibilityHint": {
                String param0 = attribute != null ? HummerObjectUtil.toUTFString(attribute) : null;
                element.setAccessibilityHint(param0);
            }
            break;
            case "accessibilityRole": {
                String param0 = attribute != null ? HummerObjectUtil.toUTFString(attribute) : null;
                element.setAccessibilityRole(param0);
            }
            break;
            case "accessibilityState": {
                Map<String, Object> param0 = attribute != null ? HummerObjectUtil.toJavaModel(attribute, new TypeToken<Map<String, Object>>() {
                }.getType()) : null;
                element.setAccessibilityState(param0);
            }
            break;
            default: {
                onInvokeAttribute(hummerContext, instance, attributeName, new Object[]{attribute});
            }
            break;
        }
    }

    /**
     * 视图组件基础方法处理
     *
     * @param hummerContext
     * @param instance
     * @param methodName
     * @param params
     * @return
     */
    protected Object onElementInvoke(HummerContext hummerContext, T instance, String methodName, Object[] params) {
        Element element = (Element) instance;
        Object invokeResult = null;
        switch (methodName) {
            case "setStyles": {
//                setStyles(hummerContext, element, methodName, params);
                Map<String, Object> param0 = params.length > 0 && params[0] != null ? HummerObjectUtil.toJavaModel(params[0], new TypeToken<Map<String, Object>>() {
                }.getType()) : null;
                element.setStyle(param0);
            }
            break;
            case "setAttributes": {
                setAttributes(hummerContext, instance, methodName, params);
            }
            break;
            case "setAttribute": {
                setAttribute(hummerContext, instance, methodName, params);
            }
            break;
            case "getAttribute": {
                String param0 = params.length > 0 && params[0] != null ? HummerObjectUtil.toUTFString(params[0]) : null;
                JsiFunction param1 = params.length > 0 && params[1] != null ? (JsiFunction) HummerObjectUtil.toJsiValue(params[1]) : null;
                invokeResult = element.getAttribute(param0, param1);
            }
            break;
            case "appendChild": {
                Element param0 = params.length > 0 && params[0] != null ? HummerObjectUtil.toElement(hummerContext, params[0]) : null;
                element.appendChild(param0);
            }
            break;
            case "removeChild": {
                Element param0 = params.length > 0 && params[0] != null ? HummerObjectUtil.toElement(hummerContext, params[0]) : null;
                element.removeChild(param0);
            }
            break;
            case "removeAll": {
                element.removeAll();
            }
            break;
            case "insertBefore": {
                Element param0 = params.length > 0 && params[0] != null ? HummerObjectUtil.toElement(hummerContext, params[0]) : null;
                Element param1 = params.length > 1 && params[1] != null ? HummerObjectUtil.toElement(hummerContext, params[1]) : null;
                element.insertBefore(param0, param1);
            }
            break;
            case "replaceChild": {
                Element param0 = params.length > 0 && params[0] != null ? HummerObjectUtil.toElement(hummerContext, params[0]) : null;
                Element param1 = params.length > 1 && params[1] != null ? HummerObjectUtil.toElement(hummerContext, params[1]) : null;
                element.replaceChild(param0, param1);
            }
            break;

            case "addEventListener": {
                String param0 = params.length > 0 && params[0] != null ? HummerObjectUtil.toUTFString(params[0]) : null;
                element.addEventListener(param0);
            }
            break;
            case "removeEventListener": {
                String param0 = params.length > 0 && params[0] != null ? HummerObjectUtil.toUTFString(params[0]) : null;
                element.removeEventListener(param0);
            }
            break;
            case "setEventTarget": {
                JsiFunction param0 = params.length > 0 && params[0] != null ? (JsiFunction) HummerObjectUtil.toJsiValue(params[0]) : null;
                element.setEventTarget(new EventTarget(param0));
            }
            break;
            case "addAnimation": {
                BasicAnimation param0 = params.length > 0 && params[0] != null ? HummerObjectUtil.toJavaModel(params[0], new TypeToken<BasicAnimation>() {
                }.getType()) : null;
                String param1 = params.length > 1 && params[1] != null ? HummerObjectUtil.toUTFString(params[1]) : null;
                element.addAnimation(param0, param1);
            }
            break;
            case "removeAnimationForKey": {
                String param0 = params.length > 0 && params[0] != null ? HummerObjectUtil.toUTFString(params[0]) : null;
                element.removeAnimationForKey(param0);
            }
            break;
            case "removeAllAnimation": {
                element.removeAllAnimation();
            }
            break;
            case "getRect": {
                JsiFunction param0 = params.length > 0 && params[0] != null ? (JsiFunction) HummerObjectUtil.toJsiValue(params[0]) : null;
                element.getRect(param0);
            }
            break;
            case "resetStyle": {
                element.resetStyle();
            }
            break;
            case "dbg_highlight": {
                Object param0 = params.length > 0 && params[0] != null ? HummerObjectUtil.toJavaModel(params[0], new TypeToken<Object>() {
                }.getType()) : null;
                element.dbg_highlight(param0);
            }
            break;
            default: {
                invokeResult = onInvoke(hummerContext, instance, methodName, params);
            }
            break;
        }
        return invokeResult;
    }


    /**
     * 非视图组件基础方法处理
     *
     * @param hummerContext
     * @param instance
     * @param methodName
     * @param params
     * @return
     */
    protected Object onComponentInvoke(HummerContext hummerContext, T instance, String methodName, Object[] params) {
        Component element = (Component) instance;
        Object invokeResult = null;
        switch (methodName) {
            case "addEventListener": {
                String param0 = params.length > 0 && params[0] != null ? (String) HummerObjectUtil.toUTFString(params[0]) : null;
                element.addEventListener(param0);
            }
            break;
            case "removeEventListener": {
                String param0 = params.length > 0 && params[0] != null ? (String) HummerObjectUtil.toUTFString(params[0]) : null;
                element.removeEventListener(param0);
            }
            break;
            case "setEventTarget": {
                JsiFunction param0 = params.length > 0 && params[0] != null ? (JsiFunction) HummerObjectUtil.toJsiValue(params[0]) : null;
                element.setEventTarget(new EventTarget(param0));
            }
            break;
            default: {
                invokeResult = onInvoke(hummerContext, instance, methodName, params);
            }
            break;
        }
        return invokeResult;
    }

}
