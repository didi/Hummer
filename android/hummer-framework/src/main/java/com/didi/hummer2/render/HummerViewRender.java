package com.didi.hummer2.render;


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

public class HummerViewRender implements IFullLifeCycle {

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


    public void renderElement(Element element) {
        this.rootElement = element;
        renderHummerPage();
        isPageCreated = true;
        checkAndDispatchOnStart();
        checkAndDispatchOnResume();
    }


    public void onBackPressed() {
        //给页面发送页面返回事件
        onPageBack();
    }

    public boolean canGoBack() {
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
        hummerScriptContext.dispatchEvent(PageStateEvent.PAGE_ON_CREATE);
    }

    private void onPageAppear() {
        hummerScriptContext.dispatchEvent(PageStateEvent.PAGE_ON_APPEAR);
    }

    private void onPageDisappear() {
        hummerScriptContext.dispatchEvent(PageStateEvent.PAGE_ON_DISAPPEAR);
    }

    private void onPageDestroy() {
//        hummerScriptContext.dispatchEvent(PageStateEvent.PAGE_ON_DESTROY);
    }

    private void onPageBack() {
        hummerScriptContext.dispatchEvent(PageStateEvent.PAGE_ON_BACK);
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
