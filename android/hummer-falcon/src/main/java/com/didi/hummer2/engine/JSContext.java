package com.didi.hummer2.engine;


/**
 * Created by XiaoFeng on 2019-11-01.
 */
public interface JSContext extends JSValue {

    interface JSEvaluateCallback {
        void onJSEvaluated(Object result);
    }

    Object evaluateJavaScript(String script);

    Object evaluateJavaScript(String script, String scriptId);

    // 临时接口，做ABTest用，后续会删除
    @Deprecated
    Object evaluateJavaScriptOnly(String script, String scriptId);

    void evaluateJavaScriptAsync(String script, String scriptId, JSEvaluateCallback callback);

    Object evaluateBytecode(byte[] bytecode);

//    void setRecycler(IRecycler recycler);
}
