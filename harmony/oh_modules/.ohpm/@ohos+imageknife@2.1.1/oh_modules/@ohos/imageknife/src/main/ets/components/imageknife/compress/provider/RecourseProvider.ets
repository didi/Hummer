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

import { CompressAdapter, PixelMapFormat } from "../provider/CompressAdapter"
import { CompressDataListener } from "../listener/CompressDataListener"
import { FileTypeUtil } from '../../../imageknife/utils/FileTypeUtil'
import { ImageKnifeGlobal } from '../../ImageKnifeGlobal';
import resourceManager from '@ohos.resourceManager';
import { BusinessError } from '@ohos.base'

export class RecourseProvider extends CompressAdapter {
  private static CHARS: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  private static DEFAULT_RESOURCE_PATH: string = "Resource"
  private _mLookup: Uint8Array = new Uint8Array(256);
  private _mResourceData?: Resource = undefined;
  private _mPixelMapHeader: string = '';

  constructor(s: Resource) {
    super()
    this._mResourceData = s;
    this.mPath = RecourseProvider.DEFAULT_RESOURCE_PATH;
    for (let index = 0; index < RecourseProvider.CHARS.length; index++) {
      this._mLookup[RecourseProvider.CHARS.charCodeAt(index)] = index;
    }
  }

  getRecoursePath(): string {
    return this.mPath;
  }

  openInternal(callback: CompressDataListener<ArrayBuffer>) {
    console.info("asasd compress openInternal _mData");
    if (!this._mResourceData) {
      throw Error("compress resource is empty");
    }
    ((ImageKnifeGlobal.getInstance()
      .getHapContext() as Record<string, Object>).resourceManager as resourceManager.ResourceManager)
      .getMediaContent(this._mResourceData.id)
      .then(data => {
        let buffer = this.uint8ArrayToBuffer(data);
        let fileTypeUtil = new FileTypeUtil()
        let fileType = fileTypeUtil.getFileType(buffer);
        if(fileType != null) {
          this._mPixelMapHeader = fileType;
        }
        callback.compressDataListener(buffer);
      })
      .catch((err: BusinessError) => {
        console.log("RecourseProvider openInternal err" + JSON.stringify(err as BusinessError));
      })

  }

  getPixelMapFormat(): PixelMapFormat|undefined{
    if (!this._mPixelMapHeader) {
      return PixelMapFormat.NONE;
    }
    return this.getFormat(this._mPixelMapHeader);
  }
  /**
   * data decode
   */
  decode(base64: string, callback: CompressDataListener<ArrayBuffer>) {
    let bufferLength: number = base64.length;
    let len: number = base64.length;
    let i: number = 0;
    let p: number = 0;
    let encoded1: number = 0;
    let encoded2: number = 0;
    let encoded3: number = 0;
    let encoded4: number = 0;

    if (base64[base64.length - 1] === '=') {
      bufferLength--;
      if (base64[base64.length - 2] === '=') {
        bufferLength--;
      }
    }

    const arraybuffer = new ArrayBuffer(bufferLength),
      bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i += 4) {
      encoded1 = this._mLookup[base64.charCodeAt(i)];
      encoded2 = this._mLookup[base64.charCodeAt(i + 1)];
      encoded3 = this._mLookup[base64.charCodeAt(i + 2)];
      encoded4 = this._mLookup[base64.charCodeAt(i + 3)];

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);

    }
    this.mData = arraybuffer;
    if (callback) {
      callback.compressDataListener(arraybuffer);
    }
  }

  uint8ArrayToBuffer(array: Uint8Array): ArrayBuffer {
    return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
  }
}