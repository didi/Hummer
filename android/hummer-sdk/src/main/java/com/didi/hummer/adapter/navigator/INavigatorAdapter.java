package com.didi.hummer.adapter.navigator;

import android.content.Context;

/**
 * 页面导航适配器接口
 *
 * Created by XiaoFeng on 2019-12-24.
 */
public interface INavigatorAdapter {

    /**
     * 打开某个页面
     *
     * @param page
     * @param callback
     */
    void openPage(Context context, NavPage page, NavCallback callback);

    /**
     * 关闭当前页面
     *
     * @param page
     */
    void popPage(Context context, NavPage page);

    /**
     * 回退到指定页面
     *
     * @param page
     */
    void popToPage(Context context, NavPage page);

    /**
     * 回退到首页
     *
     * @param page 页面信息（是否需要动画）
     */
    void popToRootPage(Context context, NavPage page);

    /**
     * 向前回退指定数量的页面
     *
     * @param count 要回退的页面数（默认是1）
     * @param page 页面信息（是否需要动画）
     */
    void popBack(Context context, int count, NavPage page);
}
