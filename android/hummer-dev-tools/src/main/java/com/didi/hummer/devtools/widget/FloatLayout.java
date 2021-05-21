package com.didi.hummer.devtools.widget;

import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import android.view.animation.DecelerateInterpolator;
import android.widget.FrameLayout;

import com.didi.hummer.utils.BarUtils;
import com.didi.hummer.utils.ScreenUtils;

/**
 * 可拖动和边缘吸附的Layout
 * <p>
 * Created by XiaoFeng on 2020/4/30.
 */
public class FloatLayout extends FrameLayout {

    private int statusBarHeight;
    private int maxWidth;
    private int maxHeight;
    private int viewWidth;
    private int viewHeight;
    private float lastX;
    private float lastY;
    private long touchDownTimestamp;

    public FloatLayout(Context context) {
        this(context, null);
    }

    public FloatLayout(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public FloatLayout(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);
    }

    private void init(Context context) {
        statusBarHeight = BarUtils.getStatusBarHeight(getContext());
        maxWidth = ScreenUtils.getScreenWidth(context);
        maxHeight = ScreenUtils.getScreenHeight(context) - statusBarHeight - BarUtils.getNavBarHeight(context);
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                clearAnimation();
                lastX = event.getRawX();
                lastY = event.getRawY();
                viewWidth = getWidth();
                viewHeight = getHeight();
                if (getParent() != null && getParent() instanceof View) {
                    maxWidth = ((View) getParent()).getWidth();
                    maxHeight = ((View) getParent()).getHeight();
                }
                touchDownTimestamp = System.currentTimeMillis();
                break;
            case MotionEvent.ACTION_MOVE:
                float moveX = event.getRawX() - lastX;
                float moveY = event.getRawY() - lastY;
                float viewX = getX() + moveX;
                float viewY = getY() + moveY;
                viewX = viewX < 0 ? 0 : (viewX + viewWidth > maxWidth) ? (maxWidth - viewWidth) : viewX;
                viewY = viewY < 0 ? 0 : (viewY + viewHeight) > maxHeight ? (maxHeight - viewHeight) : viewY;
                setX(viewX);
                setY(viewY);
                lastX = event.getRawX();
                lastY = event.getRawY();
                break;
            case MotionEvent.ACTION_UP:
                float centerX = getX() + viewWidth / 2f;
                if (centerX > maxWidth / 2f) {
                    // 靠右吸附
                    animate().setInterpolator(new DecelerateInterpolator())
                            .setDuration(200)
                            .xBy(maxWidth - viewWidth - getX())
                            .start();
                } else {
                    // 靠左吸附
                    animate().setInterpolator(new DecelerateInterpolator())
                            .setDuration(200)
                            .x(0)
                            .start();
                }

                // 响应点击事件
                if (System.currentTimeMillis() - touchDownTimestamp < 200) {
                    performClick();
                }
                break;
            default:
                break;
        }
        return true;
    }
}
