package com.didi.hummer.context;

import android.content.Context;
import android.support.annotation.NonNull;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.context.jsc.JSCHummerContext;
import com.didi.hummer.context.napi.NAPIHummerContext;
import com.didi.hummer.render.style.HummerLayout;

/**
 * Created by XiaoFeng on 2019-11-06.
 */
public class HummerContextFactory {

    public interface IHummerContextCreator {

        /**
         * 精简版构造函数，只用于JS代码执行，不能用做页面渲染
         */
        HummerContext create(@NonNull Context context);

        /**
         * 正常版构造函数，用于页面渲染
         */
        HummerContext create(@NonNull HummerLayout container, String namespace);
    }

    private static IHummerContextCreator contextCreator;

    public static void setHummerContextCreator(IHummerContextCreator creator) {
        contextCreator = creator;
    }

    public static HummerContext createContext(@NonNull Context context) {
        if (contextCreator != null) {
            return contextCreator.create(context);
        }

        if (HummerSDK.getJsEngine() == HummerSDK.JsEngine.NAPI_QJS
                || HummerSDK.getJsEngine() == HummerSDK.JsEngine.NAPI_HERMES) {
            return new NAPIHummerContext(context);
        } else {
            return new JSCHummerContext(context);
        }
    }

    public static HummerContext createContext(@NonNull HummerLayout container) {
        return createContext(container, null);
    }

    public static HummerContext createContext(@NonNull HummerLayout container, String namespace) {
        if (contextCreator != null) {
            return contextCreator.create(container, namespace);
        }

        if (HummerSDK.getJsEngine() == HummerSDK.JsEngine.NAPI_QJS
                || HummerSDK.getJsEngine() == HummerSDK.JsEngine.NAPI_HERMES) {
            return new NAPIHummerContext(container, namespace);
        } else {
            return new JSCHummerContext(container, namespace);
        }
    }
}
