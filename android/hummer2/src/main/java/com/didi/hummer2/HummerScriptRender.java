package com.didi.hummer2;

import android.content.Intent;
import android.os.Parcelable;
import android.text.TextUtils;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.didi.hummer2.adapter.http.HttpCallback;
import com.didi.hummer2.adapter.navigator.NavPage;
import com.didi.hummer2.debug.HummerDebugger;
import com.didi.hummer2.devtools.DevToolsConfig;
import com.didi.hummer2.devtools.HummerDevTools;
import com.didi.hummer2.devtools.HummerDevToolsFactory;
import com.didi.hummer2.engine.ICallback;
import com.didi.hummer2.engine.JSValue;
import com.didi.hummer2.render.style.HummerLayout;
import com.didi.hummer2.render.utils.AssetsUtil;
import com.didi.hummer2.render.utils.FileUtil;
import com.didi.hummer2.utils.F4NDebugUtil;
import com.didi.hummer2.utils.JsSourceUtil;
import com.didi.hummer2.utils.NetworkUtil;
import com.didi.hummer2.utils.UIThreadUtil;

import java.io.File;
import java.io.Serializable;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * 负责JS的加载，可以加载JS字符串或JS对应的URL
 * <p>
 * Created by XiaoFeng on 2019-08-27.
 */
public class HummerScriptRender {

    private HummerScriptContext scriptContext;
    private AtomicBoolean isDestroyed = new AtomicBoolean(false);
    private HummerRenderCallback renderCallback;
    private HummerDevTools devTools;
    private HummerPageTracker tracker;
    private String namespace;


    public HummerScriptRender(@NonNull HummerLayout container) {
        this(container, null);
    }

    public HummerScriptRender(@NonNull HummerLayout container, String namespace) {
        this(container, namespace, null);
    }

    public HummerScriptRender(@NonNull HummerLayout hummerLayout, String namespace, DevToolsConfig config) {
        tracker = new HummerPageTracker(namespace);
        tracker.trackContextInitStart();
        scriptContext = Hummer.getHummerEngine().createHummerContext(namespace, hummerLayout.getContext(), hummerLayout);
        tracker.trackContextInitEnd();
        this.namespace = namespace;

        if (F4NDebugUtil.isDebuggable(namespace)) {
            devTools = HummerDevToolsFactory.create(scriptContext, config);
        }

//        ExceptionCallback cb = e -> {
//            if (tracker != null && hmContext != null) {
//                tracker.trackException(hmContext.getPageUrl(), e);
//            }
//        };
//        if (HummerSDK.getJsEngine() == HummerSDK.JsEngine.NAPI_QJS
//                || HummerSDK.getJsEngine() == HummerSDK.JsEngine.NAPI_HERMES) {
//            JSException.addJSContextExceptionCallback(hmContext.getJsContext(), cb);
//        } else {
//            HummerException.addJSContextExceptionCallback(hmContext.getJsContext(), cb);
//        }

        // 设置JS主动触发渲染完成的回调，只有在公共包抽离模式下才需要真正触发回调
//        hmContext.setRenderListener(isRenderSuccess -> {
//            if (isSplitChunksMode()) {
//                onRenderFinish(isRenderSuccess);
//            }
//        });
    }

    public HummerContext getHummerContext() {
        return scriptContext;
    }

    public void onStart() {
        scriptContext.onStart();
    }

    public void onResume() {
        scriptContext.onResume();
    }

    public void onPause() {
        scriptContext.onPause();
    }

    public void onStop() {
        scriptContext.onStop();
    }

    public void onDestroy() {
        isDestroyed.set(true);
        scriptContext.onDestroy();
        tracker.trackContextDestroy();

        if (F4NDebugUtil.isDebuggable(namespace)) {
            HummerDebugger.release(scriptContext);
            if (devTools != null) {
                devTools.release(scriptContext);
            }
        }
    }

    public boolean onBackPressed() {
        return scriptContext.onBackPressed();
    }

    public void render(String js) {
        render(js, scriptContext.getJsSourcePath());
    }

    public void render(String js, String sourcePath) {
        if (TextUtils.isEmpty(js) || isDestroyed.get()) {
            return;
        }

        tracker.trackRenderStart(scriptContext.getPageUrl());
        scriptContext.setJsSourcePath(sourcePath);

        tracker.trackJSEvalStart(js.length(), sourcePath);
//        if (HummerSDK.isSupportBytecode(hmContext.getNamespace())) {
//            hmContext.evaluateJavaScriptAsync(js, sourcePath, ret -> {
//                processRenderFinish();
//            });
//        } else {
        scriptContext.evaluateJavaScript(js, sourcePath);
        processRenderFinish();
//        }
    }

    public void render(byte[] bytecode, String sourcePath) {
        if (bytecode == null || bytecode.length <= 0 || isDestroyed.get()) {
            return;
        }
        tracker.trackRenderStart(scriptContext.getPageUrl());
        scriptContext.setJsSourcePath(sourcePath);

        tracker.trackJSEvalStart(bytecode.length, sourcePath);
        scriptContext.evaluateBytecode(bytecode, "");
        processRenderFinish();
    }

    private void processRenderFinish() {
        if (tracker != null) {
            tracker.trackJSEvalFinish();
        }
        if (!isSplitChunksMode()) {
            onRenderFinish(scriptContext.getJsPage() != null);
        }
    }

    private void onRenderFinish(boolean isRenderSuccess) {
        if (renderCallback != null) {
            if (isRenderSuccess) {
//                renderCallback.onSucceed(hmContext, getHummerContext().getJsPage());
                renderCallback.onSucceed(scriptContext, null);
            } else {
                renderCallback.onFailed(new RuntimeException("Page is empty!"));
            }
        }

        if (tracker != null) {
            tracker.trackRenderFinish(isRenderSuccess);
        }
    }

    private boolean isSplitChunksMode() {
//        JSValue hv = hmContext.getJsContext().getJSValue("Hummer");
//        return hv != null && hv.getBoolean("isSplitChunksMode");
        return false;
    }

    public void renderWithUrl(String url) {
        if (TextUtils.isEmpty(url) || isDestroyed.get()) {
            return;
        }

        if (F4NDebugUtil.isDebuggable(namespace)) {
            // 调试插件
            HummerDebugger.init(scriptContext, url);

            // 热重载
            if (devTools != null) {
                devTools.initConnection(scriptContext, url, () -> {
                    requestJsBundle(url, true);
                });
            }
        }

        requestJsBundle(url, false);
    }

    private void requestJsBundle(String url, boolean isHotReload) {
        tracker.trackJSFetchStart();
        NetworkUtil.httpGet(url, (HttpCallback<String>) response -> {
            if (isDestroyed.get()) {
                if (renderCallback != null) {
                    renderCallback.onFailed(new RuntimeException("Page is destroyed!"));
                }
                return;
            }

            if (response == null) {
                if (renderCallback != null) {
                    renderCallback.onFailed(new RuntimeException("Http response is empty!"));
                }
                return;
            }

            if (response.error.code != 0) {
                if (renderCallback != null) {
                    renderCallback.onFailed(new RuntimeException(String.format("Http response error: %d, %s", response.error.code, response.error.msg)));
                }
                return;
            }

            if (tracker != null) {
                tracker.trackJSFetchFinish();
            }

            // 如果是刷新流程，那么在执行JS之前，需要先模拟走一遍生命周期，来做相关的清理工作
            if (F4NDebugUtil.isDebuggable(namespace) && isHotReload) {
                scriptContext.onHotReload(url);
            }

            render(response.data, url);

            if (F4NDebugUtil.isDebuggable(namespace) && isHotReload) {
                Toast.makeText(scriptContext, "页面已刷新", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void renderWithAssets(String assetsPath) {
        if (isDestroyed.get()) {
            if (renderCallback != null) {
                renderCallback.onFailed(new RuntimeException("Page is destroyed!"));
            }
            return;
        }

        if (TextUtils.isEmpty(assetsPath)) {
            if (renderCallback != null) {
                renderCallback.onFailed(new RuntimeException("assetsPath is empty!"));
            }
            return;
        }

        if (assetsPath.startsWith("/")) {
            assetsPath = assetsPath.substring(1);
        }

        String finalAssetsPath = assetsPath;
        new Thread(() -> {
            String js = AssetsUtil.readFile(finalAssetsPath);
            String sourcePath = JsSourceUtil.JS_SOURCE_PREFIX_ASSETS + finalAssetsPath;
            UIThreadUtil.runOnUiThread(() -> render(js, sourcePath));
        }).start();
    }

    public void renderWithFile(String jsFilePath) {
        if (isDestroyed.get()) {
            if (renderCallback != null) {
                renderCallback.onFailed(new RuntimeException("Page is destroyed!"));
            }
            return;
        }

        if (TextUtils.isEmpty(jsFilePath)) {
            if (renderCallback != null) {
                renderCallback.onFailed(new RuntimeException("js file path is empty!"));
            }
            return;
        }

        if (jsFilePath.startsWith("/")) {
            jsFilePath = jsFilePath.substring(1);
        }

        String finalJsFilePath = jsFilePath;
        new Thread(() -> {
            String js = FileUtil.readFile(finalJsFilePath);
            String sourcePath = JsSourceUtil.JS_SOURCE_PREFIX_FILE + finalJsFilePath;
            UIThreadUtil.runOnUiThread(() -> render(js, sourcePath));
        }).start();
    }

    public void renderWithFile(File jsFile) {
        if (jsFile == null || !jsFile.exists()) {
            if (renderCallback != null) {
                renderCallback.onFailed(new RuntimeException("js file is not exists!"));
            }
            return;
        }

        renderWithFile(jsFile.getAbsolutePath());
    }

    public void setRenderCallback(HummerRenderCallback renderCallback) {
        this.renderCallback = renderCallback;
    }

    /**
     * 设置JS页面打开时，前一个JS页面传递过来的参数
     *
     * @param page
     */
    public void setJsPageInfo(NavPage page) {
        if (isDestroyed.get()) {
            return;
        }
        scriptContext.setNavPage(page);
        scriptContext.setPageUrl(page.url);
        scriptContext.setJsSourcePath(page.sourcePath);
        tracker.trackPageView(page.url);
    }

    /**
     * 获取JS页面关闭时，当前JS页面需要返回到前一个页面的参数
     *
     * @return
     */
    public Map<String, Object> getJsPageResult() {
        if (isDestroyed.get()) {
            return null;
        }
        if (scriptContext!= null){
            return scriptContext.getPageResult();
        }
        return null;
    }

    /**
     * 获取JS页面关闭时，当前JS页面需要返回到前一个页面的参数，并转成Intent格式
     *
     * @return
     */
    public Intent getJsPageResultIntent() {
        Map<String, Object> result = getJsPageResult();
        if (result == null) {
            return null;
        }
        Intent intent = new Intent();
        for (String key : result.keySet()) {
            Object value = result.get(key);
            if (value instanceof Serializable) {
                intent.putExtra(key, (Serializable) value);
            } else if (value instanceof Parcelable) {
                intent.putExtra(key, (Parcelable) value);
            }
        }
        return intent;
    }

    /**
     * 向JS的Hummer域中注入Native参数
     *
     * @param key
     * @param data
     */
    public void setNativeDataToHummer(String key, Map<String, Object> data) {
        if (isDestroyed.get()) {
            return;
        }
//        hmContext.getJsContext().getJSValue("Hummer").set(key, data);
    }

    /**
     * 给当前JS页面的根View注册Native方法（需要在render结束之后才能调用）
     *
     * @param funcName
     * @param callback
     */
    public void registerJsPageFunction(String funcName, ICallback callback) {
        if (isDestroyed.get()) {
            return;
        }
//        hmContext.registerJSFunction(hmContext.getJsPage(), funcName, callback);
    }

    public void setHummerPageHandler(HummerScriptContext.HummerPageHandler hummerPageHandler) {
        scriptContext.setHummerPageHandler(hummerPageHandler);
    }



    public interface HummerRenderCallback {

        void onSucceed(HummerContext hmContext, JSValue jsPage);

        void onFailed(Exception e);
    }

}
