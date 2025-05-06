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
import arkWorker from '@ohos.worker';
import {UPNG} from './src/main/ets/components/3rd_party/upng/UPNG'

export  function handler (e) {
  var data = e.data;
  switch (data.type) {
    case 'readPngImageAsync':
      var png = UPNG.decode(data.data);
      let array = png.data;
      let arrayData = array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
      png.data = arrayData;
      let dataObj = { type: 'readPngImageAsync', data: png, receiver: data.data}
      arkWorker.parentPort.postMessage(dataObj, [png.data, data.data]);
      break;
    case 'writePngWithStringAsync':
      let addInfo = data.info;
      let pngDecode = UPNG.decode(data.data);
      let newPng = UPNG.encodeWithString(addInfo, UPNG.toRGBA8(pngDecode), pngDecode.width, pngDecode.height, 0)
      let dataObj2 = { type: 'writePngWithStringAsync', data: newPng, receiver: data.data}
      arkWorker.parentPort.postMessage(dataObj2, [newPng, data.data]);
      break;
    case 'writePngAsync':
      let pngDecode3 = UPNG.decode(data.data);
      let newPng3 = UPNG.encode(UPNG.toRGBA8(pngDecode3), pngDecode3.width, pngDecode3.height, 0)
      let dataObj3 = { type: 'writePngAsync', data: newPng3, receiver: data.data}
      arkWorker.parentPort.postMessage(dataObj3, [newPng3, data.data]);
      break;
    default:
      break
    }
}


