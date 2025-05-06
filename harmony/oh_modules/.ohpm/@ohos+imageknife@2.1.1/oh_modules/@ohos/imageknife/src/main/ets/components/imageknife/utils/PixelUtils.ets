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

import {CalculatePixelUtils} from "./CalculatePixelUtils"
import {PixelEntry} from "../entry/PixelEntry"
import {AsyncTransform} from "../transform/AsyncTransform"
import {ColorUtils} from "./ColorUtils"
import {Size} from "../../imageknife/RequestOption"
import {GPUImagePixelationFilter} from '@ohos/gpu_transform'
import image from '@ohos.multimedia.image';

export namespace pixelUtils {

  export async function pixel(bitmap: PixelMap, pixel: number, func?: AsyncTransform<PixelMap>) {

    let imageInfo:image.ImageInfo= await bitmap.getImageInfo();
    let size:Size = {
      width: imageInfo.size.width,
      height: imageInfo.size.height
    }
    if (!size) {
      func?.asyncTransform("GrayscaleTransformation The image size does not exist.", null)
      return;
    }
    let targetWidth:number = size.width;
    let targetHeight:number = size.height;

    let pixEntry: Array<PixelEntry> = new Array()
    let inPixels: Array<Array<number>> = CalculatePixelUtils.createInt2DArray(targetHeight, targetWidth);

    let bufferData = new ArrayBuffer(bitmap.getPixelBytesNumber());
    await bitmap.readPixelsToBuffer(bufferData);
    let dataArray = new Uint8Array(bufferData);

    let ph:number = 0;
    let pw:number = 0;


    for (let index = 0; index < dataArray.length; index += 4) {
      const r = dataArray[index];
      const g = dataArray[index+1];
      const b = dataArray[index+2];
      const f = dataArray[index+3];

      let entry = new PixelEntry();
      entry.a = 0;
      entry.b = b;
      entry.g = g;
      entry.r = r;
      entry.f = f;
      entry.pixel = ColorUtils.rgb(entry.r, entry.g, entry.b);
      pixEntry.push(entry);
      inPixels[ph][pw] = ColorUtils.rgb(entry.r, entry.g, entry.b);
      if (pw == targetWidth - 1) {
        pw = 0;
        ph++;
      } else {
        pw++;
      }
    }

    let realPixel_W = pixel > targetWidth ? targetWidth : pixel;
    let realPixel_H = pixel > targetHeight ? targetHeight : pixel;

    // 横排的正方形个数
    let x_index = Math.floor(targetWidth / realPixel_W);
    // 纵排的正方形个数
    let y_index = Math.floor(targetHeight / realPixel_H);

    for (let ch = 0; ch < y_index; ch++) {
      for (let cw = 0; cw < x_index; cw++) {

        let max_x = (cw + 1) * realPixel_W > targetWidth ? targetWidth : (cw + 1) * realPixel_W;
        let max_y = (ch + 1) * realPixel_H > targetHeight ? targetHeight : (ch + 1) * realPixel_H;


        let min_x = cw * realPixel_W;
        let min_y = ch * realPixel_H;

        // 取左上角的像素值
        let center_p = inPixels[min_y+1][min_x+1];
        // 设置该正方形里的像素统一
        for (let zh = min_y; zh < max_y; zh++) {
          for (let zw = min_x; zw < max_x; zw++) {
            inPixels[zh][zw] = center_p;
          }
        }
      }
    }


    let bufferNewData = new ArrayBuffer(bitmap.getPixelBytesNumber());
    let dataNewArray = new Uint8Array(bufferNewData);
    let index = 0;
    let mh = 0;
    let nw = 0;

    for (let i = 0; i < dataNewArray.length; i += 4) {
      let pixel_1 = inPixels[mh][nw];

      if (nw == targetWidth - 1) {
        nw = 0;
        mh++;
      } else {
        nw++;
      }

      let p_r = ColorUtils.red(pixel_1);
      let p_g = ColorUtils.green(pixel_1);
      let p_b = ColorUtils.blue(pixel_1);

      dataNewArray[i] = p_r;
      dataNewArray[i+1] = p_g;
      dataNewArray[i+2] = p_b;
      dataNewArray[i+3] = pixEntry[index].f;
      index++;
    }
    await bitmap.writeBufferToPixels(bufferNewData);
    if (func) {
      func?.asyncTransform("success", bitmap);
    }
  }
  export async function pixelGPU(bitmap: PixelMap, pixel: number, func?: AsyncTransform<PixelMap>) {

    let imageInfo:image.ImageInfo = await bitmap.getImageInfo();
    let size:Size = {
      width: imageInfo.size.width,
      height: imageInfo.size.height
    }
    if (!size) {
      func?.asyncTransform("GrayscaleTransformation The image size does not exist.", null)
      return;
    }
    let w = size.width;
    let h = size.height;

    let bufferData = new ArrayBuffer(bitmap.getPixelBytesNumber());
    await bitmap.readPixelsToBuffer(bufferData);
    let filter = new GPUImagePixelationFilter();
    filter.setImageData(bufferData, w, h);
    filter.setPixel(pixel)
    filter.getPixelMapBuf(0, 0, w, h).then((buf) => {
      bitmap.writeBufferToPixels(buf);
      if (func!=undefined) {
        func?.asyncTransform("success", bitmap);
      }
    })
  }
}