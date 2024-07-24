package com.didi.hummer2.bridge.convert;

import com.didi.hummer2.bridge.JsiValue;

/**
 * didi Create on 2024/7/12 .
 * <p>
 * Copyright (c) 2024/7/12 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/12 4:48 PM
 * @Description JsiValue 的编码器，可以将Java数据转换成JsiValue
 */

public interface JsiValueEncoder {

    JsiValue toJsiValue();
}
