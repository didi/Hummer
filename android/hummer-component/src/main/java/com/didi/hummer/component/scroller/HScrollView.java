package com.didi.hummer.component.scroller;

import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.widget.HorizontalScrollView;

import com.didi.hummer.component.input.FocusUtil;

/**
 * Created by XiaoFeng on 2019-12-25.
 */
public class HScrollView extends HorizontalScrollView {

    private boolean isScrollStarted = false;
    private boolean isScrolling = false;

    private OnScrollListener onScrollListener = null;
    private OnScrollToTopListener onScrollToTopListener = null;
    private OnScrollToBottomListener onScrollToBottomListener = null;

    public HScrollView(Context context) {
        super(context);
    }

    public HScrollView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public HScrollView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public void setOnScrollListener(OnScrollListener listener) {
        onScrollListener = listener;
    }

    public void setOnScrollToTopListener(OnScrollToTopListener listener) {
        onScrollToTopListener = listener;
    }

    public void setOnScrollToBottomListener(OnScrollToBottomListener listener) {
        onScrollToBottomListener = listener;
    }

    @Override
    protected void onScrollChanged(int x, int y, int oldx, int oldy) {
        super.onScrollChanged(x, y, oldx, oldy);
        if (!isScrollStarted) {
            isScrollStarted = true;
            // 开始滑动
            if (onScrollListener != null) {
                onScrollListener.onScrollStarted();
            }
        }

        // 滑动中
        isScrollStarted = false;
        if (onScrollListener != null) {
            onScrollListener.onScrollChanged(this, x, y, x - oldx, y - oldy);
        }

        // TODO: 这么判断应该不准，没时间先这么写吧
        if (y - oldy == 0) {
            // 滑动结束
            if (onScrollListener != null) {
                onScrollListener.onScrollFinished();
            }
        }
    }

    @Override
    protected void onOverScrolled(int scrollX, int scrollY, boolean clampedX, boolean clampedY) {
        super.onOverScrolled(scrollX, scrollY, clampedX, clampedY);

        if (clampedX) {
            if (isScrolling) {
                isScrolling = false;
                if (scrollX > 0) {
                    if (onScrollToBottomListener != null) {
                        onScrollToBottomListener.onScrollToBottom();
                    }
                } else {
                    if (onScrollToTopListener != null) {
                        onScrollToTopListener.onScrollToTop();
                    }
                }
            }
        } else {
            isScrolling = true;
        }
    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        // 手指按下时，如果有键盘已弹出，则把键盘消失掉
        if (ev.getAction() == MotionEvent.ACTION_DOWN) {
            FocusUtil.clearFocus(getContext());
        }
        if (ev.getAction() == MotionEvent.ACTION_UP || ev.getAction() == MotionEvent.ACTION_CANCEL) {
            // 滑动中抬起手指
            if (onScrollListener != null) {
                onScrollListener.onScrollUp();
            }
        }
        return super.onTouchEvent(ev);
    }
}
