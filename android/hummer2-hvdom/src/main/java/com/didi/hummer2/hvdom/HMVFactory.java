package com.didi.hummer2.hvdom;

/**
 * didi Create on 2023/11/27 .
 * <p>
 * Copyright (c) 2023/11/27 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/27 5:52 下午
 * @Description 用一句话说明文件功能
 */

public interface HMVFactory {

    Object newInstance(long clsId, long objId, Object[] prams);

    Object callStaticMethod(long clsId, long methodId, Object[] prams);

    Object callMethod(long clsId, long objId, long methodId, Object[] prams);
}
