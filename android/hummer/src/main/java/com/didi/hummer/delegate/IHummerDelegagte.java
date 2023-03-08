package com.didi.hummer.delegate;

import android.content.Intent;
import android.view.View;

import androidx.lifecycle.LifecycleObserver;

import com.didi.hummer.HummerDebugger;
import com.didi.hummer.adapter.tracker.ITrackerAdapter;
import com.didi.hummer.core.util.DebugUtil;

/**
 * Hummer页面渲染代理接口类
 *
 * Created by Xingjm on 2022-01-17.
 */
public interface IHummerDelegagte extends LifecycleObserver {
    void initSDK();
    View initViewAndRender();
    boolean onBackPressed();
    Intent getJsPageResultIntent();
}
