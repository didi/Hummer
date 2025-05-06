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

import { RequestOption,Size } from '../../imageknife/RequestOption'
import { FileTypeUtil } from '../../imageknife/utils/FileTypeUtil'
import { ImageKnifeData, ImageKnifeType } from '../ImageKnifeData'
import { ParseImageUtil } from '../utils/ParseImageUtil'
import { SupportFormat } from '../utils/FileTypeUtil'
import { SVGParseImpl } from '../utils/svg/SVGParseImpl'
import { ParseResClient } from '../resourcemanage/ParseResClient'
import {LogUtil} from '../../imageknife/utils/LogUtil'
import image from '@ohos.multimedia.image'
import { BusinessError } from '@ohos.base'

export class ErrorHolderManager<T> {
  private options: RequestOption;

  constructor(option: RequestOption) {
    this.options = option;
  }

  static execute(option: RequestOption) {
    let manager:ErrorHolderManager<ImageKnifeData> = new ErrorHolderManager<ImageKnifeData>(option);
    return new Promise(manager.process)
      .then(option.errorholderOnComplete).catch(option.errorholderOnError);
  }

  process = (onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void)=>{
    this.displayErrorholder(onComplete, onError);
  }

  private displayErrorholder(onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void) {
    LogUtil.log("displayErrorholder")
    if ((typeof (this.options.errorholderSrc as image.PixelMap).isEditable) == 'boolean') {
      let imageKnifeData = ImageKnifeData.createImagePixelMap(ImageKnifeType.PIXELMAP, this.options.errorholderSrc as PixelMap)
      onComplete(imageKnifeData);
    } else if (typeof this.options.errorholderSrc == 'string') {

    } else {
      let res = this.options.errorholderSrc as Resource;
      if (typeof res.id != 'undefined' && typeof res.id != 'undefined') {
        let resourceFetch = new ParseResClient();
        let suc = (arraybuffer:ArrayBuffer) => {
          let fileTypeUtil: FileTypeUtil = new FileTypeUtil();

            let typeValue: string | null = fileTypeUtil.getFileType(arraybuffer);
          if (typeValue != null) {
            switch (typeValue) {
              case SupportFormat.svg:
                this.svgProcess(onComplete, onError, arraybuffer, typeValue)
                break;
              case SupportFormat.jpg:
              case SupportFormat.png:
              case SupportFormat.bmp:
              case SupportFormat.gif:
              case SupportFormat.tiff:
              case SupportFormat.webp:
                this.mediaImageProcess(onComplete, onError, arraybuffer, typeValue)
                break;
              default:
                onError("ErrorHolderManager 文件类型不支持")
                break;
            }
          }else{
            onError("ErrorHolderManager 文件类型为null,请检查数据源arraybuffer")
          }
        }
        let ctx = this.options.getModuleContext();
        if(ctx != undefined){
          resourceFetch.loadResource(ctx,res, suc, onError)
        }else{
          onError("ErrorHolderManager moduleContext is undefined,please check it!")
        }
      } else {
        onError("ErrorHolderManager 输入参数有问题!")
      }
    }
  }

  private svgProcess(onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void, arraybuffer:ArrayBuffer, typeValue:string) {
    let svgParseImpl:SVGParseImpl = new SVGParseImpl()
    let size:Size = { width: this.options.size.width, height: this.options.size.height }
    svgParseImpl.parseSvg(arraybuffer, size).then((value: PixelMap) => {
      let imageKnifeData = ImageKnifeData.createImagePixelMap(ImageKnifeType.PIXELMAP, value)
      onComplete(imageKnifeData)
    }).catch((err:BusinessError) => {
      onError(err)
    })
  }

  private mediaImageProcess(onComplete:(value:ImageKnifeData)=>void|PromiseLike<ImageKnifeData>, onError:(reason?:BusinessError|string)=>void, arraybuffer:ArrayBuffer, typeValue:string) {
    let parseImageUtil = new ParseImageUtil()
    let success = (value: PixelMap) => {
      let imageKnifeData = ImageKnifeData.createImagePixelMap(ImageKnifeType.PIXELMAP, value)
      onComplete(imageKnifeData)
    }
    parseImageUtil.parseImage(arraybuffer, success, onError)
  }
}