package com.didi.hummer2;

import java.util.ArrayList;
import java.util.List;

/**
 * didi Create on 2024/3/29 .
 * <p>
 * Copyright (c) 2024/3/29 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/29 5:13 PM
 * @Description 用一句话说明文件功能
 */

public class HummerNameSpace {


    private String namespace;

    private HummerConfig hummerConfig;

    private List<HummerScriptContext> hummerScriptContexts = new ArrayList<>();

    public HummerNameSpace(String namespace, HummerConfig hummerConfig) {
        this.namespace = namespace;
        this.hummerConfig = hummerConfig;
    }

    public String getNamespace() {
        return namespace;
    }

    public HummerConfig getHummerConfig() {
        return hummerConfig;
    }


    public void addHummerContext(HummerScriptContext hummerContext) {
        hummerScriptContexts.add(hummerContext);
    }

    public void removeHummerContext(HummerScriptContext hummerContext) {
        hummerScriptContexts.remove(hummerContext);

    }


}
