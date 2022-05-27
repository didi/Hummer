package com.didi.hummer.demo;

import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.delegate.HummerDelegateFragment;
import com.didi.hummer.delegate.IHummerDelegagte;

/**
 * 使用代理类的单个页面
 */
public class HummerDelegatePageFragment extends HummerDelegateFragment {
    @Override
    protected IHummerDelegagte createHummerDelegate(NavPage page) {
        return new HummerDelegateImpl(this, page);
    }
}
