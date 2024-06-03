package com.didi.hummer2;


import static com.didi.hummer2.tools.JsEngine.FALCON_HERMES;
import static com.didi.hummer2.tools.JsEngine.NAPI_HERMES;

import android.app.Application;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.text.TextUtils;
import android.view.ViewGroup;


import com.didi.hummer2.adapter.navigator.impl.ActivityStackManager;
import com.didi.hummer2.module.component.notifycenter.OnNotifyCenterEventListener;
import com.didi.hummer2.tools.HummerGlobal;
import com.didi.hummer2.tools.JsEngine;
import com.didi.hummer2.module.component.notifycenter.NotifyCenterEvent;
import com.didi.hummer2.render.utils.EnvUtil;
import com.didi.hummer2.utils.F4NDebugUtil;
import com.didi.hummer2.utils.HMLog;
import com.facebook.soloader.SoLoader;
import com.getkeepsafe.relinker.ReLinker;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * didi Create on 2024/3/21 .
 * <p>
 * Copyright (c) 2024/3/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/21 5:14 PM
 * @Description 用一句话说明文件功能
 */

public class HummerEngine {


    private final Map<String, HummerNameSpace> hummerNameSpaceMap;
    private final List<OnNotifyCenterEventListener> notifyCenterEventListeners;

    private boolean isInit = false;
    private Context appContext;

    public HummerEngine() {
        hummerNameSpaceMap = new HashMap<>();
        notifyCenterEventListeners = new ArrayList<>();
    }


    public void initHummer(Context appContext) {
        if (isInit) {
            return;
        }
        this.appContext = appContext;
        parseAppDebuggable(appContext);
//        Utils.init((Application) appContext);
        ActivityStackManager.getInstance().register((Application) appContext);

        loadYogaEngine();
        loadJSEngine(appContext, JsEngine.FALCON_HERMES);

        EnvUtil.initHummerEnv(appContext);

        isInit = true;
    }


    private void parseAppDebuggable(Context context) {
        try {
            boolean isAppDebuggable = context.getApplicationInfo() != null && (context.getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
            F4NDebugUtil.setDebuggable(isAppDebuggable);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    private void loadYogaEngine() {
        try {
            SoLoader.init(appContext, false);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private boolean loadJSEngine(Context context, @JsEngine int engine) {
        try {
            switch (engine) {
                case JsEngine.JSC:
                    ReLinker.loadLibrary(context, "hummer-jsc");
                    break;
                case JsEngine.HERMES:
                    ReLinker.loadLibrary(context, "hummer-hermes");
                    break;
                case JsEngine.NAPI_QJS:
                case NAPI_HERMES:
                    if (HummerGlobal.getHermesDebugger() != null) {
                        ReLinker.loadLibrary(context, "hummer-napi-debugger");
                    } else {
                        ReLinker.loadLibrary(context, "hummer-napi");
                    }
                    break;
                case FALCON_HERMES:
                    ReLinker.loadLibrary(context, "hummer2");
                    ReLinker.loadLibrary(context, "falcon");
                    break;
                case JsEngine.QUICK_JS:
                default:
                    ReLinker.loadLibrary(context, "hummer-qjs");
                    break;
            }
            return true;
        } catch (Throwable e) {
            e.printStackTrace();
            return false;
        }
    }


    public void registerHummerConfig(HummerConfig hummerConfig) {
        String namespace = hummerConfig.getNamespace();
        HummerNameSpace hummerNameSpace = new HummerNameSpace(namespace, hummerConfig);
        hummerNameSpaceMap.put(namespace, hummerNameSpace);
    }


    public void triggerEvent(String namespace, String key, NotifyCenterEvent event) {
        dispatchTriggerEvent(namespace, key, event);
    }

    /**
     * 发布全局事件通知，不回触发监听
     *
     * @param namespace 命名空间，区分业务线
     * @param key       事件名称
     * @param event     事件消息
     */
    public void publishTriggerEvent(String namespace, String key, NotifyCenterEvent event) {
        HummerNameSpace nameSpace = hummerNameSpaceMap.get(namespace);
        if (nameSpace != null) {
            nameSpace.triggerEvent(key, event);
        }
    }


    private void dispatchTriggerEvent(String namespace, String key, NotifyCenterEvent event) {
        //对内通知事件
        publishTriggerEvent(namespace, key, event);
        //对外通知事件
        for (OnNotifyCenterEventListener eventListener : notifyCenterEventListeners) {
            eventListener.onReceiveNotifyCenterEvent(namespace, key, event);
        }
    }


    public void addOnNotifyCenterEventListener(OnNotifyCenterEventListener eventListener) {
        if (eventListener != null) {
            if (!notifyCenterEventListeners.contains(eventListener)) {
                notifyCenterEventListeners.add(eventListener);
            }
        }
    }

    public void removeOnNotifyCenterEventListener(OnNotifyCenterEventListener eventListener) {
        if (eventListener != null) {
            notifyCenterEventListeners.remove(eventListener);
        }
    }

    public void removeAllOnNotifyCenterEventListener() {
        notifyCenterEventListeners.clear();
    }


    /**
     * 创建HummerContext
     *
     * @param namespace
     * @param context
     * @param rootView
     * @return 可能为空
     */
    public HummerScriptContext createHummerContext(String namespace, Context context, ViewGroup rootView) {
        HummerNameSpace nameSpace = searchHummerNameSpace(namespace);
        if (nameSpace == null) {
            return null;
        }
        HummerScriptContext nativeContext = new HummerScriptContext(context, nameSpace.getHummerConfig(), rootView);
        nameSpace.addHummerContext(nativeContext);
        return nativeContext;
    }


    public void destroyHummerContext(HummerScriptContext hummerScriptContext) {
        String namespace = hummerScriptContext.getNamespace();
        HummerNameSpace hummerNameSpace = hummerNameSpaceMap.get(namespace);
        if (hummerNameSpace != null) {
            hummerNameSpace.removeHummerContext(hummerScriptContext);
        }
    }

    private void registerHummerNameSpace(HummerNameSpace hummerNameSpace) {
        if (hummerNameSpace != null) {
            HummerNameSpace space = hummerNameSpaceMap.get(hummerNameSpace.getNamespace());
            if (space == null) {
                hummerNameSpaceMap.put(hummerNameSpace.getNamespace(), hummerNameSpace);
            } else {
                HMLog.w("HummerNative", "当前命名空间已经初始化，请先不要重复初始化配置，重复无效。 namespace=" + hummerNameSpace.getNamespace());
            }
        }
    }


    /**
     * 查找命名空间
     * 1、如果namespace 是空或者是默认值，则在未初始化的情况下自动初始化
     * 2、如果不是默认或者空，则返回null，并输出日志
     */
    private HummerNameSpace searchHummerNameSpace(String namespace) {
        HummerNameSpace hummerNameSpace = null;
        if (TextUtils.isEmpty(namespace) || TextUtils.equals(namespace, Hummer.NAMESPACE_DEFAULT)) {
            namespace = Hummer.NAMESPACE_DEFAULT;
            hummerNameSpace = hummerNameSpaceMap.get(namespace);
            if (hummerNameSpace == null) {
                HummerConfig hummerConfig = new HummerConfig.Builder(null).build();
                hummerNameSpace = new HummerNameSpace(namespace, hummerConfig);
                registerHummerNameSpace(hummerNameSpace);
            }
        } else {
            hummerNameSpace = hummerNameSpaceMap.get(namespace);
            if (hummerNameSpace == null) {
                HMLog.w("HummerNative", "当前命名空间并未初始化，请先初始化再使用。 namespace=" + namespace);
            }
        }
        return hummerNameSpace;
    }


    public HummerConfig getDefaultConfig() {
        HummerNameSpace hummerNameSpace = searchHummerNameSpace(Hummer.NAMESPACE_DEFAULT);
        if (hummerNameSpace != null) {
            return hummerNameSpace.getHummerConfig();
        }
        return null;
    }


    public HummerConfig getHummerConfig(String namespace) {
        HummerNameSpace hummerNameSpace = searchHummerNameSpace(namespace);
        if (hummerNameSpace != null) {
            return hummerNameSpace.getHummerConfig();
        }
        return null;
    }


    public void release(String namespace) {
        releaseByNamespace(namespace);
    }

    public void releaseAll() {
        Iterator<HummerNameSpace> iterator = hummerNameSpaceMap.values().iterator();
        while (iterator.hasNext()) {
            HummerNameSpace hummerNameSpace = iterator.next();
            releaseHummerNameSpace(hummerNameSpace);
        }
        hummerNameSpaceMap.clear();
    }

    private void releaseByNamespace(String namespace) {
        if (TextUtils.isEmpty(namespace)) {
            HMLog.w("HummerNative", "HummerEngine.release(namespace) namespace is empty.");
            return;
        }
        HummerNameSpace hummerNameSpace = hummerNameSpaceMap.remove(namespace);
        if (hummerNameSpace != null) {
            releaseHummerNameSpace(hummerNameSpace);
        }
    }

    private void releaseHummerNameSpace(HummerNameSpace hummerNameSpace) {
        //暂时不清理资源，只去掉引用
    }


}
