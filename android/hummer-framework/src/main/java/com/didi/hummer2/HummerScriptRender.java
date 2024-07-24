package com.didi.hummer2;

import android.content.Intent;
import android.os.Parcelable;
import android.text.TextUtils;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.didi.hummer2.adapter.http.HttpCallback;
import com.didi.hummer2.adapter.navigator.NavPage;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.debug.HummerDebugger;
import com.didi.hummer2.devtools.DevToolsConfig;
import com.didi.hummer2.devtools.HummerDevTools;
import com.didi.hummer2.devtools.HummerDevToolsFactory;
import com.didi.hummer2.engine.ICallback;
import com.didi.hummer2.engine.JSValue;
import com.didi.hummer2.falcon.JavaScriptCallback;
import com.didi.hummer2.handler.JsExceptionHandler;
import com.didi.hummer2.render.style.HummerLayout;
import com.didi.hummer2.render.utils.AssetsUtil;
import com.didi.hummer2.render.utils.FileUtil;
import com.didi.hummer2.tracker.HummerPageTracker;
import com.didi.hummer2.utils.F4NDebugUtil;
import com.didi.hummer2.utils.HMLog;
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

    private HummerScriptContext hummerScriptContext;
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
        hummerScriptContext = Hummer.getHummerEngine().createHummerContext(namespace, hummerLayout.getContext(), hummerLayout);
        tracker.trackContextInitEnd();
        this.namespace = namespace;

        if (F4NDebugUtil.isDebuggable(namespace)) {
            devTools = HummerDevToolsFactory.create(hummerScriptContext, config);
        }

        JsExceptionHandler exceptionHandler = hummerScriptContext.getJsExceptionHandler();
        hummerScriptContext.setJsExceptionHandler(new JsExceptionHandler() {
            @Override
            public void onCatchException(String namespace, Exception exception) {
                if (exceptionHandler != null) {
                    exceptionHandler.onCatchException(namespace, exception);
                }
                onPageCatchJsException(namespace, exception);
            }
        });

        // 设置JS主动触发渲染完成的回调，只有在公共包抽离模式下才需要真正触发回调
        hummerScriptContext.setViewRenderListener(isRenderSuccess -> {
            if (isSplitChunksMode()) {
                onRenderFinish(isRenderSuccess);
            }
        });
    }

    private void onPageCatchJsException(String namespace, Exception exception) {
        if (tracker != null && hummerScriptContext != null) {
            tracker.trackException(hummerScriptContext.getPageUrl(), exception);
        }
    }

    public HummerContext getHummerContext() {
        return hummerScriptContext;
    }

    public void onStart() {
        hummerScriptContext.onStart();
    }

    public void onResume() {
        hummerScriptContext.onResume();
    }

    public void onPause() {
        hummerScriptContext.onPause();
    }

    public void onStop() {
        hummerScriptContext.onStop();
    }

    public void onDestroy() {
        isDestroyed.set(true);
        hummerScriptContext.onDestroy();
        tracker.trackContextDestroy();

        if (F4NDebugUtil.isDebuggable(namespace)) {
            HummerDebugger.release(hummerScriptContext);
            if (devTools != null) {
                devTools.release(hummerScriptContext);
            }
        }
    }

    public boolean onBackPressed() {
        return hummerScriptContext.onBackPressed();
    }

    public void render(String js) {
        render(js, hummerScriptContext.getJsSourcePath());
    }

    /**
     * 使用js脚本渲染
     *
     * @param js
     * @param sourcePath
     */
    public void render(String js, String sourcePath) {
        if (TextUtils.isEmpty(js) || isDestroyed.get()) {
            return;
        }
        processRenderBegin(js.length(), sourcePath);
        hummerScriptContext.setJsSourcePath(sourcePath);
        hummerScriptContext.evaluateJavaScript(js, sourcePath, new JavaScriptCallback() {
            @Override
            public void onJavaScriptResult(int status, String message, JsiValue jsiValue) {
                if (status != 0) {
                    HMLog.e("HummerNative", "onJavaScriptResult() status=" + status + ", message=" + message + ", jsiValue=" + jsiValue);
                }
                processJavascriptFinish();
                UIThreadUtil.runOnUiThreadX(new Runnable() {
                    @Override
                    public void run() {
                        processRenderFinish();
                    }
                }, 0);
            }
        });

    }

    /**
     * 使用字节码渲染
     *
     * @param bytecode
     * @param sourcePath
     */
    public void render(byte[] bytecode, String sourcePath) {
        if (bytecode == null || bytecode.length == 0 || isDestroyed.get()) {
            return;
        }
        processRenderBegin(bytecode.length, sourcePath);
        hummerScriptContext.setJsSourcePath(sourcePath);
        hummerScriptContext.evaluateBytecode(bytecode, sourcePath, new JavaScriptCallback() {
            @Override
            public void onJavaScriptResult(int status, String message, JsiValue jsiValue) {
                if (status != 0) {
                    HMLog.e("HummerNative", "onJavaScriptResult() status=" + status + ", message=" + message + ", jsiValue=" + jsiValue);
                }
                processJavascriptFinish();
                UIThreadUtil.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        processRenderFinish();
                    }
                });
            }
        });

    }

    private void processRenderBegin(long length, String sourcePath) {
        tracker.trackRenderStart(hummerScriptContext.getPageUrl());
        tracker.trackJSEvalStart(length, sourcePath);
    }

    private void processJavascriptFinish() {
        if (tracker != null) {
            tracker.trackJSEvalFinish();
        }
    }

    private void processRenderFinish() {
        if (!isSplitChunksMode()) {
            onRenderFinish(hummerScriptContext.isRender());
        }
    }

    private void onRenderFinish(boolean isRenderSuccess) {
        if (renderCallback != null) {
            if (isRenderSuccess) {
                renderCallback.onSucceed(hummerScriptContext, null);
            } else {
                renderCallback.onFailed(new RuntimeException("Page is empty!"));
            }
        }

        if (tracker != null) {
            tracker.trackRenderFinish(isRenderSuccess);
        }
    }

    private boolean isSplitChunksMode() {
        return false;
    }

    public void renderWithUrl(String url) {
        if (TextUtils.isEmpty(url) || isDestroyed.get()) {
            return;
        }

        if (F4NDebugUtil.isDebuggable(namespace)) {
            // 调试插件
            HummerDebugger.init(hummerScriptContext, url);

            // 热重载
            if (devTools != null) {
                devTools.initConnection(hummerScriptContext, url, () -> {
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
                hummerScriptContext.onHotReload(url);
            }

            render(response.data, url);

            if (F4NDebugUtil.isDebuggable(namespace) && isHotReload) {
                Toast.makeText(hummerScriptContext, "页面已刷新", Toast.LENGTH_SHORT).show();
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

        Hummer.runOnLoaderThread(() -> {
            String js = AssetsUtil.readFile(finalAssetsPath);
            String sourcePath = JsSourceUtil.JS_SOURCE_PREFIX_ASSETS + finalAssetsPath;
            Hummer.runOnRenderThread(() -> render(js, sourcePath));
        });
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

        Hummer.runOnLoaderThread(() -> {
            String js = FileUtil.readFile(finalJsFilePath);
            String sourcePath = JsSourceUtil.JS_SOURCE_PREFIX_FILE + finalJsFilePath;
            Hummer.runOnRenderThread(() -> render(js, sourcePath));
        });
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
        hummerScriptContext.setNavPage(page);
        hummerScriptContext.setPageUrl(page.url);
        hummerScriptContext.setJsSourcePath(page.sourcePath);
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
        if (hummerScriptContext != null) {
            return hummerScriptContext.getPageResult();
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
    }


    public HummerPageTracker getTracker() {
        return tracker;
    }

    public void setHummerPageHandler(HummerScriptContext.HummerPageHandler hummerPageHandler) {
        hummerScriptContext.setHummerPageHandler(hummerPageHandler);
    }


    public interface HummerRenderCallback {

        void onSucceed(HummerContext hmContext, JSValue jsPage);

        void onFailed(Exception e);
    }

}
