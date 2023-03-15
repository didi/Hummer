package com.didi.hummer.delegate;

import android.view.MotionEvent;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.component.input.FocusUtil;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.devtools.DevToolsConfig;
import com.didi.hummer.render.style.HummerLayout;


/**
 * Hummer页面渲染实现类
 * <p>
 * Created by Xingjm on 2022-01-17.
 */
public class HummerDelegateAdapter extends AbsHummerDelegate {

    protected HummerLayout hmContainer;

    public HummerDelegateAdapter(FragmentActivity activity, NavPage page) {
        super(activity, page);
    }

    public HummerDelegateAdapter(Fragment fragment, NavPage page) {
        super(fragment, page);
    }

    @Override
    protected View initView() {
        hmContainer = new HummerLayout(context);
        hmContainer.setOnTouchListener((v, event) -> {
            // 手指按下时，如果有键盘已弹出，则把键盘消失掉
            if (event.getAction() == MotionEvent.ACTION_DOWN) {
                FocusUtil.clearFocus(context);
            }
            return false;
        });
        return hmContainer;
    }

    @Override
    protected HummerLayout getHummerLayout() {
        return hmContainer;
    }

    /**
     * 获取Hummer命名空间，用于隔离适配器（子类可以重写，设置自己的命名空间）
     *
     * @return
     */
    @Override
    protected String getNamespace() {
        return HummerSDK.NAMESPACE_DEFAULT;
    }

    /**
     * 向Hummer上下文注册Hummer组件和回调（子类可以重写，注册自己导出的Hummer组件和回调）
     *
     * @param context
     */
    @Override
    protected void initHummerRegister(HummerContext context) {

    }

    /**
     * 获取开发者工具配置信息（子类可以重写，设置自己的配置信息）
     *
     * @return
     */
    @Override
    protected DevToolsConfig getDevToolsConfig() {
        // 子类按需实现，设置自己的配置信息
        return null;
    }

    /**
     * 页面渲染成功（子类可以重写，获取页面JS对象做相应的处理）
     *
     * @param hmContext Hummer上下文
     * @param jsPage    页面对应的JS对象（null表示渲染失败）
     */
    @Override
    protected void onPageRenderSucceed(@NonNull HummerContext hmContext, @NonNull JSValue jsPage) {
        // 子类按需实现
    }

    /**
     * 页面渲染失败（子类可以重写，获取页面渲染时的异常做相应处理）
     *
     * @param e 执行js过程中抛出的异常
     */
    @Override
    protected void onPageRenderFailed(@NonNull Exception e) {
        // 子类按需实现
    }
}
