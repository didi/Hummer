package com.didi.hummer.demo;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.adapter.navigator.impl.DefaultNavigatorAdapter;

/**
 * Hummer单页面示例
 *
 * Created by XiaoFeng on 2020-01-02.
 */
public class HummerSinglePageFragmentActivity extends FragmentActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_hummer_single_page_fragment);

        NavPage page = null;
        try {
            page = (NavPage) getIntent().getSerializableExtra(DefaultNavigatorAdapter.EXTRA_PAGE_MODEL);
        } catch (Exception e) {
            e.printStackTrace();
        }
        loadFragment(HummerSinglePageFragment.newInstance(page), R.id.fragment_container, "fragment_hummer");
    }

    private void loadFragment(Fragment fragment, int fragmentContainerId, String tag) {
        FragmentManager fm = getSupportFragmentManager();
        FragmentTransaction transaction = fm.beginTransaction();
        transaction.replace(fragmentContainerId, fragment, tag);
        transaction.commitAllowingStateLoss();
    }

}
