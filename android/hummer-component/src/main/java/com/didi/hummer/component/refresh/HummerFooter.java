package com.didi.hummer.component.refresh;

import android.content.Context;
import android.support.annotation.NonNull;
import android.util.AttributeSet;
import android.view.ViewGroup;

import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.style.HummerLayout;
import com.scwang.smart.refresh.layout.api.RefreshFooter;
import com.scwang.smart.refresh.layout.api.RefreshLayout;
import com.scwang.smart.refresh.layout.constant.RefreshState;
import com.scwang.smart.refresh.layout.simple.SimpleComponent;

/**
 * Hummer中可滚动视图的通用加载更多容器（Scroller, HorizontalScroller, List）
 *
 * Created by XiaoFeng on 2020/9/30.
 */
public class HummerFooter extends SimpleComponent implements RefreshFooter {

    private OnLoadListener mOnLoadListener;

    public interface OnLoadListener {
        void onLoadStarted();
        void onLoading();
        void onLoadFinished();
    }

    public HummerFooter(Context context) {
        this(context, null);
    }

    public HummerFooter(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public HummerFooter(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public void addFooterView(HMBase footView) {
        HummerLayout layout = new HummerLayout(footView.getContext());
        layout.addView(footView);
        addView(layout, new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
    }

    public void setOnLoadListener(OnLoadListener listener) {
        mOnLoadListener = listener;
    }

    @Override
    public void onStateChanged(@NonNull RefreshLayout refreshLayout, @NonNull RefreshState oldState, @NonNull RefreshState newState) {
        switch (newState) {
            case PullUpToLoad:
                // 开始上拉
                if (mOnLoadListener != null) {
                    mOnLoadListener.onLoadStarted();
                }
                break;
            case ReleaseToLoad:
                // 上拉到可加载状态
                break;
            case LoadReleased:
                // 结束加载（手松开）
                break;
            case Loading:
                // 加载中
                if (mOnLoadListener != null) {
                    mOnLoadListener.onLoading();
                }
                break;
            case LoadFinish:
                // 加载结束
                if (mOnLoadListener != null) {
                    mOnLoadListener.onLoadFinished();
                }
                break;
            default:
                break;
        }
    }
}
