package com.didi.hummer.component.canvas;

import android.content.Context;
import android.graphics.Path;
import android.util.Log;
import android.view.View;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.style.HummerStyleUtils;
import com.didi.hummer.render.utility.DPUtil;

@Component("CanvasPath")
public class CanvasPath extends HMBase {

    private Context context;
    private Path path = new Path();

    public CanvasPath(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
        this.context = context;
    }

    public Path getPath() {
        return path;
    }

    private float dp2px(Object v) {
        return HummerStyleUtils.convertNumber(v);
    }

    @JsMethod("moveTo")
    public void moveTo(Object x, Object y) {
        try {
            Log.i("CanvasPath22222","x:"+x);
            Log.i("CanvasPath22222","y:"+y);
            float x_px = dp2px(x);
            float y_px = dp2px(y);
            path.moveTo(x_px, y_px);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @JsMethod("lineTo")
    public void lineTo(Object x, Object y) {
        float x_px = dp2px(x);
        float y_px = dp2px(y);
        path.lineTo(x_px, y_px);
    }

    @JsMethod("close")
    public void close() {
        path.close();
    }

    @Override
    protected View createViewInstance(Context context) {
        return null;
    }
}
