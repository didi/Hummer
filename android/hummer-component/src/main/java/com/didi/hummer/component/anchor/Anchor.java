package com.didi.hummer.component.anchor;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.component.view.View;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.facebook.yoga.YogaDisplay;

/**
 * 锚点组件（默认是display:none，其他和View组件一样）
 *
 * Created by XiaoFeng on 2020/11/10.
 */
@Component("Anchor")
public class Anchor extends View {

    public Anchor(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
        getYogaNode().setDisplay(YogaDisplay.NONE);
    }
}
