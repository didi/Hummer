package com.didi.hummer2.component;


import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotation.HMComponent;
import com.didi.hummer2.annotation.HMMethod;
import com.didi.hummer2.component.hummer.canvas.CanvasView;
import com.didi.hummer2.render.Element;

/**
 * didi Create on 2024/4/9 .
 * <p>
 * Copyright (c) 2024/4/9 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/9 8:07 PM
 * @Description Canvas
 */

@HMComponent("Canvas")
public class CanvasElement extends Element<CanvasView> {


    public CanvasElement(HummerContext context, Object[] properties) {
        super(context, properties);
    }

    @Override
    public CanvasView createRenderView() {
        return new CanvasView(context,null,null);
    }

    /**
     * 设置stroke的线粗细
     *
     * @param widthValue 粗细值，支持px，hm 单位， 如果不写单位就是dp
     */
    @HMMethod("lineWidth")
    public void lineWidth(float widthValue) {
        getView().lineWidth(widthValue);
    }


    /**
     * 设置stroke的颜色
     *
     * @param colorHex 颜色16进制
     */
    @HMMethod("lineColor")
    public void lineColor(String colorHex) {
        getView().lineColor(colorHex);
    }

    /**
     * 设置线头样式
     *
     * @param value 0:LineCapButt, ， 1:LineCapRound   2:LineCapSquare
     */
    @HMMethod("lineCap")
    public void lineCap(int value) {
        getView().lineCap(value);
    }

    /**
     * 设置折线折点样式
     *
     * @param value 0:LineJoinMiter, ， 1:LineJoinRound  2:LineJoinBevel
     */
    @HMMethod("lineJoin")
    public void lineJoin(int value) {
        getView().lineJoin(value);
    }

    /**
     * 根据入参，在起始点与终点之间画一条线段
     *
     * @param fromX 起点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param fromY 起点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param toX   终点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param toY   终点的y值，支持px，hm 单位， 如果不写单位就是dp
     */
    @HMMethod("drawLine")
    public void drawLine(Object fromX, Object fromY, Object toX, Object toY) {
        getView().drawLine(fromX, fromY, toX, toY);
    }

    /**
     * 画矩形
     *
     * @param x 矩形左上角坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param y 矩形左上角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param w 矩形宽，支持px，hm 单位， 如果不写单位就是dp
     * @param h 矩形高，支持px，hm 单位， 如果不写单位就是dp
     */
    @HMMethod("strokeRect")
    public void strokeRect(Object x, Object y, Object w, Object h) {
        getView().strokeRect(x, y, w, h);
    }

    /**
     * 画椭圆
     *
     * @param x      椭圆所在矩形左上角坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param y      椭圆所在矩形左上角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param trailX 椭圆所在矩形右下角坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param trailY 椭圆所在矩形右下角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     */
    @HMMethod("strokeEllipse")
    public void strokeEllipse(Object x, Object y, Object trailX, Object trailY) {
        getView().ellipse(x, y, trailX, trailY);
    }

    /**
     * 画圆形
     *
     * @param x      圆心坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param y      圆心坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param radius 半径 ， 支持px，hm 单位， 如果不写单位就是dp
     */
    @HMMethod("strokeCircle")
    public void strokeCircle(Object x, Object y, Object radius) {
        getView().strokeCircle(x, y, radius);
    }

    /**
     * 画弧形
     *
     * @param x          圆心坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param y          圆心坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param radius     半径 ， 支持px，hm 单位， 如果不写单位就是dp
     * @param startAngle 起始弧度 ，
     * @param endAngle   结束弧度 ，
     * @param clockwise  ture 顺时针 ， false 逆时针
     */
    @HMMethod("arc")
    public void arc(Object x, Object y, Object radius, Object startAngle, Object endAngle, boolean clockwise) {
        getView().arc(x, y, radius, startAngle, endAngle, clockwise);
    }

    /**
     * 设置填充颜色
     *
     * @param colorHex 颜色16进制
     */
    @HMMethod("fillColor")
    public void fillColor(String colorHex) {
        getView().fillColor(colorHex);
    }

    /**
     * 填充矩形
     *
     * @param x 矩形左上角坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param y 矩形左上角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param w 矩形宽，支持px，hm 单位， 如果不写单位就是dp
     * @param h 矩形高，支持px，hm 单位， 如果不写单位就是dp
     */
    @HMMethod("fillRect")
    public void fillRect(Object x, Object y, Object w, Object h) {
        getView().fillRect(x, y, w, h);
    }

    /**
     * 填充椭圆
     *
     * @param x      椭圆所在矩形左上角坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param y      椭圆所在矩形左上角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param trailX 椭圆所在矩形右下角坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param trailY 椭圆所在矩形右下角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     */
    @HMMethod("fillEllipse")
    public void fillEllipse(Object x, Object y, Object trailX, Object trailY) {
        getView().fillEllipse(x, y, trailX, trailY);
    }

    /**
     * 填充圆形
     *
     * @param x      圆心坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param y      圆心坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param radius 半径 ， 支持px，hm 单位， 如果不写单位就是dp
     */
    @HMMethod("fillCircle")
    public void fillCircle(Object x, Object y, Object radius) {
        getView().fillCircle(x, y, radius);
    }

    /**
     * 设置绘制文本字号
     *
     * @param size 字号大小
     */
    @HMMethod("fontSize")
    public void fontSize(float size) {
        getView().fontSize(size);
    }

    /**
     * 设置绘制文本字色
     *
     * @param colorHex 字体颜色 16进制色号
     */
    @HMMethod("textColor")
    public void textColor(String colorHex) {
        getView().textColor(colorHex);
    }

    /**
     * 绘制文本
     *
     * @param text     需要绘制的文本
     * @param x        文本左上角坐标x值 , 支持px，hm 单位， 如果不写单位就是dp
     * @param y        文本左上角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param maxWidth 文本换行的最大宽度, 0 代表不换行,支持px，hm 单位， 如果不写单位就是dp
     */
    @HMMethod("fillText")
    public void fillText(String text, Object x, Object y, Object maxWidth) {
        getView().fillText(text, x, y, maxWidth);
    }

    /**
     * 绘制图片
     *
     * @param src    图片资源链接,远程url或本地图片名
     * @param x      图片左上角坐标x值 , 支持px，hm 单位， 如果不写单位就是dp
     * @param y      图片左上角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param width  图片宽 ,支持px，hm 单位， 如果不写单位就是dp
     * @param height 图片高 ,支持px，hm 单位， 如果不写单位就是dp
     */
    @HMMethod("drawImage")
    public void drawImage(Object src, Object x, Object y, Object width, Object height) {
        getView().drawImage(src, x, y, width, height);
    }

}