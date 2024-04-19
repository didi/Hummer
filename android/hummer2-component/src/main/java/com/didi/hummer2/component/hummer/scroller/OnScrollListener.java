package com.didi.hummer2.component.hummer.scroller;

import android.view.View;

/**
 * Scroll滚动监听
 *
 * Created by XiaoFeng on 2019-12-25.
 */
public interface OnScrollListener {

    /**
     * 开始滚动
     */
    void onScrollStarted();

    /**
     * 结束滚动
     */
    void onScrollFinished();

    /**
     * 滚动中抬起手指
     */
    void onScrollUp();

    /**
     * 滚动事件发生
     *
     * @param scrollView
     * @param x x轴方向滚动的实际值
     * @param y y轴方向滚动的实际值
     * @param dx x轴方向与上一次事件滚动的差值
     * @param dy y轴方向与上一次事件滚动的差值
     */
    void onScrollChanged(View scrollView, int x, int y, int dx, int dy);
}
