package com.didi.hummer2;


import com.didi.hummer2.hvdom.HMVCallback;
import com.didi.hummer2.hvdom.HMVFactory;

import java.lang.reflect.Array;
import java.util.HashMap;
import java.util.Map;

/**
 * didi Create on 2023/11/27 .
 * <p>
 * Copyright (c) 2023/11/27 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/27 5:02 下午
 * @Description 用一句话说明文件功能
 */

public class HummerVdomContext {

    private long identify;

    private final Map<Integer, HMVFactory> hmvFactoryMap;

    public HummerVdomContext() {
        HummerVdomEngine.createEngine();
        identify = HummerVdomEngine.createVdomContext();
        hmvFactoryMap = new HashMap<>();
    }


    public void bindVdomContext() {
        HummerVdomEngine.bindVdomContext(identify, this);
    }


    public Object evaluateJavaScript(String script, String scriptId) {
        return HummerVdomEngine.evaluateJavaScript(identify, script, scriptId);
    }


    public void registerService(int type, HMVFactory hmvFactory) {
        hmvFactoryMap.put(type, hmvFactory);
    }


    public void registerComponent(int type, HMVFactory hmvFactory) {
        hmvFactoryMap.put(type, hmvFactory);
    }

    public Object newInstance(int type, long clsId, long objId, Object[] prams) {
        HMVFactory factory = hmvFactoryMap.get(type);
        if (factory != null) {
            return factory.newInstance(clsId, objId, prams);
        }
        return null;
    }

    public Object releaseInstance(int type, long clsId, long objId, Object[] prams) {
        HMVFactory factory = hmvFactoryMap.get(type);
        if (factory != null) {
//            return factory.newInstance(clsId, objId, prams);
        }
        return null;
    }

    public Object callStaticMethod(int type, long clsId, long methodId, Object[] prams) {
        HMVFactory factory = hmvFactoryMap.get(type);
        if (factory != null) {
            return factory.callStaticMethod(clsId, methodId, prams);
        }
        return null;
    }

    public Object callMethod(int type, long clsId, long objId, long methodId, Object[] prams) {
        HMVFactory factory = hmvFactoryMap.get(type);
        if (factory != null) {
            return factory.callMethod(clsId, objId, methodId, prams);
        }
        return null;
    }


    public Object callServiceStaticMethod(long clsId, long objId, Object prams) {
//        HMVFactory hmvService = hmvServiceMap.get(clsName);
//        if (hmvService != null) {
//            return hmvService.callStaticMethod(methodName, params, callback);
//        }
        return null;
    }

    public Object callServiceMethod(String clsName, Object obj, String methodName, Object params, HMVCallback callback) {
//        HMVFactory hmvService = hmvServiceMap.get(clsName);
//        if (hmvService != null) {
//            return hmvService.callMethod(obj, methodName, params, callback);
//        }
        return null;
    }

    public Object callComponentStaticMethod(String clsName, String methodName, Object params, HMVCallback callback) {
//        HMVFactory hmvFactory = hmvComponentMap.get(clsName);
//        if (hmvFactory != null) {
//            return hmvFactory.callStaticMethod(methodName, params, callback);
//        }
        return null;
    }

    public Object callComponentMethod(String clsName, Object obj, String methodName, Object params, HMVCallback callback) {
//        HMVFactory hmvFactory = hmvComponentMap.get(clsName);
//        if (hmvFactory != null) {
//            return hmvFactory.callMethod(obj, methodName, params, callback);
//        }
        return null;
    }

    public void destroyVdomContext() {
        HummerVdomEngine.destroyVdomContext(identify);
    }

    public static void releaseEngine() {
        HummerVdomEngine.releaseEngine();
    }


}
