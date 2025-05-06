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

import { CropCallback } from './CropCallback'
import image from "@ohos.multimedia.image"
import { BusinessError } from '@ohos.base'
export namespace Crop {

  export interface CropSize{
    width:number,
    height:number
  }

  export function crop(buf: ArrayBuffer, x: number, y: number, cropWidth: number, cropHeight: number, func?: CropCallback<PixelMap|null>, colorRatio?: number) {
    if (!buf || buf.byteLength <= 0) {
      console.log("Crop buf is empty");
      if (func) {
        func.cropCallback("Crop buf is empty", null);
      }
      return;
    }
    let imageSource:image.ImageSource = image.createImageSource(buf);
    let crop:CropCallback<CropSize|null> = { cropCallback: (error:BusinessError|string, size: CropSize|null) => {
      if (!size) {
        func?.cropCallback(error, null)
        return;
      }
      let pixelMapWidth = size.width;
      let pixelMapHeight = size.height;
      if (x < 0 || x > pixelMapWidth) {
        func?.cropCallback("Crop error x must be less than pixelMapWidth ", null)
        return;
      }
      if (y < 0 || y > pixelMapHeight) {
        func?.cropCallback("Crop error x must be less than pixelMapHeight ", null)
        return;
      }
      let options: image.DecodingOptions = {
        editable: true,
        rotate: 0,
        desiredSize: {
          width: pixelMapWidth,
          height: pixelMapHeight
        },
        desiredRegion: { size: { width: cropWidth, height: cropHeight },
          x: x,
          y: y,
        },
      }
      imageSource.createPixelMap(options)
        .then((data:PixelMap) => {
          if (colorRatio && colorRatio <= 1) {
            colorRatioPixelMap(data, pixelMapWidth, pixelMapHeight, colorRatio, func);
          } else {
            func?.cropCallback("", data);
          }
          imageSource.release()
        })
        .catch((e:BusinessError) => {
          func?.cropCallback(e, null);
          imageSource.release()
        })
    }
    }
    getPixelMapSize(imageSource, crop)
  }

  let colorRatioPixelMap = async (data: PixelMap, width: number, height: number, colorRatio: number, func?: CropCallback<PixelMap|null>)=> {
    if (!data) {
      func?.cropCallback("colorRatio pixelMap is null", null);
      return;
    }
    if (colorRatio > 1) {
      throw new Error("the colorRatio must be <= 1");
    }
    let buffer = new ArrayBuffer(width * height * 5);
    let bytes = new Uint8Array(buffer);
    let buffer1B = new ArrayBuffer(width * height * 5);
    let bytes1B = new Uint8Array(buffer1B);

    let readPromise:Promise<void> = data.readPixelsToBuffer(buffer)
    await readPromise;
    for (let i = 0;i < bytes.length; i++) {
      bytes1B[i] = bytes[i] * colorRatio;
    }
    let writePromise:Promise<void> = data.writeBufferToPixels(buffer1B)
    await writePromise;
    func?.cropCallback("", data);
  }


   let getPixelMapSize = (imageSource: image.ImageSource, func: CropCallback<CropSize|null>)=> {
    if (!imageSource) {
      return;
    }
    imageSource.getImageInfo((err, value) => {
      if (err) {
        func.cropCallback(err, null)
        return;
      }
      let pWidth = value.size.width;
      let pHeight = value.size.height;
      func.cropCallback('', { width: pWidth, height: pHeight });
    })
  }
}