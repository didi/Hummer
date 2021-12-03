package com.didi.hummer.component.scroller;

import android.app.Activity;
import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ScrollView;

import com.didi.hummer.component.input.FocusUtil;
import com.didi.hummer.component.input.KeyboardUtil;

/**
 * Created by XiaoFeng on 2019-12-25.
 */
public class VScrollView extends ScrollView {

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

    public VScrollView(Context context) {
        this(context, null);
    }

    public VScrollView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public VScrollView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(context);
    }

    private void init(Context context) {
        // 去除滑动到边缘时的半月阴影
        setOverScrollMode(OVER_SCROLL_NEVER);
        // 屏蔽ScrollView的无障碍焦点（使焦点可以落在它的子View上）
        setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_NO);

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
        observer.onScrollChanged(y, oldy);
        if (onScrollListener != null) {
            onScrollListener.onScrollChanged(this, x, y, x - oldx, y - oldy);
        }

        hideKeyboardIfNeed(Math.abs(y - oldy));
    }

    @Override
    protected void onOverScrolled(int scrollX, int scrollY, boolean clampedX, boolean clampedY) {
        super.onOverScrolled(scrollX, scrollY, clampedX, clampedY);
        if (clampedY) {
            if (!isScrollToEnd) {
                isScrollToEnd = true;
                if (scrollY > 0) {
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
