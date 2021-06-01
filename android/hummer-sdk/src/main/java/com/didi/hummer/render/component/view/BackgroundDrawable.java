package com.didi.hummer.render.component.view;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.ColorFilter;
import android.graphics.DashPathEffect;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PathEffect;
import android.graphics.PixelFormat;
import android.graphics.Rect;
import android.graphics.RectF;
import android.graphics.Region;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.GradientDrawable;
import android.os.Build;
import android.support.annotation.IntDef;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.TextUtils;

import com.didi.hummer.render.utility.RTLUtil;

import java.util.Arrays;

/**
 * 负责View背景渲染的Drawable，主要是为了处理设置单个角的边框相关属性，用GradientDrawable已经无法胜任
 *
 * Created by XiaoFeng on 2020-01-14.
 */
public class BackgroundDrawable extends Drawable {

    /**
     * 是否需要转换为RTL布局
     */
    private boolean needRTL = false;

    /**
     * 背景图片Drawable
     */
    private Drawable drawable;

    /**
     * 渐变背景色Drawable
     */
    private GradientDrawable gradientDrawable;

    /**
     * 普通背景颜色
     */
    private int color = Color.TRANSPARENT;

    /**
     * 边框
     */
    private Border border = new Border();

    /**
     * 阴影
     */
    private Shadow shadow;

    /**
     * 阴影的外边缘矩形（Android9.0以下使用）
     */
    private Rect shadowOuterBounds = new Rect();

    /**
     * 阴影的内边缘矩形（可能会比mOuterBoundsRect略向内收缩1像素，避免因像素对齐问题导致白边。Android9.0以下使用）
     */
    private RectF shadowInnerBounds = new RectF();

    /**
     * 背景画笔
     */
    private final Paint mBgPaint = new Paint(Paint.ANTI_ALIAS_FLAG);

    /**
     * 边框画笔
     */
    private final Paint mBorderPaint = new Paint(Paint.ANTI_ALIAS_FLAG);

    /**
     * 阴影画笔
     */
    private final Paint mShadowPaint = new Paint(Paint.ANTI_ALIAS_FLAG);

    /**
     * 外边缘路径
     */
    private final Path mOuterBoundsPath = new Path();

    /**
     * 内边缘路径
     */
    private final Path mInnerBoundsPath = new Path();

    /**
     * 整个边框路径
     */
    private final Path mWholeBorderPath = new Path();

    /**
     * 边框每个边的路径
     */
    private final Path mEachBorderPath = new Path();

    /**
     * 外边缘矩形区域
     */
    private final RectF mOuterBoundsRect = new RectF();

    /**
     * 内边缘矩形区域
     */
    private final RectF mInnerBoundsRect = new RectF();

    /**
     * 描边的矩形区域（需向内缩小1/2的描边宽度）
     */
    private final RectF mStrokeBoundsRect = new RectF();

    /**
     * 延伸后的内边缘矩形
     */
    private final RectF extendInnerRect = new RectF();

    /**
     * 外边缘矩形圆角
     */
    private final float[] mOuterRadii = new float[8];

    /**
     * 内边缘矩形圆角
     */
    private final float[] mInnerRadii = new float[8];

    /**
     * 描边的矩形圆角
     */
    private final float[] mStrokeRadii = new float[8];

    @IntDef
    public @interface BorderStyle {
        int NONE      = 0;
        int SOLID     = 1;
        int DASHED    = 2;
        int DOTTED    = 3;
    }

    public static class BorderRadius {
        float topLeftX;
        float topLeftY;
        float topRightX;
        float topRightY;
        float bottomRightX;
        float bottomRightY;
        float bottomLeftX;
        float bottomLeftY;
        float topLeftPercent;
        float topRightPercent;
        float bottomRightPercent;
        float bottomLeftPercent;

        public BorderRadius() {

        }

        public BorderRadius(float topLeftX, float topLeftY, float topRightX, float topRightY, float bottomRightX, float bottomRightY, float bottomLeftX, float bottomLeftY) {
            set(topLeftX, topLeftY, topRightX, topRightY, bottomRightX, bottomRightY, bottomLeftX, bottomLeftY);
        }

        public void set(float topLeftX, float topLeftY, float topRightX, float topRightY, float bottomRightX, float bottomRightY, float bottomLeftX, float bottomLeftY) {
            this.topLeftX = topLeftX;
            this.topLeftY = topLeftY;
            this.topRightX = topRightX;
            this.topRightY = topRightY;
            this.bottomRightX = bottomRightX;
            this.bottomRightY = bottomRightY;
            this.bottomLeftX = bottomLeftX;
            this.bottomLeftY = bottomLeftY;
        }

        public boolean isValid() {
            return topLeftX > 0 || topLeftY > 0 || topRightX > 0 || topRightY > 0 ||
                    bottomRightX > 0 || bottomRightY > 0 || bottomLeftX > 0 || bottomLeftY > 0 ||
                    topLeftPercent > 0 || topRightPercent > 0 || bottomRightPercent > 0 || bottomLeftPercent > 0;
        }

        /**
         * 根据百分比计算边框圆角
         */
        public void fillWithPercent(Rect bounds) {
            if (bounds == null || bounds.isEmpty()) {
                return;
            }
            if (topLeftPercent > 0) {
                if (topLeftX <= 0) {
                    topLeftX = bounds.width() * topLeftPercent / 100;
                }
                if (topLeftY <= 0) {
                    topLeftY = bounds.height() * topLeftPercent / 100;
                }
            }
            if (topRightPercent > 0 && topRightX <= 0 && topRightY <= 0) {
                if (topRightX <= 0) {
                    topRightX = bounds.width() * topRightPercent / 100;
                }
                if (topRightY <= 0) {
                    topRightY = bounds.height() * topRightPercent / 100;
                }
            }
            if (bottomRightPercent > 0 && bottomRightX <= 0 && bottomRightY <= 0) {
                if (bottomRightX <= 0) {
                    bottomRightX = bounds.width() * bottomRightPercent / 100;
                }
                if (bottomRightY <= 0) {
                    bottomRightY = bounds.height() * bottomRightPercent / 100;
                }
            }
            if (bottomLeftPercent > 0 && bottomLeftX <= 0 && bottomLeftY <= 0) {
                if (bottomLeftX <= 0) {
                    bottomLeftX = bounds.width() * bottomLeftPercent / 100;
                }
                if (bottomLeftY <= 0) {
                    bottomLeftY = bounds.height() * bottomLeftPercent / 100;
                }
            }
        }

        /**
         * 把边框圆角转换为RTL
         */
        public void toRTL() {
            float t = topLeftX;
            topLeftX = topRightX;
            topRightX = t;
            t = topLeftY;
            topLeftY = topRightY;
            topRightY = t;
            t = bottomLeftX;
            bottomLeftX = bottomRightX;
            bottomRightX = t;
            t = bottomLeftY;
            bottomLeftY = bottomRightY;
            bottomRightY = t;
            t = topLeftPercent;
            topLeftPercent = topRightPercent;
            topRightPercent = t;
            t = bottomLeftPercent;
            bottomLeftPercent = bottomRightPercent;
            bottomRightPercent = t;
        }
    }

    /**
     * 边框类
     */
    public static class Border {
        public Rect style;
        public RectF width;
        public Rect color;
        public BorderRadius radius;

        public Border() {
            this.style = new Rect(BorderStyle.SOLID, BorderStyle.SOLID, BorderStyle.SOLID, BorderStyle.SOLID);
            this.width = new RectF();
            this.color = new Rect();
            this.radius = new BorderRadius();
        }

        public Border(float width, int color, float radius) {
            this(width, color, radius, BorderStyle.SOLID);
        }

        public Border(float width, int color, float radius, @BorderStyle int style) {
            this.style = new Rect(style, style, style, style);
            this.width = new RectF(width, width, width, width);
            this.color = new Rect(color, color, color, color);
            this.radius = new BorderRadius(radius, radius, radius, radius, radius, radius, radius, radius);
        }

        /**
         * 是否有边框（包括边框宽度，边框颜色，和圆角）
         *
         * @return
         */
        public boolean hasBorder() {
            return hasStyleWidthColor() || hasRadius();
        }

        /**
         * 是否有边框样式、宽度和颜色
         *
         * @return
         */
        public boolean hasStyleWidthColor() {
            return hasStyle() && hasWidth() && hasColor();
        }

        /**
         * 是否有边框样式
         *
         * @return
         */
        public boolean hasStyle() {
            return style != null && (style.left != BorderStyle.NONE || style.top != BorderStyle.NONE || style.right != BorderStyle.NONE || style.bottom != BorderStyle.NONE);
        }

        /**
         * 是否有边框宽度
         *
         * @return
         */
        public boolean hasWidth() {
            return width != null && (width.left > 0 || width.top > 0 || width.right > 0 || width.bottom > 0);
        }

        /**
         * 是否有边框颜色
         *
         * @return
         */
        public boolean hasColor() {
            return color != null && (color.left != Color.TRANSPARENT || color.top != Color.TRANSPARENT || color.right != Color.TRANSPARENT || color.bottom != Color.TRANSPARENT);
        }

        /**
         * 是否有圆角
         *
         * @return
         */
        public boolean hasRadius() {
            return radius != null && radius.isValid();
        }

        /**
         * 是否所有边框都一样
         *
         * @return
         */
        public boolean isAllBorderSame() {
            return style.left == style.top && style.left == style.right && style.left == style.bottom
                    && width.left == width.top && width.left == width.right && width.left == width.bottom
                    && color.left == color.top && color.left == color.right && color.left == color.bottom;
        }

        public static @BorderStyle int getStyle(String styleName) {
            if (TextUtils.isEmpty(styleName)) {
                return BorderStyle.SOLID;
            }

            switch (styleName.toUpperCase()) {
                case "SOLID":
                    return BorderStyle.SOLID;
                case "DASHED":
                    return BorderStyle.DASHED;
                case "DOTTED":
                    return BorderStyle.DOTTED;
                default:
                    return BorderStyle.NONE;
            }
        }

        /**
         * 把边框圆角转换为RTL
         */
        public void toRTL() {
            RTLUtil.toRTLRect(style);
            RTLUtil.toRTLRect(width);
            RTLUtil.toRTLRect(color);
            radius.toRTL();
        }
    }

    /**
     * 阴影类
     */
    public static class Shadow {
        public float radius;
        public float dx;
        public float dy;
        public int color;

        public Shadow(float radius, float dx, float dy, int color) {
            this.radius = radius;
            this.dx = dx;
            this.dy = dy;
            this.color = color;
        }
    }

    public BackgroundDrawable() {
    }

    public BackgroundDrawable(boolean needRTL) {
        this.needRTL = needRTL;
    }

    @Override
    public void draw(@NonNull Canvas canvas) {
        if (!border.hasBorder()) {
            drawShadowIfNeed(canvas);
            drawBackground(canvas);
        } else {
            initBorderData();
            drawShadowIfNeed(canvas);
            drawBackgroundWithBorder(canvas);
        }
    }

    private void initBorderData() {
        fixedBorderWidth();
        RectF width = border.width;
        BorderRadius radius = border.radius;
        radius.fillWithPercent(getBounds());

        if (needRTL) {
            border.toRTL();
        }

        mOuterBoundsRect.set(getBounds());

        mInnerBoundsRect.set(getBounds());
        mInnerBoundsRect.left += width.left;
        mInnerBoundsRect.top += width.top;
        mInnerBoundsRect.right -= width.right;
        mInnerBoundsRect.bottom -= width.bottom;

        mStrokeBoundsRect.set(getBounds());
        mStrokeBoundsRect.left += width.left / 2;
        mStrokeBoundsRect.top += width.top / 2;
        mStrokeBoundsRect.right -= width.right / 2;
        mStrokeBoundsRect.bottom -= width.bottom / 2;

        mOuterRadii[0] = radius.topLeftX;
        mOuterRadii[1] = radius.topLeftY;
        mOuterRadii[2] = radius.topRightX;
        mOuterRadii[3] = radius.topRightY;
        mOuterRadii[4] = radius.bottomRightX;
        mOuterRadii[5] = radius.bottomRightY;
        mOuterRadii[6] = radius.bottomLeftX;
        mOuterRadii[7] = radius.bottomLeftY;

        mInnerRadii[0] = Math.max(radius.topLeftX - width.left, 0);
        mInnerRadii[1] = Math.max(radius.topLeftY - width.top, 0);
        mInnerRadii[2] = Math.max(radius.topRightX - width.right, 0);
        mInnerRadii[3] = Math.max(radius.topRightY - width.top, 0);
        mInnerRadii[4] = Math.max(radius.bottomRightX - width.right, 0);
        mInnerRadii[5] = Math.max(radius.bottomRightY - width.bottom, 0);
        mInnerRadii[6] = Math.max(radius.bottomLeftX - width.left, 0);
        mInnerRadii[7] = Math.max(radius.bottomLeftY - width.bottom, 0);

        mStrokeRadii[0] = Math.max(radius.topLeftX - width.left / 2, 0);
        mStrokeRadii[1] = Math.max(radius.topLeftY - width.top / 2, 0);
        mStrokeRadii[2] = Math.max(radius.topRightX - width.right / 2, 0);
        mStrokeRadii[3] = Math.max(radius.topRightY - width.top / 2, 0);
        mStrokeRadii[4] = Math.max(radius.bottomRightX - width.right / 2, 0);
        mStrokeRadii[5] = Math.max(radius.bottomRightY - width.bottom / 2, 0);
        mStrokeRadii[6] = Math.max(radius.bottomLeftX - width.left / 2, 0);
        mStrokeRadii[7] = Math.max(radius.bottomLeftY - width.bottom / 2, 0);
    }

    /**
     * 修正边框宽度
     */
    private void fixedBorderWidth() {
        Rect bounds = getBounds();

        // 如果左边框宽度+右边框宽度>总View的宽度，则按比例缩小边框宽度
        if (bounds.width() > 0 && border.width.left + border.width.right > bounds.width()) {
            border.width.left = bounds.width() * border.width.left / (border.width.left + border.width.right);
            border.width.right = bounds.width() - border.width.left;
        }

        // 如果上边框宽度+下边框宽度>总View的高度，则按比例缩小边框高度
        if (bounds.height() > 0 && border.width.top + border.width.bottom > bounds.height()) {
            border.width.top = bounds.height() * border.width.top / (border.width.top + border.width.bottom);
            border.width.bottom = bounds.height() - border.width.top;
        }
    }

    /**
     * 画不带border的普通背景（优先级：图片 > 渐变色 > 单色）
     *
     * @param canvas
     */
    private void drawBackground(Canvas canvas) {
        if (drawable != null) {
            drawable.setBounds(getBounds());
            drawable.draw(canvas);
        } else if (gradientDrawable != null) {
            gradientDrawable.setBounds(getBounds());
            gradientDrawable.draw(canvas);
        } else if (color != Color.TRANSPARENT) {
            mBgPaint.setColor(color);
            mBgPaint.setStyle(Paint.Style.FILL);
            canvas.drawRect(getBounds(), mBgPaint);
        }
    }

    /**
     * 画带border的背景
     *
     * @param canvas
     */
    private void drawBackgroundWithBorder(Canvas canvas) {
//        // 如果有圆角，先把canvas切掉圆角
//        if (border.hasRadius()) {
//            clipOuterRoundBounds(canvas);
//        }
//        // 画普通背景
//        drawBackground(canvas);

        // 画圆角背景（临时处理圆角锯齿问题）
        if (drawable != null) {
            // 如果有圆角，先把canvas切掉圆角
            if (border.hasRadius()) {
                clipOuterRoundBounds(canvas);
            }
            drawable.setBounds(getBounds());
            drawable.draw(canvas);
        } else if (gradientDrawable != null) {
            // 如果有圆角，先把canvas切掉圆角
            if (border.hasRadius()) {
                clipOuterRoundBounds(canvas);
            }
            gradientDrawable.setBounds(getBounds());
            gradientDrawable.draw(canvas);
        } else if (color != Color.TRANSPARENT) {
            mBgPaint.setColor(color);
            mBgPaint.setStyle(Paint.Style.FILL);
            // 临时处理圆角锯齿问题
            if (border.hasRadius() && !border.hasStyleWidthColor()) {
                mOuterBoundsPath.reset();
                mOuterBoundsPath.addRoundRect(mOuterBoundsRect, mOuterRadii, Path.Direction.CW);
                canvas.drawPath(mOuterBoundsPath, mBgPaint);
            } else {
                // 如果有圆角，先把canvas切掉圆角
                if (border.hasRadius()) {
                    clipOuterRoundBounds(canvas);
                }
                canvas.drawRect(getBounds(), mBgPaint);
            }
        } else {
            // 如果有圆角，先把canvas切掉圆角
            if (border.hasRadius()) {
                clipOuterRoundBounds(canvas);
            }
        }

        // 如果有边框宽度和颜色，画边框
        if (border.hasStyleWidthColor()) {
            drawBorders(canvas, border);
        }
    }

    /**
     * 画边框
     *
     * @param canvas
     * @param border
     */
    private void drawBorders(Canvas canvas, Border border) {
        if (border.isAllBorderSame()) {
            drawSameBorders(canvas, border);
        } else {
            drawEachBorders(canvas, border);
        }
    }

    /**
     * 所有边框都相同时，通过Stroke来画border
     *
     * @param canvas
     * @param border
     */
    private void drawSameBorders(Canvas canvas, Border border) {
        int borderStyle = border.style.left;
        float borderWidth = border.width.left;
        int borderColor = border.color.left;

        mBorderPaint.reset();
        mBorderPaint.setStyle(Paint.Style.STROKE);
        mBorderPaint.setStrokeWidth(borderWidth);
        mBorderPaint.setColor(borderColor);
        mBorderPaint.setPathEffect(makePathEffect(borderStyle, borderWidth));

        mWholeBorderPath.reset();
        if (border.hasRadius()) {
            mWholeBorderPath.addRoundRect(mStrokeBoundsRect, mStrokeRadii, Path.Direction.CW);
        } else {
            mWholeBorderPath.addRect(mStrokeBoundsRect, Path.Direction.CW);
        }
        canvas.drawPath(mWholeBorderPath, mBorderPaint);
    }

    /**
     * 所有边框不全相同时，通过path分别画各个边的border（各个边不同时，border样式只支持solid，不支持其他的样式）
     *
     * @param canvas
     * @param border
     */
    private void drawEachBorders(Canvas canvas, Border border) {
        canvas.save();

        if (border.hasRadius()) {
            clipBorderInnerRoundBounds(canvas);
        } else {
            clipBorderInnerRectBounds(canvas);
        }

        // 延伸后的内矩形
        if (border.hasRadius()) {
            // 如果是有圆角的，延伸后简化成两个点
            if (mInnerBoundsRect.width() > mInnerBoundsRect.height()) {
                float offsetY = mInnerBoundsRect.height() * border.width.top / (border.width.top + border.width.bottom);
                float offsetXL = offsetY * (float) Math.tan(border.width.left / (border.width.top + border.width.left) * Math.PI / 2);
                float offsetXR = offsetY * (float) Math.tan(border.width.right / (border.width.top + border.width.right) * Math.PI / 2);
                extendInnerRect.left = mInnerBoundsRect.left + offsetXL;
                extendInnerRect.right = mInnerBoundsRect.right - offsetXR;
                extendInnerRect.top = mInnerBoundsRect.top + offsetY;
                extendInnerRect.bottom = extendInnerRect.top;
            } else {
                float offsetX = mInnerBoundsRect.width() * border.width.left / (border.width.left + border.width.right);
                float offsetYT = offsetX * (float) Math.tan(border.width.top / (border.width.left + border.width.top) * Math.PI / 2);
                float offsetYB = offsetX * (float) Math.tan(border.width.bottom / (border.width.left + border.width.bottom) * Math.PI / 2);
                extendInnerRect.left = mInnerBoundsRect.left + offsetX;
                extendInnerRect.right = extendInnerRect.left;
                extendInnerRect.top = mInnerBoundsRect.top + offsetYT;
                extendInnerRect.bottom = mInnerBoundsRect.bottom - offsetYB;
            }
        } else {
            // 如果是没有圆角的，直接用内矩形
            extendInnerRect.set(mInnerBoundsRect);
        }

        RectF bounds = mOuterBoundsRect;

        // draw left border
        if (border.style.left != BorderStyle.NONE && border.width.left > 0 && border.color.left != Color.TRANSPARENT) {
            // 左上
            float x0 = bounds.left;
            float y0 = bounds.top;
            // 左下
            float x1 = x0;
            float y1 = bounds.bottom;
            // 右下
            float x2 = extendInnerRect.left;
            float y2 = extendInnerRect.bottom;
            // 右上
            float x3 = extendInnerRect.left;
            float y3 = extendInnerRect.top;

            drawEachBorder(canvas, border.color.left, x0, y0, x1, y1, x2, y2, x3, y3);
        }

        // draw top border
        if (border.style.top != BorderStyle.NONE && border.width.top > 0 && border.color.top != Color.TRANSPARENT) {
            // 左上
            float x0 = bounds.left;
            float y0 = bounds.top;
            // 右上
            float x1 = bounds.right;
            float y1 = y0;
            // 右下
            float x2 = extendInnerRect.right;
            float y2 = extendInnerRect.top;
            // 左下
            float x3 = extendInnerRect.left;
            float y3 = extendInnerRect.top;

            drawEachBorder(canvas, border.color.top, x0, y0, x1, y1, x2, y2, x3, y3);
        }

        // draw right border
        if (border.style.right != BorderStyle.NONE && border.width.right > 0 && border.color.right != Color.TRANSPARENT) {
            // 右上
            float x0 = bounds.right;
            float y0 = bounds.top;
            // 右下
            float x1 = x0;
            float y1 = bounds.bottom;
            // 左下
            float x2 = extendInnerRect.right;
            float y2 = extendInnerRect.bottom;
            // 左上
            float x3 = extendInnerRect.right;
            float y3 = extendInnerRect.top;

            drawEachBorder(canvas, border.color.right, x0, y0, x1, y1, x2, y2, x3, y3);
        }

        // draw bottom border
        if (border.style.bottom != BorderStyle.NONE && border.width.bottom > 0 && border.color.bottom != Color.TRANSPARENT) {
            // 左下
            float x0 = bounds.left;
            float y0 = bounds.bottom;
            // 右下
            float x1 = bounds.right;
            float y1 = y0;
            // 右上
            float x2 = extendInnerRect.right;
            float y2 = extendInnerRect.bottom;
            // 左上
            float x3 = extendInnerRect.left;
            float y3 = extendInnerRect.bottom;

            drawEachBorder(canvas, border.color.bottom, x0, y0, x1, y1, x2, y2, x3, y3);
        }

        canvas.restore();
    }

    /**
     * 画各个边的border
     */
    private void drawEachBorder(Canvas canvas, int color, float x0, float y0, float x1, float y1, float x2, float y2, float x3, float y3) {
        mBorderPaint.reset();
        mBorderPaint.setStyle(Paint.Style.FILL);
        mBorderPaint.setColor(color);

        mEachBorderPath.reset();
        mEachBorderPath.moveTo(x0, y0);
        mEachBorderPath.lineTo(x1, y1);
        mEachBorderPath.lineTo(x2, y2);
        mEachBorderPath.lineTo(x3, y3);
        mEachBorderPath.lineTo(x0, y0);
        canvas.drawPath(mEachBorderPath, mBorderPaint);
    }

    /**
     * 画阴影
     *
     * @param canvas
     */
    private void drawShadowIfNeed(Canvas canvas) {
        if (shadow == null) {
            return;
        }

        if (Build.VERSION.SDK_INT >= 28) {
            drawShadow(canvas);
        } else {
            drawShadowBelow_9_0(canvas);
        }
    }

    /**
     * Android9.0及以上的正常阴影画法
     *
     * @param canvas
     */
    private void drawShadow(Canvas canvas) {
        mShadowPaint.setColor(Color.WHITE);
        mShadowPaint.setStyle(Paint.Style.FILL);
        mShadowPaint.setShadowLayer(shadow.radius, shadow.dx, shadow.dy, shadow.color);
        if (border.hasRadius()) {
            mOuterBoundsPath.reset();
            mOuterBoundsPath.addRoundRect(mOuterBoundsRect, mOuterRadii, Path.Direction.CW);
            canvas.drawPath(mOuterBoundsPath, mShadowPaint);
        } else {
            canvas.drawRect(getBounds(), mShadowPaint);
        }
    }

    /**
     * Android9.0以下的阴影画法
     *
     * @param canvas
     */
    private void drawShadowBelow_9_0(Canvas canvas) {
        int offset = (int) (shadow.radius * 2.4f);
        shadowOuterBounds.set(getBounds());
        shadowOuterBounds.inset(-offset, -offset);

        // 创建阴影图片
        Bitmap shadowBitmap;
        try {
            // 可能会有OOM问题
            shadowBitmap = Bitmap.createBitmap(shadowOuterBounds.width(), shadowOuterBounds.height(), Bitmap.Config.ARGB_4444);
        } catch (Throwable tr) {
            tr.printStackTrace();
            return;
        }
        Canvas shadowCanvas = new Canvas(shadowBitmap);
        shadowCanvas.translate(-shadow.dx + offset, -shadow.dy + offset);

        // 生成阴影图片
        mShadowPaint.setColor(Color.WHITE);
        mShadowPaint.setStyle(Paint.Style.FILL);
        mShadowPaint.setShadowLayer(shadow.radius, shadow.dx, shadow.dy, shadow.color);
        if (border.hasRadius()) {
            shadowInnerBounds.set(mOuterBoundsRect);
            shadowInnerBounds.inset(1, 1);
            mOuterBoundsPath.reset();
            mOuterBoundsPath.addRoundRect(shadowInnerBounds, mOuterRadii, Path.Direction.CW);
            shadowCanvas.drawPath(mOuterBoundsPath, mShadowPaint);
        } else {
            shadowInnerBounds.set(getBounds());
            shadowInnerBounds.inset(1, 1);
            shadowCanvas.drawRect(shadowInnerBounds, mShadowPaint);
        }

        // 画阴影图片
        canvas.drawBitmap(shadowBitmap, shadow.dx - offset, shadow.dy - offset, null);

        // 释放阴影图片
        if (!shadowBitmap.isRecycled()) {
            shadowBitmap.recycle();
        }
    }

    /**
     * 按外边缘圆角剪切画布
     *
     * @param canvas
     */
    private void clipOuterRoundBounds(Canvas canvas) {
        mOuterBoundsPath.reset();
        mOuterBoundsPath.addRoundRect(mOuterBoundsRect, mOuterRadii, Path.Direction.CW);
        canvas.clipPath(mOuterBoundsPath);
    }

    /**
     * 按直角矩形边框内边缘剪切画布
     *
     * @param canvas
     */
    private void clipBorderInnerRectBounds(Canvas canvas) {
        mInnerBoundsPath.reset();
        mInnerBoundsPath.addRect(mInnerBoundsRect, Path.Direction.CW);
        canvas.clipPath(mInnerBoundsPath, Region.Op.DIFFERENCE);
    }

    /**
     * 按圆角矩形边框内边缘剪切画布
     *
     * @param canvas
     */
    private void clipBorderInnerRoundBounds(Canvas canvas) {
        mInnerBoundsPath.reset();
        mInnerBoundsPath.addRoundRect(mInnerBoundsRect, mInnerRadii, Path.Direction.CW);
        canvas.clipPath(mInnerBoundsPath, Region.Op.DIFFERENCE);
    }

    @Override
    public void setAlpha(int alpha) {

    }

    @Override
    public void setColorFilter(@Nullable ColorFilter colorFilter) {

    }

    @Override
    public int getOpacity() {
        return PixelFormat.TRANSPARENT;
    }

    public void setDrawable(Drawable drawable) {
        this.drawable = drawable;
        invalidateSelf();
    }

    public void setColor(int color) {
        this.color = color;
        gradientDrawable = null;
        drawable = null;
        invalidateSelf();
    }

    public void setColor(int deg, int[] colors) {
        if (colors != null && colors.length > 0) {
            gradientDrawable = new GradientDrawable(transOrientation(deg), colors);
            color = Color.TRANSPARENT;
            drawable = null;
            invalidateSelf();
        }
    }

    public void setColor(Object color) {
        if (color instanceof Integer) {
            setColor((int) color);
        } else if (color instanceof int[]) {
            int[] array = (int[]) color;
            int deg = array[0];
            int[] colors = Arrays.copyOfRange(array, 1, array.length);
            setColor(deg, colors);
        }
    }

    public int getColor() {
        return color;
    }

    private GradientDrawable.Orientation transOrientation(int deg) {
        deg %= 360;
        GradientDrawable.Orientation orientation;
        switch (deg) {
            case 0:
            default:
                orientation = GradientDrawable.Orientation.BOTTOM_TOP;
                break;
            case 45:
                orientation = GradientDrawable.Orientation.BL_TR;
                break;
            case 90:
                orientation = GradientDrawable.Orientation.LEFT_RIGHT;
                break;
            case 135:
                orientation = GradientDrawable.Orientation.TL_BR;
                break;
            case 180:
                orientation = GradientDrawable.Orientation.TOP_BOTTOM;
                break;
            case 225:
                orientation = GradientDrawable.Orientation.TR_BL;
                break;
            case 270:
                orientation = GradientDrawable.Orientation.RIGHT_LEFT;
                break;
            case 315:
                orientation = GradientDrawable.Orientation.BR_TL;
                break;
        }
        return orientation;
    }

    private @Nullable PathEffect makePathEffect(@BorderStyle int style, float borderWidth) {
        switch (style) {
            case BorderStyle.SOLID:
            default:
                return null;
            case BorderStyle.DASHED:
                return new DashPathEffect(
                        new float[] {borderWidth * 3, borderWidth * 3, borderWidth * 3, borderWidth * 3}, 0);
            case BorderStyle.DOTTED:
                return new DashPathEffect(
                        new float[] {borderWidth, borderWidth, borderWidth, borderWidth}, 0);
        }
    }

    public void setBorder(float width, int color, float radius, @BorderStyle int style) {
        this.border = new Border(width, color, radius, style);
        invalidateSelf();
    }

    public void setBorder(Border border) {
        this.border = border;
        invalidateSelf();
    }

    public void setBorderStyle(@BorderStyle int style) {
        border.style.set(style, style, style, style);
        invalidateSelf();
    }

    public void setBorderLeftStyle(@BorderStyle int style) {
        border.style.left = style;
        invalidateSelf();
    }

    public void setBorderTopStyle(@BorderStyle int style) {
        border.style.top = style;
        invalidateSelf();
    }

    public void setBorderRightStyle(@BorderStyle int style) {
        border.style.right = style;
        invalidateSelf();
    }

    public void setBorderBottomStyle(@BorderStyle int style) {
        border.style.bottom = style;
        invalidateSelf();
    }

    public void setBorderStyle(String style) {
        setBorderStyle(Border.getStyle(style));
    }

    public void setBorderLeftStyle(String style) {
        setBorderLeftStyle(Border.getStyle(style));
    }

    public void setBorderTopStyle(String style) {
        setBorderTopStyle(Border.getStyle(style));
    }

    public void setBorderRightStyle(String style) {
        setBorderRightStyle(Border.getStyle(style));
    }

    public void setBorderBottomStyle(String style) {
        setBorderBottomStyle(Border.getStyle(style));
    }

    public void setBorderWidth(float width) {
        border.width.set(width, width, width, width);
        invalidateSelf();
    }

    public void setBorderLeftWidth(float width) {
        border.width.left = width;
        invalidateSelf();
    }

    public void setBorderTopWidth(float width) {
        border.width.top = width;
        invalidateSelf();
    }

    public void setBorderRightWidth(float width) {
        border.width.right = width;
        invalidateSelf();
    }

    public void setBorderBottomWidth(float width) {
        border.width.bottom = width;
        invalidateSelf();
    }

    public void setBorderColor(int color) {
        border.color.set(color, color, color, color);
        invalidateSelf();
    }

    public void setBorderLeftColor(int color) {
        border.color.left = color;
        invalidateSelf();
    }

    public void setBorderTopColor(int color) {
        border.color.top = color;
        invalidateSelf();
    }

    public void setBorderRightColor(int color) {
        border.color.right = color;
        invalidateSelf();
    }

    public void setBorderBottomColor(int color) {
        border.color.bottom = color;
        invalidateSelf();
    }

    public void setBorderRadius(float radius) {
        border.radius.set(radius, radius, radius, radius, radius, radius, radius, radius);
        invalidateSelf();
    }

    public void setBorderTopLeftRadius(float radius) {
        border.radius.topLeftX = radius;
        border.radius.topLeftY = radius;
        invalidateSelf();
    }

    public void setBorderTopRightRadius(float radius) {
        border.radius.topRightX = radius;
        border.radius.topRightY = radius;
        invalidateSelf();
    }

    public void setBorderBottomRightRadius(float radius) {
        border.radius.bottomRightX = radius;
        border.radius.bottomRightY = radius;
        invalidateSelf();
    }

    public void setBorderBottomLeftRadius(float radius) {
        border.radius.bottomLeftX = radius;
        border.radius.bottomLeftY = radius;
        invalidateSelf();
    }

    public void setBorderRadiusPercent(float radiusPercent) {
        border.radius.topLeftPercent = radiusPercent;
        border.radius.topRightPercent = radiusPercent;
        border.radius.bottomRightPercent = radiusPercent;
        border.radius.bottomLeftPercent = radiusPercent;
        invalidateSelf();
    }

    public void setBorderTopLeftRadiusPercent(float radiusPercent) {
        border.radius.topLeftPercent = radiusPercent;
        invalidateSelf();
    }

    public void setBorderTopRightRadiusPercent(float radiusPercent) {
        border.radius.topRightPercent = radiusPercent;
        invalidateSelf();
    }

    public void setBorderBottomRightRadiusPercent(float radiusPercent) {
        border.radius.bottomRightPercent = radiusPercent;
        invalidateSelf();
    }

    public void setBorderBottomLeftRadiusPercent(float radiusPercent) {
        border.radius.bottomLeftPercent = radiusPercent;
        invalidateSelf();
    }

    public Border getBorder() {
        return border;
    }

    public float[] getBorderRadii() {
        return mOuterRadii;
    }

    public void setShadow(float radius, float dx, float dy, int color) {
        shadow = new Shadow(radius, dx, dy, color);
        invalidateSelf();
    }
}
