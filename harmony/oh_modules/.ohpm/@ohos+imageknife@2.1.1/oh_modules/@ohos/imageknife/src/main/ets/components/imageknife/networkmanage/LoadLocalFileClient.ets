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

import  { IDataFetch } from '../networkmanage/IDataFetch'
import { RequestOption } from '../RequestOption'
import { FileUtils } from '../../cache/FileUtils'
import { BusinessError } from '@ohos.base'
export class LoadLocalFileClient implements IDataFetch {
  loadData(request: RequestOption, onComplete: (img: ArrayBuffer) => void, onError: (err: string) => void) {
    if (typeof request.loadSrc == 'string') {
      FileUtils.getInstance().readFilePicAsync(request.loadSrc).then(fileBuffer=>{
        if (fileBuffer == null || fileBuffer.byteLength <= 0) {
          onError('LoadLocalFileClient loadLocalFileData The File Does Not Exist!Check The File!')
        } else {
          onComplete(fileBuffer);
        }
      }).catch((err:BusinessError)=>{
        onError('LoadLocalFileClient loadLocalFileData Error Msg ='+err?.message)
      })

    }
  }
}