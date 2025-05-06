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
import { SparkMD5 } from '../../3rd_party/sparkmd5/spark-md5'
import { FileUtils } from '../../cache/FileUtils'
import loadRequest from '@ohos.request';
import { LogUtil } from '../utils/LogUtil'
import { ImageKnifeGlobal } from '../ImageKnifeGlobal'
import common from '@ohos.app.ability.common'
import { BusinessError } from '@ohos.base'
// 数据加载器
export class NetworkDownloadClient implements IDataFetch {
  loadData(request: RequestOption, onComplete: (img: ArrayBuffer) => void, onError: (err: string) => void) {
    let filename:string = SparkMD5.hashBinary(request.generateDataKey);
    let downloadFolder = request.getFilesPath() + "/" + request.networkCacheFolder;
    let allpath = request.getFilesPath() + "/" + request.networkCacheFolder + "/" + filename + ".img";
    if (!FileUtils.getInstance().existFolder(downloadFolder)) {
      FileUtils.getInstance().createFolder(downloadFolder)
    }

    // 理论上来讲不会进入这里来删除文件,但是如果存在文件,则需要同步删除保证后续文件下载没问题。
    if (FileUtils.getInstance().exist(allpath)) {
      FileUtils.getInstance().deleteFile(allpath)
    }
    let downloadConfig:loadRequest.DownloadConfig = {
      url: (request.loadSrc as string),
      filePath: allpath,
      // 允许计费流量下载
      enableMetered: true,
    };

    loadRequest.downloadFile( (request.getModuleContext()  as common.BaseContext ), downloadConfig).then((downloadTask:loadRequest.DownloadTask) => {
      if (downloadTask) {
       let loadTask:loadRequest.DownloadTask | null = downloadTask;

        loadTask.on('progress', (receivedSize, totalSize) => {
          if (totalSize > 0) {
            // 并不是所有服务器都会返回totalSize 当没有文件大小的时候,下载进度没有百分比回调,只能知道目前下载了多少数据量
            let percent = Math.round(((receivedSize * 1.0) / (totalSize * 1.0)) * 100)
            if (request.progressFunc) {
              request.progressFunc.asyncSuccess(percent);
            }
          }
        });

        loadTask.on('complete', () => {
          let downloadPath = allpath;
          request.downloadFilePath = downloadPath;
          FileUtils.getInstance().readFilePicAsync(downloadPath).then(arraybuffer=>{
            onComplete(arraybuffer);
            FileUtils.getInstance().deleteFileAsync(downloadPath).then(()=>{
              LogUtil.log('文件名:'+downloadPath+" 文件删除成功！")
            }).catch((err:BusinessError)=>{
              LogUtil.log('文件名:'+downloadPath+" 文件删除失败！")
            });
          }).catch((err:BusinessError)=>{
            onError('NetworkDownloadClient Read File Async Error Msg='+ (err as BusinessError)?.message)
          })

          if(loadTask != null) {
            loadTask.off('complete', () => {})
            loadTask.off('pause', () => {})
            loadTask.off('remove', () => {})
            loadTask.off('progress', () => {})
            loadTask.off('fail', () => {})
            loadTask = null;
          }
        })

        loadTask.on('pause', () => {})

        loadTask.on('remove', () => {})

        loadTask.on('fail', (err) => {
          onError('NetworkDownloadClient Download task fail err =' + err)
          if (loadTask!=null) {
            loadTask.delete().then(result => {
              if(loadTask != undefined) {
                loadTask.off('complete', () => {})
                loadTask.off('pause', () => {})
                loadTask.off('remove', () => {})
                loadTask.off('progress', () => {})
                loadTask.off('fail', () => {})
                loadTask = null
              }
            }).catch((err:BusinessError) => {
              loadTask = null;
              console.log('NetworkDownloadClient Download task fail err =' + err);
            })
          }
        })
      } else {
        onError('NetworkDownloadClient downloadTask dismiss!')
      }
    })
      .catch((err:BusinessError)=> {
        onError("下载子系统download错误捕获,error=" + err.message);
      })
  }
}