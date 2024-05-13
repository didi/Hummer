import { HummerElement } from "../../HummerElement"


export class Canvas extends HummerElement {

 


    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("Canvas", name, { ...props, viewId: id });
    }

    /**
     * 设置stroke的线粗细
     * @param widthValue 粗细值，支持px，hm 单位， 如果不写单位就是dp
     */
    lineWidth(widthValue: number){
        this.call("lineWidth", widthValue);
    }

    /**
     * 设置stroke的颜色
     * @param colorHex 颜色16进制
     */
    lineColor(colorHex: string){
        this.call("lineColor", colorHex);
    }

    /**
     * 设置线头样式
     * @param value 0:LineCapButt, ， 1:LineCapRound   2:LineCapSquare
     */
    lineCap(value: number){
        this.call("lineCap", value);
    }


    /**
     * 设置折线折点样式
     * @param value 0:LineJoinMiter, ， 1:LineJoinRound  2:LineJoinBevel
     */
    lineJoin(value: number){
        this.call("lineJoin", value);
    }

    /**
     * 根据入参，在起始点与终点之间画一条线段
     * @param fromX 起点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param fromY 起点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param toX 终点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param toY 终点的y值，支持px，hm 单位， 如果不写单位就是dp
     */
    drawLine(fraomX: number, fromY: number, toX: number, toY: number){
        this.call("drawLine", fraomX, fromY, toX, toY);
    }

    /**
     * 画矩形
     * @param x 矩形左上角坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param y 矩形左上角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param w 矩形宽，支持px，hm 单位， 如果不写单位就是dp
     * @param h 矩形高，支持px，hm 单位， 如果不写单位就是dp
     */
    strokeRect(x: number, y: number, w: number, h: number){
        this.call("strokeRect", x, y, w, h);
    }

    /**
     * 画椭圆
     * @param x 椭圆所在矩形左上角坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param y 椭圆所在矩形左上角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param trailX 椭圆所在矩形右下角坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param trailY 椭圆所在矩形右下角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     */
    strokeEllipse(x: number, y: number, trailX: number, trailY: number){
        this.call("strokeEllipse", x, y, trailX, trailY);
    }


    /**
     * 画圆形
     * @param x 圆心坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param y 圆心坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param raduis 半径 ， 支持px，hm 单位， 如果不写单位就是dp
     */
    strokeCircle(x: number, y: number, radius: number){
        this.call("strokeCircle", x, y, radius);
    }

    /**
     * 画弧形
     * @param x 圆心坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param y 圆心坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param raduis 半径 ， 支持px，hm 单位， 如果不写单位就是dp
     * @param startAngle 起始弧度 ， 
     * @param endAngle 结束弧度 ，
     * @param clockwise ture 顺时针 ， false 逆时针
     */
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, clockwise: boolean){
        this.call("arc", x, y, radius, startAngle, endAngle, clockwise);
    }




    /**
     * 设置填充颜色
     * @param colorHex 颜色16进制
     */
    fillColor(colorHex: string){
        this.call("fillColor", colorHex);
    }



    /**
     * 填充矩形
     * @param x 矩形左上角坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param y 矩形左上角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param w 矩形宽，支持px，hm 单位， 如果不写单位就是dp
     * @param h 矩形高，支持px，hm 单位， 如果不写单位就是dp
     */
    fillRect(x: number, y: number, w: number, h: number){
        this.call("fillRect", x, y, w, h);
    }




    /**
     * 填充椭圆
     * @param x 椭圆所在矩形左上角坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param y 椭圆所在矩形左上角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param trailX 椭圆所在矩形右下角坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param trailY 椭圆所在矩形右下角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     */
    fillEllipse(x: number, y: number, trailX: number, trailY: number) {
        this.call("fillEllipse", x, y, trailX, trailY);
    }




    /**
     * 填充圆形
     * @param x 圆心坐标点的x值，支持px，hm 单位， 如果不写单位就是dp
     * @param y 圆心坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param raduis 半径 ， 支持px，hm 单位， 如果不写单位就是dp
     */
    fillCircle(x: number, y: number, radius: number){
        this.call("fillCircle", x, y, radius);
    }



    /**
     * 设置绘制文本字号
     * @param size 字号大小
     */
    fontSize(size: number){
        this.call("fontSize", size);
    }


    /**
     * 设置绘制文本字色
     * @param colorHex 字体颜色 16进制色号
     */
    textColor(colorHex: string){
        this.call("textColor", colorHex);
    }



    /**
     * 绘制文本
     * @param text 需要绘制的文本
     * @param x 文本左上角坐标x值 , 支持px，hm 单位， 如果不写单位就是dp
     * @param y 文本左上角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param maxWidth 文本换行的最大宽度, 0 代表不换行,支持px，hm 单位， 如果不写单位就是dp
     */
    fillText(text: string, x: number, y: number, maxWidth: number) {
        this.call("fillText",text, x, y, maxWidth);
    }




    /**
     * 绘制图片
     * @param src 图片资源链接,远程url或本地图片名
     * @param x 图片左上角坐标x值 , 支持px，hm 单位， 如果不写单位就是dp
     * @param y 图片左上角坐标点的y值，支持px，hm 单位， 如果不写单位就是dp
     * @param width 图片宽 ,支持px，hm 单位， 如果不写单位就是dp
     * @param height 图片高 ,支持px，hm 单位， 如果不写单位就是dp
     */
    drawImage(src: string, x: number, y: number, width: number, height: number) {
        this.call("drawImage",src, x, y, width, height);
    }

}