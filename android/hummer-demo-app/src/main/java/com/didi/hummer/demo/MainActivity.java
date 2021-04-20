package com.didi.hummer.demo;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;

import com.didi.hummer.adapter.http.HttpCallback;
import com.didi.hummer.adapter.http.HttpResponse;
import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.adapter.navigator.impl.DefaultNavigatorAdapter;
import com.didi.hummer.utils.NetworkUtil;
import com.google.gson.reflect.TypeToken;

import java.util.Collections;
import java.util.List;

public class MainActivity extends Activity {

    private ScrollView mScrollView;
    private LinearLayout mRootView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mScrollView = new ScrollView(this);
        setContentView(mScrollView);

        mRootView = new LinearLayout(this);
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        mRootView.setLayoutParams(lp);
        mRootView.setOrientation(LinearLayout.VERTICAL);
        mScrollView.addView(mRootView);

        loadScripts();
    }

    private void loadScripts() {
        NetworkUtil.httpGet(Constant.HOST + "fileList", (HttpCallback<HttpResponse<List<String>>>) response -> {
            if (response.error != null && response.error.code != 0) {
                return;
            }
            if (response.data == null || response.data.data == null) {
                return;
            }
            List<String> list = response.data.data;
            Collections.sort(list);
            for (String filename : list) {
                Button b = new Button(MainActivity.this);
                b.setText(filename);
                b.setOnClickListener(v -> {
                    Intent i = new Intent(MainActivity.this, HummerSinglePageActivity.class);
                    i.putExtra(DefaultNavigatorAdapter.EXTRA_PAGE_MODEL, new NavPage(Constant.HOST + filename));
                    startActivity(i);
                });
                b.setAllCaps(false);
                mRootView.addView(b);
            }
        }, new TypeToken<HttpResponse<List<String>>>(){}.getType());
    }
}
