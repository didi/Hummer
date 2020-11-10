package com.didi.hummer;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.adapter.navigator.impl.DefaultNavigatorAdapter;
import com.didi.hummer.component.input.FocusUtil;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.devtools.DevToolsConfig;
import com.didi.hummer.render.style.HummerLayout;

/**
 * 默认Hummer页面
 *
 * Created by XiaoFeng on 2019-12-27.
 */
public class HummerFragment extends Fragment {

    protected Context context;

    protected NavPage page;

    protected HummerLayout hmContainer;
    protected HummerRender hmRender;

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        this.context = context;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 这是兜底的初始化，万一业务方没有及时做初始化，可以有一个兜底的
        HummerSDK.init(context);

        initData();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        initView();

        if (page != null && !TextUtils.isEmpty(page.url)) {
            initHummer();
            renderHummer();
        } else {
            String errMsg = "page url is empty";
            onPageRenderFailed(new RuntimeException(errMsg));
            Toast.makeText(context, errMsg, Toast.LENGTH_SHORT).show();
        }

        return hmContainer;
    }

    @Override
    public void onResume() {
        super.onResume();
        if (hmRender != null) {
            hmRender.onResume();
        }
    }

    @Override
    public void onPause() {
        super.onPause();
        if (hmRender != null) {
            hmRender.onPause();
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (hmRender != null) {
            hmRender.onDestroy();
        }
    }

    public boolean onBackPressed() {
        if (hmRender != null && hmRender.onBack()) {
            return true;
        }
        return false;
    }

    /**
     * 初始化数据（子类可以重写，初始化自己需要的数据）
     */
    protected void initData() {
        page = getPageInfo();
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

    /**
     * 初始化视图（子类可以重写，构造自己的视图）
     */
    protected void initView() {
        hmContainer = new HummerLayout(context);
        hmContainer.setOnTouchListener((v, event) -> {
            // 手指按下时，如果有键盘已弹出，则把键盘消失掉
            if (event.getAction() == MotionEvent.ACTION_DOWN) {
                FocusUtil.clearFocus(context);
            }
            return false;
        });
    }

    /**
     * 初始化Hummer上下文，即JS运行环境
     */
    protected void initHummer() {
        hmRender = new HummerRender(hmContainer, getNamespace(), getDevToolsConfig());
        initHummerRegister(hmRender.getHummerContext());
        hmRender.setJsPageInfo(page);
    }

    /**
     * 获取Hummer命名空间，用于隔离适配器（子类可以重写，设置自己的命名空间）
     *
     * @return
     */
    protected String getNamespace() {
        return HummerSDK.NAMESPACE_DEFAULT;
    }

    /**
     * 向Hummer上下文注册Hummer组件和回调（子类可以重写，注册自己导出的Hummer组件和回调）
     *
     * @param context
     */
    protected void initHummerRegister(HummerContext context) {
        // 子类按需实现，初始化自己的HummerRegister
    }

    /**
     * 获取开发者工具配置信息（子类可以重写，设置自己的配置信息）
     *
     * @return
     */
    protected DevToolsConfig getDevToolsConfig() {
        // 子类按需实现，设置自己的配置信息
        return null;
    }

    /**
     * 渲染Hummer页面
     */
    protected void renderHummer() {
        if (page.isHttpUrl()) {
            hmRender.renderWithUrl(page.url, new HummerRender.HummerRenderCallback() {
                @Override
                public void onSucceed(HummerContext hmContext, JSValue jsPage) {
                    onPageRenderSucceed(hmContext, jsPage);
                }

                @Override
                public void onFailed(Exception e) {
                    onPageRenderFailed(e);
                }
            });
        } else if (page.url.startsWith("/")) {
            hmRender.renderWithFile(page.url);
        } else {
            hmRender.renderWithAssets(page.url);
        }
    }

    /**
     * 页面渲染成功（子类可以重写，获取页面JS对象做相应的处理）
     *
     * @param hmContext Hummer上下文
     * @param jsPage 页面对应的JS对象（null表示渲染失败）
     */
    protected void onPageRenderSucceed(@NonNull HummerContext hmContext, @NonNull JSValue jsPage) {
        // 子类按需实现
    }

    /**
     * 页面渲染失败（子类可以重写，获取页面渲染时的异常做相应处理）
     *
     * @param e 执行js过程中抛出的异常
     */
    protected void onPageRenderFailed(@NonNull Exception e) {
        // 子类按需实现
    }
}
