/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
export class DiskCacheEntry {
    // 缓存的key
    key: string = ''

    // 缓存文件大小
    length: number = 0

    constructor(key: string, length?: number) {
        this.key = key
        this.length = length
    }

    setKey(key: string) {
        this.key = key
    }

    getKey(): string {
        return this.key
    }

    setLength(length: number) {
        this.length = length
    }

    getLength(): number {
        return this.length
    }

    toString(): string {
        return this.key + ' - ' + this.length
    }
}