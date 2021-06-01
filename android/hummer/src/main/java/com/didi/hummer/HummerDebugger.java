package com.didi.hummer;

import com.didi.hummer.adapter.http.HttpCallback;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.utils.NetworkUtil;

/**
 * 调试插件
 *
 * Created by XiaoFeng on 2020/9/29.
 */
public class HummerDebugger {

    public static void init(HummerContext context, String url) {
        if (HummerSDK.getHermesDebugger() != null) {
            Hummer.getHermesDebugger().enableDebugging(context.getJsContext().getIdentify(), url);
        }

        if (HummerSDK.getV8Debugger() != null) {
            NetworkUtil.httpGet(url, (HttpCallback<String>) response -> {
                Hummer.getV8Debugger().addScriptSource(url, response.data);
            });
        }
    }

    public static void release(HummerContext context) {
        if (HummerSDK.getHermesDebugger() != null) {
            Hummer.getHermesDebugger().disableDebugging(context.getJsContext().getIdentify());
        }
    }
}
