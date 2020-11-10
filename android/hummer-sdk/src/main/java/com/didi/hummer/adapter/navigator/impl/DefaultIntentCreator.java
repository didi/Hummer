package com.didi.hummer.adapter.navigator.impl;

import android.content.Context;
import android.content.Intent;

import com.didi.hummer.adapter.navigator.NavPage;

/**
 * Created by XiaoFeng on 2019-11-18.
 */
public class DefaultIntentCreator implements IntentCreator {

    public Intent appendBaseIntentParams(Intent intent, NavPage page) {
        intent.putExtra(DefaultNavigatorAdapter.EXTRA_PAGE_ID, page.id);
        intent.putExtra(DefaultNavigatorAdapter.EXTRA_PAGE_MODEL, page);
        return intent;
    }

    @Override
    public Intent createHummerIntent(Context context, NavPage page) {
        Intent intent = new Intent();
        intent.setClassName(context, "com.didi.hummer.HummerActivity");
        appendBaseIntentParams(intent, page);
        return intent;
    }

    @Override
    public Intent createWebIntent(Context context, NavPage page) {
        return null;
    }

    @Override
    public Intent createCustomIntent(Context context, NavPage page) {
        return null;
    }
}
