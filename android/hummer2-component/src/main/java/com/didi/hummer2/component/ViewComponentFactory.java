package com.didi.hummer2.component;

import android.content.Context;
import android.util.Log;

import com.didi.hummer2.HummerRender;
import com.didi.hummer2.bridge.JsiFunction;
import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.hvdom.HMVComponentFactory;
import com.didi.hummer2.hvdom.TypeDef;

/**
 * didi Create on 2023/11/28 .
 * <p>
 * Copyright (c) 2023/11/28 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/28 11:02 上午
 * @Description 用一句话说明文件功能
 */

public class ViewComponentFactory implements HMVComponentFactory {

    private Context context;
    private HummerRender render;

    private ElementStorage elementStorage;

    public ViewComponentFactory(Context context) {
        this.context = context;
        this.elementStorage = new ElementStorage();
    }

    public ViewComponentFactory(Context context, HummerRender render) {
        this.context = context;
        this.render = render;
        this.elementStorage = new ElementStorage();
    }

    @Override
    public Object newInstance(long clsId, long objId, Object[] pramsX) {
        Object prams = pramsX[0];
        Log.i("Hummer2", "ViewComponentFactory::newInstance() clsId=" + clsId + ",objId=" + objId + ",prams=" + valueString(prams));
        if (prams instanceof JsiObject) {
            Log.i("Hummer2", "ViewComponentFactory::newInstance() ");
            JsiObject props = (JsiObject) prams;
            String name = valueString(props.get("element_name"));
            Log.i("Hummer2", "ViewComponentFactory::newInstance() 2");
            Element element = null;
            switch (name) {
                case "View":
                    element = new ViewElement(context, props);
                    break;
                case "Text":
                    element = new TextElement(context, props);
                    break;
            }
            if (element != null) {
                element.setId(objId);
                element.onCreate();
                elementStorage.saveElement(element);
            }

        }
        Log.i("Hummer2", "ViewComponentFactory::newInstance() 3");
        return null;
    }

    @Override
    public Object callStaticMethod(long clsId, long methodId, Object[] pramsX) {
        Object prams = null;
        if (pramsX.length > 0){
            prams=  pramsX[0];
        }
//        Log.i("Hummer2", "Factory::callStaticMethod() clsId=" + clsId + ",prams=" + valueString(prams));
        if (clsId == TypeDef.BridgeClsId) {
            if (prams instanceof JsiObject) {
//                HMObject props = (HMObject) prams;
//                String name = valueString(props.get("component_name"));
//                HMValue method = props.get("method");
//                HMValue args = props.get("args");
//                Log.i("Hummer2", "Factory::callStaticMethod() name=" + name + ",method=" + method + ",args=" + args);
//
                return new JsiString("callStaticMethod ok");
            }

        }
//        return new HMString("callStaticMethod error");
        return null;
    }

    @Override
    public Object callMethod(long clsId, long objId, long methodId, Object[] pramsX) {
        Object prams = pramsX[0];
        Log.i("Hummer2", "Factory::callMethod() clsId=" + clsId + ",objId=" + objId + ",methodId=" + methodId + ",prams=" + valueString(prams));

        if (clsId == TypeDef.RenderClsId && methodId == TypeDef.RenderMethod_renderRoot) {
            Log.i("Hummer2", "RenderMethod_renderRoot");
            if (prams instanceof JsiNumber) {
                long rootElementId = ((JsiNumber) prams).valueLong();
                Element rootElement = elementStorage.findElement(rootElementId);
                render.renderRootView(rootElement.getRenderView().getView());
            }
            return null;
        }

        Element element = elementStorage.findElement(objId);
        if (element == null) {
            Log.e("Hummer2", "elementStorage.findElement() error.");
            return null;
        }

        switch ((int) methodId) {
            case TypeDef.ElementMethod_setAttribute:
                if (prams instanceof JsiObject) {
                    JsiObject props = (JsiObject) prams;
                    String name = valueString(props.get("attribute_name"));
                    JsiValue attribute = props.get("attribute");
                    element.setAttribute(name, attribute);
                }
                break;

            case TypeDef.ElementMethod_setStyle:
                if (prams instanceof JsiValue) {
                    element.setStyle((JsiValue) prams);
                }
                break;

            case TypeDef.ElementMethod_addEventListener:
                if (prams instanceof JsiObject) {
                    JsiObject props = (JsiObject) prams;
                    String name = valueString(props.get("event_name"));
                    JsiFunction hmFunction = (JsiFunction)props.get("event_listener");
                    element.addEventListener(name, hmFunction);
                }
                break;

            case TypeDef.ElementMethod_removeEventListener:
                if (prams instanceof JsiObject) {
                    JsiObject props = (JsiObject) prams;
                    String name = valueString(props.get("event_name"));
                    JsiValue listener = props.get("event_listener");
                    element.removeEventListener(name, null);
                }
                break;

            case TypeDef.ElementMethod_appendChild:
                if (element instanceof ViewElement) {
                    ViewElement viewElement = (ViewElement) element;
                    if (prams instanceof JsiNumber) {
                        long childId = ((JsiNumber) prams).valueLong();
                        Element child = elementStorage.findElement(childId);
                        viewElement.appendChild(child);
                    }
                }
                break;

            case TypeDef.ElementMethod_removeChild:
                if (element instanceof ViewElement) {
                    ViewElement viewElement = (ViewElement) element;
                    if (prams instanceof JsiNumber) {
                        long childId = ((JsiNumber) prams).valueLong();
                        Element child = elementStorage.findElement(childId);
                        viewElement.removeChild(child);
                    }
                }
                break;
        }


        return null;
    }


    public String valueString(Object obj) {
        if (obj == null) {
            return "null";
        }
        if (obj instanceof JsiString) {
            return ((JsiString) obj).valueString();
        }
        return obj.toString();
    }


}

