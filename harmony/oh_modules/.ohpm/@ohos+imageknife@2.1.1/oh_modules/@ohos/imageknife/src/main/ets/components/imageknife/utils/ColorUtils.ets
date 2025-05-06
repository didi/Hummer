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
import resourceManager from '@ohos.resourceManager';
import common from '@ohos.app.ability.common';
import { ImageKnifeGlobal } from '../ImageKnifeGlobal';
import {DataCallBack} from "../interface/DataCallBack"

export namespace ColorUtils {

/**
   * 本地颜色值解析
   * ColorUtils.parseColor("color_name",callback)
   */
  export function parseColor(c: string, callback: DataCallBack<string>) {

      let reColor = 'sys.color.' + c;
    ((ImageKnifeGlobal.getInstance().getHapContext() as common.UIAbilityContext).resourceManager as resourceManager.ResourceManager).getString($r(reColor)
    .id, (err, color) => {
      if (!err) {
        let cos = JSON.stringify(color);
        callback.callback(cos)
      } else {
        callback.callback(err.message)
      }
    });


  }

  export function red(color: number): number {
    return (color >> 16) & 0xFF;
  }

  export function green(color: number): number {
    return (color >> 8) & 0xFF;
  }

  export function blue(color: number): number {
    return color & 0xFF;
  }

  export function alpha(color: number): number {
    return color >>> 24;
  }

  export function rgb(red: number, green: number, blue: number): number {
    return 0xff000000 | (red << 16) | (green << 8) | blue;
  }
}