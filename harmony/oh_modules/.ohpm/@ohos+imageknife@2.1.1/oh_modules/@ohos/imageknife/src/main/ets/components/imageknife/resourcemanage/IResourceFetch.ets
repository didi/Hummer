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

import { BusinessError } from '@ohos.base'
import common from '@ohos.app.ability.common';

// 本地资源解析抽象接口
export interface IResourceFetch<T> {
  loadResource:(context:common.UIAbilityContext ,res: Resource, onCompleteFunction:(value:T)=>void | PromiseLike<T>,
                onErrorFunction:(reason?:BusinessError|string)=>void)=>void;
}