package com.didi.hummer.core.engine;

/**
 * Created by XiaoFeng on 2019-11-01.
 */
public interface JSContext extends JSValue {

    Object evaluateJavaScript(String script);

    Object evaluateJavaScript(String script, String scriptId);
}
