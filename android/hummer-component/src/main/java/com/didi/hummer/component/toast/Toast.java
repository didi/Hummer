package com.didi.hummer.component.toast;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.render.component.view.HMBase;

/**
 * Created by XiaoFeng on 2019-12-25.
 */
@Component("Toast")
public class Toast {

    @JsMethod("show")
    public static void show(String msg, int duration) {
        android.widget.Toast.makeText(HummerSDK.appContext, msg, duration <= 2000 ? android.widget.Toast.LENGTH_SHORT : android.widget.Toast.LENGTH_LONG).show();
    }

    @JsMethod("custom")
    public static void custom(HMBase baseView, int duration) {
        android.widget.Toast toast = new android.widget.Toast(HummerSDK.appContext);
        toast.setDuration(duration <= 2000 ? android.widget.Toast.LENGTH_SHORT : android.widget.Toast.LENGTH_LONG);
        toast.setView(baseView.getView());
        toast.show();
    }
}
