package com.didi.hummer.adapter.navigator.impl;

import android.content.Context;
import android.content.Intent;

import com.didi.hummer.adapter.navigator.NavPage;

/**
 * Created by XiaoFeng on 2019-11-18.
 */
public interface IntentCreator {

    Intent createHummerIntent(Context context, NavPage page);

    Intent createWebIntent(Context context, NavPage page);

    Intent createCustomIntent(Context context, NavPage page);
}
