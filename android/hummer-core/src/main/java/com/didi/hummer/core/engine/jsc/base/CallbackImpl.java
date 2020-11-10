package com.didi.hummer.core.engine.jsc.base;

import com.didi.hummer.core.engine.base.ICallback;
import com.didi.hummer.core.engine.jsc.JSCUtils;
import com.didi.hummer.core.engine.jsc.jni.TypeConvertor;

/**
 * JSValue相关的回调实现类
 *
 * Created by XiaoFeng on 2019-09-25.
 */
public class CallbackImpl implements ICallback {

    public long jsContext;
    public long jsValue;
    public long jsThisObj;

    public CallbackImpl(long context, long value, long thisObj) {
        jsContext = context;
        jsValue = value;
        jsThisObj = thisObj;
    }

    @Override
    public Object call(Object... params) {
        long[] parameters = JSCUtils.objectsToJsValues(jsContext, params);
        long ret = TypeConvertor.JSFunctionCall(jsContext, jsThisObj, jsValue, parameters);
        return JSCUtils.jsValueToObject(jsContext, ret);
    }

}
