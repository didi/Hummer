package com.didi.hummer2.component.module;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.HummerScriptContext;
import com.didi.hummer2.adapter.navigator.NavPage;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.bridge.JsiFunction;
import com.didi.hummer2.component.Component;
import com.didi.hummer2.utils.F4NObjectUtil;
import com.didi.hummer2.utils.JsSourceUtil;


/**
 * didi Create on 2024/4/10 .
 * <p>
 * Copyright (c) 2024/4/10 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/10 3:40 PM
 * @Description Navigator
 */

@HMComponent("Navigator")
public class NavigatorComponent extends Component {

    public NavigatorComponent(HummerContext hummerContext) {
        super(hummerContext);
    }

    @HMMethod("openPage")
    public static void openPage(HummerContext context, NavPage page, JsiFunction callback) {
        if (page != null) {
            // 如果是相对路径，转成绝对路径
            page.url = JsSourceUtil.relativePath2AbsolutePath(page.url, ((HummerScriptContext) context).getPageUrl());
            page.sourcePath = JsSourceUtil.relativePath2AbsolutePath(page.url, context.getJsSourcePath());
        }
        ((HummerScriptContext) context).getHummerConfig().getNavAdapter().openPage(context.getBaseContext(), page, data -> {
            if (callback != null) {
                callback.call(F4NObjectUtil.toJsiValue(data));
            }
        });
    }

    @HMMethod("popPage")
    public static void popPage(HummerContext context, NavPage page) {
        ((HummerScriptContext) context).getHummerConfig().getNavAdapter().popPage(context.getBaseContext(), page);
    }

    @HMMethod("popToPage")
    public static void popToPage(HummerContext context, NavPage page) {
        ((HummerScriptContext) context).getHummerConfig().getNavAdapter().popToPage(context.getBaseContext(), page);
    }

    @HMMethod("popToRootPage")
    public static void popToRootPage(HummerContext context, NavPage page) {
        ((HummerScriptContext) context).getHummerConfig().getNavAdapter().popToRootPage(context.getBaseContext(), page);
    }

    @HMMethod("popBack")
    public static void popBack(HummerContext context, int count, NavPage page) {
        ((HummerScriptContext) context).getHummerConfig().getNavAdapter().popBack(context.getBaseContext(), count, page);
    }
}
