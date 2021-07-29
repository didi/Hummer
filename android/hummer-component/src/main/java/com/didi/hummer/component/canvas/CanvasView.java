package com.didi.hummer.component.canvas;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Paint;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.SimpleTarget;
import com.bumptech.glide.request.transition.Transition;
import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.utils.JsSourceUtil;

@Component("CanvasView")
public class CanvasView extends HMBase<CanvasDrawHelperView> {

    private HummerContext context;

    public CanvasView(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
        this.context = context;
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
    public void drawImage(Object bitmap, Object x, Object y, Object dWidth, Object dHeight) {

        if (bitmap instanceof Bitmap) {
            getView().drawImage((Bitmap) bitmap, x, y, dWidth, dHeight);
        } else if (bitmap instanceof String) {
            String path = JsSourceUtil.getRealResourcePath((String) bitmap, context.getJsSourcePath());
            int jsSourceType = JsSourceUtil.getJsSourceType(context.getJsSourcePath());
            switch (jsSourceType) {
                case JsSourceUtil.JS_SOURCE_TYPE_ASSETS:
                    path = "file:///android_asset/" + path;
                    break;
                case JsSourceUtil.JS_SOURCE_TYPE_FILE:
                    break;
                case JsSourceUtil.JS_SOURCE_TYPE_HTTP:
                    break;
                default:
                    break;
            }
            Glide.with(getContext()).asBitmap().load(path).into(new SimpleTarget<Bitmap>() {
                @Override
                public void onResourceReady(@NonNull Bitmap resource, @Nullable Transition<? super Bitmap> transition) {
                    getView().drawImage(resource, x, y, dWidth, dHeight);
                }
            });
        }
    }

    /**
     * 绘制矩形 实心
     */
    @JsMethod("fillRect")
    public void fillRect(Object x, Object y, Object width, Object height) {
        getView().fillRect(x, y, width, height);
    }

    /**
     * 绘制矩形 镂空
     */
    @JsMethod("strokeRect")
    public void strokeRect(Object x, Object y, Object width, Object height) {
        getView().strokeRect(x, y, width, height);
    }

    /**
     * 绘制圆形 实心
     */
    @JsMethod("fillCircle")
    public void fillCircle(Object x, Object y, Object radius) {
        getView().fillCircle(x, y, radius);
    }

    /**
     * 绘制圆形 镂空
     */
    @JsMethod("strokeCircle")
    public void strokeCircle(Object x, Object y, Object radius) {
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
    public void fillText(String text, Object x, Object y, Object maxWidth) {
        getView().fillText(text, x, y, maxWidth);
    }

    @JsMethod("arc")
    public void arc(Object x, Object y, Object radius, Object startAngle, Object endAngle, Object clockwise) {
        getView().arc(x, y, radius, startAngle, endAngle, clockwise);
    }

    @JsMethod("drawLine")
    public void drawLine(Object startX, Object startY, Object stopX, Object stopY) {
        getView().drawLine(startX, startY, stopX, stopY);
    }

    @JsMethod("drawLines")
    public void drawLines(Object[] points) {
        getView().drawLines(points);
    }

    @JsMethod("drawPath")
    public void drawPath(Object path) {
        getView().drawPath((CanvasPath) path);
    }

    @JsMethod("strokeEllipse")
    public void ellipse(Object left, Object top, Object right, Object bottom) {
        getView().strokeEllipse(left, top, right, bottom);
    }

    @JsMethod("fillEllipse")
    public void fillEllipse(Object left, Object top, Object right, Object bottom) {
        getView().fillEllipse(left, top, right, bottom);
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

    @JsMethod("textColor")
    public void textColor(String color) {
        getView().textColor(color);
    }

    @JsMethod("lineCap")
    public void lineCap(int cap) {
        getView().lineCap(cap);
    }

}
