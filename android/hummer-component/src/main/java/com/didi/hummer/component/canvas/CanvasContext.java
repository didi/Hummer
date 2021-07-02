package com.didi.hummer.component.canvas;

import android.graphics.Color;
import android.graphics.Paint;
import android.text.TextPaint;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;


public class CanvasContext {

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


    public void lineColor(String color) {
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
                break;
        }
    }


    public void fillColor(String color) {
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(Color.parseColor(color));
    }

}
