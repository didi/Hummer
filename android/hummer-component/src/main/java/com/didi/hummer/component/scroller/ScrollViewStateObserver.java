package com.didi.hummer.component.scroller;

import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.view.MotionEvent;

import static com.didi.hummer.component.scroller.ScrollViewStateObserver.OnScrollStateListener.SCROLL_STATE_IDLE;
import static com.didi.hummer.component.scroller.ScrollViewStateObserver.OnScrollStateListener.SCROLL_STATE_SCROLLING;
import static com.didi.hummer.component.scroller.ScrollViewStateObserver.OnScrollStateListener.SCROLL_STATE_SCROLL_FINISH;
import static com.didi.hummer.component.scroller.ScrollViewStateObserver.OnScrollStateListener.SCROLL_STATE_SCROLL_START;
import static com.didi.hummer.component.scroller.ScrollViewStateObserver.OnScrollStateListener.SCROLL_STATE_SCROLL_TOUCH_UP;

/**
 * ScrollView滚动状态变化的观察器
 *
 * Created by XiaoFeng on 2020/10/25.
 */
public class ScrollViewStateObserver {

    public interface OnScrollStateListener {

        /**
         * 初始状态
         */
        int SCROLL_STATE_IDLE = 0;

        /**
         * 滚动开始
         */
        int SCROLL_STATE_SCROLL_START = 1;

        /**
         * 滚动中
         */
        int SCROLL_STATE_SCROLLING = 2;

        /**
         * 滚动中（手指离开屏幕瞬间，只会来一次）
         */
        int SCROLL_STATE_SCROLL_TOUCH_UP = 3;

        /**
         * 滚动结束
         */
        int SCROLL_STATE_SCROLL_FINISH = 4;

        void onScrollStateChanged(int state);
    }

    private static final int CHECK_SCROLL_STOP_DELAY_MILLIS = 40;
    private static final int MSG_SCROLL = 1;

    private int mCurScroll = 0;
    private boolean mIsScrollStarted = false;
    private boolean mIsTouched = false;
    private int mScrollState = SCROLL_STATE_IDLE;

    private OnScrollStateListener mOnScrollStateListener;

    private final Handler mHandler = new Handler(Looper.getMainLooper(), new Handler.Callback() {

        private int mLastScroll = Integer.MIN_VALUE;

        @Override
        public boolean handleMessage(Message msg) {
            if (msg.what == MSG_SCROLL) {
                final int scroll = mCurScroll;
                if (!mIsTouched && mLastScroll == scroll) {
                    mLastScroll = Integer.MIN_VALUE;
                    setScrollState(SCROLL_STATE_SCROLL_FINISH);
                } else {
                    mLastScroll = scroll;
                    restartCheckStopTiming();
                }
                return true;
            }
            return false;
        }
    });

    private void restartCheckStopTiming() {
        mHandler.removeMessages(MSG_SCROLL);
        mHandler.sendEmptyMessageDelayed(MSG_SCROLL, CHECK_SCROLL_STOP_DELAY_MILLIS);
    }

    public void release() {
        mHandler.removeCallbacksAndMessages(null);
    }

    public void setOnScrollStateListener(OnScrollStateListener listener) {
        mOnScrollStateListener = listener;
    }

    public void onInterceptTouchEvent(MotionEvent ev) {
        handleDownEvent(ev);
    }

    public void onTouchEvent(MotionEvent ev) {
        handleUpEvent(ev);
    }

    public void onScrollChanged(int scroll, int oldScroll) {
        mCurScroll = scroll;
        if (!mIsScrollStarted) {
            mIsScrollStarted = true;
            setScrollState(SCROLL_STATE_SCROLL_START);
        }
        if (mIsTouched) {
            setScrollState(SCROLL_STATE_SCROLLING);
        } else {
            setScrollState(SCROLL_STATE_SCROLL_TOUCH_UP);
        }
    }

    private void handleDownEvent(MotionEvent ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                mIsScrollStarted = false;
                mIsTouched = true;
                break;
        }
    }

    private void handleUpEvent(MotionEvent ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                mIsTouched = false;
                restartCheckStopTiming();
                break;
        }
    }

    private void setScrollState(int state) {
        if (mScrollState != state) {
            mScrollState = state;
            if (mOnScrollStateListener != null) {
                mOnScrollStateListener.onScrollStateChanged(state);
            }
        }
    }

}
