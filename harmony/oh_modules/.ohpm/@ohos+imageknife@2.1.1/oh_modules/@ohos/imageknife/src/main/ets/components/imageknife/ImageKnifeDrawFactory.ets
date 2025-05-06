/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ImageKnifeOption } from '../imageknife/ImageKnifeOption'
import { ImageKnifeData } from '../imageknife/ImageKnifeData'
import { GIFFrame } from '../imageknife/utils/gif/GIFFrame'
import { IDrawLifeCycle } from '../imageknife/interface/IDrawLifeCycle'
import { ScaleTypeHelper,ScaleType } from '../imageknife/ImageKnifeComponent'

export class ImageKnifeDrawFactory{

  /**
   * 绘制PixelMap内容情况下,主图的椭圆裁剪,可添加边框
   * @param borderWidth 外边框 borderWidth vp
   * @param colorString 例如 "#FF00FF"
   */
  public static createOvalLifeCycle(borderWidth:number, colorString:string):IDrawLifeCycle{
   let viewLifeCycle:IDrawLifeCycle = {
      // 展示占位图
      displayPlaceholder: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
         
        return false;
      },
      // 展示加载进度
      displayProgress: (context: CanvasRenderingContext2D, progress: number, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
        return false;
      },
      // 展示缩略图
      displayThumbSizeMultiplier: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
         
        return false;
      },

      // 展示主图
      displayMainSource: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
        if (data.isPixelMap()) {
           
          data.drawPixelMap?.imagePixelMap?.getImageInfo().then((imageInfo) => {
            let scaleType = (typeof imageKnifeOption.mainScaleType == 'number') ? imageKnifeOption.mainScaleType : ScaleType.FIT_CENTER

            context.clearRect(0,0,compWidth,compHeight)
            context.save();
            // 绘制适配后的图像
            context.save();
            ScaleTypeHelper.drawImageWithScaleType(context, scaleType, data.drawPixelMap?.imagePixelMap, px2vp(imageInfo.size.width), px2vp(imageInfo.size.height), compWidth, compHeight,0,0)
            context.restore();

            // 使用 destination-in 裁剪出椭圆
            context.save();
            context.globalCompositeOperation = 'destination-in'
            context.beginPath();
            ImageKnifeDrawFactory.setOval(context, scaleType, data.drawPixelMap?.imagePixelMap, px2vp(imageInfo.size.width), px2vp(imageInfo.size.height), compWidth, compHeight,0,0,borderWidth)
            context.closePath();
            context.fill()
            context.restore();

            // 给椭圆加上边框
            context.save();
            if(borderWidth > 0) {
              context.strokeStyle = colorString
              context.lineWidth = borderWidth;
              context.globalCompositeOperation = 'source-over'
              context.beginPath();
              ImageKnifeDrawFactory.setOval(context, scaleType, data.drawPixelMap?.imagePixelMap, px2vp(imageInfo.size.width), px2vp(imageInfo.size.height), compWidth, compHeight, 0, 0, borderWidth)
              context.closePath();
              context.stroke()
              context.restore();
            }
            context.restore();
          })
          return true;
        }
        return false;
      },
      // 展示重试图层
      displayRetryholder: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
        return false;
      },
      // 展示失败占位图
      displayErrorholder: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
        return false;
      }
    }
    return viewLifeCycle;
  }

  /**
   * 绘制椭圆的计算和绘制,可借鉴,私有方法不对外提供
   * @param context
   * @param scaleType
   * @param source
   * @param imageWidth
   * @param imageHeight
   * @param compWidth
   * @param compHeight
   * @param imageOffsetX
   * @param imageOffsetY
   * @param borderWidth
   */
  private static setOval(context: CanvasRenderingContext2D, scaleType: ScaleType, source: PixelMap | undefined, imageWidth: number, imageHeight: number, compWidth: number, compHeight: number, imageOffsetX:number,imageOffsetY:number
          ,borderWidth:number) {
    let scaleW = compWidth / imageWidth
    let scaleH = compHeight / imageHeight
    let minScale = scaleW > scaleH ? scaleH : scaleW
    let maxScale = scaleW > scaleH ? scaleW : scaleH
    let circleX = compWidth / 2
    let circleY = compHeight / 2
    switch (scaleType) {
      case ScaleType.FIT_START:
        circleX = imageWidth * minScale / 2
        circleY = imageHeight * minScale / 2
        context.ellipse(circleX,circleY, (imageWidth * minScale - borderWidth) / 2, (imageHeight * minScale - borderWidth) / 2, 0, 0, Math.PI * 2)
        break
      case ScaleType.FIT_END:
        if(scaleW >= scaleH){
          circleX = compWidth - imageWidth * minScale/2
          circleY = imageHeight * minScale / 2
        }else{
          circleX = imageWidth * minScale / 2
          circleY = compHeight - imageHeight * minScale / 2
        }
        context.ellipse(circleX, circleY, (imageWidth * minScale - borderWidth) / 2, (imageHeight * minScale - borderWidth) / 2, 0, 0, Math.PI * 2)
        break
      case ScaleType.FIT_CENTER:
        circleX = compWidth / 2;
        circleY = compHeight / 2;
        context.ellipse(circleX, circleY, (imageWidth * minScale - borderWidth) / 2, (imageHeight * minScale - borderWidth) / 2, 0, 0, Math.PI * 2)
        break
      case ScaleType.CENTER:
        circleX = compWidth / 2;
        circleY = compHeight / 2;
        let centerRadiusX = (Math.min(compWidth,imageWidth) - borderWidth)/2
        let centerRadiusY = (Math.min(compHeight,imageHeight) -borderWidth)/2
        context.ellipse(circleX, circleY, centerRadiusX, centerRadiusY, 0, 0, Math.PI * 2)
        break
      case ScaleType.CENTER_CROP:
      // 肯定会占满全屏
        circleX = compWidth / 2;
        circleY = compHeight / 2;
        let centerCropRadiusX = (compWidth-borderWidth)/2
        let centerCropRadiusY = (compHeight-borderWidth)/2

        context.ellipse(circleX, circleY, centerCropRadiusX, centerCropRadiusY, 0, 0, Math.PI * 2)
        break
      case ScaleType.FIT_XY:
        context.ellipse(compWidth / 2, compHeight / 2, (imageWidth * scaleW - borderWidth) / 2, (imageHeight * scaleH - borderWidth) / 2, 0, 0, Math.PI * 2)
        break
      case ScaleType.CENTER_INSIDE:
        if(minScale < 1){ // FIT_CENTER
          circleX = compWidth / 2;
          circleY = compHeight / 2;
          context.ellipse(circleX,circleY,(imageWidth * minScale - borderWidth) / 2, (imageHeight * minScale - borderWidth) / 2, 0, 0, Math.PI * 2)
        }else{ // CENTER
          circleX = compWidth / 2;
          circleY = compHeight / 2;
          let centerRadiusX = (Math.min(compWidth,imageWidth) - borderWidth)/2
          let centerRadiusY = (Math.min(compHeight,imageHeight) -borderWidth)/2
          context.ellipse(circleX, circleY, centerRadiusX, centerRadiusY, 0, 0, Math.PI * 2)
        }
        break
      case ScaleType.NONE:
        circleX = Math.min(compWidth,imageWidth)/2
        circleY = Math.min(compHeight,imageHeight)/2
        let noneRadiusX = (Math.min(compWidth,imageWidth)-borderWidth)/2
        let noneRadiusY = (Math.min(compHeight,imageHeight)-borderWidth)/2
        context.ellipse(circleX,circleY,noneRadiusX,noneRadiusY,0,0, Math.PI*2)
        break;
      default:
        break;
    }
  }


  /**
   * 绘制PixelMap内容情况下,主图的圆角裁剪,可添加边框
   * @param borderWidth 边框宽度
   * @param colorString 边框颜色string
   * @param connerRadius 圆角半径
   */
  public static createRoundLifeCycle(borderWidth:number, colorString:string, connerRadius:number){
    let viewLifeCycle:IDrawLifeCycle = {
      // 展示占位图
      displayPlaceholder: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
         
        return false;
      },
      // 展示加载进度
      displayProgress: (context: CanvasRenderingContext2D, progress: number, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
        return false;
      },
      // 展示缩略图
      displayThumbSizeMultiplier: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
         
        return false;
      },

      // 展示主图
      displayMainSource: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
        if (data.isPixelMap()) {
           
          data.drawPixelMap?.imagePixelMap?.getImageInfo().then((imageInfo) => {
            let scaleType = (typeof imageKnifeOption.mainScaleType == 'number') ? imageKnifeOption.mainScaleType : ScaleType.FIT_CENTER

            context.clearRect(0,0,compWidth,compHeight)
            context.save();

            // 绘制适配后的图像
            context.save();
            ScaleTypeHelper.drawImageWithScaleType(context, scaleType, data.drawPixelMap?.imagePixelMap, px2vp(imageInfo.size.width), px2vp(imageInfo.size.height), compWidth, compHeight,0,0)
            context.restore();

            // 通过 destination-in 裁剪出圆角
            context.save();
            context.globalCompositeOperation = 'destination-in'
            ImageKnifeDrawFactory.setRect(context, scaleType, data.drawPixelMap?.imagePixelMap, px2vp(imageInfo.size.width), px2vp(imageInfo.size.height), compWidth, compHeight,0,0,borderWidth,connerRadius)
            context.fill()
            context.restore();
            if(borderWidth > 0){
            // 为圆角添加边框
            context.save();
            context.strokeStyle = colorString
            context.lineWidth = borderWidth
            context.globalCompositeOperation = 'source-over'
              ImageKnifeDrawFactory.setRect(context, scaleType, data.drawPixelMap?.imagePixelMap, px2vp(imageInfo.size.width), px2vp(imageInfo.size.height), compWidth, compHeight,0,0,borderWidth,connerRadius)
            context.stroke()
            context.restore();
            }
            context.restore();
          })
          return true;
        }
        return false;
      },
      // 展示重试图层
      displayRetryholder: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
        return false;
      },
      // 展示失败占位图
      displayErrorholder: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
        return false;
      }
    }
    return viewLifeCycle;
  }

  /**
   * 绘制圆角的计算,可借鉴,私有方法不对外提供
   * @param context
   * @param scaleType
   * @param source
   * @param imageWidth
   * @param imageHeight
   * @param compWidth
   * @param compHeight
   * @param imageOffsetX
   * @param imageOffsetY
   * @param borderWidth
   * @param cornerRadius
   */
  private static setRect(context: CanvasRenderingContext2D, scaleType: ScaleType, source: PixelMap | undefined, imageWidth: number, imageHeight: number, compWidth: number, compHeight: number, imageOffsetX:number,imageOffsetY:number
          ,borderWidth:number,cornerRadius:number) {
    let scaleW = compWidth / imageWidth
    let scaleH = compHeight / imageHeight
    let minScale = scaleW > scaleH ? scaleH : scaleW
    let maxScale = scaleW > scaleH ? scaleW : scaleH
    let x1 =  borderWidth/2
    let y1 =  borderWidth/2
    let w1 = compWidth - borderWidth;
    let h1 = compHeight - borderWidth;
    switch (scaleType) {
      case ScaleType.FIT_START:
        x1 =  borderWidth/2
        y1 =  borderWidth/2
        w1 = imageWidth * minScale - borderWidth;
        h1 = imageHeight * minScale - borderWidth;
        ImageKnifeDrawFactory.roundRect(context, x1, y1, w1, h1, cornerRadius)
        break
      case ScaleType.FIT_END:
        x1 =  compWidth  - imageWidth * minScale + borderWidth / 2
        y1 =  compHeight  - imageHeight * minScale + borderWidth / 2
        w1 = imageWidth * minScale - borderWidth;
        h1 = imageHeight * minScale - borderWidth;
        ImageKnifeDrawFactory.roundRect(context, x1, y1, w1, h1, cornerRadius)
        break
      case ScaleType.FIT_CENTER:
        x1 =  (compWidth  - imageWidth * minScale) / 2 + borderWidth / 2
        y1 =  (compHeight  - imageHeight * minScale) / 2 + borderWidth / 2
        w1 = imageWidth * minScale - borderWidth
        h1 = imageHeight * minScale - borderWidth
        ImageKnifeDrawFactory.roundRect(context, x1, y1, w1, h1, cornerRadius)
        break
      case ScaleType.CENTER:
        x1 = Math.max(0,(compWidth - Math.min(compWidth, imageWidth)))/2 +  borderWidth/2
        y1 = Math.max(0,(compHeight - Math.min(compHeight, imageHeight)))/2 +  borderWidth/2

        w1 = Math.min(compWidth, imageWidth) - borderWidth;
        h1 = Math.min(compHeight, imageHeight) - borderWidth;

        ImageKnifeDrawFactory.roundRect(context, x1, y1, w1, h1, cornerRadius)
        break
      case ScaleType.CENTER_CROP:
        x1 =  borderWidth/2
        y1 =  borderWidth/2

        w1 = compWidth - borderWidth;
        h1 = compHeight - borderWidth;
        ImageKnifeDrawFactory.roundRect(context, x1, y1, w1, h1, cornerRadius)
        break
      case ScaleType.FIT_XY:
        x1 =  borderWidth/2
        y1 =  borderWidth/2

        w1 = compWidth - borderWidth;
        h1 = compHeight - borderWidth;
        ImageKnifeDrawFactory.roundRect(context, x1, y1, w1, h1, cornerRadius)
        break
      case ScaleType.CENTER_INSIDE:
        if(minScale < 1){ // FIT_CENTER
          x1 =  (compWidth  - imageWidth * minScale) / 2 + borderWidth / 2
          y1 =  (compHeight  - imageHeight * minScale) / 2 + borderWidth / 2
          w1 = imageWidth * minScale - borderWidth
          h1 = imageHeight * minScale - borderWidth
          ImageKnifeDrawFactory.roundRect(context, x1, y1, w1, h1, cornerRadius)
        }else{ // CENTER
          x1 = Math.max(0,(compWidth - Math.min(compWidth, imageWidth)))/2 +  borderWidth/2
          y1 = Math.max(0,(compHeight - Math.min(compHeight, imageHeight)))/2 +  borderWidth/2

          w1 = Math.min(compWidth, imageWidth) - borderWidth;
          h1 = Math.min(compHeight, imageHeight) - borderWidth;

          ImageKnifeDrawFactory.roundRect(context, x1, y1, w1, h1, cornerRadius)
        }

        break;
      case ScaleType.NONE:

        x1 =  borderWidth/2
        y1 =  borderWidth/2

        w1 = Math.min(compWidth, imageWidth) - borderWidth;
        h1 = Math.min(compHeight, imageHeight) - borderWidth;

        ImageKnifeDrawFactory.roundRect(context, x1, y1, w1, h1, cornerRadius)
        break;
    }
  }

  /**
   * 绘制圆角的绘制,可借鉴,私有方法不对外提供
   * @param context
   * @param x
   * @param y
   * @param w
   * @param h
   * @param r
   */
  private static roundRect(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    if (w < 2 * r) {
      r = w / 2;
    }
    if (h < 2 * r) {
      r = h / 2;
    }
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + w, y, x + w, y + h, r);
    context.arcTo(x + w, y + h, x, y + h, r);
    context.arcTo(x, y + h, x, y, r);
    context.arcTo(x, y, x + w, y, r);
    context.closePath();
  }

  /**
   * 绘制下载进度条
   * @param fontColor 文字颜色
   * @param fontSizeRate 文字占半径比率[0,1]
   */
  public static createProgressLifeCycle(fontColor:string, fontSizeRate:number){
    let viewLifeCycle: IDrawLifeCycle = {
      // 展示占位图
      displayPlaceholder: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
         
        return false;
      },
      // 展示加载进度
      displayProgress: (context: CanvasRenderingContext2D, progress: number, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
         
        ImageKnifeDrawFactory.drawDefaultProgress(context, progress, imageKnifeOption, compWidth, compHeight,fontColor,fontSizeRate,setGifTimeId)
        return true;
      },
      // 展示缩略图
      displayThumbSizeMultiplier: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
         
        return false;
      },

      // 展示主图
      displayMainSource: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
         
        return false;
      },

      // 展示重试图层
      displayRetryholder: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
         
        return false;
      },

      // 展示失败占位图
      displayErrorholder: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
         
        return false;
      }
    }
    return viewLifeCycle;
  }
  /**
   * 绘制默认的网络下载百分比
   * @param context
   * @param progress
   * @param imageKnifeOption
   * @param compWidth
   * @param compHeight
   * @param fontColor
   * @param fontSizeRate
   * @param setGifTimeId
   */
  private static drawDefaultProgress(context: CanvasRenderingContext2D, progress: number, imageKnifeOption: ImageKnifeOption,
                                     compWidth: number, compHeight: number,
                                     fontColor:string, fontSizeRate:number,setGifTimeId?: (timeId: number) => void,){
    let pi = Math.PI * 2 / 100; // pi 讲圆的周长划分为100份
    let rate = progress - 25;
    let diameter = compWidth > compHeight ? compHeight : compWidth
    context.lineWidth = Math.floor(diameter * 0.03)
    context.lineCap = "round"
    context.fillStyle = fontColor// "#10a5ff"
    context.font = Math.floor(diameter * fontSizeRate *px2vp(1))+'px'
    let x0 = (compWidth - diameter) / 2.0 + Math.floor(diameter * 0.5)
    let y0 = (compHeight - diameter) / 2.0 + Math.floor(diameter * 0.1)
    let x1 = (compWidth - diameter) / 2.0 + Math.floor(diameter * 0.5)
    let y1 = (compHeight - diameter) / 2.0 + Math.floor(diameter * 0.8)
    let gradient = context.createLinearGradient(x0, y0, x1, y1)
    gradient.addColorStop(0, "#11ffe4")
    gradient.addColorStop(0.5, "#03c6fd")
    gradient.addColorStop(1, "#10a5ff")
    context.clearRect(0, 0, compWidth, compHeight)
    context.shadowBlur = 0
    context.beginPath()
    context.strokeStyle = "#15222d"
    let radius = Math.floor(diameter * 0.3)
    let arcX = compWidth / 2.0
    let arcY = compHeight / 2.0
    context.arc(arcX, arcY, radius, 0, Math.PI * 2, true)
    context.stroke()
    context.beginPath()
    let showText = rate + 25 + '%'
    let metrics = context.measureText(showText)
    let textX = (compWidth / 2.0) - metrics.width / 2.0
    let textY = (compHeight / 2.0) + metrics.height * 0.3
    context.fillText(showText, textX, textY)
    context.stroke()
    context.beginPath()
    context.strokeStyle = gradient
    context.arc(arcX, arcY, radius, pi * -25, pi * rate)
    context.stroke();
  }


}