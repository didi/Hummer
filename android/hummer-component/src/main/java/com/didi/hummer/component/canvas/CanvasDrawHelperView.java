package com.didi.hummer.component.canvas;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.RectF;
import android.support.annotation.Nullable;
import android.text.Layout.Alignment;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;

import com.didi.hummer.annotation.JsMethod;

import java.util.ArrayList;
import java.util.List;

public class CanvasDrawHelperView extends View {

    private static final String TAG = "CanvasDrawHelperView";

    private CanvasContext canvasContext = new CanvasContext();

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

    public CanvasContext getCanvasContext() {
        return canvasContext;
    }

    private Paint getPaint() {
        return canvasContext.getPaint();
    }

    private TextPaint getTextPaint() {
        return canvasContext.getTextPaint();
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
    public void drawImage(Bitmap bitmap, float x, float y, float dWidth, float dHeight) {
        int width = bitmap.getWidth();
        int height = bitmap.getHeight();
        Matrix matrix = new Matrix();
        float scaleWidth = ((float) dWidth) / width;
        float scaleHeight = ((float) dHeight) / height;
        matrix.postScale(scaleWidth, scaleHeight);
        Bitmap newBitmap = Bitmap.createBitmap(bitmap, 0, 0, width, height, matrix, true);
        actions.add(canvas -> canvas.drawBitmap(newBitmap, x, y, getPaint()));
        invalidate();
    }

    /**
     * 绘制矩形 实心
     */
    public void fillRect(float x, float y, float width, float height) {
        Log.i(TAG, "fillRect do");
        getPaint().setStyle(Paint.Style.FILL);
        actions.add(canvas -> {
            Log.i(TAG, "fillRect Action");
            Rect rect = new Rect((int) x, (int) y, (int) (x + width), (int) (y + height));
            canvas.drawRect(rect, getPaint());
        });
        invalidate();
    }

    /**
     * 绘制矩形 镂空
     */
    public void strokeRect(float x, float y, float width, float height) {
        getPaint().setStyle(Paint.Style.STROKE);
        actions.add(canvas -> {
            Rect rect = new Rect((int) x, (int) y, (int) (x + width), (int) (y + height));
            canvas.drawRect(rect, getPaint());
        });
        invalidate();
    }

    /**
     * 绘制圆形 实心
     */
    public void fillCircle(float x, float y, float radius) {
        getPaint().setStyle(Paint.Style.FILL);
        actions.add(canvas -> canvas.drawCircle(x, y, radius, getPaint()));
        invalidate();
    }

    /**
     * 绘制圆形 镂空
     */
    public void strokeCircle(float x, float y, float radius) {
        getPaint().setStyle(Paint.Style.STROKE);
        actions.add(canvas -> canvas.drawCircle(x, y, radius, getPaint()));
        invalidate();
    }

    public void fontSize(float size) {
        getTextPaint().setTextSize(size);
    }

    /**
     * Text 绘制改为左上角起始绘制 该方式和IOS 保持一致 且符合StaticLayout 绘制能力
     */
    public void fillText(String text, float x, float y, int maxWidth) {
        actions.add(canvas -> {
            StaticLayout staticLayout = new StaticLayout(text, getTextPaint(), maxWidth, Alignment.ALIGN_NORMAL, 1, 0, true);
            canvas.save();
            canvas.translate(x, y);
            staticLayout.draw(canvas);
            canvas.restore();
        });
        invalidate();
    }

    public void arc(float x, float y, float radius, float startAngle, float endAngle, int clockwise) {
        actions.add(canvas -> {
            RectF rectF = new RectF(x - radius, y - radius, x + radius, y + radius);
            canvas.drawArc(rectF, startAngle, endAngle, false, getPaint());
        });
    }

    public void drawLine(float startX, float startY, float stopX, float stopY) {
        Log.i(TAG, "drawLine do");
        actions.add(canvas -> {
            Log.i(TAG, "drawLine Action");
            canvas.drawLine(startX, startY, stopX, stopY, getPaint());
        });
        invalidate();
    }

    public void drawLines(float[] points) {
        actions.add(canvas -> {
            Log.i(TAG, "drawLines Action");
            canvas.drawLines(points, getPaint());
        });
        invalidate();
    }

    public void drawPath(CanvasPath path) {
        actions.add(canvas -> canvas.drawPath(path.getPath(), getPaint()));
        invalidate();
    }

    public void ellipse(float left, float top, float right, float bottom) {
        actions.add(canvas -> {
            RectF rectF = new RectF(left, top, right, bottom);
            canvas.drawOval(rectF, getPaint());
        });
        invalidate();
    }


    //==============canvas context==============


    public void lineWidth(float w) {
        actions.add(canvas -> {
           canvasContext.lineWidth(w);
        });
    }

    public void lineCap(int cap) {
        actions.add(canvas -> {
            canvasContext.lineCap(cap);
        });
    }


    public void lineColor(String color) {
        actions.add(canvas -> {
            canvasContext.lineColor(color);
        });
    }


    public void lineJoin(int join) {
        actions.add(canvas -> {
            canvasContext.lineJoin(join);
        });
    }


    public void fillColor(String color) {
        actions.add(canvas -> {
            canvasContext.fillColor(color);
        });
    }
}
