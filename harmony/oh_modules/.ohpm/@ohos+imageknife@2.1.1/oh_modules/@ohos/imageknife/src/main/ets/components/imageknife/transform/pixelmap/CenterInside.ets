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

import {BaseTransform} from '../BaseTransform'
import {AsyncTransform} from '../AsyncTransform'
import {Constants} from '../../constants/Constants'
import {TransformUtils} from '../TransformUtils'
import {RequestOption}  from '../../../imageknife/RequestOption'
import { BusinessError } from '@ohos.base'
export class CenterInside implements BaseTransform<PixelMap> {
  getName() {
    return 'CenterInside:' + this;
  }

  transform(buf: ArrayBuffer, request: RequestOption, func?: AsyncTransform<PixelMap>) {
    if (!buf || buf.byteLength <= 0) {
      if (func != undefined) {
        func?.asyncTransform(Constants.PROJECT_TAG + ';CenterInside buf is empty', null);
      }
      return;
    }
    TransformUtils.centerInside(buf, request.size.width, request.size.height, func)
  }
}