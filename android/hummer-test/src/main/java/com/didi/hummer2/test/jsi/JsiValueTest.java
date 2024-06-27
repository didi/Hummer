package com.didi.hummer2.test.jsi;

import android.content.Context;

import com.didi.hummer2.render.utils.AssetsUtil;
import com.didi.hummer2.test.engine.TestEngineLoader;

/**
 * didi Create on 2024/6/14 .
 * <p>
 * Copyright (c) 2024/6/14 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/6/14 2:52 PM
 * @Description 用一句话说明文件功能
 */

public class JsiValueTest {


    public void setUp() {

    }


    public void testJsiValueProtect() {
        TestEngineLoader.test("testJsiValueProtect");
    }

    public void testEvaluateJavaScript(Context context, String cmd, String file) {
        String script = AssetsUtil.readFile(context, file);

        TestEngineLoader.testEvaluateJavaScript(cmd, script);
    }

}
