package com.didi.hummer.context;

import android.content.Context;
import android.content.ContextWrapper;
import android.support.annotation.NonNull;
import android.text.TextUtils;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.engine.base.ICallback;
import com.didi.hummer.core.util.BytecodeCacheUtil;
import com.didi.hummer.core.util.DebugUtil;
import com.didi.hummer.core.util.HMGsonUtil;
import com.didi.hummer.core.util.HMLog;
import com.didi.hummer.debug.InvokerAnalyzer;
import com.didi.hummer.module.notifycenter.NotifyCenter;
import com.didi.hummer.module.notifycenter.NotifyCenterInvoker;
import com.didi.hummer.pool.ComponentPool;
import com.didi.hummer.pool.ObjectPool;
import com.didi.hummer.register.HummerRegister$$hummer_sdk;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.component.view.Invoker;
import com.didi.hummer.render.style.HummerLayout;
import com.didi.hummer.utils.EnvUtil;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;


public class HummerContext extends ContextWrapper {

    private static final String HUMMER_OBJECT_PREFIX = "-_-_-_hummer-object_-_-_-";
    private static final String HUMMER_ARRAY_PREFIX = "-_-_-_hummer-array_-_-_-";

    /**
     * 命名空间（用于隔离不同业务线）
     */
    protected String namespace;

    protected HummerLayout mContainer;
    protected HummerLayout mContent;
    protected ComponentPool mComponentPool = new ComponentPool();
    protected JSContext mJsContext;
    protected HMBase mJSRootView;
    protected JSValue mJsPage;

    /**
     * JS主动调用的render结束回调，用于公共包抽离模式
     */
    public interface OnRenderListener {
        void onRenderFinished(boolean isSucceed);
    }

    private OnRenderListener renderListener;

    /**
     * invoke方法分析工具（用于调试阶段）
     */
    protected InvokerAnalyzer invokerAnalyzer;

    /**
     * js文件源路径
     *
     * 有以下几种路径类型：
     * 网络URL：http(s)://x.x.x.x/home/index.js
     * Assets文件：assets:///xxx/index.js
     * 本地文件：file:///data/data/xxx/files/xxx/index.js
     */
    protected String jsSourcePath = "";

    /**
     * 页面URL（即页面跳转时的URL，相对URL会被转成真实URL）
     *
     * 有以下两种URL类型：
     * 网络URL：http(s)://x.x.x.x/home/index.js
     * Hummer URL：hummer://home/index.js
     */
    protected String pageUrl = "";

    /**
     * 加入生命周期的各种判断，是为了适应网络加载情况下的异步执行JS
     */
    protected boolean isJsCreated;
    protected boolean isStarted;
    protected boolean isResumed;

    protected HashMap<String, Invoker> mRegistry = new HashMap<>();
    protected HashMap<String, ICallback> mNativeCallbacks = new HashMap<>();

    /**
     * 全局保存已通过babel转换后的代码
     */
    private static final Map<String, String> globalBabelTransScriptMap = new HashMap<>();

    /**
     * 空白字符通配符（包括换行）
     */
    protected Pattern blankCharPattern = Pattern.compile("\\s");

    /**
     * 精简版构造函数，只用于JS代码执行，不能用做页面渲染
     */
    protected HummerContext(@NonNull Context context) {
        super(context);
    }

    protected HummerContext(@NonNull HummerLayout container) {
        this(container, null);
    }

    protected HummerContext(@NonNull HummerLayout container, String namespace) {
        super(container.getContext());
        HMLog.d("HummerNative", "HummerContext.new");
        this.namespace = namespace;
        this.mContainer = container;
        mContent = new HummerLayout(this);
        mContent.getYogaNode().setWidthPercent(100);
        mContent.getYogaNode().setHeightPercent(100);
        mContainer.addView(mContent);
        invokerAnalyzer = InvokerAnalyzer.init();
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
            // 仅用于纯Hermes调试版本
            if (HummerSDK.getJsEngine() == HummerSDK.JsEngine.HERMES) {
                mJsContext.evaluateJavaScript("function Recycler() {}");
            }
            // 注入babel
            mJsContext.evaluateJavaScript("var Babel = {}");
            mJsContext.evaluateJavaScript(HummerDefinition.BABEL, "babel.js");
            mJsContext.evaluateJavaScript(HummerDefinition.ES5_CORE, "HummerDefinition_es5.js");
        } else {
            if (HummerSDK.isSupportBytecode(namespace)) {
                mJsContext.evaluateJavaScript(HummerDefinition.CORE, "HummerDefinition.js");
            } else {
                mJsContext.evaluateJavaScriptOnly(HummerDefinition.CORE, "HummerDefinition.js");
            }
        }
        mJsContext.set("__IS_DEBUG__", DebugUtil.isDebuggable());

        initEnv(EnvUtil.getHummerEnv(this, namespace));

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
        InvokerAnalyzer.release(invokerAnalyzer);
        destroy();
        NotifyCenter.release(getContext());
        NotifyCenter.release(mJsContext);
        releaseJSContext();
    }

    public boolean onBack() {
        return back();
    }

    /**
     * 用于调式时的热重载
     *
     * @return
     */
    public void onHotReload(String url) {
        stop();
        pause();
        destroy();
        NotifyCenter.release(getContext());
        NotifyCenter.release(mJsContext);
        BytecodeCacheUtil.removeBytecode(url);
    }

    protected void releaseJSContext() {
        HMLog.d("HummerNative", "HummerContext.releaseJSContext");
        mJsContext.release();
    }

    public void render(HMBase base) {
        if (base != null) {
            mJSRootView = base;
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

    public void setRenderListener(OnRenderListener listener) {
        renderListener = listener;
    }

    public void onRenderFinished(boolean isSucceed) {
        if (renderListener != null) {
            renderListener.onRenderFinished(isSucceed);
        }
    }

    public HummerLayout getContainer() {
        return mContainer;
    }

    public HMBase getJSRootView() {
        return mJSRootView;
    }

    public JSValue getJsPage() {
        return mJsPage;
    }

    public InvokerAnalyzer getInvokerAnalyzer() {
        return invokerAnalyzer;
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

    public String getPageUrl() {
        return pageUrl;
    }

    public void setPageUrl(String pageUrl) {
        this.pageUrl = pageUrl;
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
        if (HummerSDK.isSupportBytecode(namespace)) {
            return mJsContext.evaluateJavaScript(script, scriptId);
        } else {
            return mJsContext.evaluateJavaScriptOnly(script, scriptId);
        }
    }

    public void evaluateJavaScriptAsync(String script, String scriptId, JSContext.JSEvaluateCallback callback) {
        if (HummerSDK.getJsEngine() == HummerSDK.JsEngine.HERMES
                || HummerSDK.getJsEngine() == HummerSDK.JsEngine.NAPI_HERMES) {
            script = babelTransformCode(script, scriptId);
        }
        mJsContext.evaluateJavaScriptAsync(script, scriptId, callback);
    }

    public Object evaluateBytecode(byte[] bytecode) {
        return mJsContext.evaluateBytecode(bytecode);
    }

    private String babelTransformCode(String script, String scriptId) {
        if (script == null || script.contains("__esModule")) {
            return script;
        }

        if (globalBabelTransScriptMap.containsKey(scriptId)) {
            return globalBabelTransScriptMap.get(scriptId);
        }

        if ("hummer_sdk.js".equals(scriptId)) {
            return HummerDefinition.ES5_SDK;
        }

        if ("hummer_component.js".equals(scriptId)) {
            return HummerDefinition.ES5_COMP;
        }

        String orgScript = script;

        // 替换换行等特殊字符，否则babel转换会报错
        if (blankCharPattern.matcher(script).find()) {
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
        Object ret = mJsContext.evaluateJavaScript(script);
        if (!(ret instanceof String)) {
            return orgScript;
        }
        script = (String) ret;
        globalBabelTransScriptMap.put(scriptId, script);
        return script;
    }

    public void registerInvoker(Invoker invoker) {
        if (invoker == null) {
            return;
        }
        mRegistry.put(invoker.getName(), invoker);
    }

    public Invoker getInvoker(String invokeName) {
        return mRegistry.get(invokeName);
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
        mJsContext.evaluateJavaScript("Hummer.env = {}");
        JSValue hv = mJsContext.getJSValue("Hummer");
        if (hv != null) {
            JSValue ev = hv.getJSValue("env");
            if (ev != null) {
                for (String k : envs.keySet()) {
                    ev.set(k, envs.get(k));
                }
            }
        }
    }

    public void updateEnv(String key, String value) {
        JSValue hv = mJsContext.getJSValue("Hummer");
        if (hv != null) {
            JSValue ev = hv.getJSValue("env");
            if (ev != null) {
                ev.set(key, value);
            }
        }
    }
}
