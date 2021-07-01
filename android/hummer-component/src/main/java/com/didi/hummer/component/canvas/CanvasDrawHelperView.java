package com.didi.hummer.component.canvas;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.RectF;
import android.support.annotation.Nullable;
import android.text.Layout.Alignment;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.util.AttributeSet;
import android.view.View;

import com.didi.hummer.annotation.JsMethod;

import java.util.ArrayList;
import java.util.List;

public class CanvasDrawHelperView extends View {

    private Paint paint = new Paint();
    private TextPaint textPaint = new TextPaint();

    private interface CanvasAction {
        void draw(Canvas canvas);
    }

    private List<CanvasAction> actions = new ArrayList<>();

    public CanvasDrawHelperView(Context context) {
        super(context);
    }

    public CanvasDrawHelperView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public CanvasDrawHelperView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        for (CanvasAction action : actions) {
            action.draw(canvas);
        }
    }

    /**
     * 绘制图片
     */
    @JsMethod("drawImage")
    public void drawImage(Bitmap bitmap, float x, float y, float dWidth, float dHeight) {
        int width = bitmap.getWidth();
        int height = bitmap.getHeight();
        Matrix matrix = new Matrix();
        float scaleWidth = ((float) dWidth) / width;
        float scaleHeight = ((float) dHeight) / height;
        matrix.postScale(scaleWidth, scaleHeight);
        Bitmap newBitmap = Bitmap.createBitmap(bitmap, 0, 0, width, height, matrix, true);
        actions.add(canvas -> canvas.drawBitmap(newBitmap, x, y, paint));
        postInvalidate();
    }

    /**
     * 绘制矩形 实心
     */
    @JsMethod("fillRect")
    public void fillRect(float x, float y, float width, float height) {
        paint.setStyle(Paint.Style.FILL);
        actions.add(canvas -> {
            Rect rect = new Rect((int) x, (int) y, (int) (x + width), (int) (y + height));
            canvas.drawRect(rect, paint);
        });
        postInvalidate();
    }

    /**
     * 绘制矩形 镂空
     */
    @JsMethod("strokeRect")
    public void strokeRect(float x, float y, float width, float height) {
        paint.setStyle(Paint.Style.STROKE);
        actions.add(canvas -> {
            Rect rect = new Rect((int) x, (int) y, (int) (x + width), (int) (y + height));
            canvas.drawRect(rect, paint);
        });
        postInvalidate();
    }

    /**
     * 绘制圆形 实心
     */
    @JsMethod("fillCircle")
    public void fillCircle(float x, float y, float radius) {
        paint.setStyle(Paint.Style.FILL);
        actions.add(canvas -> canvas.drawCircle(x, y, radius, paint));
        postInvalidate();
    }

    /**
     * 绘制圆形 镂空
     */
    @JsMethod("strokeCircle")
    public void strokeCircle(float x, float y, float radius) {
        paint.setStyle(Paint.Style.STROKE);
        actions.add(canvas -> canvas.drawCircle(x, y, radius, paint));
        postInvalidate();
    }

    @JsMethod("fontSize")
    public void fontSize(float size) {
        textPaint.setTextSize(size);
    }

    /**
     * Text 绘制改为左上角起始绘制 该方式和IOS 保持一致 且符合StaticLayout 绘制能力
     */
    @JsMethod("fillText")
    public void fillText(String text, float x, float y, int maxWidth) {
        actions.add(canvas -> {
            StaticLayout staticLayout = new StaticLayout(text, textPaint, maxWidth, Alignment.ALIGN_NORMAL, 1, 0, true);
            canvas.save();
            canvas.translate(x, y);
            staticLayout.draw(canvas);
            canvas.restore();
        });
        postInvalidate();
    }

    @JsMethod("arc")
    public void arc(float x, float y, float radius, float startAngle, float endAngle, int clockwise) {
        actions.add(canvas -> {
            RectF rectF = new RectF(x - radius, y - radius, x + radius, y + radius);
            canvas.drawArc(rectF, startAngle, endAngle, false, paint);
        });
    }

    @JsMethod("drawLine")
    public void drawLine(float startX, float startY, float stopX, float stopY) {
        actions.add(canvas -> canvas.drawLine(startX, startY, stopX, stopY, paint));
        postInvalidate();
    }

    @JsMethod("drawLines")
    public void drawLines(float[] points) {
        actions.add(canvas -> canvas.drawLines(points, paint));
        postInvalidate();
    }

    @JsMethod("drawPath")
    public void drawPath(CanvasPath path) {
        actions.add(canvas -> canvas.drawPath(path.getPath(), paint));
        postInvalidate();
    }

    @JsMethod("ellipse")
    public void ellipse(float left, float top, float right, float bottom) {
        actions.add(canvas -> {
            RectF rectF = new RectF(left, top, right, bottom);
            canvas.drawOval(rectF, paint);
        });
        postInvalidate();
    }
}
