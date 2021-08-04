package com.didi.hummer.core.engine;

import com.didi.hummer.core.engine.base.IRecycler;

/**
 * Created by XiaoFeng on 2019-11-01.
 */
public interface JSContext extends JSValue {

    Object evaluateJavaScript(String script);

    Object evaluateJavaScript(String script, String scriptId);

    void setRecycler(IRecycler recycler);
}
