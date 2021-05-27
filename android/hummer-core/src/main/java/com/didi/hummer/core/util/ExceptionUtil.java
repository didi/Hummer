package com.didi.hummer.core.util;

import com.didi.hummer.core.engine.JSContext;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by XiaoFeng on 2020/9/24.
 */
public class ExceptionUtil {

    public static void addStackTrace(Exception e, StackTraceElement element) {
        addStackTrace(0, e, element);
    }

    public static void addStackTrace(int index, Exception e, StackTraceElement element) {
        StackTraceElement[] arr = e.getStackTrace();
        List<StackTraceElement> list = new ArrayList<>(Arrays.asList(arr));
        list.add(index, element);
        e.setStackTrace(list.toArray(new StackTraceElement[0]));
    }

    /**
     * 获取 JS Error 中的 stack 信息
     *
     * Error 实例包含以下属性或方法：
     * Error.constructor － 指定对象的构造函数
     * Error.message － 错误信息
     * Error.name － 错误名
     * Error.stack － 错误堆栈信息。该属性是一个非标准属性，但被大多数执行引擎所支持
     * Error.toString() － 表示错误对象的描述信息
     */
    public static String getJSErrorStack(JSContext jsContext) {
        jsContext.evaluateJavaScript("var __CUR_ERROR__ = new Error()");
        return jsContext.getJSValue("__CUR_ERROR__").getString("stack");
    }
}
