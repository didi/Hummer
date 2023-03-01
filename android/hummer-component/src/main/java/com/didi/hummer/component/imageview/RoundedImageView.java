package com.didi.hummer.component.imageview;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapShader;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.DashPathEffect;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PathEffect;
import android.graphics.RectF;
import android.graphics.Shader;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.text.TextUtils;
import android.util.AttributeSet;

import androidx.annotation.IntDef;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.AppCompatImageView;


public class RoundedImageView extends AppCompatImageView {


    private static final Bitmap.Config BITMAP_CONFIG = Bitmap.Config.ARGB_8888;
    private static final int COLORDRAWABLE_DIMENSION = 1;

    private final RectF mDrawableRect = new RectF();
    private final RectF mBorderRect = new RectF();

    private final Matrix mShaderMatrix = new Matrix();
    private final Paint mBitmapPaint = new Paint();
    private final Paint mBorderPaint = new Paint();

    private final Path roundPath = new Path();

    private int mBorderColor = 0;
    private float mBorderWidth = Color.TRANSPARENT;
    private @BorderStyle int mBorderStyle = BorderStyle.NONE;

    private Bitmap mBitmap;
    private BitmapShader mBitmapShader;
    private int mBitmapWidth;
    private int mBitmapHeight;

    /**
     * 圆形半径
     */
    private float mCircleRadius;
    /**
     * 圆角半径
     */
    private float mRoundRadius;

    /**
     * 裁剪圆角用，用于支持单边圆角设置
     */
    private RectF mClipBounds = new RectF();
    private Path mViewPath = new Path();
    private float[] mCornerRadii;
    /**
     * 圆角幅度百分比（如80%，即0.8）
     */
    private float mRoundRadiusPercent;

    private boolean mReady;
    private boolean mSetupPending;

    public RoundedImageView(Context context) {
        this(context, null);
    }

    public RoundedImageView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public RoundedImageView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);

        mReady = true;

        if (mSetupPending) {
            setup();
            mSetupPending = false;
        }
    }

    @Override
    protected void onDraw(Canvas canvas) {
        if (getDrawable() == null) {
            return;
        }

        // 先这么简单出来单边圆角的情况
        if (mCornerRadii != null) {
            mClipBounds.set(0, 0, getWidth(), getHeight());
            mViewPath.reset();
            mViewPath.addRoundRect(mClipBounds, mCornerRadii, Path.Direction.CW);
            canvas.clipPath(mViewPath);
        }

        // 把百分比转换成真实的Radius
        if (mRoundRadius <= 0 && mRoundRadiusPercent > 0) {
            mRoundRadius = Math.min(getWidth(), getHeight()) * mRoundRadiusPercent;
        }

        if (mRoundRadius <= 0) {
            super.onDraw(canvas);
        } else if (mRoundRadius >= Math.min(mDrawableRect.height() / 2f, mDrawableRect.width() / 2f)) {
            canvas.drawCircle(getWidth() / 2f, getHeight() / 2f, mCircleRadius, mBitmapPaint);
        } else {
            roundPath.reset();
            roundPath.addRoundRect(mDrawableRect, mRoundRadius, mRoundRadius, Path.Direction.CW);
            canvas.drawPath(roundPath, mBitmapPaint);
        }

        if (mBorderWidth > 0) {
            if (mRoundRadius <= 0) {
                canvas.drawRect(mBorderRect, mBorderPaint);
            } else if (mRoundRadius >= Math.min(mDrawableRect.height() / 2f, mDrawableRect.width() / 2f)) {
                float radius = mCircleRadius;
                canvas.drawCircle(getWidth() / 2f, getHeight() / 2f, radius, mBorderPaint);
            } else {
                roundPath.reset();
                roundPath.addRoundRect(mBorderRect, mRoundRadius, mRoundRadius, Path.Direction.CW);
                canvas.drawPath(roundPath, mBorderPaint);
            }
        }
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        setup();
    }

    public int getBorderColor() {
        return mBorderColor;
    }

    public void setBorderColor(int borderColor) {
        if (borderColor == mBorderColor) {
            return;
        }

        mBorderColor = borderColor;
        mBorderPaint.setColor(mBorderColor);
        invalidate();
    }

    public float getBorderWidth() {
        return mBorderWidth;
    }

    public void setBorderWidth(float borderWidth) {
        // if (mBorderWidth == borderWidth)
        if (Math.abs(mBorderWidth - borderWidth) < 0.00000001) {
            return;
        }

        mBorderWidth = borderWidth;
        setup();
    }

    public void setBorderStyle(String style) {
        int borderStyle = getStyle(style);
        if (mBorderStyle == borderStyle) {
            return;
        }

        mBorderStyle = borderStyle;
        setup();
    }

    protected void setBorderRadius(float roundRadius) {
        // if (mRoundRadius == roundRadius)
        if (Math.abs(mRoundRadius - roundRadius) < 0.00000001) {
            return;
        }

        mRoundRadius = roundRadius;
        mRoundRadiusPercent = 0;
        setup();
    }

    protected void setBorderRadiusPercent(float roundRadiusPercent) {
        if (Math.abs(mRoundRadiusPercent - roundRadiusPercent) < 0.00000001) {
            return;
        }

        mRoundRadiusPercent = roundRadiusPercent;
        mRoundRadius = 0;
        setup();
    }

    public void setCornerRadii(float[] radii) {
        mCornerRadii = radii;
    }

    @Override
    public void setImageBitmap(Bitmap bm) {
        super.setImageBitmap(bm);
        mBitmap = bm;
        setup();
    }

    @Override
    public void setImageDrawable(Drawable drawable) {
        super.setImageDrawable(drawable);
        mBitmap = getBitmapFromDrawable(drawable);
        setup();
    }

    @Override
    public void setImageResource(int resId) {
        super.setImageResource(resId);
        mBitmap = getBitmapFromDrawable(getDrawable());
        setup();
    }

    private Bitmap getBitmapFromDrawable(Drawable drawable) {
        if (drawable == null) {
            return null;
        }

        if (drawable instanceof BitmapDrawable) {
            return ((BitmapDrawable) drawable).getBitmap();
        }

        try {
            Bitmap bitmap;

            if (drawable instanceof ColorDrawable) {
                bitmap = Bitmap.createBitmap(COLORDRAWABLE_DIMENSION,
                        COLORDRAWABLE_DIMENSION, BITMAP_CONFIG);
            } else {
                bitmap = Bitmap.createBitmap(drawable.getIntrinsicWidth(),
                        drawable.getIntrinsicHeight(), BITMAP_CONFIG);
            }

            Canvas canvas = new Canvas(bitmap);
            drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
            drawable.draw(canvas);
            return bitmap;
        } catch (OutOfMemoryError e) {
            return null;
        }
    }

    private void setup() {
        if (!mReady) {
            mSetupPending = true;
            return;
        }

        if (mBitmap == null) {
            return;
        }

        mBitmapShader = new BitmapShader(mBitmap, Shader.TileMode.CLAMP, Shader.TileMode.CLAMP);

        mBitmapPaint.setAntiAlias(true);
        mBitmapPaint.setShader(mBitmapShader);

        mBorderPaint.setStyle(Paint.Style.STROKE);
        mBorderPaint.setAntiAlias(true);
        mBorderPaint.setColor(mBorderColor);
        mBorderPaint.setStrokeWidth(mBorderWidth);
        mBorderPaint.setPathEffect(makePathEffect(mBorderStyle, mBorderWidth));

        mBitmapHeight = mBitmap.getHeight();
        mBitmapWidth = mBitmap.getWidth();

        mBorderRect.set(mBorderWidth / 2, mBorderWidth / 2, getWidth() - mBorderWidth / 2, getHeight() - mBorderWidth / 2);

        mDrawableRect.set(mBorderWidth / 2, mBorderWidth / 2, getWidth() - mBorderWidth / 2, getHeight() - mBorderWidth / 2);
        mCircleRadius = Math.min(mDrawableRect.height() / 2, mDrawableRect.width() / 2);

        updateShaderMatrix();
        invalidate();
    }

    private void updateShaderMatrix() {
        float scale;
        float dx = 0;
        float dy = 0;

        mShaderMatrix.set(null);

        if (mBitmapWidth * mDrawableRect.height() > mDrawableRect.width() * mBitmapHeight) {
            scale = mDrawableRect.height() / (float) mBitmapHeight;
            dx = (mDrawableRect.width() - mBitmapWidth * scale) * 0.5f;
        } else {
            scale = mDrawableRect.width() / (float) mBitmapWidth;
            dy = (mDrawableRect.height() - mBitmapHeight * scale) * 0.5f;
        }

        mShaderMatrix.setScale(scale, scale);
        mShaderMatrix.postTranslate((int) (dx + 0.5f) + mBorderWidth, (int) (dy + 0.5f) + mBorderWidth);

        mBitmapShader.setLocalMatrix(mShaderMatrix);
    }

    @IntDef
    public @interface BorderStyle {
        int NONE      = 0;
        int SOLID     = 1;
        int DASHED    = 2;
        int DOTTED    = 3;
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
}
