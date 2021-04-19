package com.didi.hummer.component.list.decoration;

import android.graphics.Rect;
import android.support.v7.widget.RecyclerView;
import android.view.View;

import com.didi.hummer.component.list.ListUtil;

/**
 * Grid模式的行间隔和列间隔设置
 *
 * Created by XiaoFeng on 2019-05-07.
 */
public class GridSpacingItemDecoration extends RecyclerView.ItemDecoration {

    private int spanCount;
    private int lineSpacing;
    private int itemSpacing;
    private boolean includeEdge;

    public GridSpacingItemDecoration(int spanCount, int spacing, boolean includeEdge) {
        this(spanCount, spacing, spacing, includeEdge);
    }

    public GridSpacingItemDecoration(int spanCount, int lineSpacing, int itemSpacing, boolean includeEdge) {
        this.spanCount = spanCount;
        this.lineSpacing = lineSpacing;
        this.itemSpacing = itemSpacing;
        this.includeEdge = includeEdge;
    }

    @Override
    public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
        int position = parent.getChildAdapterPosition(view); // item position
        int column = position % spanCount; // item column

        if (ListUtil.isVertical(parent.getLayoutManager())) {
            if (includeEdge) {
                outRect.left = itemSpacing - column * itemSpacing / spanCount; // spacing - column * ((1f / spanCount) * spacing)
                outRect.right = (column + 1) * itemSpacing / spanCount; // (column + 1) * ((1f / spanCount) * spacing)

                if (position < spanCount) { // top edge
                    outRect.top = lineSpacing;
                }
                outRect.bottom = lineSpacing; // item bottom
            } else {
                outRect.left = column * itemSpacing / spanCount; // column * ((1f / spanCount) * spacing)
                outRect.right = itemSpacing - (column + 1) * itemSpacing / spanCount; // spacing - (column + 1) * ((1f /    spanCount) * spacing)
                if (position >= spanCount) {
                    outRect.top = lineSpacing; // item top
                }
            }
        } else {
            if (includeEdge) {
                outRect.top = itemSpacing - column * itemSpacing / spanCount; // spacing - column * ((1f / spanCount) * spacing)
                outRect.bottom = (column + 1) * itemSpacing / spanCount; // (column + 1) * ((1f / spanCount) * spacing)

                if (position < spanCount) { // top edge
                    outRect.left = lineSpacing;
                }
                outRect.right = lineSpacing; // item bottom
            } else {
                outRect.top = column * itemSpacing / spanCount; // column * ((1f / spanCount) * spacing)
                outRect.bottom = itemSpacing - (column + 1) * itemSpacing / spanCount; // spacing - (column + 1) * ((1f /    spanCount) * spacing)
                if (position >= spanCount) {
                    outRect.left = lineSpacing; // item top
                }
            }
        }
    }
}
