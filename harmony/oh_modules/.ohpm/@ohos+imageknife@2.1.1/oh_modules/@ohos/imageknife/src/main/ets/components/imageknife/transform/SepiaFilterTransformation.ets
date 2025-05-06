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
import { GPUImageSepiaToneFilter } from '@ohos/gpu_transform'
import { BusinessError } from '@ohos.base'
import {Size} from '../../imageknife/RequestOption'

/**
 * Applies a simple sepia effect.
 * <p>
 * The intensity with a default of 1.0.
 */
export class SepiaFilterTransformation implements BaseTransform<PixelMap> {
  getName() {
    return "SepiaFilterTransformation";
  }

  async transform(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    if (!buf || buf.byteLength <= 0) {
      LogUtil.log(Constants.PROJECT_TAG + ";SepiaFilterTransformation buf is empty");
      if (func!=undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + ";SepiaFilterTransformation buf is empty", null);
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
      func?.asyncTransform("SepiaFilterTransformation The image size does not exist.", null)
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
    let data:PixelMap = await imageSource.createPixelMap(options);
    imageSource.release();
    let bufferData = new ArrayBuffer(data.getPixelBytesNumber());
    await data.readPixelsToBuffer(bufferData);

    if (request.gpuEnabled) {
      let filter = new GPUImageSepiaToneFilter();
      filter.setImageData(bufferData, targetWidth, targetHeight);
      let buf = await filter.getPixelMapBuf(0, 0, targetWidth, targetHeight);
      data.writeBufferToPixels(buf);
      if (func != undefined) {
        func?.asyncTransform("success", data);
      }
      return;
    }

    let bufferNewData = new ArrayBuffer(data.getPixelBytesNumber());
    let dataArray = new Uint8Array(bufferData);
    let dataNewArray = new Uint8Array(bufferNewData);

    for (let index = 0; index < dataArray.length; index += 4) {
      const r:number = dataArray[index];
      const g:number = dataArray[index+1];
      const b:number = dataArray[index+2];
      const f:number = dataArray[index+3];

      dataNewArray[index+2] = this.checkVisAble(this.colorBlend(this.noise()
        , (r * 0.272) + (g * 0.534) + (b * 0.131)
        , b));
      dataNewArray[index+1] = this.checkVisAble(this.colorBlend(this.noise()
        , (r * 0.349) + (g * 0.686) + (b * 0.168)
        , g));
      dataNewArray[index] = this.checkVisAble(this.colorBlend(this.noise()
        , (r * 0.393) + (g * 0.769) + (b * 0.189)
        , r));
      dataNewArray[index+3] = f;
    }

    await data.writeBufferToPixels(bufferNewData);
    if (func != undefined) {
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

  private colorBlend(scale: number, dest: number, src: number): number {
    return (scale * dest + (1.0 - scale) * src);
  }

  private noise(): number {
    return Math.random() * 0.5 + 0.5;
  }
}