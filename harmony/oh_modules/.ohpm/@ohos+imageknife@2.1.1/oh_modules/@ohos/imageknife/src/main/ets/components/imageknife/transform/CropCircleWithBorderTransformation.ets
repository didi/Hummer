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
export interface rgbColor{
  r_color: number,
  g_color: number,
  b_color: number,
}
export class CropCircleWithBorderTransformation implements BaseTransform<PixelMap> {
  private static TAG: string = "CropCircleTransformation";
  private mBorderSize: number = 5;
  private mCenterX: number = 0;
  private mCenterY: number = 0;
  private mRadius: number = 0;
  private mRColor: number = 0;
  private mGColor: number = 0;
  private mBColor: number= 0;

  constructor(border_size: number, value: rgbColor) {
    this.mRColor = value.g_color;
    this.mGColor = value.g_color;
    this.mBColor = value.b_color;
    this.mBorderSize = border_size;
  }

  getName() {
    return CropCircleWithBorderTransformation.TAG + ";mBorderSize:" + this.mBorderSize
    + ";mCenterX:" + this.mCenterX
    + ";mCenterY:" + this.mCenterY
    + ";mRadius:" + this.mRadius
    + ";mRColor:" + this.mRColor
    + ";mGColor:" + this.mGColor
    + ";mBColor:" + this.mBColor;
  }

  transform(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    if (!buf || buf.byteLength <= 0) {
      LogUtil.log(Constants.PROJECT_TAG + ";CropCircleWithBorderTransformation buf is empty");
      if (func != undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + ";CropCircleWithBorderTransformation buf is empty", null);
      }
      return;
    }
    let imageSource:image.ImageSource = image.createImageSource(buf);
    TransformUtils.getPixelMapSize(imageSource, {asyncTransform:(error:BusinessError|string, size:Size|null) => {
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
      .then((pixelMap:PixelMap) => {
        this.transformPixelMap(pixelMap, outWith, outHeight, func);
        imageSource.release()
      })
      .catch((e:BusinessError) => {
        LogUtil.log(Constants.PROJECT_TAG + ";CropCircleWithBorderTransformation e:" + e);
        if (func!=undefined) {
          func?.asyncTransform(Constants.PROJECT_TAG + ";CropCircleWithBorderTransformation e:" + e, null);
        }
        imageSource.release()
      })
  }

  private async transformPixelMap(pixelMap: PixelMap, width: number, height: number, func?: AsyncTransform<PixelMap>) {
    this.mRadius = 0;
    if (width > height) {
      this.mRadius = height / 2;
    } else {
      this.mRadius = width / 2;
    }
    this.mCenterX = width / 2;
    this.mCenterY = height / 2;


    let bufferData = new ArrayBuffer(pixelMap.getPixelBytesNumber());
    await pixelMap.readPixelsToBuffer(bufferData);

    let dataArray = new Uint8Array(bufferData);

    for (let h = 0;h <= height; h++) {
      for (let w = 0;w <= width; w++) {
        // 不在大圆之内的设置透明
        // 在大圆与小圆之间的  设置rgb值
        // 小圆之内的不变
        let isSmallCircle: boolean = this.isContainsSmallCircle(w, h);
        let isBigCircle: boolean = this.isContainsCircle(w, h);
        if (isSmallCircle) {
          continue;
        }

        let index = (h * width + w) * 4;
        if (!isBigCircle) {
          // 设置透明
          dataArray[index] = 0;
          dataArray[index+1] = 0;
          dataArray[index+2] = 0;
          dataArray[index+3] = 0;
        } else {
          // 设置broke
          dataArray[index] = this.mRColor;
          dataArray[index+1] = this.mGColor;
          dataArray[index+2] = this.mBColor;
        }
      }
    }

    await pixelMap.writeBufferToPixels(bufferData);
    if (func != undefined) {
      func?.asyncTransform("", pixelMap);
    }
  }

  isContainsCircle(x: number, y: number): boolean {
    let a:number = Math.pow((this.mCenterX - x), 2);
    let b:number = Math.pow((this.mCenterY - y), 2);
    let c:number = Math.sqrt((a + b));
    return c <= this.mRadius;
  }

  isContainsSmallCircle(x: number, y: number): boolean {
    let a:number = Math.pow((this.mCenterX - x), 2);
    let b:number = Math.pow((this.mCenterY - y), 2);
    let c:number = Math.sqrt((a + b));
    return c <= (this.mRadius - this.mBorderSize);
  }
}