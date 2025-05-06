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

import { Ruleset } from './CSSParser'
import { CSS } from '../CSS';
import { Box } from './SVGBase';
import { PreserveAspectRatio } from '../PreserveAspectRatio'

export class RenderOptionsBase {
  css: string = null;
  cssRuleset: Ruleset = null;
  preserveAspectRatio: PreserveAspectRatio = null;
  targetId: string = null;
  viewBox: Box = null;
  viewId: string = null;
  viewPort: Box = null;

  public static create(): RenderOptionsBase {
    return new RenderOptionsBase();
  }

  constructor(other?: RenderOptionsBase) {
    if (other == null)return;
    this.css = other.css;
    this.cssRuleset = other.cssRuleset;

    this.preserveAspectRatio = other.preserveAspectRatio;
    this.viewBox = other.viewBox;
    this.viewId = other.viewId;
    this.viewPort = other.viewPort;
    this.targetId = other.targetId;
  }

  public getCss(css): RenderOptionsBase {
    if (css instanceof CSS) {
      this.cssRuleset = (css as CSS).cssRuleset;
      this.css = null;
      return this;
    } else {
      this.css = css;
      this.cssRuleset = null;
      return this;
    }

  }

  public hasCss(): boolean {
    return this.css != null && this.css.trim().length > 0 || this.cssRuleset != null;
  }

  public getPreserveAspectRatio(preserveAspectRatio: PreserveAspectRatio): RenderOptionsBase {
    this.preserveAspectRatio = preserveAspectRatio;
    return this;
  }

  public hasPreserveAspectRatio(): boolean {
    return this.preserveAspectRatio != null;
  }

  public view(viewId: string): RenderOptionsBase {
    this.viewId = viewId;
    return this;
  }

  public hasView(): boolean {
    return this.viewId != null;
  }

  public getViewBox(minX: number, minY: number, width: number, height: number): RenderOptionsBase {
    this.viewBox = new Box(minX, minY, width, height);
    return this;
  }

  public hasViewBox(): boolean {
    return this.viewBox != null;
  }

  public getViewPort(minX: number, minY: number, width: number, height: number): RenderOptionsBase {
    this.viewPort = new Box(minX, minY, width, height);
    return this;
  }

  public hasViewPort(): boolean {
    return this.viewPort != null;
  }

  public target(targetId: string): RenderOptionsBase {
    this.targetId = targetId;
    return this;
  }

  public hasTarget(): boolean {
    return this.targetId != null;
  }
}
