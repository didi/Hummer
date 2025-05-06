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
/** Indicates the origin of some retrieved data. */

export enum DataSrc {

  /**
   * Indicates data was probably retrieved locally from the device, although it may have been
   * obtained through a content provider that may have obtained the data from a remote source.
   */

  LOCAL,

  /** Indicates data was retrieved from a remote source other than the device. */

  REMOTE,

  /** Indicates data was retrieved unmodified from the on device cache. */

  DATA_DISK_CACHE,

  /** Indicates data was retrieved from modified content in the on device cache. */

  RESOURCE_DISK_CACHE,

  /** Indicates data was retrieved from the in memory cache. */

  MEMORY_CACHE,
}
