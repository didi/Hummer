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
import { LogUtil } from '../../imageknife/utils/LogUtil'
import image from "@ohos.multimedia.image"
import { GPUImageBrightnessFilter } from '@ohos/gpu_transform'
import { BusinessError } from '@ohos.base'
import {Size} from '../../imageknife/RequestOption'

/**
 * brightness value ranges from -1.0 to 1.0, with 0.0 as the normal level
 */
export class BrightnessFilterTransformation implements BaseTransform<PixelMap> {
  private _mBrightness: number = 0.0;

  constructor(brightness: number) {
    this._mBrightness = brightness;
  }

  getName() {
    return "BrightnessFilterTransformation:" + this._mBrightness;
  }

  async transform(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    if (!buf || buf.byteLength <= 0) {
      LogUtil.log(Constants.PROJECT_TAG + ";GrayscaleTransformation buf is empty");
      if (func != undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + ";GrayscaleTransformation buf is empty", null);
      }
      return;
    }
    let imageSource:image.ImageSource = image.createImageSource(buf);

    let imageInfo:image.ImageInfo = await imageSource.getImageInfo();
    let size:Size = {
      width: imageInfo.size.width,
      height: imageInfo.size.height
    }

    if (!size) {
      func?.asyncTransform("GrayscaleTransformation The image size does not exist.", null)
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
    let data = await imageSource.createPixelMap(options);
    imageSource.release()
    let bufferData = new ArrayBuffer(data.getPixelBytesNumber());
    await data.readPixelsToBuffer(bufferData);

    if (request.gpuEnabled) {
      let filter:GPUImageBrightnessFilter = new GPUImageBrightnessFilter();
      filter.setImageData(bufferData, targetWidth, targetHeight);
      filter.setBrightness(this._mBrightness);
      let buf = await  filter.getPixelMapBuf(0, 0, targetWidth, targetHeight);
      data.writeBufferToPixels(buf);
      if (func) {
        func?.asyncTransform("success", data);
      }
      return;
    }

    let dataArray = new Uint8Array(bufferData);

    for (let index = 0; index < dataArray.length; index += 4) {
      dataArray[index] = this.checkVisAble(dataArray[index] * this._mBrightness + dataArray[index]);
      dataArray[index+1] = this.checkVisAble(dataArray[index+1] * this._mBrightness + dataArray[index+1]);
      dataArray[index+2] = this.checkVisAble(dataArray[index+2] * this._mBrightness + dataArray[index+2]);
      dataArray[index+3] = this.checkVisAble(dataArray[index+3] * this._mBrightness + dataArray[index+3]);
    }

    await data.writeBufferToPixels(bufferData);

    if (func) {
      func?.asyncTransform("", data);
    }
  }

  private checkVisAble(input: number) {
    if (input > 255) {
      input = 255;
    }
    if (input <= 0) {
      input = 0;
    }
    return input;
  }
}