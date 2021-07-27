package com.didi.hummer.component.canvas;

import android.graphics.Color;
import android.graphics.Paint;
import android.text.TextPaint;
import android.util.Log;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;


public class CanvasContext {

    private static final String TAG = "CanvasDrawHelperView";

    private Paint paint = new Paint();
    private TextPaint textPaint = new TextPaint();

    public CanvasContext() {
        paint.setAntiAlias(true);
        textPaint.setAntiAlias(true);
    }

    public Paint getPaint() {
        return paint;
    }

    public TextPaint getTextPaint() {
        return textPaint;
    }


    public void lineWidth(float w) {
        paint.setStrokeWidth(w);
    }

    public void lineCap(int cap) {
        switch (cap) {
            case 0:
                paint.setStrokeCap(Paint.Cap.BUTT);
                break;
            case 1:
                paint.setStrokeCap(Paint.Cap.ROUND);
                break;
            case 2:
                paint.setStrokeCap(Paint.Cap.SQUARE);
                break;
            default:
                paint.setStrokeCap(Paint.Cap.BUTT);
                break;
        }
    }


    public void lineColor(String color) {
        Log.i(TAG, "lineColor: " + color);
        paint.setColor(Color.parseColor(color));
    }


    public void lineJoin(int join) {
        switch (join) {
            case 0:
                paint.setStrokeJoin(Paint.Join.MITER);
                break;
            case 1:
                paint.setStrokeJoin(Paint.Join.ROUND);
                break;
            case 2:
                paint.setStrokeJoin(Paint.Join.BEVEL);
                break;
            default:
                paint.setStrokeJoin(Paint.Join.MITER);
                break;
        }
    }


    public void fillColor(String color) {
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(Color.parseColor(color));
    }

}
