package com.didi.hummer.delegate;

import android.content.Intent;
import android.view.View;

/**
 * Hummer页面渲染代理接口类
 *
 * Created by Xingjm on 2022-01-17.
 */
public interface IHummerDelegagte {
    void initSDK();
    View initViewAndRender();
    boolean onBackPressed();
    Intent getJsPageResultIntent();
}
