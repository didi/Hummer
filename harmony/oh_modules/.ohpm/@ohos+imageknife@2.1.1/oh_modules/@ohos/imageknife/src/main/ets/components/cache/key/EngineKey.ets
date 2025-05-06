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
import { Key } from "../key/Key"
import { RequestOption } from '../../imageknife/RequestOption'
import { BaseTransform } from '../../imageknife/transform/BaseTransform'
import { ObjectKey } from '../../imageknife/ObjectKey';

export class EngineKey implements Key {
  // 内存缓存 缓存生成规则:是否会影响图片内容，不影响则通用(strategy onlyRetrieveFromCache isCacheable)为通用项目
  // 生成规则 加载数据原 各类参数(排除监听 排除 占位图 失败占位图)
  public static generateMemoryCacheKey(loadSrc: string, size: string, transformed: string, dontAnimate: boolean,signature?: ObjectKey, redefine?: (loadSrc: string) => string, otherInfo?: string): string {

    if (redefine) {
      loadSrc = redefine(loadSrc);
    }

    let key = "loadSrc=" + loadSrc + ";" +
      "size=" + size + ";" +
      "transformations=" + transformed + ";" +
      "dontAnimateFlag=" + dontAnimate + ";"
    if (signature) {
      key += "signature=" + signature.getKey() + ";"
    }
    if (otherInfo) {
      key += otherInfo;
    }
    return key;
  }

  // 磁盘缓存 缓存生成规则:是否会影响图片内容，不影响则通用(strategy onlyRetrieveFromCache isCacheable)为通用项目
  // 生成规则 加载数据原  各类参数(排除监听 排除 占位图 失败占位图)
  public static generateTransformedDiskCacheKey(loadSrc: string, size: string, transformed: string, dontAnimate: boolean, signature?: ObjectKey, redefine?: (loadSrc: string) => string, otherInfo?: string): string {
    if (redefine) {
      loadSrc = redefine(loadSrc);
    }
    let key = "loadSrc=" + loadSrc + ";" +
      "size=" + size + ";" +
      "transformations=" + transformed + ";" +
      "dontAnimateFlag=" + dontAnimate + ";"
    if (signature) {
      key += "signature=" + signature.getKey() + ";"
    }
    if (otherInfo) {
      key += otherInfo;
    }
    return key;
  }

  // 磁盘缓存
  // 生成网络加载数据 原始数据存于磁盘的key
  public static generateOriginalDiskCacheKey(loadSrc: string,signature?: ObjectKey, redefine?: (loadSrc: string) => string, otherInfo?: string): string {
    if (redefine) {
      loadSrc = redefine(loadSrc);
    }
    let key = "loadSrc=" + loadSrc + ";"
    if (signature) {
      key += "signature=" + signature.getKey() + ";"
    }
    if (otherInfo) {
      key += otherInfo;
    }
    return key;
  }

  updateDiskCacheKey(info: Object) {

  }
}
