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
import { PixelEntry } from "../entry/PixelEntry"
import { AsyncTransform } from "../transform/AsyncTransform"
import { ColorUtils } from "./ColorUtils"
import { GPUImageSketchFilter } from '@ohos/gpu_transform'
import image from '@ohos.multimedia.image'
import { Size } from '../RequestOption'

export namespace CalculatePixelUtils {
  export async function sketch(p: PixelMap, func?: AsyncTransform<PixelMap>) {
    let imageInfo = await p.getImageInfo();
    let size:Size = {
      width: imageInfo.size.width,
      height: imageInfo.size.height
    }
    if (!size) {
      func?.asyncTransform("sketch The image size does not exist.", null)
      return;
    }

    let pos: number = 0
    let row: number = 0
    let col: number = 0
    let clr: number = 0
    let width: number = size.width;
    let height: number = size.height;
    let pixEntry: Array<PixelEntry> = new Array()
    let pixSrc: Array<number> = new Array()
    let pixNvt: Array<number> = new Array()

    let bufferData = new ArrayBuffer(p.getPixelBytesNumber());
    await p.readPixelsToBuffer(bufferData);
    let dataArray = new Uint8Array(bufferData);

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
      pixSrc.push(ColorUtils.rgb(entry.r, entry.g, entry.b));
      pixNvt.push(0);
    }

    for (row = 0; row < height; row++) {
      for (col = 0; col < width; col++) {
        pos = row * width + col;
        pixSrc[pos] = (pixEntry[pos].r + pixEntry[pos].g + pixEntry[pos].b) / 3;
        pixNvt[pos] = 255 - pixSrc[pos];
      }
    }
    // 对取反的像素进行高斯模糊, 强度可以设置，暂定为5.0
    gaussGray(pixNvt, 5.0, 5.0, width, height);
    // 灰度颜色和模糊后像素进行差值运算
    for (row = 0; row < height; row++) {
      for (col = 0; col < width; col++) {
        pos = row * width + col;
        clr = pixSrc[pos] << 8;
        clr /= 256 - pixNvt[pos];
        clr = Math.min(clr, 255);
        pixSrc[pos] = ColorUtils.rgb(clr, clr, clr);
      }
    }

    let bufferNewData = new ArrayBuffer(p.getPixelBytesNumber());
    let dataNewArray = new Uint8Array(bufferNewData);
    let index = 0;

    for (let i = 0; i < dataNewArray.length; i += 4) {
      dataNewArray[i] = ColorUtils.red(pixSrc[index]);
      dataNewArray[i+1] = ColorUtils.green(pixSrc[index]);
      dataNewArray[i+2] = ColorUtils.blue(pixSrc[index]);
      dataNewArray[i+3] = pixEntry[index].f;
      index++;
    }
    await p.writeBufferToPixels(bufferNewData);

    if (func != undefined) {
      func.asyncTransform("success", p);
    }
  }

  let gaussGray = (psrc: Array<number>, horz: number, vert: number,
                   width: number, height: number): number => {
    let dst: Array<number>;
    let src: Array<number>;
    let n_p: Array<number>;
    let n_m: Array<number>;
    let d_p: Array<number>;
    let d_m: Array<number>;
    let bd_p: Array<number>;
    let bd_m: Array<number>;
    let val_p: Array<number>;
    let val_m: Array<number>;
    let initial_p: Array<number>;
    let initial_m: Array<number>;
    let i: number;
    let j: number;
    let t: number;
    let k: number;
    let row: number;
    let col: number;
    let terms: number;
    let std_dev: number;
    let sp_p_idx: number;
    let sp_m_idx: number;
    let vp_idx: number;
    let vm_idx: number;
    let row_stride = width;
    let max_len = Math.max(width, height);
    val_p = createIntArray(max_len);
    val_m = createIntArray(max_len);
    n_p = createIntArray(5);
    n_m = createIntArray(5);
    d_p = createIntArray(5);
    d_m = createIntArray(5);
    bd_p = createIntArray(5);
    bd_m = createIntArray(5);
    src = createIntArray(max_len);
    dst = createIntArray(max_len);
    initial_p = createIntArray(4);
    initial_m = createIntArray(4);
    // 垂直方向
    if (vert > 0.0) {
      vert = Math.abs(vert) + 1.0;
      std_dev = Math.sqrt(-(vert * vert) / (2 * Math.log(1.0 / 255.0)));
      // 初试化常量
      findConstants(n_p, n_m, d_p, d_m, bd_p, bd_m, std_dev);
      for (col = 0; col < width; col++) {
        for (k = 0; k < max_len; k++) {
          val_m[k] = val_p[k] = 0;
        }
        for (t = 0; t < height; t++) {
          src[t] = psrc[t * row_stride + col];
        }
        sp_p_idx = 0;
        sp_m_idx = height - 1;
        vp_idx = 0;
        vm_idx = height - 1;
        initial_p[0] = src[0];
        initial_m[0] = src[height - 1];
        for (row = 0; row < height; row++) {
          terms = (row < 4) ? row : 4;
          for (i = 0; i <= terms; i++) {
            val_p[vp_idx] += n_p[i] * src[sp_p_idx - i] - d_p[i]
            * val_p[vp_idx - i];
            val_m[vm_idx] += n_m[i] * src[sp_m_idx + i] - d_m[i]
            * val_m[vm_idx + i];
          }
          for (j = i; j <= 4; j++) {
            val_p[vp_idx] += (n_p[j] - bd_p[j]) * initial_p[0];
            val_m[vm_idx] += (n_m[j] - bd_m[j]) * initial_m[0];
          }
          sp_p_idx++;
          sp_m_idx--;
          vp_idx++;
          vm_idx--;
        }
        transferGaussPixels(val_p, val_m, dst, 1, height);
        for (t = 0; t < height; t++) {
          psrc[t * row_stride + col] = dst[t];
        }
      }
    }
    // 水平方向
    if (horz > 0.0) {
      horz = Math.abs(horz) + 1.0;
      if (horz != vert) {
        std_dev = Math.sqrt(-(horz * horz)
        / (2 * Math.log(1.0 / 255.0)));
        // 初试化常量
        findConstants(n_p, n_m, d_p, d_m, bd_p, bd_m, std_dev);
      }
      for (row = 0; row < height; row++) {
        for (k = 0; k < max_len; k++) {
          val_m[k] = val_p[k] = 0;
        }
        for (t = 0; t < width; t++) {
          src[t] = psrc[row * row_stride + t];
        }
        sp_p_idx = 0;
        sp_m_idx = width - 1;
        vp_idx = 0;
        vm_idx = width - 1;
        initial_p[0] = src[0];
        initial_m[0] = src[width - 1];
        for (col = 0; col < width; col++) {
          terms = (col < 4) ? col : 4;
          for (i = 0; i <= terms; i++) {
            val_p[vp_idx] += n_p[i] * src[sp_p_idx - i] - d_p[i]
            * val_p[vp_idx - i];
            val_m[vm_idx] += n_m[i] * src[sp_m_idx + i] - d_m[i]
            * val_m[vm_idx + i];
          }
          for (j = i; j <= 4; j++) {
            val_p[vp_idx] += (n_p[j] - bd_p[j]) * initial_p[0];
            val_m[vm_idx] += (n_m[j] - bd_m[j]) * initial_m[0];
          }
          sp_p_idx++;
          sp_m_idx--;
          vp_idx++;
          vm_idx--;
        }
        transferGaussPixels(val_p, val_m, dst, 1, width);
        for (t = 0; t < width; t++) {
          psrc[row * row_stride + t] = dst[t];
        }
      }
    }
    return 0;
  }

  let findConstants = (n_p: Array<number>, n_m: Array<number>, d_p: Array<number>,
                       d_m: Array<number>, bd_p: Array<number>
                       , bd_m: Array<number>, std_dev: number) => {
    let div = Math.sqrt(2 * 3.141593) * std_dev;
    let x0 = -1.783 / std_dev;
    let x1 = -1.723 / std_dev;
    let x2 = 0.6318 / std_dev;
    let x3 = 1.997 / std_dev;
    let x4 = 1.6803 / div;
    let x5 = 3.735 / div;
    let x6 = -0.6803 / div;
    let x7 = -0.2598 / div;
    let i: number;
    n_p[0] = x4 + x6;
    n_p[1] = (Math.exp(x1)
    * (x7 * Math.sin(x3) - (x6 + 2 * x4) * Math.cos(x3)) + Math
      .exp(x0) * (x5 * Math.sin(x2) - (2 * x6 + x4) * Math.cos(x2)));
    n_p[2] = (2
    * Math.exp(x0 + x1)
    * ((x4 + x6) * Math.cos(x3) * Math.cos(x2) - x5 * Math.cos(x3)
    * Math.sin(x2) - x7 * Math.cos(x2) * Math.sin(x3)) + x6
    * Math.exp(2 * x0) + x4 * Math.exp(2 * x1));
    n_p[3] = (Math.exp(x1 + 2 * x0)
    * (x7 * Math.sin(x3) - x6 * Math.cos(x3)) + Math.exp(x0 + 2
    * x1)
    * (x5 * Math.sin(x2) - x4 * Math.cos(x2)));
    n_p[4] = 0.0;
    d_p[0] = 0.0;
    d_p[1] = -2 * Math.exp(x1) * Math.cos(x3) - 2 * Math.exp(x0)
    * Math.cos(x2);
    d_p[2] = 4 * Math.cos(x3) * Math.cos(x2) * Math.exp(x0 + x1)
    + Math.exp(2 * x1) + Math.exp(2 * x0);
    d_p[3] = -2 * Math.cos(x2) * Math.exp(x0 + 2 * x1) - 2 * Math.cos(x3)
    * Math.exp(x1 + 2 * x0);
    d_p[4] = Math.exp(2 * x0 + 2 * x1);
    for (i = 0; i <= 4; i++) {
      d_m[i] = d_p[i];
    }
    n_m[0] = 0.0;
    for (i = 1; i <= 4; i++) {
      n_m[i] = n_p[i] - d_p[i] * n_p[0];
    }
    let sum_n_p: number;
    let sum_n_m: number;
    let sum_d: number;
    let a: number;
    let b: number;
    sum_n_p = 0.0;
    sum_n_m = 0.0;
    sum_d = 0.0;
    for (i = 0; i <= 4; i++) {
      sum_n_p += n_p[i];
      sum_n_m += n_m[i];
      sum_d += d_p[i];
    }
    a = sum_n_p / (1.0 + sum_d);
    b = sum_n_m / (1.0 + sum_d);
    for (i = 0; i <= 4; i++) {
      bd_p[i] = d_p[i] * a;
      bd_m[i] = d_m[i] * b;
    }
  }

  let transferGaussPixels = (src1: Array<number>, src2: Array<number>,
                             dest: Array<number>, bytes: number, width: number) => {
    let i: number;
    let j: number;
    let k: number;
    let b: number;
    let sum: number;
    let bend = bytes * width;
    i = j = k = 0;
    for (b = 0; b < bend; b++) {
      sum = src1[i++] + src2[j++];
      if (sum > 255)
        sum = 255;
      else if (sum < 0)
        sum = 0;
      dest[k++] = sum;
    }
  }

  export function createIntArray(len: number): Array<number> {
    let array = new Array<number>();
    for (let index = 0; index < len; index++) {
      array.push(0);
    }
    return array;
  }

  export function createInt2DArray(first_len: number, second_len: number): Array<Array<number>> {
    let array = new Array<Array<number>>();
    for (let f = 0; f < first_len; f++) {
      let s1 = new Array<number>();
      for (let s = 0; s < second_len; s++) {
        s1.push(0);
      }
      array.push(s1);
    }
    return array;
  }

  export async function sketchGpu(p: PixelMap, func?: AsyncTransform<PixelMap>) {
    let imageInfo: image.ImageInfo = await p.getImageInfo();
    let size:Size = {
      width: imageInfo.size.width,
      height: imageInfo.size.height
    }
    if (!size) {
      func?.asyncTransform("sketch The image size does not exist.", null)
      return;
    }

    let w = size.width;
    let h = size.height;

    let bufferData = new ArrayBuffer(p.getPixelBytesNumber());
    await p.readPixelsToBuffer(bufferData);
    let filter = new GPUImageSketchFilter();
    filter.setImageData(bufferData, w, h);
    filter.getPixelMapBuf(0, 0, w, h).then((buf) => {
      p.writeBufferToPixels(buf);
      if (func != undefined) {
        func.asyncTransform("success", p);
      }
    })
  }
}