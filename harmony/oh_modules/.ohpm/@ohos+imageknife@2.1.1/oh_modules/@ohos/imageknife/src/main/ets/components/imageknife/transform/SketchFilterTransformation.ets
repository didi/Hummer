/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BaseTransform } from '../transform/BaseTransform'
import { AsyncTransform } from '../transform/AsyncTransform'
import { Constants } from '../constants/Constants'
import { RequestOption } from '../../imageknife/RequestOption'
import { TransformUtils } from '../transform/TransformUtils'
import image from '@ohos.multimedia.image'
import { CalculatePixelUtils } from '../utils/CalculatePixelUtils'
import { BusinessError } from '@ohos.base'
import {Size} from '../../imageknife/RequestOption'

export class SketchFilterTransformation implements BaseTransform<PixelMap> {
  getName() {
    return 'SketchFilterTransformation';
  }

  transform(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    if (!buf || buf.byteLength <= 0) {
      if (func != undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + ';SketchFilterTransformation buf is empty', null);
      }
      return;
    }
    let imageSource:image.ImageSource = image.createImageSource(buf);
    TransformUtils.getPixelMapSize(imageSource, {asyncTransform:(error:BusinessError|string, size: Size|null) => {
      if (!size) {
        func?.asyncTransform(error, null)
        return;
      }
      let pixelMapWidth: number = size.width;
      let pixelMapHeight: number = size.height;
      let targetWidth: number = request.size.width;
      let targetHeight: number = request.size.height;
      if (pixelMapWidth < targetWidth) {
        targetWidth = pixelMapWidth;
      }
      if (pixelMapHeight < targetHeight) {
        targetHeight = pixelMapHeight;
      }

      let options: image.DecodingOptions = {
        editable: true,
        desiredSize: {
          width: targetWidth,
          height: targetHeight
        }
      }
      imageSource.createPixelMap(options)
        .then((data) => {
          if (request.gpuEnabled) {
            CalculatePixelUtils.sketchGpu(data, func);
          } else {
            CalculatePixelUtils.sketch(data, func);
          }
          imageSource.release()
        })
        .catch((e:BusinessError) => {
          func?.asyncTransform(e, null);
          imageSource.release()
        })
    }})
  }
}