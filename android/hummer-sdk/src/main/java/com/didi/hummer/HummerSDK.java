package com.didi.hummer;

import android.app.Application;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.support.annotation.IntDef;
import android.text.TextUtils;
import android.widget.Toast;

import com.didi.hummer.adapter.navigator.impl.ActivityStackManager;
import com.didi.hummer.context.HummerContextFactory;
import com.didi.hummer.context.napi.NAPIHummerContext;
import com.didi.hummer.core.engine.jsc.jni.HummerException;
import com.didi.hummer.core.engine.napi.jni.JSException;
import com.didi.hummer.core.exception.ExceptionCallback;
import com.didi.hummer.core.util.DebugUtil;
import com.didi.hummer.plugin.interfaze.IHermesDebugger;
import com.didi.hummer.plugin.interfaze.IV8Debugger;
import com.didi.hummer.tools.EventTracer;
import com.didi.hummer.tools.JSLogger;
import com.didi.hummer.utils.blankj.Utils;
import com.facebook.soloader.SoLoader;
import com.getkeepsafe.relinker.ReLinker;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by XiaoFeng on 2019-11-05.
 */
public class HummerSDK {

    @IntDef
    public @interface JsEngine {
        int JSC         = 1;
        int QUICK_JS    = 2;
        int V8          = 3;
        int HERMES      = 4;
        int NAPI_QJS    = 5;
        int NAPI_HERMES = 6;
    }

    /**
     * 默认Hummer命名空间
     */
    public static final String NAMESPACE_DEFAULT = "_HUMMER_SDK_NAMESPACE_DEFAULT_";

    public static Context appContext;

    private static @HummerSDK.JsEngine int jsEngine = JsEngine.QUICK_JS;

    private static volatile boolean isInited;

    private static Map<String, HummerConfig> configs = new HashMap<>();

    private static IV8Debugger v8Debugger;
    private static IHermesDebugger hermesDebugger;

    public static boolean isSupport(Context context, @JsEngine int engine) {
        return loadJSEngine(context, engine);
    }

    public static void setJsEngine(@JsEngine int jsEngine) {
        HummerSDK.jsEngine = jsEngine;
    }

    public static int getJsEngine() {
        return jsEngine;
    }

    public static void init(Context context) {
        init(context, null);
    }

    public static void init(Context context, HummerConfig config) {
        if (!isInited) {
            appContext = context.getApplicationContext();
            parseAppDebuggable(appContext);
            Utils.init((Application) appContext);
            ActivityStackManager.getInstance().register((Application) appContext);

            loadYogaEngine();
            loadJSEngine(appContext, jsEngine);

            if (jsEngine == JsEngine.NAPI_QJS || jsEngine == JsEngine.NAPI_HERMES) {
                JSException.init();
                HummerContextFactory.setHummerContextCreator(NAPIHummerContext::new);
            } else {
                HummerException.init();
            }
            isInited = true;
        }
        addHummerConfig(config);

        EventTracer.traceEvent(config != null ? config.getNamespace() : null, EventTracer.EventName.SDK_INIT);
    }

    public static void release() {
        ActivityStackManager.getInstance().unRegister((Application) appContext);
        configs.clear();
        isInited = false;
    }

    public static void initV8Debugger(IV8Debugger debugger) {
        if (v8Debugger == null) {
            v8Debugger = debugger;
        }
    }

    public static IV8Debugger getV8Debugger() {
        return v8Debugger;
    }

    public static void initHermesDebugger(IHermesDebugger debugger) {
        if (hermesDebugger == null) {
            setJsEngine(HummerSDK.JsEngine.HERMES);
            hermesDebugger = debugger;
        }
    }

    public static IHermesDebugger getHermesDebugger() {
        return hermesDebugger;
    }

    private static void addHummerConfig(HummerConfig config) {
        if (config != null) {
            String namespace = config.getNamespace();
            // 如果configs中不存在namespace对应的config，或者存在一个sdk默认设置的config，那么可以覆盖掉
            HummerConfig c = configs.get(namespace);
            if (c == null || TextUtils.isEmpty(c.getNamespace())) {
                configs.put(namespace, config);
            } else {
                if (DebugUtil.isDebuggable()) {
                    Toast.makeText(appContext, "There is already a duplicate namespace: " + namespace, Toast.LENGTH_SHORT).show();
                }
            }
        }
        if (!configs.containsKey(NAMESPACE_DEFAULT)) {
            // 如果没有默认namespace，就提供一个默认的config，并把namespace设置为null，用来标示这个是默认添加的，后面可以被覆盖掉
            configs.put(NAMESPACE_DEFAULT, new HummerConfig.Builder().setNamespace(null).builder());
        }
    }

    public static HummerConfig getHummerConfig(String namespace) {
        if (TextUtils.isEmpty(namespace) || !configs.containsKey(namespace)) {
            namespace = NAMESPACE_DEFAULT;
        }
        if (!configs.containsKey(NAMESPACE_DEFAULT)) {
            // 如果没有默认namespace，就提供一个默认的config，并把namespace设置为null，用来标示这个是默认添加的，后面可以被覆盖掉
            configs.put(NAMESPACE_DEFAULT, new HummerConfig.Builder().setNamespace(null).builder());
        }
        return configs.get(namespace);
    }

    private static void loadYogaEngine() {
        try {
            SoLoader.init(appContext, false);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static boolean loadJSEngine(Context context, @JsEngine int engine) {
        try {
            switch (engine) {
                case JsEngine.JSC:
                    ReLinker.loadLibrary(context, "hummer-jsc");
                    break;
                case JsEngine.HERMES:
                    ReLinker.loadLibrary(context, "hummer-hermes");
                    break;
                case JsEngine.NAPI_QJS:
                case JsEngine.NAPI_HERMES:
                    ReLinker.loadLibrary(context, "hummer-napi");
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

    private static void parseAppDebuggable(Context context) {
        try {
            boolean isAppDebuggable = context.getApplicationInfo() != null && (context.getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
            DebugUtil.setDebuggable(isAppDebuggable);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static JSLogger.Logger getJSLogger(String namespace) {
        return getHummerConfig(namespace).getJsLogger();
    }

    public static EventTracer.Trace getEventTracer(String namespace) {
        return getHummerConfig(namespace).getEventTracer();
    }

    public static ExceptionCallback getException(String namespace) {
        return getHummerConfig(namespace).getExceptionCallback();
    }

    public static boolean isSupportRTL(String namespace) {
        return getHummerConfig(namespace).isSupportRTL();
    }

    public static String getFontsAssetsPath(String namespace) {
        return getHummerConfig(namespace).getFontsAssetsPath();
    }
}
