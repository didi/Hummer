package com.didi.hummer2;

import android.content.Context;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.lifecycle.Lifecycle;
import androidx.lifecycle.LifecycleObserver;
import androidx.lifecycle.LifecycleOwner;

import com.didi.hummer2.adapter.navigator.NavPage;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.render.Element;
import com.didi.hummer2.module.NotifyCenterComponent;
import com.didi.hummer2.module.component.notifycenter.NotifyCenterEvent;
import com.didi.hummer2.register.HummerObject;
import com.didi.hummer2.register.HummerObjectManager;
import com.didi.hummer2.render.HummerViewRender;
import com.didi.hummer2.render.event.PageStateEvent;
import com.didi.hummer2.render.utils.EnvUtil;
import com.didi.hummer2.utils.HMLog;
import com.didi.hummer2.render.style.HummerLayout;
import com.didi.hummer2.utils.HummerObjectUtil;

import java.util.Map;

/**
 * didi Create on 2024/3/29 .
 * <p>
 * Copyright (c) 2024/3/29 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/29 5:02 PM
 * @Description 用一句话说明文件功能
 */

public class HummerScriptContext extends HummerContext implements LifecycleOwner, LifecycleObserver {


    /**
     * 加入生命周期的各种判断，是为了适应网络加载情况下的异步执行JS
     */

    protected HummerConfig hummerConfig;

    protected HummerLayout container;

    protected HummerViewRender viewRender;
    protected HummerObjectManager objectManager;

    protected NotifyCenterComponent notifyCenterComponent;

    protected NavPage navPage;
    protected HummerPageHandler hummerPageHandler;


    public HummerScriptContext(Context context, HummerConfig hummerConfig, ViewGroup rootView) {
        super(context);
        setHummerConfig(hummerConfig, rootView);
        init();
    }


    public void setHummerConfig(HummerConfig hummerConfig, ViewGroup rootView) {
        this.hummerConfig = hummerConfig;
        this.container = (HummerLayout) rootView;

        setNamespace(hummerConfig.getNamespace());
        setLogHandler(hummerConfig.getLogHandler());
        setJsConsoleHandler(hummerConfig.getJsConsoleHandler());
        setJsExceptionHandler(hummerConfig.getJsExceptionHandler());
        setEventTraceHandler(hummerConfig.getEventTraceHandler());

        objectManager = new HummerObjectManager(this, hummerConfig.getInvokerRegister().newInvokerRegister());

        viewRender = new HummerViewRender(this, (HummerLayout) rootView, objectManager);

        /**
         * 更新Invoker注册信息
         */
        setInvokerRegister(objectManager);
    }


    public void renderElement(Element element) {
        viewRender.renderElement(element);
    }

    @Override
    public HummerObject searchObject(long objId) {
        return objectManager.searchObject(objId);
    }

    public HummerConfig getHummerConfig() {
        return hummerConfig;
    }


    public HummerLayout getContainer() {
        return container;
    }

    public void setNotifyCenterComponent(NotifyCenterComponent notifyCenterComponent) {
        this.notifyCenterComponent = notifyCenterComponent;
    }

    /**
     * 分发自身的NotifyCenter消息
     *
     * @param key   事件名称
     * @param event 事件
     */
    public void triggerSelfEvent(String key, NotifyCenterEvent event) {
        if (notifyCenterComponent != null) {
            notifyCenterComponent.dispatchEvent(event.newEvent());
        }
    }


    /**
     * 全局分发NotifyCenter消息
     *
     * @param key
     * @param event
     */
    public void triggerEvent(String key, NotifyCenterEvent event) {
        if (notifyCenterComponent != null) {
            notifyCenterComponent.triggerEvent(key, event);
        }
    }


    public Object getHummerEnv() {
        return EnvUtil.getHummerEnv(this);
    }

    public Object getPageInfo() {
        if (navPage != null) {
            return navPage.toJsiValue();
        }
        return null;
    }

    private JsiValue pageResult = null;

    public void setPageResult(JsiValue jsiValue) {
        pageResult = jsiValue;
    }

    public Map<String, Object> getPageResult() {
        if (pageResult != null) {
            return HummerObjectUtil.toJavaMap(pageResult);
        }
        return null;
    }

    public void onHotReload(String url) {

    }

    public void setNavPage(NavPage navPage) {
        this.navPage = navPage;
    }

    public void onCreate() {
        HMLog.d("HummerNative", "HummerContext.onCreate()");
        viewRender.onCreate();
    }

    public void onStart() {
        HMLog.d("HummerNative", "HummerContext.onStart()");
        viewRender.onStart();
    }


    public void onResume() {
        HMLog.d("HummerNative", "HummerContext.onResume()");
        viewRender.onResume();
    }


    public void onPause() {
        HMLog.d("HummerNative", "HummerContext.onPause()");
        viewRender.onPause();
    }

    public void onStop() {
        HMLog.d("HummerNative", "HummerContext.onStop()");
        viewRender.onStop();
    }


    /**
     * 销毁页面延后
     * <p>
     * 页面销毁的时候不可理解销毁页面，需要等待hummer逻辑执行完毕后回调 {@link #onPageDestroy() }进行页面真实销毁
     */
    public void onDestroy() {
        HMLog.d("HummerNative", "HummerContext.onDestroy()");
        dispatchEvent(PageStateEvent.PAGE_ON_DESTROY);
    }

    @Override
    public void onPageCreate() {
        HMLog.d("HummerNative", "HummerContext.onPageCreate()");
        super.onPageCreate();
    }

    @Override
    public void onPageAppear() {
        HMLog.d("HummerNative", "HummerContext.onPageAppear()");
        super.onPageAppear();
    }

    @Override
    public void onPageDisappear() {
        HMLog.d("HummerNative", "HummerContext.onPageDisappear()");
        super.onPageDisappear();
    }

    /**
     * 真实的释放全部页面资源
     * 仅仅让页面销毁等待Hummer逻辑执行完毕后才开始销毁，其他页面事件正常直接处理
     */
    @Override
    public void onPageDestroy() {
        HMLog.d("HummerNative", "HummerContext.onPageDestroy()");
        super.onPageDestroy();
        viewRender.onDestroy();
        //释放引擎
        Hummer.getHummerEngine().destroyHummerContext(this);
        destroy();
    }

    @Override
    public void onPageBack() {
        HMLog.d("HummerNative", "HummerContext.onPageBack()");
        super.onPageBack();
        boolean canGoBack = viewRender.canGoBack();
        if (canGoBack && hummerPageHandler != null) {
            hummerPageHandler.finishPage();
        }
    }

    /**
     * 返回事件全部直接拦截，等待onBack事件执行完毕后回调{@link  #onPageBack()}，再根据页面参数：canGoBack 决定是否需要关闭页面
     */
    public boolean onBackPressed() {
        HMLog.d("HummerNative", "HummerContext.onBackPressed()");
        viewRender.onBackPressed();
        return true;
    }


    public String getJsPage() {
        return null;
    }

    @NonNull
    @Override
    public Lifecycle getLifecycle() {
        return null;
    }


    public void setHummerPageHandler(HummerPageHandler hummerPageHandler) {
        this.hummerPageHandler = hummerPageHandler;
    }

    public interface HummerPageHandler {
        void finishPage();
    }


}
