package com.didi.hummer.demo;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;

import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.adapter.navigator.impl.DefaultNavigatorAdapter;

/**
 * Created by XiaoFeng on 2020-01-02.
 */
public class MyHummerFragmentActivity extends FragmentActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_fragment);

        NavPage page = (NavPage) getIntent().getSerializableExtra(DefaultNavigatorAdapter.EXTRA_PAGE_MODEL);
        loadFragment(MyHummerFragment.newInstance(page), R.id.fragment_container, "fragment_hummer");
    }

    private void loadFragment(Fragment fragment, int fragmentContainerId, String tag) {
        FragmentManager fm = getSupportFragmentManager();
        FragmentTransaction transaction = fm.beginTransaction();
        transaction.replace(fragmentContainerId, fragment, tag);
        transaction.commitAllowingStateLoss();
    }

}
