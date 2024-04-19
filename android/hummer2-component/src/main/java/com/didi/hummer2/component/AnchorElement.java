package com.didi.hummer2.component;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.component.hummer.anchor.Anchor;

/**
 * didi Create on 2024/4/9 .
 * <p>
 * Copyright (c) 2024/4/9 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/9 8:07 PM
 * @Description Anchor
 */

@HMComponent("Anchor")
public class AnchorElement extends Element<Anchor> {


    public AnchorElement(HummerContext context, Object[] properties) {
        super(context, properties);
    }

    @Override
    public Anchor createRenderView() {
        return new Anchor(context, null, null);
    }
}
