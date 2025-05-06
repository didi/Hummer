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
import {LogUtil} from '../../imageknife/utils/LogUtil'
import { BusinessError } from '@ohos.base'
import {Size} from '../../imageknife/RequestOption'

import image from "@ohos.multimedia.image"

export class CropSquareTransformation implements BaseTransform<PixelMap> {
  private static TAG: string = "CropSquareTransformation";

  getName() {
    return CropSquareTransformation.TAG;
  }

  transform(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    if (!buf || buf.byteLength <= 0) {
      LogUtil.log(Constants.PROJECT_TAG + ";CropSquareTransformation buf is empty");
      if (func != undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + ";CropSquareTransformation buf is empty", null);
      }
      return;
    }
    this.squareCrop(buf, request, func);
  }

  squareCrop(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    let imageSource:image.ImageSource = image.createImageSource(buf);
    imageSource.getImageInfo()
      .then((p:image.ImageInfo) => {
      let  pw:number = p.size.width;
        let ph:number = p.size.height;
        let outWidth:number = request.size.width;
        let outHeight:number = request.size.height;
      if (pw < outWidth) {
        outWidth = pw;
      }
      if (ph < outHeight) {
        outHeight = ph;
      }
      let targetSize:number = outWidth > outHeight ? outHeight : outWidth;
      let options:image.DecodingOptions = {
        editable: true,
        rotate: 0,
        desiredSize: {
          width: outWidth,
          height: outHeight
        },
        desiredRegion: { size: { width: targetSize, height: targetSize },
          x: pw / 2 - targetSize / 2,
          y: ph / 2 - targetSize / 2,
        },
      }
      imageSource.createPixelMap(options)
        .then(data => {
        if (func != undefined) {
          func?.asyncTransform("", data);
        }
          imageSource.release()
      })
        .catch((e:BusinessError) => {
        if (func != undefined) {
          func?.asyncTransform(Constants.PROJECT_TAG + ";CropSquareTransformation e:" + e, null);
        }
          imageSource.release()
      })
    })
      .catch((error:BusinessError) => {
      if (func != undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + ";CropSquareTransformation error:" + error, null);
      }
    })
  }
}