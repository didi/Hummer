package com.didi.hummer.demo;

import android.util.Log;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.context.HummerContext;

/**
 * 静态导出组件
 *
 * Created by XiaoFeng on 2019-09-12.
 */
@Component("TestExportStaticModel")
public class TestExportStaticModel {

    // 导出静态变量（可以有get/set方法，也可以没有）
    @JsProperty("msg")
    private static String msg;

    public static String getMsg() {
        return msg;
    }

    public static void setMsg(String msg) {
        TestExportStaticModel.msg = msg;
    }

    // 导出静态方法
    @JsMethod("log")
    public static void log(String msg) {
        Log.v("zdf", "log: " + msg);
    }
}
