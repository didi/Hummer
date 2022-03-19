package com.didi.hummer.delegate;

import android.app.Activity;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.adapter.navigator.impl.DefaultNavigatorAdapter;

/**
 * 默认Hummer页面
 * 使用代理方式加载 简化代码
 *
 * Created by Xingjm on 2021-01-17.
 */
public class HummerDelegateActivity extends AppCompatActivity {

    private IHummerDelegagte mDelegate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mDelegate = createHummerDelegate(getPageInfo());
        if (mDelegate == null) {
            throw new RuntimeException("Delegate cannot be null");
        }
        // 这是兜底的初始化，万一业务方没有及时做初始化，可以有一个兜底的
        mDelegate.initSDK();
        View view = mDelegate.initViewAndRender();
        setContentView(view);
    }

    @Override
    public void onBackPressed() {
        if (mDelegate.onBackPressed()) {
            return;
        }
        super.onBackPressed();
    }

    @Override
    public void finish() {
        setPageResult();
        super.finish();
    }

    protected void setPageResult() {
        setResult(Activity.RESULT_OK, mDelegate.getJsPageResultIntent());
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
        NavPage page = null;
        try {
            page = (NavPage) getIntent().getSerializableExtra(DefaultNavigatorAdapter.EXTRA_PAGE_MODEL);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return page;
    }
}
