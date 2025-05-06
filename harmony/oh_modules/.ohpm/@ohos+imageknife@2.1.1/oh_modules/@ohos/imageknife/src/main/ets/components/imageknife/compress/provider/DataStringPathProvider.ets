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

import {CompressAdapter, PixelMapFormat} from '../provider/CompressAdapter'
import {CompressDataListener} from '../listener/CompressDataListener'
import {FileUtils} from '../../../cache/FileUtils'

export class DataStringPathProvider extends CompressAdapter {
  constructor(s: string) {
    super()
    this.mPath = s;
  }

  getRecoursePath(): string{
    return this.mPath;
  }

  openInternal(callback: CompressDataListener<ArrayBuffer>) {
    if (!this.mPath) {
      throw new Error('DataStringPathProvider error path is empty');
    }
    let buffer = FileUtils.getInstance().readFilePic(this.mPath);
    this.mData = buffer;
    if (callback) {
      callback.compressDataListener(buffer);
    }
  }

  getPixelMapFormat(): PixelMapFormat|undefined{
    if (!this.mPath) {
      return PixelMapFormat.NONE;
    }
    let lastIndex = this.mPath.lastIndexOf('/')
    let s = this.mPath.substring(lastIndex + 1, this.mPath.length);
    return this.getFormat(s);
  }
}