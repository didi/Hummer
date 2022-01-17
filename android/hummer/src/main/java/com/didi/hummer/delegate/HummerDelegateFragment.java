package com.didi.hummer.delegate;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.adapter.navigator.impl.DefaultNavigatorAdapter;

/**
 * 默认Hummer页面使用代理方式加载
 * 简化代码
 *
 * Created by Xingjm on 2022-01-17.
 */
public class HummerDelegateFragment extends Fragment {

    private IHummerDelegagte mDelegate;

    public static HummerDelegateFragment newInstance(@NonNull NavPage page) {
        HummerDelegateFragment fragment = new HummerDelegateFragment();
        Bundle args = new Bundle();
        args.putSerializable(DefaultNavigatorAdapter.EXTRA_PAGE_MODEL, page);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mDelegate = createHummerDelegate(getContext(), getArguments());
        if (mDelegate == null) {
            throw new RuntimeException("Delegate cannot be null");
        }
        // 这是兜底的初始化，万一业务方没有及时做初始化，可以有一个兜底的
        mDelegate.initSDK();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return mDelegate.initViewAndRender();
    }

    public boolean onBackPressed() {
        return mDelegate.onBackPressed();
    }

    /**
     * 创建Delegate
     * @param context
     * @param bundle
     * @return
     */
    private IHummerDelegagte createHummerDelegate(Context context, Bundle bundle) {
        // 子类可重写
        return new HummerDelegateAdapter(context, bundle);
    }
}
