package com.didi.hummer.delegate;

import android.arch.lifecycle.Lifecycle;
import android.arch.lifecycle.OnLifecycleEvent;
import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.Toast;

import com.didi.hummer.HummerRender;
import com.didi.hummer.HummerSDK;
import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.devtools.DevToolsConfig;
import com.didi.hummer.render.style.HummerLayout;

/**
 * Hummer页面渲染代理模板类
 *
 * Created by Xingjm on 2022-01-17.
 */
public abstract class AbsHummerDelegate implements IHummerDelegagte {
    protected Context context;
    protected NavPage page;

    protected HummerRender hmRender;

    public AbsHummerDelegate(FragmentActivity activity, NavPage data) {
        if (activity == null) {
            throw new RuntimeException("activity must not be null!");
        }
        activity.getLifecycle().addObserver(this);
        init(activity, data);
    }

    public AbsHummerDelegate(Fragment fragment, NavPage data) {
        if (fragment == null) {
            throw new RuntimeException("fragment must not be null!");
        }
        fragment.getLifecycle().addObserver(this);
        init(fragment.getContext(), data);
    }

    private void init(Context context, NavPage data) {
        if (context == null) {
            throw new RuntimeException("context must not be null!");
        }
        this.context = context;
        initData(data);
    }

    @Override
    public final void initSDK() {
        HummerSDK.init(context);
    }

    @Override
    public final View initViewAndRender() {
        View view = initView();
        if (page != null && !TextUtils.isEmpty(page.url)) {
            initHummer();
            renderHummer();
        } else {
            String errMsg = "page url is empty";
            onPageRenderFailed(new RuntimeException(errMsg));
            Toast.makeText(context, errMsg, Toast.LENGTH_SHORT).show();
        }
        return view;
    }

    /**
     * 初始化数据（子类可以重写，初始化自己需要的数据）
     */
    protected void initData(NavPage data) {
        page = data;
    }

    /**
     * 初始化Hummer上下文，即JS运行环境
     */
    protected void initHummer() {
        hmRender = new HummerRender(getHummerLayout(), getNamespace(), getDevToolsConfig());
        initHummerRegister(hmRender.getHummerContext());
        hmRender.setJsPageInfo(page);
        hmRender.setRenderCallback(new HummerRender.HummerRenderCallback() {
            @Override
            public void onSucceed(HummerContext hmContext, JSValue jsPage) {
                onPageRenderSucceed(hmContext, jsPage);
            }

            @Override
            public void onFailed(Exception e) {
                onPageRenderFailed(e);
            }
        });
    }

    /**
     * 渲染Hummer页面
     */
    protected void renderHummer() {
        if (page.isHttpUrl()) {
            hmRender.renderWithUrl(page.url);
        } else if (page.url.startsWith("/")) {
            hmRender.renderWithFile(page.url);
        } else {
            hmRender.renderWithAssets(page.url);
        }
    }

    @Override
    public boolean onBackPressed() {
        return hmRender != null && hmRender.onBack();
    }

    @Override
    public Intent getJsPageResultIntent() {
        return hmRender.getJsPageResultIntent();
    }

    /**
     * 初始化视图（子类可以重写，构造自己的视图）
     */
    protected abstract View initView();
    /**
     * 获取HummerLayout组件
     * @return
     */
    protected abstract HummerLayout getHummerLayout();
    /**
     * 获取Hummer命名空间，用于隔离适配器（子类可以重写，设置自己的命名空间）
     *
     * @return
     */
    protected abstract String getNamespace();
    /**
     * 向Hummer上下文注册Hummer组件和回调（子类可以重写，注册自己导出的Hummer组件和回调）
     *
     * @param context
     */
    protected abstract void initHummerRegister(HummerContext context);
    /**
     * 获取开发者工具配置信息（子类可以重写，设置自己的配置信息）
     *
     * @return
     */
    protected abstract DevToolsConfig getDevToolsConfig();
    /**
     * 页面渲染成功（子类可以重写，获取页面JS对象做相应的处理）
     *
     * @param hmContext Hummer上下文
     * @param jsPage 页面对应的JS对象（null表示渲染失败）
     */
    protected abstract void onPageRenderSucceed(@NonNull HummerContext hmContext, @NonNull JSValue jsPage);
    /**
     * 页面渲染失败（子类可以重写，获取页面渲染时的异常做相应处理）
     *
     * @param e 执行js过程中抛出的异常
     */
    protected abstract void onPageRenderFailed(@NonNull Exception e);

    /********************* 生命周期 *******************/
    @OnLifecycleEvent(Lifecycle.Event.ON_START)
    public void onStart() {
        if (hmRender != null) {
            hmRender.onStart();
        }
    }
    @OnLifecycleEvent(Lifecycle.Event.ON_RESUME)
    public void onResume() {
        if (hmRender != null) {
            hmRender.onResume();
        }
    }
    @OnLifecycleEvent(Lifecycle.Event.ON_PAUSE)
    public void onPause() {
        if (hmRender != null) {
            hmRender.onPause();
        }
    }
    @OnLifecycleEvent(Lifecycle.Event.ON_STOP)
    public void onStop() {
        if (hmRender != null) {
            hmRender.onStop();
        }
    }
    @OnLifecycleEvent(Lifecycle.Event.ON_DESTROY)
    public void onDestroy() {
        if (hmRender != null) {
            hmRender.onDestroy();
        }
        hmRender = null;
    }
}
