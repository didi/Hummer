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
import { ArcPoint } from "../entry/ArcPoint"
import { Constants } from "../constants/Constants"
import { RequestOption } from "../../imageknife/RequestOption"
import { TransformUtils } from "../transform/TransformUtils"
import {LogUtil} from '../../imageknife/utils/LogUtil'
import { BusinessError } from '@ohos.base'
import {Size} from '../../imageknife/RequestOption'

import image from "@ohos.multimedia.image"

export interface RoundCorner{
  top_left: number,
  top_right: number,
  bottom_left: number,
  bottom_right: number
}

export class RoundedCornersTransformation implements BaseTransform<PixelMap> {
  private mTop_left: number = 0;
  private mTop_right: number = 0;
  private mBottom_left: number = 0;
  private mBottom_right: number = 0;
  private mTransform_pixelMap: PixelMap|undefined = undefined;
  private mPoint: ArcPoint[] = new Array();

  constructor(value:RoundCorner) {
    this.mTop_left = value.top_left;
    this.mTop_right = value.top_right;
    this.mBottom_left = value.bottom_left;
    this.mBottom_right = value.bottom_right;
  }

  getName() {
    return "RoundedCornersTransformation" + ";mTop_left:" + this.mTop_left
    + ";mTop_right:" + this.mTop_right
    + ";mBottom_left:" + this.mBottom_left
    + ";mBottom_right:" + this.mBottom_right
  }

  transform(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    LogUtil.log('RoundedCornersTransformation = '+ this.getName()
    + 'buf is null ='+ (buf == null));
    if (!buf || buf.byteLength <= 0) {
      LogUtil.log(Constants.PROJECT_TAG + ";RoundedCornersTransformation buf is empty");
      if (func != undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + ";RoundedCornersTransformation buf is empty", null);
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
      let targetWidth:number = request.size.width;
      let targetHeight:number = request.size.height;
      if (pixelMapWidth < targetWidth) {
        targetWidth = pixelMapWidth;
      }
      if (pixelMapHeight < targetHeight) {
        targetHeight = pixelMapHeight;
      }
      this.transformPixelMap(imageSource, targetWidth, targetHeight, func);
    }})
  }

  private transformPixelMap(imageSource: image.ImageSource, outWith: number, outHeight: number, func?: AsyncTransform<PixelMap>) {
    let options:image.DecodingOptions = {
      editable: true,
      desiredSize: {
        width: outWith,
        height: outHeight
      }
    }
    imageSource.createPixelMap(options)
      .then((pixelMap) => {
      this.mTransform_pixelMap = pixelMap;
      this.mTransform_pixelMap.getImageInfo()
        .then((data) => {
        let width:number = data.size.width;
        let height:number = data.size.height;
        if (this.mTop_left > 0) {
          this.top_left_corners();
        }
        if (this.mTop_right > 0) {
          this.top_right_corners(width);
        }
        if (this.mBottom_left > 0) {
          this.bottom_left_corners(width, height);
        }
        if (this.mBottom_right > 0) {
          this.bottom_right_corners(width, height);
        }
        if (func != undefined && this.mTransform_pixelMap != undefined) {
          func?.asyncTransform("", this.mTransform_pixelMap);
        }
          imageSource.release()
      })
        .catch((error:BusinessError) => {
          imageSource.release()
        LogUtil.log(Constants.PROJECT_TAG + "RoundedCornersTransformation error:" + error);
      });
    })
      .catch((e:BusinessError) => {
      LogUtil.log(Constants.PROJECT_TAG + ";error:" + e);
      if (func != undefined) {
        func?.asyncTransform(e, null);
      }
    })

  }

  private top_left_corners() {
    this.mPoint = new Array<ArcPoint>();
    for (let time = 180; time < 270; time++) {
      let hudu:number = (2 * Math.PI / 360) * time;
      let x:number= this.mTop_left + Math.sin(hudu) * this.mTop_left;
      let y:number = this.mTop_left + Math.cos(hudu) * this.mTop_left;
      this.mPoint.push(new ArcPoint(x, y));
    }
    this.hand_pixel_point(this.mPoint);
  }

  private top_right_corners(width: number) {
    this.mPoint = new Array<ArcPoint>();
    for (let time = 0; time < 90; time++) {
      let hudu:number = (2 * Math.PI / 360) * time;
      let x:number = (width - this.mTop_right) + Math.cos(hudu) * this.mTop_right;
      let y:number = this.mTop_right - Math.sin(hudu) * this.mTop_right;
      this.mPoint.push(new ArcPoint(x, y));
    }

    this.hand_right_pixel_point(this.mPoint, width);
  }

  private bottom_left_corners(width: number, height: number) {
    this.mPoint = new Array<ArcPoint>();
    for (let time = 90; time < 180; time++) {
      let hudu = (2 * Math.PI / 360) * time;
      let x = this.mBottom_left + Math.cos(hudu) * this.mBottom_left;
      let y = height - this.mBottom_left + Math.sin(hudu) * this.mBottom_left;
      this.mPoint.push(new ArcPoint(x, y));
    }
    this.hand_pixel_point(this.mPoint);
  }

  private bottom_right_corners(width: number, height: number) {
    this.mPoint = new Array<ArcPoint>();
    for (let time = 0; time < 90; time++) {
      let hudu = (2 * Math.PI / 360) * time;
      let x = width - this.mBottom_right + Math.cos(hudu) * this.mBottom_right;
      let y = height - this.mBottom_right + Math.sin(hudu) * this.mBottom_right;
      this.mPoint.push(new ArcPoint(x, y));
    }
    this.hand_right_pixel_point(this.mPoint, width);
  }

  private hand_pixel_point(points: ArcPoint[]) {
    for (let index = 0; index < points.length; index++) {
      const element = points[index];
      let x = element.getX();
      let y = element.getY();

      for (let i = 0; i <= x; i++) {
        let buffer1 = new ArrayBuffer(5);
        let bytes1 = new Uint8Array(buffer1);
        let writePositionRen:image.PositionArea = {
          pixels: buffer1,
          offset: 1,
          stride: 1024,
          region: { size: { width: 1, height: 1 },
            x: i,
            y: y
          }
        }
        for (let j = 0;j < 5; j++) {
          bytes1[j] = 0;
        }
        if(this.mTransform_pixelMap != undefined) {
          this.mTransform_pixelMap.writePixels(writePositionRen);
        }
      }
    }
  }

  private hand_right_pixel_point(points: ArcPoint[], width: number) {
    for (let index = 0; index < points.length; index++) {
      const element = points[index];
      let x = element.getX();
      let y = element.getY();

      for (let i = x; i <= width; i++) {
        let buffer1 = new ArrayBuffer(5);
        let bytes1 = new Uint8Array(buffer1);
        let writePositionRen:image.PositionArea = {
          pixels: buffer1,
          offset: 0,
          stride: 4,
          region: { size: { width: 1, height: 1 },
            x: i,
            y: y
          }
        }
        for (let j = 0;j < 5; j++) {
          bytes1[j] = 0;
        }
        if(this.mTransform_pixelMap != undefined) {
          this.mTransform_pixelMap.writePixels(writePositionRen);
        }
      }
    }
  }
}