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

import { HttpDownloadClient } from './HttpDownloadClient'
import { LoadLocalFileClient } from './LoadLocalFileClient'
import { LoadDataShareFileClient } from './LoadDataShareFileClient'
import loadRequest from '@ohos.request';
import { ImageKnifeGlobal } from '../ImageKnifeGlobal'
import common from '@ohos.app.ability.common'
import { NetworkDownloadClient } from './NetworkDownloadClient'

// 数据加载器
export class DownloadClient implements IDataFetch {
  private networkDownloadClient = new NetworkDownloadClient();
  private httpDownloadClient = new HttpDownloadClient();
  private localFileClient = new LoadLocalFileClient();
  private dataShareFileClient = new LoadDataShareFileClient();

  loadData(request: RequestOption, onCompleteFunction:(img: ArrayBuffer) => void, onErrorFunction: (err: string) => void) {
    if (typeof request.loadSrc == 'string') {
      let fileDir:string = (ImageKnifeGlobal.getInstance().getHapContext() as common.UIAbilityContext).filesDir as string;
      let cacheDir:string  = (ImageKnifeGlobal.getInstance().getHapContext() as common.UIAbilityContext).cacheDir as string

      if (request.loadSrc.startsWith(fileDir) ||
      request.loadSrc.startsWith(cacheDir)) {
        // 本地沙盒
        this.localFileClient.loadData(request, onCompleteFunction, onErrorFunction)
      } else if (request.loadSrc.startsWith('datashare://') || request.loadSrc.startsWith('file://')) {
        this.dataShareFileClient.loadData(request, onCompleteFunction, onErrorFunction)
      } else {
        // 网络下载
        this.httpDownloadClient.loadData(request, onCompleteFunction, onErrorFunction)
      }
    }
  }
}