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
import { GPUImageVignetterFilter } from '@ohos/gpu_transform'
import { BusinessError } from '@ohos.base'
import {Size} from '../../imageknife/RequestOption'


export class VignetteFilterTransform implements BaseTransform<PixelMap> {
  private centerPoint: Array<number> = [0.5, 0.5];
  private vignetteColor: Array<number> = [0.0, 0.0, 0.0];
  private vignetteSpace: Array<number> = [0.3, 0.75];

  constructor(centerPoint: Array<number>, vignetteColor: Array<number>, vignetteSpace: Array<number>) {
    if (centerPoint.length === 2) {
      this.centerPoint = centerPoint;
    }
    if (vignetteColor.length === 3) {
      this.vignetteColor = vignetteColor;
    }
    if (vignetteSpace.length === 2) {
      this.vignetteSpace = vignetteSpace;
    }
  }

  getName() {
    return "VignetteFilterTransform centerPoint:" + this.centerPoint + ";vignetteColor:" + this.vignetteColor + ";vignetteSpace:" + this.vignetteSpace;
  }

  transform(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    if (!buf || buf.byteLength <= 0) {
      LogUtil.log(Constants.PROJECT_TAG + ";VignetteFilterTransform buf is empty");
      if (func != undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + ";VignetteFilterTransform buf is empty", null);
      }
      return;
    }
    if (!request.gpuEnabled) {
      LogUtil.error(Constants.PROJECT_TAG + ";the VignetteFilterTransform supported only in GPU mode");
      if (func != undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + ";the VignetteFilterTransform supported only in GPU mode", null);
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
          this.vignette(data, targetWidth, targetHeight, func);
          imageSource.release();
        })
        .catch((e:BusinessError) => {
          imageSource.release()
          LogUtil.log(Constants.PROJECT_TAG + ";error:" + e);
          func?.asyncTransform(e, null);
        })
    }})
  }

  private async vignette(bitmap: image.PixelMap, targetWidth: number, targetHeight: number, func?: AsyncTransform<PixelMap>) {
    let bufferData = new ArrayBuffer(bitmap.getPixelBytesNumber());
    await bitmap.readPixelsToBuffer(bufferData);
    let filter = new GPUImageVignetterFilter();
    filter.setImageData(bufferData, targetWidth, targetHeight);
    filter.setVignetteCenter(this.centerPoint);
    filter.setVignetteColor(this.vignetteColor);
    filter.setVignetteStart(this.vignetteSpace[0]);
    filter.setVignetteEnd(this.vignetteSpace[1]);
    let buf = await filter.getPixelMapBuf(0, 0, targetWidth, targetHeight)
    bitmap.writeBufferToPixels(buf);
    if (func != undefined) {
      func?.asyncTransform("success", bitmap);
    }
  }
}