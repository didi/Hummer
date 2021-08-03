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
import android.util.Log;
import android.view.View;

import com.didi.hummer.render.style.HummerStyleUtils;
import com.didi.hummer.render.utility.DPUtil;

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

    private Paint getLinePaint() {
        return canvasContext.getLinePaint();
    }

    private Paint getFillPaint() {
        return canvasContext.getFillPaint();
    }

    private TextPaint getTextPaint() {
        return canvasContext.getTextPaint();
    }

    private float dp2px(Object v) {
        return HummerStyleUtils.convertNumber(v);
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
    public void drawImage(Bitmap bitmap, Object x, Object y, Object dWidth, Object dHeight) {
        actions.add(canvas -> {
            if (bitmap == null) {
                return;
            }
            int width = bitmap.getWidth();
            int height = bitmap.getHeight();
            Matrix matrix = new Matrix();
            float w_px = dp2px(dWidth);
            float h_px = dp2px(dHeight);
            float scaleWidth = w_px / width;
            float scaleHeight = h_px / height;
            matrix.postScale(scaleWidth, scaleHeight);
            Bitmap newBitmap = Bitmap.createBitmap(bitmap, 0, 0, width, height, matrix, true);
            float x_px = dp2px(x);
            float y_px = dp2px(y);
            canvas.drawBitmap(newBitmap, x_px, y_px, getLinePaint());
        });
        invalidate();
    }

    /**
     * 绘制矩形 实心
     */
    public void fillRect(Object x, Object y, Object width, Object height) {
        Log.i(TAG, "fillRect do");
        actions.add(canvas -> {
            getFillPaint().setStyle(Paint.Style.FILL);
            Log.i(TAG, "fillRect Action");
            float x_px = dp2px(x);
            float y_px = dp2px(y);
            float width_px = dp2px(width);
            float height_px = dp2px(height);
            Rect rect = new Rect((int) x_px, (int) y_px, (int) (x_px + width_px), (int) (y_px + height_px));
            canvas.drawRect(rect, getFillPaint());
        });
        invalidate();
    }

    /**
     * 绘制矩形 镂空
     */
    public void strokeRect(Object x, Object y, Object width, Object height) {
        actions.add(canvas -> {
            getLinePaint().setStyle(Paint.Style.STROKE);
            float x_px = dp2px(x);
            float y_px = dp2px(y);
            float width_px = dp2px(width);
            float height_px = dp2px(height);
            Rect rect = new Rect((int) x_px, (int) y_px, (int) (x_px + width_px), (int) (y_px + height_px));
            canvas.drawRect(rect, getLinePaint());
        });
        invalidate();
    }

    /**
     * 绘制圆形 实心
     */
    public void fillCircle(Object x, Object y, Object radius) {
        actions.add(canvas -> {
            getFillPaint().setStyle(Paint.Style.FILL);
            float x_px = dp2px(x);
            float y_px = dp2px(y);
            float radius_px = dp2px(radius);
            canvas.drawCircle(x_px, y_px, radius_px, getFillPaint());
        });
        invalidate();
    }

    /**
     * 绘制圆形 镂空
     */
    public void strokeCircle(Object x, Object y, Object radius) {
        actions.add(canvas -> {
            getLinePaint().setStyle(Paint.Style.STROKE);
            float x_px = dp2px(x);
            float y_px = dp2px(y);
            float radius_px = dp2px(radius);
            canvas.drawCircle(x_px, y_px, radius_px, getLinePaint());
        });
        invalidate();
    }

    public void fontSize(float size) {
        actions.add(canvas -> {
            float size_px = dp2px(size);
            getTextPaint().setTextSize(size_px);
        });
    }

    /**
     * Text 绘制改为左上角起始绘制 该方式和IOS 保持一致 且符合StaticLayout 绘制能力
     */
    public void fillText(String text, Object x, Object y, Object maxWidth) {
        actions.add(canvas -> {
            float x_px = dp2px(x);
            float y_px = dp2px(y);
            float width_px = dp2px(maxWidth);
            StaticLayout staticLayout = new StaticLayout(text, getTextPaint(), (int) width_px, Alignment.ALIGN_NORMAL, 1, 0, true);
            canvas.save();
            canvas.translate(x_px, y_px);
            staticLayout.draw(canvas);
            canvas.restore();
        });
        invalidate();
    }

    public void arc(Object x, Object y, Object radius, Object startAngle, Object endAngle, Object anticlockwise) {
        actions.add(canvas -> {
            float x_px = dp2px(x);
            float y_px = dp2px(y);
            float radius_px = dp2px(radius);
            boolean anticlockwiseBool = Boolean.parseBoolean(anticlockwise.toString());
            float startAngle_px = piToAngle(startAngle);
            float endAngle_px = piToAngle(endAngle);
            float sweepAngle =getSweepAngle(startAngle_px,endAngle_px,anticlockwiseBool);
            RectF rectF = new RectF(x_px - radius_px, y_px - radius_px, x_px + radius_px, y_px + radius_px);
            canvas.drawArc(rectF, startAngle_px, sweepAngle, false, getLinePaint());
        });
    }

    private float getSweepAngle(float startAngle, float endAngle, boolean anticlockwiseBool) {
        if (startAngle == endAngle) {
            return 0F;
        }

        if (anticlockwiseBool) {
            if (endAngle > startAngle) {
                return endAngle - (startAngle + 360);
            } else {
                return -Math.abs(startAngle - endAngle);
            }
        } else {
            //顺时针
            if (endAngle > startAngle) {
                return endAngle - startAngle;
            } else {
                return 360 - Math.abs(endAngle - startAngle);
            }
        }
    }

    private float piToAngle(Object pi) {
        double p = Double.parseDouble(pi.toString());
        double rate = p / Math.PI;
        return (float) (rate * 180);
    }

    public void drawLine(Object startX, Object startY, Object stopX, Object stopY) {
        Log.i(TAG, "drawLine do");
        actions.add(canvas -> {
            float x_start_px = dp2px(startX);
            float y_start_px = dp2px(startY);
            float x_stop_px = dp2px(stopX);
            float y_stop_px = dp2px(stopY);
            Log.i(TAG, "drawLine Action");
            canvas.drawLine(x_start_px, y_start_px, x_stop_px, y_stop_px, getLinePaint());
        });
        invalidate();
    }

    public void drawLines(Object[] points) {
        actions.add(canvas -> {
            float[] points_px = new float[points.length];
            for (int i = 0; i < points.length; i++) {
                points_px[i] = dp2px(points[i]);
            }
            Log.i(TAG, "drawLines Action");
            canvas.drawLines(points_px, getLinePaint());
        });
        invalidate();
    }

    public void drawPath(CanvasPath path) {
        actions.add(canvas -> {
            canvas.drawPath(path.getPath(), getLinePaint());
        });
        invalidate();
    }

    public void strokeEllipse(Object left, Object top, Object right, Object bottom) {
        actions.add(canvas -> {
            float left_px = dp2px(left);
            float top_px = dp2px(top);
            float right_px = dp2px(right);
            float bottom_px = dp2px(bottom);
            RectF rectF = new RectF(left_px, top_px, right_px, bottom_px);
            canvas.drawOval(rectF, getLinePaint());
        });
        invalidate();
    }

    public void fillEllipse(Object left, Object top, Object right, Object bottom) {
        actions.add(canvas -> {
            float left_px = dp2px(left);
            float top_px = dp2px(top);
            float right_px = dp2px(right);
            float bottom_px = dp2px(bottom);
            RectF rectF = new RectF(left_px, top_px, right_px, bottom_px);
            canvas.drawOval(rectF, getFillPaint());
        });
        invalidate();
    }


    //==============canvas context==============


    public void lineWidth(float w) {
        actions.add(canvas -> {
            float width_px = dp2px(w);
            canvasContext.lineWidth(width_px);
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

    public void textColor(String color) {
        actions.add(canvas -> {
            canvasContext.textColor(color);
        });
    }

}
