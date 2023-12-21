package com.didi.hummer2;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;


/**
 * didi Create on 2023/12/3 .
 * <p>
 * Copyright (c) 2023/12/3 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/12/3 6:00 下午
 * @Description 用一句话说明文件功能
 */

public class HummerVdomRender {

    private Context context;

    private ViewGroup rootContentView;

    public HummerVdomRender(Context context) {
        this.context = context;
    }

    public void setRootContentView(ViewGroup rootContentView) {
        this.rootContentView = rootContentView;
    }


    public void renderRootView(View rootView) {
        rootContentView.addView(rootView);
    }
}
