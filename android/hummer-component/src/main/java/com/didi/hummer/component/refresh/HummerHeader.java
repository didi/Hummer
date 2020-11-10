package com.didi.hummer.component.refresh;

import android.content.Context;
import android.support.annotation.NonNull;
import android.util.AttributeSet;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.style.HummerLayout;
import com.scwang.smart.refresh.layout.api.RefreshHeader;
import com.scwang.smart.refresh.layout.api.RefreshLayout;
import com.scwang.smart.refresh.layout.constant.RefreshState;
import com.scwang.smart.refresh.layout.simple.SimpleComponent;

/**
 * Hummer中可滚动视图的通用下拉刷新容器（Scroller, HorizontalScroller, List）
 *
 * Created by XiaoFeng on 2020/9/30.
 */
public class HummerHeader extends SimpleComponent implements RefreshHeader {

    private OnRefreshListener mOnRefreshListener;

    public interface OnRefreshListener {
        void onRefreshStarted();
        void onRefreshing();
        void onRefreshFinished();
    }

    public HummerHeader(Context context) {
        this(context, null);
    }

    public HummerHeader(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public HummerHeader(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public void addHeaderView(HMBase headerView) {
        HummerLayout layout = new HummerLayout(headerView.getContext());
        layout.addView(headerView);
        addView(layout, new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
    }

    public void setOnRefreshListener(OnRefreshListener listener) {
        mOnRefreshListener = listener;
    }

    @Override
    public void onStateChanged(@NonNull RefreshLayout refreshLayout, @NonNull RefreshState oldState, @NonNull RefreshState newState) {
        super.onStateChanged(refreshLayout, oldState, newState);
        switch (newState) {
            case PullDownToRefresh:
                // 开始下拉
                if (mOnRefreshListener != null) {
                    mOnRefreshListener.onRefreshStarted();
                }
                break;
            case ReleaseToRefresh:
                // 下拉到可刷新状态
                break;
            case RefreshReleased:
                // 结束下拉（手松开）
                if (mOnRefreshListener != null) {
                    mOnRefreshListener.onRefreshing();
                }
                break;
            case Refreshing:
                // 刷新中
                break;
            case RefreshFinish:
                // 刷新结束
                if (mOnRefreshListener != null) {
                    mOnRefreshListener.onRefreshFinished();
                }
                break;
            default:
                break;
        }
    }
}
