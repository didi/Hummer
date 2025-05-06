/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {ImageKnife} from './ImageKnife'
import { DiskStrategy } from "../cache/diskstrategy/DiskStrategy"
import  { AsyncCallback } from "../imageknife/interface/AsyncCallback"
import  { AsyncSuccess } from "../imageknife/interface/AsyncSuccess"
import  { IAllCacheInfoCallback } from "../imageknife/interface/IAllCacheInfoCallback"
import { AUTOMATIC } from "../cache/diskstrategy/enum/AUTOMATIC"
import { BaseTransform } from "../imageknife/transform/BaseTransform"
import { RotateImageTransformation } from "../imageknife/transform/RotateImageTransformation"
import { ImageKnifeData } from "../imageknife/ImageKnifeData"
import { CenterCrop } from '../imageknife/transform/pixelmap/CenterCrop'
import { CenterInside } from '../imageknife/transform/pixelmap/CenterInside'
import { FitCenter } from '../imageknife/transform/pixelmap/FitCenter'
import { RoundedCornersTransformation, RoundCorner } from '../imageknife/transform/RoundedCornersTransformation'

import { CropCircleTransformation } from '../imageknife/transform/CropCircleTransformation'

import { CropCircleWithBorderTransformation, rgbColor } from '../imageknife/transform/CropCircleWithBorderTransformation'
import { CropSquareTransformation } from '../imageknife/transform/CropSquareTransformation'
import { CropTransformation } from '../imageknife/transform/CropTransformation'
import { CropType } from '../imageknife/transform/CropTransformation'
import { GrayscaleTransformation } from '../imageknife/transform/GrayscaleTransformation'
import { BrightnessFilterTransformation } from '../imageknife/transform/BrightnessFilterTransformation'
import { ContrastFilterTransformation } from '../imageknife/transform/ContrastFilterTransformation'
import { InvertFilterTransformation } from '../imageknife/transform/InvertFilterTransformation'
import { SepiaFilterTransformation } from '../imageknife/transform/SepiaFilterTransformation'
import { SketchFilterTransformation } from '../imageknife/transform/SketchFilterTransformation'
import { BlurTransformation } from '../imageknife/transform/BlurTransformation'
import { PixelationFilterTransformation } from '../imageknife/transform/PixelationFilterTransformation'
import { MaskTransformation } from '../imageknife/transform/MaskTransformation'
import { SwirlFilterTransformation } from '../imageknife/transform/SwirlFilterTransformation'
import { KuwaharaFilterTransform } from '../imageknife/transform/KuwaharaFilterTransform'
import { ToonFilterTransform } from '../imageknife/transform/ToonFilterTransform'
import { VignetteFilterTransform } from '../imageknife/transform/VignetteFilterTransform'
import { LogUtil } from '../imageknife/utils/LogUtil'
import { ImageKnifeGlobal } from './ImageKnifeGlobal'
import { BusinessError } from '@ohos.base'
import { ObjectKey } from './ObjectKey'
import common from '@ohos.app.ability.common'

export interface Size {
  width: number,
  height: number
}
export interface DetachFromLayout{
  detach:()=>void
}

export class RequestOption {
  uuid:string ='' // 唯一标识
  loadSrc: string | PixelMap | Resource = '';
  strategy: DiskStrategy = new AUTOMATIC();
  dontAnimateFlag = false;
  placeholderSrc: PixelMap | Resource | undefined = undefined;
  placeholderFunc: AsyncSuccess<ImageKnifeData> | undefined = undefined;
  errorholderSrc: PixelMap | Resource | undefined = undefined;
  errorholderFunc: AsyncSuccess<ImageKnifeData> | undefined = undefined;
  errorholderData: ImageKnifeData | undefined = undefined;;
  thumbSizeMultiplier: number = 0;

  // 如果存在缩略图，则主图延时1s加载
  thumbDelayTime: number = 1000
  thumbHolderFunc: AsyncSuccess<ImageKnifeData> | undefined = undefined;
  requestListeners: Array<AsyncCallback<ImageKnifeData>> | undefined = undefined;

  // 进度条
  progressFunc: AsyncSuccess<number> | undefined = undefined;

  // 重试图层
  retryholderSrc: PixelMap | Resource | undefined = undefined;
  retryholderFunc: AsyncSuccess<ImageKnifeData> | undefined = undefined;
  retryholderData: ImageKnifeData | undefined = undefined;
  size:Size= { width: -1, height: -1 };

  // 网络下载数据回调
  allCacheInfoCallback: IAllCacheInfoCallback | undefined = undefined;
  onlyRetrieveFromCache: boolean = false;
  isCacheable: boolean = true;

  // 开启GPU变换绘制
  gpuEnabled: boolean = false;
  // 变换相关
  transformations: Array<BaseTransform<PixelMap>> = new Array();
  generateCacheKey: string = "";
  generateResourceKey: string = "";
  generateDataKey: string = "";
  filesPath: string = ""; // data/data/包名/files目录
  cachesPath: string = ""; // 网络下载默认存储在data/data/包名/cache/ImageKnifeNetworkFolder/目标md5.img下面

  // 自定义缓存关键字
  signature?: ObjectKey;

  // 下载原始文件地址
  downloadFilePath: string = "";

  // 网络文件下载统一存放
  networkCacheFolder: string = "ImageKnifeNetworkFolder"


  // 主线图片 状态变化 是否加载完成
  // 主图未加载成功 显示占位图  主图加载成功不展示占位图
  loadMainReady = false;

  // 失败占位图展示状态 当true 表示主图加载失败需要展示失败占位图
  loadErrorReady = false;

  // 重试占位图展示状态 当true 表示主图加载失败需要展示失败占位图
  loadRetryReady = false;

  // 缩略图展示
  loadThumbnailReady = false;

  detachFromLayout:DetachFromLayout = {
    detach: ()=>{
      let imageKnife:ImageKnife | undefined = ImageKnifeGlobal.getInstance().getImageKnife();
      if(imageKnife != undefined) {
        imageKnife.remove(this.uuid);
      }
    }
  }
  // module资源的需要当前的module context
  moduleContext?:common.UIAbilityContext = undefined;
  constructor() {
    // 初始化全局监听
    this.requestListeners = new Array();
    // 初始化唯一标识,可以用这个标识找到ImageKnife中的对象
    this.uuid = this.generateUUID();


   let ctx = ImageKnifeGlobal.getInstance().getHapContext() as common.UIAbilityContext
    if(ctx != undefined){
      this.moduleContext = ctx;
    }
  }

  generateUUID(): string {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( new RegExp("[xy]","g"), (c) => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
  setModuleContext(moduleCtx:common.UIAbilityContext){
    this.moduleContext = moduleCtx;
  }

  getModuleContext():common.UIAbilityContext | undefined{
    return this.moduleContext;
  }
  /**
   * set image Component size
   */
  setImageViewSize(imageSize:Size) {
    this.size.width = imageSize.width;
    this.size.height = imageSize.height;
    return this;
  }

  getFilesPath() {
    return this.filesPath;
  }

  setFilesPath(path: string) {
    this.filesPath = path;
  }

  getCachesPath() {
    return this.cachesPath;
  }

  setCachesPath(path: string) {
    this.cachesPath = path;
  }

  load(src: string | PixelMap | Resource) {
    this.loadSrc = src;
    return this;
  }

  diskCacheStrategy(strategy: DiskStrategy) {
    this.strategy = strategy;
    return this;
  }

  dontAnimate() {
    this.dontAnimateFlag = true;
    return this;
  }

  // 仅支持 本地图片
  placeholder(src: PixelMap | Resource, func?: AsyncSuccess<ImageKnifeData>) {
    this.placeholderSrc = src;
    this.placeholderFunc = func;
    return this;
  }

  errorholder(src: PixelMap | Resource, func?: AsyncSuccess<ImageKnifeData>) {
    this.errorholderSrc = src;
    this.errorholderFunc = func;
    return this;
  }

  retryholder(src: PixelMap | Resource, func?: AsyncSuccess<ImageKnifeData>) {
    this.retryholderSrc = src;
    this.retryholderFunc = func;
    return this;
  }

  thumbnail(sizeMultiplier: number, func?: AsyncSuccess<ImageKnifeData>, displayTime?: number) {
    this.thumbSizeMultiplier = sizeMultiplier;
    this.thumbHolderFunc = func;
    if (displayTime) {
      this.thumbDelayTime = displayTime;
    }
    return this;
  }

  addProgressListener(func?: AsyncSuccess<number>) {
    this.progressFunc = func;
    return this;
  }

  addListener(func: AsyncCallback<ImageKnifeData>) {
    if(this.requestListeners != undefined) {
      this.requestListeners?.push(func);
    }
    return this;
  }

  addAllCacheInfoCallback(func: IAllCacheInfoCallback) {
    this.allCacheInfoCallback = func;
    return this;
  }

  skipMemoryCache(skip: boolean) {
    this.isCacheable = !skip;
    return this;
  }

  retrieveDataFromCache(flag: boolean) {
    this.onlyRetrieveFromCache = flag;
  }

  rotateImage(degreesToRotate: number|undefined) {
    if(degreesToRotate == undefined){
      return
    }
    let rotateImage = new RotateImageTransformation(degreesToRotate);
    this.transformations.push(rotateImage);
    return this;
  }

  centerCrop() {
    this.transformations.push(new CenterCrop());
    return this;
  }

  centerInside() {
    this.transformations.push(new CenterInside());
    return this;
  }

  fitCenter() {
    this.transformations.push(new FitCenter());
    return this;
  }

  roundedCorners(obj: RoundCorner|undefined) {
    if(obj == undefined){
      return
    }
    let transformation = new RoundedCornersTransformation({
      top_left: obj.top_left,
      top_right: obj.top_right,
      bottom_left: obj.bottom_left,
      bottom_right: obj.bottom_right
    })
    this.transformations.push(transformation);
    return this;
  }

  cropCircle() {
    let transformation = new CropCircleTransformation()
    this.transformations.push(transformation);
    return this;
  }

  cropCircleWithBorder(border: number|undefined, obj: rgbColor|undefined) {
    if(border == undefined || obj == undefined){
      return
    }
    let transformation = new CropCircleWithBorderTransformation(border, obj)
    this.transformations.push(transformation);
    return this;
  }

  cropSquare() {
    let transformation = new CropSquareTransformation()
    this.transformations.push(transformation);
    return this;
  }

  crop(width: number|undefined, height: number|undefined, cropType: CropType|undefined) {
    if(width == undefined || height == undefined || cropType == undefined){
      return
    }
    let transformation = new CropTransformation(width, height, cropType)
    this.transformations.push(transformation);
    return this;
  }

  grayscale() {
    let transformation = new GrayscaleTransformation()
    this.transformations.push(transformation);
    return this;
  }

  brightnessFilter(brightness: number|undefined) {
    if(brightness == undefined){
      return
    }
    let transformation = new BrightnessFilterTransformation(brightness)
    this.transformations.push(transformation);
    return this;
  }

  contrastFilter(contrast: number|undefined) {
    if(contrast == undefined){
      return
    }
    let transformation = new ContrastFilterTransformation(contrast)
    this.transformations.push(transformation);
    return this;
  }

  invertFilter() {
    let transformation = new InvertFilterTransformation()
    this.transformations.push(transformation);
    return this;
  }

  sepiaFilter() {
    let transformation = new SepiaFilterTransformation()
    this.transformations.push(transformation);
    return this;
  }

  sketchFilter() {
    let transformation = new SketchFilterTransformation()
    this.transformations.push(transformation);
    return this;
  }

  blur(radius: number|undefined) {
    if(radius == undefined){
      return
    }
    let transformation = new BlurTransformation(radius)
    this.transformations.push(transformation);
    return this;
  }

  pixelationFilter(pixel: number|undefined) {
    if(pixel == undefined){
      return
    }
    let transformation = new PixelationFilterTransformation(pixel)
    this.transformations.push(transformation);
    return this;
  }

  swirlFilter(degree: number|undefined) {
    if(degree == undefined){
      return
    }
    let transformation = new SwirlFilterTransformation(degree)
    this.transformations.push(transformation);
    return this;
  }

  mask(maskResource: Resource|undefined) {
    if(maskResource == undefined){
      return
    }
    let transformation = new MaskTransformation(maskResource)
    this.transformations.push(transformation);
    return this;
  }

  kuwaharaFilter(radius: number|undefined) {
    if(radius == undefined){
      return
    }
    let transformation = new KuwaharaFilterTransform(radius);
    this.transformations.push(transformation);
    return this;
  }

  toonFilter(threshold: number|undefined, quantizationLevels: number|undefined) {
    if(threshold == undefined || quantizationLevels == undefined){
      return
    }
    let transformation = new ToonFilterTransform(threshold, quantizationLevels);
    this.transformations.push(transformation);
    return this;
  }

  vignetteFilter(centerPoint: Array<number>|undefined, vignetteColor: Array<number>|undefined, vignetteSpace: Array<number>|undefined) {
    if(centerPoint == undefined || vignetteColor == undefined || vignetteSpace == undefined){
      return
    }
    let transformation = new VignetteFilterTransform(centerPoint, vignetteColor, vignetteSpace);
    this.transformations.push(transformation);
    return this;
  }

  transform(input: BaseTransform<PixelMap>) {
    this.transformations.push(input);
    return this;
  }

  transforms(inputs: BaseTransform<PixelMap>[]) {
    this.transformations = inputs;
    return this;
  }
  // 开启GPU变换绘制
  enableGPU() {
    this.gpuEnabled = true;
    return this;
  }

  // 占位图解析成功
  placeholderOnComplete = (imageKnifeData: ImageKnifeData)=> {
    LogUtil.log("placeholderOnComplete has called!");
    LogUtil.log("Main Image is Ready:" + this.loadMainReady);
    if (!this.loadMainReady && !(this.loadErrorReady || this.loadRetryReady) && !this.loadThumbnailReady) {
      // 主图未加载成功,并且未加载失败  显示占位图  主图加载成功或者加载失败后=>不展示占位图
      if(this.placeholderSrc != undefined) {
        this.placeholderFunc?.asyncSuccess(imageKnifeData)
      }
    }
  }

  // 占位图解析失败
  placeholderOnError = (error:BusinessError|string)=>{
    LogUtil.log("占位图解析失败 error =" + error)
  }


  // 缩略图解析成功
  thumbholderOnComplete = (imageKnifeData: ImageKnifeData)=> {
    if (!this.loadMainReady && !(this.loadErrorReady || this.loadRetryReady)) {
      // 主图未加载成功,并且未加载失败  显示占位图  主图加载成功或者加载失败后=>不展示占位图
      if(this.thumbHolderFunc != undefined) {
        this.thumbHolderFunc?.asyncSuccess(imageKnifeData)
      }
    }
  }

  // 缩略图解析失败
  thumbholderOnError=(error? :BusinessError|string)=>{
    LogUtil.log("缩略图解析失败 error =" + error)
  }

  // 加载失败 占位图解析成功
  errorholderOnComplete = (imageKnifeData: ImageKnifeData)=> {
    // 如果有错误占位图 先解析并保存在RequestOption中 等到加载失败时候进行调用
    this.errorholderData = imageKnifeData;
    if (this.loadErrorReady) {
      if(this.errorholderFunc != undefined) {
        this.errorholderFunc.asyncSuccess(imageKnifeData)
      }
    }
  }

  // 加载失败 占位图解析失败
  errorholderOnError = (error:BusinessError|string)=> {
    LogUtil.log("失败占位图解析失败 error =" + error)
  }

  retryholderOnComplete = (imageKnifeData: ImageKnifeData)=>{
    this.retryholderData = imageKnifeData;
    if (this.loadRetryReady) {
      if(this.retryholderFunc != undefined) {
        this.retryholderFunc?.asyncSuccess(imageKnifeData)
      }
    }
  }

  retryholderOnError = (error:BusinessError|string)=>{
    LogUtil.log("重试占位图解析失败 error =" + error)
  }

  loadComplete = (imageKnifeData: ImageKnifeData)=>{
    this.loadMainReady = true;
    // 三级缓存数据加载成功
    if(this.requestListeners != undefined) {
      for (let i = 0;i < this.requestListeners.length; i++) {
        let requestListener = this.requestListeners[i];
        let boolInterception = requestListener.callback("", imageKnifeData);
        if (boolInterception) {
          break;
        }
      }
    }

    if(imageKnifeData.waitSaveDisk){
      // 等落盘结束后主动调用#removeCurrentAndSearchNext方法
    }else{
      // 非落盘情况,直接进行寻找下一个加载
      let imageKnife:ImageKnife | undefined = ImageKnifeGlobal.getInstance().getImageKnife();
      if(imageKnife != undefined) {
        imageKnife.removeRunning(this);
      }
    }






  }

  // 图片文件落盘之后会自动去寻找下一个数据加载
  removeCurrentAndSearchNext =()=>{
    if(ImageKnifeGlobal.getInstance().getImageKnife() != undefined) {
      (ImageKnifeGlobal.getInstance().getImageKnife())?.removeRunning(this);
    }
  }

  loadError = (err:BusinessError|string)=>{
    LogUtil.log("loadError:" + err);
    // 失败占位图展示规则
    if (this.retryholderFunc) {
      // 重试图层优先于加载失败展示
      this.loadRetryReady = true;
      if (this.retryholderData != null) {
        this.retryholderFunc.asyncSuccess(this.retryholderData)
      }
    } else {
      // 失败图层标记,如果已经有数据直接展示失败图层
      this.loadErrorReady = true;
      if (this.errorholderData != null) {
        if(this.errorholderFunc != undefined) {
          this.errorholderFunc.asyncSuccess(this.errorholderData)
        }
      }
    }
    // 加载失败之后
    if(ImageKnifeGlobal.getInstance().getImageKnife() != undefined) {
      (ImageKnifeGlobal.getInstance().getImageKnife())?.removeRunning(this);
    }
  }
}


