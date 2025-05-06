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

import {CompressProvider} from "../provider/CompressProvider"
import {CompressDataListener} from "../listener/CompressDataListener"

export abstract class CompressAdapter implements CompressProvider {
  mData: ArrayBuffer = new ArrayBuffer(0);
  mPath: string = '';

  close() {
  }

  openData(): ArrayBuffer{
    return this.mData;
  }

  getPath(): string{
    return this.mPath;
  };

  abstract openInternal(callback: CompressDataListener<ArrayBuffer>);

  abstract getRecoursePath(): string;

  abstract getPixelMapFormat(): PixelMapFormat | undefined;

  getFormat(s: string): PixelMapFormat | undefined{
    if (!s) {
      return undefined;
    }
    if (s == "jpg" || s == "JPG") {
      return PixelMapFormat.JPG;
    } else if (s == "png" || s == "PNG") {
      return PixelMapFormat.PNG;
    } else if (s == "jpeg" || s == "JPEG") {
      return PixelMapFormat.JPEG;
    } else if (s == "gif" || s == "GIF") {
      return PixelMapFormat.GIF;
    } else if (s == "webp" || s == "WEBP" || s == "WebP") {
      return PixelMapFormat.WEBP;
    } else if (s == "bmg" || s == "BMG") {
      return PixelMapFormat.BMG;
    } else {
      return PixelMapFormat.NONE;
    }
  }
}

export enum PixelMapFormat {
  JPG,
  PNG,
  JPEG,
  WEBP,
  BMG,
  GIF,
  NONE
}

