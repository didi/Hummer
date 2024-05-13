package com.didi.hummer2.component;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.component.hummer.loading.Loading;
import com.didi.hummer2.render.Element;

/**
 * didi Create on 2024/4/24 .
 * <p>
 * Copyright (c) 2024/4/24 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/24 9:54 PM
 * @Description 用一句话说明文件功能
 */
@HMComponent("Loading")
public class LoadingElement extends Element<Loading> {

    public LoadingElement(HummerContext context, Object[] properties) {
        super(context, properties);
    }

    @Override
    public Loading createRenderView() {
        return new Loading(context, null, null);
    }


    @Override
    @HMMethod("appendChild")
    public void appendChild(Element element) {
//        getView().appendChild(element.getView());
    }


}
