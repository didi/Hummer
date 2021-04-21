package com.didi.hummer.demo;

import android.content.Context;
import android.util.Log;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;

import java.util.List;
import java.util.Map;

/**
 * 普通功能组件导出组件
 *
 * Created by XiaoFeng on 2019-09-12.
 */
@Component("TestExportModel")
public class TestExportModel {

    /**
     * 构造函数（可选）
     *
     * 参数支持基本类型、Map、List、自定义对象、JSCallback 这几种类型。
     * 其中前两个参数比较特殊，用于接收保留参数：
     * 第一个参数用于接收 Context 或 HummerContext，其中 Context 是页面上下文，HummerContext 是 Hummer 执行上下文，可以不接收。
     * 第二个参数用于接收 本对象对应的 JSValue，可以不接收。
     */
    public TestExportModel(Context context, JSValue jsValue, int i, long l, float f, boolean b, Map<String, Object> map, List<Object> list, Model model, JSCallback callback) {
        Log.v("zdf", "TestExportModel, context = " + context + ", jsValue = " + jsValue);
        Log.v("zdf", "TestExportModel, i = " + i + ", l = " + l + ", f = " + f + ", b = " + b + ", map = " + map + ", list = " + list + ", model = " + model);
        callback.call(11, 22, 12.34, true);
    }

    // 导出基本类型的属性（可以有get/set方法，也可以没有）
    @JsProperty("floatValue")
    public float floatValue;
    public void setFloatValue(float floatValue) {
        Log.v("zdf", "setFloatValue, " + floatValue);
        this.floatValue = floatValue;
    }
    public float getFloatValue() {
        Log.v("zdf", "getFloatValue, " + floatValue);
        return floatValue;
    }

    // 导出Map类型的属性（对应JS侧的Object）
    @JsProperty("mapValue")
    private Map<String, Object> mapValue;
    public void setMapValue(Map<String, Object> value) {
        Log.v("zdf", "setMapValue, " + value);
        mapValue = value;
    }
    public Map<String, Object> getMapValue() {
        Log.v("zdf", "getMapValue, " + mapValue);
        return mapValue;
    }

    // 导出List类型的属性（对应JS侧的Array）
    @JsProperty("listValue")
    private List<Object> listValue;
    public void setListValue(List<Object> value) {
        Log.v("zdf", "setListValue, " + value);
        listValue = value;
    }
    public List<Object> getListValue() {
        Log.v("zdf", "getListValue, " + listValue);
        return listValue;
    }

    // 导出自定义类的属性（对应JS侧的Object）
    @JsProperty("modelValue")
    private Model modelValue;
    public void setModelValue(Model value) {
        Log.v("zdf", "setModelValue, " + value);
        modelValue = value;
    }
    public Model getModelValue() {
        Log.v("zdf", "getModelValue, " + modelValue);
        return modelValue;
    }

    // 导出方法（参数支持同构造方法，第一个参数也是保留参数，用于接收 Context 或 HummerContext，可以不接收）
    @JsMethod("doFunc")
    public String doFunc(HummerContext context, int i, long l, float f, boolean b, Map<String, Object> map, List<Object> list, Model model, JSCallback callback) {
        return "[doFunc] i = " + i + ", l = " + l + ", f = " + f + ", b = " + b + ", map = " + map + ", list = " + list + ", model = " + model + ", callback.call = " + callback.call();
    }

    public static class Model {
        public int v1;
        public float v2;
        public String v3;

        @Override
        public String toString() {
            return "Model{" +
                    "v1=" + v1 +
                    ", v2=" + v2 +
                    ", v3='" + v3 + '\'' +
                    '}';
        }
    }
}
