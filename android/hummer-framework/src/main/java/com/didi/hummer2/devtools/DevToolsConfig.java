package com.didi.hummer2.devtools;

/**
 * didi Create on 2023/3/6 .
 * <p>
 * Copyright (c) 2023/3/6 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/3/6 3:11 下午
 * @Description DevToolsConfig
 */

public class DevToolsConfig {

    private HummerDevTools.IParameterInjector injector;

    private DevToolsConfig(Builder builder) {
        injector = builder.injector;
    }

    public HummerDevTools.IParameterInjector getInjector() {
        return injector;
    }

    public static class Builder {
        private HummerDevTools.IParameterInjector injector;

        public Builder setInjector(HummerDevTools.IParameterInjector injector) {
            this.injector = injector;
            return this;
        }

        public DevToolsConfig build() {
            return new DevToolsConfig(this);
        }
    }
}
