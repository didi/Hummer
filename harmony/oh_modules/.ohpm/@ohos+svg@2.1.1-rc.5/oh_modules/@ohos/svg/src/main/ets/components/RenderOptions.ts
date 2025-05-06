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

import { RenderOptionsBase } from './utils/RenderOptionsBase';

import { CSS } from './CSS'
import { PreserveAspectRatio } from './PreserveAspectRatio'


export class RenderOptions extends RenderOptionsBase {
  public constructor(other?: RenderOptions) {
    super();
  }

  public static create(): RenderOptions {
    return new RenderOptions();
  }

  public getCss(css: string | CSS): RenderOptionsBase {
    return super.getCss(css)

  }

  public hasCss(): boolean {
    return super.hasCss();

  }

  public getPreserveAspectRatio(preserveAspectRatio: PreserveAspectRatio): RenderOptionsBase {
    return super.getPreserveAspectRatio(preserveAspectRatio)
  }

  public hasPreserveAspectRatio(): boolean {
    return super.hasPreserveAspectRatio();

  }

  public view(viewId: string): RenderOptionsBase {
    return super.view(viewId);

  }

  public hasView(): boolean {
    return super.hasView()

  }

  public getViewBox(minX: number, minY: number, width: number, height: number): RenderOptionsBase {
    return super.getViewBox(minY, minY, width, height);

  }

  public hasViewBox(): boolean {
    return super.hasViewBox();

  }

  public getViewPort(minX: number, minY: number, width: number, height: number): RenderOptions {
    return super.getViewPort(minX, minY, width, height)

  }

  public hasViewPort(): boolean {
    return super.hasViewPort();

  }

  public target(targetId: string): RenderOptions {
    return super.target(targetId)

  }

  public hasTarget(): boolean {
    return super.hasTarget();

  }
}
