package com.didi.hummer.core.engine.napi.jni;

import com.didi.hummer.core.util.HMGsonUtil;

/**
 * Created by XiaoFeng on 2021/6/29.
 */
public class JSUtils {

    public static String toJsonString(Object object) {
        return HMGsonUtil.toJson(object);
    }
}
