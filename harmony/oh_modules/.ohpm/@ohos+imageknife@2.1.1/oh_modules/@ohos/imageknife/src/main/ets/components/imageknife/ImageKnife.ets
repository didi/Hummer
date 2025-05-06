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

import { DiskLruCache } from "@ohos/disklrucache"
import { EngineKeyFactories } from "../cache/key/EngineKeyFactories"
import { EngineKeyInterface } from "../cache/key/EngineKeyInterface"
import { RequestOption } from "../imageknife/RequestOption"
import { AsyncCallback } from "../imageknife/interface/AsyncCallback"
import { PlaceHolderManager } from "../imageknife/holder/PlaceHolderManager"
import { RetryHolderManager } from "../imageknife/holder/RetryHolderManager"
import { ErrorHolderManager } from "../imageknife/holder/ErrorHolderManager"
import { RequestManager } from "../imageknife/requestmanage/RequestManager"
import { NONE } from "../cache/diskstrategy/enum/NONE"
import { FileTypeUtil } from '../imageknife/utils/FileTypeUtil'
import { DownloadClient } from '../imageknife/networkmanage/DownloadClient'
import { IDataFetch } from '../imageknife/networkmanage/IDataFetch'
import { ParseResClient } from '../imageknife/resourcemanage/ParseResClient'
import { IResourceFetch } from '../imageknife/resourcemanage/IResourceFetch'
import { ImageKnifeData, ImageKnifeType } from '../imageknife/ImageKnifeData'
import { ImageKnifeGlobal } from '../imageknife/ImageKnifeGlobal'
import image from "@ohos.multimedia.image"
import { CompressBuilder } from "../imageknife/compress/CompressBuilder"
import { IDrawLifeCycle } from '../imageknife/interface/IDrawLifeCycle'
import { LogUtil } from '../imageknife/utils/LogUtil'
import { EasyLinkedHashMap } from './utils/base/EasyLinkedHashMap'
import { MethodMutex } from './utils/base/MethodMutex'
import worker from '@ohos.worker'
import common from '@ohos.app.ability.common'
import HashMap from '@ohos.util.HashMap'
import LinkedList from '@ohos.util.LinkedList'
import { MemoryLruCache } from '../cache/MemoryLruCache'

export class ImageKnife {
  static readonly SEPARATOR: string = '/'
  memoryCache: MemoryLruCache;
  diskMemoryCache: DiskLruCache;
  dataFetch: IDataFetch;
  resourceFetch: IResourceFetch<ArrayBuffer>;
  filesPath: string = ""; // data/data/包名/files目录


  placeholderCache: string = "placeholderCache"
  runningMaps: EasyLinkedHashMap<string, RequestOption>;
  pendingMaps: EasyLinkedHashMap<string, RequestOption>;
  pausedMaps: EasyLinkedHashMap<string, RequestOption>;
  isPaused: boolean = false;
  mutex: MethodMutex = new MethodMutex();
  fileTypeUtil: FileTypeUtil; // 通用文件格式辨别
  diskCacheFolder: string = "ImageKnifeDiskCache"
  defaultListener: AsyncCallback<ImageKnifeData> = {
    callback: (err: string, data: ImageKnifeData) => {
      return false
    }
  }; // 全局监听器

  // gifWorker
  gifWorker: worker.ThreadWorker | undefined = undefined;
  defaultLifeCycle: IDrawLifeCycle | undefined = undefined;
  // 开发者可配置全局缓存
  engineKeyImpl: EngineKeyInterface;

  private constructor() {

    this.runningMaps = new EasyLinkedHashMap();
    this.pendingMaps = new EasyLinkedHashMap();
    this.pausedMaps = new EasyLinkedHashMap();

    // 构造方法传入size 为保存文件个数
    this.memoryCache = new MemoryLruCache(100,100*1024*1024);

    // 创建disk缓存 传入的size 为多少比特 比如20KB 传入20*1024
    this.diskMemoryCache = DiskLruCache.create(ImageKnifeGlobal.getInstance().getHapContext());

    // 创建网络下载能力
    this.dataFetch = new DownloadClient();

    // 创建本地数据解析能力
    this.resourceFetch = new ParseResClient();

    // 初始化本地 文件保存
    this.filesPath = (ImageKnifeGlobal.getInstance().getHapContext() as common.UIAbilityContext).filesDir as string;

    // 通用文件格式识别初始化
    this.fileTypeUtil = new FileTypeUtil();

    this.engineKeyImpl = new EngineKeyFactories();


  }

  getMemoryCache(): MemoryLruCache {
    return this.memoryCache;
  }

  public static with(context: Object): ImageKnifeGlobal {
    // 存入hapContext;
    let global: ImageKnifeGlobal = ImageKnifeGlobal.getInstance();
    global.setHapContext(context)

    // 初始化ImageKnife
    if (!ImageKnife.sInstance) {
      ImageKnife.sInstance = new ImageKnife();
    }

    // 存入ImageKnife
    global.setImageKnife(ImageKnife.sInstance)

    return global;
  }

  getDiskMemoryCache(): DiskLruCache {
    return this.diskMemoryCache;
  };

  setDiskMemoryCache(diskLruCache: DiskLruCache) {
    this.diskMemoryCache = diskLruCache;
  };

  getFileTypeUtil(): FileTypeUtil {
    return this.fileTypeUtil;
  }

  getImageKnifeContext() {
    return ImageKnifeGlobal.getInstance().getHapContext();
  }

  setMemoryCache(lrucache: MemoryLruCache) {
    this.memoryCache = lrucache;
  }

  getDefaultListener() {
    return this.defaultListener;
  }

  setGifWorker(worker: worker.ThreadWorker) {
    this.gifWorker = worker
  }

  getGifWorker() {
    return this.gifWorker;
  }

  getDefaultLifeCycle() {
    return this.defaultLifeCycle;
  }

  setDefaultLifeCycle(viewLifeCycle: IDrawLifeCycle) {
    this.defaultLifeCycle = viewLifeCycle;
  }

  setEngineKeyImpl(impl: EngineKeyInterface) {
    this.engineKeyImpl = impl;
  }

  private static sInstance: ImageKnife;

  setDefaultListener(newDefaultListener: AsyncCallback<ImageKnifeData>) {
    this.defaultListener = newDefaultListener;
  }

  public compressBuilder(): CompressBuilder {
    return new CompressBuilder();
  }


  // 设置缓存张数，缓存大小，单位字节
  public setLruCacheSize(size: number,memory:number) {
    if (this.memoryCache.map.size() <= 0) {
      this.memoryCache = new MemoryLruCache(size,memory);
    } else {
      let newLruCache = new MemoryLruCache(size,memory);
      this.memoryCache.foreachLruCache((value: ImageKnifeData, key: string, map: Object) => {
        newLruCache.put(key, value);
      })
      this.memoryCache = newLruCache;
    }
  }

  public replaceDataFetch(fetch: IDataFetch) {
    this.dataFetch = fetch;
  }

  // 替代原来的DiskLruCache
  public replaceDiskLruCache(size: number) {
    if (this.diskMemoryCache.getCacheMap().size() <= 0) {
      this.diskMemoryCache = DiskLruCache.create(ImageKnifeGlobal.getInstance().getHapContext(), size);
    } else {
      let newDiskLruCache = DiskLruCache.create(ImageKnifeGlobal.getInstance().getHapContext(), size);
      this.diskMemoryCache.foreachDiskLruCache((value: string | ArrayBuffer, key: string, map: Object) => {
        newDiskLruCache.set(key, value);
      })
      this.diskMemoryCache = newDiskLruCache;
    }
  }

  // 预加载 resource资源一级缓存，string资源实现二级缓存
  preload(request: RequestOption): void {
    // 每个request 公共信息补充
    request.setFilesPath(this.filesPath);
    return this.parseSource(request);
  }

  // 暂停所有请求
  async pauseRequests(): Promise<void> {
    await this.mutex.lock(async () => {
      this.isPaused = true;

      // 将未删除的所有request [run pend] 放入 [pause]
      LogUtil.log('dodo pauseRequests start1 pausedMaps size=' + this.pausedMaps.size() + ' runMaps Size=' + this.runningMaps.size() + '  pendMaps Size=' + this.pendingMaps.size())

      // 将run存入pause
      let runNode = this.runningMaps.getHead();
      while (runNode) {
        let request = runNode.value;
        this.pausedMaps.put(request.uuid, request)
        runNode = runNode.next;
      }
      this.runningMaps.clear();
      LogUtil.log('dodo pauseRequests start2 pausedMaps size=' + this.pausedMaps.size() + ' runMaps Size=' + this.runningMaps.size() + '  pendMaps Size=' + this.pendingMaps.size())

      let pendNode = this.pendingMaps.getHead();
      while (pendNode) {
        let request = pendNode.value;
        this.pausedMaps.put(request.uuid, request)
        pendNode = pendNode.next
      }
      this.pendingMaps.clear()
      LogUtil.log('dodo pauseRequests start3 pausedMaps size=' + this.pausedMaps.size() + ' runMaps Size=' + this.runningMaps.size() + '  pendMaps Size=' + this.pendingMaps.size())
    })
  }

  // 恢复所有被暂停的请求
  async resumeRequests(): Promise<void> {
    await this.mutex.lock(async () => {
      this.isPaused = false;
      LogUtil.log('dodo resumeRequest start1 pausedMaps size=' + this.pausedMaps.size() + ' runMaps Size=' + this.runningMaps.size() + '  pendMaps Size=' + this.pendingMaps.size())
      // 重启了之后需要把paused 里面的所有request重新发送
      let headNode = this.pausedMaps.getHead();
      while (headNode) {
        let request = headNode.value
        this.loadCacheManager(request)
        headNode = headNode.next
      }
      this.pausedMaps.clear()
      LogUtil.log('dodo resumeRequest start1 pausedMaps size=' + this.pausedMaps.size() + ' runMaps Size=' + this.runningMaps.size() + '  pendMaps Size=' + this.pendingMaps.size())
    })
  }

  // 删除 请求
  remove(uuid: string) {
    if (this.isPaused) {
      this.pausedMaps.remove(uuid)
    } else {
      // TODO 哪些请求可以删除
      this.pendingMaps.remove(uuid)
      this.runningMaps.remove(uuid)
    }
  }

  // 正常加载
  call(request: RequestOption): void {
    // 添加全局监听
    if (this.defaultListener) {
      request.addListener(this.defaultListener)
    }

    // 每个request 公共信息补充
    request.setFilesPath(this.filesPath);

    // 首先执行占位图 解析任务
    if (request.placeholderSrc) {
      PlaceHolderManager.execute(request)
    }
    // 其次执行重试占位图 解析任务
    if (request.retryholderSrc) {
      RetryHolderManager.execute(request)
    }

    // 最后解析错误占位图
    if (request.errorholderSrc) {
      ErrorHolderManager.execute(request)
    }
    return this.parseSource(request);
  }

  loadResources(request: RequestOption) {
    let factories: EngineKeyInterface;
    let cacheKey: string;
    let transferKey: string;
    let dataKey: string;
    if (this.engineKeyImpl) {
      factories = this.engineKeyImpl;
    } else {
      factories = new EngineKeyFactories();
    }
    // 生成内存缓存key 内存 变换后磁盘

    let loadKey = '';
    if (typeof request.loadSrc == 'string') {
      loadKey = request.loadSrc;
    } else {
      loadKey = JSON.stringify(request.loadSrc);
    }

    let size = JSON.stringify(request.size);

    let transformed = '';
    if (request && request.transformations) {
      for (let i = 0; i < request.transformations.length; i++) {
        if (i == request.transformations.length - 1) {
          transformed += request.transformations[i].getName() + "";
        } else {
          transformed += request.transformations[i].getName() + ",";
        }
      }
    }

    let dontAnimateFlag = request.dontAnimateFlag;

    let signature = request.signature;

    cacheKey = factories.generateMemoryCacheKey(loadKey,size,transformed,dontAnimateFlag,signature);

    // 生成磁盘缓存变换后数据key 变换后数据保存在磁盘
    transferKey = factories.generateTransformedDiskCacheKey(loadKey,size,transformed,dontAnimateFlag,signature);

    // 生成磁盘缓存源数据key 原始数据保存在磁盘
    dataKey = factories.generateOriginalDiskCacheKey(loadKey,signature);

    request.generateCacheKey = cacheKey;
    request.generateResourceKey = transferKey;
    request.generateDataKey = dataKey;

    this.loadCacheManager(request);
  }

  // 删除执行结束的running
  removeRunning(request: RequestOption) {
    if (this.isPaused) {

    } else {
      this.runningMaps.remove(request.uuid);
      console.log('dodo runningMaps length =' + this.runningMaps.size())
      let previousRequest = request;
      this.loadNextPending(previousRequest);
    }
  }

  // 执行相同key的pending队列请求
  private keyEqualPendingToRun(nextPending: RequestOption) {




    this.pendingMaps.remove(nextPending.uuid)
    this.runningMaps.put(nextPending.uuid, nextPending);

    RequestManager.execute((nextPending as RequestOption), this.memoryCache, this.diskMemoryCache, this.dataFetch, this.resourceFetch)

  }

  private searchNextKeyToRun() {
    // 其次则寻找pending中第一个和running不重复的requestOrKey
    let pendingTailNode = this.pendingMaps.getTail();
    while (pendingTailNode) {
      let pendingRequest = pendingTailNode.value;
      let hasEqual = false;
      let runningTailNode = this.runningMaps.getTail();
      while (runningTailNode) {
        let runningRequest = runningTailNode.value;
        if (this.requestOrKeyEqual(pendingRequest, runningRequest)) {
          hasEqual = true;
          break
        }
        runningTailNode = runningTailNode.prev;
      }

      if (hasEqual) {
        break;
      }
      pendingTailNode = pendingTailNode.prev;
    }

    if (pendingTailNode != null && pendingTailNode.value != null) {
      let nextPending = pendingTailNode.value;
      this.runningMaps.put(nextPending.uuid, nextPending)
      this.pendingMaps.remove(nextPending.uuid)
      RequestManager.execute((nextPending as RequestOption), this.memoryCache, this.diskMemoryCache, this.dataFetch, this.resourceFetch)
    }
  }


  // 加载下一个key的请求
  private loadNextPending(request: RequestOption) {
    let hasEqualRunning = false;
    let tailNode = this.pendingMaps.getTail();
    while (tailNode) {
      if (this.requestOrKeyEqual(request, tailNode.value)) {
        hasEqualRunning = true;
        break;
      }
      tailNode = tailNode.prev;
    }

    if (hasEqualRunning) {
      if(tailNode != null && tailNode.value != null) {
        this.keyEqualPendingToRun(tailNode.value);
      }
    } else {
      this.searchNextKeyToRun();
    }
  }

  // 启动新线程 去磁盘取 去网络取
  private loadCacheManager(request: RequestOption) {
    if (this.isPaused) {
      // 将当前request存入pausedMaps
      this.pausedMaps.put(request.uuid, request);
    } else {
      // 正常逻辑
      if (this.keyNotEmpty(request)) {
        let hasRunningRequest = false;
        // 遍历双向链表 从尾巴到头
        let tailNode = this.runningMaps.getTail();
        while (tailNode) {
          if (this.requestOrKeyEqual(request, tailNode.value)) {
            hasRunningRequest = true;
            break;
          }
          tailNode = tailNode.prev
        }

        if (hasRunningRequest) {
          this.pendingMaps.put(request.uuid, request);


        } else {
          this.runningMaps.put(request.uuid, request)


          // 不存在相同key的 任务可以并行
          RequestManager.execute(request, this.memoryCache, this.diskMemoryCache, this.dataFetch, this.resourceFetch)
        }
      }
      else {
        LogUtil.log("key没有生成无法进入存取！")
      }
    }
  }

  private keyNotEmpty(request: RequestOption): boolean {
    if (
      request.generateCacheKey != null && request.generateCacheKey.length > 0 &&
        request.generateDataKey != null && request.generateDataKey.length > 0 &&
        request.generateResourceKey != null && request.generateResourceKey.length > 0
    ) {
      return true;
    }
    return false;
  }

  private keyEqual(request1: RequestOption, request2: RequestOption): boolean {
    // key 完全相等的情况
    if (
      request1.generateCacheKey == request2.generateCacheKey &&
        request1.generateResourceKey == request2.generateResourceKey &&
        request1.generateDataKey == request2.generateDataKey
    ) {
      return true;
    }

    return false;
  }

  // 非严格校验模式,如果所有key相等我们认为一定相等, 如果请求类型是string 网络请求url或者uri相等 我们也认为该请求应该只发送一个即可,后续请求会去缓存或者磁盘读取
  private requestOrKeyEqual(request1: RequestOption, request2: RequestOption): boolean {
    // key 完全相等的情况
    if (
      request1.generateCacheKey == request2.generateCacheKey &&
        request1.generateResourceKey == request2.generateResourceKey &&
        request1.generateDataKey == request2.generateDataKey
    ) {
      return true;
    }

    // 如果加载的是网络url或者是本地文件uri读取,那么loadSrc相同就认为是同一个请求
    if (
      typeof request1.loadSrc == 'string' && typeof request2.loadSrc == 'string' && request1.loadSrc == request2.loadSrc
    ) {
      return true;
    }

    return false;
  }

  private parseSource(request: RequestOption): void {
    if ((typeof (request.loadSrc as image.PixelMap).isEditable) == 'boolean') {
      let imageKnifeData = ImageKnifeData.createImagePixelMap(ImageKnifeType.PIXELMAP, request.loadSrc as PixelMap)
      request.loadComplete(imageKnifeData);
    } else
      if (typeof request.loadSrc == 'string') {
        // 进入三级缓存模型
        return this.loadResources(request);
      } else {
      let res = request.loadSrc as Resource;
      if (typeof res.id != 'undefined' && typeof res.type != 'undefined') {
        // 进入三级缓存模型  本地资源不参与磁盘缓存
        let none = new NONE();
        request.diskCacheStrategy(none);
        this.loadResources(request);
      } else {
        LogUtil.error("输入参数有问题！")
      }
    }
  }
}



