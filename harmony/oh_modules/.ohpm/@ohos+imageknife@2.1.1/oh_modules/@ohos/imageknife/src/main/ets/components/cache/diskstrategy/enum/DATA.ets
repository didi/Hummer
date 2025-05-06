/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import{DiskStrategy} from '../../diskstrategy/DiskStrategy'
import{DataSrc} from '../../diskstrategy/DataSrc'
import{EncodeStrategy} from '../../diskstrategy/EncodeStrategy'

export class DATA implements DiskStrategy {
  getName(): string{
    return 'DATA';
  }

  isDataCacheable(dataSource: DataSrc): boolean {
    return dataSource != DataSrc.DATA_DISK_CACHE && dataSource != DataSrc.MEMORY_CACHE;
  }

  isResourceCacheable(
    isFromAlternateCacheKey: boolean, dataSource: DataSrc, encodeStrategy: EncodeStrategy): boolean {
    return false;
  }

  decodeCachedResource(): boolean {
    return false;
  }

  decodeCachedData(): boolean{
    return true;
  }
}