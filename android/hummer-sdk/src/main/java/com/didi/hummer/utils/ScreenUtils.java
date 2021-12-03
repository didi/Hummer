package com.didi.hummer.utils;

import android.content.Context;
import android.graphics.Point;
import android.os.Build;
import android.view.View;
import android.view.WindowManager;

import com.didi.hummer.render.utility.DPUtil;

/**
 * Created by XiaoFeng on 2019-10-18.
 */
public class ScreenUtils {

    /**
     * Return the width of screen, in pixel.
     *
     * @return the width of screen, in pixel
     */
    public static int getScreenWidth(Context context) {
        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        if (wm == null) return -1;
        Point point = new Point();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            wm.getDefaultDisplay().getRealSize(point);
        } else {
            wm.getDefaultDisplay().getSize(point);
        }
        return point.x;
    }

    /**
     * Return the height of screen, in pixel. (包含navigationBar)
     *
     * @return the height of screen, in pixel
     */
    public static int getScreenHeight(Context context) {
        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        if (wm == null) return -1;
        Point point = new Point();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            wm.getDefaultDisplay().getRealSize(point);
        } else {
            wm.getDefaultDisplay().getSize(point);
        }
        return point.y;
    }

    /**
     * Return the application's width of screen, in pixel. (不包含navigationBar)
     *
     * @return the application's width of screen, in pixel
     */
    public static int getAppScreenWidth(Context context) {
        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        if (wm == null) return -1;
        Point point = new Point();
        wm.getDefaultDisplay().getSize(point);
        return point.x;
    }

    /**
     * Return the application's height of screen, in pixel.
     *
     * @return the application's height of screen, in pixel
     */
    public static int getAppScreenHeight(Context context) {
        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        if (wm == null) return -1;
        Point point = new Point();
        wm.getDefaultDisplay().getSize(point);
        return point.y;
    }

    /**
     * Return the density of screen.
     *
     * @return the density of screen
     */
    public static float getScreenDensity(Context context) {
        return context.getResources().getDisplayMetrics().density;
    }

    /**
     * Return the screen density expressed as dots-per-inch.
     *
     * @return the screen density expressed as dots-per-inch
     */
    public static int getScreenDensityDpi(Context context) {
        return context.getResources().getDisplayMetrics().densityDpi;
    }

    /**
     * Return the view or viewGroup in screen
     *
     * @return the view or viewGroup in screen
     */
    public static int[] getViewLocationOnScreen(View v) {
        int[] location = new int[2];
        v.getLocationInWindow(location);
        return location;
    }
}
