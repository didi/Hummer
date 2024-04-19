package com.didi.hummer2;

import android.content.Context;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.lifecycle.Lifecycle;
import androidx.lifecycle.LifecycleObserver;
import androidx.lifecycle.LifecycleOwner;

import com.didi.hummer2.component.Element;
import com.didi.hummer2.register.HummerObject;
import com.didi.hummer2.register.HummerObjectManager;
import com.didi.hummer2.render.HummerViewRender;
import com.didi.hummer2.utils.HMLog;
import com.didi.hummer2.render.style.HummerLayout;
import com.facebook.soloader.SoLoader;
import com.getkeepsafe.relinker.ReLinker;

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
    protected boolean isJsCreated;
    protected boolean isStarted;
    protected boolean isResumed;

    protected HummerConfig hummerConfig;

    protected String pageUrl = "";

    protected HummerLayout container;

    protected HummerViewRender viewRender;
    protected HummerObjectManager objectManager;


    public HummerScriptContext(Context context, HummerConfig hummerConfig, ViewGroup rootView) {
        super(context);

        SoLoader.loadLibrary("yoga");
//        ReLinker.loadLibrary(getApplication(), "yoga");
        ReLinker.loadLibrary(context, "hummer2");
        ReLinker.loadLibrary(context, "falcon");

        container = (HummerLayout) rootView;
        viewRender = new HummerViewRender(this, (HummerLayout) rootView);
        setHummerConfig(hummerConfig);
        init();
    }


    public void setHummerConfig(HummerConfig hummerConfig) {
        this.hummerConfig = hummerConfig;


        setNamespace(hummerConfig.getNamespace());
        setLogHandler(hummerConfig.getLogHandler());
        setJsConsoleHandler(hummerConfig.getJsConsoleHandler());
        setJsExceptionHandler(hummerConfig.getJsExceptionHandler());
        setEventTraceHandler(hummerConfig.getEventTraceHandler());


        objectManager = new HummerObjectManager(this, hummerConfig.getInvokerRegister());

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

    public String getPageUrl() {
        return pageUrl;
    }

    public void setPageUrl(String pageUrl) {
        this.pageUrl = pageUrl;
    }

    public void onCreate() {
        HMLog.d("HummerNative", "HummerContext.onCreate");
    }

    public void onStart() {
        HMLog.d("HummerNative", "HummerContext.onStart");
        isStarted = true;
//        startIfNeed();
    }

    public void onResume() {
        HMLog.d("HummerNative", "HummerContext.onResume");
        isResumed = true;
//        resumeIfNeed();
    }

    public void onPause() {
        HMLog.d("HummerNative", "HummerContext.onPause");
        isResumed = false;
//        pause();
    }

    public void onStop() {
        HMLog.d("HummerNative", "HummerContext.onStop");
        isStarted = false;
//        stop();
    }

    public void onDestroy() {
        HMLog.d("HummerNative", "HummerContext.onDestroy");
//        releaseInvokerAnalyzer();
//        destroy();
//        NotifyCenter.release(getContext());
//        NotifyCenter.release(mJsContext);
//        releaseJSContext();
    }

    public void setJsSourcePath(String sourcePath) {

    }

    public boolean onBack() {
        return false;
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
