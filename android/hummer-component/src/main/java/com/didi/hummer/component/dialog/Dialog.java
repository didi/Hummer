package com.didi.hummer.component.dialog;

import android.app.AlertDialog;
import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.text.TextUtils;
import android.view.View;
import android.view.WindowManager;
import android.widget.TextView;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.component.R;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.style.HummerLayout;
import com.facebook.yoga.YogaAlign;
import com.facebook.yoga.YogaJustify;

/**
 * Created by XiaoFeng on 2019-12-25.
 */
@Component("Dialog")
public class Dialog {

    private Context context;
    private AlertDialog dialog;
    private HummerLayout customContainer;
    private HMBase customView;

    public Dialog(Context context) {
        this.context = context;
    }

    /**
     * 是否可以被取消（按返回键或者点击空白处是否可以关闭对话框，默认是true）
     */
    @JsProperty("cancelable")
    public boolean cancelable = true;

    /**
     * 显示提示用户的警示框。当警示框出现后，用户需要点击[确定]按钮才能继续进行操作。
     *
     * @param msg 内容
     * @param btnText 按钮内容
     * @param callback 按钮点击回调
     */
    @JsMethod("alert")
    public void alert(String msg, String btnText, JSCallback callback) {
        if (TextUtils.isEmpty(btnText)) {
            btnText = context.getString(android.R.string.ok);
        }
        dialog = new AlertDialog.Builder(context)
                .setCancelable(cancelable)
                .setMessage(msg)
                .setPositiveButton(btnText, (dialog, which) -> {
                    if (callback != null) {
                        callback.call();
                    }
                })
                .show();

        dialog.getButton(AlertDialog.BUTTON_POSITIVE).setTextColor(Color.BLACK);
    }

    /**
     * 显示能让用户可以接受或验证某些信息的确认框。当确认框出现后，用户需要点击确认或取消按钮才能继续进行操作。
     *
     * @param title 标题
     * @param msg 内容
     * @param okBtnText [确认]按钮内容
     * @param cancelBtnText [取消]按钮内容
     * @param okCallback [确认]按钮点击回调
     * @param cancelCallback [取消]按钮点击回调
     */
    @JsMethod("confirm")
    public void confirm(String title, String msg, String okBtnText, String cancelBtnText, JSCallback okCallback, JSCallback cancelCallback) {
        if (TextUtils.isEmpty(okBtnText)) {
            okBtnText = context.getString(android.R.string.ok);
        }
        if (TextUtils.isEmpty(cancelBtnText)) {
            cancelBtnText = context.getString(android.R.string.cancel);
        }
        dialog = new AlertDialog.Builder(context)
                .setCancelable(cancelable)
                .setTitle(title)
                .setMessage(msg)
                .setPositiveButton(okBtnText, (dialog, which) -> {
                    if (okCallback != null) {
                        okCallback.call();
                    }
                })
                .setNegativeButton(cancelBtnText, (dialog, which) -> {
                    if (cancelCallback != null) {
                        cancelCallback.call();
                    }
                })
                .show();

        dialog.getButton(AlertDialog.BUTTON_POSITIVE).setTextColor(Color.BLACK);
        dialog.getButton(AlertDialog.BUTTON_NEGATIVE).setTextColor(Color.GRAY);
    }

    @JsMethod("loading")
    public void loading(String msg) {
        View view = View.inflate(context, R.layout.loading_dialog, null);
        TextView tVMsg = view.findViewById(R.id.tv_msg);
        tVMsg.setText(msg);

        dialog = new AlertDialog.Builder(context, R.style.TransparentDialog)
                .setCancelable(cancelable)
                .setView(view)
                .show();
    }

    @JsMethod("custom")
    public void custom(HMBase baseView) {
        baseView.getJSValue().protect();
        customView = baseView;

        if (customContainer == null) {
            customContainer = new HummerLayout(context);
            customContainer.getYogaNode().setJustifyContent(YogaJustify.CENTER);
            customContainer.getYogaNode().setAlignItems(YogaAlign.CENTER);
        } else {
            customContainer.removeAllViews();
        }
        customContainer.addView(baseView.getView());

        if (dialog == null) {
            dialog = new AlertDialog.Builder(context, R.style.TransparentDialog)
                    .setCancelable(cancelable)
                    .setView(customContainer)
                    .show();
        } else {
            dialog.show();
        }

        if (dialog.getWindow() != null) {
            // 设置Dialog原始布局宽度全屏，内容默认是居中显示
            WindowManager.LayoutParams lp = dialog.getWindow().getAttributes();
            lp.width = WindowManager.LayoutParams.MATCH_PARENT;
            lp.height = WindowManager.LayoutParams.WRAP_CONTENT;
            dialog.getWindow().setAttributes(lp);
        }
    }

    @JsMethod("dismiss")
    public void dismiss() {
        if (dialog != null) {
            dialog.dismiss();
        }

        if (customView != null) {
            customView.getJSValue().unprotect();
            customView = null;
        }
    }
}
