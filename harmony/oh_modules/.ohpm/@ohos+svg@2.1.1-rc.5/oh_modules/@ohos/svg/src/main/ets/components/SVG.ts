/**
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
import common from '@ohos.app.ability.common';

import { Svg, SVGBase } from './utils/SVGBase'


export class SVG {
  static TAG: string = "SVG";
  private static VERSION: string = "1.5";
  base: SVGBase;

  constructor(base: SVGBase) {
    this.base = base;
  }

  public static getFromString(svg: string): SVG {
    return new SVG(SVGBase.getFromString(svg));
  }

  public static getFromResource(media: Resource, callback,context?:common.UIAbilityContext) {
    SVGBase.getFromResource(media, (svgBase: SVGBase) => {
      let svg: SVG = new SVG(svgBase)
      callback(svg)
    },context)
  }

  public static getFromRawfile(rawfileName: string, callback,context?:common.UIAbilityContext) {
    SVGBase.getFromRawfile(rawfileName, (svgBase: SVGBase) => {
      let svg: SVG = new SVG(svgBase)
      callback(svg)
    },context)
  }

  getRootElement(): Svg {
    return this.base.getRootElement();
  }
}
