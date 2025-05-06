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

import { RequestOption,Size } from '../../imageknife/RequestOption'
import { DiskLruCache } from '@ohos/disklrucache'
import { LruCache } from '../../cache/LruCache'
import { SparkMD5 } from '../../3rd_party/sparkmd5/spark-md5'
import { MemoryCacheProxy } from '../requestmanage/MemoryCacheProxy'
import { DiskCacheProxy } from '../requestmanage/DiskCacheProxy'
import { FileTypeUtil } from '../utils/FileTypeUtil'
import  { IDataFetch } from '../../imageknife/networkmanage/IDataFetch'
import  { IResourceFetch } from '../../imageknife/resourcemanage/IResourceFetch'
import { ImageKnifeData, ImageKnifeType } from '../ImageKnifeData'
import { AllCacheInfo } from '../../imageknife/interface/IAllCacheInfoCallback'
import { ParseImageUtil } from '../utils/ParseImageUtil'
import  { IParseImage } from '../interface/IParseImage'
import image from '@ohos.multimedia.image'
import { SVGParseImpl } from '../utils/svg/SVGParseImpl'
import { GIFParseImpl } from '../utils/gif/GIFParseImpl'
import { GIFFrame } from '../utils/gif/GIFFrame'
import { LogUtil } from '../../imageknife/utils/LogUtil'
import { BusinessError } from '@ohos.base'


export enum Stage {

  INITIALIZE,

  RESOURCE_CACHE,

  DATA_CACHE,

  SOURCE,

  ENCODE,

  FINISHED,
}


export enum RunReason {

  INITIALIZE,

  SWITCH_TO_SOURCE_SERVICE,

  DECODE_DATA,
}

export class RequestManager {
  private TAG: string = "RequestManager";
  private options: RequestOption;
  private mMemoryCacheProxy: MemoryCacheProxy<string, ImageKnifeData>;
  private mDiskCacheProxy: DiskCacheProxy;
  private mIDataFetch: IDataFetch;
  private mIResourceFetch: IResourceFetch<ArrayBuffer>;
  private mParseImageUtil: IParseImage<PixelMap>;

  constructor(option: RequestOption, memoryCache1: LruCache<string, ImageKnifeData>, diskMemoryCache1: DiskLruCache, dataFetch: IDataFetch, resourceFetch: IResourceFetch<ArrayBuffer>) {
    this.options = option;

    // 缓存部分
    this.mMemoryCacheProxy = new MemoryCacheProxy(memoryCache1);
    this.mDiskCacheProxy = new DiskCacheProxy(diskMemoryCache1);

    // 网络下载能力
    this.mIDataFetch = dataFetch;

    // 本地数据解析能力
    this.mIResourceFetch = resourceFetch;

    // 解析image能力
    this.mParseImageUtil = new ParseImageUtil();
  }

  static execute(option: RequestOption, memoryCache1: LruCache<string, ImageKnifeData>, diskMemoryCache1: DiskLruCache, dataFetch: IDataFetch, resourceFetch: IResourceFetch<ArrayBuffer>) {
    LogUtil.log("RequestManager execute")
    let manager = new RequestManager(option, memoryCache1, diskMemoryCache1, dataFetch, resourceFetch);
    return new Promise<ImageKnifeData>(manager.process)
      .then(option.loadComplete)
      .then(manager.loadCompleteAfter)
      .catch(option.loadError);
  }

  loadCompleteAfter =()=>{
    try { // 内部消化问题
      LogUtil.log("loadCompleteAfter!")
      if (this.options.allCacheInfoCallback) {
        LogUtil.log("RequestOption =" + JSON.stringify(this.options));

        // 内存缓存
        let allCacheInfo:AllCacheInfo = {
          memoryCacheInfo:{key:'', data:new ImageKnifeData()},
          resourceCacheInfo:{key:'', path:''},
          dataCacheInfo:{key:'',path:''}
        };
        let memoryCache = this.mMemoryCacheProxy.getValue(this.options.generateCacheKey);
        allCacheInfo.memoryCacheInfo = {
          key: this.options.generateCacheKey,
          data: memoryCache
        }

        // 变换后缓存
        allCacheInfo.resourceCacheInfo = {
          key: SparkMD5.hashBinary(this.options.generateResourceKey) as string,
          path: (this.mDiskCacheProxy.getCachePath() + SparkMD5.hashBinary(this.options.generateResourceKey)) as string
        };

        // 原图缓存
        allCacheInfo.dataCacheInfo = {
          key: SparkMD5.hashBinary(this.options.generateDataKey) as string,
          path: (this.mDiskCacheProxy.getCachePath() + SparkMD5.hashBinary(this.options.generateDataKey)) as string
        }
        this.options.allCacheInfoCallback.callback(allCacheInfo)
      }
    } catch (err) {
      LogUtil.log("after err =" + err)
    }
  }


  // DecodeJob work
  private mStage: Stage = Stage.INITIALIZE;
  private mRunReason: RunReason = RunReason.INITIALIZE;

  process = (onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void)=>{
    LogUtil.log("RequestManager process !");
    this.loadLeve1MemoryCache(onComplete, onError)
  }

  private runWrapped(request: RequestOption, runReason: RunReason, onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void) {
    LogUtil.log("RequestManager runWrapped")
    if (runReason == RunReason.INITIALIZE) {
      this.mStage = this.getNextStage(request, this.mStage);
      this.searchLoadFrom(this.options, this.mStage, onComplete, onError);
    } else {
      throw new Error("Unrecognized run reason: " + runReason)
    }
  }

  private getNextStage(request: RequestOption, current: Stage): Stage{
    if (current == Stage.INITIALIZE) {
      return request.strategy.decodeCachedResource()
        ? Stage.RESOURCE_CACHE
        : this.getNextStage(request, Stage.RESOURCE_CACHE);
    } else if (current == Stage.RESOURCE_CACHE) {
      return request.strategy.decodeCachedData()
        ? Stage.DATA_CACHE
        : this.getNextStage(request, Stage.DATA_CACHE);
    } else if (current == Stage.DATA_CACHE) {
      return request.onlyRetrieveFromCache ? Stage.FINISHED : Stage.SOURCE;
    } else if (current == Stage.SOURCE) {
      return Stage.FINISHED;
    } else if (current == Stage.FINISHED) {
      return Stage.FINISHED;
    } else {
      throw new Error("Unrecognized stage: " + current);
    }
  }

  // 究竟从哪里加载数据
  private searchLoadFrom(request: RequestOption, current: Stage, onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void) {
    LogUtil.log("RequestManager searchLoadFrom")
    if (current == Stage.RESOURCE_CACHE) {
      this.loadDiskFromTransform(request, onComplete, onError);
    } else if (current == Stage.DATA_CACHE) {
      this.loadDiskFromSource(request, onComplete, onError);
    } else if (current == Stage.SOURCE) {
      this.parseSource(request, onComplete, onError)
    } else if (current == Stage.FINISHED) {
      onError("在仅从缓存获取数据中，未获取到数据！")
    } else {
      throw new Error("Unrecognized stage: " + current);
    }
  }

  // 加载网络资源
  private loadSourceFromNetwork(request: RequestOption, onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void) {
      let success = (arraybuffer:ArrayBuffer) => {
        this.downloadSuccess(arraybuffer, onComplete, onError)
      }
      let error = (errorMsg:string) =>{
        onError(errorMsg)
      }
      this.mIDataFetch.loadData(request, success, error);
  }

  // 加载本地资源
  private loadSourceFormNative(request: RequestOption, onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void) {
    LogUtil.log("RequestManager loadSourceFormNative")
    // 本地解析后进行一级缓存
    let success = (arrayBuffer:ArrayBuffer) => {
      // 使用媒体子系统 ImageSource解析文件 获取PixelMap
      let fileTypeUtil = new FileTypeUtil();
      let typeValue = fileTypeUtil.getFileType(arrayBuffer)
      LogUtil.log("RequestManager  - 文件类型为= " + typeValue)
      // gif处理
      if(ImageKnifeData.GIF == typeValue && !request.dontAnimateFlag){
        // 处理gif
        this.gifProcess(onComplete,onError, arrayBuffer,typeValue,(imageKnifeData)=>{
          this.mMemoryCacheProxy.putValue(this.options.generateCacheKey, imageKnifeData)
        })
      }else if(ImageKnifeData.SVG == typeValue){
        // 处理svg
        this.svgProcess(onComplete,onError,arrayBuffer,typeValue,(imageKnifeData)=>{
          this.mMemoryCacheProxy.putValue(this.options.generateCacheKey,imageKnifeData)
        })
      } else {
        if (request.transformations[0]) {
          request.transformations[0].transform(arrayBuffer, request, {asyncTransform:(error:BusinessError|string, pixelMap: PixelMap|null) => {
            // 输出给Image
            if (pixelMap) {

              let imageKnifeData = this.createImagePixelMap(ImageKnifeType.PIXELMAP, pixelMap);
              this.mMemoryCacheProxy.putValue(request.generateCacheKey, imageKnifeData);
              onComplete(imageKnifeData);
            } else {
              onError(error);
            }
          }})
        }
        else {
          let success = (value: PixelMap) => {
            let imageKnifeData = this.createImagePixelMap(ImageKnifeType.PIXELMAP, value);
            this.mMemoryCacheProxy.putValue(request.generateCacheKey, imageKnifeData);
            onComplete(imageKnifeData);
          }
          this.mParseImageUtil.parseImage(arrayBuffer, success, onError)
        }
      }
    }
    let ctx = request.getModuleContext();
    if(ctx!=undefined){
      this.mIResourceFetch.loadResource(ctx,request.loadSrc as Resource, success, onError);
    }else{
    onError('RequestManager loadSourceFormNative moduleContext is undefined! please check it')
    }

  }
  // 加载磁盘缓存 原图
  private loadDiskFromSource(request: RequestOption, onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void) {
    LogUtil.log("RequestManager loadDiskFromSource")
    let cached = this.mDiskCacheProxy.getValue(request.generateDataKey)
    if (cached != null && cached.byteLength > 0) {
      this.parseDiskFile2PixelMap(request, cached, onComplete, onError)
    } else {
      this.mStage = Stage.SOURCE;
      this.searchLoadFrom(this.options, this.mStage, onComplete, onError);
    }
  }

  // 加载磁盘缓存 变换后图片
  private loadDiskFromTransform(request: RequestOption, onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void) {
    LogUtil.log("RequestManager loadDiskFromTransform")
    let cached = this.mDiskCacheProxy.getValue(request.generateResourceKey)
    if (cached != null) {
      this.parseDiskTransformFile2PixelMap(request, cached, onComplete, onError)
    } else {
      this.mStage = Stage.DATA_CACHE;
      this.searchLoadFrom(this.options, this.mStage, onComplete, onError);
    }
  }

  parseSource(request: RequestOption, onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void) {
      LogUtil.log("RequestManager parseSource")
      if ((typeof (request.loadSrc as image.PixelMap).isEditable) == 'boolean') {
        // PixelMap 外层捕获效率更高，不会进入这里
      } else if (typeof request.loadSrc == 'string') {
        this.loadSourceFromNetwork(request, onComplete, onError);
      } else {
        let res = request.loadSrc as Resource;
        if (typeof res.id != 'undefined' && typeof res.id != 'undefined') {
          this.loadSourceFormNative(request, onComplete, onError)
        } else {
          LogUtil.log("输入参数有问题！")
        }
      }

  }

  private loadLeve1MemoryCache(onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void) {
    LogUtil.log("RequestManager loadLeve1MemoryCache")
    // 一级缓存 内存获取
    let cache = this.mMemoryCacheProxy.loadMemoryCache(this.options.generateCacheKey, this.options.isCacheable);
    if (cache == null || typeof cache == 'undefined') {
      // 处理磁盘加载 网络加载
      this.runWrapped(this.options, this.mRunReason, onComplete, onError)
    } else {
      // 需要清理状态
      cache.waitSaveDisk = false;
      onComplete(cache);
      return

    }
  }

  // 解析磁盘文件变成PixeMap
  private parseDiskFile2PixelMap(request: RequestOption, source: ArrayBuffer, onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void) {
    // 步骤一：文件转为pixelMap 然后变换 给Image组件
    let fileTypeUtil = new FileTypeUtil();
    let typeValue = fileTypeUtil.getFileType(source);
    // 解析磁盘文件 gif 和 svg
    if(ImageKnifeData.GIF == typeValue && !request.dontAnimateFlag){
      // 处理gif
      this.gifProcess(onComplete,onError,source,typeValue, (imageKnifeData)=>{
        this.mMemoryCacheProxy.putValue(this.options.generateCacheKey, imageKnifeData)
      })
    }else if(ImageKnifeData.SVG == typeValue){
      this.svgProcess(onComplete,onError, source, typeValue, (imageKnifeData)=>{
        this.mMemoryCacheProxy.putValue(this.options.generateCacheKey, imageKnifeData)
      })
    } else {
      if (this.options.transformations[0]) {
        if (this.options.thumbSizeMultiplier) {
          let thumbOption:RequestOption = new RequestOption();
          thumbOption.setImageViewSize({
            width: Math.round(this.options.thumbSizeMultiplier * this.options.size.width),
            height: Math.round(this.options.thumbSizeMultiplier * this.options.size.height)
          })
          let ctx = this.options.getModuleContext()
          if(ctx != undefined){
            thumbOption.setModuleContext(ctx)
          }else{
            onError('RequestManager parseDiskFile2PixelMap moduleContext is undefined, please check it!')
            return
          }
          let thumbCallback = this.options.thumbholderOnComplete;
          let thumbError = this.options.thumbholderOnError;
          this.options.transformations[0].transform(source, thumbOption,{asyncTransform: (error:BusinessError|string, pixelMap: PixelMap|null) => {
            if (pixelMap) {
              let imageKnifeData = this.createImagePixelMap(ImageKnifeType.PIXELMAP, pixelMap);
              thumbCallback(imageKnifeData);
            } else {
              thumbError(error);
            }
          }})
          setTimeout(()=>{
            this.options.transformations[0].transform(source, request, {asyncTransform: (error:BusinessError|string, pixelMap: PixelMap|null) => {
              if (pixelMap) {
                // 保存一份变换后的图片PixelMap到MemoryCache
                let imageKnifeData = this.createImagePixelMap(ImageKnifeType.PIXELMAP, pixelMap);
                this.mMemoryCacheProxy.putValue(this.options.generateCacheKey, imageKnifeData);
                onComplete(imageKnifeData);
              } else {
                onError(error);
              }
            }})
          },this.options.thumbDelayTime);
        }
        else {
          this.options.transformations[0].transform(source, request, {asyncTransform: (error:BusinessError|string, pixelMap: PixelMap|null) => {
            if (pixelMap) {
              // 保存一份变换后的图片PixelMap到MemoryCache
              let imageKnifeData = this.createImagePixelMap(ImageKnifeType.PIXELMAP, pixelMap);
              this.mMemoryCacheProxy.putValue(this.options.generateCacheKey, imageKnifeData);
              onComplete(imageKnifeData);
            } else {
              onError(error);
            }
          }})
        }
      } else {
        // thumbnail 缩略图部分
        if (request.thumbSizeMultiplier) {
          let thumbCallback = this.options.thumbholderOnComplete
          let thumbError = this.options.thumbholderOnError
          let thumbSuccess = (value: PixelMap) => {
            let imageKnifeData = this.createImagePixelMap(ImageKnifeType.PIXELMAP, value);
            thumbCallback(imageKnifeData);
          }
          this.mParseImageUtil.parseImageThumbnail(request.thumbSizeMultiplier, source, thumbSuccess, thumbError);
          setTimeout(()=>{
            let success = (value: PixelMap) => {
            let imageKnifeData = this.createImagePixelMap(ImageKnifeType.PIXELMAP, value);
            this.mMemoryCacheProxy.putValue(this.options.generateCacheKey, imageKnifeData);
            onComplete(imageKnifeData);
          }
          this.mParseImageUtil.parseImage(source, success, onError)
          },this.options.thumbDelayTime)
        }
        else {
          let success = (value: PixelMap) => {
            let imageKnifeData = this.createImagePixelMap(ImageKnifeType.PIXELMAP, value);
            this.mMemoryCacheProxy.putValue(this.options.generateCacheKey, imageKnifeData);
            onComplete(imageKnifeData);
          }
          this.mParseImageUtil.parseImage(source, success, onError)
        }
      }
    }
  }

  // 解析磁盘变换后文件变成PixeMap
  private parseDiskTransformFile2PixelMap(request: RequestOption, source: ArrayBuffer, onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void) {
    let fileTypeUtil = new FileTypeUtil();
    let typeValue = fileTypeUtil.getFileType(source);
    // thumbnail 缩略图部分
    if (request.thumbSizeMultiplier) {
      let thumbCallback = this.options.thumbholderOnComplete
      let thumbError = this.options.thumbholderOnError
      let thumbSuccess = (value: PixelMap) => {
        let imageKnifeData = this.createImagePixelMap(ImageKnifeType.PIXELMAP, value);
        thumbCallback(imageKnifeData);
      }
      this.mParseImageUtil.parseImageThumbnail(request.thumbSizeMultiplier, source, thumbSuccess, thumbError);
      setTimeout(()=>{
        let success = (value: PixelMap) => {
          let imageKnifeData = this.createImagePixelMap(ImageKnifeType.PIXELMAP, value);
          this.mMemoryCacheProxy.putValue(this.options.generateCacheKey, imageKnifeData);
          onComplete(imageKnifeData);
        }
        this.mParseImageUtil.parseImage(source, success, onError)
      },this.options.thumbDelayTime)
    }else{
      let success = (value: PixelMap) => {
        let imageKnifeData = this.createImagePixelMap(ImageKnifeType.PIXELMAP, value)
        this.mMemoryCacheProxy.putValue(this.options.generateCacheKey, imageKnifeData);
        onComplete(imageKnifeData);
      }
      this.mParseImageUtil.parseImage(source, success, onError)
    }
  }

  private downloadSuccess(source: ArrayBuffer, onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void) {
    LogUtil.log('Download task completed.');

    if(source == null || source == undefined || source.byteLength <= 0){
      onError('Download task completed. but download file is empty!')
      return
    }

    // 下载成功之后 去data/data/包名/唯一路径/文件名  读取数据
    // 步骤一：文件转为pixelMap 然后变换 给Image组件
    // 步骤二: 文件名保存一份全局
    // 步骤三:查看文件是否支持 非支持类型直接返回
    let fileTypeUtil = new FileTypeUtil();
    let filetype:string|null = fileTypeUtil.getFileType(source);
    if(filetype == null){
      onError("下载文件解析后类型为null,请检查数据源！");
      return;
    }

    if (!fileTypeUtil.isImage(source)) {
      onError("暂不支持 下载文件类型！类型=" + filetype);
      return;
    }

    // 解析磁盘文件 gif 和 svg
    if(ImageKnifeData.GIF == filetype && !this.options.dontAnimateFlag){
      // 处理gif
      this.gifProcess(onComplete,onError,source,filetype, (imageKnifeData)=>{
        this.mMemoryCacheProxy.putValue(this.options.generateCacheKey, imageKnifeData)
      })

      // 保存二级磁盘缓存
      Promise.resolve(source)
        .then((arraybuffer: ArrayBuffer)=>{
          this.mDiskCacheProxy.putValue(this.options.generateDataKey, arraybuffer)
        })
        .catch( (err:BusinessError)=>{
          LogUtil.log('download file is ='+ImageKnifeData.GIF+'and save diskLruCache error ='+ (err as BusinessError))
        })
    }else if(ImageKnifeData.SVG == filetype){
      // 处理svg
      this.svgProcess(onComplete,onError, source, filetype, (imageKnifeData)=>{
        this.mMemoryCacheProxy.putValue(this.options.generateCacheKey, imageKnifeData)
      })

      // 保存二级磁盘缓存
      Promise.resolve(source)
        .then((arraybuffer: ArrayBuffer)=>{
          this.mDiskCacheProxy.putValue(this.options.generateDataKey, arraybuffer)
        })
        .catch((err:BusinessError)=>{
          LogUtil.log('download file is ='+ImageKnifeData.SVG+'and save diskLruCache error ='+ (err as BusinessError))
        })
    } else {
      // 进行变换
      if (this.options.transformations[0]) {
        // thumbnail 缩略图部分
        if (this.options.thumbSizeMultiplier) {
          if(filetype != null) {
            this.thumbnailProcess(source, filetype, onComplete, onError);
          }
        } else {
          this.options.transformations[0].transform(source, this.options, {asyncTransform: (error:BusinessError|string, pixelMap: PixelMap|null) => {
            if (pixelMap) {
              if(filetype != null) {
                this.saveCacheAndDisk(pixelMap, filetype, onComplete, source);
              }
            } else {
              onError(error);
            }
          }})
        }
      } else {
        // thumbnail 缩略图部分
        if (this.options.thumbSizeMultiplier) {
          let thumbCallback = this.options.thumbholderOnComplete
          let thumbError = this.options.thumbholderOnError
          let thumbSuccess = (value: PixelMap) => {
            let imageKnifeData = this.createImagePixelMap(ImageKnifeType.PIXELMAP, value);
            thumbCallback(imageKnifeData);
          }
          this.mParseImageUtil.parseImageThumbnail(this.options.thumbSizeMultiplier, source, thumbSuccess, thumbError);
          setTimeout(() => {
            let success = (value: PixelMap) => {
              if(filetype != null) {
                this.saveCacheAndDisk(value, filetype, onComplete, source);
              }
            }
            this.mParseImageUtil.parseImage(source, success, onError)
          }, this.options.thumbDelayTime)
        } else {
          let success = (value: PixelMap) => {
            if(filetype != null) {
              this.saveCacheAndDisk(value, filetype, onComplete, source);
            }
          }
          this.mParseImageUtil.parseImage(source, success, onError)
        }
      }
    }
  }

  createImagePixelMap(imageKnifeType: ImageKnifeType, imageKnifeValue: PixelMap): ImageKnifeData{
    return ImageKnifeData.createImagePixelMap(imageKnifeType,imageKnifeValue);
  }

  createImageGIFFrame(imageKnifeType: ImageKnifeType, imageKnifeValue: GIFFrame[]): ImageKnifeData{
    return ImageKnifeData.createImageGIFFrame(imageKnifeType,imageKnifeValue);
  }



  private saveCacheAndDisk(value: PixelMap, filetype:string, onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, source:ArrayBuffer) {
    let imageKnifeData = this.createImagePixelMap(ImageKnifeType.PIXELMAP, value);
    this.mMemoryCacheProxy.putValue(this.options.generateCacheKey, imageKnifeData);
    let save2DiskCache = (arraybuffer:ArrayBuffer) => {
      this.mDiskCacheProxy.putValue(this.options.generateDataKey, arraybuffer)
      // 落盘之后需要主动移除当前request并且调用下一个加载
      let removeCurrentAndSearchNextRun = this.options.removeCurrentAndSearchNext
      removeCurrentAndSearchNextRun();
    }
    let runSave2Disk = (resolve:(value:ArrayBuffer)=>void|PromiseLike<ArrayBuffer>, reject:(reason?:BusinessError|string)=>void) => {
      resolve(source);
    }
    let promise = new Promise(runSave2Disk);
    promise.then(save2DiskCache);
    imageKnifeData.waitSaveDisk = true;
    onComplete(imageKnifeData);
  }

  thumbnailProcess(source:ArrayBuffer, filetype:string, onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void){
    let thumbOption = new RequestOption();
    let ctx = this.options.getModuleContext()
    if(ctx != undefined){
      thumbOption.setModuleContext(ctx)
    }else{
      onError('RequestManager thumbnailProcess moduleContext is undefined, please check it!')
      return
    }
    thumbOption.setImageViewSize({
      width: Math.round(this.options.thumbSizeMultiplier * this.options.size.width),
      height: Math.round(this.options.thumbSizeMultiplier * this.options.size.height)
      })
    let thumbCallback = this.options.thumbholderOnComplete
    let thumbError = this.options.thumbholderOnError
    this.options.transformations[0].transform(source, thumbOption, {asyncTransform: (error:BusinessError|string, pixelMap: PixelMap|null) => {
    if (pixelMap) {
      let imageKnifeData = this.createImagePixelMap(ImageKnifeType.PIXELMAP, pixelMap);
      thumbCallback(imageKnifeData);
      } else {
        thumbError(error);
        }
        }})
      setTimeout(() => {
        this.options.transformations[0].transform(source, this.options,{asyncTransform: (error:BusinessError|string, pixelMap: PixelMap|null) => {
        if (pixelMap) {
          this.saveCacheAndDisk(pixelMap, filetype, onComplete, source);
          } else {
            onError(error);
          }
          }})
        }, this.options.thumbDelayTime)
  }
  private svgProcess(onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void, arraybuffer:ArrayBuffer, typeValue:string, cacheStrategy?: (cacheData: ImageKnifeData) => void) {
    let svgParseImpl = new SVGParseImpl()
    let size:Size = { width: this.options.size.width, height: this.options.size.height }
    svgParseImpl.parseSvg(arraybuffer, size).then((value: PixelMap) => {
      let imageKnifeData = ImageKnifeData.createImagePixelMap(ImageKnifeType.PIXELMAP, value)
      if(cacheStrategy){
        cacheStrategy(imageKnifeData)
      }
      onComplete(imageKnifeData)
    }).catch((err:BusinessError) => {
      onError(err)
    })
  }

  private gifProcess(onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void, arraybuffer:ArrayBuffer, typeValue:string,  cacheStrategy?: (cacheData: ImageKnifeData) => void) {
    let gifParseImpl = new GIFParseImpl()
    gifParseImpl.parseGifs(arraybuffer, (data?:GIFFrame[],err?:BusinessError|string)=>{
      if(err){
        onError(err)
      }
      LogUtil.log("gifProcess data is null:"+(data == null));
      if(!!data){
        let imageKnifeData = this.createImageGIFFrame(ImageKnifeType.GIFFRAME,data)
        LogUtil.log('gifProcess 生成gif 返回数据类型')
        if(cacheStrategy){
          LogUtil.log('gifProcess 生成gif并且存入了缓存策略')
          cacheStrategy(imageKnifeData)
        }
        onComplete(imageKnifeData)
      }else{
        onError('Parse GIF callback data is null, you need check callback data!')
      }
    })
  }


}


