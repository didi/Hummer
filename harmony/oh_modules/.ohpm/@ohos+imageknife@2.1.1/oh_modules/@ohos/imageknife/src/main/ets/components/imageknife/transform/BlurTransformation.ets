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
import { TransformUtils } from "../transform/TransformUtils"
import image from "@ohos.multimedia.image"
import { fastBlur } from "../utils/FastBlur"
import {LogUtil} from '../../imageknife/utils/LogUtil'
import { BusinessError } from '@ohos.base'
import {Size} from '../../imageknife/RequestOption'

export class BlurTransformation implements BaseTransform<PixelMap> {
  private _mRadius: number;

  constructor(radius: number) {
    this._mRadius = radius;
  }

  getName() {
    return "BlurTransformation _mRadius:" + this._mRadius;
  }

  transform(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    if (!buf || buf.byteLength <= 0) {
      LogUtil.log(Constants.PROJECT_TAG + ";BlurTransformation buf is empty");
      if (func) {
        func?.asyncTransform(Constants.PROJECT_TAG + ";BlurTransformation buf is empty", null);
      }
      return;
    }
    let imageSource:image.ImageSource = image.createImageSource(buf);
    TransformUtils.getPixelMapSize(imageSource, {asyncTransform:(error:BusinessError|string, size: Size|null) => {
      if (!size) {
        func?.asyncTransform(error, null)
        return;
      }
      let pixelMapWidth = size.width;
      let pixelMapHeight = size.height;
      let targetWidth = request.size.width;
      let targetHeight = request.size.height;
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
        .then((data) => {
          if (request.gpuEnabled) {
            fastBlur.blurGPU(data, this._mRadius, true, func);
          } else {
            fastBlur.blur(data, this._mRadius, true, func);
          }
          imageSource.release()
      })
        .catch((e:BusinessError) => {
        LogUtil.log(Constants.PROJECT_TAG + ";error:" + e);
          imageSource.release()
        func?.asyncTransform(e, null);
        })
    }})
  }
}