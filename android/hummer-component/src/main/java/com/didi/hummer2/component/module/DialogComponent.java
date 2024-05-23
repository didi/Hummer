package com.didi.hummer2.component.module;


import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMAttribute;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.bridge.JsiFunction;
import com.didi.hummer2.module.Component;
import com.didi.hummer2.render.Element;
import com.didi.hummer2.component.hummer.dialog.Dialog;
import com.didi.hummer2.utils.UIThreadUtil;

/**
 * didi Create on 2024/4/10 .
 * <p>
 * Copyright (c) 2024/4/10 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/10 3:08 PM
 * @Description Dialog
 */

@HMComponent("Dialog")
public class DialogComponent extends Component {

    private Dialog delegate;

    public DialogComponent(HummerContext context) {
        super(context);
        delegate = new Dialog(context);
    }


    /**
     * 是否可以被取消（按返回键或者点击空白处是否可以关闭对话框，默认是true）
     */
    @HMAttribute("cancelable")
    public boolean cancelable = true;


    @HMMethod("setCancelable")
    public void setCancelable(boolean cancelable) {
        this.cancelable = cancelable;
        UIThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                delegate.cancelable = cancelable;
            }
        });

    }

    /**
     * AlertDialog显示层级是否是低层级
     * <p>
     * AlertDialog默认的层级是TYPE_APPLICATION(2)，如果设置为lowLayer的话，就变成TYPE_BASE_APPLICATION(1)
     */
    @HMAttribute("lowLayer")
    public boolean lowLayer = false;

    @HMMethod("setLowLayer")
    public void setLowLayer(boolean lowLayer) {
        this.lowLayer = lowLayer;
        UIThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                delegate.lowLayer = lowLayer;
            }
        });

    }

    /**
     * 显示提示用户的警示框。当警示框出现后，用户需要点击[确定]按钮才能继续进行操作。
     *
     * @param msg      内容
     * @param btnText  按钮内容
     * @param callback 按钮点击回调
     */
    @HMMethod("alert")
    public void alert(String msg, String btnText, JsiFunction callback) {
        UIThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                delegate.alert(msg, btnText, getCallback(callback));
            }
        });
    }

    /**
     * 显示能让用户可以接受或验证某些信息的确认框。当确认框出现后，用户需要点击确认或取消按钮才能继续进行操作。
     *
     * @param title          标题
     * @param msg            内容
     * @param okBtnText      [确认]按钮内容
     * @param cancelBtnText  [取消]按钮内容
     * @param okCallback     [确认]按钮点击回调
     * @param cancelCallback [取消]按钮点击回调
     */
    @HMMethod("confirm")
    public void confirm(String title, String msg, String okBtnText, String cancelBtnText, JsiFunction okCallback, JsiFunction cancelCallback) {
        UIThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                delegate.confirm(title, msg, okBtnText, cancelBtnText, getCallback(okCallback), getCallback(cancelCallback));
            }
        });
    }

    @HMMethod("loading")
    public void loading(String msg) {
        UIThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                delegate.loading(msg);
            }
        });

    }

    @HMMethod("custom")
    public void custom(Element element) {
        UIThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                delegate.custom(element.getView());
            }
        });
    }

    @HMMethod("dismiss")
    public void dismiss() {
        UIThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                delegate.dismiss();
            }
        });

    }

}
