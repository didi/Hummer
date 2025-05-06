/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http:// www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ImageKnife } from '../imageknife/ImageKnife';
import { ImageKnifeData } from '../imageknife/ImageKnifeData';
import { LogUtil } from '../imageknife/utils/LogUtil';
import { LruCache } from './LruCache';

export class MemoryLruCache extends LruCache<string, ImageKnifeData> {
  maxMemory: number = 0
  memorySize: number = 0

  constructor(maxsize: number, maxMemory: number) {
    super(maxsize);
    this.removeAll();
    this.maxMemory = maxMemory
    this.memorySize = 0;
  }

  // 添加缓存键值对
  put(key: string, value: ImageKnifeData) {
    if (key == null || value == null) {
      throw new Error('key or value is invalid ');
    }
    let pre = this.map.get(key)
    if (pre == null ) {
      this.size++
      this.addMemorySize(value)
    }
    this.entryRemoved(key, pre, value);
    this.trimToSize();
  }

  // 移除键为key的缓存
  remove(key: string): ImageKnifeData | undefined {
    if (key == null) {
      throw new Error('key is null,checking the parameter');
    }
    let preValue = this.map.get(key)
    if (this.map.remove(key)) {
      this.size--
      if (preValue != undefined) {
        this.removeMemorySize(preValue)
      }
    }
    return preValue
  }

  removeAll() {
    this.map.clear()
    this.size = 0
    this.memorySize = 0;
  }

  // 移除较少使用的缓存数据
  trimToSize() {
    LogUtil.info("MemoryLruCache maxSize：" + this.maxsize + "  maxMemory: " + this.maxMemory)
    if (this.maxMemory == 0 || this.maxsize == 0 ){
      return;
    }
    while (true) {
      if (this.size <= this.maxsize && this.memorySize <= this.maxMemory || this.map.isEmpty()) {
        break
      }
      let delkey = this.map.getFirstKey()
      let data: ImageKnifeData | undefined = this.map.get(delkey)
      this.size--
      if (data != undefined) {
        this.removeMemorySize(data)
        data.release()
      }
      this.map.remove(delkey)
    }
  }

  private removeMemorySize(value: ImageKnifeData): void {
    if (value.drawPixelMap != undefined) {
      LogUtil.info("MemoryLruCache removeMemorySize---- top drawPixelMap memorySize：" + this.memorySize)
      if (value.drawPixelMap.imagePixelMap != undefined) {
        this.memorySize -= value.drawPixelMap.imagePixelMap.getPixelBytesNumber();
      }
      LogUtil.info("MemoryLruCache removeMemorySize---- end drawPixelMap memorySize：" + this.memorySize)
    }
    if (value.drawGIFFrame != undefined) {
      LogUtil.info("MemoryLruCache removeMemorySize---- top drawGIFFrame memorySize：" + this.memorySize)
      if (value.drawGIFFrame != undefined) {
        this.memorySize -= value.drawGIFFrame.getGIFFramesBytesNumber();
      }
      LogUtil.info("MemoryLruCache removeMemorySize---- end drawGIFFrame memorySize：" + this.memorySize)
    }
    LogUtil.info("MemoryLruCache removeMemorySize---- end  mapSize：" + this.map.size())
  }

  private addMemorySize(value: ImageKnifeData): void {
    if (value.drawPixelMap != undefined) {
      LogUtil.info("MemoryLruCache addMemorySize---- top drawPixelMap memorySize：" + this.memorySize)
      if (value.drawPixelMap.imagePixelMap != undefined) {
        this.memorySize += value.drawPixelMap.imagePixelMap.getPixelBytesNumber();
      }
      LogUtil.info("MemoryLruCache addMemorySize---- end drawPixelMap memorySize：" + this.memorySize)
    }
    if (value.drawGIFFrame != undefined) {
      LogUtil.info("MemoryLruCache addMemorySize---- top drawGIFFrame memorySize：" + this.memorySize)
      if (value.drawGIFFrame != undefined) {
        this.memorySize += value.drawGIFFrame.getGIFFramesBytesNumber();
      }
      LogUtil.info("MemoryLruCache addMemorySize---- end drawGIFFrame memorySize：" + this.memorySize)
    }
    LogUtil.info("MemoryLruCache addMemorySize---- end  mapSize：" + this.map.size())
  }

}