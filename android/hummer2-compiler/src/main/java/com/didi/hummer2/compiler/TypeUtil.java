package com.didi.hummer2.compiler;

import com.squareup.javapoet.ClassName;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.element.ExecutableElement;
import javax.lang.model.element.TypeElement;
import javax.lang.model.type.DeclaredType;
import javax.lang.model.type.TypeMirror;

/**
 * Created by XiaoFeng on 2019-09-18.
 */
public class TypeUtil {

    public static final ClassName context = ClassName.get("android.content", "Context");
//    public static final ClassName jsValue = ClassName.get("com.didi.hummer.core.engine", "JSValue");
//    public static final ClassName jsCallback = ClassName.get("com.didi.hummer.core.engine", "JSCallback");
    public static final ClassName hummerContext = ClassName.get("com.didi.hummer2", "HummerContext");
//    public static final ClassName hmBase = ClassName.get("com.didi.hummer.render.component.view", "HMBase");
    public static final ClassName baseInvoker = ClassName.get("com.didi.hummer2.invoke", "BaseInvoker");
    public static final ClassName typeToken = ClassName.get("com.google.gson.reflect", "TypeToken");
//    public static final ClassName hmGsonUtil = ClassName.get("com.didi.hummer2.utils", "HMGsonUtil");

    public static final ClassName hummerObjectUtil = ClassName.get("com.didi.hummer2.utils", "HummerObjectUtil");


    public static final String JsiEventTargetClass = "com.didi.hummer2.bridge.EventTarget";
    public static final String JsiValueClass = "com.didi.hummer2.bridge.JsiValue";
    public static final String JsiNumberClass = "com.didi.hummer2.bridge.JsiNumber";
    public static final String JsiBooleanClass = "com.didi.hummer2.bridge.JsiBoolean";
    public static final String JsiStringClass = "com.didi.hummer2.bridge.JsiString";
    public static final String JsiObjectClass = "com.didi.hummer2.bridge.JsiObject";
    public static final String JsiArrayClass = "com.didi.hummer2.bridge.JsiArray";
    public static final String JsiFunctionClass = "com.didi.hummer2.bridge.JsiFunction";
    public static final ClassName JsiValue = ClassName.get("com.didi.hummer2.bridge", "JsiValue");
    public static final ClassName JsiFunction = ClassName.get("com.didi.hummer2.bridge", "JsiFunction");
    public static final ClassName EventTarget = ClassName.get("com.didi.hummer2.bridge", "EventTarget");

    public static final String HummerObjectClass = "com.didi.hummer2.register.HummerObject";

    public static final String ElementClass = "com.didi.hummer2.component.Element";
    public static final String ComponentClass = "com.didi.hummer2.component.Component";

    public static boolean isHummerObject(String type) {
        return type != null && (type.equals(HummerObjectClass));
    }

    public static boolean isElement(String type) {
        return type != null && (type.equals(ElementClass));
    }

    public static boolean isComponent(String type) {
        return type != null && (type.equals(ComponentClass));
    }


    public static boolean isJsiValue(TypeMirror type) {
        return isJsiValue(type);
    }

    public static boolean isJsiValue(String type) {
        return type != null && (type.equals(JsiValueClass)
                || type.equals(JsiNumberClass)
                || type.equals(JsiBooleanClass)
                || type.equals(JsiStringClass)
                || type.equals(JsiObjectClass)
                || type.equals(JsiArrayClass)
                || type.equals(JsiFunctionClass)
        );
    }

    public static boolean isVoid(TypeMirror type) {
        return isVoid(type.toString());
    }

    public static boolean isVoid(String type) {
        return type != null && (type.equals(void.class.getName()) || type.equals(Void.class.getName()));
    }

    public static boolean isInt(TypeMirror type) {
        return isInt(type.toString());
    }

    public static boolean isInt(String type) {
        return type != null && (type.equals(int.class.getName()) || type.equals(Integer.class.getName()));
    }

    public static boolean isLong(TypeMirror type) {
        return isLong(type.toString());
    }

    public static boolean isLong(String type) {
        return type != null && (type.equals(long.class.getName()) || type.equals(Long.class.getName()));
    }

    public static boolean isFloat(TypeMirror type) {
        return isFloat(type.toString());
    }

    public static boolean isFloat(String type) {
        return type != null && (type.equals(float.class.getName()) || type.equals(Float.class.getName()));
    }

    public static boolean isNumber(TypeMirror type) {
        return isNumber(type.toString());
    }

    public static boolean isNumber(String type) {
        return TypeUtil.isInt(type) || TypeUtil.isLong(type) || TypeUtil.isFloat(type) || TypeUtil.isDouble(type);
    }

    public static boolean isDouble(TypeMirror type) {
        return isDouble(type.toString());
    }

    public static boolean isDouble(String type) {
        return type != null && (type.equals(double.class.getName()) || type.equals(Double.class.getName()));
    }

    public static boolean isBoolean(TypeMirror type) {
        return isBoolean(type.toString());
    }

    public static boolean isBoolean(String type) {
        return type != null && (type.equals(boolean.class.getName()) || type.equals(Boolean.class.getName()));
    }

    public static boolean isString(TypeMirror type) {
        return isString(type.toString());
    }

    public static boolean isString(String type) {
        return type != null && type.equals(String.class.getName());
    }

    public static boolean isList(TypeMirror type) {
        return isList(type.toString());
    }

    public static boolean isList(String type) {
        return type != null && type.startsWith(List.class.getName());
    }

    public static boolean isArrayList(TypeMirror type) {
        return isArrayList(type.toString());
    }

    public static boolean isArrayList(String type) {
        return type != null && type.startsWith(ArrayList.class.getName());
    }

    public static boolean isLinkedList(TypeMirror type) {
        return isLinkedList(type.toString());
    }

    public static boolean isLinkedList(String type) {
        return type != null && type.startsWith(LinkedList.class.getName());
    }

    public static boolean isMap(TypeMirror type) {
        return isMap(type.toString());
    }

    public static boolean isMap(String type) {
        return type != null && type.startsWith(Map.class.getName());
    }

    public static boolean isHashMap(TypeMirror type) {
        return isHashMap(type.toString());
    }

    public static boolean isHashMap(String type) {
        return type != null && type.startsWith(HashMap.class.getName());
    }

    public static boolean isLinkedHashMap(TypeMirror type) {
        return isLinkedHashMap(type.toString());
    }

    public static boolean isLinkedHashMap(String type) {
        return type != null && type.startsWith(LinkedHashMap.class.getName());
    }

    public static boolean isBasicType(TypeMirror type) {
        return isBasicType(type.toString());
    }

    public static boolean isBasicType(String type) {
        return TypeUtil.isInt(type) || TypeUtil.isLong(type) || TypeUtil.isFloat(type) || TypeUtil.isDouble(type) || TypeUtil.isBoolean(type) || TypeUtil.isString(type);
    }

    public static boolean isCollectionType(TypeMirror type) {
        return isCollectionType(type.toString());
    }

    public static boolean isCollectionType(String type) {
        return TypeUtil.isList(type) || TypeUtil.isArrayList(type) || TypeUtil.isLinkedList(type) || TypeUtil.isMap(type) || TypeUtil.isHashMap(type) || TypeUtil.isLinkedHashMap(type);
    }

    /**
     * 获取Number类的转换方法名：
     *
     * @param type
     * @return
     */
    public static String getNumberToMethodName(String type) {
        String funcName = "";
        if (TypeUtil.isInt(type)) {
            funcName = "intValue()";
        } else if (TypeUtil.isLong(type)) {
            funcName = "longValue()";
        } else if (TypeUtil.isFloat(type)) {
            funcName = "floatValue()";
        } else if (TypeUtil.isDouble(type)) {
            funcName = "doubleValue()";
        }
        return funcName;
    }

    public static Class getCollectionClass(String type) {
        Class clazz = void.class;
        if (TypeUtil.isList(type) || TypeUtil.isArrayList(type) || TypeUtil.isLinkedList(type)) {
            clazz = List.class;
        } else if (TypeUtil.isMap(type) || TypeUtil.isHashMap(type) || TypeUtil.isLinkedHashMap(type)) {
            clazz = Map.class;
        }
        return clazz;
    }

    /**
     * 获取一个类的父类
     *
     * @param classElement
     * @return
     */
    public static TypeElement getSuperClass(TypeElement classElement) {
        TypeMirror parent = classElement.getSuperclass();
        if (parent instanceof DeclaredType) {
            Element elt = ((DeclaredType) parent).asElement();
            if (elt instanceof TypeElement) {
                return (TypeElement) elt;
            }
        }
        return null;
    }

    /**
     * 获取类的构造函数
     *
     * @param classElement
     * @return
     */
    public static ExecutableElement getConstructor(TypeElement classElement) {
        List<? extends Element> members = classElement.getEnclosedElements();
        for (Element e : members) {
            if (ElementKind.CONSTRUCTOR.equals(e.getKind())) {
                return (ExecutableElement) e;
            }
        }
        return null;
    }
}
