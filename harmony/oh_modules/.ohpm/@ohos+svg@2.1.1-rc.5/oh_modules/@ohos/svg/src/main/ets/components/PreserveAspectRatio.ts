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

import { TextScanner } from './utils/TextScanner';


export enum Alignment {
  none = 'none',
  xMinYMin = 'xMinYMin',
  xMidYMin = 'xMidYMin',
  xMaxYMin = 'xMaxYMin',
  xMinYMid = 'xMinYMid',
  xMidYMid = 'xMidYMid',
  xMaxYMid = 'xMaxYMid',
  xMinYMax = 'xMinYMax',
  xMidYMax = 'xMidYMax',
  xMaxYMax = 'xMaxYMax'
}

export enum Scale {
  meet = 'meet',
  slice = 'slice'
}

export class PreserveAspectRatio {
  alignment: Alignment
  scale: any
  static aspectRatioKeywords = new Map<string, Alignment>();
  //
  constructor(alignment?: Alignment, scale?: any) {
    this.alignment = alignment;
    this.scale = scale;
  }

  private static init() {
    this.aspectRatioKeywords.set("none", Alignment.none);
    this.aspectRatioKeywords.set("xMinYMin", Alignment.xMinYMin);
    this.aspectRatioKeywords.set("xMidYMin", Alignment.xMidYMin);
    this.aspectRatioKeywords.set("xMaxYMin", Alignment.xMaxYMin);
    this.aspectRatioKeywords.set("xMinYMid", Alignment.xMinYMid);
    this.aspectRatioKeywords.set("xMidYMid", Alignment.xMidYMid);
    this.aspectRatioKeywords.set("xMaxYMid", Alignment.xMaxYMid);
    this.aspectRatioKeywords.set("xMinYMax", Alignment.xMinYMax);
    this.aspectRatioKeywords.set("xMidYMax", Alignment.xMidYMax);
    this.aspectRatioKeywords.set("xMaxYMax", Alignment.xMaxYMax);
  }

  static UNSCALED: PreserveAspectRatio = new PreserveAspectRatio(null, null);
  static STRETCH: PreserveAspectRatio = new PreserveAspectRatio(Alignment.none, null);
  static LETTERBOX: PreserveAspectRatio = new PreserveAspectRatio(Alignment.xMidYMid, Scale.meet);
  static START: PreserveAspectRatio = new PreserveAspectRatio(Alignment.xMinYMin, Scale.meet);
  static END: PreserveAspectRatio = new PreserveAspectRatio(Alignment.xMaxYMax, Scale.meet);
  static TOP: PreserveAspectRatio = new PreserveAspectRatio(Alignment.xMidYMin, Scale.meet);
  static BOTTOM: PreserveAspectRatio = new PreserveAspectRatio(Alignment.xMidYMax, Scale.meet);
  static FULLSCREEN: PreserveAspectRatio = new PreserveAspectRatio(Alignment.xMidYMid, Scale.slice);
  static FULLSCREEN_START: PreserveAspectRatio = new PreserveAspectRatio(Alignment.xMinYMin, Scale.slice);
  //
  static of(value: string): PreserveAspectRatio {
    return this.parsePreserveAspectRatio(value);
  }

  getAlignment(): Alignment {
    return this.alignment;
  }

  public getScale(): Scale {
    return this.scale;
  }

  static parsePreserveAspectRatio(val: string): PreserveAspectRatio {
    var scan: TextScanner = new TextScanner(val);
    scan.skipWhitespace();

    let word: string = scan.nextToken();
    if ("defer" == word) {
      scan.skipWhitespace();
      word = scan.nextToken();
    }

    PreserveAspectRatio.init()
    let align: Alignment = PreserveAspectRatio.aspectRatioKeywords.get(word);
    let scale: Scale = null;

    scan.skipWhitespace();

    if (!scan.empty()) {
      let meetOrSlice: string = scan.nextToken();
      switch (meetOrSlice) {
        case "meet":
          scale = Scale.meet;
          break;
        case "slice":
          scale = Scale.slice;
          break;
        default:
          throw new Error("Invalid preserveAspectRatio definition: " + val);
      }
    }
    return new PreserveAspectRatio(align, scale);
  }
}

