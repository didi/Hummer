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

export class CropTransformation implements BaseTransform<PixelMap> {
  private static TAG: string = "CropCircleTransformation";
  private mWidth: number = 0;
  private mHeight: number = 0;
  private mCropType: CropType = CropType.CENTER;

  constructor(width: number, height: number, cropType: CropType) {
    this.mWidth = width;
    this.mHeight = height;
    this.mCropType = cropType;
  }

  getName() {
    return CropTransformation.TAG + ";mWidth:" + this.mWidth
    + ";mHeight:" + this.mHeight
    + ";mCropType:" + this.mCropType;
  }

  transform(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    if (!buf || buf.byteLength <= 0) {
      LogUtil.log(Constants.PROJECT_TAG + ";CropTransformation buf is empty");
      if (func != undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + ";CropTransformation buf is empty", null);
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

      this.mWidth = this.mWidth == 0 ? pixelMapWidth : this.mWidth;
      this.mHeight = this.mHeight == 0 ? pixelMapHeight : this.mHeight;

      let scaleX:number = this.mWidth / pixelMapWidth;
      let scaleY:number = this.mHeight / pixelMapHeight;
      let scale:number = Math.max(scaleX, scaleY);

      let scaledWidth:number = scale * pixelMapWidth;
      let scaledHeight:number = scale * pixelMapHeight;
      let left:number = (this.mWidth - scaledWidth) / 2;
      let top:number = Math.abs(this.getTop(pixelMapHeight));
      let options:image.DecodingOptions = {
        editable: true,
        desiredRegion: {
          size: {
            width: scaledWidth > pixelMapWidth ? pixelMapWidth : scaledWidth,
            height: scaledHeight > pixelMapHeight ? pixelMapHeight : scaledHeight
          },
          x: left < 0 ? 0 : left,
          y: top < 0 ? 0 : top,
        },
      }
      imageSource.createPixelMap(options)
        .then((data:PixelMap) => {
          func?.asyncTransform("", data);
          imageSource.release()
        })
        .catch((e:BusinessError) => {
          LogUtil.log(Constants.PROJECT_TAG + ";error:" + e);
          imageSource.release()
          func?.asyncTransform(e, null);
        })
    }})
  }

  private getTop(scaledHeight: number): number{
    switch (this.mCropType) {
      case CropType.TOP:
        return 0;
      case CropType.CENTER:
        return (this.mHeight - scaledHeight) / 2;
      case CropType.BOTTOM:
        return this.mHeight - scaledHeight;
      default:
        return 0;
    }
  }
}

export enum CropType {
  TOP = 0,
  CENTER = 1,
  BOTTOM = 2
}