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
export class Base64 {
  lookup: Uint8Array = new Uint8Array(256)
  chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  private static sInstance: Base64;

  public static getInstance(): Base64{
    if (!Base64.sInstance) {
      Base64.sInstance = new Base64();
    }
    return Base64.sInstance;
  }

  private constructor() {
    console.log("Base64 - constructor init!")
    for (let index = 0; index < this.chars.length; index++) {
      this.lookup[this.chars.charCodeAt(index)] = index;
    }
  }

  encode(arraybuffer: ArrayBuffer): string {
    let bytes = new Uint8Array(arraybuffer),
      len = bytes.length,
      base64 = '';
    let i:number = 0
    for (i = 0; i < len; i += 3) {
      base64 += this.chars[bytes[i] >> 2];
      base64 += this.chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += this.chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += this.chars[bytes[i + 2] & 63];
    }
    if (len % 3 === 2) {
      base64 = base64.substring(0, base64.length - 1) + '=';
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + '==';
    }
    return base64;
  }

  decode(base64: string): ArrayBuffer{
    let bufferLength = base64.length * 0.75,
      len = base64.length,
      p = 0;
      let i:number = 0;
      let encoded1:number = 0;
      let encoded2:number = 0;
      let encoded3:number = 0;
      let encoded4:number = 0;

    if (base64[base64.length - 1] === '=') {
      bufferLength--;
      if (base64[base64.length - 2] === '=') {
        bufferLength--;
      }
    }

    const arraybuffer = new ArrayBuffer(bufferLength),
      bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i += 4) {
      encoded1 = this.lookup[base64.charCodeAt(i)];
      encoded2 = this.lookup[base64.charCodeAt(i + 1)];
      encoded3 = this.lookup[base64.charCodeAt(i + 2)];
      encoded4 = this.lookup[base64.charCodeAt(i + 3)];

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  }
}