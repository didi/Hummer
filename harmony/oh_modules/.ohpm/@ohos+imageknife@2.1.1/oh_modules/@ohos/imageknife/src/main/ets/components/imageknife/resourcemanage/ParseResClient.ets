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

import  {IResourceFetch} from '../resourcemanage/IResourceFetch'
import {ResourceTypeEts} from '../../imageknife/constants/ResourceTypeEts'
import resourceManager from '@ohos.resourceManager';
import { ImageKnifeGlobal } from '../ImageKnifeGlobal';
import { BusinessError } from '@ohos.base'
import common from '@ohos.app.ability.common';
export class ParseResClient implements IResourceFetch<ArrayBuffer> {
  loadResource(context:common.UIAbilityContext,res: Resource, onCompleteFunction:(value:ArrayBuffer)=>void | PromiseLike<ArrayBuffer>, onErrorFunction:(reason?:BusinessError|string)=>void) {
    let resId = res.id;
    let resType = res.type;
    if (resType == ResourceTypeEts.MEDIA) {
      (context.resourceManager as resourceManager.ResourceManager)
        .getMediaContent(resId)
        .then(data => {
          let arrayBuffer = this.typedArrayToBuffer(data);
          onCompleteFunction(arrayBuffer)
        })
        .catch( (err:BusinessError) => {
          onErrorFunction(err)
        })
    }
    else if (resType == ResourceTypeEts.RAWFILE) {
      onErrorFunction('ParseResClient 本地资源是rawfile暂时无法解析出错')
    } else {
      onErrorFunction('ParseResClient 本地资源不是media也不是rawfile无法解析出错')
    }
  }

  typedArrayToBuffer(array: Uint8Array): ArrayBuffer {
    return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
  }
}