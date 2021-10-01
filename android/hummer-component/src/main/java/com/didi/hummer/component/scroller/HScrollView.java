package com.didi.hummer.component.scroller;

import android.app.Activity;
import android.content.Context;
import android.support.v4.view.ViewCompat;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.widget.HorizontalScrollView;

import com.didi.hummer.component.input.FocusUtil;
import com.didi.hummer.component.input.KeyboardUtil;

/**
 * Created by XiaoFeng on 2019-12-25.
 */
public class HScrollView extends HorizontalScrollView {

    /**
     * 动状态变化的观察器
     */
    private ScrollViewStateObserver observer;
    /**
     * 是否滚动到顶部或底部
     */
    private boolean isScrollToEnd = false;

    private OnScrollListener onScrollListener = null;
    private OnScrollToTopListener onScrollToTopListener = null;
    private OnScrollToBottomListener onScrollToBottomListener = null;

    public HScrollView(Context context) {
        this(context, null);
    }

    public HScrollView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public HScrollView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(context);
    }

    private void init(Context context) {
        // 去除滑动到边缘时的半月阴影
        setOverScrollMode(OVER_SCROLL_NEVER);
        // 屏蔽ScrollView的无障碍焦点（使焦点可以落在它的子View上）
        setImportantForAccessibility(ViewCompat.IMPORTANT_FOR_ACCESSIBILITY_NO);

        observer = new ScrollViewStateObserver();
        observer.setOnScrollStateListener(state -> {
            switch (state) {
                case ScrollViewStateObserver.OnScrollStateListener.SCROLL_STATE_SCROLL_START:
                    if (onScrollListener != null) {
                        onScrollListener.onScrollStarted();
                    }
                    break;
                case ScrollViewStateObserver.OnScrollStateListener.SCROLL_STATE_SCROLL_TOUCH_UP:
                    if (onScrollListener != null) {
                        onScrollListener.onScrollUp();
                    }
                    break;
                case ScrollViewStateObserver.OnScrollStateListener.SCROLL_STATE_SCROLL_FINISH:
                    if (onScrollListener != null) {
                        onScrollListener.onScrollFinished();
                    }
                    break;
                default:
                    break;
            }
        });
    }

    public void release() {
        if (observer != null) {
            observer.release();
        }
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
        observer.onScrollChanged(x, oldx);
        if (onScrollListener != null) {
            onScrollListener.onScrollChanged(this, x, y, x - oldx, y - oldy);
        }

        hideKeyboardIfNeed(Math.abs(x - oldx));
    }

    @Override
    protected void onOverScrolled(int scrollX, int scrollY, boolean clampedX, boolean clampedY) {
        super.onOverScrolled(scrollX, scrollY, clampedX, clampedY);
        if (clampedX) {
            if (!isScrollToEnd) {
                isScrollToEnd = true;
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
            isScrollToEnd = false;
        }
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        // 手指按下时，重置滚动到顶部或底部的标示
        if (ev.getAction() == MotionEvent.ACTION_DOWN) {
            isScrollToEnd = false;
        }
        observer.onInterceptTouchEvent(ev);
        return super.onInterceptTouchEvent(ev);
    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        // 手指按下时，如果有键盘已弹出，则把键盘消失掉
        if (ev.getAction() == MotionEvent.ACTION_DOWN) {
            FocusUtil.clearFocus(getContext());
        }
        observer.onTouchEvent(ev);
        return super.onTouchEvent(ev);
    }

    private void hideKeyboardIfNeed(int d) {
        if (d > 20 && getContext() instanceof Activity) {
            Activity act = (Activity) getContext();
            if (act.getCurrentFocus() != null && act.getCurrentFocus().getWindowToken() != null) {
                KeyboardUtil.hideKeyboard(act.getCurrentFocus());
            }
        }
    }
}
