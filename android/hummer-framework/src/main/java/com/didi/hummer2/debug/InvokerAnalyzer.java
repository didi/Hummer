package com.didi.hummer2.debug;


/**
 * didi Create on 2023/3/7 .
 * <p>
 * Copyright (c) 2023/3/7 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/3/7 4:55 下午
 * @Description 用一句话说明文件功能
 */

public interface InvokerAnalyzer {

    void startTrack(String className, long objectID, String methodName, Object[] params);

    void stopTrack();

    void release();

}
