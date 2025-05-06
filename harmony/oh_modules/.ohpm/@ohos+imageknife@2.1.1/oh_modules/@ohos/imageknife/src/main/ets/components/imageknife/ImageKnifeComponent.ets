/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import { ImageKnifeGlobal } from '../imageknife/ImageKnifeGlobal'
import { TransformType } from '../imageknife/transform/TransformType'
import { DetachFromLayout, RequestOption, Size } from '../imageknife/RequestOption'
import { ImageKnifeData } from '../imageknife/ImageKnifeData'
import { GIFFrame } from '../imageknife/utils/gif/GIFFrame'
import { IDrawLifeCycle } from '../imageknife/interface/IDrawLifeCycle'
import { LogUtil } from '../imageknife/utils/LogUtil'
import { BusinessError } from '@ohos.base'
import common from '@ohos.app.ability.common'

@Component
export struct ImageKnifeComponent {
  @Watch('watchImageKnifeOption') @ObjectLink imageKnifeOption: ImageKnifeOption;
  autoPlay: boolean = true
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  private hasDisplayRetryholder = false;
  private lastWidth: number = 0
  private lastHeight: number = 0
  private currentWidth: number = 0
  private currentHeight: number = 0
  // 定时器id
  private gifTimerId: number = -1
  // 完整gif播放时间
  private gifLoopDuration: number = 0
  private startGifLoopTime: number = 0
  private endGifLoopTime: number = 0
  defaultLifeCycle: IDrawLifeCycle = {

    // 展示占位图
    displayPlaceholder: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
      this.drawPlaceholder(context, data, imageKnifeOption, compWidth, compHeight, setGifTimeId)
      return true;
    },
    // 展示加载进度
    displayProgress: (context: CanvasRenderingContext2D, progress: number, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
      this.drawProgress(context, progress, imageKnifeOption, compWidth, compHeight, setGifTimeId)
      return true;
    },
    // 展示缩略图
    displayThumbSizeMultiplier: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
      this.drawThumbSizeMultiplier(context, data, imageKnifeOption, compWidth, compHeight, setGifTimeId)
      return true;
    },

    // 展示主图
    displayMainSource: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
      this.drawMainSource(context, data, imageKnifeOption, compWidth, compHeight, setGifTimeId)
      return true;
    },

    // 展示重试图层
    displayRetryholder: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
      this.drawRetryholder(context, data, imageKnifeOption, compWidth, compHeight, setGifTimeId)
      return true;
    },

    // 展示失败占位图
    displayErrorholder: (context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) => {
      this.drawErrorholder(context, data, imageKnifeOption, compWidth, compHeight, setGifTimeId)
      return true;
    }

  }
  private canvasHasReady: boolean = false;
  private firstDrawFlag: boolean = false;
  private onReadyNext?: (data:ImageKnifeData|number|undefined) => void = undefined
  private onReadyNextData:ImageKnifeData|number|undefined = undefined

  private  detachFromLayout:DetachFromLayout|undefined = undefined;

  private detachFromLayoutGIF :DetachFromLayout|undefined = undefined;

  private detachFromLayoutPixelMap :DetachFromLayout|undefined = undefined;


  build() {
    Canvas(this.context)
      .width('100%')
      .height('100%')
      .onAreaChange((oldValue: Area, newValue: Area) => {
        if(newValue != undefined && newValue.width != undefined && newValue.height != undefined) {
          this.currentWidth = newValue.width as number
          this.currentHeight = newValue.height as number
          if (this.currentWidth <= 0 || this.currentHeight <= 0) {
            // 存在宽或者高为0,此次重回无意义,无需进行request请求
          } else {
            // 前提：宽高值均有效,值>0. 条件1：当前宽高与上一次宽高不同  条件2:当前是第一次绘制
            if ((this.currentHeight != this.lastHeight || this.currentWidth != this.lastWidth) || this.firstDrawFlag) {
              this.firstDrawFlag = false;
              LogUtil.log('ImageKnifeComponent onAreaChange And Next To Execute. Canvas currentWidth =' + this.currentWidth + '  currentHeight=' + this.currentHeight)
              this.lastWidth = this.currentWidth
              this.lastHeight = this.currentHeight
              this.imageKnifeExecute()
            }
          }
        }else{
          LogUtil.log('ImageKnifeComponent onAreaChange Error newValue is undefined')
        }
      })
      .onReady(() => {
        this.canvasHasReady = true;
        if (this.onReadyNext) {
          LogUtil.log('ImageKnifeComponent onReadyNext is running!')
          this.onReadyNext(this.onReadyNextData)
          this.onReadyNext = undefined;
          this.onReadyNextData = undefined
        }
      })
      .onClick((event?: ClickEvent) => {
        // 需要将点击事件回传
        if (this.imageKnifeOption.onClick) {
          this.imageKnifeOption.onClick(event)
        }
        if (this.imageKnifeOption.canRetryClick && this.hasDisplayRetryholder) {
          this.retryClick()
        }
      })
  }

  watchImageKnifeOption() {
    LogUtil.log('ImageKnifeComponent watchImageKnifeOption is happened!')
    this.whetherWaitSize();
  }

  /**
   * 判断当前是否有宽高,有直接重绘,没有则等待onAreaChange回调,当出现aboutToAppear第一次绘制的时候
   * 给firstDrawFlag置为true,保证size即使没有变化也要进入 请求绘制流程
   * @param drawFirst 是否是aboutToAppear第一次绘制
   */
  whetherWaitSize(drawFirst?: boolean) {
    if (this.currentHeight <= 0 || this.currentWidth <= 0) {
      // 宽或者高没有高度,需要等待canvas组件初始化完成
      if (drawFirst) {
        this.firstDrawFlag = true;
      }
    } else {
      LogUtil.log('ImageKnifeComponent whetherWaitSize 宽高有效 直接发送请求')
      this.imageKnifeExecute()
    }
  }

  retryClick() {
    this.hasDisplayRetryholder = false;
    this.imageKnifeExecute();
  }

  /**
   * 为了保证执行方法在canvas的onReay之后
   * 如果onReady未初始化,则将最新的绘制生命周期绑定到onReadNext上
   * 待onReady执行的时候执行
   * @param nextFunction 下一个方法
   */
  runNextFunction(nextFunction: (data:ImageKnifeData|number|undefined) => void,data:ImageKnifeData|number|undefined) {
    if (!this.canvasHasReady) {
      // canvas未初始化完成
      this.onReadyNext = nextFunction;
      this.onReadyNextData = data;
    } else {
      nextFunction(data);
    }
  }

  configNecessary(request: RequestOption) {
    request.load(this.imageKnifeOption.loadSrc)
      .addListener({ callback: (err:BusinessError|string, data:ImageKnifeData) => {
        LogUtil.log('ImageKnifeComponent request.load callback')
        this.runNextFunction(this.displayMainSource,data);
        return false;
      }
      })

    let realSize:Size = {
      width: this.currentWidth,
      height: this.currentHeight
    }
    request.setImageViewSize(realSize)
  }

  configCacheStrategy(request: RequestOption) {
    if (this.imageKnifeOption.onlyRetrieveFromCache != null && this.imageKnifeOption.onlyRetrieveFromCache != undefined) {
      request.retrieveDataFromCache(this.imageKnifeOption.onlyRetrieveFromCache)
    }

    if (this.imageKnifeOption.isCacheable != null && this.imageKnifeOption.isCacheable != undefined) {
      request.skipMemoryCache(!this.imageKnifeOption.isCacheable)
    }


    if (this.imageKnifeOption.strategy != null && this.imageKnifeOption.strategy != undefined) {
      request.diskCacheStrategy(this.imageKnifeOption.strategy)
    }
    if (this.imageKnifeOption.allCacheInfoCallback != null && this.imageKnifeOption.allCacheInfoCallback != undefined) {
      request.addAllCacheInfoCallback(this.imageKnifeOption.allCacheInfoCallback)
    }
    if (this.imageKnifeOption.signature) {
      request.signature = this.imageKnifeOption.signature;
    }
  }

  configDisplay(request: RequestOption) {
    if (this.imageKnifeOption.placeholderSrc) {
      request.placeholder(this.imageKnifeOption.placeholderSrc, {asyncSuccess:(data:ImageKnifeData) => {
        LogUtil.log('ImageKnifeComponent request.placeholder callback')
        this.runNextFunction(this.displayPlaceholder,data)
      }
      })
    }
    if (this.imageKnifeOption.thumbSizeMultiplier) {
      request.thumbnail(this.imageKnifeOption.thumbSizeMultiplier, {asyncSuccess:(data:ImageKnifeData) => {
        LogUtil.log('ImageKnifeComponent request.thumbnail callback')
        this.runNextFunction(this.displayThumbSizeMultiplier,data)
      }}, this.imageKnifeOption.thumbSizeDelay)
    }
    if (this.imageKnifeOption.errorholderSrc) {
      request.errorholder(this.imageKnifeOption.errorholderSrc, {asyncSuccess:(data:ImageKnifeData) => {
        LogUtil.log('ImageKnifeComponent request.errorholder callback')
        this.runNextFunction(this.displayErrorholder,data)
      }})
    }

    if (this.imageKnifeOption.transform) {
      this.requestAddTransform(request)
    }
    if (this.imageKnifeOption.transformation) {
      request.transform(this.imageKnifeOption.transformation)
    }
    if (this.imageKnifeOption.transformations) {
      request.transforms(this.imageKnifeOption.transformations)
    }
    if (this.imageKnifeOption.dontAnimateFlag) {
      request.dontAnimate()
    }


    if (this.imageKnifeOption.displayProgress) {
      request.addProgressListener({asyncSuccess:(percentValue: number) => {
        // 如果进度条百分比 未展示大小,展示其动画
        LogUtil.log('ImageKnifeComponent request.addProgressListener callback')
        this.runNextFunction(this.displayProgress,percentValue)
      }})
    }

    if (this.imageKnifeOption.retryholderSrc) {
      request.retryholder(this.imageKnifeOption.retryholderSrc,{asyncSuccess: (data:ImageKnifeData) => {
        LogUtil.log('ImageKnifeComponent request.retryholder callback')
        this.hasDisplayRetryholder = true
        this.runNextFunction(this.displayRetryholder,data)
      }})
    }
  }

  configHspContext(request: RequestOption){
    if(this.imageKnifeOption.context != undefined){
      request.setModuleContext(this.imageKnifeOption.context)
    }else{
      request.setModuleContext(getContext(this) as common.UIAbilityContext)
    }
  }

  configRenderGpu(request: RequestOption) {
    if (this.imageKnifeOption.enableGpu) {
      request.enableGPU()
    } else {
      // 如果enableGpu未设置则不启动GPU渲染
    }
  }

  // imageknife 第一次启动和数据刷新后重新发送请求
  imageKnifeExecute() {
    if (this.imageKnifeOption == null || this.imageKnifeOption.loadSrc == null) {
      // 如果数据是null或者undefined,清空图片内容和gif循环，并且不进入图片请求流程
      this.resetGifData()
      if (this.canvasHasReady) {
        // 如果canvas已经初始化好了，清空原有的canvas内容
        this.context.clearRect(0, 0, this.currentWidth, this.currentHeight)
      }
      return
    }
    this.resetGifData()
    let request = new RequestOption();
    this.detachFromLayout = request.detachFromLayout;
    this.configNecessary(request);
    this.configCacheStrategy(request);
    this.configDisplay(request);
    this.configHspContext(request)
    this.configRenderGpu(request);
    if(ImageKnifeGlobal.getInstance().getImageKnife()!=undefined) {
      ImageKnifeGlobal.getInstance().getImageKnife()?.call(request);
    }
  }

  displayPlaceholder = (data: ImageKnifeData|number|undefined)=> {
    if(data == undefined || typeof data == 'number'){
      return
    }
    if (!this.drawLifeCycleHasConsumed( 'displayPlaceholder', this.context, data, this.imageKnifeOption,
      this.currentWidth, this.currentHeight, (gifTimeId) => {
        this.setGifTimeId(gifTimeId)
      },this.imageKnifeOption.drawLifeCycle)) {
      if (!this.drawLifeCycleHasConsumed( 'displayPlaceholder', this.context, data, this.imageKnifeOption,
        this.currentWidth, this.currentHeight, (gifTimeId) => {
          this.setGifTimeId(gifTimeId)
        },(ImageKnifeGlobal.getInstance().getImageKnife())?.getDefaultLifeCycle())) {
        if(this.defaultLifeCycle.displayPlaceholder != undefined) {
          this.defaultLifeCycle.displayPlaceholder(this.context, data, this.imageKnifeOption, this.currentWidth, this.currentHeight, (gifTimeId) => {
            this.setGifTimeId(gifTimeId)
          })
        }
      }
    }


  }

  displayProgress = (percent: ImageKnifeData|number|undefined)=> {
    if(typeof percent != 'number'){
      return
    }
    if (!this.drawLifeCycleHasConsumed( 'displayProgress', this.context, percent, this.imageKnifeOption,
      this.currentWidth, this.currentHeight, (gifTimeId) => {
        this.setGifTimeId(gifTimeId)
      },this.imageKnifeOption.drawLifeCycle)) {
      if (!this.drawLifeCycleHasConsumed( 'displayProgress', this.context, percent, this.imageKnifeOption,
        this.currentWidth, this.currentHeight, (gifTimeId) => {
          this.setGifTimeId(gifTimeId)
        },(ImageKnifeGlobal.getInstance().getImageKnife())?.getDefaultLifeCycle())) {
        if(this.defaultLifeCycle.displayProgress != undefined) {
          this.defaultLifeCycle.displayProgress(this.context, percent, this.imageKnifeOption, this.currentWidth, this.currentHeight, (gifTimeId) => {
            this.setGifTimeId(gifTimeId)
          })
        }
      }
    }


  }

  displayThumbSizeMultiplier = (data: ImageKnifeData|number|undefined)=> {
    if(data == undefined || typeof data == 'number'){
      return
    }
    if (!this.drawLifeCycleHasConsumed( 'displayThumbSizeMultiplier', this.context, data, this.imageKnifeOption,
      this.currentWidth, this.currentHeight, (gifTimeId) => {
        this.setGifTimeId(gifTimeId)
      },this.imageKnifeOption.drawLifeCycle)) {
      if (!this.drawLifeCycleHasConsumed( 'displayThumbSizeMultiplier', this.context, data, this.imageKnifeOption,
        this.currentWidth, this.currentHeight, (gifTimeId) => {
          this.setGifTimeId(gifTimeId)
        },(ImageKnifeGlobal.getInstance().getImageKnife())?.getDefaultLifeCycle())) {
        if(this.defaultLifeCycle.displayThumbSizeMultiplier != undefined) {
          this.defaultLifeCycle.displayThumbSizeMultiplier(this.context, data, this.imageKnifeOption, this.currentWidth, this.currentHeight, (gifTimeId) => {
            this.setGifTimeId(gifTimeId)
          })
        }
      }
    }
  }

  displayMainSource = (data: ImageKnifeData|number|undefined)=> {
    if(data == undefined || typeof data == 'number'){
      return
    }
    if (!this.drawLifeCycleHasConsumed( 'displayMainSource', this.context, data, this.imageKnifeOption,
      this.currentWidth, this.currentHeight, (gifTimeId) => {
        this.setGifTimeId(gifTimeId)
      },this.imageKnifeOption.drawLifeCycle)) {
      if (!this.drawLifeCycleHasConsumed( 'displayMainSource', this.context, data, this.imageKnifeOption,
        this.currentWidth, this.currentHeight, (gifTimeId) => {
          this.setGifTimeId(gifTimeId)
        },(ImageKnifeGlobal.getInstance().getImageKnife())?.getDefaultLifeCycle())) {
        if(this.defaultLifeCycle.displayMainSource != undefined) {
          this.defaultLifeCycle.displayMainSource(this.context, data, this.imageKnifeOption, this.currentWidth, this.currentHeight, (gifTimeId) => {
            this.setGifTimeId(gifTimeId)
          })
        }
      }
    }


  }

  displayRetryholder = (data: ImageKnifeData|number|undefined)=> {
    if(data == undefined || typeof data == 'number'){
      return
    }
    if (!this.drawLifeCycleHasConsumed( 'displayRetryholder', this.context, data, this.imageKnifeOption,
      this.currentWidth, this.currentHeight, (gifTimeId) => {
        this.setGifTimeId(gifTimeId)
      },this.imageKnifeOption.drawLifeCycle)) {
      if (!this.drawLifeCycleHasConsumed( 'displayRetryholder', this.context, data, this.imageKnifeOption,
        this.currentWidth, this.currentHeight, (gifTimeId) => {
          this.setGifTimeId(gifTimeId)
        },(ImageKnifeGlobal.getInstance().getImageKnife())?.getDefaultLifeCycle())) {
        if( this.defaultLifeCycle.displayRetryholder != undefined) {
          this.defaultLifeCycle.displayRetryholder(this.context, data, this.imageKnifeOption, this.currentWidth, this.currentHeight, (gifTimeId) => {
            this.setGifTimeId(gifTimeId)
          })
        }
      }
    }

  }

  displayErrorholder = (data: ImageKnifeData|number|undefined)=> {
    if(data == undefined || typeof data == 'number'){
      return
    }
    if (!this.drawLifeCycleHasConsumed( 'displayErrorholder', this.context, data, this.imageKnifeOption,
      this.currentWidth, this.currentHeight, (gifTimeId) => {
        this.setGifTimeId(gifTimeId)
      },this.imageKnifeOption.drawLifeCycle)) {
      if (!this.drawLifeCycleHasConsumed( 'displayErrorholder', this.context, data, this.imageKnifeOption,
        this.currentWidth, this.currentHeight, (gifTimeId) => {
          this.setGifTimeId(gifTimeId)
        },(ImageKnifeGlobal.getInstance().getImageKnife())?.getDefaultLifeCycle())) {
        if(this.defaultLifeCycle.displayErrorholder != undefined) {
          this.defaultLifeCycle.displayErrorholder(this.context, data, this.imageKnifeOption, this.currentWidth, this.currentHeight, (gifTimeId) => {
            this.setGifTimeId(gifTimeId)
          })
        }
      }
    }


  }

  drawPlaceholder(context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) {
    LogUtil.log('ImageKnifeComponent default drawPlaceholder start!')

    data.drawPixelMap?.imagePixelMap?.getImageInfo().then((imageInfo) => {
      LogUtil.log('ImageKnifeComponent imageinfo width =' + imageInfo.size.width + ' height=' + imageInfo.size.height)
      let scaleType = (typeof imageKnifeOption.placeholderScaleType == 'number') ? imageKnifeOption.placeholderScaleType : ScaleType.FIT_CENTER
      context.save();
      context.clearRect(0, 0, compWidth, compHeight)
      ScaleTypeHelper.drawImageWithScaleType(context, scaleType, data.drawPixelMap?.imagePixelMap, px2vp(imageInfo.size.width), px2vp(imageInfo.size.height), compWidth, compHeight, 0, 0)
      context.restore();
      LogUtil.log('ImageKnifeComponent default drawPlaceholder end!')
    })
  }

  drawProgress(context: CanvasRenderingContext2D, progress: number, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) {
    let pi = Math.PI * 2 / 100; //pi 讲圆的周长划分为100份
    let rate = progress - 25;
    let diameter = compWidth > compHeight ? compHeight : compWidth
    context.lineWidth = Math.floor(diameter * 0.03)
    context.lineCap = "round"
    context.fillStyle = "#10a5ff"
    context.font = Math.floor(diameter * 0.3 * px2vp(1)) + 'px'

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

  drawThumbSizeMultiplier(context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) {
    LogUtil.log('ImageKnifeComponent default drawThumbSizeMultiplier start!')

    data.drawPixelMap?.imagePixelMap?.getImageInfo().then((imageInfo) => {
      LogUtil.log('ImageKnifeComponent imageinfo width =' + imageInfo.size.width + ' height=' + imageInfo.size.height)
      let scaleType = (typeof imageKnifeOption.thumbSizeMultiplierScaleType == 'number') ? imageKnifeOption.thumbSizeMultiplierScaleType : ScaleType.FIT_CENTER
      context.save();
      context.clearRect(0, 0, compWidth, compHeight)
      ScaleTypeHelper.drawImageWithScaleType(context, scaleType, data.drawPixelMap?.imagePixelMap, px2vp(imageInfo.size.width), px2vp(imageInfo.size.height), compWidth, compHeight, 0, 0)
      context.restore();
      LogUtil.log('ImageKnifeComponent default drawThumbSizeMultiplier end!')
    })
  }

  drawMainSource(context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) {
    LogUtil.log('ImageKnifeComponent default drawMainSource start!')
    if (data.isPixelMap()) {
      data.drawPixelMap?.imagePixelMap?.getImageInfo().then((imageInfo) => {
        let scaleType = (typeof imageKnifeOption.mainScaleType == 'number') ? imageKnifeOption.mainScaleType : ScaleType.FIT_CENTER
        LogUtil.log('ImageKnifeComponent imageinfo width =' + imageInfo.size.width + ' height=' + imageInfo.size.height + 'scaleType=' + scaleType)
        context.save();
        context.clearRect(0, 0, compWidth, compHeight)
        ScaleTypeHelper.drawImageWithScaleType(context, scaleType, data.drawPixelMap?.imagePixelMap, px2vp(imageInfo.size.width), px2vp(imageInfo.size.height), compWidth, compHeight, 0, 0)
        context.restore();
        LogUtil.log('ImageKnifeComponent default drawMainSource end!')
      })
      if (data.drawPixelMap != undefined) {
        data.drawPixelMap.isShowOnComponent = true;
        this.detachFromLayoutPixelMap = data.drawPixelMap.detachFromLayoutPixelMap;
      }
    } else if (data.isGIFFrame()) {
      if(data.drawGIFFrame != undefined) {
        data.drawGIFFrame.isShowOnComponent = true
        this.detachFromLayoutGIF = data.drawGIFFrame.detachFromLayoutGIF
        this.drawGIFFrame(context, data, imageKnifeOption, compWidth, compHeight, setGifTimeId)
      }
    }
  }

  drawRetryholder(context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) {
    LogUtil.log('ImageKnifeComponent default drawRetryholder start!')

    data.drawPixelMap?.imagePixelMap?.getImageInfo().then((imageInfo) => {
      LogUtil.log('ImageKnifeComponent imageinfo width =' + imageInfo.size.width + ' height=' + imageInfo.size.height)
      let scaleType = (typeof imageKnifeOption.retryholderScaleType == 'number') ? imageKnifeOption.retryholderScaleType : ScaleType.FIT_CENTER
      context.save();
      context.clearRect(0, 0, compWidth, compHeight)
      ScaleTypeHelper.drawImageWithScaleType(context, scaleType, data.drawPixelMap?.imagePixelMap, px2vp(imageInfo.size.width), px2vp(imageInfo.size.height), compWidth, compHeight, 0, 0)
      context.restore();
      LogUtil.log('ImageKnifeComponent default drawRetryholder end!')
    })
  }

  drawErrorholder(context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) {
    LogUtil.log('ImageKnifeComponent default drawErrorholder start!')

    data.drawPixelMap?.imagePixelMap?.getImageInfo().then((imageInfo) => {
      LogUtil.log('ImageKnifeComponent imageinfo width =' + imageInfo.size.width + ' height=' + imageInfo.size.height)
      let scaleType = (typeof imageKnifeOption.errorholderSrcScaleType == 'number') ? imageKnifeOption.errorholderSrcScaleType : ScaleType.FIT_CENTER
      context.save();
      context.clearRect(0, 0, compWidth, compHeight)
      ScaleTypeHelper.drawImageWithScaleType(context, scaleType, data.drawPixelMap?.imagePixelMap, px2vp(imageInfo.size.width), px2vp(imageInfo.size.height), compWidth, compHeight, 0, 0)
      context.restore();
      LogUtil.log('ImageKnifeComponent default drawErrorholder end!')
    })
  }

  requestAddTransform(request: RequestOption) {
    if (TransformType.BlurTransformation == this.imageKnifeOption.transform?.transformType) {
      request.blur(this.imageKnifeOption.transform?.blur)
    } else if (TransformType.BrightnessFilterTransformation == this.imageKnifeOption.transform?.transformType) {
      request.brightnessFilter(this.imageKnifeOption.transform?.brightnessFilter)
    } else if (TransformType.ContrastFilterTransformation == this.imageKnifeOption.transform?.transformType) {
      request.contrastFilter(this.imageKnifeOption.transform?.contrastFilter)
    } else if (TransformType.CropCircleTransformation == this.imageKnifeOption.transform?.transformType) {
      request.cropCircle()
    } else if (TransformType.CropCircleWithBorderTransformation == this.imageKnifeOption.transform?.transformType) {
      request.cropCircleWithBorder(this.imageKnifeOption.transform?.cropCircleWithBorder?.border, this.imageKnifeOption.transform?.cropCircleWithBorder?.obj)
    } else if (TransformType.CropSquareTransformation == this.imageKnifeOption.transform?.transformType) {
      request.cropSquare()
    } else if (TransformType.CropTransformation == this.imageKnifeOption.transform?.transformType) {
      request.crop(this.imageKnifeOption.transform?.crop?.width, this.imageKnifeOption.transform?.crop?.height, this.imageKnifeOption.transform?.crop?.cropType)
    } else if (TransformType.GrayscaleTransformation == this.imageKnifeOption.transform?.transformType) {
      request.grayscale()
    } else if (TransformType.InvertFilterTransformation == this.imageKnifeOption.transform?.transformType) {
      request.invertFilter()
    } else if (TransformType.MaskTransformation == this.imageKnifeOption.transform?.transformType) {
      request.mask(this.imageKnifeOption.transform?.mask)
    } else if (TransformType.PixelationFilterTransformation == this.imageKnifeOption.transform?.transformType) {
      request.pixelationFilter(this.imageKnifeOption.transform?.pixelationFilter)
    } else if (TransformType.RotateImageTransformation == this.imageKnifeOption.transform?.transformType) {
      request.rotateImage(this.imageKnifeOption.transform?.rotateImage)
    } else if (TransformType.RoundedCornersTransformation == this.imageKnifeOption.transform?.transformType) {
      request.roundedCorners(this.imageKnifeOption.transform?.roundedCorners)
    } else if (TransformType.SepiaFilterTransformation == this.imageKnifeOption.transform?.transformType) {
      request.sepiaFilter()
    } else if (TransformType.SketchFilterTransformation == this.imageKnifeOption.transform?.transformType) {
      request.sketchFilter()
    } else if (TransformType.SwirlFilterTransformation == this.imageKnifeOption.transform?.transformType) {
      request.swirlFilter(this.imageKnifeOption.transform?.swirlFilter)
    } else if (TransformType.CenterCrop == this.imageKnifeOption.transform?.transformType) {
      request.centerCrop()
    } else if (TransformType.CenterInside == this.imageKnifeOption.transform?.transformType) {
      request.centerInside()
    } else if (TransformType.FitCenter == this.imageKnifeOption.transform?.transformType) {
      request.fitCenter()
    }
  }

  aboutToAppear() {
    LogUtil.log('ImageKnifeComponent aboutToAppear happened!')
    this.canvasHasReady = false;
    this.whetherWaitSize(true);
  }

  aboutToDisappear() {
    LogUtil.log('ImageKnifeComponent aboutToDisappear happened!')
    if(this.detachFromLayout != undefined){
      this.detachFromLayout.detach();
    }
    if(this.detachFromLayoutGIF != undefined){
      this.detachFromLayoutGIF.detach();
    }
    if (this.detachFromLayoutPixelMap != undefined) {
      this.detachFromLayoutPixelMap.detach();
    }
    this.resetGifData();
  }

  onPageShow() {
  }

  onPageHide() {
  }

  onBackPress() {
  }

  setGifTimeId(timeId: number) {
    this.gifTimerId = timeId;
  }

  private drawLifeCycleHasConsumed<K, T>( methodName: string,
                                          context: CanvasRenderingContext2D, data: K, imageKnifeOption: T, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void,drawLifeCycle?: IDrawLifeCycle
  ):boolean {
    if (drawLifeCycle && (drawLifeCycle as Record<string,Function>)[methodName]) {
      return (drawLifeCycle as Record<string,Function>)[methodName](context, data, imageKnifeOption, compWidth, compHeight, setGifTimeId)
    }
    return false;
  }

  private drawGIFFrame(context: CanvasRenderingContext2D, data: ImageKnifeData, imageKnifeOption: ImageKnifeOption, compWidth: number, compHeight: number, setGifTimeId?: (timeId: number) => void) {
    let frames = data.drawGIFFrame?.imageGIFFrames as GIFFrame[]
    LogUtil.log('ImageKnifeComponent gifFrameLength =' + frames.length);
    if (imageKnifeOption.gif && (typeof (imageKnifeOption.gif.seekTo) == 'number') && imageKnifeOption.gif.seekTo >= 0) {
      this.autoPlay = false;
      context.clearRect(0, 0, compWidth, compHeight)
      this.drawSeekToFrame(frames, context, compWidth, compHeight)
    } else {
      this.autoPlay = true
      context.clearRect(0, 0, compWidth, compHeight)

      this.renderFrames_frames = frames
      this.renderFrames_index = 0
      this.renderFrames_context = context
      this.renderFrames_compWidth = compWidth
      this.renderFrames_compHeight = compHeight

      this.renderFrames()
    }
  }

  private resetGifData() {
    clearTimeout(this.gifTimerId)
    this.gifLoopDuration = 0;
    this.startGifLoopTime = 0;
    this.endGifLoopTime = 0;
  }

  /**
   * 绘制直接到第几帧方法，由于gif非第一帧数据可能是不全的，这里采用逐帧渲染的方式来绘制保证图像的完整性
   */
  private drawSeekToFrame(frames: GIFFrame[], context: CanvasRenderingContext2D, compWidth: number, compHeight: number) {
    if(this.imageKnifeOption.gif != undefined &&  this.imageKnifeOption.gif.seekTo != undefined) {
      for (let i = 0; i < this.imageKnifeOption.gif.seekTo; i++) {
        this.drawFrame(frames, i, context, compWidth, compHeight);
      }
    }
  }

  renderFrames_frames: GIFFrame[] | undefined = undefined
  renderFrames_index: number = 0;
  renderFrames_context: CanvasRenderingContext2D | undefined = undefined;
  renderFrames_compWidth: number = 0;
  renderFrames_compHeight: number = 0

  renderFrames:()=>void = ()=> {
    LogUtil.log('ImageKnifeComponent renderFrames frames length =' + this.renderFrames_frames?.length)
    let start = new Date().getTime();
    if (this.renderFrames_index === 0) {
      // 如果是第一帧，我们只从开始渲染前记录时间
      this.startGifLoopTime = start;
    }
    // draw Frame
    this.drawFrame(this.renderFrames_frames, this.renderFrames_index, this.renderFrames_context, this.renderFrames_compWidth, this.renderFrames_compHeight);
    //如果gif动图只有一帧的情况下，不进行后面代码的逐帧绘制循环
    if (this.renderFrames_frames != undefined && this.renderFrames_frames.length <= 1) {
      return
    }

    // 记录渲染结束时间点
    let end = new Date().getTime();
    let diff = end - start

    if (this.autoPlay) {

      // 理论上该帧在屏幕上保留的时间
      let stayTime:number= 0
      if(this.renderFrames_frames != undefined) {
        stayTime = this.renderFrames_frames[this.renderFrames_index].delay;
      }
      if (this.imageKnifeOption.gif && this.imageKnifeOption.gif.speedFactory) {
        stayTime = stayTime / (this.imageKnifeOption.gif?.speedFactory * 1.0);
      }
      // 减去程序执行消耗，剩余的准确延迟时间
      let delayTime = Math.max(0, Math.floor(stayTime - diff));

      this.endGifLoopTime = end;
      // 当前gif到第N帧,所对应的N渲染时间，和N-1的停留时间。（第一帧只有渲染时间没有停留时间）
      let loopStayTime = this.endGifLoopTime - this.startGifLoopTime;
      this.startGifLoopTime = end;
      // 整个gif累计的时长;
      this.gifLoopDuration += loopStayTime;
      // 返回gif一次循环结束回调，并且把当前循环的时间给出
      if (this.renderFrames_frames != undefined && this.renderFrames_index === (this.renderFrames_frames.length - 1) && this.imageKnifeOption.gif != undefined && this.imageKnifeOption.gif?.loopFinish) {
        this.imageKnifeOption.gif.loopFinish(this.gifLoopDuration)
        this.gifLoopDuration = 0;
      }
      // update the frame index
      this.renderFrames_index++
      if (this.renderFrames_frames != undefined && this.renderFrames_index >= this.renderFrames_frames.length) {
        this.renderFrames_index = 0;
      }
      this.gifTimerId = setTimeout(this.renderFrames, delayTime)
    }
  }

  private drawFrame(frames: GIFFrame[]|undefined, index: number, context: CanvasRenderingContext2D|undefined, compWidth: number, compHeight: number) {
    if(frames == undefined){
      return
    }
    // get current frame
    let frame = frames[index];
    if (!frame || !context) {
      // 数据保护，绘制保护
      return;
    }

    if (!frame['drawPixelMap']) {
      // 解码之后已经转为PixelMap
    } else {
      this.canvasDrawPixelMap(frames, index, context, compWidth, compHeight)
    }

  }

  // 具体绘制过程
  private canvasDrawPixelMap(frames: GIFFrame[], index: number, context: CanvasRenderingContext2D, compWidth: number, compHeight: number) {
    LogUtil.log('ImageKnifeComponent canvasDrawPixelMap index=' + index)
    let frame = frames[index];
    let pixelmap = frame['drawPixelMap']
    context.clearRect(0, 0, compWidth, compHeight)
    let scaleType = (typeof this.imageKnifeOption.mainScaleType == 'number') ? this.imageKnifeOption.mainScaleType : ScaleType.FIT_CENTER
    context.save();
    let frameW = frames[0].dims.left + frames[0].dims.width
    let frameH = frames[0].dims.top + frames[0].dims.height
    ScaleTypeHelper.drawImageWithScaleType(context, scaleType, pixelmap, px2vp(frameW), px2vp(frameH), compWidth, compHeight, px2vp(frame.dims.left), px2vp(frame.dims.top))
    // tips:worker如果不是在展示页面中创建,使用子线程回来的数据创建的图片,会导致canvas绘制不出来
    context.restore();
    LogUtil.log('ImageKnifeComponent default drawMainSource end!')
  }
}

export enum FrameDisposalType {
  // 0 - No disposal specified. The decoder is not required to take any action.
  // 不使用处置方法
  DISPOSE_Nothing = 0,
  // 1-Do not dispose. The graphic is to be left in place.
  // 不处置图形，把图形从当前位置移去
  DISPOSE_NotResolve = 1,
  // 2 - Restore to background color. The area used by the graphic must be restored to the background color.
  // 回复到背景色
  DISPOSE_RestoreBackground = 2,
  // 3-Restore to previous
  DISPOSE_PreviousStatus = 3
}

export enum ScaleType {
  // 图像位于用户设置组件左上角显示,图像会缩放至全部展示
  FIT_START = 1,
  // 图像位于用户设置组件右下角显示,图像会缩放至全部展示
  FIT_END = 2,
  // 图像位于用户设置组件居中,图像会缩放至全部展示
  FIT_CENTER = 3,
  // 图像绝对居中展示,不缩放
  CENTER = 4,
  // 宽高中,短的部分缩放至组件大小,超出的全部裁剪
  CENTER_CROP = 5,
  // 图像拉伸至组件大小
  FIT_XY = 6,
  // 如果图像大于组件则执行FIT_CENTER,小于组件则CENTER
  CENTER_INSIDE = 7,
  // 如果不想适配，直接展示原图大小
  NONE = 8
}


export class ScaleTypeHelper {
  static drawImageWithScaleType(context: CanvasRenderingContext2D, scaleType: ScaleType, source: PixelMap | undefined, imageWidth: number, imageHeight: number, compWidth: number, compHeight: number, imageOffsetX: number, imageOffsetY: number) {
    let scaleW = compWidth / imageWidth
    let scaleH = compHeight / imageHeight
    let minScale = scaleW > scaleH ? scaleH : scaleW
    let maxScale = scaleW > scaleH ? scaleW : scaleH

    switch (scaleType) {
      case ScaleType.FIT_START:
        ScaleTypeHelper.drawFitStart(context, source, minScale, imageWidth, imageHeight, imageOffsetX, imageOffsetY)
        break;
      case ScaleType.FIT_END:
        ScaleTypeHelper.drawFitEnd(context, source, minScale, imageWidth, imageHeight, compWidth, compHeight, imageOffsetX, imageOffsetY)
        break;
      case ScaleType.FIT_CENTER:
        ScaleTypeHelper.drawFitCenter(context, source, minScale, imageWidth, imageHeight, compWidth, compHeight, imageOffsetX, imageOffsetY)
        break;
      case ScaleType.CENTER:
        ScaleTypeHelper.drawCenter(context, source, imageWidth, imageHeight, compWidth, compHeight, imageOffsetX, imageOffsetY)
        break;
      case ScaleType.CENTER_CROP:
        ScaleTypeHelper.drawCenterCrop(context, source, maxScale, imageWidth, imageHeight, compWidth, compHeight, imageOffsetX, imageOffsetY)
        break;
      case ScaleType.FIT_XY:
        ScaleTypeHelper.drawFitXY(context, source, scaleW, scaleH, imageWidth, imageHeight, imageOffsetX, imageOffsetY)
        break;
      case ScaleType.CENTER_INSIDE:
        ScaleTypeHelper.drawCenterInside(context, source, minScale, imageWidth, imageHeight, compWidth, compHeight, imageOffsetX, imageOffsetY)
        break;
      case ScaleType.NONE:
        ScaleTypeHelper.drawNone(context, source, imageWidth, imageHeight, imageOffsetX, imageOffsetY)
        break;
      default:
        ScaleTypeHelper.drawNone(context, source, imageWidth, imageHeight, imageOffsetX, imageOffsetY)
        break
    }

  }

  static drawFitStart(context: CanvasRenderingContext2D, source: PixelMap | undefined, minScale: number, imageWidth: number, imageHeight: number, imageOffsetX?: number, imageOffsetY?: number) {
    context.setTransform(minScale, 0, 0, minScale, 0, 0)
    let dx:number = 0
    let dy:number = 0
    let dw:number = imageWidth;
    let dh:number = imageHeight;
    if(source!= undefined) {
      context.drawImage(source, dx + (imageOffsetX != undefined ? imageOffsetX : 0), dy + (imageOffsetY != undefined ? imageOffsetY : 0))
    }
  }

  static drawFitEnd(context: CanvasRenderingContext2D, source: PixelMap | undefined, minScale: number, imageWidth: number, imageHeight: number, compWidth: number, compHeight: number, imageOffsetX?: number, imageOffsetY?: number) {
    context.setTransform(minScale, 0, 0, minScale, 0, 0)

    let dx:number = (compWidth - imageWidth * minScale) / (minScale * 1.0);
    let dy:number = (compHeight - imageHeight * minScale) / (minScale * 1.0);
    let dw:number = imageWidth;
    let dh:number = imageHeight;
    if(source!= undefined) {
      context.drawImage(source, dx + (imageOffsetX != undefined ? imageOffsetX : 0), dy + (imageOffsetY != undefined ? imageOffsetY : 0))
    }
  }

  static drawFitCenter(context: CanvasRenderingContext2D, source: PixelMap | undefined, minScale: number, imageWidth: number, imageHeight: number, compWidth: number, compHeight: number, imageOffsetX?: number, imageOffsetY?: number) {
    context.setTransform(minScale, 0, 0, minScale, 0, 0)
    let dx:number = (compWidth - imageWidth * minScale) / (minScale * 2.0);
    let dy:number = (compHeight - imageHeight * minScale) / (minScale * 2.0);
    let dw:number = imageWidth;
    let dh:number = imageHeight;
    if(source!= undefined) {
      context.drawImage(source, dx + (imageOffsetX != undefined ? imageOffsetX : 0), dy + (imageOffsetY != undefined ? imageOffsetY : 0))
    }
  }

  static drawCenter(context: CanvasRenderingContext2D, source: PixelMap | undefined, imageWidth: number, imageHeight: number, compWidth: number, compHeight: number, imageOffsetX?: number, imageOffsetY?: number) {
    let dx:number = (compWidth - imageWidth) / 2.0;
    let dy:number = (compHeight - imageHeight) / 2.0;
    let dw:number = imageWidth;
    let dh:number = imageHeight;
    if(source!= undefined) {
      context.drawImage(source, dx + (imageOffsetX != undefined ? imageOffsetX : 0), dy + (imageOffsetY != undefined ? imageOffsetY : 0))
    }
  }

  static drawCenterCrop(context: CanvasRenderingContext2D, source: PixelMap | undefined, maxScale: number, imageWidth: number, imageHeight: number, compWidth: number, compHeight: number, imageOffsetX?: number, imageOffsetY?: number) {
    context.setTransform(maxScale, 0, 0, maxScale, 0, 0)
    let dx:number = (compWidth - imageWidth * maxScale) / (maxScale * 2.0);
    let dy:number = (compHeight - imageHeight * maxScale) / (maxScale * 2.0);
    let dw:number = imageWidth;
    let dh:number = imageHeight;
    if(source!= undefined) {
      context.drawImage(source, dx + (imageOffsetX != undefined ? imageOffsetX : 0), dy + (imageOffsetY != undefined ? imageOffsetY : 0))
    }
  }

  static drawFitXY(context: CanvasRenderingContext2D, source: PixelMap | undefined, scaleW: number, scaleH: number, imageWidth: number, imageHeight: number, imageOffsetX?: number, imageOffsetY?: number) {
    context.setTransform(scaleW, 0, 0, scaleH, 0, 0)
    let dx:number = 0;
    let dy:number = 0;
    let dw:number = imageWidth;
    let dh:number = imageHeight;
    if(source!= undefined) {
      context.drawImage(source, dx + (imageOffsetX != undefined ? imageOffsetX : 0), dy + (imageOffsetY != undefined ? imageOffsetY : 0))
    }
  }

  static drawCenterInside(context: CanvasRenderingContext2D, source: PixelMap | undefined, minScale: number, imageWidth: number, imageHeight: number, compWidth: number, compHeight: number, imageOffsetX?: number, imageOffsetY?: number) {
    if (minScale < 1) {
      ScaleTypeHelper.drawFitCenter(context, source, minScale, imageWidth, imageHeight, compWidth, compHeight, imageOffsetX, imageOffsetY)
    } else {
      ScaleTypeHelper.drawCenter(context, source, imageWidth, imageHeight, compWidth, compHeight, imageOffsetX, imageOffsetY)
    }
  }

  static drawNone(context: CanvasRenderingContext2D, source: PixelMap | undefined, imageWidth: number, imageHeight: number, imageOffsetX?: number, imageOffsetY?: number) {
    let dx:number = 0;
    let dy:number = 0;
    let dw:number = imageWidth;
    let dh:number = imageHeight;
    if(source!= undefined) {
      context.drawImage(source, dx + (imageOffsetX != undefined ? imageOffsetX : 0), dy + (imageOffsetY != undefined ? imageOffsetY : 0))
    }
  }
}





