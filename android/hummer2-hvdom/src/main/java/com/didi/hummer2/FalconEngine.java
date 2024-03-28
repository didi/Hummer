package com.didi.hummer2;

/**
 * didi Create on 2023/11/20 .
 * <p>
 * Copyright (c) 2023/11/20 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/20 4:18 下午
 * @Description Hummer 虚拟DOM引擎
 */

public class FalconEngine {

    static {
        System.loadLibrary("hummer2");
        System.loadLibrary("hvdom");
        System.loadLibrary("qjs");
    }

    /**
     * 创建引擎
     * <p>
     * 已经存在了，重复调用无效果
     */
    public static native void createEngine();

    /**
     * 释放引擎
     */
    public static native void releaseEngine();

    /**
     * 创建 HVDOM 引擎上下文，需要通过引擎操作
     */
    public static native long createFalconContext();

    /**
     * 销毁 HVDOM 引擎上下文
     */
    public static native void destroyFalconContext(long contextId);

    /**
     * 绑定上下文
     */
    public static native boolean bindFalconContext(long contextId, FalconContext context, ConfigOption option);

    /**
     * 加载js代码
     */
    public static native Object evaluateJavaScript(long contextId, String script, String scriptId);

    /**
     * 加载js字节码
     */
    public static native Object evaluateBytecode(long contextId, byte[] script, String scriptId);


    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
