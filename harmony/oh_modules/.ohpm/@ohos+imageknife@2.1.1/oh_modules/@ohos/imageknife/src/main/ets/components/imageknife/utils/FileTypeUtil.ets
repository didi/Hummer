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
import { LogUtil } from '../../imageknife/utils/LogUtil'


export class FileTypeUtil {
  private fileSignatureMap: Record<string, Array<Uint8Array>> = {
    // 添加文件类型和对应的文件头部特征
    'jpg': [new Uint8Array([0xFF, 0xD8])],
    'png': [new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])],
    'gif': [new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61])],
    'bmp': [new Uint8Array([0x42, 0x4D])],
    'svg': [new Uint8Array([0x3C, 0x3F, 0x78, 0x6D, 0x6C])],
    'webp': [new Uint8Array([0x52, 0x49, 0x46, 0x46])],
    'tiff': [new Uint8Array([0x49, 0x20, 0x49]), new Uint8Array([0x49, 0x49, 0x2A, 0x00]), new Uint8Array([0x4D, 0x4D, 0x00, 0x2A]), new Uint8Array([0x4D, 0x4D, 0x00, 0x2B])],
    // 添加更多的文件类型和特征
  };


  constructor() {
  }

  isImage(arraybuffer: ArrayBuffer) {
    let value = this.getFileType(arraybuffer);
    if (
      value == SupportFormat.jpg ||
        value == SupportFormat.png ||
        value == SupportFormat.tiff ||
        value == SupportFormat.webp ||
        value == SupportFormat.bmp ||
        value == SupportFormat.gif ||
        value == SupportFormat.svg
    ) {
      return true;
    }
    return false;
  }

  getFileType(file: ArrayBuffer): string | null {
    const fileData = new Uint8Array(file);
    let hasMatched = false;
    let matchedFileType = ''
    Object.keys(this.fileSignatureMap).map((fileType)=>{
      if(!hasMatched) {
        const bufferList = this.fileSignatureMap[fileType];
        for (let i = 0; i < bufferList.length; i++) {
          let signature = bufferList[i];
          if (this.matchesSignature(fileData, signature)) {
            hasMatched = true;
            matchedFileType = fileType;
            break
          }
        }
      }else{
        // 由于map函数会输出所有的keys, 所以匹配之后不再需要执行任何逻辑
      }
    })
    if(hasMatched){
      return matchedFileType;
    }
    return null; // 若无法识别文件类型，返回null
  }


  matchesSignature(fileData: Uint8Array, signature: Uint8Array): boolean {
    if (fileData.length < signature.length) {
      return false; // 文件长度不足，无法匹配魔数
    }

    for (let i = 0; i < signature.length; i++) {
      if (fileData[i] !== signature[i]) {
        return false; // 魔数不匹配
      }
    }
    return true; // 文件头部魔数匹配
  }
}


export enum PhotoFormat {
  jpg = 'jpg,0,FFD8',
  png = 'png,0,89504E470D0A1A0A',
  bmp = 'bmp,0,424D',
  gif = 'gif,0,474946383961',
  svg = 'svg,0,3C3F786D6C',
  webp = 'webp,0,52494646',
  tiff = 'tiff,0,492049|49492A00|4D4D002A|4D4D002B'
}

export enum SupportFormat {
  jpg = 'jpg',
  png = 'png',
  webp = 'webp',
  bmp = 'bmp',
  gif = 'gif',
  svg = 'svg',
  tiff = 'tiff'
}
