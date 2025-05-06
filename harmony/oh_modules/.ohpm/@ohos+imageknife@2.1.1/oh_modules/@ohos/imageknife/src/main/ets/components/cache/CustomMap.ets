/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http:// www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export class CustomMap <K, V> {
  map: Map<K, V> = new Map<K, V>()

  // 获取键对应的值
  get(key: K): V | undefined{
    if (key == null) {
      throw new Error('key is null,checking the parameter');
    }
    return this.map.get(key)
  }

  /**
   * 是否含有key的缓存
   */
  hasKey(key: K) {
    if (key == null) {
      throw new Error('key is null,checking the parameter');
    }
    return this.map.has(key)
  }

  //  添加键值对
  put(key: K, value: V): V | undefined{
    if (key == null || value == null) {
      throw new Error('key or value is invalid,checking the parameter');
    }
    let pre = this.map.get(key)
    if (this.hasKey(key)) {
      this.map.delete(key)
    }
    this.map.set(key, value);
    return pre
  }

  // 去除键值，(去除键数据中的键名及对应的值)
  remove(key: K): boolean {
    if (key == null) {
      throw new Error('key is null,checking the parameter');
    }
    return this.map.delete(key)
  }

  /**
   * 获取最先存储的数据的key
   */
  getFirstKey(): K{ //  keys()可以遍历后需要优化put()方法，暂时仅获取index=0的key
    return this.map.keys().next().value
  }

  // 判断键值元素是否为空
  isEmpty(): boolean{
    return this.map.size == 0;
  }
  // 获取键值元素大小
  size(): number{
    return this.map.size;
  }
  // 遍历Map,执行处理函数. 回调函数 function(key,value,index){..}
  each(fn: (value: V, key: K, map: Map<K, V>) => void) {
    this.map.forEach(fn)
  }
  // 清除键值对
  clear() {
    this.map.clear()
  }
  // 遍历key
  keys(): IterableIterator<K>{
    return this.map.keys()
  }
}