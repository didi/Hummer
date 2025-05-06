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

import { AUTOMATIC } from '../cache/diskstrategy/enum/AUTOMATIC'

import { DiskStrategy } from '../cache/diskstrategy/DiskStrategy'
import { BaseTransform } from '../imageknife/transform/BaseTransform'
import { TransformType } from '../imageknife/transform/TransformType'
import { CropType } from '../imageknife/transform/CropTransformation'
import { AllCacheInfo, IAllCacheInfoCallback } from '../imageknife/interface/IAllCacheInfoCallback'
import { IDrawLifeCycle } from '../imageknife/interface/IDrawLifeCycle'
import { ScaleType } from '../imageknife/ImageKnifeComponent'
import { rgbColor } from './transform/CropCircleWithBorderTransformation'
import { RoundCorner } from './transform/RoundedCornersTransformation'
import { ObjectKey } from './ObjectKey'
import common from '@ohos.app.ability.common'

export interface CropCircleWithBorder{
  border: number,
  obj: rgbColor
}

export interface Crop{
  width: number,
  height: number,
  cropType: CropType
}

export interface GifOptions{
  loopFinish?: (loopTime?:number) => void
  speedFactory?: number
  seekTo?: number
}
export interface TransformOptions{
  transformType: number,
  blur?: number,
  roundedCorners?: RoundCorner
  cropCircleWithBorder?: CropCircleWithBorder
  crop?:Crop
  brightnessFilter?: number,
  contrastFilter?: number,
  pixelationFilter?: number,
  swirlFilter?: number,
  mask?: Resource,
  rotateImage?: number
}

@Observed
export class ImageKnifeOption {

  // 主图资源
  loadSrc: string | PixelMap | Resource = '';
  mainScaleType?: ScaleType = ScaleType.FIT_CENTER

  enableGpu?:boolean = true;

  // 磁盘缓存策略
  strategy?: DiskStrategy = new AUTOMATIC();

  // gif加载展示一帧
  dontAnimateFlag? = false;

  // 占位图
  placeholderSrc?: PixelMap | Resource;
  placeholderScaleType?: ScaleType = ScaleType.FIT_CENTER

  // 失败占位图
  errorholderSrc?: PixelMap | Resource;
  errorholderSrcScaleType?: ScaleType = ScaleType.FIT_CENTER

  // 重试占位图
  retryholderSrc?: Resource;
  retryholderScaleType?: ScaleType = ScaleType.FIT_CENTER

  // 缩略图,范围(0,1)
  thumbSizeMultiplier?: number;
  // 缩略图展示时间
  thumbSizeDelay?:number;
  // 缩略图展示类型
  thumbSizeMultiplierScaleType?: ScaleType = ScaleType.FIT_CENTER

  // 进度条
  displayProgress?: boolean;


  // 自定义缓存关键字
  signature?: ObjectKey;

  // 重试图层 可点击
  canRetryClick?: boolean;

  // 仅使用缓存加载数据
  onlyRetrieveFromCache?: boolean = false;

  // 是否开启一级内存缓存
  isCacheable?: boolean = true;


  // 用户自定义实现 绘制方案
  drawLifeCycle?: IDrawLifeCycle;

  // 设置点击事件回调
  onClick?:(event?: ClickEvent) => void

  gif?: GifOptions = undefined;


  // 变换相关 不推荐使用该接口 建议直接使用transformation  transformations这2个接口实现
  transform?:TransformOptions = undefined
  transformation?: BaseTransform<PixelMap>;
  transformations?: Array<BaseTransform<PixelMap>>;

  // 输出缓存相关内容和信息
  allCacheInfoCallback?: IAllCacheInfoCallback;


  context?: common.UIAbilityContext;
//  sizeAnimate?: AnimateParam 由业务自定义不再支持

  constructor() {

  }
}