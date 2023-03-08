package com.didi.hummer.core.debug;


/**
 * didi Create on 2023/3/7 .
 * <p>
 * Copyright (c) 2023/3/7 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/3/7 3:27 下午
 * @Description Debuggable 命名空间是否开启debug配置信息
 */

public class Debuggable {
    private String namespace;
    private boolean debuggable;

    public Debuggable(String namespace, boolean debuggable) {
        this.namespace = namespace;
        this.debuggable = debuggable;
    }

    public String getNamespace() {
        return namespace;
    }

    public boolean isDebuggable() {
        return debuggable;
    }
}
