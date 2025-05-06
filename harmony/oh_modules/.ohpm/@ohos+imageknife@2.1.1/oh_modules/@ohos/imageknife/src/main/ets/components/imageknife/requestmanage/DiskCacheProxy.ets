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

import  { ICache } from "../requestmanage/ICache"
import { DiskLruCache } from "@ohos/disklrucache"

export class DiskCacheProxy implements ICache<string, ArrayBuffer> {
  private mDiskLruCache: DiskLruCache;

  constructor(diskLruCache: DiskLruCache) {
    this.mDiskLruCache = diskLruCache;
  }

  // 缓存类型
  getName(): string{
    return "Level2DiskCache";
  }

  getCachePath():string{
    let folderPath = this.mDiskLruCache.getPath();
    if (folderPath.endsWith('/')) {
      return folderPath;
    } else {
      return folderPath + '/'
    }
  }

  getValue(key: string): ArrayBuffer{
    return this.mDiskLruCache.get(key);
  }

  putValue(key: string, value: ArrayBuffer) {
    this.mDiskLruCache.set(key, value)
  }

  removeValue(key: string): ArrayBuffer{
    // Disk暂无实现
    return new ArrayBuffer(0);
  }

  clear() {
    this.mDiskLruCache.cleanCacheData();
  }
}