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

import {OnRenameListener} from '../compress/listener/OnRenameListener'
import {OnCompressListener} from '../compress/listener/OnCompressListener'
import {CompressionPredicate} from '../compress/listener/CompressionPredicate'
import fileio from '@ohos.fileio';
import {CompressAdapter} from '../compress/provider/CompressAdapter'
import {DataStringPathProvider} from '../compress/provider/DataStringPathProvider'
import {RecourseProvider} from '../compress/provider/RecourseProvider'
import { Engine } from '../compress/Engine'
import { ImageKnife } from '../ImageKnife'
import { ImageKnifeGlobal } from '../ImageKnifeGlobal';
import common from '@ohos.app.ability.common';

export class CompressBuilder {
  private _mTargetDir: string = '';
  private _mLeastCompressSize: number= 100; // KB
  private _mRenameListener: OnRenameListener = {reName:()=>{return ''}};
  private _mCompressListener: OnCompressListener={
    start:()=> {},
    onSuccess:(p: PixelMap|null|undefined, path: string)=> {},
    onError:(s: string)=> {}
  };
  private _mCompressionPredicate: CompressionPredicate ={
  apply:(path: string)=> { return false }
}
  private _mStreamProviders: Array<CompressAdapter> = new Array<CompressAdapter>();
  private _mFocusAlpha: boolean = false;
  private _outFilePath: string = '';
  constructor() {
    this._mStreamProviders = new Array();
  }

  public setRenameListener(listener: OnRenameListener): CompressBuilder {
    this._mRenameListener = listener;
    return this;
  }

  public setCompressListener(listener: OnCompressListener): CompressBuilder {
    this._mCompressListener = listener;
    return this;
  }

  public filter(compressionPredicate: CompressionPredicate): CompressBuilder {
    this._mCompressionPredicate = compressionPredicate;
    return this;
  }

  public setTargetDir(targetDir: string): CompressBuilder {
    this._mTargetDir = targetDir;
    if (this._mTargetDir) {
      let timestamp = (new Date()).valueOf();
      this._outFilePath = this._mTargetDir + "/" + timestamp + (Math.random() * 100).toFixed(0) + ".jpg";
    }
    return this;
  }

  public load(list: Array<string | Resource>): CompressBuilder {
    for (let i = 0; i < list.length; i++) {
      let element = list[i];
      if (typeof element === "string") {
        this.loadString(element);
      } else {
        this.loadRecourse(element)
      }
    }
    return this;
  }

  /**
   * load string file path;
   */
  private loadString(path: string) {
    this._mStreamProviders.push(new DataStringPathProvider(path));
  }

  /**
   * load resource;
   */
  private loadRecourse(data: Resource) {
    this._mStreamProviders.push(new RecourseProvider(data));
  }

  public setFocusAlpha(focusAlpha: boolean): CompressBuilder {
    this._mFocusAlpha = focusAlpha;
    return this;
  }

  public ignoreBy(size: number): CompressBuilder {
    this._mLeastCompressSize = size;
    return this;
  }

  public launch() {
    if (!this._mTargetDir) {
      this.getImageCacheFile();
    } else {
      this.startCompress();
    }
  }

  public async get():Promise<string> {
    if (!this._mTargetDir) {
      let context= (ImageKnifeGlobal.getInstance().getHapContext() as common.UIAbilityContext);
      let path = context.filesDir;
      let timestamp = (new Date()).valueOf();
      this._outFilePath = path + "/compress/" + timestamp + (Math.random() * 100).toFixed(0) + ".jpg";
      let result = await this.startAsyncCompress();
      return result;
    } else {
      let result =await this.startAsyncCompress();
      return result;
    }
  }

  private async startAsyncCompress():Promise<string> {
    let compressPromise:Promise<string> = new Promise((resolve, reject) => {

      let compressListener: OnCompressListener = {
        start:()=>{
        },
        onSuccess:(p: PixelMap|undefined|null, path: string)=> {
          resolve(path);
        },
        onError:(s: string)=> {
        }
      }

      compressListener.start();

      if (this._mStreamProviders == null || this._mStreamProviders.length == 0) {
        compressListener.onError("this compress path is empty");
        return;
      }

      for (let i = 0; i < this._mStreamProviders.length; i++) {
        let element = this._mStreamProviders[i];
        let isOpenfilter = false;
        if (this._mCompressionPredicate) {
          isOpenfilter = this._mCompressionPredicate.apply(element.getRecoursePath());
        }


        if (!isOpenfilter) {
          new Engine(element, this._outFilePath, this._mFocusAlpha, this._mLeastCompressSize,
            compressListener, this._mCompressionPredicate).compress();
        } else {
          resolve(element.getRecoursePath());
        }
      }

    })
    let result = await compressPromise
    return (result as string)
  }


  /**
   * start compress
   */
  private startCompress() {
    if (this._mStreamProviders == null || this._mStreamProviders.length == 0) {
      if (this._mCompressListener) {
        this._mCompressListener.onError("this compress path is empty");
      }
      return;
    }
    if (this._mRenameListener) {
      let name = this._mRenameListener.reName();
      if (this._outFilePath && name) {
        let start = this._outFilePath.lastIndexOf("/") + 1
        let end = this._outFilePath.length;
        let replaceStr = this._outFilePath.substring(start, end);
        this._outFilePath = this._outFilePath.replace(replaceStr, name);
      }
    }
    if (this._mCompressListener) {
      this._mCompressListener.start();
    }

    for (let i = 0; i < this._mStreamProviders.length; i++) {
      let element = this._mStreamProviders[i];
      let isOpenfilter = false;
      if (this._mCompressionPredicate) {
        isOpenfilter = this._mCompressionPredicate.apply(element.getRecoursePath());
      }
      if (!isOpenfilter) {
        new Engine(element, this._outFilePath, this._mFocusAlpha, this._mLeastCompressSize,
          this._mCompressListener, this._mCompressionPredicate).compress();
      } else {
        if (this._mCompressListener) {
          this._mCompressListener.onSuccess(null, element.getRecoursePath());
        }
      }
    }
  }

  private getImageCacheFile() {
    let context = (ImageKnifeGlobal.getInstance().getHapContext() as common.UIAbilityContext)
    let timestamp = (new Date()).valueOf();
    this._outFilePath = context.filesDir + "/compress/" + timestamp + (Math.random() * 100).toFixed(0) + ".jpg";
    this.startCompress();
  }
}