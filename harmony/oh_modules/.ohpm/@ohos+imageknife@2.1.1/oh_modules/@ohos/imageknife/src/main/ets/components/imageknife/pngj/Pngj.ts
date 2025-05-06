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
import {UPNG} from '../../3rd_party/upng/UPNG';
import {PngCallback} from './PngCallback';
import image from '@ohos.multimedia.image';
import resourceManager from '@ohos.resourceManager';
import ArkWorker from '@ohos.worker'
import { BusinessError } from '@ohos.base'
export class Pngj {
  readPngImageInfo(arraybuffer: ArrayBuffer, callback:PngCallback<ArrayBuffer, image.ImageInfo>) {
    let imageSource:image.ImageSource = image.createImageSource(arraybuffer);
    if (imageSource != undefined){
      imageSource.getImageInfo((err:BusinessError, value:image.ImageInfo) => {
        if (err) {
          return;
        }
        callback.pngCallback(arraybuffer, value);
      });
    }

  }

  /**
   *
   * @param pngBuffer  ArrayBuffer containing the PNG file
   * @param callback
   * returns an image object with following properties:
   * width: the width of the image
   * height: the height of the image
   * depth: number of bits per channel
   * ctype: color type of the file (Truecolor, Grayscale, Palette ...)
   * frames: additional info about frames (frame delays etc.)
   * tabs: additional chunks of the PNG file
   * data: pixel data of the image
   */
  readPngImage(pngBuffer: ArrayBuffer, callback:PngCallback<ArrayBuffer, any>) {
    var png = UPNG.decode(pngBuffer);
    callback.pngCallback(pngBuffer, png)
  }

  writePngWithString(addInfo:string, pngBuffer: ArrayBuffer,callback:PngCallback<ArrayBuffer, any>) {
    var pngDecode = UPNG.decode(pngBuffer);
    var newPng = UPNG.encodeWithString(addInfo, UPNG.toRGBA8(pngDecode), pngDecode.width, pngDecode.height, 0)
    callback.pngCallback(pngBuffer, newPng);
  }

  writePng(pngBuffer: ArrayBuffer,callback:PngCallback<ArrayBuffer, any>) {
    var pngDecode = UPNG.decode(pngBuffer);
    var newPng = UPNG.encode(UPNG.toRGBA8(pngDecode), pngDecode.width, pngDecode.height, 0)
    callback.pngCallback(pngBuffer, newPng);
  }

  readPngImageAsync(worker: any, pngBuffer: ArrayBuffer, callback: PngCallback<ArrayBuffer, any>) {
    worker.onerror = function (data) {

    }

    worker.onmessageerror = function (e) {

    }

    worker.onexit = function () {

    }

    worker.onmessage = function(e) {
      var data = e.data;
      switch (data.type) {
        case 'readPngImageAsync':
          callback.pngCallback(data.receiver, data.data)
          break;
        default:
          break
      }
      worker.terminate();
    }
    var obj = { type: 'readPngImageAsync', data: pngBuffer }
    worker.postMessage(obj, [pngBuffer])
  }

  writePngWithStringAsync(worker: any, addInfo: string, pngBuffer: ArrayBuffer, callback: PngCallback<ArrayBuffer, any>) {
    worker.onerror = function (data) {

    }

    worker.onmessageerror = function (e) {

    }

    worker.onexit = function () {

    }

    worker.onmessage = function(e) {
      var data = e.data;
      switch (data.type) {
        case 'writePngWithStringAsync':
          callback.pngCallback(data.receiver, data.data)
          break;
        default:
          break
      }
      worker.terminate();
    }

    var obj = { type: 'writePngWithStringAsync', data:pngBuffer, info: addInfo}
    worker.postMessage(obj, [pngBuffer])

  }

  writePngAsync(worker: any, pngBuffer: ArrayBuffer, callback: PngCallback<ArrayBuffer, any>) {
    worker.onerror = function (data) {

    }

    worker.onmessageerror = function (e) {

    }

    worker.onexit = function () {

    }

    worker.onmessage = function(e) {
      var data = e.data;
      switch (data.type) {
        case 'writePngAsync':
          callback.pngCallback(data.receiver, data.data)
          break;
        default:
          break
      }
      worker.terminate();
    }

    var obj = { type: 'writePngAsync', data:pngBuffer}
    worker.postMessage(obj, [pngBuffer])

  }

}