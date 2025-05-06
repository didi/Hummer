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

import { OnCompressListener } from '../compress/listener/OnCompressListener'
import { CompressionPredicate } from '../compress/listener/CompressionPredicate'
import { CompressAdapter } from "../compress/provider/CompressAdapter"
import { DataStringPathProvider } from '../compress/provider/DataStringPathProvider'
import { RecourseProvider } from '../compress/provider/RecourseProvider'
import { FileUtils } from '../../cache/FileUtils'
import image from "@ohos.multimedia.image"
import fs from '@ohos.file.fs';
import { BusinessError } from '@ohos.base'

export class Engine {
  private mFocusAlpha: boolean;
  private mCompressListener: OnCompressListener
  private mPredicate: CompressionPredicate
  private mCompressAdapter: CompressAdapter
  private mPath: string
  private _mLeastCompressSize: number; // KB

  constructor(compressAdapter: CompressAdapter,
              outPath: string,
              focusAlpha: boolean,
              leastSize: number,
              compressListener: OnCompressListener,
              predicate: CompressionPredicate) {
    this.mCompressAdapter = compressAdapter;
    this.mPath = outPath;
    this.mFocusAlpha = focusAlpha;
    this.mCompressListener = compressListener;
    this.mPredicate = predicate;
    this._mLeastCompressSize = leastSize;
  }

  private computeSize(srcWidth: number, srcHeight: number): number {
    srcWidth = srcWidth % 2 == 1 ? srcWidth + 1 : srcWidth;
    srcHeight = srcHeight % 2 == 1 ? srcHeight + 1 : srcHeight;

    let longSide = Math.max(srcWidth, srcHeight);
    let shortSide = Math.min(srcWidth, srcHeight);

    let scale = shortSide / longSide;
    if (scale <= 1 && scale > 0.5625) {
      if (longSide < 1664) {
        return 1;
      } else if (longSide < 4990) {
        return 2;
      } else if (longSide > 4990 && longSide < 10240) {
        return 4;
      } else {
        return longSide / 1280 == 0 ? 1 : longSide / 1280;
      }
    } else if (scale <= 0.5625 && scale > 0.5) {
      return longSide / 1280 == 0 ? 1 : longSide / 1280;
    } else {
      return Math.ceil(longSide / (1280.0 / scale));
    }
  }

  compress() {
    if (this.mCompressAdapter instanceof DataStringPathProvider) {
      // file
      this.mCompressAdapter.openInternal({ compressDataListener: (buffer: ArrayBuffer) => {
        if (!buffer) {
          if (this.mCompressListener) {
            this.mCompressListener.onError("file read fail,and date is empty")
          }
          return;
        }
        if (!this.checkNeedCompress(buffer)) {
          return;
        }

        let imageResource: image.ImageSource = image.createImageSource(buffer);
        imageResource.getImageInfo()
          .then(info => {
            let height = info.size.height;
            let width = info.size.width;
            let computeSize = this.computeSize(width, height);
            console.info("Engine compress computeSize:" + computeSize);
            let options: image.DecodingOptions = {
              editable: true,
              sampleSize: computeSize,
              desiredPixelFormat: image.PixelMapFormat.RGB_565,
            }
            imageResource.createPixelMap(options)
              .then(bitmap => {
                imageResource.release()
              })
              .catch((error: BusinessError) => {
                this.mCompressListener.onError("ptah createPixelMap fail,because error:" + JSON.stringify(error as BusinessError))
                imageResource.release()
              })


          })
          .catch((error: BusinessError) => {
            this.mCompressListener.onError("ptah getImageInfo fail,because error:" + JSON.stringify(error as BusinessError))
          })

      } })
    } else if (this.mCompressAdapter instanceof RecourseProvider) {
      // resource
      this.mCompressAdapter.openInternal({ compressDataListener: (buffer: ArrayBuffer) => {
        if (!buffer) {
          if (this.mCompressListener) {
            this.mCompressListener.onError("resource read fail,and date is empty")
          }
          return;
        }
        if (!this.checkNeedCompress(buffer)) {
          return;
        }
        let imageResource: image.ImageSource = image.createImageSource(buffer);
        imageResource.getImageInfo()
          .then(info => {
            let height = info.size.height;
            let width = info.size.width;
            let computeSize = this.computeSize(width, height);
            let packer: image.PackingOption = {
              format: "image/jpeg",
              quality: computeSize,
            }
            let imagePacker: image.ImagePacker = image.createImagePacker();
            imagePacker.packing(imageResource, packer, (err, compressBuffer) => {
              if (err) {
                this.mCompressListener.onError("resource packing fail,because error:" + err);
              }

              console.log("compressBuffer is null =" + (compressBuffer == null));
              console.log("compressBuffer is undefined =" + (compressBuffer == undefined));
              let dirPath = this.mPath.substring(0, this.mPath.lastIndexOf("/") + 1);
              let isDirectory = this.checkDirExist(dirPath);
              if (isDirectory) {
                this.saveFile(this.mPath, compressBuffer);
                this.handResult(compressBuffer, this.mPath);
              } else {
                fs.mkdir(dirPath)
                  .then(() => {
                    this.saveFile(this.mPath, compressBuffer);
                    this.handResult(compressBuffer, this.mPath);
                  });
              }
            })


          })
      } })


    }
  }

  private handResult(buffer: ArrayBuffer, path: string) {
    let imageRes:image.ImageSource = image.createImageSource(buffer);
    let a:image.DecodingOptions = {
      editable: true,
    }
    imageRes.createPixelMap(a)
      .then(bitmap => {
        if (this.mCompressListener) {
          this.mCompressListener.onSuccess(bitmap, path);
        }
        imageRes.release()
      })
      .catch((error:BusinessError) => {
        if (this.mCompressListener) {
          this.mCompressListener.onError("buffer generated pixelMap fail,because error:" + JSON.stringify(error as BusinessError))
        }
        imageRes.release()
      })
  }

  private checkNeedCompress(buf: ArrayBuffer): boolean {
    if (!buf) {
      return false;
    }
    let  length = buf.byteLength / 1024;
    return length > this._mLeastCompressSize;
  }

  private saveFile(path: string, content: ArrayBuffer) {
    FileUtils.getInstance().writeFile(path, content);
  }

  private checkDirExist(dirPath: string): boolean {
    let isExist:boolean = fs.accessSync(dirPath);
    return isExist;
  }
}