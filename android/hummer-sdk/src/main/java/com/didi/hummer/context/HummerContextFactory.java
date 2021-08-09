package com.didi.hummer.context;

import android.content.Context;
import android.support.annotation.NonNull;

import com.didi.hummer.context.jsc.JSCHummerContext;
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
        try {
            if (contextCreator != null) {
                return contextCreator.create(context);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new JSCHummerContext(context);
    }

    public static HummerContext createContext(@NonNull HummerLayout container) {
        return createContext(container, null);
    }

    public static HummerContext createContext(@NonNull HummerLayout container, String namespace) {
        try {
            if (contextCreator != null) {
                return contextCreator.create(container, namespace);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new JSCHummerContext(container, namespace);
    }
}
