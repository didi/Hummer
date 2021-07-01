package com.didi.hummer.component.canvas;

import android.content.Context;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.component.view.HMBase;

@Component("CanvasView")
public class CanvasView extends HMBase<CanvasDrawHelperView> {


    public CanvasView(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
    }

    @Override
    protected CanvasDrawHelperView createViewInstance(Context context) {
        return new CanvasDrawHelperView(context);
    }
}
