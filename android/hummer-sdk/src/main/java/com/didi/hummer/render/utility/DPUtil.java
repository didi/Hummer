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
}
