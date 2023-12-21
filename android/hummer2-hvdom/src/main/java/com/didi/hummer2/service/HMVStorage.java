package com.didi.hummer2.service;

import java.util.HashMap;
import java.util.Map;

/**
 * didi Create on 2023/11/28 .
 * <p>
 * Copyright (c) 2023/11/28 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/11/28 11:06 上午
 * @Description 用一句话说明文件功能
 */

public class HMVStorage {

    private static Map<String, String> stringStringMap = new HashMap<>();

    public static void save(String key, String value) {
        stringStringMap.put(key, value);
    }

    public static String get(String key) {
        return stringStringMap.get(key);
    }
}
