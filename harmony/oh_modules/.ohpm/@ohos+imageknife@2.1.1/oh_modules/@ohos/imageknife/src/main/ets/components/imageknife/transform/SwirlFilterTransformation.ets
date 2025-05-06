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
import { PixelEntry } from '../entry/PixelEntry'
import { ColorUtils } from '../utils/ColorUtils'
import { CalculatePixelUtils } from '../utils/CalculatePixelUtils'
import { GPUImageSwirlFilter } from '@ohos/gpu_transform'
import { BusinessError } from '@ohos.base'
import {Size} from '../../imageknife/RequestOption'

export class SwirlFilterTransformation implements BaseTransform<PixelMap> {
  private radius: number = 0;
  private _angle: number = 0.9;
  private _xCenter: number = 0.5;
  private _yCenter: number = 0.5;

  constructor(radius: number, angle?: number, centerPoint?: Array<number>) {
    this.radius = radius;
    if (angle) {
      this._angle = angle;
    }
    if (centerPoint && centerPoint.length === 2) {
      this._xCenter = centerPoint[0];
      this._yCenter = centerPoint[1];
    }
  }

  getName() {
    return 'SwirlFilterTransformation' + this.radius;
  }

  transform(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    if (!buf || buf.byteLength <= 0) {
      if (func != undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + ';SwirlFilterTransformation buf is empty', null);
      }
      return;
    }
    let imageSource:image.ImageSource = image.createImageSource(buf);
    TransformUtils.getPixelMapSize(imageSource,{asyncTransform: (error:BusinessError|string, size:Size|null) => {
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

      let options:image.DecodingOptions = {
        editable: true,
        desiredSize: {
          width: targetWidth,
          height: targetHeight
        }
      }
      imageSource.createPixelMap(options)
        .then((data) => {
          this.swirl(data, this.radius, request, func);
          imageSource.release();
        })
        .catch((e:BusinessError) => {
          imageSource.release();
          func?.asyncTransform(e, null);
        })
    }})
  }

  private async swirl(bitmap: image.PixelMap, degree: number, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    let imageInfo:image.ImageInfo = await bitmap.getImageInfo();
    let size:Size = {
      width: imageInfo.size.width,
      height: imageInfo.size.height
    }
    if (!size) {
      return;
    }
    let width:number = size.width;
    let height:number = size.height;


    let bufferData = new ArrayBuffer(bitmap.getPixelBytesNumber());
    await bitmap.readPixelsToBuffer(bufferData);
    if (request.gpuEnabled) {
      let filter = new GPUImageSwirlFilter();
      filter.setImageData(bufferData, width, height);
      filter.setRadius(degree);
      filter.setAngle(this._angle)
      filter.setCenter(this._xCenter, this._yCenter)
      let buf = await filter.getPixelMapBuf(0, 0, width, height);
      bitmap.writeBufferToPixels(buf);
      if (func != undefined) {
        func?.asyncTransform("success", bitmap);
      }
      return;
    }

    let pixEntry: Array<PixelEntry> = new Array();

    let rgbData = CalculatePixelUtils.createInt2DArray(height, width);

    let dataArray = new Uint8Array(bufferData);

    let ph:number = 0;
    let pw:number = 0;
    for (let index = 0; index < dataArray.length; index += 4) {
      const r:number = dataArray[index];
      const g:number = dataArray[index+1];
      const b:number = dataArray[index+2];
      const f:number = dataArray[index+3];

      let entry = new PixelEntry();
      entry.a = 0;
      entry.b = b;
      entry.g = g;
      entry.r = r;
      entry.f = f;
      entry.pixel = ColorUtils.rgb(entry.r, entry.g, entry.b);
      pixEntry.push(entry);
      rgbData[ph][pw] = ColorUtils.rgb(entry.r, entry.g, entry.b);
      if (pw == width - 1) {
        pw = 0;
        ph++;
      } else {
        pw++;
      }
    }

    let k = degree / 3600;
    let cenX = width / 2;
    let cenY = height / 2;

    let radius = 0;
    for (let h = 0;h < height; h++) {
      for (let w = 0; w < width; w++) {

        let offerX = w - cenX;
        let offerY = h - cenY;
        let radian = Math.atan2(offerY, offerX)
        radius = Math.floor(Math.sqrt(offerX * offerX + offerY * offerY));

        let newX = Math.floor(radius * Math.cos(radian + k * radius)) + cenX;
        let newY = Math.floor(radius * Math.sin(radian + k * radius)) + cenY;

        newX = Math.floor(Math.min(width - 1, Math.max(0, newX)));
        newY = Math.floor(Math.min(height - 1, Math.max(0, newY)));

        rgbData[h][w] = rgbData[newY][newX];
      }
    }


    let bufferNewData = new ArrayBuffer(bitmap.getPixelBytesNumber());
    let dataNewArray = new Uint8Array(bufferNewData);
    let index = 0;
    let mh = 0;
    let nw = 0;

    for (let i = 0; i < dataNewArray.length; i += 4) {
      let pixel_1 = rgbData[mh][nw];

      if (nw == width - 1) {
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
    if (func != undefined) {
      func?.asyncTransform("", bitmap);
    }
  }
}