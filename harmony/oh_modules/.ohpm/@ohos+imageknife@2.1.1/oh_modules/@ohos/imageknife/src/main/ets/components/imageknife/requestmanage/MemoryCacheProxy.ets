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

import  {ICache} from "../requestmanage/ICache"
import {LruCache} from "../../cache/LruCache"

export class MemoryCacheProxy <K, V> implements ICache<K, V> {
  private mLruCache: LruCache<K, V>;

  constructor(lruCache: LruCache<K, V>) {
    this.mLruCache = lruCache;
  }

  // 缓存类型
  getName() {
    return "Level1MemoryCache"
  }

  getValue(key: K): V|undefined{
    return this.mLruCache.get(key);
  }

  putValue(key: K, value: V) {
    this.mLruCache.put(key, value);
  }

  removeValue(key: K): V|undefined{
    return this.mLruCache.remove(key);
  }

  clear() {
    this.mLruCache.evicAll();
  }


  // 外界调用
  loadMemoryCache(key: K, isMemoryCacheable: boolean): V | null{
    // 是否开启内存缓存
    if (!isMemoryCacheable) {
      return null;
    }
    let cached = this.getValue(key)
    if (cached != null) {
      return cached;
    }
    return null;
  }
}