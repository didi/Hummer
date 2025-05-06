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
import {LogUtil} from '../../imageknife/utils/LogUtil'
import image from "@ohos.multimedia.image"
import { GPUImageGrayscaleFilter } from '@ohos/gpu_transform'
import { BusinessError } from '@ohos.base'
import {Size} from '../../imageknife/RequestOption'

export class GrayscaleTransformation implements BaseTransform<PixelMap> {
  getName() {
    return "GrayscaleTransformation";
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

    let imageInfo = await imageSource.getImageInfo();
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
    let data:PixelMap= await imageSource.createPixelMap(options);
    imageSource.release()
    let bufferData = new ArrayBuffer(data.getPixelBytesNumber());
    let bufferNewData = new ArrayBuffer(data.getPixelBytesNumber());
    await data.readPixelsToBuffer(bufferData);

    if (request.gpuEnabled) {
      let filter = new GPUImageGrayscaleFilter();
      filter.setImageData(bufferData, targetWidth, targetHeight);
      let buf = await filter.getPixelMapBuf(0, 0, targetWidth, targetHeight);
      data.writeBufferToPixels(buf);
      if (func != undefined) {
        func?.asyncTransform("success", data);
      }
      return;
    }


    let dataArray = new Uint8Array(bufferData);
    let dataNewArray = new Uint8Array(bufferNewData);

    for (let index = 0; index < dataArray.length; index += 4) {
      const r = dataArray[index];
      const g = dataArray[index+1];
      const b = dataArray[index+2];
      const f = dataArray[index+3];
      // b g r
      dataNewArray[index] = this.grayscale(r, g, b);
      dataNewArray[index+1] = this.grayscale(r, g, b);
      dataNewArray[index+2] = this.grayscale(r, g, b);
      dataNewArray[index+3] = f;
    }

    await data.writeBufferToPixels(bufferNewData);
    if (func != undefined) {
      func?.asyncTransform('', data);
    }
  }

  /**
   * 将读取的像素点的rgb值，全部灰度化，得到灰度图片（黑白图片）加权平均法
   */
  private grayscale(r: number, g: number, b: number): number{
    return (r * 28 + g * 151 + b * 77) >> 8;
  }
}