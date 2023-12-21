package com.didi.hummer2.component;

import android.content.Context;

import com.didi.hummer.component.view.View;
import com.didi.hummer2.bridge.HMValue;

/**
 * didi Create on 2023/12/4 .
 * <p>
 * Copyright (c) 2023/12/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/12/4 3:59 PM
 * @Description 用一句话说明文件功能
 */

public class ViewElement extends Element<View> {

    public ViewElement(Context context, HMValue properties) {
        super(context, properties);
    }

    @Override
    public View createRenderView() {
        return new View(GlobalRef.getHummerContext(context), null, null);
    }


    public void appendChild(Element element) {
        renderView.appendChild(element.getRenderView());
    }

    public void appendChild(int index, Element element) {

    }

    public void removeChild(Element element) {
        renderView.removeChild(element.getRenderView());
    }

    public void removeChildAt(int index) {

    }
}
