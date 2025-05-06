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

import { RenderOptions } from '../RenderOptions';
import {
  Box,
  Circle2,
  ClipPath,
  Colour,
  CurrentColor,
  Ellipse2,
  GradientElement,
  GraphicsElement,
  Group,
  Image2,
  Length,
  Line2,
  Marker,
  Mask,
  NotDirectlyRendered,
  PaintReference,
  Path2,
  PathDefinition,
  PathInterface,
  Pattern,
  Polygon2,
  PolyLine,
  Rect2,
  SolidColor,
  Stop,
  Svg,
  SVGBase,
  SvgConditional,
  SvgContainer,
  SvgElement,
  SvgElementBase,
  SvgLinearGradient,
  SvgObject,
  SvgPaint,
  SvgRadialGradient,
  Switch,
  Symbol,
  Text2,
  TextContainer,
  TextPath,
  TextSequence,
  TRef,
  TSpan,
  Unit,
  Use,
  View
} from './SVGBase'
import Stack from '@ohos.util.Stack';
import { Isolation, LineCap, LineJoin, Style, TextAnchor, TextDirection, VectorEffect } from './Style';
import { CanvasImpl, Paint } from './mini_canvas'
import { CSSParser, RuleMatchContext, Source } from './CSSParser'
import { SVGExternalFileResolver } from '../SVGExternalFileResolver'
import MyRect from './Rect'
import Matrix2D2 from './Matrix'
import { Alignment, PreserveAspectRatio, Scale } from '../PreserveAspectRatio'
import { RenderOptionsBase } from './RenderOptionsBase'
import image from '@ohos.multimedia.image';
import util from '@ohos.util';
import configuration from '@system.configuration';
import { GlobalContext } from '../GlobalContext';

import common from '@ohos.app.ability.common';

export class SVGRenderer {
  private static TAG: string = "SVGAndroidRenderer";
  private static PATTERN_TABS_OR_LINE_BREAKS: RegExp = new RegExp("[\\n\\t]");
  private static PATTERN_TABS: RegExp = new RegExp("\\t");
  private static PATTERN_LINE_BREAKS: RegExp = new RegExp("\\n");
  private static PATTERN_START_SPACES: RegExp = new RegExp("^\\s+");
  private static PATTERN_END_SPACES: RegExp = new RegExp("\\s+$");
  private static PATTERN_DOUBLE_SPACES: RegExp = new RegExp("\\s{2,}");
  private canvas: CanvasImpl;
  private dpi: number;
  private document: SVGBase;
  private state: RendererState;
  private stateStack: Stack<RendererState>;
  private parentStack: Stack<SvgContainer>;
  private matrixStack: Stack<Matrix2D2>;
  private static BEZIER_ARC_FACTOR = 0.5522847498;
  public static LUMINANCE_TO_ALPHA_RED = 0.2127;
  public static LUMINANCE_TO_ALPHA_GREEN = 0.7151;
  public static LUMINANCE_TO_ALPHA_BLUE = 0.0722;
  private static DEFAULT_FONT_FAMILY = "serif";
  private static supportedFeatures: Array<String> = null;
  private ruleMatchContext: RuleMatchContext = null;
  private externalFileResolver: SVGExternalFileResolver;
  private combinedPath: Path2D = null;

  private resetState() {
    this.state = new RendererState();
    this.stateStack = new Stack();

    this.updateStyle(this.state, Style.getDefaultStyle());

    this.state.viewPort = null;

    this.state.spacePreserve = false;

    this.stateStack.push(new RendererState(this.state));

    this.matrixStack = new Stack();
    this.parentStack = new Stack();
  }

  constructor(canvas: CanvasImpl, defaultDPI: number, externalFileResolver: SVGExternalFileResolver) {
    this.canvas = canvas;
    this.dpi = defaultDPI;
    this.externalFileResolver = externalFileResolver;
  }

  getDPI(): number {
    return this.dpi;
  }

  getCurrentFontSize() {
    return this.state.fillPaint.getFontSize();
  }

  getCurrentFontXHeight() {
    return this.state.fillPaint.getFontSize() / 2;
  }

  private isSpecified(style: Style, flag: number): boolean {
    return (style.specifiedFlags & flag) != 0;
  }

  private updateStyle(state: RendererState, style: Style) {

    if (this.isSpecified(style, Style.SPECIFIED_COLOR)) {
      state.style.color = style.color;
    }

    if (this.isSpecified(style, Style.SPECIFIED_OPACITY)) {
      state.style.opacity = style.opacity;
    }

    if (this.isSpecified(style, Style.SPECIFIED_FILL)) {
      state.style.fill = style.fill;
      state.hasFill = (style.fill != null && style.fill != Colour.TRANSPARENT);
    }

    if (this.isSpecified(style, Style.SPECIFIED_FILL_OPACITY)) {
      state.style.fillOpacity = style.fillOpacity;
    } else {
      state.style.fillOpacity = 1;
    }


    if (this.isSpecified(style, Style.SPECIFIED_FILL | Style.SPECIFIED_FILL_OPACITY | Style.SPECIFIED_COLOR | Style.SPECIFIED_OPACITY)) {
      this.setPaintColour(state, true, state.style.fill);
    }

    if (this.isSpecified(style, Style.SPECIFIED_FILL_RULE)) {
      state.style.fillRule = style.fillRule;
    }


    if (this.isSpecified(style, Style.SPECIFIED_STROKE)) {
      state.style.stroke = style.stroke;
      state.hasStroke = (style.stroke != null && style.stroke != Colour.TRANSPARENT);
    }

    if (this.isSpecified(style, Style.SPECIFIED_STROKE_OPACITY)) {
      state.style.strokeOpacity = style.strokeOpacity;
    }

    if (this.isSpecified(style, Style.SPECIFIED_STROKE | Style.SPECIFIED_STROKE_OPACITY | Style.SPECIFIED_COLOR | Style.SPECIFIED_OPACITY)) {
      this.setPaintColour(state, false, state.style.stroke);
    }

    if (this.isSpecified(style, Style.SPECIFIED_VECTOR_EFFECT)) {
      state.style.vectorEffect = style.vectorEffect;
    }

    if (this.isSpecified(style, Style.SPECIFIED_STROKE_WIDTH)) {
      state.style.strokeWidth = style.strokeWidth;
      state.strokePaint.setStrokeWidth(state.style.strokeWidth.floatValue(this));
    }

    if (this.isSpecified(style, Style.SPECIFIED_STROKE_LINECAP)) {
      state.style.strokeLineCap = style.strokeLineCap;
      switch (style.strokeLineCap) {
        case LineCap.Butt:
          state.strokePaint.setLineCap(LineCapStyle.Butt);
          break;
        case LineCap.Round:
          state.strokePaint.setLineCap(LineCapStyle.Round);
          break;
        case LineCap.Square:
          state.strokePaint.setLineCap(LineCapStyle.Square);
          break;
        default:
          break;
      }
    }

    if (this.isSpecified(style, Style.SPECIFIED_STROKE_LINEJOIN)) {
      state.style.strokeLineJoin = style.strokeLineJoin;
      switch (style.strokeLineJoin) {
        case LineJoin.Miter:
          state.strokePaint.setLineJoin(LineJoinStyle.Miter);
          break;
        case LineJoin.Round:
          state.strokePaint.setLineJoin(LineJoinStyle.Round);
          break;
        case LineJoin.Bevel:
          state.strokePaint.setLineJoin(LineJoinStyle.Bevel);
          break;
        default:
          break;
      }
    }

    if (this.isSpecified(style, Style.SPECIFIED_STROKE_MITERLIMIT)) {

      state.style.strokeMiterLimit = style.strokeMiterLimit;
      state.strokePaint.setStrokeMiterLimit(style.strokeMiterLimit);
    }

    if (this.isSpecified(style, Style.SPECIFIED_STROKE_DASHARRAY)) {
      state.style.strokeDashArray = style.strokeDashArray;
    }

    if (this.isSpecified(style, Style.SPECIFIED_STROKE_DASHOFFSET)) {
      state.style.strokeDashOffset = style.strokeDashOffset;
    }

    if (this.isSpecified(style, Style.SPECIFIED_STROKE_DASHARRAY | Style.SPECIFIED_STROKE_DASHOFFSET)) {

      if (state.style.strokeDashArray == null) {
        state.strokePaint.setStrokeDashArray(null);
      }
      else {
        let intervalSum: number = 0;
        let n: number = state.style.strokeDashArray.length;


        let arrayLen: number = (n % 2 == 0) ? n : n * 2;
        let intervals: number[] = new Array<number>(arrayLen);
        for (let i = 0; i < arrayLen; i++) {
          intervals[i] = state.style.strokeDashArray[i % n].floatValue(this);
          intervalSum += intervals[i];
        }
        if (intervalSum == 0) {

        } else {
          let offset = this.state.style.strokeDashOffset.floatValue(this);
          if (offset < 0) {


            offset = intervalSum + (offset % intervalSum);
          }
          state.strokePaint.setStrokeDashArray(intervals);
          state.strokePaint.setStrokeDashOffset(offset);
        }
      }
    }

    if (this.isSpecified(style, Style.SPECIFIED_FONT_SIZE)) {
      let currentFontSize: number = this.getCurrentFontSize();
      state.style.fontSize = style.fontSize;
      state.fillPaint.setFontSize(style.fontSize.floatValue(this, currentFontSize));
      state.strokePaint.setFontSize(style.fontSize.floatValue(this, currentFontSize));
    }

    if (this.isSpecified(style, Style.SPECIFIED_FONT_FAMILY)) {
      state.style.fontFamily = style.fontFamily;
    }

    if (this.isSpecified(style, Style.SPECIFIED_FONT_WEIGHT)) {


      if (style.fontWeight == Style.FONT_WEIGHT_LIGHTER) {
        let fw = this.state.style.fontWeight;
        if (fw >= 100 && fw < 550)
        state.style.fontWeight = 100;
        else if (fw >= 550 && fw < 750)
        state.style.fontWeight = 400;
        else if (fw >= 750)
        state.style.fontWeight = 700;
      }
      else if (style.fontWeight == Style.FONT_WEIGHT_BOLDER) {
        let fw = this.state.style.fontWeight;
        if (fw < 350)
        state.style.fontWeight = 400;
        else if (fw >= 350 && fw < 550)
        state.style.fontWeight = 700;
        else if (fw >= 550 && fw < 900)
        state.style.fontWeight = 900;
      }
      else
      state.style.fontWeight = style.fontWeight;
    }

    if (this.isSpecified(style, Style.SPECIFIED_FONT_STYLE)) {
      state.style.fontStyle = style.fontStyle;
    }

    if (this.isSpecified(style, Style.SPECIFIED_FONT_STRETCH)) {

      state.style.fontStretch = style.fontStretch;
    }

    if (this.isSpecified(style, Style.SPECIFIED_DIRECTION)) {
      state.style.direction = style.direction;
    }

    if (this.isSpecified(style, Style.SPECIFIED_TEXT_ANCHOR)) {
      state.style.textAnchor = style.textAnchor;
    }

    if (this.isSpecified(style, Style.SPECIFIED_OVERFLOW)) {
      state.style.overflow = style.overflow;
    }

    if (this.isSpecified(style, Style.SPECIFIED_MARKER_START)) {
      state.style.markerStart = style.markerStart;
    }

    if (this.isSpecified(style, Style.SPECIFIED_MARKER_MID)) {
      state.style.markerMid = style.markerMid;
    }

    if (this.isSpecified(style, Style.SPECIFIED_MARKER_END)) {
      state.style.markerEnd = style.markerEnd;
    }

    if (this.isSpecified(style, Style.SPECIFIED_DISPLAY)) {
      state.style.display = style.display;
    }

    if (this.isSpecified(style, Style.SPECIFIED_VISIBILITY)) {
      state.style.visibility = style.visibility;
    }

    if (this.isSpecified(style, Style.SPECIFIED_CLIP)) {
      state.style.clip = style.clip;
    }

    if (this.isSpecified(style, Style.SPECIFIED_CLIP_PATH)) {
      state.style.clipPath = style.clipPath;
    }

    if (this.isSpecified(style, Style.SPECIFIED_CLIP_RULE)) {
      state.style.clipRule = style.clipRule;
    }

    if (this.isSpecified(style, Style.SPECIFIED_MASK)) {
      state.style.mask = style.mask;
    }

    if (this.isSpecified(style, Style.SPECIFIED_STOP_COLOR)) {
      state.style.stopColor = style.stopColor;
    }

    if (this.isSpecified(style, Style.SPECIFIED_STOP_OPACITY)) {
      state.style.stopOpacity = style.stopOpacity;
    }

    if (this.isSpecified(style, Style.SPECIFIED_VIEWPORT_FILL)) {
      state.style.viewportFill = style.viewportFill;
    }

    if (this.isSpecified(style, Style.SPECIFIED_VIEWPORT_FILL_OPACITY)) {
      state.style.viewportFillOpacity = style.viewportFillOpacity;
    }

    if (this.isSpecified(style, Style.SPECIFIED_IMAGE_RENDERING)) {
      state.style.imageRendering = style.imageRendering;
    }

    if (this.isSpecified(style, Style.SPECIFIED_ISOLATION)) {
      state.style.isolation = style.isolation;
    }

    if (this.isSpecified(style, Style.SPECIFIED_MIX_BLEND_MODE)) {
      state.style.mixBlendMode = style.mixBlendMode;
    }

    if (this.isSpecified(style, Style.SPECIFIED_WRITING_MODE)) {
      state.style.writingMode = style.writingMode;
    }

    if (this.isSpecified(style, Style.SPECIFIED_GLYPH_ORIENTATION_VERTICAL)) {
      state.style.glyphOrientationVertical = style.glyphOrientationVertical;
    }

    if (this.isSpecified(style, Style.SPECIFIED_TEXT_ORIENTATION)) {
      state.style.textOrientation = style.textOrientation;
    }

  }

  private setPaintColour(state: RendererState, isFill: boolean, paint: SvgPaint) {
    let paintOpacity: number = (isFill) ? state.style.fillOpacity : state.style.strokeOpacity;
    let col;
    if (paint instanceof Colour) {
      col = (paint as Colour).colour;
    } else if (paint instanceof CurrentColor) {
      col = state.style.color.colour;
    } else {
      return;
    }

    if (isFill)
    state.fillPaint.setColor(col);
    else
    state.strokePaint.setColor(col);
  }

  getCurrentViewPortInUserUnits(): Box {
    if (this.state.viewBox != null)
    return this.state.viewBox;
    else
    return this.state.viewPort;
  }

  async renderDocument(document: SVGBase, renderOptions: RenderOptions,context?:common.UIAbilityContext) {
    if (renderOptions == null)
    throw new Error("renderOptions shouldn't be null");

    this.document = document;

    let rootObj: Svg = document.getRootElement();
    if (rootObj == null) {
      console.warn("Nothing to render. Document is empty.");
      return;
    }

    let viewBox: Box;
    let preserveAspectRatio: PreserveAspectRatio;
    if (renderOptions.hasView()) {
      let obj: SvgObject = this.document.getElementById(renderOptions.viewId);
      if (!(obj instanceof View)) {
        return;
      }
      let view: View = obj as View;

      if (view.viewBox == null) {
        return;
      }
      viewBox = view.viewBox;
      preserveAspectRatio = view.preserveAspectRatio;
    } else {
      viewBox = renderOptions.hasViewBox() ? renderOptions.viewBox
                                           : rootObj.viewBox;
      preserveAspectRatio = renderOptions.hasPreserveAspectRatio() ? renderOptions.preserveAspectRatio
                                                                   : rootObj.preserveAspectRatio;
    }

    if (renderOptions.hasCss()) {
      if (renderOptions.css != null) {
        let parser: CSSParser = new CSSParser(undefined, Source.RenderOptions, this.externalFileResolver);
        document.addCSSRules(parser.parse(renderOptions.css));
      } else if (renderOptions.cssRuleset != null) {
        document.addCSSRules(renderOptions.cssRuleset);
      }
    }
    if (renderOptions.hasTarget()) {
      this.ruleMatchContext = new RuleMatchContext();
      this.ruleMatchContext.targetElement = document.getElementById(renderOptions.targetId);
    }


    this.resetState();
    this.checkXMLSpaceAttribute(rootObj);

    this.statePush(true);

    let viewPort: Box;
    if (renderOptions.hasViewPort()) {
      viewPort = new Box(renderOptions.viewPort.minX, renderOptions.viewPort.minY, renderOptions.viewPort.width, renderOptions.viewPort.height)
    } else {
      viewPort = new Box(rootObj.viewBox.minX, rootObj.viewBox.minY, rootObj.viewBox.width, rootObj.viewBox.height);
    }
    if (rootObj.width != null)
    viewPort.width = rootObj.width.floatValue(this, viewPort.width);
    if (rootObj.height != null)
    viewPort.height = rootObj.height.floatValue(this, viewPort.height);
    await this.renderSvg4(rootObj, viewPort, viewBox, preserveAspectRatio,context);

    this.statePop();

    if (renderOptions.hasCss())
    document.clearRenderCSSRules();
  }

  private async renderSvg4(obj: Svg, viewPort: Box, viewBox: Box, positioning: PreserveAspectRatio,context?:common.UIAbilityContext) {
    if (viewPort.width == 0 || viewPort.height == 0)
    return;

    if (positioning == null)
    positioning = (obj.preserveAspectRatio != null) ? obj.preserveAspectRatio : PreserveAspectRatio.LETTERBOX;

    this.updateStyleForElement(this.state, obj);

    if (!this.display())
    return;

    this.state.viewPort = viewPort;

    if (!this.state.style.overflow) {
      this.setClipRect(this.state.viewPort.minX, this.state.viewPort.minY, this.state.viewPort.width, this.state.viewPort.height);
    }
    this.checkForClipPath(obj, this.state.viewPort);
    if (viewBox != null) {
      this.canvas.concat(this.calculateViewBoxTransform(this.state.viewPort, viewBox, positioning));
      this.state.viewBox = obj.viewBox;
    } else {
      this.canvas.translate(this.state.viewPort.minX, this.state.viewPort.minY);
    }
    let compositing: boolean = this.pushLayer();

    this.viewportFill();
    await this.renderChildren(obj, true,context);

    if (compositing)
    await this.popLayer(obj,undefined,context);

    this.updateParentBoundingBox(obj);
  }

  private async renderSymbol(obj: Symbol, viewPort: Box,context?:common.UIAbilityContext) {

    if (viewPort.width == 0 || viewPort.height == 0)
    return;


    let positioning: PreserveAspectRatio = (obj.preserveAspectRatio != null) ? obj.preserveAspectRatio : PreserveAspectRatio.LETTERBOX;

    this.updateStyleForElement(this.state, obj);

    this.state.viewPort = viewPort;

    if (!this.state.style.overflow) {
      this.setClipRect(this.state.viewPort.minX, this.state.viewPort.minY, this.state.viewPort.width, this.state.viewPort.height);
    }

    if (obj.viewBox != null) {
      this.canvas.concat(this.calculateViewBoxTransform(this.state.viewPort, obj.viewBox, positioning));
      this.state.viewBox = obj.viewBox;
    } else {
      this.canvas.translate(this.state.viewPort.minX, this.state.viewPort.minY);
    }

    let compositing: boolean = this.pushLayer();

    await this.renderChildren(obj, true,context);

    if (compositing)
    await this.popLayer(obj,undefined,context);

    this.updateParentBoundingBox(obj);
  }

  private async renderImage(obj: Image2,context?:common.UIAbilityContext) {
    if (obj.width == null || obj.width.isZero() ||
    obj.height == null || obj.height.isZero())
    return;

    if (obj.href == null)
    return;

    let translateX = (obj.translateX != null) ? obj.translateX.floatValueX(this) : 0;
    let translateY = (obj.translateY != null) ? obj.translateY.floatValueX(this) : 0;

    let positioning: PreserveAspectRatio = (obj.preserveAspectRatio != null) ? obj.preserveAspectRatio : PreserveAspectRatio.LETTERBOX;

    let pic: string = this.checkForImageDataURL(obj.href);
    if (pic == null) {

      if(context != undefined){

      }else {
        context = GlobalContext.getContext().getObject("context") as common.UIAbilityContext;
      }


      context.resourceManager.getRawFd(obj.href, (error, value) => {
        if (error != null) {
          throw new Error("rawfile get error:" + error)
        } else {
          image.createImageSource(value.fd).createPixelMap((err, pixelMap) => {
            this.canvas.getContext().drawImage(pixelMap, translateX, translateY, obj.width.floatValue(this), obj.height.floatValue(this))
          })
        }
      })
    } else {
      this.viewportFill();
      let base64 = new util.Base64Helper();
      let array = await base64.decode(pic)
      let pixelMap = await image.createImageSource(array.buffer).createPixelMap()
      this.canvas.getContext().drawImage(pixelMap, (obj.x != null) ? obj.x.floatValueX(this) : 0, (obj.y != null) ? obj.y.floatValueX(this) : 0, obj.width.floatValue(this), obj.height.floatValue(this))

    }
  }

  private checkForImageDataURL(url: string): string {
    if (!url.startsWith("data:"))
    return null;
    if (url.length < 14)
    return null;

    let comma: number = url.indexOf(',');
    if (comma < 12)
    return null;
    if (";base64" != (url.substring(comma - 7, comma)))
    return null;

    return url.substring(comma + 1);
  }

  private display(): boolean {
    if (this.state.style.display != null)
    return this.state.style.display;
    return true;
  }

  private visible(): boolean {
    if (this.state.style.visibility != null) {
      return this.state.style.visibility;
    }

    return true;
  }

  private calculateViewBoxTransform(viewPort: Box, viewBox: Box, positioning: PreserveAspectRatio): Matrix2D2 {
    let m: Matrix2D2 = new Matrix2D2();

    if (positioning == null || positioning.getAlignment() == null)
    return m;

    let xScale = viewPort.width / viewBox.width;
    let yScale = viewPort.height / viewBox.height;
    let xOffset = -viewBox.minX;
    let yOffset = -viewBox.minY;

    if (positioning == PreserveAspectRatio.STRETCH) {
      m.translate(viewPort.minX, viewPort.minY);
      m.scale(xScale, yScale);
      m.translate(xOffset, yOffset);
      return m;
    }


    let scale = (positioning.getScale() == Scale.slice) ? Math.max(xScale, yScale) : Math.min(xScale, yScale);

    let imageW = viewPort.width / scale;
    let imageH = viewPort.height / scale;

    switch (positioning.getAlignment()) {
      case Alignment.xMidYMin:
      case Alignment.xMidYMid:
      case Alignment.xMidYMax:
        xOffset -= (viewBox.width - imageW) / 2;
        break;
      case Alignment.xMaxYMin:
      case Alignment.xMaxYMid:
      case Alignment.xMaxYMax:
        xOffset -= (viewBox.width - imageW);
        break;
      default:

        break;
    }

    switch (positioning.getAlignment()) {
      case Alignment.xMinYMid:
      case Alignment.xMidYMid:
      case Alignment.xMaxYMid:
        yOffset -= (viewBox.height - imageH) / 2;
        break;
      case Alignment.xMinYMax:
      case Alignment.xMidYMax:
      case Alignment.xMaxYMax:
        yOffset -= (viewBox.height - imageH);
        break;
      default:

        break;
    }
    m.translate(viewPort.minX, viewPort.minY);
    m.scale(scale, scale);
    m.translate(xOffset, yOffset);
    return m;
  }

  private checkGenericFont(fontName: string) {
    return fontName;
  }

  private setClipRect(minX: number, minY: number, width: number, height: number) {
    let left = minX;
    let top = minY;
    let right = minX + width;
    let bottom = minY + height;

    if (this.state.style.clip != null) {
      left += this.state.style.clip.left.floatValueX(this);
      top += this.state.style.clip.top.floatValueY(this);
      right -= this.state.style.clip.right.floatValueX(this);
      bottom -= this.state.style.clip.bottom.floatValueY(this);
    }

    this.canvas.clipRect(left, top, right, bottom);
  }

  private viewportFill() {
    let col;
    if (this.state.style.viewportFill instanceof Colour) {
      col = (this.state.style.viewportFill as Colour).colour;
    } else if (this.state.style.viewportFill instanceof CurrentColor) {
      col = this.state.style.color.colour;
    } else {
      return;
    }
    if (this.state.style.viewportFillOpacity != null)

    this.canvas.drawColor(col);
  }

  private async render(obj: SvgObject, context?:common.UIAbilityContext) {
    if (!obj.isRender) {
      return;
    }

    this.statePush();

    await this.checkXMLSpaceAttribute(obj);

    if (obj instanceof Svg) {
      await this.renderSvg(obj as Svg,undefined,undefined,undefined,context);
    } else if (obj instanceof Use) {
      await this.renderUse(obj as Use,context);
    } else if (obj instanceof Switch) {
      await this.renderSwitch(obj as Switch,context);
    } else if (obj instanceof Group) {
      await this.renderGroup(obj as Group,context);
    } else if (obj instanceof Image2) {
      await this.renderImage(obj as Image2,context);
    } else if (obj instanceof Path2) {
      await this.renderPath(obj as Path2,context);
    } else if (obj instanceof Rect2) {
      await this.renderRect(obj as Rect2,context);
    } else if (obj instanceof Circle2) {
      await this.renderCircle(obj as Circle2,context);
    } else if (obj instanceof Ellipse2) {
      await this.renderEllipse(obj as Ellipse2,context);
    } else if (obj instanceof Line2) {
      await this.renderLine(obj as Line2,context);
    } else if (obj instanceof Polygon2) {
      await this.renderPolygon(obj as Polygon2,context);
    } else if (obj instanceof PolyLine) {
      await this.renderPolyLine(obj as PolyLine,context);
    } else if (obj instanceof Text2) {
      await this.renderText(obj as Text2,context);
    }


    this.statePop();
  }

  private async renderChildren(obj: SvgContainer, isContainer: boolean,context?:common.UIAbilityContext) {
    if (isContainer) {
      this.parentPush(obj);
    }

    for (let i = 0;i < obj.getChildren().length; i++) {
      let child = obj.getChildren()[i];
      await this.render(child,context);
    }

    if (isContainer) {
      this.parentPop();
    }
  }

  private statePush(isRootContext?: boolean) {
    if (isRootContext == undefined) {
      isRootContext = false;
    }
    if (isRootContext) {


    } else {
      this.canvas.save();
    }

    this.stateStack.push(this.state);
    this.state = new RendererState(this.state);
  }

  private statePop() {
    this.combinedPath = null;
    this.canvas.restore();
    this.state = this.stateStack.pop();
  }

  private parentPush(obj: SvgContainer) {
    this.parentStack.push(obj);
    this.matrixStack.push(this.canvas.getMatrix());
  }

  private parentPop() {
    this.parentStack.pop();
    this.matrixStack.pop();
  }

  private updateStyleForElement(state: RendererState, obj: SvgElementBase) {
    let isRootSVG: boolean = (obj.parent == null);
    state.style.resetNonInheritingProperties(isRootSVG);


    if (obj.baseStyle != null)
    this.updateStyle(state, obj.baseStyle);


    if (this.document.hasCSSRules()) {
      for (let i = 0;i < this.document.getCSSRules().length; i++) {
        if (CSSParser.ruleMatch(this.ruleMatchContext, this.document.getCSSRules()[i].selector, obj)) {
          this.updateStyle(state, this.document.getCSSRules()[i].style);
        }
      }
    }

    if (obj.style != null)
    this.updateStyle(state, obj.style);
  }

  private checkXMLSpaceAttribute(obj: SvgObject) {
    if (!(obj instanceof SvgElementBase))
    return;

    let bobj: SvgElementBase = obj as SvgElementBase;
    if (bobj.spacePreserve != null)
    this.state.spacePreserve = bobj.spacePreserve;
  }

  private async doFilledPath(obj: SvgElement, path: Path2D,context?:common.UIAbilityContext) {
    if (this.state.style.fill instanceof PaintReference) {
      let ref: SvgObject = this.document.resolveIRI((this.state.style.fill as PaintReference).href);
      if (ref instanceof Pattern) {
        let pattern: Pattern = ref as Pattern;
        await this.fillWithPattern(obj, path, pattern,context);
        return;
      }
    }
    this.canvas.drawPath(path, this.state.fillPaint);
  }

  private doStroke(path: Path2D) {
    if (this.state.style.vectorEffect == VectorEffect.NonScalingStroke) {

      let currentMatrix: Matrix2D2 = this.canvas.getMatrix();

      let transformedPath: Path2D = new Path2D();

      this.canvas.setMatrix(new Matrix2D2());

      this.canvas.drawPath(transformedPath, this.state.strokePaint);

      this.canvas.setMatrix(currentMatrix);

    } else {
      this.canvas.drawPath(path, this.state.strokePaint);
    }
  }

  private async renderSvg(obj: Svg, viewPort?: Box, viewBox?: Box, positioning?: PreserveAspectRatio,context?:common.UIAbilityContext) {
    if (viewPort == undefined) {
      viewPort = this.makeViewPort(obj.x, obj.y, obj.width, obj.height);
    }
    if (positioning == undefined) {
      positioning = obj.preserveAspectRatio;
    }
    console.info("Svg render");

    if (viewPort.width == 0 || viewPort.height == 0)
    return;

    if (positioning == null) {
      positioning = (obj.preserveAspectRatio != null) ? obj.preserveAspectRatio : PreserveAspectRatio.LETTERBOX;
    }

    this.updateStyleForElement(this.state, obj);

    if (!this.display())
    return;

    this.state.viewPort = viewPort;

    if (!this.state.style.overflow) {
      this.setClipRect(this.state.viewPort.minX, this.state.viewPort.minY, this.state.viewPort.width, this.state.viewPort.height);
    }

    this.checkForClipPath(obj, this.state.viewPort);

    if (viewBox != null) {
      this.canvas.concat(this.calculateViewBoxTransform(this.state.viewPort, viewBox, positioning));
      this.state.viewBox = obj.viewBox;
    } else {
      this.canvas.translate(this.state.viewPort.minX, this.state.viewPort.minY);
    }

    let compositing: boolean = this.pushLayer();

    this.viewportFill();

    await this.renderChildren(obj, true,context);

    if (compositing)
    await this.popLayer(obj,undefined,context);

    this.updateParentBoundingBox(obj);
  }

  private makeViewPort(x: Length, y: Length, width: Length, height: Length): Box {
    let _x = (x != null) ? x.floatValueX(this) : 0;
    let _y = (y != null) ? y.floatValueY(this) : 0;

    let viewPortUser: Box = this.getCurrentViewPortInUserUnits();
    let _w = (width != null) ? width.floatValueX(this) : viewPortUser.width;
    let _h = (height != null) ? height.floatValueY(this) : viewPortUser.height;

    return new Box(_x, _y, _w, _h);
  }

  private async renderGroup(obj: Group,context?:common.UIAbilityContext) {

    this.updateStyleForElement(this.state, obj);

    if (!this.display())
    return;

    if (obj.transform != null) {
      this.canvas.concat(obj.transform);
    }

    this.checkForClipPath(obj);

    let compositing: boolean = this.pushLayer();

    await this.renderChildren(obj, true,context);

    if (compositing)
    await this.popLayer(obj,undefined,context);

    this.updateParentBoundingBox(obj);
  }

  private updateParentBoundingBox(obj: SvgElement) {

  }

  private pushLayer(opacityAdjustment?: number): boolean {
    if (opacityAdjustment == undefined) {
      opacityAdjustment = 1
    }
    if (this.state.style.fillOpacity != 1) {
      this.canvas.getContext().globalAlpha = this.state.style.fillOpacity
    }
    if (opacityAdjustment != 1) {
      this.canvas.getContext().globalAlpha = opacityAdjustment
    }
    if (!this.requiresCompositing() && opacityAdjustment == 1)
    return false;

    if (this.state.style.opacity != 1) {
      this.canvas.getContext().globalAlpha = this.state.style.opacity
    }

    this.stateStack.push(this.state);
    this.state = new RendererState(this.state);
    if (this.state.style.mask != null) {
      let ref: SvgObject = this.document.resolveIRI(this.state.style.mask);
      if (!(ref instanceof Mask)) {
        this.state.style.mask = null;
        return true;
      }
    }
    return true;
  }

  private static clamp255(val: number): number {
    let i = (val * 256);
    return (i < 0) ? 0 : Math.min(i, 255);
  }

  private async popLayer(obj: SvgElement, originalObjBBox?: Box, context?:common.UIAbilityContext) {
    if (originalObjBBox == undefined) {
      originalObjBBox = obj.boundingBox;
    }

    if (this.state.style.mask != null) {

      this.canvas.getContext().globalCompositeOperation = 'destination-in';
      let ref: SvgObject = this.document.resolveIRI(this.state.style.mask);
      await this.renderMask(ref as Mask, obj, originalObjBBox,context);

      this.canvas.restore();

      this.canvas.restore();
    }

    this.statePop();
  }

  private requiresCompositing(): boolean {
    return (this.state.style.opacity < 1.0) ||
    (this.state.style.mask != null) ||
    (this.state.style.isolation == Isolation.isolate);
  }

  private async renderSwitch(obj: Switch,context?:common.UIAbilityContext) {

    this.updateStyleForElement(this.state, obj);

    if (!this.display())
    return;

    if (obj.transform != null) {
      this.canvas.concat(obj.transform);
    }

    this.checkForClipPath(obj);

    let compositing: boolean = this.pushLayer();

    await this.renderSwitchChild(obj,context);

    if (compositing)
    await this.popLayer(obj,undefined,context);

    this.updateParentBoundingBox(obj);
  }

  private async renderSwitchChild(obj: Switch,context?:common.UIAbilityContext) {
    let deviceLanguage = configuration.getLocale().language;


    for (let i = 0;i < obj.getChildren().length; i++) {
      let child = obj.getChildren()[i];

      if (!(child.type.indexOf("SvgConditional") > -1)) {
        continue;
      }
      // @ts-ignore
      let condObj: SvgConditional = child as SvgConditional;


      if (condObj.getRequiredExtensions() != null) {
        continue;
      }

      let syslang: Array<String> = condObj.getSystemLanguage();
      if (syslang != null && (syslang.length == 0 || syslang.indexOf(deviceLanguage) == -1)) {
        continue;
      }


      await this.render(child,context);
      break;
    }
  }

  private async renderUse(obj: Use,context?:common.UIAbilityContext) {

    if ((obj.width != null && obj.width.isZero()) ||
    (obj.height != null && obj.height.isZero()))
    return;

    this.updateStyleForElement(this.state, obj);

    if (!this.display())
    return;

    let ref: SvgObject = obj.document.resolveIRI(obj.href);
    if (ref == null) {
      return;
    }

    if (obj.transform != null) {
      this.canvas.concat(obj.transform);
    }


    let _x = (obj.x != null) ? obj.x.floatValueX(this) : 0;
    let _y = (obj.y != null) ? obj.y.floatValueY(this) : 0;
    this.canvas.translate(_x, _y);

    this.checkForClipPath(obj);

    let compositing: boolean = this.pushLayer();

    this.parentPush(obj);

    if (ref instanceof Svg) {
      let svgElem = ref as Svg;
      let viewPort: Box = this.makeViewPort(null, null, obj.width, obj.height);

      this.statePush();
      await this.renderSvg(svgElem, viewPort,undefined,undefined,context);
      this.statePop();
    } else if (ref instanceof Symbol) {
      let _w: Length = (obj.width != null) ? obj.width : new Length(100, Unit.percent);
      let _h: Length = (obj.height != null) ? obj.height : new Length(100, Unit.percent);
      let viewPort: Box = this.makeViewPort(null, null, _w, _h);

      this.statePush();
      await this.renderSymbol(ref as Symbol, viewPort,context);
      this.statePop();
    } else {
      await this.render(ref,context);
    }

    this.parentPop();

    if (compositing)
    await this.popLayer(obj,undefined,context);

    this.updateParentBoundingBox(obj);
  }

  private async renderPath(obj: Path2,context?:common.UIAbilityContext) {
    if (obj.d == null)
    return;
    this.updateStyleForElement(this.state, obj);
    if (!this.display())
    return;
    if (!this.visible())
    return;
    if (!this.state.hasStroke && !this.state.hasFill)
    return;

    if (obj.transform != null)
    this.canvas.concat(obj.transform);

    let path: Path2D = new Path2D(obj.d.d);

    this.updateParentBoundingBox(obj);
    this.checkForGradientsAndPatterns(obj);
    this.checkForClipPath(obj);
    let compositing: boolean = this.pushLayer();
    if (this.state.hasStroke)
    this.doStroke(path);
    if (this.state.hasFill)
    await this.doFilledPath(obj, path,context);
    await this.renderMarkers(obj,context);

    if (compositing)
    await this.popLayer(obj,undefined,context);
  }

  private async renderRect(obj: Rect2,context?:common.UIAbilityContext) {

    if (obj.width == null || obj.height == null || obj.width.isZero() || obj.height.isZero())
    return;
    this.updateStyleForElement(this.state, obj);
    if (!this.display())
    return;
    if (!this.visible())
    return;

    if (obj.transform != null)
    this.canvas.concat(obj.transform);

    this.updateParentBoundingBox(obj);

    this.checkForGradientsAndPatterns(obj);
    this.checkForClipPath(obj);
    if (this.combinedPath != null) {
      obj.x = new Length(0)
      obj.y = new Length(0)
      obj.width = new Length(2000)
      obj.height = new Length(2000)
    }
    let path: Path2D = this.makePathAndBoundingBoxRect(obj);
    let compositing: boolean = this.pushLayer();
    if (this.state.hasFill)
    await this.doFilledPath(obj, path,context);
    if (this.state.hasStroke)
    this.doStroke(path);

    if (compositing)
    await this.popLayer(obj,undefined,context);
  }

  private async renderCircle(obj: Circle2,context?:common.UIAbilityContext) {

    if (obj.r == null || obj.r.isZero())
    return;

    this.updateStyleForElement(this.state, obj);

    if (!this.display())
    return;
    if (!this.visible())
    return;

    if (obj.transform != null)
    this.canvas.concat(obj.transform);

    let path: Path2D = this.makePathAndBoundingBoxCircle(obj);
    this.updateParentBoundingBox(obj);

    this.checkForGradientsAndPatterns(obj);
    this.checkForClipPath(obj);

    let compositing: boolean = this.pushLayer();

    if (this.state.hasFill)
    await this.doFilledPath(obj, path,context);
    if (this.state.hasStroke)
    this.doStroke(path);

    if (compositing)
    await this.popLayer(obj,undefined,context);
  }

  private async renderEllipse(obj: Ellipse2,context?:common.UIAbilityContext) {

    if (obj.rx == null || obj.ry == null || obj.rx.isZero() || obj.ry.isZero())
    return;

    this.updateStyleForElement(this.state, obj);

    if (!this.display())
    return;
    if (!this.visible())
    return;

    if (obj.transform != null)
    this.canvas.concat(obj.transform);

    let path = this.makePathAndBoundingBoxEllipse(obj);
    this.updateParentBoundingBox(obj);

    this.checkForGradientsAndPatterns(obj);
    this.checkForClipPath(obj);

    let compositing: boolean = this.pushLayer();

    if (this.state.hasFill)
    await this.doFilledPath(obj, path,context);
    if (this.state.hasStroke)
    this.doStroke(path);

    if (compositing)
    await this.popLayer(obj,undefined,context);
  }

  private async renderLine(obj: Line2,context?:common.UIAbilityContext) {

    this.updateStyleForElement(this.state, obj);

    if (!this.display())
    return;
    if (!this.visible())
    return;
    if (!this.state.hasStroke)
    return;

    if (obj.transform != null)
    this.canvas.concat(obj.transform);

    let path: Path2D = this.makePathAndBoundingBoxLine(obj);
    this.updateParentBoundingBox(obj);

    this.checkForGradientsAndPatterns(obj);
    this.checkForClipPath(obj);

    let compositing: boolean = this.pushLayer();

    this.doStroke(path);

    await this.renderMarkers(obj,context);

    if (compositing)
    await this.popLayer(obj,undefined,context);
  }

  private calculateMarkerPositionsLine(obj: Line2): Array<MarkerVector> {
    let _x1, _y1, _x2, _y2;
    _x1 = (obj.x1 != null) ? obj.x1.floatValueX(this) : 0;
    _y1 = (obj.y1 != null) ? obj.y1.floatValueY(this) : 0;
    _x2 = (obj.x2 != null) ? obj.x2.floatValueX(this) : 0;
    _y2 = (obj.y2 != null) ? obj.y2.floatValueY(this) : 0;

    let markers: Array<MarkerVector> = new Array();
    markers.push(new MarkerVector(_x1, _y1, (_x2 - _x1), (_y2 - _y1)));
    markers.push(new MarkerVector(_x2, _y2, (_x2 - _x1), (_y2 - _y1)));
    return markers;
  }

  private async renderPolyLine(obj: PolyLine,context?:common.UIAbilityContext) {

    this.updateStyleForElement(this.state, obj);

    if (!this.display())
    return;
    if (!this.visible())
    return;
    if (!this.state.hasStroke && !this.state.hasFill)
    return;

    if (obj.transform != null)
    this.canvas.concat(obj.transform);

    let numPoints: number = (obj.points != null) ? obj.points.length : 0;
    if (numPoints < 2 ||
    numPoints % 2 == 1)
    return;

    let path: Path2D = this.makePathAndBoundingBoxPolyLine(obj);
    this.updateParentBoundingBox(obj);

    this.checkForGradientsAndPatterns(obj);
    this.checkForClipPath(obj);

    let compositing: boolean = this.pushLayer();

    if (this.state.hasFill)
    await this.doFilledPath(obj, path,context);
    if (this.state.hasStroke)
    this.doStroke(path);

    await this.renderMarkers(obj,context);

    if (compositing)
    await this.popLayer(obj,undefined,context);
  }

  private calculateMarkerPositionsPolyLine(obj: PolyLine): Array<MarkerVector> {
    let numPoints: number = (obj.points != null) ? obj.points.length : 0;
    if (numPoints < 2)
    return null;

    let markers: Array<MarkerVector> = new Array();
    let lastPos: MarkerVector = new MarkerVector(obj.points[0], obj.points[1], 0, 0);
    let x = 0, y = 0;

    for (let i = 2; i < numPoints; i += 2) {
      x = obj.points[i];
      y = obj.points[i+1];
      lastPos.add(x, y);
      markers.push(lastPos);
      lastPos = new MarkerVector(x, y, x - lastPos.x, y - lastPos.y);
    }


    if (obj instanceof Polygon) {
      if (x != obj.points[0] && y != obj.points[1]) {
        x = obj.points[0];
        y = obj.points[1];
        lastPos.add(x, y);
        markers.push(lastPos);


        let newPos: MarkerVector = new MarkerVector(x, y, x - lastPos.x, y - lastPos.y);
        newPos.add(markers[0].x, markers[0].y);
        markers.push(newPos);
        markers.splice(0, 1, newPos);
      }
    } else {
      markers.push(lastPos);
    }
    return markers;
  }

  private async renderPolygon(obj: Polygon2,context?:common.UIAbilityContext) {

    this.updateStyleForElement(this.state, obj);

    if (!this.display())
    return;
    if (!this.visible())
    return;
    if (!this.state.hasStroke && !this.state.hasFill)
    return;

    if (obj.transform != null)
    this.canvas.concat(obj.transform);

    let numPoints = (obj.points != null) ? obj.points.length : 0;
    if (numPoints < 2)
    return;

    let path: Path2D = this.makePathAndBoundingBoxPolyLine(obj);
    this.updateParentBoundingBox(obj);

    this.checkForGradientsAndPatterns(obj);
    this.checkForClipPath(obj);

    let compositing: boolean = this.pushLayer();

    if (this.state.hasFill)
    await this.doFilledPath(obj, path,context);
    if (this.state.hasStroke)
    this.doStroke(path);

    await this.renderMarkers(obj,context);

    if (compositing)
    await this.popLayer(obj,undefined,context);
  }

  private async renderText(obj: Text2,context?:common.UIAbilityContext) {
    this.updateStyleForElement(this.state, obj);

    if (!this.display())
    return;

    if (obj.transform != null)
    this.canvas.concat(obj.transform);

    let x = (obj.x == null || obj.x.length == 0) ? 0 : obj.x[0].floatValueX(this);
    let y = (obj.y == null || obj.y.length == 0) ? 0 : obj.y[0].floatValueY(this);
    let dx = (obj.dx == null || obj.dx.length == 0) ? 0 : obj.dx[0].floatValueX(this);
    let dy = (obj.dy == null || obj.dy.length == 0) ? 0 : obj.dy[0].floatValueY(this);


    this.updateParentBoundingBox(obj);

    this.checkForGradientsAndPatterns(obj);
    this.checkForClipPath(obj);

    let compositing: boolean = this.pushLayer();
    await this.enumerateTextSpans(obj, new PlainTextDrawer(x + dx, y + dy),context);

    if (compositing)
    await this.popLayer(obj,undefined,context);
  }

  private makePathAndBoundingBoxText(obj: Text2): Path2D {

    let x = (obj.x == null || obj.x.length == 0) ? 0 : obj.x[0].floatValueX(this);
    let y = (obj.y == null || obj.y.length == 0) ? 0 : obj.y[0].floatValueY(this);
    let dx = (obj.dx == null || obj.dx.length == 0) ? 0 : obj.dx[0].floatValueX(this);
    let dy = (obj.dy == null || obj.dy.length == 0) ? 0 : obj.dy[0].floatValueY(this);


    let textAsPath: Path2D = new Path2D();


    return textAsPath;
  }

  private getAnchorPosition(): TextAnchor {
    if (this.state.style.direction == TextDirection.LTR || this.state.style.textAnchor == TextAnchor.Middle)
    return this.state.style.textAnchor;
    return (this.state.style.textAnchor == TextAnchor.Start) ? TextAnchor.End : TextAnchor.Start;
  }

  private async enumerateTextSpans(obj: TextContainer, textprocessor: TextProcessor,context?:common.UIAbilityContext) {
    if (!this.display())
    return;

    let isFirstChild: boolean = true;
    if (obj.children.length > 0) {
      for (let i = 0;i < obj.children.length; i++) {
        let child: SvgObject = obj.children[i]
        if (child instanceof TextSequence) {
          textprocessor.processText(this.textXMLSpaceTransform((child as TextSequence).text, isFirstChild, i + 1 != obj.children.length), this.state, this.canvas);
        } else {
          await this.processTextChild(child, textprocessor,context);
        }
        isFirstChild = false;
      }
    } else {
      textprocessor.processText(this.textXMLSpaceTransform((obj as Text2).text, true, true), this.state, this.canvas);
    }
  }

  private textXMLSpaceTransform(text: string, isFirstChild: boolean, isLastChild: boolean): string {
    if (this.state.spacePreserve)
    return text.replace(SVGRenderer.PATTERN_TABS_OR_LINE_BREAKS, " ")


    text = text.replace(SVGRenderer.PATTERN_TABS, "");
    text = text.replace(SVGRenderer.PATTERN_LINE_BREAKS, " ");

    if (isFirstChild)
    text = text.replace(SVGRenderer.PATTERN_START_SPACES, "");
    if (isLastChild)
    text = text.replace(SVGRenderer.PATTERN_END_SPACES, "");
    return text.replace(SVGRenderer.PATTERN_DOUBLE_SPACES, " ");
  }

  private async processTextChild(obj: SvgObject, textprocessor: TextProcessor,context?:common.UIAbilityContext) {

    if (!textprocessor.doTextContainer(obj as TextContainer))
    return;

    if (obj instanceof TextPath) {

      this.statePush();

      this.renderTextPath(obj as TextPath);


      this.statePop();
    }
    else if (obj instanceof TSpan) {


      this.statePush();

      let tspan = obj as TSpan;

      this.updateStyleForElement(this.state, tspan);

      if (this.display()) {

        let x = 0, y = 0, dx = 0, dy = 0;
        let specifiedX: boolean = (tspan.x != null && tspan.x.length > 0);


        if (specifiedX) {


        }

        this.checkForGradientsAndPatterns(tspan.getTextRoot() as SvgElement);


        let compositing: boolean = this.pushLayer();

        await this.enumerateTextSpans(tspan, textprocessor,context);

        if (compositing)
        await this.popLayer(tspan,undefined,context);
      }


      this.statePop();
    }
    else if (obj instanceof TRef) {

      this.statePush();

      let tref = obj as TRef;

      this.updateStyleForElement(this.state, tref);

      if (this.display()) {
        this.checkForGradientsAndPatterns(tref.getTextRoot() as SvgElement);


        let ref: SvgObject = obj.document.resolveIRI(tref.href);
        if (ref instanceof TextContainer) {
          let str: string = "";
          this.extractRawText((ref as TextContainer), str);
          if (str.length > 0) {
            textprocessor.processText(str.toString(), this.state, this.canvas);
          }
        }
        else {
        }
      }


      this.statePop();
    }

  }

  private extractRawText(parent: TextContainer, str: string) {
    let isFirstChild: boolean = true;
    for (let i = 0;i < parent.children.length; i++) {
      let child: SvgObject = parent.children[i];
      if (child instanceof TextContainer) {
        this.extractRawText(child as TextContainer, str);
      } else if (child instanceof TextSequence) {
        str += (this.textXMLSpaceTransform((child as TextSequence).text, isFirstChild, i + 1 != parent.children.length
        ));
      }
      isFirstChild = false;
    }
  }

  private renderTextPath(obj: TextPath) {


  }

  public static arcTo(lastX: number, lastY: number, rx: number, ry: number, angle: number, largeArcFlag: boolean, sweepFlag: boolean, x: number, y: number, pather: PathInterface) {
    if (lastX == x && lastY == y) {
      return;
    }

    if (rx == 0 || ry == 0) {
      pather.lineTo(x, y);
      return;
    }

    rx = Math.abs(rx);
    ry = Math.abs(ry);
    let angleRad = angle % 360.0 * Math.PI / 180;
    let cosAngle = Math.cos(angleRad);
    let sinAngle = Math.sin(angleRad);

    let dx2 = (lastX - x) / 2.0;
    let dy2 = (lastY - y) / 2.0;

    let x1 = (cosAngle * dx2 + sinAngle * dy2);
    let y1 = (-sinAngle * dx2 + cosAngle * dy2);

    let rx_sq = rx * rx;
    let ry_sq = ry * ry;
    let x1_sq = x1 * x1;
    let y1_sq = y1 * y1;

    let radiiCheck = x1_sq / rx_sq + y1_sq / ry_sq;
    if (radiiCheck > 0.99999) {
      let radiiScale = Math.sqrt(radiiCheck) * 1.00001;
      rx = (radiiScale * rx);
      ry = (radiiScale * ry);
      rx_sq = rx * rx;
      ry_sq = ry * ry;
    }

    let sign = (largeArcFlag == sweepFlag) ? -1 : 1;
    let sq = ((rx_sq * ry_sq) - (rx_sq * y1_sq) - (ry_sq * x1_sq)) / ((rx_sq * y1_sq) + (ry_sq * x1_sq));
    sq = (sq < 0) ? 0 : sq;
    let coef = (sign * Math.sqrt(sq));
    let cx1 = (coef * ((rx * y1) / ry));
    let cy1 = (coef * -((ry * x1) / rx));

    let sx2 = (lastX + x) / 2.0;
    let sy2 = (lastY + y) / 2.0;
    let cx = sx2 + (cosAngle * cx1 - sinAngle * cy1);
    let cy = sy2 + (sinAngle * cx1 + cosAngle * cy1);

    let ux = (x1 - cx1) / rx;
    let uy = (y1 - cy1) / ry;
    let vx = (-x1 - cx1) / rx;
    let vy = (-y1 - cy1) / ry;
    let p, n;

    let TWO_PI = Math.PI * 2.0;


    n = Math.sqrt((ux * ux) + (uy * uy));
    p = ux;
    sign = (uy < 0) ? -1.0 : 1.0;
    let angleStart = sign * Math.acos(p / n);

    n = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy));
    p = ux * vx + uy * vy;
    sign = (ux * vy - uy * vx < 0) ? -1.0 : 1.0;
    let angleExtent = sign * this.checkedArcCos(p / n);

    if (angleExtent == 0) {
      pather.lineTo(x, y);
      return;
    }

    if (!sweepFlag && angleExtent > 0) {
      angleExtent -= TWO_PI;
    } else if (sweepFlag && angleExtent < 0) {
      angleExtent += TWO_PI;
    }
    angleExtent %= TWO_PI;
    angleStart %= TWO_PI;

    let bezierPoints = this.arcToBeziers(angleStart, angleExtent);

    let m = new Matrix2D2();
    m.scale(rx, ry);
    m.rotate(angle);
    m.translate(cx, cy);
    m.append(bezierPoints[0], bezierPoints[1], bezierPoints[2], bezierPoints[3], bezierPoints[4], bezierPoints[5]);


    bezierPoints[bezierPoints.length-2] = x;
    bezierPoints[bezierPoints.length-1] = y;


    for (let i = 0; i < bezierPoints.length; i += 6) {
      pather.cubicTo(bezierPoints[i], bezierPoints[i+1], bezierPoints[i+2], bezierPoints[i+3], bezierPoints[i+4], bezierPoints[i+5]);
    }
  }

  private static checkedArcCos(val: number): number {
    return (val < -1.0) ? Math.PI : (val > 1.0) ? 0 : Math.acos(val);
  }

  private static arcToBeziers(angleStart: number, angleExtent: number): number[] {

    let numSegments: number = Math.ceil(Math.abs(angleExtent) * 2.0 / Math.PI);

    let angleIncrement: number = angleExtent / numSegments;

    let controlLength = 4.0 / 3.0 * Math.sin(angleIncrement / 2.0) / (1.0 + Math.cos(angleIncrement / 2.0));

    let coords = new Array(numSegments * 6);
    let pos = 0;
    for (let i = 0; i < numSegments; i++) {
      let angle = angleStart + i * angleIncrement;

      let dx = Math.cos(angle);
      let dy = Math.sin(angle);
      coords[pos++] = (dx - controlLength * dy);
      coords[pos++] = (dy + controlLength * dx);

      angle += angleIncrement;
      dx = Math.cos(angle);
      dy = Math.sin(angle);
      coords[pos++] = (dx + controlLength * dy);
      coords[pos++] = (dy - controlLength * dx);

      coords[pos++] = dx;
      coords[pos++] = dy;
    }
    return coords;
  }

  private async renderMarkers(obj: GraphicsElement,context?:common.UIAbilityContext) {
    if (this.state.style.markerStart == null && this.state.style.markerMid == null && this.state.style.markerEnd == null)
    return;

    let _markerStart: Marker = null;
    let _markerMid: Marker = null;
    let _markerEnd: Marker = null;

    if (this.state.style.markerStart != null) {
      let ref: SvgObject = obj.document.resolveIRI(this.state.style.markerStart);
      if (ref != null)
      _markerStart = ref as Marker;
    }

    if (this.state.style.markerMid != null) {
      let ref: SvgObject = obj.document.resolveIRI(this.state.style.markerMid);
      if (ref != null)
      _markerMid = ref as Marker;
    }

    if (this.state.style.markerEnd != null) {
      let ref: SvgObject = obj.document.resolveIRI(this.state.style.markerEnd);
      if (ref != null)
      _markerEnd = ref as Marker;
    }

    let markers: Array<MarkerVector>;
    if (obj instanceof Path2)
    markers = (new MarkerPositionCalculator((obj as Path2).d)).getMarkers();
    else if (obj instanceof Line2)
    markers = this.calculateMarkerPositionsLine(obj as Line2);
    else
    markers = this.calculateMarkerPositionsPolyLine(obj as PolyLine);

    if (markers == null)
    return;

    let markerCount = markers.length;
    if (markerCount == 0)
    return;


    this.state.style.markerStart = this.state.style.markerMid = this.state.style.markerEnd = null;

    if (_markerStart != null)
    await this.renderMarker(_markerStart, markers[0],context);

    if (_markerMid != null && markers.length > 2) {
      let lastPos: MarkerVector = markers[0];
      let thisPos: MarkerVector = markers[1];

      for (let i = 1; i < (markerCount - 1); i++) {
        let nextPos: MarkerVector = markers[i + 1];
        if (thisPos.isAmbiguous)
        thisPos = this.realignMarkerMid(lastPos, thisPos, nextPos);
        await this.renderMarker(_markerMid, thisPos,context);
        lastPos = thisPos;
        thisPos = nextPos;
      }
    }

    if (_markerEnd != null)
    await this.renderMarker(_markerEnd, markers[markerCount - 1],context);
  }

  private realignMarkerMid(lastPos: MarkerVector, thisPos: MarkerVector, nextPos: MarkerVector): MarkerVector {

    let dot: number = this.dotProduct(thisPos.dx, thisPos.dy, (thisPos.x - lastPos.x), (thisPos.y - lastPos.y));
    if (dot == 0) {

      dot = this.dotProduct(thisPos.dx, thisPos.dy, (nextPos.x - thisPos.x), (nextPos.y - thisPos.y));
    }
    if (dot > 0)
    return thisPos;
    if (dot == 0) {


      if (thisPos.dx > 0 || thisPos.dy >= 0)
      return thisPos;
    }

    thisPos.dx = -thisPos.dx;
    thisPos.dy = -thisPos.dy;
    return thisPos;
  }

  private dotProduct(x1: number, y1: number, x2: number, y2: number): number {
    return x1 * x2 + y1 * y2;
  }

  private async renderMarker(marker: Marker, pos: MarkerVector,context?:common.UIAbilityContext) {
    let angle = 0;
    let unitsScale;

    this.statePush();


    if (marker.orient != null) {
      if (Number.isNaN(marker.orient)) {
        if (pos.dx != 0 || pos.dy != 0) {
          angle = Math.atan2(pos.dy, pos.dx) * 180 / Math.PI
        }
      } else {
        angle = marker.orient;
      }
    }

    unitsScale = marker.markerUnitsAreUser ? 1 : this.state.style.strokeWidth.floatValueWithDpi(this.dpi);


    this.state = this.findInheritFromAncestorState(marker);

    let m: Matrix2D2 = new Matrix2D2();
    m.translate(pos.x, pos.y);
    m.rotate(angle);
    m.scale(unitsScale, unitsScale);


    let _refX = (marker.refX != null) ? marker.refX.floatValueX(this) : 0;
    let _refY = (marker.refY != null) ? marker.refY.floatValueY(this) : 0;
    let _markerWidth = (marker.markerWidth != null) ? marker.markerWidth.floatValueX(this) : 3;
    let _markerHeight = (marker.markerHeight != null) ? marker.markerHeight.floatValueY(this) : 3;

    if (marker.viewBox != null) {


      let xScale, yScale;

      xScale = _markerWidth / marker.viewBox.width;
      yScale = _markerHeight / marker.viewBox.height;


      let positioning: PreserveAspectRatio = (marker.preserveAspectRatio != null) ? marker.preserveAspectRatio : PreserveAspectRatio.LETTERBOX;
      if (positioning != PreserveAspectRatio.STRETCH) {
        let aspectScale: number = (positioning.getScale() == Scale.slice) ? Math.max(xScale, yScale) : Math.min(xScale, yScale);
        xScale = yScale = aspectScale;
      }


      m.translate(-_refX * xScale, -_refY * yScale);
      this.canvas.concat(m);


      let imageW = marker.viewBox.width * xScale;
      let imageH = marker.viewBox.height * yScale;
      let xOffset = 0;
      let yOffset = 0;
      switch (positioning.getAlignment()) {
        case Alignment.xMidYMin:
        case Alignment.xMidYMid:
        case Alignment.xMidYMax:
          xOffset -= (_markerWidth - imageW) / 2;
          break;
        case Alignment.xMaxYMin:
        case Alignment.xMaxYMid:
        case Alignment.xMaxYMax:
          xOffset -= (_markerWidth - imageW);
          break;
        default:

          break;
      }

      switch (positioning.getAlignment()) {
        case Alignment.xMinYMid:
        case Alignment.xMidYMid:
        case Alignment.xMaxYMid:
          yOffset -= (_markerHeight - imageH) / 2;
          break;
        case Alignment.xMinYMax:
        case Alignment.xMidYMax:
        case Alignment.xMaxYMax:
          yOffset -= (_markerHeight - imageH);
          break;
        default:

          break;
      }

      if (!this.state.style.overflow) {
        this.setClipRect(xOffset, yOffset, _markerWidth, _markerHeight);
      }

      m.setValues();
      m.scale(xScale, yScale);
      this.canvas.concat(m);
    }
    else {


      m.translate(-_refX, -_refY);
      this.canvas.concat(m);

      if (!this.state.style.overflow) {
        this.setClipRect(0, 0, _markerWidth, _markerHeight);
      }
    }

    let compositing: boolean = this.pushLayer();

    await this.renderChildren(marker, false,context);

    if (compositing)
    await this.popLayer(marker);

    this.statePop();
  }

  private findInheritFromAncestorState(obj: SvgObject, newState?: RendererState): RendererState {
    if (newState == undefined) {
      newState = new RendererState();
    }
    this.updateStyle(newState, Style.getDefaultStyle());
    let ancestors: Array<SvgElementBase> = new Array();


    while (true) {
      if (obj instanceof SvgElementBase) {
        ancestors.splice(0, 0, obj as SvgElementBase);
      }
      if (obj.parent == null)
      break;
      // @ts-ignore
      obj = obj.parent as SvgObject;
    }
    for (let i = 0;i < ancestors.length; i++) {
      let ancestor = ancestors[i];
      this.updateStyleForElement(newState, ancestor);
    }

    newState.viewBox = this.state.viewBox;
    newState.viewPort = this.state.viewPort;

    return newState;
  }

  private checkForGradientsAndPatterns(obj: SvgElement) {
    if (this.state.style.fill instanceof PaintReference) {
      this.decodePaintReference(true, obj.boundingBox, this.state.style.fill);
    }
    if (this.state.style.stroke instanceof PaintReference) {
      this.decodePaintReference(false, obj.boundingBox, this.state.style.stroke);
    }
  }

  private decodePaintReference(isFill: boolean, boundingBox: Box, paintref: PaintReference) {
    let ref: SvgObject = this.document.resolveIRI(paintref.href);
    if (ref == null) {
      if (paintref.fallback != null) {
        this.setPaintColour(this.state, isFill, paintref.fallback);
      } else {
        if (isFill)
        this.state.hasFill = false;
        else
        this.state.hasStroke = false;
      }
      return;
    }
    if (ref instanceof SvgLinearGradient) {
      this.makeLinearGradient(isFill, boundingBox, ref as SvgLinearGradient);
    } else if (ref instanceof SvgRadialGradient) {
      this.makeRadialGradient(isFill, boundingBox, ref as SvgRadialGradient);
    } else if (ref instanceof SolidColor) {
      this.setSolidColor(isFill, ref as SolidColor);
    }

  }

  private makeLinearGradient(isFill: boolean, boundingBox: Box, gradient: SvgLinearGradient) {
    if (gradient.href != null)
    this.fillInChainedGradientFields(gradient, gradient.href);

    let userUnits: boolean = (gradient.gradientUnitsAreUser != null && gradient.gradientUnitsAreUser);
    let paint: Paint = isFill ? this.state.fillPaint : this.state.strokePaint;

    let _x1, _y1, _x2, _y2;
    if (userUnits) {
      let viewPortUser: Box = this.getCurrentViewPortInUserUnits();
      _x1 = (gradient.x1 != null) ? gradient.x1.floatValueX(this) : 0;
      _y1 = (gradient.y1 != null) ? gradient.y1.floatValueY(this) : 0;
      _x2 = (gradient.x2 != null) ? gradient.x2.floatValueX(this) : viewPortUser.width;
      _y2 = (gradient.y2 != null) ? gradient.y2.floatValueY(this) : 0;
    } else {
      _x1 = (gradient.x1 != null) ? gradient.x1.floatValue(this, 1) : 0;
      _y1 = (gradient.y1 != null) ? gradient.y1.floatValue(this, 1) : 0;
      _x2 = (gradient.x2 != null) ? gradient.x2.floatValue(this, 1) : 1;
      _y2 = (gradient.y2 != null) ? gradient.y2.floatValue(this, 1) : 0;
    }
    this.statePush();

    this.state = this.findInheritFromAncestorState(gradient);

    let m = new Matrix2D2();
    if (!userUnits && boundingBox != null) {
      m.translate(boundingBox.minX, boundingBox.minY);
      m.scale(boundingBox.width, boundingBox.height);
    }
    if (gradient.gradientTransform != null) {
      m.append(gradient.gradientTransform.a, gradient.gradientTransform.b, gradient.gradientTransform.c, gradient.gradientTransform.d, gradient.gradientTransform.tx, gradient.gradientTransform.ty);
    }

    let numStops = gradient.children.length;
    if (numStops == 0) {

      this.statePop();
      if (isFill)
      this.state.hasFill = false;
      else
      this.state.hasStroke = false;
      return;
    }
    let colours: string[] = new Array<string>(numStops);
    let positions: number[] = new Array<number>(numStops);
    let lastOffset = -1;
    let i = 0;
    for (let j = 0;j < gradient.children.length; j++) {
      let stop = gradient.children[j] as Stop;
      let offset: number = (stop.offset != null) ? stop.offset : 0;
      if (i == 0 || offset >= lastOffset) {
        positions[i] = offset;
        lastOffset = offset;
      } else {
        positions[i] = lastOffset;
      }
      this.statePush();

      this.updateStyleForElement(this.state, stop);
      let col: Colour = this.state.style.stopColor as Colour;
      if (col == null)
      col = Colour.BLACK;
      colours[i] = col.colour;
      i++;

      this.statePop();
    }

    if ((_x1 == _x2 && _y1 == _y2) || numStops == 1) {
      this.statePop();
      paint.setColor(colours[numStops - 1]);
      return;
    }

    this.statePop();


    let gr: CanvasGradient = this.canvas.getContext().createLinearGradient(_x1, _y1, _x2, _y2);

    for (let i = 0;i < positions.length; i++) {
      gr.addColorStop(positions[i], colours[i])
    }
    this.state.fillPaint.setGradient(gr)
    this.canvas.getContext().globalAlpha = this.state.style.fillOpacity
    paint.setAlpha(SVGRenderer.clamp255(this.state.style.fillOpacity));
  }

  private getHexOpacityColor(color: string, opacity: number) {
    opacity = Math.max(opacity, 0);
    opacity = Math.min(opacity, 1);
    color = color.replace(/\#/g, '').toUpperCase();
    if (color.length === 3) {
      let arr = color.split('');
      color = '';
      for (let i = 0; i < arr.length; i++) {
        color += (arr[i] + arr[i]); // 将简写的3位字符补全到6位字符
      }
    }
    let num = Math.round(255 * opacity); // 四舍五入
    let str = '';
    let arrHex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]; // 十六进制数组
    while (num > 0) {
      let mod = num % 16;
      num = (num - mod) / 16;
      str = arrHex[mod] + str;
    }
    if (str.length == 1)str = '0' + str;
    if (str.length == 0)str = '00';
    return `#${color + str}`;
  }

  private makeRadialGradient(isFill: boolean, boundingBox: Box, gradient: SvgRadialGradient) {
    if (gradient.href != null)
    this.fillInChainedGradientFields(gradient, gradient.href);

    let userUnits: boolean = (gradient.gradientUnitsAreUser != null && gradient.gradientUnitsAreUser);
    let paint: Paint = isFill ? this.state.fillPaint : this.state.strokePaint;

    let _cx, _cy, _r, _fx, _fy;
    if (userUnits) {
      let fiftyPercent: Length = new Length(50, Unit.percent);
      _cx = (gradient.cx != null) ? gradient.cx.floatValueX(this) : fiftyPercent.floatValueX(this);
      _cy = (gradient.cy != null) ? gradient.cy.floatValueY(this) : fiftyPercent.floatValueY(this);
      _r = (gradient.r != null) ? gradient.r.floatValue(this) : fiftyPercent.floatValue(this);
    }
    else {
      _cx = (gradient.cx != null) ? gradient.cx.floatValue(this, 1) : 0.5;
      _cy = (gradient.cy != null) ? gradient.cy.floatValue(this, 1) : 0.5;
      _r = (gradient.r != null) ? gradient.r.floatValue(this, 1) : 0.5;
    }


    this.statePush();


    this.state = this.findInheritFromAncestorState(gradient);


    let m = new Matrix2D2();
    if (!userUnits) {
      m.translate(boundingBox.minX, boundingBox.minY);
      m.scale(boundingBox.width, boundingBox.height);
    }
    if (gradient.gradientTransform != null) {
      m.append(gradient.gradientTransform.a, gradient.gradientTransform.b, gradient.gradientTransform.c, gradient.gradientTransform.d, gradient.gradientTransform.tx, gradient.gradientTransform.ty);
    }


    let numStops = gradient.children.length;
    if (numStops == 0) {

      this.statePop();
      if (isFill)
      this.state.hasFill = false;
      else
      this.state.hasStroke = false;
      return;
    }

    let colours: string[] = new Array<string>(numStops);
    let positions: number[] = new Array<number>(numStops);
    let i = 0;
    let lastOffset = -1;
    for (let j = 0;i < gradient.children.length; j++) {
      let child = gradient.children[j]
      let stop = child as Stop;
      let offset = (stop.offset != null) ? stop.offset : 0;
      if (i == 0 || offset >= lastOffset) {
        positions[i] = offset;
        lastOffset = offset;
      } else {
        positions[i] = lastOffset;
      }

      this.statePush();

      this.updateStyleForElement(this.state, stop);
      let col = this.state.style.stopColor as Colour;
      if (col == null)
      col = Colour.BLACK;
      colours[i] = col.colour;
      i++;

      this.statePop();
    }


    if (_r == 0 || numStops == 1) {
      this.statePop();
      paint.setColor(colours[numStops - 1]);
      return;
    }

    this.statePop();


    let gr: CanvasGradient = this.canvas.getContext().createRadialGradient(_cx, _cy, _r, 0, 0, 0);
    for (let i = 0;i < positions.length; i++) {
      gr.addColorStop(positions[i], colours[i]);
    }
    this.state.fillPaint.setGradient(gr)
    this.canvas.getContext().globalAlpha = this.state.style.fillOpacity
    paint.setAlpha(SVGRenderer.clamp255(this.state.style.fillOpacity));
  }

  private fillInChainedGradientFields(gradient: GradientElement, href: string) {

    let ref: SvgObject = gradient.document.resolveIRI(href);
    if (ref == null) {

      return;
    }
    if (!(ref instanceof GradientElement)) {
      return;
    }
    if (ref == gradient) {
      return;
    }

    let grRef = ref as GradientElement;

    if (gradient.gradientUnitsAreUser == null)
    gradient.gradientUnitsAreUser = grRef.gradientUnitsAreUser;
    if (gradient.gradientTransform == null)
    gradient.gradientTransform = grRef.gradientTransform;
    if (gradient.spreadMethod == null)
    gradient.spreadMethod = grRef.spreadMethod;
    if (gradient.children.length == 0)
    gradient.children = grRef.children;

    try {
      if (gradient instanceof SvgLinearGradient) {
        this.fillInChainedGradientFields2(gradient, ref as SvgLinearGradient);
      } else {
        this.fillInChainedGradientFields3(gradient as SvgRadialGradient, ref as SvgRadialGradient);
      }
    }
    catch (e) {
    }

    if (grRef.href != null)
    this.fillInChainedGradientFields(gradient, grRef.href);
  }

  private fillInChainedGradientFields2(gradient: SvgLinearGradient, grRef: SvgLinearGradient) {
    if (gradient.x1 == null)
    gradient.x1 = grRef.x1;
    if (gradient.y1 == null)
    gradient.y1 = grRef.y1;
    if (gradient.x2 == null)
    gradient.x2 = grRef.x2;
    if (gradient.y2 == null)
    gradient.y2 = grRef.y2;
  }

  private fillInChainedGradientFields3(gradient: SvgRadialGradient, grRef: SvgRadialGradient) {
    if (gradient.cx == null)
    gradient.cx = grRef.cx;
    if (gradient.cy == null)
    gradient.cy = grRef.cy;
    if (gradient.r == null)
    gradient.r = grRef.r;
    if (gradient.fx == null)
    gradient.fx = grRef.fx;
    if (gradient.fy == null)
    gradient.fy = grRef.fy;
  }

  private setSolidColor(isFill: boolean, ref: SolidColor) {

    if (isFill) {
      if (this.isSpecified(ref.baseStyle, Style.SPECIFIED_SOLID_COLOR)) {
        this.state.style.fill = ref.baseStyle.solidColor;
        this.state.hasFill = (ref.baseStyle.solidColor != null);
      }

      if (this.isSpecified(ref.baseStyle, Style.SPECIFIED_SOLID_OPACITY)) {
        this.state.style.fillOpacity = ref.baseStyle.solidOpacity;
      }


      if (this.isSpecified(ref.baseStyle, Style.SPECIFIED_SOLID_COLOR | Style.SPECIFIED_SOLID_OPACITY)) {

        this.setPaintColour(this.state, isFill, this.state.style.fill);
      }
    }
    else {
      if (this.isSpecified(ref.baseStyle, Style.SPECIFIED_SOLID_COLOR)) {
        this.state.style.stroke = ref.baseStyle.solidColor;
        this.state.hasStroke = (ref.baseStyle.solidColor != null);
      }

      if (this.isSpecified(ref.baseStyle, Style.SPECIFIED_SOLID_OPACITY)) {
        this.state.style.strokeOpacity = ref.baseStyle.solidOpacity;
      }


      if (this.isSpecified(ref.baseStyle, Style.SPECIFIED_SOLID_COLOR | Style.SPECIFIED_SOLID_OPACITY)) {

        this.setPaintColour(this.state, isFill, this.state.style.stroke);
      }
    }

  }

  private checkForClipPath(obj: SvgElement, boundingBox?: Box) {
    if (boundingBox == undefined) {
      boundingBox = obj.boundingBox;
    }
    if (this.state.style.clipPath == null)
    return;

    let combinedPath = this.calculateClipPath(obj, boundingBox);
    if (combinedPath != null) {
      this.combinedPath = combinedPath;
      this.canvas.clipPath(combinedPath);
    }
  }

  private calculateClipPath(obj: SvgElement, boundingBox: Box): Path2D {

    let ref: SvgObject = obj.document.resolveIRI(this.state.style.clipPath);
    if (ref == null) {
      return null;
    }

    let clipPath: ClipPath = ref as ClipPath;

    this.stateStack.push(this.state);

    this.state = this.findInheritFromAncestorState(clipPath);

    let userUnits: boolean = (clipPath.clipPathUnitsAreUser == null || clipPath.clipPathUnitsAreUser);
    let m: Matrix2D2 = new Matrix2D2();
    if (!userUnits) {
      m.translate(boundingBox.minX, boundingBox.minY);
      m.scale(boundingBox.width, boundingBox.height);
    }
    if (clipPath.transform != null) {
      m.append(clipPath.transform.a, clipPath.transform.b, clipPath.transform.c, clipPath.transform.d, clipPath.transform.tx, clipPath.transform.ty);
    }

    let combinedPath: Path2D = new Path2D();
    for (let i = 0;i < clipPath.children.length; i++) {
      let child = clipPath.children[i];
      if (!(child instanceof SvgElement))
      continue;
      combinedPath = this.objectToPath(child as SvgElement, true);
    }

    if (this.state.style.clipPath != null) {
      let clipClipPath: Path2D = this.calculateClipPath(clipPath, clipPath.boundingBox);
      combinedPath.addPath(clipClipPath);
    }

    this.canvas.getContext().transform(m.a, m.b, m.c, m.d, m.e, m.f)

    this.state = this.stateStack.pop();

    return combinedPath;
  }

  private objectToPath(obj: SvgElement, allowUse: boolean): Path2D {

    this.stateStack.push(this.state);
    this.state = new RendererState(this.state);

    this.updateStyleForElement(this.state, obj);

    if (!this.display() || !this.visible()) {
      this.state = this.stateStack.pop();
      return null;
    }

    let path: Path2D = null;

    if (obj instanceof Use) {
      if (!allowUse) {
      }
      let useElement: Use = obj as Use;
      let ref: SvgObject = obj.document.resolveIRI(useElement.href);
      if (ref == null) {
        this.state = this.stateStack.pop();
        return null;
      }
      if (!(ref instanceof SvgElement)) {
        this.state = this.stateStack.pop();
        return null;
      }
      path = this.objectToPath(ref as SvgElement, false);
      if (path == null)
      return null;

    }
    else if (obj instanceof GraphicsElement) {
      let elem: GraphicsElement = obj;

      if (obj instanceof Path2) {
        let pathElem: Path2 = obj as Path2;
        path = new Path2D(pathElem.d.d);
      }
      else if (obj instanceof Rect2)
      path = this.makePathAndBoundingBoxRect(obj);
      else if (obj instanceof Circle2)
      path = this.makePathAndBoundingBoxCircle(obj as Circle2);
      else if (obj instanceof Ellipse2)
      path = this.makePathAndBoundingBoxEllipse(obj as Ellipse2);
      else if (obj instanceof PolyLine)
      path = this.makePathAndBoundingBoxPolyLine(obj as PolyLine);

      if (path == null)
      return null;
    }
    else if (obj instanceof Text) {
      let textElem: Text2 = obj as Text2;
      path = this.makePathAndBoundingBoxText(textElem);
    }
    else {
      return null;
    }

    if (this.state.style.clipPath != null) {
      let childsClipPath: Path2D = this.calculateClipPath(obj, obj.boundingBox);
    }


    this.state = this.stateStack.pop();

    return path;
  }

  private checkForClipPath_OldStyle(obj: SvgElement, boundingBox: Box) {


    let ref: SvgObject = obj.document.resolveIRI(this.state.style.clipPath);
    if (ref == null) {
      return;
    }

    let clipPath: ClipPath = ref as ClipPath;


    if (clipPath.children.length == 0) {
      this.canvas.clipRect(0, 0, 0, 0);
      return;
    }

    let userUnits: boolean = (clipPath.clipPathUnitsAreUser == null || clipPath.clipPathUnitsAreUser);

    if ((obj instanceof Group) && !userUnits) {
      return;
    }

    this.clipStatePush();

    if (!userUnits) {
      let m = new Matrix2D2();
      m.translate(boundingBox.minX, boundingBox.minY);
      m.scale(boundingBox.width, boundingBox.height);
      this.canvas.concat(m);
    }
    if (clipPath.transform != null) {
      this.canvas.concat(clipPath.transform);
    }


    this.state = this.findInheritFromAncestorState(clipPath);

    this.checkForClipPath(clipPath);

    let combinedPath: Path2D = new Path2D();
    for (let i = 0;i < clipPath.children.length; i++) {
      let child = clipPath.children[i];
      this.addObjectToClip(clipPath, true, combinedPath, new Matrix2D2());
    }
    this.canvas.clipPath(combinedPath);

    this.clipStatePop();
  }

  private addObjectToClip(obj: SvgObject, allowUse: boolean, combinedPath: Path2D, combinedPathMatrix: Matrix2D2) {
    if (!this.display())
    return;


    this.clipStatePush();

    if (obj instanceof Use) {
      if (allowUse) {
        this.addObjectToClip(obj as Use, true, combinedPath, combinedPathMatrix);
      } else {
      }
    } else if (obj instanceof Path2) {
      this.addObjectToClip(obj as Path2, false, combinedPath, combinedPathMatrix);
    } else if (obj instanceof Text) {
      this.addObjectToClip(obj as Text2, false, combinedPath, combinedPathMatrix);
    } else if (obj instanceof GraphicsElement) {
      this.addObjectToClip(obj as GraphicsElement, false, combinedPath, combinedPathMatrix);
    } else {
    }


    this.clipStatePop();
  }

  private clipStatePush() {

    this.stateStack.push(this.state);
    this.state = new RendererState(this.state);
  }

  private clipStatePop() {
    this.canvas.restore();
    this.state = this.stateStack.pop();
  }

  private addObjectToClip2(obj: Path2, combinedPath: Path2D, combinedPathMatrix: Matrix2D2) {
    this.updateStyleForElement(this.state, obj);

    if (!this.display())
    return;
    if (!this.visible())
    return;

    if (obj.transform != null)
    combinedPathMatrix.appendMatrix(obj.transform);

    let path: Path2D = (new PathConverter(obj.d)).getPath();

    this.checkForClipPath(obj);


    combinedPath.addPath(path);
  }

  private addObjectToClip3(obj: GraphicsElement, combinedPath: Path2D, combinedPathMatrix: Matrix2D2) {
    this.updateStyleForElement(this.state, obj);

    if (!this.display())
    return;
    if (!this.visible())
    return;

    if (obj.transform != null)
    combinedPathMatrix.append(obj.transform.a, obj.transform.b, obj.transform.c, obj.transform.d, obj.transform.tx, obj.transform.ty);

    let path: Path2D;
    if (obj instanceof Rect2)
    path = this.makePathAndBoundingBoxRect(obj as Rect2);
    else if (obj instanceof Circle2)
    path = this.makePathAndBoundingBoxCircle(obj as Circle2);
    else if (obj instanceof Ellipse2)
    path = this.makePathAndBoundingBoxEllipse(obj as Ellipse2);
    else if (obj instanceof PolyLine)
    path = this.makePathAndBoundingBoxPolyLine(obj as PolyLine);
    else
    return;

    if (path == null)
    return;

    this.checkForClipPath(obj);

    combinedPath.addPath(path);
  }

  private addObjectToClip4(obj: Use, combinedPath: Path2D, combinedPathMatrix: Matrix2D2) {
    this.updateStyleForElement(this.state, obj);

    if (!this.display())
    return;
    if (!this.visible())
    return;

    if (obj.transform != null)
    combinedPathMatrix.append(obj.transform.a, obj.transform.b, obj.transform.c, obj.transform.d, obj.transform.tx, obj.transform.ty);


    let ref: SvgObject = obj.document.resolveIRI(obj.href);
    if (ref == null) {
      return;
    }

    this.checkForClipPath(obj);

    this.addObjectToClip(ref, false, combinedPath, combinedPathMatrix);
  }

  private addObjectToClip5(obj: Text2, combinedPath: Path2D, combinedPathMatrix: Matrix2D2) {
    this.updateStyleForElement(this.state, obj);

    if (!this.display())
    return;

    if (obj.transform != null)
    combinedPathMatrix.append(obj.transform.a, obj.transform.b, obj.transform.c, obj.transform.d, obj.transform.tx, obj.transform.ty);


    let x = (obj.x == null || obj.x.length == 0) ? 0 : obj.x[0].floatValueX(this);
    let y = (obj.y == null || obj.y.length == 0) ? 0 : obj.y[0].floatValueY(this);
    let dx = (obj.dx == null || obj.dx.length == 0) ? 0 : obj.dx[0].floatValueX(this);
    let dy = (obj.dy == null || obj.dy.length == 0) ? 0 : obj.dy[0].floatValueY(this);


    this.checkForClipPath(obj);


  }

  private makePathAndBoundingBoxLine(obj: Line2): Path2D {
    let x1 = (obj.x1 == null) ? 0 : obj.x1.floatValueX(this);
    let y1 = (obj.y1 == null) ? 0 : obj.y1.floatValueY(this);
    let x2 = (obj.x2 == null) ? 0 : obj.x2.floatValueX(this);
    let y2 = (obj.y2 == null) ? 0 : obj.y2.floatValueY(this);

    if (obj.boundingBox == null) {
      obj.boundingBox = new Box(Math.min(x1, x2), Math.min(y1, y2), Math.abs(x2 - x1), Math.abs(y2 - y1));
    }

    let p: Path2D = new Path2D();
    p.moveTo(x1, y1);
    p.lineTo(x2, y2);
    return p;
  }

  private makePathAndBoundingBoxRect(obj: Rect2): Path2D {
    let x, y, w, h, rx, ry;

    if (obj.rx == null && obj.ry == null) {
      rx = 0;
      ry = 0;
    } else if (obj.rx == null) {
      rx = ry = obj.ry.floatValueY(this);
    } else if (obj.ry == null) {
      rx = ry = obj.rx.floatValueX(this);
    } else {
      rx = obj.rx.floatValueX(this);
      ry = obj.ry.floatValueY(this);
    }
    rx = Math.min(rx, obj.width.floatValueX(this) / 2);
    ry = Math.min(ry, obj.height.floatValueY(this) / 2);
    x = (obj.x != null) ? obj.x.floatValueX(this) : 0;
    y = (obj.y != null) ? obj.y.floatValueY(this) : 0;
    w = obj.width.floatValueX(this);
    h = obj.height.floatValueY(this);

    if (obj.boundingBox == null) {
      obj.boundingBox = new Box(x, y, w, h);
    }

    let right = x + w;
    let bottom = y + h;

    let p: Path2D = new Path2D();
    if (rx == 0 || ry == 0) {

      p.moveTo(x, y);
      p.lineTo(right, y);
      p.lineTo(right, bottom);
      p.lineTo(x, bottom);
      p.lineTo(x, y);
    }
    else {


      let cpx = rx * SVGRenderer.BEZIER_ARC_FACTOR;
      let cpy = ry * SVGRenderer.BEZIER_ARC_FACTOR;

      p.moveTo(x, y + ry);
      p.bezierCurveTo(x, y + ry - cpy, x + rx - cpx, y, x + rx, y);
      p.lineTo(right - rx, y);
      p.bezierCurveTo(right - rx + cpx, y, right, y + ry - cpy, right, y + ry);
      p.lineTo(right, bottom - ry);
      p.bezierCurveTo(right, bottom - ry + cpy, right - rx + cpx, bottom, right - rx, bottom);
      p.lineTo(x + rx, bottom);
      p.bezierCurveTo(x + rx - cpx, bottom, x, bottom - ry + cpy, x, bottom - ry);
      p.lineTo(x, y + ry);
    }
    p.closePath();
    return p;
  }

  private makePathAndBoundingBoxCircle(obj: Circle2): Path2D {
    let cx = (obj.cx != null) ? obj.cx.floatValueX(this) : 0;
    let cy = (obj.cy != null) ? obj.cy.floatValueY(this) : 0;
    let r = obj.r.floatValue(this);

    let left = cx - r;
    let top = cy - r;
    let right = cx + r;
    let bottom = cy + r;

    if (obj.boundingBox == null) {
      obj.boundingBox = new Box(left, top, r * 2, r * 2);
    }

    let cp = r * SVGRenderer.BEZIER_ARC_FACTOR;

    let p: Path2D = new Path2D();
    p.moveTo(cx, top);
    p.bezierCurveTo(cx + cp, top, right, cy - cp, right, cy);
    p.bezierCurveTo(right, cy + cp, cx + cp, bottom, cx, bottom);
    p.bezierCurveTo(cx - cp, bottom, left, cy + cp, left, cy);
    p.bezierCurveTo(left, cy - cp, cx - cp, top, cx, top);
    p.closePath();
    return p;
  }

  private makePathAndBoundingBoxEllipse(obj: Ellipse2): Path2D {
    let cx = (obj.cx != null) ? obj.cx.floatValueX(this) : 0;
    let cy = (obj.cy != null) ? obj.cy.floatValueY(this) : 0;
    let rx = obj.rx.floatValueX(this);
    let ry = obj.ry.floatValueY(this);

    let left = cx - rx;
    let top = cy - ry;
    let right = cx + rx;
    let bottom = cy + ry;

    if (obj.boundingBox == null) {
      obj.boundingBox = new Box(left, top, rx * 2, ry * 2);
    }

    let cpx = rx * SVGRenderer.BEZIER_ARC_FACTOR;
    let cpy = ry * SVGRenderer.BEZIER_ARC_FACTOR;

    let p: Path2D = new Path2D();
    p.moveTo(cx, top);
    p.bezierCurveTo(cx + cpx, top, right, cy - cpy, right, cy);
    p.bezierCurveTo(right, cy + cpy, cx + cpx, bottom, cx, bottom);
    p.bezierCurveTo(cx - cpx, bottom, left, cy + cpy, left, cy);
    p.bezierCurveTo(left, cy - cpy, cx - cpx, top, cx, top);
    p.closePath();
    return p;
  }

  private makePathAndBoundingBoxPolyLine(obj: PolyLine): Path2D {
    let numPoints: number = (obj.points != null) ? obj.points.length : 0;
    if (numPoints % 2 != 0){
      return null;
    }
    let pathCommand = '';
    if (numPoints > 0) {
      let i = 0;
      while (numPoints >= 2) {
        if (i == 0){
          pathCommand += 'M' + obj.points[i] + ',' + obj.points[i + 1];
        }
        else{
          pathCommand += 'L' + obj.points[i] + ',' + obj.points[i + 1];
        }
        i += 2;
        numPoints -= 2;
      }
      if (obj instanceof Polygon){
        pathCommand += 'Z';
      }
    }
    return new Path2D(pathCommand);
  }

  private async fillWithPattern(obj: SvgElement, path: Path2D, pattern: Pattern,context?:common.UIAbilityContext) {
    let patternUnitsAreUser: boolean = (pattern.patternUnitsAreUser != null && pattern.patternUnitsAreUser);
    let x, y, w, h;
    let originX, originY;
    let objFillOpacity = this.state.style.fillOpacity;

    if (pattern.href != null)
    this.fillInChainedPatternFields(pattern, pattern.href);

    if (patternUnitsAreUser) {
      x = (pattern.x != null) ? pattern.x.floatValueX(this) : 0;
      y = (pattern.y != null) ? pattern.y.floatValueY(this) : 0;
      w = (pattern.width != null) ? pattern.width.floatValueX(this) : 0;
      h = (pattern.height != null) ? pattern.height.floatValueY(this) : 0;
    } else {
      x = (pattern.x != null) ? pattern.x.floatValue(this, 1) : 0;
      y = (pattern.y != null) ? pattern.y.floatValue(this, 1) : 0;
      w = (pattern.width != null) ? pattern.width.floatValue(this, 1) : 0;
      h = (pattern.height != null) ? pattern.height.floatValue(this, 1) : 0;
      x = obj.boundingBox.minX + x * obj.boundingBox.width;
      y = obj.boundingBox.minY + y * obj.boundingBox.height;
      w *= obj.boundingBox.width;
      h *= obj.boundingBox.height;
    }
    if (w == 0 || h == 0)
    return;

    let positioning: PreserveAspectRatio = (pattern.preserveAspectRatio != null) ? pattern.preserveAspectRatio : PreserveAspectRatio.LETTERBOX;

    this.statePush();

    this.canvas.clipPath(path);

    let baseState: RendererState = new RendererState();
    this.updateStyle(baseState, Style.getDefaultStyle());
    baseState.style.overflow = false;

    this.state = this.findInheritFromAncestorState(pattern, baseState);

    let patternArea: Box = obj.boundingBox;

    if (pattern.patternTransform != null) {
      this.canvas.concat(pattern.patternTransform);
    }

    originX = x + Math.round((patternArea.minX - x) / w) * w;
    originY = y + Math.round((patternArea.minY - y) / h) * h;

    let right: number = patternArea.maxX();
    let bottom: number = patternArea.maxY();
    let stepViewBox: Box = new Box(0, 0, w, h);

    let compositing: boolean = this.pushLayer(objFillOpacity);

    for (let stepY = originY; stepY < bottom; stepY += h) {
      for (let stepX = originX; stepX < right; stepX += w) {
        stepViewBox.minX = stepX;
        stepViewBox.minY = stepY;

        this.statePush();

        if (!this.state.style.overflow) {
          this.setClipRect(stepViewBox.minX, stepViewBox.minY, stepViewBox.width, stepViewBox.height);
        }

        if (pattern.viewBox != undefined && pattern.viewBox != null) {
          this.canvas.concat(this.calculateViewBoxTransform(stepViewBox, pattern.viewBox, positioning));
        } else {
          let patternContentUnitsAreUser: boolean = (pattern.patternContentUnitsAreUser == null || pattern.patternContentUnitsAreUser);
          this.canvas.translate(stepX, stepY);
          if (!patternContentUnitsAreUser) {
            this.canvas.scale(obj.boundingBox.width, obj.boundingBox.height);
          }
        }

        for (let i = 0;i < pattern.children.length; i++) {
          let child = pattern.children[i];
          await this.render(child,context)
        }

        this.statePop()
      }
    }

    if (compositing)
    await this.popLayer(pattern);

    this.statePop();
  }

  private fillInChainedPatternFields(pattern: Pattern, href: string) {

    let ref: SvgObject = pattern.document.resolveIRI(href);
    if (ref == null) {

      return;
    }
    if (!(ref instanceof Pattern)) {
      return;
    }
    if (ref == pattern) {
      return;
    }

    let pRef: Pattern = ref as Pattern;

    if (pattern.patternUnitsAreUser == null)
    pattern.patternUnitsAreUser = pRef.patternUnitsAreUser;
    if (pattern.patternContentUnitsAreUser == null)
    pattern.patternContentUnitsAreUser = pRef.patternContentUnitsAreUser;
    if (pattern.patternTransform == null)
    pattern.patternTransform = pRef.patternTransform;
    if (pattern.x == null)
    pattern.x = pRef.x;
    if (pattern.y == null)
    pattern.y = pRef.y;
    if (pattern.width == null)
    pattern.width = pRef.width;
    if (pattern.height == null)
    pattern.height = pRef.height;

    if (pattern.children.length == 0)
    pattern.children = pRef.children;
    if (pattern.viewBox == null)
    pattern.viewBox = pRef.viewBox;
    if (pattern.preserveAspectRatio == null) {
      pattern.preserveAspectRatio = pRef.preserveAspectRatio;
    }

    if (pRef.href != null)
    this.fillInChainedPatternFields(pattern, pRef.href);
  }

  private async renderMask(mask: Mask, obj: SvgElement, originalObjBBox: Box, context?:common.UIAbilityContext) {

    if (originalObjBBox == null) {
      originalObjBBox = new Box(0, 0, 200, 200)
    }
    let maskUnitsAreUser: boolean = (mask.maskUnitsAreUser != null && mask.maskUnitsAreUser);
    let w, h;
    if (maskUnitsAreUser) {
      w = (mask.width != null) ? mask.width.floatValueX(this) : originalObjBBox.width;
      h = (mask.height != null) ? mask.height.floatValueY(this) : originalObjBBox.height;

    } else {
      w = (mask.width != null) ? mask.width.floatValue(this, 1) : 1.2;
      h = (mask.height != null) ? mask.height.floatValue(this, 1) : 1.2;

      w *= originalObjBBox.width;
      h *= originalObjBBox.height;
    }
    if (w == 0 || h == 0)
    return;
    this.statePush();
    this.state = this.findInheritFromAncestorState(mask);

    this.state.style.opacity = 1;

    let compositing: boolean = this.pushLayer();

    this.canvas.save();

    let maskContentUnitsAreUser: boolean = (mask.maskContentUnitsAreUser == null || mask.maskContentUnitsAreUser);
    if (!maskContentUnitsAreUser) {
      this.canvas.translate(originalObjBBox.minX, originalObjBBox.minY);
      this.canvas.scale(originalObjBBox.width, originalObjBBox.height);
    }
    await this.renderChildren(mask, false,context);

    this.canvas.restore();

    if (compositing)
    await this.popLayer(obj, originalObjBBox);

    this.statePop();
  }
}


class RendererState {
  style: Style;
  hasFill: boolean = true;
  hasStroke: boolean = false;
  viewPort: Box;
  viewBox: Box;
  spacePreserve: boolean;
  fillPaint: Paint;
  strokePaint: Paint;

  constructor(copy?: RendererState) {
    if (copy != undefined) {
      this.hasFill = copy.hasFill;
      this.hasStroke = copy.hasStroke;
      this.fillPaint = new Paint(copy.fillPaint);
      this.strokePaint = new Paint(copy.strokePaint);
      if (copy.viewPort != null)
      this.viewPort = new Box(copy.viewPort.minX, copy.viewPort.minY, copy.viewPort.width, copy.viewPort.height);
      if (copy.viewBox != null)
      this.viewBox = new Box(copy.viewBox.minX, copy.viewBox.minY, copy.viewBox.width, copy.viewBox.height);
      this.spacePreserve = copy.spacePreserve;
      this.style = copy.style;
    } else {
      this.fillPaint = new Paint();
      this.fillPaint.setStroke(false);

      this.strokePaint = new Paint();
      this.strokePaint.setStroke(true);

      this.style = Style.getDefaultStyle();
    }

  }
}

abstract class TextProcessor {
  public doTextContainer(obj: TextContainer): boolean {
    return true;
  }

  public abstract processText(text: string, state: RendererState, canvas: CanvasImpl);
}


export class PathConverter implements PathInterface {
  path: Path2D;
  lastX: number = 0;
  lastY: number = 0;

  constructor(pathDef: PathDefinition) {
    if (pathDef == null)
    return;
    this.path = new Path2D();
    pathDef.enumeratePath(this);
  }

  getPath(): Path2D {
    return this.path;
  }

  public moveTo(x: number, y: number) {
    this.path.moveTo(x, y);
    this.lastX = x;
    this.lastY = y;
  }

  public lineTo(x: number, y: number) {
    this.path.lineTo(x, y);
    this.lastX = x;
    this.lastY = y;
  }

  public cubicTo(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    this.path.bezierCurveTo(x1, y1, x2, y2, x3, y3);
    this.lastX = x3;
    this.lastY = y3;
  }

  public quadTo(x1: number, y1: number, x2: number, y2: number) {
    this.path.quadraticCurveTo(x1, y1, x2, y2);
    this.lastX = x2;
    this.lastY = y2;
  }

  public arcTo(rx: number, ry: number, xAxisRotation: number, largeArcFlag: boolean, sweepFlag: boolean, x: number, y: number) {
    SVGRenderer.arcTo(this.lastX, this.lastY, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y, this);
    this.lastX = x;
    this.lastY = y;
  }

  public close() {
    this.path.closePath();
  }
}

class MarkerVector {
  x: number;
  y: number;
  dx: number = 0
  dy: number = 0;
  isAmbiguous: boolean = false;

  constructor(x: number, y: number, dx: number, dy: number) {
    this.x = x;
    this.y = y;

    let len = Math.sqrt(dx * dx + dy * dy);
    if (len != 0) {
      this.dx = (dx / len);
      this.dy = (dy / len);
    }
  }

  add(x: number, y: number) {


    let dx = (x - this.x);
    let dy = (y - this.y);
    let len = Math.sqrt(dx * dx + dy * dy);
    if (len != 0) {
      dx = (dx / len);
      dy = (dy / len);
    }

    if (dx == -this.dx && dy == -this.dy) {
      this.isAmbiguous = true;

      this.dx = -dy;
      this.dy = dx;
    } else {
      this.dx += dx;
      this.dy += dy;
    }
  }

  addMarkerVector(v2: MarkerVector) {

    if (v2.dx == -this.dx && v2.dy == -this.dy) {
      this.isAmbiguous = true;

      this.dx = -v2.dy;
      this.dy = v2.dx;
    } else {
      this.dx += v2.dx;
      this.dy += v2.dy;
    }
  }
}

class MarkerPositionCalculator implements PathInterface {
  private markers = new Array<MarkerVector>();
  private startX: number;
  private startY: number;
  private lastPos: MarkerVector = null;
  private startArc: boolean = false;
  private normalCubic = true;
  private subpathStartIndex = -1;
  private closepathReAdjustPending: boolean;

  constructor(pathDef: PathDefinition) {
    if (pathDef == null)
    return;


    pathDef.enumeratePath(this);

    if (this.closepathReAdjustPending) {


      this.lastPos.addMarkerVector(this.markers[this.subpathStartIndex]);

      this.markers.splice(this.subpathStartIndex, 1, this.lastPos);
      this.closepathReAdjustPending = false;
    }

    if (this.lastPos != null) {
      this.markers.push(this.lastPos);
    }
  }

  getMarkers(): Array<MarkerVector> {
    return this.markers;
  }

  public moveTo(x: number, y: number) {
    if (this.closepathReAdjustPending) {


      this.lastPos.addMarkerVector(this.markers[this.subpathStartIndex]);

      this.markers.splice(this.subpathStartIndex, 1, this.lastPos);
      this.closepathReAdjustPending = false;
    }
    if (this.lastPos != null) {
      this.markers.push(this.lastPos);
    }
    this.startX = x;
    this.startY = y;
    this.lastPos = new MarkerVector(x, y, 0, 0);
    this.subpathStartIndex = this.markers.length;
  }

  public lineTo(x: number, y: number) {
    this.lastPos.add(x, y);
    this.markers.push(this.lastPos);
    this.lastPos = new MarkerVector(x, y, x - this.lastPos.x, y - this.lastPos.y);
    this.closepathReAdjustPending = false;
  }

  public cubicTo(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    if (this.normalCubic || this.startArc) {
      this.lastPos.add(x1, y1);
      this.markers.push(this.lastPos);
      this.startArc = false;
    }
    this.lastPos = new MarkerVector(x3, y3, x3 - x2, y3 - y2);
    this.closepathReAdjustPending = false;
  }

  public quadTo(x1: number, y1: number, x2: number, y2: number) {
    this.lastPos.add(x1, y1);
    this.markers.push(this.lastPos);
    this.lastPos = new MarkerVector(x2, y2, x2 - x1, y2 - y1);
    this.closepathReAdjustPending = false;
  }

  public arcTo(rx: number, ry: number, xAxisRotation: number, largeArcFlag: boolean, sweepFlag: boolean, x: number, y: number) {

    this.startArc = true;
    this.normalCubic = false;
    SVGRenderer.arcTo(this.lastPos.x, this.lastPos.y, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y, this);
    this.normalCubic = true;
    this.closepathReAdjustPending = false;
  }

  public close() {
    this.markers.push(this.lastPos);
    this.lineTo(this.startX, this.startY);


    this.closepathReAdjustPending = true;
  }
}

class PlainTextDrawer extends TextProcessor {
  private x: number = 0;
  private y: number = 0;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }

  public processText(text: string, state: RendererState, canvas: CanvasImpl) {

    if (this.visible(state)) {
      // Android/Skia divides letterspacing and puts half before and after each letter.
      // We need to readjust initial text X position to counter that.
      let letterspacingAdj = 0;
      if (state.hasFill)
      canvas.drawText(text, this.x - letterspacingAdj, this.y, state.fillPaint);
      if (state.hasStroke)
      canvas.drawText(text, this.x - letterspacingAdj, this.y, state.strokePaint);
    }

    // Update the current text position
    this.x += canvas.getContext().measureText(text).width;
  }

  private visible(state: RendererState): boolean {
    if (state.style.visibility != null) {
      return state.style.visibility;
    }
    return true;
  }
}

