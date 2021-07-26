package com.didi.hummer.context;

import android.content.Context;
import android.content.ContextWrapper;
import android.os.Build;
import android.support.annotation.NonNull;
import android.text.TextUtils;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.engine.base.ICallback;
import com.didi.hummer.core.util.DebugUtil;
import com.didi.hummer.core.util.HMGsonUtil;
import com.didi.hummer.core.util.HMLog;
import com.didi.hummer.module.notifycenter.NotifyCenter;
import com.didi.hummer.module.notifycenter.NotifyCenterInvoker;
import com.didi.hummer.pool.ComponentPool;
import com.didi.hummer.pool.ObjectPool;
import com.didi.hummer.register.HummerRegister$$hummer_sdk;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.component.view.Invoker;
import com.didi.hummer.render.style.HummerLayout;
import com.didi.hummer.render.utility.DPUtil;
import com.didi.hummer.tools.EventTracer;
import com.didi.hummer.utils.AppUtils;
import com.didi.hummer.utils.AssetsUtil;
import com.didi.hummer.utils.BarUtils;
import com.didi.hummer.utils.ScreenUtils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;


public class HummerContext extends ContextWrapper {

    private static final String HUMMER_DEFINITION_FILE = "HummerDefinition.js";
    private static final String HUMMER_DEFINITION_ES5_FILE = "HummerDefinition_es5.js";

    private static final String HUMMER_OBJECT_PREFIX = "-_-_-_hummer-object_-_-_-";
    private static final String HUMMER_ARRAY_PREFIX = "-_-_-_hummer-array_-_-_-";

    private static final String ENV_KEY_PLATFORM = "platform";
    private static final String ENV_KEY_OS_VERSION = "osVersion";
    private static final String ENV_KEY_APP_VERSION = "appVersion";
    private static final String ENV_KEY_APP_NAME = "appName";
    private static final String ENV_KEY_STATUS_BAR_HEIGHT = "statusBarHeight";
    private static final String ENV_KEY_SAFE_AREA_BOTTOM = "safeAreaBottom";
    private static final String ENV_KEY_DEVICE_WIDTH = "deviceWidth";
    private static final String ENV_KEY_DEVICE_HEIGHT = "deviceHeight";
    private static final String ENV_KEY_AVAILABLE_WIDTH = "availableWidth";
    private static final String ENV_KEY_AVAILABLE_HEIGHT = "availableHeight";
    private static final String ENV_KEY_SCALE = "scale";
    private static final String ENV_KEY_NAMESPACE = "namespace";

    /**
     * 命名空间（用于隔离不同业务线）
     */
    protected String namespace;

    protected HummerLayout mContainer;
    protected HummerLayout mContent;
    protected ComponentPool mComponentPool = new ComponentPool();
    protected JSContext mJsContext;
    protected JSValue mJsPage;

    /**
     * js文件源路径
     */
    protected String jsSourcePath = "";

    /**
     * 加入生命周期的各种判断，是为了适应网络加载情况下的异步执行JS
     */
    protected boolean isJsCreated;
    protected boolean isStarted;
    protected boolean isResumed;

    protected HashMap<String, Invoker> mRegistry = new HashMap<>();
    protected HashMap<String, ICallback> mNativeCallbacks = new HashMap<>();

    protected Pattern pattern = Pattern.compile("function *_classCallCheck *\\( *\\w+ *, *\\w+ *\\) *\\{");
    protected Pattern pattern2 = Pattern.compile("\\s");

    protected HummerContext(@NonNull HummerLayout container) {
        this(container, null);
    }

    protected HummerContext(@NonNull HummerLayout container, String namespace) {
        super(container.getContext());
        HMLog.d("HummerNative", "HummerContext.new");
        this.namespace = namespace;
        this.mContainer = container;
        this.mContent = new HummerLayout(this);
        this.mContent.getYogaNode().setWidthPercent(100);
        this.mContent.getYogaNode().setHeightPercent(100);
        mContainer.addView(mContent);
    }

    public String getNamespace() {
        return namespace;
    }

    protected void onCreate() {
        HMLog.d("HummerNative", "HummerContext.onCreate");

        registerInvoker(new HummerInvoker());
        registerInvoker(new NotifyCenterInvoker());

        if (HummerSDK.getJsEngine() == HummerSDK.JsEngine.HERMES
                || HummerSDK.getJsEngine() == HummerSDK.JsEngine.NAPI_HERMES) {
            // 注入babel
            mJsContext.evaluateJavaScript("var Babel = {}");
            mJsContext.evaluateJavaScript(AssetsUtil.readFile("babel.js"), "babel.js");
            mJsContext.evaluateJavaScript(AssetsUtil.readFile(HUMMER_DEFINITION_ES5_FILE), "HummerDefinition.js");
        } else {
            mJsContext.evaluateJavaScript(AssetsUtil.readFile(HUMMER_DEFINITION_FILE), "HummerDefinition.js");
        }
        mJsContext.evaluateJavaScript("__IS_DEBUG__ = " + DebugUtil.isDebuggable());

        initEnvironmentVariables();

        HummerRegister$$hummer_sdk.init(this);
    }

    public void onStart() {
        HMLog.d("HummerNative", "HummerContext.onStart");
        isStarted = true;
        startIfNeed();
    }

    public void onResume() {
        HMLog.d("HummerNative", "HummerContext.onResume");
        isResumed = true;
        resumeIfNeed();
    }

    public void onPause() {
        HMLog.d("HummerNative", "HummerContext.onPause");
        isResumed = false;
        pause();
    }

    public void onStop() {
        HMLog.d("HummerNative", "HummerContext.onStop");
        isStarted = false;
        stop();
    }

    public void onDestroy() {
        HMLog.d("HummerNative", "HummerContext.onDestroy");
        destroy();
        NotifyCenter.release(mJsContext);
        releaseJSContext();
    }

    public boolean onBack() {
        return back();
    }

    /**
     * 用于调式的时候刷新用
     *
     * @return
     */
    public void onRefresh() {
        stop();
        pause();
        destroy();
        NotifyCenter.release(mJsContext);
    }

    protected void releaseJSContext() {
        HMLog.d("HummerNative", "HummerContext.releaseJSContext");
        mJsContext.release();
    }

    public void render(HMBase base) {
        if (base != null) {
            mJsPage = base.getJSValue();
            mJsPage.protect();
            create();

            if (mContent != null) {
                mContent.removeAllViews();
                mContent.addView(base);
            }

            startIfNeed();
            resumeIfNeed();
        }
    }

    public HummerLayout getContainer() {
        return mContainer;
    }

    public JSValue getJsPage() {
        return mJsPage;
    }

    public Context getContext() {
        return this.getBaseContext();
    }

    public JSContext getJsContext() {
        return mJsContext;
    }

    public ObjectPool getObjectPool() {
        return mComponentPool;
    }

    public String getJsSourcePath() {
        return jsSourcePath;
    }

    public void setJsSourcePath(String jsSourcePath) {
        this.jsSourcePath = jsSourcePath;
    }

    private void create() {
        isJsCreated = true;
        if (mJsPage != null) {
            mJsPage.callFunction("onCreate");
        }
    }

    private void startIfNeed() {
        if (isJsCreated && isStarted && mJsPage != null) {
            mComponentPool.onStart();
        }
    }

    private void resumeIfNeed() {
        if (isJsCreated && isResumed && mJsPage != null) {
            mComponentPool.onResume();
            mJsPage.callFunction("onAppear");
        }
    }

    private void pause() {
        if (mJsPage != null) {
            mJsPage.callFunction("onDisappear");
        }
        mComponentPool.onPause();
    }

    private void stop() {
        mComponentPool.onStop();
    }

    private void destroy() {
        if (mJsPage != null) {
            mJsPage.callFunction("onDestroy");
        }
        mComponentPool.onDestroy();
    }

    private boolean back() {
        if (mJsPage != null) {
            Object ret = mJsPage.callFunction("onBack");
            if (ret instanceof Boolean) {
                return (boolean) ret;
            }
        }
        return false;
    }

    public Object evaluateJavaScript(String script) {
        return evaluateJavaScript(script, "");
    }

    public Object evaluateJavaScript(String script, String scriptId) {
        if (HummerSDK.getJsEngine() == HummerSDK.JsEngine.HERMES
                || HummerSDK.getJsEngine() == HummerSDK.JsEngine.NAPI_HERMES) {
            script = babelTransformCode(script, scriptId);
        }
        return mJsContext.evaluateJavaScript(script, scriptId);
    }

    private String babelTransformCode(String script, String scriptId) {
        if (script == null || pattern.matcher(script).find()) {
            return script;
        }

        if ("hummer_sdk.js".equals(scriptId)) {
            return AssetsUtil.readFile("hummer_sdk.js");
        }

        if ("hummer_component.js".equals(scriptId)) {
            return AssetsUtil.readFile("hummer_component.js");
        }

        // 替换换行等特殊字符，否则babel转换会报错
        if (pattern2.matcher(script).find()) {
            // \r -> \\r
            script = script.replace("\\r", "\\\\r");
            // \n -> \\n
            script = script.replace("\\n", "\\\\n");
            // \t -> \\t
            script = script.replace("\\t", "\\\\t");
        }
        // \" -> \\"
        script = script.replace("\\\"", "\\\\\"");

        // es6 -> es5
        script = String.format("Babel.transformCode(`%s`);", script);
        script = (String) mJsContext.evaluateJavaScript(script);

        return script;
    }

    public void registerInvoker(Invoker invoker) {
        if (invoker == null) {
            return;
        }
        mRegistry.put(invoker.getName(), invoker);
    }

    /**
     * Native向JS静态类注册回调方法
     *
     * @param funcPath 函数名路径，即可以带上函数作用域的路径，如："nativeFunc"、"Hummer.nativeFunc"、"Hummer.Test.nativeFunc"等等
     * @param callback Native回调方法
     */
    public void registerJSFunction(String funcPath, ICallback callback) {
        if (TextUtils.isEmpty(funcPath) || callback == null) {
            return;
        }
        makeSureJSFunctionValid(funcPath);
        mNativeCallbacks.put(funcPath, callback);
    }

    /**
     * Native向JS对象注册回调方法
     *
     * @param host
     * @param funcName
     * @param callback
     */
    public void registerJSFunction(JSValue host, String funcName, ICallback callback) {
        if (host == null || TextUtils.isEmpty(funcName) || callback == null) {
            return;
        }
        // 使每个funcName和一个jsValue绑定
        String funcKey = funcName + host.getIdentify();
        mNativeCallbacks.put(funcKey, callback);
        JSCallback jsValue = (JSCallback) mJsContext.evaluateJavaScript(makeJSFunction(funcKey));
        host.set(funcName, jsValue);
    }

    private void makeSureJSFunctionValid(String funcPath) {
        if (TextUtils.isEmpty(funcPath)) {
            return;
        }

        String[] items = funcPath.split("\\.");
        StringBuilder funcKey = new StringBuilder();
        for (int i = 0; i < items.length; i++) {
            String item = items[i];
            if (i > 0) {
                funcKey.append(".");
            }
            funcKey.append(item);
            if (i < items.length - 1) {
                // 确保函数名前面的作用域路径上的变量都是已定义的
                mJsContext.evaluateJavaScript(String.format("if (typeof(%s) == 'undefined') %s = {}", funcKey, funcKey));
            } else if (funcPath.equals(funcKey.toString())) {
                // 在JS中注册对应的方法
                mJsContext.evaluateJavaScript(funcKey + " = " + makeJSFunction(funcKey.toString()));
            }
        }
    }

    /**
     * 生成注入到JS中的JS回调代码
     *
     * @param funcKey
     * @return
     */
    private String makeJSFunction(String funcKey) {
        return String.format("(...args) => { \n" +
                "args = transArgsWithPrefix(...args);\n" +
                "return invoke('Hummer', 0, '%s', ...args); };", funcKey);
    }

    /**
     * JS回调到Native的方法内触发时
     *
     * @param funcName
     * @param params
     * @return
     */
    public Object onJsFunctionCall(String funcName, Object... params) {
        if (!mNativeCallbacks.containsKey(funcName)) {
            HMLog.w("HummerNative", String.format("callFromJS: didn't register this function! [%s]", funcName));
            return null;
        }
        for (int i = 0; i < params.length; i++) {
            if (params[i] instanceof String) {
                String p = (String) params[i];
                if (p.startsWith(HUMMER_OBJECT_PREFIX)) {
                    p = p.replace(HUMMER_OBJECT_PREFIX, "");
                    params[i] = HMGsonUtil.fromJson(p, Map.class);
                } else if (p.startsWith(HUMMER_ARRAY_PREFIX)) {
                    p = p.replace(HUMMER_ARRAY_PREFIX, "");
                    params[i] = HMGsonUtil.fromJson(p, List.class);
                }
            }
        }
        HMLog.d("HummerNative", String.format("onJsFunctionCall: <%s> %s", funcName, Arrays.toString(params)));
        return mNativeCallbacks.get(funcName).call(params);
    }

    private void initEnv(Map<String, Object> envs) {
        mJsContext.evaluateJavaScript(String.format("Hummer.env = %s", HMGsonUtil.toJson(envs)));
    }

    public void updateEnv(String key, String value) {
        mJsContext.evaluateJavaScript(String.format("Hummer.env.%s = %s", key, value));
    }

    private void initEnvironmentVariables() {
        int statusBarHeight = BarUtils.getStatusBarHeight(this);
        int deviceWidth = ScreenUtils.getAppScreenWidth(this);
        int deviceHeight = ScreenUtils.getAppScreenHeight(this);
        int availableWidth = deviceWidth;
        int availableHeight = deviceHeight - statusBarHeight;
        statusBarHeight = DPUtil.px2dp(this, statusBarHeight);
        deviceWidth = DPUtil.px2dp(this, deviceWidth);
        deviceHeight = DPUtil.px2dp(this, deviceHeight);
        availableWidth = DPUtil.px2dp(this, availableWidth);
        availableHeight = DPUtil.px2dp(this, availableHeight);

        Map<String, Object> envs = new LinkedHashMap<>();
        envs.put(ENV_KEY_PLATFORM, "Android");
        envs.put(ENV_KEY_OS_VERSION, Build.VERSION.RELEASE);
        envs.put(ENV_KEY_APP_NAME, AppUtils.getAppName(this));
        envs.put(ENV_KEY_APP_VERSION, AppUtils.getAppVersionName(this));
        envs.put(ENV_KEY_STATUS_BAR_HEIGHT, statusBarHeight);
        envs.put(ENV_KEY_SAFE_AREA_BOTTOM, 0);
        envs.put(ENV_KEY_DEVICE_WIDTH, deviceWidth);
        envs.put(ENV_KEY_DEVICE_HEIGHT, deviceHeight);
        envs.put(ENV_KEY_AVAILABLE_WIDTH, availableWidth);
        envs.put(ENV_KEY_AVAILABLE_HEIGHT, availableHeight);
        envs.put(ENV_KEY_SCALE, ScreenUtils.getScreenDensity(this));

        if (!TextUtils.isEmpty(namespace) && !namespace.equals(HummerSDK.NAMESPACE_DEFAULT)) {
            envs.put(ENV_KEY_NAMESPACE, namespace);
        }

        initEnv(envs);
    }
}
