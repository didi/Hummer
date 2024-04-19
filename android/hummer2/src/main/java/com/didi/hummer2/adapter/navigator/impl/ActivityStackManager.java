package com.didi.hummer2.adapter.navigator.impl;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;
import android.text.TextUtils;


import com.didi.hummer2.utils.HMLog;
import com.didi.hummer2.utils.DebugUtil;

import java.util.Stack;

/**
 * Activity堆栈管理类
 *
 * Created by XiaoFeng on 2019-11-13.
 */
public class ActivityStackManager implements Application.ActivityLifecycleCallbacks {

    private Stack<Activity> stack;
    private volatile int resumeCounter = 0;

    private static class Instance {
        public static ActivityStackManager INSTANCE = new ActivityStackManager();
    }

    private ActivityStackManager() {
        stack = new Stack<>();
    }

    public static ActivityStackManager getInstance() {
        return Instance.INSTANCE;
    }

    public void register(Application app) {
        app.registerActivityLifecycleCallbacks(this);
    }

    public void unRegister(Application app) {
        app.unregisterActivityLifecycleCallbacks(this);
    }

    private void addActivity(Activity activity) {
        stack.push(activity);
    }

    private void removeActivity(Activity activity) {
        if (!stack.isEmpty()) {
            stack.remove(activity);
        }
    }

    public Activity getTopActivity() {
        if (!stack.isEmpty()) {
            return stack.peek();
        }
        return null;
    }

    public void finishTopActivity() {
        if (stack.size() > 0) {
            stack.peek().finish();
        }
    }

    public void finishActivity(String pageId) {
        Activity activity = getActivity(pageId);
        if (activity != null) {
            activity.finish();
        }
    }

    public Activity getActivity(String pageId) {
        if (TextUtils.isEmpty(pageId)) {
            return null;
        }

        for (int i = stack.size() - 1; i >= 0; i--) {
            Activity activity = stack.get(i);
            String activityPageId = getPageIdFromActivity(activity);
            if (pageId.equals(activityPageId)) {
                return activity;
            }
        }
        return null;
    }

    /**
     * 销毁pageId所对应的Activity之上的所有activity
     */
    public void popToActivity(String pageId, boolean animated) {
        if (TextUtils.isEmpty(pageId)) {
            return;
        }

        int count = 0;
        boolean matched = false;
        for (int i = stack.size() - 1; i >= 0; i--) {
            Activity activity = stack.get(i);
            String activityPageId = getPageIdFromActivity(activity);
            if (pageId.equals(activityPageId)) {
                matched = true;
                break;
            }
            count++;
        }

        if (matched) {
            for (int i = 0; i < count; i++) {
                if (!stack.isEmpty()) {
                    Activity activity = stack.pop();
                    if (activity != null) {
                        activity.finish();
                    }

                    // 无动画
                    if (!animated) {
                        if (activity != null) {
                            activity.overridePendingTransition(0, 0);
                        }
                    }
                }
            }
        }
    }

    /**
     * 销毁除了RootActivity之外的所有activity
     */
    public void popToRootActivity(boolean animated) {
        while (stack.size() > 1) {
            Activity activity = stack.pop();
            if (activity != null) {
                activity.finish();
            }

            // 无动画
            if (!animated) {
                if (activity != null) {
                    activity.overridePendingTransition(0, 0);
                }
            }
        }
    }

    /**
     * 向前回退指定数量的页面
     */
    public void popBack(int count, boolean animated) {
        if (count < 1) {
            count = 1;
        }
        if (count > stack.size()) {
            count = stack.size();
        }

        for (int i = 0; i < count; i++) {
            Activity activity = stack.pop();
            if (activity != null) {
                activity.finish();
            }

            // 无动画
            if (!animated) {
                if (activity != null) {
                    activity.overridePendingTransition(0, 0);
                }
            }
        }
    }

    /**
     * 销毁所有activity
     */
    public void finishAllActivity() {
        while (!stack.empty()) {
            stack.pop().finish();
        }
    }

    /**
     * 判断应用是否在后台
     */
    public boolean isBackgroundRunning() {
        return resumeCounter == 0;
    }

    private String getPageIdFromActivity(Activity activity) {
        if (activity == null) {
            return null;
        }
        String pageId = null;
        if (activity.getIntent() != null) {
            try {
                pageId = activity.getIntent().getStringExtra(DefaultNavigatorAdapter.EXTRA_PAGE_ID);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if (pageId == null) {
            pageId = activity.toString();
        }
        return pageId;
    }

    private void printActivityStack(Stack<Activity> stack) {
        HMLog.d("HummerNative", "----------- stack start -----------");
        for (int i = stack.size() - 1; i >= 0; i--) {
            Activity activity = stack.get(i);
            String activityPageId = getPageIdFromActivity(activity);
            HMLog.d("HummerNative", "|\t" + activity + " -> " + activityPageId);
        }
        HMLog.d("HummerNative", "----------- stack end -----------");
    }

    @Override
    public void onActivityCreated(Activity activity, Bundle savedInstanceState) {
        addActivity(activity);

        if (DebugUtil.isDebuggable()) {
            printActivityStack(stack);
        }
    }

    @Override
    public void onActivityStarted(Activity activity) {

    }

    @Override
    public void onActivityResumed(Activity activity) {
        resumeCounter++;
    }

    @Override
    public void onActivityPaused(Activity activity) {
        resumeCounter--;
    }

    @Override
    public void onActivityStopped(Activity activity) {

    }

    @Override
    public void onActivitySaveInstanceState(Activity activity, Bundle outState) {

    }

    @Override
    public void onActivityDestroyed(Activity activity) {
        removeActivity(activity);

        if (DebugUtil.isDebuggable()) {
            printActivityStack(stack);
        }
    }
}
