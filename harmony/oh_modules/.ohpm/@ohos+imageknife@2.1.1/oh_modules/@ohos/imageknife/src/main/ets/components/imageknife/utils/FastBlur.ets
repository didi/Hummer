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
import { GPUImageBlurFilter } from '@ohos/gpu_transform'
import {Size} from '../../imageknife/RequestOption'
import image from '@ohos.multimedia.image';
export namespace fastBlur {


  export async function blur(bitmap: PixelMap, radius: number, canReuseInBitmap: boolean, func?: AsyncTransform<PixelMap>) {


//     http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html
//
//     Java Author: Mario Klingemann <mario at quasimondo.com>
//     http://incubator.quasimondo.com
//     created February 29, 2004
//     port : Yahel Bouaziz <yahel at kayenko.com>
//     http://www.kayenko.com
//     ported april 5th, 2012
//
//     This is a compromise between Gaussian Blur and Box blur
//     It creates much better looking blurs than Box Blur, but is
//     7x faster than my Gaussian Blur implementation.
//
//     I called it Stack Blur because this describes best how this
//     filter works internally: it creates a kind of moving stack
//     of colors whilst scanning through the image. Thereby it
//     just has to add one new block of color to the right side
//     of the stack and remove the leftmost color. The remaining
//     colors on the topmost layer of the stack are either added on
//     or reduced by one, depending on if they are on the right or
//     on the left side of the stack.
//
//     If you are using this algorithm in your code please add
//     the following line:
//

    if (radius < 1) {
      func?.asyncTransform("error,radius must be greater than 1 ", null);
      return;
    }

    let imageInfo = await bitmap.getImageInfo();
    let size:Size = {
      width: imageInfo.size.width,
      height: imageInfo.size.height
    }

    if (!size) {
      func?.asyncTransform("fastBlur The image size does not exist.", null)
      return;
    }

    let w = size.width;
    let h = size.height;
    let pixEntry: Array<PixelEntry> = new Array()
    let pix: Array<number> = new Array()


    let bufferData = new ArrayBuffer(bitmap.getPixelBytesNumber());
    await bitmap.readPixelsToBuffer(bufferData);
    let dataArray = new Uint8Array(bufferData);

    for (let index = 0; index < dataArray.length; index+=4) {
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
      pix.push(ColorUtils.rgb(entry.r, entry.g, entry.b));
    }

    let wm = w - 1;
    let hm = h - 1;
    let wh = w * h;
    let div = radius + radius + 1;

    let r = CalculatePixelUtils.createIntArray(wh);
    let g = CalculatePixelUtils.createIntArray(wh);
    let b = CalculatePixelUtils.createIntArray(wh);

    let rsum:number = 0;
    let gsum:number = 0;
    let bsum:number = 0;
    let x:number = 0;
    let y:number = 0;
    let i:number = 0;
    let p:number = 0;
    let yp:number = 0;
    let yi:number = 0;
    let yw: number = 0;

    let vmin = CalculatePixelUtils.createIntArray(Math.max(w, h));

    let divsum = (div + 1) >> 1;
    divsum *= divsum;
    let dv = CalculatePixelUtils.createIntArray(256 * divsum);
    for (i = 0; i < 256 * divsum; i++) {
      dv[i] = (i / divsum);
    }

    yw = yi = 0;
    let stack = CalculatePixelUtils.createInt2DArray(div, 3);
    let stackpointer:number=0;
    let stackstart:number=0;
     let rbs:number=0;
    let  routsum:number=0;
     let goutsum:number=0;
     let boutsum:number=0;
    let  rinsum:number=0;
     let ginsum:number=0;
    let  binsum:number=0;
    let sir: Array<number>;
    let r1 = radius + 1;
    for (y = 0; y < h; y++) {
      rinsum = ginsum = binsum = routsum = goutsum = boutsum = rsum = gsum = bsum = 0;
      for (i = -radius; i <= radius; i++) {
        p = pix[yi + Math.min(wm, Math.max(i, 0))];
        sir = stack[i + radius];
        sir[0] = (p & 0xff0000) >> 16;
        sir[1] = (p & 0x00ff00) >> 8;
        sir[2] = (p & 0x0000ff);
        rbs = r1 - Math.abs(i);
        rsum += sir[0] * rbs;
        gsum += sir[1] * rbs;
        bsum += sir[2] * rbs;
        if (i > 0) {
          rinsum += sir[0];
          ginsum += sir[1];
          binsum += sir[2];
        } else {
          routsum += sir[0];
          goutsum += sir[1];
          boutsum += sir[2];
        }
      }
      stackpointer = radius;

      for (x = 0; x < w; x++) {

        r[yi] = dv[rsum];
        g[yi] = dv[gsum];
        b[yi] = dv[bsum];

        rsum -= routsum;
        gsum -= goutsum;
        bsum -= boutsum;

        stackstart = stackpointer - radius + div;
        sir = stack[stackstart % div];

        routsum -= sir[0];
        goutsum -= sir[1];
        boutsum -= sir[2];

        if (y == 0) {
          vmin[x] = Math.min(x + radius + 1, wm);
        }
        p = pix[yw + vmin[x]];

        sir[0] = (p & 0xff0000) >> 16;
        sir[1] = (p & 0x00ff00) >> 8;
        sir[2] = (p & 0x0000ff);

        rinsum += sir[0];
        ginsum += sir[1];
        binsum += sir[2];

        rsum += rinsum;
        gsum += ginsum;
        bsum += binsum;

        stackpointer = (stackpointer + 1) % div;
        sir = stack[(stackpointer) % div];

        routsum += sir[0];
        goutsum += sir[1];
        boutsum += sir[2];

        rinsum -= sir[0];
        ginsum -= sir[1];
        binsum -= sir[2];

        yi++;
      }
      yw += w;
    }
    for (x = 0; x < w; x++) {
      rinsum = ginsum = binsum = routsum = goutsum = boutsum = rsum = gsum = bsum = 0;
      yp = -radius * w;
      for (i = -radius; i <= radius; i++) {
        yi = Math.max(0, yp) + x;

        sir = stack[i + radius];

        sir[0] = r[yi];
        sir[1] = g[yi];
        sir[2] = b[yi];

        rbs = r1 - Math.abs(i);

        rsum += r[yi] * rbs;
        gsum += g[yi] * rbs;
        bsum += b[yi] * rbs;

        if (i > 0) {
          rinsum += sir[0];
          ginsum += sir[1];
          binsum += sir[2];
        } else {
          routsum += sir[0];
          goutsum += sir[1];
          boutsum += sir[2];
        }

        if (i < hm) {
          yp += w;
        }
      }
      yi = x;
      stackpointer = radius;
      for (y = 0; y < h; y++) {
        // Preserve alpha channel: ( 0xff000000 & pix[yi] )
        pix[yi] = (0xff000000 & pix[Math.round(yi)]) | (dv[Math.round(rsum)] << 16) | (dv[
        Math.round(gsum)] << 8) | dv[Math.round(bsum)];

        rsum -= routsum;
        gsum -= goutsum;
        bsum -= boutsum;

        stackstart = stackpointer - radius + div;
        sir = stack[stackstart % div];

        routsum -= sir[0];
        goutsum -= sir[1];
        boutsum -= sir[2];

        if (x == 0) {
          vmin[y] = Math.min(y + r1, hm) * w;
        }
        p = x + vmin[y];

        sir[0] = r[p];
        sir[1] = g[p];
        sir[2] = b[p];

        rinsum += sir[0];
        ginsum += sir[1];
        binsum += sir[2];

        rsum += rinsum;
        gsum += ginsum;
        bsum += binsum;

        stackpointer = (stackpointer + 1) % div;
        sir = stack[stackpointer];

        routsum += sir[0];
        goutsum += sir[1];
        boutsum += sir[2];

        rinsum -= sir[0];
        ginsum -= sir[1];
        binsum -= sir[2];

        yi += w;
      }
    }


    let bufferNewData = new ArrayBuffer(bitmap.getPixelBytesNumber());
    let dataNewArray = new Uint8Array(bufferNewData);
    let index = 0;

    for (let i = 0; i < dataNewArray.length; i += 4) {
      dataNewArray[i] = ColorUtils.red(pix[index]);
      dataNewArray[i+1] = ColorUtils.green(pix[index]);
      dataNewArray[i+2] = ColorUtils.blue(pix[index]);
      dataNewArray[i+3] = pixEntry[index].f;
      index++;
    }
    await bitmap.writeBufferToPixels(bufferNewData);
    if (func != undefined) {
      func?.asyncTransform("success", bitmap);
    }
  }
  export async function blurGPU(bitmap: PixelMap, radius: number, canReuseInBitmap: boolean, func?: AsyncTransform<PixelMap>) {
    if (radius < 1) {
      func?.asyncTransform("error,radius must be greater than 1 ", null);
      return;
    }

    let imageInfo:image.ImageInfo = await bitmap.getImageInfo();
    let size:Size = {
      width: imageInfo.size.width,
      height: imageInfo.size.height
    }

    if (!size) {
      func?.asyncTransform("fastBlur The image size does not exist.", null)
      return;
    }

    let w:number = size.width;
    let h:number = size.height;

    let bufferData = new ArrayBuffer(bitmap.getPixelBytesNumber());
    await bitmap.readPixelsToBuffer(bufferData);
    let filter = new GPUImageBlurFilter();
    filter.setImageData(bufferData, w, h);
    filter.setBlurRadius(radius);
    filter.setBlurOffset([1.0, 1.0])
    filter.getPixelMapBuf(0, 0, w, h).then((buf) => {
      bitmap.writeBufferToPixels(buf);
      if (func != undefined) {
        func?.asyncTransform("success", bitmap);
      }
    })
  }
}
