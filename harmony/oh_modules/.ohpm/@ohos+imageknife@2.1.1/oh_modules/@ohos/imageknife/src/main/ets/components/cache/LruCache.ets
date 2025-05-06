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
import {CustomMap} from './CustomMap'

export class LruCache <K, V> {
  maxsize: number = 0
  size: number = 0;
  map: CustomMap<K, V> = new CustomMap<K, V>();

  constructor(maxsize: number) {
    this.trimToSize(-1)
    this.maxsize = maxsize
    this.size = 0;
  }

  // 添加缓存键值对
  put(key: K, value: V) {
    if (key == null || value == null) {
      throw new Error('key or value is invalid ');
    }
    let pre = this.map.get(key)
    if (pre == null) {
      this.size++
    }
    this.entryRemoved(key, pre, value)
    this.trimToSize(this.maxsize)
  }

  // 移除键为key的缓存
  remove(key: K): V | undefined{
    if (key == null) {
      throw new Error('key is null,checking the parameter');
    }
    let preValue = this.map.get(key)
    if (this.map.remove(key)) {
      this.size--
    }
    return preValue
  }

  // 获取键为key的value
  get(key: K): V|undefined {
    if (key == null) {
      throw new Error('key is null,checking the parameter');
    }
    let preValue = this.map.get(key)
    if (preValue != null) {
      this.entryRemoved(key, preValue, preValue)
    }
    return preValue
  }

  /*
   * 替换或删除对应key键的数据
   * evicted：是否删除
   * key：对应的键值key
   * preValue 对应key键的旧value值
   * value 对应key键的新value值
   */
  entryRemoved(key: K, preValue: V | undefined, value: V | undefined) {
    if (preValue != null) {
      this.map.remove(key)
    }
    if (value != null) {
      this.map.put(key, value)
    }
  }

  // 移除较少使用的缓存数据
  trimToSize(tempsize: number) {
    while (true) {
      if (tempsize < 0) {
        this.map.clear()
        this.size = 0
        break
      }
      if (this.size <= tempsize || this.map.isEmpty()) {
        break
      }
      let delkey = this.map.getFirstKey()
      this.map.remove(delkey)
      this.size--
    }
  }

  // 缓存数据数量
  sizeLength(): number{
    return this.size
  }

  // 缓存数据最大值
  maxSize(): number{
    return this.maxsize
  }

  // 设置缓存数据量最大值
  resize(maxsize: number) {
    if (maxsize < 0) {
      throw new Error('maxsize <0 & maxsize invalid');
    }
    this.maxsize = maxsize
    this.trimToSize(maxsize)
  }

  // 清除缓存
  evicAll() {
    this.trimToSize(-1)
  }

  print():string {
    let printResult = '';
    if (this.map.isEmpty()) {
      return printResult;
    }


    this.map.each( (value, key, index) => {
      printResult +='LruCache:key=' + key + 'value= ' + value;
    })
    return printResult;
  }

  foreachLruCache(fn:(value: V, key: K, map: Map<K, V>) => void){
    this.map.each(fn);
  }

}