package com.didi.hummer2.falcon;

/**
 * didi Create on 2024/5/9 .
 * <p>
 * Copyright (c) 2024/5/9 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/5/9 9:34 PM
 * @Description PageLifeCycle 页面生命周期
 */

public interface PageLifeCycle {


    void onPageCreate();

    void onPageAppear();

    void onPageDisappear();

    void onPageDestroy();

    void onPageBack();

}
