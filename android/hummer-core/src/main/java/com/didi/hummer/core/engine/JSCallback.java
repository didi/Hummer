package com.didi.hummer.core.engine;

import com.didi.hummer.core.engine.base.ICallback;

/**
 * Created by XiaoFeng on 2019-11-01.
 */
public interface JSCallback extends JSValue, ICallback {

    JSContext getJSContext();

    boolean isValid();
}
