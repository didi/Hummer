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
import {EngineKey} from '../key/EngineKey'
import {EngineKeyInterface} from '../key/EngineKeyInterface'
import {RequestOption} from '../../imageknife/RequestOption'
import { ObjectKey } from '../../imageknife/ObjectKey';

export class EngineKeyFactories implements  EngineKeyInterface {
  // 生成内存缓存
  generateMemoryCacheKey(loadSrc:string,size:string,transformed:string,dontAnimate:boolean,signature: ObjectKey) {
    return EngineKey.generateMemoryCacheKey(loadSrc,size,transformed,dontAnimate);
  }
  // 生成原图变换后的图片的磁盘缓存
  generateTransformedDiskCacheKey(loadSrc:string,size:string,transformed:string,dontAnimate:boolean,signature: ObjectKey) {
    return EngineKey.generateTransformedDiskCacheKey(loadSrc,size,transformed,dontAnimate);
  }
  // 生成原图的磁盘缓存
  generateOriginalDiskCacheKey(loadSrc:string,signature: ObjectKey) {
    return EngineKey.generateOriginalDiskCacheKey(loadSrc);
  }

  public static createMemoryCacheKey(loadSrc:string,size:string,transformed:string,dontAnimate:boolean,signature: ObjectKey, redefineUrl?:(loadSrc:string)=>string, addOtherInfo?:string):string{
     return EngineKey.generateMemoryCacheKey(loadSrc,size,transformed,dontAnimate,signature,redefineUrl,addOtherInfo);
  }


  public static createTransformedDiskCacheKey(loadSrc:string,size:string,transformed:string,dontAnimate:boolean,signature: ObjectKey, redefineUrl?:(loadSrc:string)=>string, addOtherInfo?:string):string {
    return  EngineKey.generateTransformedDiskCacheKey(loadSrc,size,transformed,dontAnimate,signature,redefineUrl,addOtherInfo);
  }

  public static createOriginalDiskCacheKey(loadSrc:string,signature: ObjectKey, redefineUrl?:(loadSrc:string)=>string, addOtherInfo?:string):string {
    return EngineKey.generateOriginalDiskCacheKey(loadSrc,signature,redefineUrl,addOtherInfo);
  }




}



