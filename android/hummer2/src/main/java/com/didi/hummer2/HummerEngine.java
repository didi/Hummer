package com.didi.hummer2;

import android.content.Context;
import android.text.TextUtils;
import android.view.ViewGroup;

import com.didi.hummer2.utils.HMLog;

import java.util.HashMap;
import java.util.Map;

/**
 * didi Create on 2024/3/21 .
 * <p>
 * Copyright (c) 2024/3/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/21 5:14 PM
 * @Description 用一句话说明文件功能
 */

public class HummerEngine {

    private Map<String, HummerNameSpace> hummerNameSpaceMap;


    public HummerEngine() {
        hummerNameSpaceMap = new HashMap<>();
    }

    public void registerHummerConfig(HummerConfig hummerConfig) {
        String namespace = hummerConfig.getNamespace();
        HummerNameSpace hummerNameSpace = new HummerNameSpace(namespace, hummerConfig);
        hummerNameSpaceMap.put(namespace, hummerNameSpace);
    }


    /**
     * 创建HummerContext
     *
     * @param namespace
     * @param context
     * @param rootView
     * @return 可能为空
     */
    public HummerScriptContext createHummerContext(String namespace, Context context, ViewGroup rootView) {
        HummerNameSpace nameSpace = searchHummerNameSpace(namespace);
        if (nameSpace == null) {
            return null;
        }
        HummerScriptContext nativeContext = new HummerScriptContext(context, nameSpace.getHummerConfig(), rootView);
        nameSpace.addHummerContext(nativeContext);
        return nativeContext;
    }


    public void destroyHummerContext(HummerScriptContext hummerScriptContext) {
        String namespace = hummerScriptContext.getNamespace();
        HummerNameSpace hummerNameSpace = hummerNameSpaceMap.get(namespace);
        if (hummerNameSpace != null) {
            hummerNameSpace.removeHummerContext(hummerScriptContext);
        }
    }

    private void registerHummerNameSpace(HummerNameSpace hummerNameSpace) {
        if (hummerNameSpace != null) {
            HummerNameSpace space = hummerNameSpaceMap.get(hummerNameSpace.getNamespace());
            if (space == null) {
                hummerNameSpaceMap.put(hummerNameSpace.getNamespace(), hummerNameSpace);
            } else {
                HMLog.w("HummerNative", "当前命名空间已经初始化，请先不要重复初始化配置，重复无效。 namespace=" + hummerNameSpace.getNamespace());
            }
        }
    }


    /**
     * 查找命名空间
     * 1、如果namespace 是空或者是默认值，则在未初始化的情况下自动初始化
     * 2、如果不是默认或者空，则返回null，并输出日志
     */
    private HummerNameSpace searchHummerNameSpace(String namespace) {
        HummerNameSpace hummerNameSpace = null;
        if (TextUtils.isEmpty(namespace) || TextUtils.equals(namespace, Hummer.NAMESPACE_DEFAULT)) {
            namespace = Hummer.NAMESPACE_DEFAULT;
            hummerNameSpace = hummerNameSpaceMap.get(namespace);
            if (hummerNameSpace == null) {
                HummerConfig hummerConfig = new HummerConfig.Builder(null).build();
                hummerNameSpace = new HummerNameSpace(namespace, hummerConfig);
                registerHummerNameSpace(hummerNameSpace);
            }
        } else {
            hummerNameSpace = hummerNameSpaceMap.get(namespace);
            if (hummerNameSpace == null) {
                HMLog.w("HummerNative", "当前命名空间并未初始化，请先初始化再使用。 namespace=" + namespace);
            }
        }
        return hummerNameSpace;
    }


}
