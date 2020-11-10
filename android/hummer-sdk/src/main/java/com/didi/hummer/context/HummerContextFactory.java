package com.didi.hummer.context;

import android.support.annotation.NonNull;

import com.didi.hummer.context.jsc.JSCHummerContext;
import com.didi.hummer.render.style.HummerLayout;

/**
 * Created by XiaoFeng on 2019-11-06.
 */
public class HummerContextFactory {

    public interface IHummerContextCreator {

        HummerContext create(@NonNull HummerLayout container, String namespace);
    }

    private static IHummerContextCreator contextCreator;

    public static void setHummerContextCreator(IHummerContextCreator creator) {
        contextCreator = creator;
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
