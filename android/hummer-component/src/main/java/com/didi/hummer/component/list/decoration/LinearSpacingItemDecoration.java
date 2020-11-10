package com.didi.hummer.component.list.decoration;

import android.graphics.Rect;
import android.support.v7.widget.RecyclerView;
import android.view.View;

/**
 * 列表模式的行间隔设置
 *
 * Created by XiaoFeng on 2019-05-07.
 */
public class LinearSpacingItemDecoration extends RecyclerView.ItemDecoration {
    private int space;
    private boolean includeEdge;

    public LinearSpacingItemDecoration(int space, boolean includeEdge) {
        this.space = space;
        this.includeEdge = includeEdge;
    }

    @Override
    public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
        if (includeEdge) {
            outRect.left = space;
            outRect.right = space;
            outRect.bottom = space;

            // Add top margin only for the first item to avoid double space between items
            if (parent.getChildLayoutPosition(view) == 0) {
                outRect.top = space;
            } else {
                outRect.top = 0;
            }
        } else {
            if (parent.getChildLayoutPosition(view) > 0) {
                outRect.top = space;
            }
        }
    }
}
