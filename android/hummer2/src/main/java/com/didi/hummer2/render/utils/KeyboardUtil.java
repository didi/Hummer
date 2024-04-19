package com.didi.hummer2.render.utils;

import android.content.Context;
import android.view.View;
import android.view.inputmethod.InputMethodManager;

/**
 * Created by XiaoFeng on 2020/6/15.
 */
public class KeyboardUtil {

    public static void showKeyboard(View view) {
        if (view == null) {
            return;
        }
        InputMethodManager imm = (InputMethodManager) view.getContext().getSystemService(Context.INPUT_METHOD_SERVICE);
        if (imm != null) {
//            imm.toggleSoftInput(InputMethodManager.SHOW_FORCED, InputMethodManager.HIDE_NOT_ALWAYS);
            imm.showSoftInput(view, InputMethodManager.SHOW_FORCED);
        }
    }

    public static void hideKeyboard(View view) {
        if (view == null) {
            return;
        }
        InputMethodManager imm = (InputMethodManager) view.getContext().getSystemService(Context.INPUT_METHOD_SERVICE);
        if (imm != null) {
//            imm.toggleSoftInput(0, InputMethodManager.HIDE_NOT_ALWAYS);
            imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
        }
    }
}
