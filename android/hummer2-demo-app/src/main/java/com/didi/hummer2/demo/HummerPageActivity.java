package com.didi.hummer2.demo;

import android.os.Bundle;
import android.widget.FrameLayout;

import androidx.annotation.Nullable;

import com.didi.hummer2.HummerActivity;
import com.didi.hummer2.adapter.http.HttpCallback;
import com.didi.hummer2.adapter.navigator.NavPage;
import com.didi.hummer2.adapter.navigator.impl.DefaultNavigatorAdapter;
import com.didi.hummer2.utils.NetworkUtil;

/**
 * didi Create on 2023/11/21 .
 * <p>
 * Copyright (c) 2023/11/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/21 3:44 PM
 * @Description 用一句话说明文件功能
 */

public class HummerPageActivity extends HummerActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }


    @Override
    protected void onStart() {
        super.onStart();
    }


    @Override
    protected void onStop() {
        super.onStop();
    }


    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }


    private void requestUrl(String url) {
        NetworkUtil.httpGet(url, (HttpCallback<String>) response -> {
            if (response != null) {
                String js = response.data;
//                hummerFalconContext.evaluateJavaScript(js, "test.js");
            }
        });
    }
//
//    /**
//     * 初始化数据（子类可以重写，初始化自己需要的数据）
//     */
//    protected void initData() {
//        page = getPageInfo();
//        if (page == null) {
//            page = new NavPage();
//        }
//    }
//
//    /**
//     * 获取通过Intent传递过来的PageInfo（子类可以重写，用自己的方式获取PageInfo）
//     */
//    protected NavPage getPageInfo() {
//        NavPage page = null;
//        try {
//            page = (NavPage) getIntent().getSerializableExtra(DefaultNavigatorAdapter.EXTRA_PAGE_MODEL);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return page;
//    }
}

