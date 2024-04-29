package com.didi.hummer2.render;

import android.view.ViewGroup;

import com.didi.hummer2.HummerRender;
import com.didi.hummer2.HummerScriptContext;
import com.didi.hummer2.lifecycle.IFullLifeCycle;
import com.didi.hummer2.register.HummerObject;
import com.didi.hummer2.register.HummerObjectManager;
import com.didi.hummer2.render.component.view.HMBase;
import com.didi.hummer2.render.event.PageStateEvent;
import com.didi.hummer2.render.event.base.Event;
import com.didi.hummer2.render.style.HummerLayout;

import java.util.List;

/**
 * didi Create on 2024/4/7 .
 * <p>
 * Copyright (c) 2024/4/7 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/7 5:40 PM
 * @Description Hummer视图渲染器
 */

public class HummerViewRender implements HummerRender, IFullLifeCycle {

    private HummerScriptContext hummerScriptContext;
    private HummerLayout rootLayout;
    private HummerLayout mContent;
    private Element rootElement;
    private HummerObjectManager objectManager;

    private boolean isPageCreated = false;
    private boolean isPageStarted = false;
    private boolean isPageForeground = false;

    public HummerViewRender(HummerScriptContext hummerScriptContext, HummerLayout rootLayout, HummerObjectManager objectManager) {
        this.hummerScriptContext = hummerScriptContext;
        this.rootLayout = rootLayout;
        this.objectManager = objectManager;

        mContent = new HummerLayout(hummerScriptContext);
        mContent.getYogaNode().setWidthPercent(100);
        mContent.getYogaNode().setHeightPercent(100);
        rootLayout.addView(mContent);
    }

    @Override
    public void render(ViewGroup rootView) {
        //
    }

    public void renderElement(Element element) {
        this.rootElement = element;
        renderHummerPage();
        isPageCreated = true;
        checkAndDispatchOnStart();
        checkAndDispatchOnResume();
    }


    public boolean canGoBack() {
        //给页面发送页面返回事件
        onPageBack();
        if (rootElement instanceof HummerGoBack) {
            return ((HummerGoBack) rootElement).canGoBack();
        }
        return true;
    }


    private void renderHummerPage() {
        if (rootElement != null) {
            HMBase hmBase = rootElement.getRenderView();
            onPageCreate();
            if (mContent != null) {
                mContent.removeAllViews();
                mContent.addView(hmBase);
            }
        }
    }


    protected void dispatchEvent(Event event) {
        if (rootElement != null) {
            rootElement.directDispatchEvent(event);
        }
    }

    private void onPageCreate() {
        dispatchEvent(PageStateEvent.__onCreate__());
    }

    private void onPageAppear() {
        dispatchEvent(PageStateEvent.__onAppear__());
    }

    private void onPageDisappear() {
        dispatchEvent(PageStateEvent.__onDisappear__());
    }

    private void onPageDestroy() {
        dispatchEvent(PageStateEvent.__onDestroy__());
    }

    private void onPageBack() {
        dispatchEvent(PageStateEvent.__onBack__());
    }

    private void onComponentStart() {
        if (objectManager != null) {
            List<HummerObject> objects = objectManager.getAllObject();
            for (HummerObject hummerObject : objects) {
                if (hummerObject instanceof IFullLifeCycle) {
                    ((IFullLifeCycle) hummerObject).onStart();
                }
            }
        }
    }

    private void onComponentStop() {
        if (objectManager != null) {
            List<HummerObject> objects = objectManager.getAllObject();
            for (HummerObject hummerObject : objects) {
                if (hummerObject instanceof IFullLifeCycle) {
                    ((IFullLifeCycle) hummerObject).onStop();
                }
            }
        }
    }

    private void onComponentResume() {
        if (objectManager != null) {
            List<HummerObject> objects = objectManager.getAllObject();
            for (HummerObject hummerObject : objects) {
                if (hummerObject instanceof IFullLifeCycle) {
                    ((IFullLifeCycle) hummerObject).onResume();
                }
            }
        }
    }

    private void onComponentPause() {
        if (objectManager != null) {
            List<HummerObject> objects = objectManager.getAllObject();
            for (HummerObject hummerObject : objects) {
                if (hummerObject instanceof IFullLifeCycle) {
                    ((IFullLifeCycle) hummerObject).onPause();
                }
            }
        }
    }

    private void onComponentDestroy() {
        if (objectManager != null) {
            List<HummerObject> objects = objectManager.getAllObject();
            for (HummerObject hummerObject : objects) {
                hummerObject.onDestroy();
            }
        }
    }

    /**
     * 保证在页面创建完成后回调
     */
    private void checkAndDispatchOnStart() {
        if (isPageCreated && isPageStarted) {
            onComponentStart();
        }
    }


    /**
     * 保证在页面创建完成后回调
     */
    private void checkAndDispatchOnResume() {
        if (isPageCreated && isPageForeground) {
            onPageAppear();
            onComponentResume();
        }
    }

    @Override
    public void onCreate() {
        //事件在组件或者页面创建时分发
    }

    @Override
    public void onStart() {
        isPageStarted = true;
        //仅支持组件
        checkAndDispatchOnStart();
    }

    @Override
    public void onResume() {
        isPageForeground = true;
        checkAndDispatchOnResume();
    }

    @Override
    public void onPause() {
        isPageForeground = false;
        onComponentPause();
        onPageDisappear();
    }

    @Override
    public void onStop() {
        //仅支持组件
        onComponentStop();
    }

    @Override
    public void onDestroy() {
        onComponentDestroy();
        onPageDestroy();
    }
}
