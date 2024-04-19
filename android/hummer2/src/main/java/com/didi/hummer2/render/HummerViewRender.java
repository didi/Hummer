package com.didi.hummer2.render;

import android.graphics.Color;
import android.view.ViewGroup;

import com.didi.hummer2.HummerRender;
import com.didi.hummer2.HummerScriptContext;
import com.didi.hummer2.component.Element;
import com.didi.hummer2.lifecycle.IFullLifeCycle;
import com.didi.hummer2.render.component.view.HMBase;
import com.didi.hummer2.render.style.HummerLayout;

/**
 * didi Create on 2024/4/7 .
 * <p>
 * Copyright (c) 2024/4/7 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/7 5:40 PM
 * @Description 用一句话说明文件功能
 */

public class HummerViewRender implements HummerRender, IFullLifeCycle {


    private HummerScriptContext hummerScriptContext;
    private HummerLayout rootLayout;
    private HummerLayout mContent;
    private Element rootElement;

    public HummerViewRender(HummerScriptContext hummerScriptContext, HummerLayout rootLayout) {
        this.rootLayout = rootLayout;

        mContent = new HummerLayout(hummerScriptContext);
        mContent.getYogaNode().setWidthPercent(100);
        mContent.getYogaNode().setHeightPercent(100);
        rootLayout.addView(mContent);
    }

    public void renderElement(Element element) {
        this.rootElement = element;
        renderHummerPage();
    }

    private void renderHummerPage() {
        if (rootElement != null) {
            HMBase hmBase = rootElement.getRenderView();
            onPageCreate();
            if (mContent != null) {
                mContent.removeAllViews();
                mContent.addView(hmBase);
            }
            startIfNeed();
            resumeIfNeed();
        }
    }


    private void onPageCreate() {
//        if (mJsPage != null) {
//            mJsPage.callFunction("onCreate");
//        }
    }

    private void onPageAppear() {
//        if (mJsPage != null) {
//            mJsPage.callFunction("onCreate");
//        }
    }

    private void startIfNeed() {
//        if (isJsCreated && isStarted && mJsPage != null) {
//            mComponentPool.onStart();
//        }
    }

    private void resumeIfNeed() {
//        if (isJsCreated && isResumed && mJsPage != null) {
//            mComponentPool.onResume();
//            mJsPage.callFunction("onAppear");
//        }
    }

    private void onPageDisappear() {
//        if (mJsPage != null) {
//            mJsPage.callFunction("onDisappear");
//        }
//        mComponentPool.onPause();
    }

    private void stop() {
//        mComponentPool.onStop();
    }

    private void onPageDestroy() {
//        if (mJsPage != null) {
//            mJsPage.callFunction("onDestroy");
//        }
//        mComponentPool.onDestroy();
    }

    @Override
    public void render(ViewGroup rootView) {
        //
    }

    @Override
    public void onStart() {

    }

    @Override
    public void onResume() {

    }

    @Override
    public void onPause() {

    }

    @Override
    public void onStop() {

    }

    @Override
    public void onCreate() {

    }

    @Override
    public void onDestroy() {

    }
}
