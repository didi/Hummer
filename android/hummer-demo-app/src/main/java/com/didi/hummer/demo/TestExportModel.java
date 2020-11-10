package com.didi.hummer.demo;

import android.content.Context;
import android.util.Log;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.util.HMGsonUtil;
import com.didi.hummer.lifecycle.ILifeCycle;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by XiaoFeng on 2019-09-12.
 */
@Component("TestExportModel")
public class TestExportModel implements ILifeCycle {

    public class Model {
        public int v1;
        public float v2;
        public String v3;
    }

    protected TestExportModel(Context context, JSValue jsValue, Map map, boolean bool, float f, long l, Model model, JSCallback callback) {
        Log.v("zdf", "TestExportModel, context = " + context + ", jsValue = " + jsValue);
        Log.v("zdf", "TestExportModel, map = " + map + ", bool = " + bool + ", f = " + f + ", l = " + l + ", model = " + HMGsonUtil.toJson(model));
        callback.call(12.34, true);
    }

    @Override
    public void onCreate() {

    }

    @Override
    public void onDestroy() {

    }

    @JsProperty("style")
    private HashMap<String, Object> style;

    public void setStyle(HashMap<String, Object> style) {
        Log.v("zdf", "setStyle, " + style);
        this.style = style;
    }

    public HashMap<String, Object> getStyle() {
        Log.v("zdf", "getStyle, " + style);
        return style;
    }

    @JsProperty("map")
    private HashMap<String, Object> map;
    public void setMap(HashMap<String, Object> map) {
        Log.v("zdf", "setMap, " + map);
        this.map = map;
    }

    public HashMap<String, Object> getMap() {
        Log.v("zdf", "getMap, " + map);
        return map;
    }

    @JsProperty("text")
    public String text;
//    public void setText(String text) {
//        Log.v("zdf", "setText, " + text);
//        this.text = text;
//    }

//    public String getText() {
//        Log.v("zdf", "getText, " + text);
//        return "getText: " + text;
//    }

    @JsProperty("floatValue")
    public float floatValue;

    public float getFloatValue() {
        Log.v("zdf", "getFloatValue, " + floatValue);
        return floatValue;
    }

    @JsProperty("array")
    private List<String> array;
    public void setArray(List<String> array) {
        Log.v("zdf", "setArray, " + array);
        this.array = array;
    }

    public List<String> getArray() {
        Log.v("zdf", "getArray, " + array);
        return array;
    }

    @JsMethod("getElementById")
    public boolean getSubview(String viewID, int index, Long test, HashMap<String, String> testMap, ArrayList<Object> testList, Model model) {
        Log.v("zdf", "getSubview, viewID: " + viewID + ", index = " + index + ", test = " + test + ", testMap: " + testMap + ", testList: " + testList + ", model = " + HMGsonUtil.toJson(model));
        return true;
    }

    @JsMethod("testObject")
    public Object testObject(HummerContext context, Object obj) {
        Log.v("zdf", "testObject, context = " + context);
        Log.v("zdf", "testObject, obj = " + obj);
        return "qqq";
    }
}
