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
import { GPUImageContrastFilter } from '@ohos/gpu_transform'
import { BusinessError } from '@ohos.base'
import {Size} from '../../imageknife/RequestOption'

/**
 * 以24位色图像为例子，每种色彩都可以用0-255，
 * 一共256种深度来表示。如果我们把它画在一个二维坐标上，
 * 正好是一条直线。比如我们将像素的色深作为横坐标，输出色深作为纵坐标的画，正好是一条经过原点(0，0)的45度斜线
 * 那么很容易就可以写出它的直线方程：Out = In * 1 ，系数1就是对比度的概念.如果把条直线加上一个偏移量变成B，那么它的直线方程就成为：
 * Out = In * 1 + (ab)偏移量(ab)就是亮度的增量。
 *只要有初中的代数知识就很容易看出它满足一条直线方程：Y= A * X + B。但是，我们这里要处理的情况稍微有些不同，在图像处理中，对比度和亮度要分别对待。不能因为改变而改变亮度，因为我们习惯上把灰色(127，127)这一点作为中心点。
 *
 *直线公式修改成：Y=( X - 127 ) * A + B。A表示对比度，B表示亮度增量。
 * 只要亮度增量 B＝0，无论怎么改变对比度 A，该直线始终通过中心点(127,127),也就是说改变对比度的同时，亮度没有改变
 *
 *_mContrast value ranges from 0.0 to 4.0, with 1.0 as the normal level
 *
 *
 */
export class ContrastFilterTransformation implements BaseTransform<PixelMap> {
  private _mContrast: number;

  constructor(contrast: number) {
    this._mContrast = contrast;
  }

  getName() {
    return "ContrastFilterTransformation:" + this._mContrast;
  }

  async transform(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    if (!buf || buf.byteLength <= 0) {
      LogUtil.log(Constants.PROJECT_TAG + ";ContrastFilterTransformation buf is empty");
      if (func!=undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + ";ContrastFilterTransformation buf is empty", null);
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
      func?.asyncTransform("ContrastFilterTransformation The image size does not exist.", null)
      return;
    }
    let  pixelMapWidth:number = size.width;
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
      let filter = new GPUImageContrastFilter();
      filter.setImageData(bufferData, targetWidth, targetHeight);
      filter.setContrast(this._mContrast)
      let buf = await filter.getPixelMapBuf(0, 0, targetWidth, targetHeight);
      data.writeBufferToPixels(buf);
      if (func != undefined) {
        func?.asyncTransform("success", data);
      }
      return;
    }

    let dataArray = new Uint8Array(bufferData);

    let brightness = 0; // 亮度的偏移量，可以默认0
    for (let index = 0; index < dataArray.length; index += 4) {
      dataArray[index] = this.checkVisAble((dataArray[index] - 127) * this._mContrast + brightness + 127);
      dataArray[index+1] = this.checkVisAble((dataArray[index+1] - 127) * this._mContrast + brightness + 127);
      dataArray[index+2] = this.checkVisAble((dataArray[index+2] - 127) * this._mContrast + brightness + 127);
      dataArray[index+3] = this.checkVisAble((dataArray[index+3] - 127) * this._mContrast + brightness + 127);
    }

    await data.writeBufferToPixels(bufferData);
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
}