package com.didi.hummer.component.canvas;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Paint;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.component.view.HMBase;

@Component("CanvasView")
public class CanvasView extends HMBase<CanvasDrawHelperView> {

    public CanvasView(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
    }

    @Override
    protected CanvasDrawHelperView createViewInstance(Context context) {
        return new CanvasDrawHelperView(context);
    }

    @JsMethod("getCanvasContext")
    public CanvasContext getCanvasContext() {
        return getView().getCanvasContext();
    }

    /**
     * 绘制图片
     */
    @JsMethod("drawImage")
    public void drawImage(Bitmap bitmap, float x, float y, float dWidth, float dHeight) {
        getView().drawImage(bitmap, x, y, dWidth, dHeight);
    }

    /**
     * 绘制矩形 实心
     */
    @JsMethod("fillRect")
    public void fillRect(float x, float y, float width, float height) {
        getView().fillRect(x, y, width, height);
    }

    /**
     * 绘制矩形 镂空
     */
    @JsMethod("strokeRect")
    public void strokeRect(float x, float y, float width, float height) {
        getView().strokeRect(x, y, width, height);
    }

    /**
     * 绘制圆形 实心
     */
    @JsMethod("fillCircle")
    public void fillCircle(float x, float y, float radius) {
        getView().fillCircle(x, y, radius);
    }

    /**
     * 绘制圆形 镂空
     */
    @JsMethod("strokeCircle")
    public void strokeCircle(float x, float y, float radius) {
        getView().strokeCircle(x, y, radius);
    }

    @JsMethod("fontSize")
    public void fontSize(float size) {
        getView().fontSize(size);
    }

    /**
     * Text 绘制改为左上角起始绘制 该方式和IOS 保持一致 且符合StaticLayout 绘制能力
     */
    @JsMethod("fillText")
    public void fillText(String text, float x, float y, int maxWidth) {
        getView().fillText(text, x, y, maxWidth);
    }

    @JsMethod("arc")
    public void arc(float x, float y, float radius, float startAngle, float endAngle, int clockwise) {
        getView().arc(x, y, radius, startAngle, endAngle, clockwise);
    }

    @JsMethod("drawLine")
    public void drawLine(float startX, float startY, float stopX, float stopY) {
        getView().drawLine(startX, startY, stopX, stopY);
    }

    @JsMethod("drawLines")
    public void drawLines(float[] points) {
        getView().drawLines(points);
    }

    @JsMethod("drawPath")
    public void drawPath(CanvasPath path) {
        getView().drawPath(path);
    }

    @JsMethod("ellipse")
    public void ellipse(float left, float top, float right, float bottom) {
        getView().ellipse(left, top, right, bottom);
    }


    //paint 的方法

    @JsMethod("lineWidth")
    public void lineWidth(float w) {
        getView().lineWidth(w);
    }

    @JsMethod("lineColor")
    public void lineColor(String color) {
        getView().lineColor(color);
    }

    @JsMethod("lineJoin")
    public void lineJoin(int join) {
        getView().lineJoin(join);
    }

    @JsMethod("fillColor")
    public void fillColor(String color) {
        getView().getCanvasContext().getLinePaint().setStyle(Paint.Style.FILL);
        getView().fillColor(color);
    }

    @JsMethod("lineCap")
    public void lineCap(int cap) {
        getView().lineCap(cap);
    }

}
