package com.didi.hummer.component.list;

import android.content.Context;
import android.support.v7.widget.LinearSmoothScroller;

/**
 * 在RecyclerView滚动到某一个item的时候，使其始终滚动item到屏幕的开始处（RecyclerView默认是滚动item到屏幕的可见范围，不一定在屏幕开始处）
 *
 * Created by XiaoFeng on 2021/10/15.
 */
public class TopLinearSmoothScroller extends LinearSmoothScroller {

    public TopLinearSmoothScroller(Context context) {
        super(context);
    }

    @Override
    public int getVerticalSnapPreference() {
        return SNAP_TO_START;
    }

    @Override
    protected int getHorizontalSnapPreference() {
        return SNAP_TO_START;
    }
}
