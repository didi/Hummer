package com.didi.hummer.devtools;

import com.didi.hummer.context.HummerContext;
import com.didi.hummer.devtools.widget.DevToolsEntrance;

/**
 * @author: linjizong
 * @date: 2020-04-20
 * @desc: Hummer调试工具，提供Hummer控制台输出、环境变量显示
 */
public class HummerDevTools {

    /**
     * 初始化，添加Debug入口
     *
     * @param context  hummer运行上下文
     */
    public static void init(HummerContext context) {
        init(context, null);
    }

    /**
     * 初始化，添加Debug入口
     *
     * @param context  hummer运行上下文
     * @param injector 注入要显示的参数，可为空
     */
    public static void init(HummerContext context, IParameterInjector injector) {
        DevToolsEntrance entranceView = new DevToolsEntrance(context);
        entranceView.setParameterInjector(injector);
    }

    /**
     * 注入参数
     */
    public interface IParameterInjector {
        void injectParameter(StringBuilder builder);
    }
}
