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

import { MiniCanvasAttribute, CanvasImpl, ICanvas } from './mini_canvas'

@Component
export struct MiniCanvas {
  private miniCanvas: CanvasImpl;
  attribute: MiniCanvasAttribute;
  onDraw: (canvas: ICanvas) => void;

  build() {
    Canvas(this.miniCanvas.context)
      .width(this.attribute.width)
      .height(this.attribute.height)
      .backgroundColor(this.attribute.background)
      .id("really_mini_canvas")
      .onReady(() => {
        this.onDraw?.call(this, this.miniCanvas);
      })
      .onClick((event) => {
        this.attribute.clickListener?.call(this, event);
      })
      .onTouch((event) => {
        this.attribute.touchListener?.call(this, event);
      })
  }

  aboutToAppear() {

    this.attribute = MiniCanvasAttribute.checkAttribute(this.attribute);

    var setting = new RenderingContextSettings(this.attribute.antiAlias);
    var context = new CanvasRenderingContext2D(setting);
    this.miniCanvas = new CanvasImpl(context, this.attribute);
  }
}