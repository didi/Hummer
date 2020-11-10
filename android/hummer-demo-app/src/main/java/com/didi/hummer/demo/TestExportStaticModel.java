package com.didi.hummer.demo;

import android.util.Log;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.context.HummerContext;

/**
 * Created by XiaoFeng on 2019-09-12.
 */
@Component("TestExportStaticModel")
public class TestExportStaticModel {

    @JsProperty("msg")
    private static String msg;

    public static String getMsg() {
        return msg;
    }

    public static void setMsg(String msg) {
        TestExportStaticModel.msg = msg;
    }

    @JsMethod("log")
    public static void log(HummerContext context, String msg) {
        Log.v("zdf", "context: " + context);
        Log.v("zdf", "log: " + msg);
    }
}
