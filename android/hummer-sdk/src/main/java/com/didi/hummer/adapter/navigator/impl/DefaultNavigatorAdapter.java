package com.didi.hummer.adapter.navigator.impl;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.adapter.navigator.INavigatorAdapter;
import com.didi.hummer.adapter.navigator.NavCallback;
import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.adapter.navigator.impl.router.ActivityLauncher;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * 默认页面导航适配器
 *
 * Created by XiaoFeng on 2019-12-24.
 */
public class DefaultNavigatorAdapter implements INavigatorAdapter {

    public static final String EXTRA_PAGE_ID = "PAGE_ID";
    public static final String EXTRA_PAGE_MODEL = "PAGE_MODEL";

    public static final String SCHEME_HUMMER = "hummer";
    public static final String SCHEME_HTTP = "http";
    public static final String SCHEME_HTTPS = "https";

    protected IntentCreator intentCreator;

    public DefaultNavigatorAdapter() {
        this(null);
    }

    public DefaultNavigatorAdapter(IntentCreator intentCreator) {
        this.intentCreator = intentCreator;
        if (this.intentCreator == null) {
            this.intentCreator = new DefaultIntentCreator();
        }
    }

    @Override
    public void openPage(Context context, NavPage page, NavCallback callback) {
        if (context == null) {
            context = HummerSDK.appContext;
        }

        goToPage(context, page, callback);
    }

    @Override
    public void popPage(Context context, NavPage page) {
        Activity popActivity = null;
        if (page != null && !TextUtils.isEmpty(page.id)) {
            popActivity = ActivityStackManager.getInstance().getActivity(page.id);
        } else if (context instanceof Activity) {
            popActivity = (Activity) context;
        }

        if (popActivity == null) {
            return;
        }

        popActivity.finish();

        // 无动画
        if (page != null && !page.animated) {
            popActivity.overridePendingTransition(0, 0);
        }
    }

    @Override
    public void popToPage(Context context, NavPage page) {
        if (page == null) {
            return;
        }
        ActivityStackManager.getInstance().popToActivity(page.id, page.animated);
    }

    @Override
    public void popToRootPage(Context context, NavPage page) {
        boolean animated = page == null || page.animated;
        ActivityStackManager.getInstance().popToRootActivity(animated);
    }

    @Override
    public void popBack(Context context, int count, NavPage page) {
        if (count == 1) {
            popPage(context, page);
        } else {
            boolean animated = page == null || page.animated;
            ActivityStackManager.getInstance().popBack(count, animated);
        }
    }

    protected void goToPage(Context context, NavPage page, NavCallback callback) {
        if (context == null || page == null || TextUtils.isEmpty(page.url)) {
            return;
        }

        String scheme = page.getScheme();
        if (!TextUtils.isEmpty(scheme)) {
            scheme = scheme.toLowerCase();
            switch (scheme) {
                case SCHEME_HUMMER:
                    openHummerPage(context, page, callback);
                    break;
                case SCHEME_HTTP:
                case SCHEME_HTTPS:
                    if (page.isJsUrl()) {
                        openHummerPage(context, page, callback);
                    } else {
                        openWebPage(context, page, callback);
                    }
                    break;
                default:
                    if (page.isJsUrl()) {
                        openHummerPage(context, page, callback);
                    } else {
                        openCustomPage(context, page, callback);
                    }
                    break;
            }
        } else if (page.isJsUrl()) {
            openHummerPage(context, page, callback);
        }
    }

    protected void openHummerPage(Context context, NavPage page, NavCallback callback) {
        Intent intent = intentCreator.createHummerIntent(context, page);
        openPage(context, intent, page, callback);
    }

    protected void openWebPage(Context context, NavPage page, NavCallback callback) {
        Intent intent = intentCreator.createWebIntent(context, page);
        openPage(context, intent, page, callback);
    }

    protected void openCustomPage(Context context, NavPage page, NavCallback callback) {
        Intent intent = intentCreator.createCustomIntent(context, page);
        openPage(context, intent, page, callback);
    }

    protected void openPage(Context context, Intent intent, NavPage page, NavCallback callback) {
        if (intent == null) {
            return;
        }

        if (context instanceof Application) {
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        }

        if (page.closeSelf) {
            // 如果需要关闭自身，直接启动Activity，不接收回调
            context.startActivity(intent);
        } else {
            // 如果不关闭自身，启动Activity时需要接收回调
            ActivityLauncher.init(context).startActivityForResult(intent, (resultCode, data) -> {
                Map<String, Object> result = transIntentData(data);
                if (callback != null && result != null) {
                    callback.onResult(result);
                }
            });
        }

        // 启动Activity无动画
        if (!page.animated && context instanceof Activity) {
            ((Activity) context).overridePendingTransition(0,0);
        }

        // 关闭自身页面
        if (page.closeSelf && context instanceof Activity) {
            ((Activity) context).finish();
        }
    }

    protected Map<String, Object> transIntentData(Intent intent) {
        Map<String, Object> data = null;
        try {
            if (intent != null && intent.getExtras() != null) {
                Bundle bundle = intent.getExtras();
                data = new HashMap<>();
                Set<String> keys = bundle.keySet();
                for (String key : keys) {
                    Object value = bundle.get(key);
                    if (value != null) {
                        data.put(key, value);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return data;
    }
}
