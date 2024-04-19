package com.didi.hummer2.module.hummer;


import com.didi.hummer2.HummerContext;
import com.didi.hummer2.HummerScriptContext;
import com.didi.hummer2.adapter.navigator.NavPage;
import com.didi.hummer2.annotationx.Component;
import com.didi.hummer2.annotationx.JsMethod;
import com.didi.hummer2.engine.JSCallback;
import com.didi.hummer2.utils.JsSourceUtil;

/**
 * 页面导航组件
 * <p>
 * Created by XiaoFeng on 2019/4/11.
 */
@Component("Navigator")
public class Navigator {

    @JsMethod("openPage")
    public static void openPage(HummerContext context, NavPage page, JSCallback callback) {
        if (page != null) {
            // 如果是相对路径，转成绝对路径
            page.url = JsSourceUtil.relativePath2AbsolutePath(page.url, ((HummerScriptContext) context).getPageUrl());
            page.sourcePath = JsSourceUtil.relativePath2AbsolutePath(page.url, context.getJsSourcePath());
        }
        ((HummerScriptContext) context).getHummerConfig().getNavAdapter().openPage(context.getBaseContext(), page, data -> {
            if (callback != null) {
                callback.call(data);
                callback.release();
            }
        });
    }

    @JsMethod("popPage")
    public static void popPage(HummerContext context, NavPage page) {
        ((HummerScriptContext) context).getHummerConfig().getNavAdapter().popPage(context.getBaseContext(), page);
    }

    @JsMethod("popToPage")
    public static void popToPage(HummerContext context, NavPage page) {
        ((HummerScriptContext) context).getHummerConfig().getNavAdapter().popToPage(context.getBaseContext(), page);
    }

    @JsMethod("popToRootPage")
    public static void popToRootPage(HummerContext context, NavPage page) {
        ((HummerScriptContext) context).getHummerConfig().getNavAdapter().popToRootPage(context.getBaseContext(), page);
    }

    @JsMethod("popBack")
    public static void popBack(HummerContext context, int count, NavPage page) {
        ((HummerScriptContext) context).getHummerConfig().getNavAdapter().popBack(context.getBaseContext(), count, page);
    }
}
