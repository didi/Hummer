package com.didi.hummer.core.engine;

import com.didi.hummer.core.engine.base.ICallback;
import com.didi.hummer.core.engine.base.JSIdentify;
import com.didi.hummer.core.engine.base.JSReleasable;

/**
 * Created by XiaoFeng on 2019-11-01.
 */
public interface JSCallback extends ICallback, JSReleasable, JSIdentify {

    JSContext getJSContext();

    boolean isValid();
}
