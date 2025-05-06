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
import { LogUtil } from '../../imageknife/utils/LogUtil'
import { GPUImageToonFilter } from '@ohos/gpu_transform'
import { BusinessError } from '@ohos.base'
import {Size} from '../../imageknife/RequestOption'

export class ToonFilterTransform implements BaseTransform<PixelMap> {
  private threshold: number = 0.2;
  private quantizationLevels: number = 10.0;

  constructor(threshold?: number, quantizationLevels?: number) {
    if (threshold) {
      this.threshold = threshold;
    }
    if (quantizationLevels) {
      this.quantizationLevels = quantizationLevels;
    }
  }

  getName() {
    return "ToonFilterTransform threshold:" + this.threshold + ";quantizationLevels:" + this.quantizationLevels;
  }

  transform(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    if (!buf || buf.byteLength <= 0) {
      LogUtil.log(Constants.PROJECT_TAG + ";ToonFilterTransform buf is empty");
      if (func != undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + ";ToonFilterTransform buf is empty", null);
      }
      return;
    }
    if (!request.gpuEnabled) {
      LogUtil.error(Constants.PROJECT_TAG + ";the ToonFilterTransform supported only in GPU mode");
      if (func) {
        func?.asyncTransform(Constants.PROJECT_TAG + ";the ToonFilterTransform supported only in GPU mode", null);
      }
      return;
    }

    let imageSource:image.ImageSource = image.createImageSource(buf);
    TransformUtils.getPixelMapSize(imageSource, {asyncTransform:(error:BusinessError|string, size: Size|null) => {
      if (!size) {
        func?.asyncTransform(error, null)
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
        .then((data) => {
          imageSource.release()
          this.toon(data, targetWidth, targetHeight, func);
        })
        .catch((e:BusinessError) => {
          imageSource.release()
          LogUtil.log(Constants.PROJECT_TAG + ";error:" + e);
          func?.asyncTransform(e, null);
        })
    }})
  }

  private async toon(bitmap: image.PixelMap, targetWidth: number, targetHeight: number, func?: AsyncTransform<PixelMap>) {
    let bufferData = new ArrayBuffer(bitmap.getPixelBytesNumber());
    await bitmap.readPixelsToBuffer(bufferData);
    let filter = new GPUImageToonFilter();
    filter.setImageData(bufferData, targetWidth, targetHeight);
    filter.setThreshold(this.threshold);
    filter.setQuantizationLevels(this.quantizationLevels);
    let buf = await filter.getPixelMapBuf(0, 0, targetWidth, targetHeight)
    bitmap.writeBufferToPixels(buf);
    if (func != undefined) {
      func?.asyncTransform("success", bitmap);
    }
  }
}