package com.didi.hummer.component.input;

import android.app.Activity;
import android.content.Context;
import android.os.Build;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.InputMethodManager;

/**
 * 输入框焦点处理帮助类
 *
 * Created by XiaoFeng on 2020/5/19.
 */
public class FocusUtil {

    public static void requestFocus(View view) {
        if (view == null) {
            return;
        }

        view.post(() -> {
            view.requestFocus();
            KeyboardUtil.showKeyboard(view);
        });
    }

    public static void clearFocus(View view) {
        if (view == null) {
            return;
        }

        // 只有把焦点落在其他控件上，输入框本身的焦点才会真正失去
        view.post(() -> {
            focusParent(view);
            view.clearFocus();
            KeyboardUtil.hideKeyboard(view);
        });
    }

    public static void clearFocus(Context context) {
        if (context instanceof Activity) {
            Activity activity = (Activity) context;
            if (activity.getCurrentFocus() != null && activity.getCurrentFocus().getWindowToken() != null) {
                InputMethodManager imm = (InputMethodManager) activity.getSystemService(Context.INPUT_METHOD_SERVICE);
                if (imm != null && imm.isActive()) {
                    clearFocus(activity.getCurrentFocus());
                }
            }
        }
    }

    private static void focusParent(View view) {
        if (view.getParent() instanceof ViewGroup) {
            ViewGroup parent = (ViewGroup) view.getParent();
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                parent.setDefaultFocusHighlightEnabled(false);
            }
            parent.setFocusable(true);
            parent.setFocusableInTouchMode(true);
            parent.requestFocus();
        }
    }
}
