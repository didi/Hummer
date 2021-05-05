package com.didi.hummer.render.utility;

import android.content.Context;
import android.graphics.Rect;
import android.graphics.RectF;
import android.view.View;

/**
 * Created by XiaoFeng on 2021/5/5.
 */
public class RTLUtil {

    /**
     * 判断当前是否是RTL布局
     */
    public static boolean isRTL(Context context) {
        if (context == null) {
            return false;
        }
        return context.getResources().getConfiguration().getLayoutDirection() == View.LAYOUT_DIRECTION_RTL;
    }

    /**
     * 把Rect转换成RTL
     *
     * @param r
     */
    public static void toRTLRect(Rect r) {
        int t = r.left;
        r.left = r.right;
        r.right = t;
    }

    /**
     * 把RectF转换成RTL
     *
     * @param r
     */
    public static void toRTLRect(RectF r) {
        float t = r.left;
        r.left = r.right;
        r.right = t;
    }
}
