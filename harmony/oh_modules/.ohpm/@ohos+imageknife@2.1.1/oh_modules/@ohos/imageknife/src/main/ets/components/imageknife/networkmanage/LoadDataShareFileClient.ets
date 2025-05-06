/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import fs from '@ohos.file.fs';
import { BusinessError } from '@ohos.base'

export class LoadDataShareFileClient implements IDataFetch {
  loadData(request: RequestOption, onComplete: (img: ArrayBuffer) => void, onError: (err: string) => void) {
    if (typeof request.loadSrc == 'string') {
      fs.open(request.loadSrc, fs.OpenMode.READ_ONLY).then((file) => {
        fs.stat(file.fd).then(stat =>{
          let buf = new ArrayBuffer(stat.size);
          fs.read(file.fd, buf).then((readLen) => {
            onComplete(buf);
            fs.close(file.fd);
          }).catch((err:BusinessError) => {
            onError('LoadDataShareFileClient fs.read err happened uri=' + request.loadSrc + " err.msg=" + err?.message + " err.code=" + err?.code)
          })
        }).catch((err:BusinessError) => {
          onError('LoadDataShareFileClient fs.stat err happened uri=' + request.loadSrc + " err.msg=" + err?.message + " err.code=" + err?.code)
        })
      }).catch((err:BusinessError) => {
        onError('LoadDataShareFileClient fs.open err happened uri=' + request.loadSrc + " err.msg=" + err?.message + " err.code=" + err?.code)
      })
    }
  }
}