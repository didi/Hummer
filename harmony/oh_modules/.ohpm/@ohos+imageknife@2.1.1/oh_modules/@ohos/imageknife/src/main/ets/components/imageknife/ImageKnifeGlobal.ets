/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { ImageKnife } from './ImageKnife';
import { LogUtil } from './utils/LogUtil';
export enum GlobalEnum{
  // 主hap的context对象key
  HAP_CONTEXT_KEY = 'HAP_CONTEXT_KEY',
  // ImageKnife的对象key
  IMAGE_KNIFE_KEY = 'IMAGE_KNIFE_KEY'
}

// 构造单例对象
export class ImageKnifeGlobal {
  private constructor() {}
  private static instance: ImageKnifeGlobal;
  private _objects = new Map<string, Object>();


  public static getInstance(): ImageKnifeGlobal {
    if (!ImageKnifeGlobal.instance) {
      ImageKnifeGlobal.instance = new ImageKnifeGlobal();
    }
    return ImageKnifeGlobal.instance;
  }

  getObject(value: string): Object | undefined {
    return this._objects.get(value);
  }

  setObject(key: string, objectClass: Object): void {
    this._objects.set(key, objectClass);
  }

  getImageKnife():ImageKnife | undefined{
    let imageKnifeObj:Object | undefined =  this._objects.get(GlobalEnum.IMAGE_KNIFE_KEY);
    if(imageKnifeObj == undefined){
      LogUtil.error('ImageKnifeGlobal imageKnifeObj is undefined, you need to initialize before using')
      return undefined
    }else{
      return (imageKnifeObj as ImageKnife)
    }
  }

  setImageKnife(imageKnife:Object):void{
    this._objects.set(GlobalEnum.IMAGE_KNIFE_KEY, imageKnife);
  }

  getHapContext():Object | undefined{
    let hapContext:Object | undefined =  this._objects.get(GlobalEnum.HAP_CONTEXT_KEY);
    if(hapContext == undefined){
      LogUtil.error('ImageKnifeGlobal hapContext is undefined, you need to initialize before using')
      return undefined
    }else{
      return hapContext
    }
  }

  setHapContext(hapContext:Object):void{
    this._objects.set(GlobalEnum.HAP_CONTEXT_KEY, hapContext);
  }


}