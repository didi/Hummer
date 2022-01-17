package com.didi.hummer.demo;

import android.content.Context;

import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.delegate.HummerDelegateFragment;
import com.didi.hummer.delegate.IHummerDelegagte;

public class HummerDelegatePageFragment extends HummerDelegateFragment {
    @Override
    protected IHummerDelegagte createHummerDelegate(Context context, NavPage page) {
        return new HummerDelegateImpl(context, page);
    }
}
