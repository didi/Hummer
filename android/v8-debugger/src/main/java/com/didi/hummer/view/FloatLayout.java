package com.didi.hummer.view;

import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;
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
    private float downx;
    private float downy;
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
                downx = event.getX();
                downy = event.getY();
                viewWidth = getWidth();
                viewHeight = getHeight();
                touchDownTimestamp = System.currentTimeMillis();
                break;
            case MotionEvent.ACTION_MOVE:
                float moveX = event.getRawX() - downx;
                float moveY = event.getRawY() - downy - statusBarHeight;
                moveX = moveX < 0 ? 0 : (moveX + viewWidth > maxWidth) ? (maxWidth - viewWidth) : moveX;
                moveY = moveY < 0 ? 0 : (moveY + viewHeight) > maxHeight ? (maxHeight - viewHeight) : moveY;
                this.setY(moveY);
                this.setX(moveX);
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
