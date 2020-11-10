package com.didi.hummer.devtools;

/**
 * Created by XiaoFeng on 2020/4/30.
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
