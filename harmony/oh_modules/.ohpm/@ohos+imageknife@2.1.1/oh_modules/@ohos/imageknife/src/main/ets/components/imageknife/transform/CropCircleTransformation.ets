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
import { BusinessError } from '@ohos.base'
import {Size} from '../../imageknife/RequestOption'

export class CropCircleTransformation implements BaseTransform<PixelMap> {
  private static TAG: string = "CropCircleTransformation";
  private mCenterX: number = 0;
  private mCenterY: number = 0;
  private mRadius: number = 0;

  getName() {
    return CropCircleTransformation.TAG + ";mCenterX:" + this.mCenterX
    + ";mCenterY:" + this.mCenterY
    + ";mRadius:" + this.mRadius;
  }

  transform(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    if (!buf || buf.byteLength <= 0) {
      LogUtil.log(Constants.PROJECT_TAG + CropCircleTransformation.TAG + " buf is empty");
      if (func!=undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + CropCircleTransformation.TAG + " buf is empty", null);
      }
      return;
    }
    let imageSource:image.ImageSource = image.createImageSource(buf);

    TransformUtils.getPixelMapSize(imageSource, {asyncTransform:(error:BusinessError|string, size: Size | null) => {
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
      this.updatePixelMapSize(imageSource, targetWidth, targetHeight, func);
    }})
  }

  private updatePixelMapSize(imageSource: image.ImageSource, outWith: number, outHeight: number, func?: AsyncTransform<PixelMap>) {
    let options:image.DecodingOptions = {
      editable: true,
      desiredSize: {
        width: outWith,
        height: outHeight
      }
    }
    imageSource.createPixelMap(options)
      .then((p:PixelMap) => {
        this.transformCircle(p, func);
        imageSource.release()
      })
      .catch((e:BusinessError) => {
        LogUtil.log(Constants.PROJECT_TAG + CropCircleTransformation.TAG + " transform e:" + e);
        if (func!=undefined) {
          func?.asyncTransform(Constants.PROJECT_TAG + CropCircleTransformation.TAG + "e" + e, null);
        }
        imageSource.release()
      })
  }

  private async transformCircle(data: PixelMap, func?: AsyncTransform<PixelMap>) {
    let imageInfo:image.ImageInfo = await data.getImageInfo();
    let size:Size = {
      width: imageInfo.size.width,
      height: imageInfo.size.height
    }

    if (!size) {
      func?.asyncTransform("CropCircleTransformation The image size does not exist.", null)
      return;
    }
    let height:number = size.height;
    let width:number = size.width;
    this.mRadius = 0;
    if (width > height) {
      this.mRadius = height / 2;
    } else {
      this.mRadius = width / 2;
    }
    this.mCenterX = width / 2;
    this.mCenterY = height / 2;

    let bufferData:ArrayBuffer = new ArrayBuffer(data.getPixelBytesNumber());
    await data.readPixelsToBuffer(bufferData);

    let dataArray = new Uint8Array(bufferData);

    for (let h = 0;h <= height; h++) {
      for (let w = 0;w <= width; w++) {
        if (this.isContainsCircle(w, h)) {
          continue;
        }
        // 针对的点
        let index = (h * width + w) * 4;
        dataArray[index] = 0;
        dataArray[index+1] = 0;
        dataArray[index+2] = 0;
        dataArray[index+3] = 0;
      }
    }
    await data.writeBufferToPixels(bufferData);
    if (func != undefined) {
      func?.asyncTransform("", data);
    }
  }

  isContainsCircle(x: number, y: number): boolean {
    let a = Math.pow((this.mCenterX - x), 2);
    let b = Math.pow((this.mCenterY - y), 2);
    let c = Math.sqrt((a + b));
    return c <= this.mRadius;
  }
}