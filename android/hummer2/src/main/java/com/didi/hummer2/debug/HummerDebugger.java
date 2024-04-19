package com.didi.hummer2.debug;


import com.didi.hummer2.HummerContext;
import com.didi.hummer2.adapter.http.HttpCallback;
import com.didi.hummer2.utils.NetworkUtil;

/**
 * 调试插件
 *
 * Created by XiaoFeng on 2020/9/29.
 */
public class HummerDebugger {

    public static void init(HummerContext context, String url) {
//        if (HummerSDK.getHermesDebugger() != null) {
//            Hummer.getHermesDebugger().enableDebugging(context.getJsContext().getIdentify(), url);
//        }
//
//        if (HummerSDK.getV8Debugger() != null) {
//            NetworkUtil.httpGet(url, (HttpCallback<String>) response -> {
//                Hummer.getV8Debugger().addScriptSource(url, response.data);
//            });
//        }
    }

    public static void release(HummerContext context) {
//        if (HummerSDK.getHermesDebugger() != null) {
//            Hummer.getHermesDebugger().disableDebugging(context.getJsContext().getIdentify());
//        }
    }
}
