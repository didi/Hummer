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

import { BaseTransform } from "../transform/BaseTransform"
import { AsyncTransform } from "../transform/AsyncTransform"
import { Constants } from "../constants/Constants"
import { RequestOption } from "../../imageknife/RequestOption"
import { MaskUtils } from "../utils/MaskUtils"
import {LogUtil} from '../../imageknife/utils/LogUtil'
import image from "@ohos.multimedia.image"
import resmgr from "@ohos.resourceManager"
import { ImageKnifeGlobal } from '../ImageKnifeGlobal'
import resourceManager from '@ohos.resourceManager'
import { BusinessError } from '@ohos.base'
import {Size} from '../../imageknife/RequestOption'
import common from '@ohos.app.ability.common'

export class MaskTransformation implements BaseTransform<PixelMap> {
  private _mResourceData:Resource|undefined = undefined;

  constructor(maskBitmap: Resource) {
    this._mResourceData = maskBitmap;
  }

  getName() {
    return "MaskTransformation:" + this._mResourceData;
  }

  async transform(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    if (!buf || buf.byteLength <= 0) {
      LogUtil.log(Constants.PROJECT_TAG + ";MaskTransformation buf is empty");
      if (func != undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + ";MaskTransformation buf is empty", null);
      }
      return;
    }
    let imageSource:image.ImageSource = image.createImageSource(buf);

    let imageInfo = await imageSource.getImageInfo();
    let size:Size = {
      width: imageInfo.size.width,
      height: imageInfo.size.height
    }

    if (!size) {
      func?.asyncTransform("MaskTransformation The image size does not exist.", null)
      return;
    }
    let pixelMapWidth:number = size.width;
    let pixelMapHeight:number = size.height;
    let targetWidth:number = request.size.width;
    let targetHeight:number = request.size.height;
    if (pixelMapWidth < targetWidth) {
      targetWidth = pixelMapWidth;
    }
    if (pixelMapHeight < targetHeight) {
      targetHeight = pixelMapHeight;
    }

    let options:image.DecodingOptions = {
      editable: true,
      desiredSize: {
        width: targetWidth,
        height: targetHeight
      }
    }
    imageSource.createPixelMap(options)
      .then(data => {
        this.openInternal(request, data, targetWidth, targetHeight, func)
        imageSource.release()
      })
      .catch((e:BusinessError )=> {
        func?.asyncTransform(e, null);
        imageSource.release()
      })
  }

  private openInternal(request: RequestOption,bitmap: PixelMap, width: number, height: number, func?: AsyncTransform<PixelMap>) {
    if (!this._mResourceData) {
      if(func != undefined){
        func.asyncTransform("MaskTransformation resource is empty", null)
      }
    }
    let context = (request.getModuleContext() as common.UIAbilityContext)
    if(context != undefined){
      let resourceManager = context.resourceManager as resourceManager.ResourceManager
      if(resourceManager != undefined && this._mResourceData != undefined)
      resourceManager.getMediaContent(this._mResourceData?.id)
        .then(array => {
          let buffer = array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
          let imageSource:image.ImageSource = image.createImageSource(buffer);
          let options:image.DecodingOptions = {
            editable: true,
            desiredSize: {
              width: width,
              height: height
            }
          }
          imageSource.createPixelMap(options)
            .then(maskBitmap => {
              MaskUtils.mask(bitmap, maskBitmap, func)
            })
        })
        .catch((err:BusinessError) => {
          func?.asyncTransform("MaskTransformation openInternal error" + err, null);
        })
    }
  }
}