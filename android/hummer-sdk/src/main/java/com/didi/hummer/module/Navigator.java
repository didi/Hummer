package com.didi.hummer.module;

import com.didi.hummer.adapter.HummerAdapter;
import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.utils.JsSourceUtil;

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
            page.url = JsSourceUtil.relativePath2AbsolutePath(page.url, context.getPageUrl());
            page.sourcePath = JsSourceUtil.relativePath2AbsolutePath(page.url, context.getJsSourcePath());
        }
        HummerAdapter.getNavigatorAdapter(context.getNamespace()).openPage(context.getBaseContext(), page, data -> {
            if (callback != null) {
                callback.call(data);
                callback.release();
            }
        });
    }

    @JsMethod("popPage")
    public static void popPage(HummerContext context, NavPage page) {
        HummerAdapter.getNavigatorAdapter(context.getNamespace()).popPage(context.getBaseContext(), page);
    }

    @JsMethod("popToPage")
    public static void popToPage(HummerContext context, NavPage page) {
        HummerAdapter.getNavigatorAdapter(context.getNamespace()).popToPage(context.getBaseContext(), page);
    }

    @JsMethod("popToRootPage")
    public static void popToRootPage(HummerContext context, NavPage page) {
        HummerAdapter.getNavigatorAdapter(context.getNamespace()).popToRootPage(context.getBaseContext(), page);
    }

    @JsMethod("popBack")
    public static void popBack(HummerContext context, int count, NavPage page) {
        HummerAdapter.getNavigatorAdapter(context.getNamespace()).popBack(context.getBaseContext(), count, page);
    }
}
