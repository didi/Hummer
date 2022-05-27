package com.didi.hummer.demo;

import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.delegate.HummerDelegateActivity;
import com.didi.hummer.delegate.IHummerDelegagte;

/**
 * 使用代理类的单个页面
 */
public class HummerDelegatePageActivity extends HummerDelegateActivity {
    @Override
    protected IHummerDelegagte createHummerDelegate(NavPage page) {
        return new HummerDelegateImpl(this, page);
    }
}
