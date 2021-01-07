package com.didi.hummer.render.utility;

import android.content.Context;

public class DPUtil {

    /**
     * dp转px
     *
     * @param context Context 对象
     * @param dp      dp值
     * @return px值
     */
    public static int dp2px(Context context, float dp) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dp * scale + 0.5f);
    }

    /**
     * dp转px（返回float型）
     *
     * @param context Context 对象
     * @param dp      dp值
     * @return px值
     */
    public static float dp2pxF(Context context, float dp) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return dp * scale;
    }

    /**
     * px转dp
     *
     * @param context Context对象
     * @param px      px值
     * @return dp值
     */
    public static int px2dp(Context context, float px) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (px / scale + 0.5f);
    }

    /**
     * px转dp（返回float型）
     *
     * @param context Context对象
     * @param px      px值
     * @return dp值
     */
    public static float px2dpF(Context context, float px) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return px / scale;
    }
}
