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

import { CanvasImpl, MiniCanvasAttribute } from './utils/mini_canvas';
import { SVG } from './SVG'
import { RenderOptions } from './RenderOptions'
import { SVGRenderer } from './utils/SVGRenderer'
import display from '@ohos.display';
import { SVGBase } from './utils/SVGBase'
import common from '@ohos.app.ability.common';

@Component
struct SVGImageView {
  @State model: SVGImageView.SVGImageViewModel = new SVGImageView.SVGImageViewModel();
  settings: RenderingContextSettings = new RenderingContextSettings(true);
  context2D: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings);

  build() {
    Canvas(this.context2D)
      .width("100%")
      .height("100%")
      .onReady(() => {
        this.model.setContext2D(this.context2D);
        this.model.viewWidth = this.context2D.width;
        this.model.viewHeight = this.context2D.height;
        this.model.doRender(this.model.context, true);
      })
  }
}

namespace SVGImageView {

  export class SVGImageViewModel {
    private svg: SVG | null = null
    private renderOptions: RenderOptions = new RenderOptions()
    public context2D: CanvasRenderingContext2D | null = null;
    canvas: CanvasImpl | null = null;
    render?: SVGRenderer = undefined;
    viewWidth: number = display.getDefaultDisplaySync().width;
    viewHeight: number = display.getDefaultDisplaySync().height;
    context: common.UIAbilityContext | undefined = undefined;
    scaleX: number | undefined = undefined;
    scaleY: number | undefined = undefined;
    needScale: boolean = true;

    constructor() {
      this.context2D = new CanvasRenderingContext2D();
      this.canvas = new CanvasImpl(this.context2D, MiniCanvasAttribute.checkAttribute(undefined));
    }

    public setContext2D(context2D: CanvasRenderingContext2D) {
      this.context2D = context2D;
      this.canvas = new CanvasImpl(this.context2D, MiniCanvasAttribute.checkAttribute(undefined))
    }

    public setSVG(svg: SVG, css?: string, context?: common.UIAbilityContext) {
      if (context) {
        this.context = context;
      }
      if (svg == null) {
        throw new Error("Null value passed to setSVG()");
      }
      this.svg = svg;
      if (css != undefined) {
        this.renderOptions.css = css;
      }
      this.doRender(context);
    }

    public setCSS(css: string, context?: common.UIAbilityContext) {
      this.renderOptions.css = css;
      if (context) {
        this.context = context;
      }
      this.doRender(context);
    }

    public setImageResource(resource: Resource, context?: common.UIAbilityContext) {
      if (context) {
        this.context = context;
      }
      SVG.getFromResource(resource, (svg: SVG) => {
        this.svg = svg
        this.doRender(context)
      }, context)
    }

    public setImageRawfile(filename: string, context?: common.UIAbilityContext) {
      if (context) {
        this.context = context;
      }
      SVG.getFromRawfile(filename, (svg: SVG) => {
        this.svg = svg
        this.doRender(context)
      }, context)
    }

    public setFromString(url: string, context?: common.UIAbilityContext) {
      if (context) {
        this.context = context;
      }
      this.svg = SVG.getFromString(url)
      this.doRender(context)
    }

    public doRender(context?: common.UIAbilityContext, areaChanged?: boolean) {
      if (context) {
        this.context = context;
      }
      if (this.svg == null)
        return;
      if (this.context2D && (this.needScale || areaChanged)) {
        let viewBoxWidth = px2vp(this.svg.getRootElement().viewBox.width);
        let viewBoxHeight = px2vp(this.svg.getRootElement().viewBox.height);
        let xScale = this.viewWidth / viewBoxWidth;
        let yScale = this.viewHeight / viewBoxHeight;
        this.scaleX = Math.min(xScale, yScale);
        this.scaleY = Math.min(xScale, yScale);
        this.context2D.scale(this.scaleX, this.scaleY);
        this.needScale = false;
      }
      if (this.canvas) {
        this.render = new SVGRenderer(this.canvas, this.svg.base.renderDPI, this.svg.base.externalFileResolver)
        this.render.renderDocument(this.svg.base, this.renderOptions, context)
      }
    }

    public async getSVGPixelMap(data: Uint8Array, size?: Size, context?: common.UIAbilityContext): Promise<PixelMap> {
      if (context) {
        this.context = context;
      }
      this.svg = SVG.getFromString(SVGBase.unit8ArrayToString(data));
      let setTings: RenderingContextSettings = new RenderingContextSettings(true)
      let svgRootElement = this.svg.getRootElement();
      // 根据屏幕分辨率适配
      let targetCompWidth: number = this.viewWidth * px2vp(1);
      let targetCompHeight: number = this.viewHeight * px2vp(1);
      let offContext: OffscreenCanvasRenderingContext2D = new OffscreenCanvasRenderingContext2D(targetCompWidth, targetCompHeight, setTings)
      let minScale = 1;
      let scaleW = targetCompWidth / (svgRootElement.viewBox.width * 1.0);
      let scaleH = targetCompHeight / (svgRootElement.viewBox.height * 1.0);
      minScale = Math.min(scaleW, scaleH); // 选择较小的缩放比例以确保完全适应目标尺寸
      offContext.setTransform(minScale, 0, 0, minScale, 0, 0);
      if (this.canvas) {
        this.canvas.setOffScreenCanvas(offContext)
        this.render = new SVGRenderer(this.canvas, this.svg.base.renderDPI, this.svg.base.externalFileResolver)
        await this.render.renderDocument(this.svg.base, this.renderOptions, context)
      }

      let minShowWidth = svgRootElement.viewBox.width * px2vp(1) * minScale;
      let minShowHeight = svgRootElement.viewBox.height * px2vp(1) * minScale;
      let pix = offContext.getPixelMap(0, 0, minShowWidth, minShowHeight)
      offContext.clearRect(0, 0, minShowWidth, minShowHeight)
      return pix;
    }
  }

  export class Size {
    width: number = 0;
    height: number = 0;
  }
}


export default SVGImageView;