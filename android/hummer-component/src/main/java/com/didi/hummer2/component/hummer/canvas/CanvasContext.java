package com.didi.hummer2.component.hummer.canvas;

import android.graphics.Color;
import android.graphics.Paint;
import android.text.TextPaint;


public class CanvasContext {

    private static final String TAG = "CanvasDrawHelperView";

    private Paint linePaint = new Paint();
    private Paint fillPaint = new Paint();
    private TextPaint textPaint = new TextPaint();

    public CanvasContext() {
        fillPaint.setAntiAlias(true);
        linePaint.setAntiAlias(true);
        textPaint.setAntiAlias(true);
    }

    public Paint getLinePaint() {
        return linePaint;
    }

    public TextPaint getTextPaint() {
        return textPaint;
    }

    public Paint getFillPaint() {
        return fillPaint;
    }

    public void lineWidth(float w) {
        linePaint.setStrokeWidth(w);
    }

    public void lineCap(int cap) {
        switch (cap) {
            case 0:
                linePaint.setStrokeCap(Paint.Cap.BUTT);
                break;
            case 1:
                linePaint.setStrokeCap(Paint.Cap.ROUND);
                break;
            case 2:
                linePaint.setStrokeCap(Paint.Cap.SQUARE);
                break;
            default:
                linePaint.setStrokeCap(Paint.Cap.BUTT);
                break;
        }
    }

    public void lineJoin(int join) {
        switch (join) {
            case 0:
                linePaint.setStrokeJoin(Paint.Join.MITER);
                break;
            case 1:
                linePaint.setStrokeJoin(Paint.Join.ROUND);
                break;
            case 2:
                linePaint.setStrokeJoin(Paint.Join.BEVEL);
                break;
            default:
                linePaint.setStrokeJoin(Paint.Join.MITER);
                break;
        }
    }

    public void lineColor(String color) {
        fillPaint.setStyle(Paint.Style.STROKE);
        linePaint.setColor(Color.parseColor(color));
    }

    public void fillColor(String color) {
        fillPaint.setStyle(Paint.Style.FILL);
        fillPaint.setColor(Color.parseColor(color));
    }

    public void textColor(String color) {
        textPaint.setColor(Color.parseColor(color));
    }

}
