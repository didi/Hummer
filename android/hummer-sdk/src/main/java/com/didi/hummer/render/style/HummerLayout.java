package com.didi.hummer.render.style;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Path;
import android.graphics.RectF;
import android.support.annotation.NonNull;
import android.util.AttributeSet;
import android.view.ViewGroup;
import android.view.ViewParent;

import com.didi.hummer.render.component.view.HMBase;
import com.facebook.yoga.YogaConstants;
import com.facebook.yoga.YogaNode;
import com.facebook.yoga.android.YogaLayout;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Callable;

/**
 * 对YogaLayout做了一层封装，修复了YogaLayout的一些bug，支持了Hummer中对view的添加和删除等操作
 */
public class HummerLayout extends YogaLayout {

    public interface OnSizeChangeListener {
        void onSizeChanged(int w, int h, int oldw, int oldh);
    }

    /**
     * 存储所有子View，为了getElementById的时候可以找到对应的View
     */
    private Map<String, HMBase> children = new HashMap<>();

    /**
     * 裁剪视图用，用于支持overflow属性
     */
    private RectF mClipBounds = new RectF();
    private Path mViewPath = new Path();

    /**
     * 视图圆角信息获取器，用于动态获取视图圆角信息
     */
    private Callable<float[]> cornerRadiiGetter;

    /**
     * 保留上一次的子View，用于支持display:inline
     */
    private HMBase lastChild;

    /**
     * 是否需要裁剪子元素的超出部分
     */
    private boolean needClipChildren;

    /**
     * 检测容器大小变化
     */
    private OnSizeChangeListener onSizeChangeListener;

    public HummerLayout(Context context) {
        this(context, null);
    }

    public HummerLayout(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public HummerLayout(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);
    }

    private void init(Context context) {
        // 默认改成子View可以超出父容器，和iOS保持对齐
        setClipChildren(false);
    }

    public void setOnSizeChangeListener(OnSizeChangeListener listener) {
        onSizeChangeListener = listener;
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        if (onSizeChangeListener != null) {
            onSizeChangeListener.onSizeChanged(w, h, oldw, oldh);
        }
    }

    /**
     * 为了解决RecyclerView或ScrollView等不是YogaLayout的容器的子视图的高度自适应问题
     */
    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        // Either we are a root of a tree, or this function is called by our owner's onLayout, in which
        // case our r-l and b-t are the size of our node.
        if (!(getParent() instanceof YogaLayout)) {
            // **** 主要是重写这里的measure mode，MeasureSpec.EXACTLY -> MeasureSpec.UNSPECIFIED ****
            createLayout(
                    MeasureSpec.makeMeasureSpec(r - l, MeasureSpec.UNSPECIFIED),
                    MeasureSpec.makeMeasureSpec(b - t, MeasureSpec.UNSPECIFIED));
        }

        applyLayoutRecursive(getYogaNode(), 0, 0);
    }

    /**
     * 由于父类中的该方法是private的，所以这里只能重新copy一份
     */
    private void createLayout(int widthMeasureSpec, int heightMeasureSpec) {
        final int widthSize = MeasureSpec.getSize(widthMeasureSpec);
        final int heightSize = MeasureSpec.getSize(heightMeasureSpec);
        final int widthMode = MeasureSpec.getMode(widthMeasureSpec);
        final int heightMode = MeasureSpec.getMode(heightMeasureSpec);

        if (heightMode == MeasureSpec.EXACTLY) {
            getYogaNode().setHeight(heightSize);
        }
        if (widthMode == MeasureSpec.EXACTLY) {
            getYogaNode().setWidth(widthSize);
        }
        if (heightMode == MeasureSpec.AT_MOST) {
            getYogaNode().setMaxHeight(heightSize);
        }
        if (widthMode == MeasureSpec.AT_MOST) {
            getYogaNode().setMaxWidth(widthSize);
        }
        getYogaNode().calculateLayout(YogaConstants.UNDEFINED, YogaConstants.UNDEFINED);
    }

    /**
     * 由于父类中的该方法是private的，所以这里只能重新copy一份
     */
    private void applyLayoutRecursive(YogaNode node, float xOffset, float yOffset) {
        android.view.View view = (android.view.View) node.getData();

        if (view != null && view != this) {
            if (view.getVisibility() == GONE) {
                return;
            }
            int left = Math.round(xOffset + node.getLayoutX());
            int top = Math.round(yOffset + node.getLayoutY());
            view.measure(
                    android.view.View.MeasureSpec.makeMeasureSpec(
                            Math.round(node.getLayoutWidth()),
                            android.view.View.MeasureSpec.EXACTLY),
                    android.view.View.MeasureSpec.makeMeasureSpec(
                            Math.round(node.getLayoutHeight()),
                            android.view.View.MeasureSpec.EXACTLY));
            view.layout(left, top, left + view.getMeasuredWidth(), top + view.getMeasuredHeight());
        }

        final int childrenCount = node.getChildCount();
        for (int i = 0; i < childrenCount; i++) {
            if (this.equals(view)) {
                applyLayoutRecursive(node.getChildAt(i), xOffset, yOffset);
            } else if (view instanceof YogaLayout) {
                continue;
            } else {
                // 修复Scroller或List组件中间夹有原生ViewGroup的布局计算问题
//                applyLayoutRecursive(
//                        node.getChildAt(i),
//                        xOffset + node.getLayoutX(),
//                        yOffset + node.getLayoutY());
//                applyLayoutRecursive(node.getChildAt(i), xOffset, yOffset);
            }
        }
    }

    /**
     * 视图圆角信息获取器
     *
     * @param cornerRadiiGetter
     */
    public void setCornerRadiiGetter(Callable<float[]> cornerRadiiGetter) {
        this.cornerRadiiGetter = cornerRadiiGetter;
    }

    /**
     * 设置需要裁剪子元素的超出部分
     *
     * @param needClipChildren
     */
    public void setNeedClipChildren(boolean needClipChildren) {
        this.needClipChildren = needClipChildren;
    }

    /**
     * 切除容器圆角
     *
     * @param canvas
     */
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        if (needClipChildren) {
            mClipBounds.set(0, 0, getMeasuredWidth(), getMeasuredHeight());
            mViewPath.reset();

            // 获取视图圆角信息
            float[] cornerRadii = null;
            try {
                if (cornerRadiiGetter != null) {
                    cornerRadii = cornerRadiiGetter.call();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            if (cornerRadii != null) {
                mViewPath.addRoundRect(mClipBounds, cornerRadii, Path.Direction.CW);
            } else {
                mViewPath.addRect(mClipBounds, Path.Direction.CW);
            }
            canvas.clipPath(mViewPath);
        }
    }

    /**
     * 添加子视图
     *
     * @param subview 子视图
     */
    public void addView(@NonNull HMBase subview) {
        addView(subview, -1);
    }

    /**
     * 添加子视图
     *
     * @param subview 子视图
     * @param index 位置
     */
    public void addView(@NonNull HMBase subview, int index) {
        if (subview == null) {
            return;
        }

        // 兼容子控件被重复添加至多个父容器的问题："The specified child already has a parent."
        ViewParent parent = subview.getView().getParent();
        if (parent instanceof ViewGroup) {
            ((ViewGroup) parent).removeView(subview.getView());
        }

        addView(subview.getView(), subview.getYogaNode());

        // 当removeChild再addChild的时候，data会被置为null，需要重新setData
        if (subview.getYogaNode().getData() == null) {
            subview.getYogaNode().setData(subview.getView());
        }

        int childCount = getYogaNode().getChildCount();
        index = index < 0 ? childCount : index;
        getYogaNode().addChildAt(subview.getYogaNode(), index);

        children.put(subview.getViewID(), subview);
        if (index == childCount) {
            lastChild = subview;
        }
    }

    /**
     * 移除子视图
     *
     * @param subview 子视图
     */
    public void removeView(@NonNull HMBase subview) {
        if (subview == null) {
            return;
        }

        removeView(subview.getView());

        children.remove(subview.getViewID());
    }

    @Override
    public void removeAllViews() {
        super.removeAllViews();

        children.clear();
    }

    /**
     * 插入一个子视图
     *
     * @param subview      要插入的视图
     * @param existingView 在existingView之前插入子视图
     */
    public void insertBefore(@NonNull HMBase subview, @NonNull HMBase existingView) {
        if (subview == null || existingView == null) {
            return;
        }

        int index = getYogaNode().indexOf(existingView.getYogaNode());
        addView(subview, index);
    }

    /**
     * 替换子视图
     *
     * @param newSubview 新视图
     * @param oldSubview 旧视图
     */
    public void replaceView(@NonNull HMBase newSubview, @NonNull HMBase oldSubview) {
        if (newSubview == null || oldSubview == null) {
            return;
        }

        int index = getYogaNode().indexOf(oldSubview.getYogaNode());
        removeView(oldSubview);
        addView(newSubview, index);
    }

    public HMBase getViewById(String viewId) {
        return children.get(viewId);
    }

    public HMBase getLastChild() {
        return lastChild;
    }

    /**
     * 重新layout子视图
     */
    public void layout() {
        getYogaNode().calculateLayout(0, 0);
    }
}
