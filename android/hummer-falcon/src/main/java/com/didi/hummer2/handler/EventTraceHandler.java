package com.didi.hummer2.handler;

import java.util.Map;

/**
 * didi Create on 2024/3/21 .
 * <p>
 * Copyright (c) 2024/3/21 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/3/21 11:23 AM
 * @Description 埋点事件处理器
 */

public interface EventTraceHandler {

    void onEvent(String namespace, String event, Map<String, Object> params);
}
