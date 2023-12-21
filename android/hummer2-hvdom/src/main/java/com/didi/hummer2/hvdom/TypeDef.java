package com.didi.hummer2.hvdom;

/**
 * didi Create on 2023/12/4 .
 * <p>
 * Copyright (c) 2023/12/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/12/4 3:29 PM
 * @Description 用一句话说明文件功能
 */

public class TypeDef {
    public final static int TYPE_SERVICE = 0;
    public final static int TYPE_COMPONENT = 1;

    public final static int TYPE_RENDER = 2;


    public final static int ElementClsId = 1;

    public final static int ElementMethod_newInstance = 2;
    public final static int ElementMethod_invoke = 3;
    public final static int ElementMethod_appendChild = 4;
    public final static int ElementMethod_removeChild = 5;
    public final static int ElementMethod_setAttribute = 6;
    public final static int ElementMethod_addEventListener = 7;
    public final static int ElementMethod_removeEventListener = 8;
    public final static int ElementMethod_setStyle = 60;


    public final static long RenderClsId = 100;
    public final static long RenderMethod_renderRoot = 100 + 1;



    public final   static long BridgeClsId = 600;

    public final    static long BridgeMethod_newInstance = BridgeClsId + 1;
    public final    static long BridgeMethod_releaseInstance = BridgeClsId + 2;
    public final   static long BridgeMethod_callStaticMethod = BridgeClsId + 3;
    public final    static long BridgeMethod_callMethod = BridgeClsId + 4;

}
