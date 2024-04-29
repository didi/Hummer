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
import com.didi.hummer2.component.module.NotifyCenterComponent;
import com.didi.hummer2.component.module.hummer.notifycenter.NotifyCenterEvent;
import com.didi.hummer2.register.HummerObject;
import com.didi.hummer2.register.HummerObjectManager;
import com.didi.hummer2.render.HummerViewRender;
import com.didi.hummer2.render.utils.EnvUtil;
import com.didi.hummer2.utils.HMLog;
import com.didi.hummer2.render.style.HummerLayout;
import com.didi.hummer2.utils.HummerObjectUtil;
import com.facebook.soloader.SoLoader;
import com.getkeepsafe.relinker.ReLinker;

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


    public HummerScriptContext(Context context, HummerConfig hummerConfig, ViewGroup rootView) {
        super(context);

        SoLoader.loadLibrary("yoga");
        ReLinker.loadLibrary(context, "hummer2");
        ReLinker.loadLibrary(context, "falcon");

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

        objectManager = new HummerObjectManager(this, hummerConfig.getInvokerRegister());

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
     * @param key
     * @param event
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
        HMLog.d("HummerNative", "HummerContext.onCreate");
        viewRender.onCreate();
    }

    public void onStart() {
        HMLog.d("HummerNative", "HummerContext.onStart");
        viewRender.onStart();
    }


    public void onResume() {
        HMLog.d("HummerNative", "HummerContext.onResume");
        viewRender.onResume();
    }


    public void onPause() {
        HMLog.d("HummerNative", "HummerContext.onPause");
        viewRender.onPause();
    }

    public void onStop() {
        HMLog.d("HummerNative", "HummerContext.onStop");
        viewRender.onStop();
    }


    public void onDestroy() {
        HMLog.d("HummerNative", "HummerContext.onDestroy");
        viewRender.onDestroy();
//        releaseInvokerAnalyzer();
//        NotifyCenter.release(getContext());
//        NotifyCenter.release(mJsContext);
//        releaseJSContext();
//        destroy();
    }


    public boolean onBack() {
        return !viewRender.canGoBack();
    }


    public String getJsPage() {
        return null;
    }

    @NonNull
    @Override
    public Lifecycle getLifecycle() {
        return null;
    }


}
