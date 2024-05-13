package com.didi.hummer2.falcon;

/**
 * didi Create on 2024/5/9 .
 * <p>
 * Copyright (c) 2024/5/9 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/5/9 9:16 PM
 * @Description OnContextListener 上下文监听器，监听上下文状态切换
 */

public interface OnContextStateListener {


    void onContextCreate();

    void onContextStart();

    void onContextStop();

    void onContextDestroy();

}
