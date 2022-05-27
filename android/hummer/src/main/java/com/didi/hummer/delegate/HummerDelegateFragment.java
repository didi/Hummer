package com.didi.hummer.delegate;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.adapter.navigator.impl.DefaultNavigatorAdapter;

/**
 * 默认Hummer页面
 * 使用代理方式加载 简化代码
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
        mDelegate = createHummerDelegate(getPageInfo());
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

    /**
     * 创建Delegate
     * @param page
     * @return
     */
    protected IHummerDelegagte createHummerDelegate(NavPage page) {
        // 子类可重写
        return new HummerDelegateAdapter(this, page);
    }

    /**
     * 获取通过Intent传递过来的PageInfo（子类可以重写，用自己的方式获取PageInfo）
     */
    protected NavPage getPageInfo() {
        if (getArguments() == null) {
            return null;
        }
        return (NavPage) getArguments().getSerializable(DefaultNavigatorAdapter.EXTRA_PAGE_MODEL);
    }

    public boolean onBackPressed() {
        if (mDelegate != null) {
            return mDelegate.onBackPressed();
        }
        return false;
    }
}
