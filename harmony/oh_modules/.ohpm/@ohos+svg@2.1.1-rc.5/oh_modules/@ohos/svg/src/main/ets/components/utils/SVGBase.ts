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

import MyRect from './Rect';
import { CanvasImpl } from './mini_canvas';
import { Style } from './Style'
import { SVGParser } from './SVGParser'
import { RenderOptions } from '../RenderOptions'
import { Rule, Ruleset, Source } from './CSSParser'
import { SVGParseException } from '../SVGParseException'
import { PreserveAspectRatio } from '../PreserveAspectRatio'
import { SVGParserImpl } from './SVGParserImpl'
import { PathConverter, SVGRenderer } from './SVGRenderer'
import { RenderOptionsBase } from './RenderOptionsBase'
import { SVGExternalFileResolver } from '../SVGExternalFileResolver'
import { Matrix2D2 } from './Matrix'
import util from '@ohos.util';

import { GlobalContext } from '../GlobalContext';
import common from '@ohos.app.ability.common';

export class SVGBase {
  static DEFAULT_PICTURE_WIDTH: number = 512;
  static DEFAULT_PICTURE_HEIGHT: number = 512;
  static SQRT2: number = 1.414213562373095;
  static externalFileResolverSingleton: SVGExternalFileResolver = null;
  static enableInternalEntitiesSingleton: boolean = true;
  externalFileResolver: SVGExternalFileResolver = new SVGExternalFileResolver();
  enableInternalEntities: boolean;
  rootElement: Svg = null;
  title: string = "";
  desc: string = "";
  renderDPI: number = 96;
  cssRules: Ruleset = new Ruleset();
  idToElementMap: Map<string, SvgElementBase> = new Map <string, SvgElementBase>();

  constructor(enableInternalEntities: boolean, fileResolver: SVGExternalFileResolver) {
    this.enableInternalEntities = enableInternalEntities;
    this.externalFileResolver = fileResolver;
  }

  public static getFromString(svg: string): SVGBase {
    return this.createParser().parseString(svg);
  }

  public static getFromResource(media: Resource, callback, context?: common.UIAbilityContext) {
    if(context != undefined){

    }else {
      context = GlobalContext.getContext().getObject("context") as common.UIAbilityContext;
    }
    context.resourceManager.getMediaContent(media.id, (error, value) => {
      if (error != null) {
        console.info("media get error:" + error)
        throw new Error("未找到media下的svg")
      } else {
        let data = this.unit8ArrayToString(value);
        let svgBase = this.getFromString(data)
        callback(svgBase)
      }
    })
  }

  public static unit8ArrayToString(fileData): string {
    let textDecoder = util.TextDecoder.create("utf-8", { ignoreBOM: true });
    return textDecoder.decodeWithStream(fileData, { stream: false })
  }

  public static getFromRawfile(rawfileName: string, callback, context?:common.UIAbilityContext) {
    if(context != undefined){

    }else {
      context = GlobalContext.getContext().getObject("context") as common.UIAbilityContext;
    }
    context.resourceManager.getRawFileContent(rawfileName, (error, value) => {
      if (error != null) {
        throw new Error("未找到rawfile下的svg")
      } else {
        let data = this.unit8ArrayToString(value);
        let svgBase = this.getFromString(data)
        callback(svgBase)
      }
    })
  }

  public setRenderDPI(dpi: number) {
    this.renderDPI = dpi;
  }

  public getRenderDPI(): number {
    return this.renderDPI;
  }

  protected static createParser(): SVGParser {
    return new SVGParserImpl().setInternalEntitiesEnabled(this.enableInternalEntitiesSingleton)
      .setExternalFileResolver(this.externalFileResolverSingleton);
  }

  public getRootElement(): Svg {
    return this.rootElement;
  }

  public setRootElement(rootElement: Svg) {
    this.rootElement = rootElement;
  }

  resolveIRI(iri: string): SvgObject {
    if (iri == null)
    return null;

    iri = this.cssQuotedString(iri);
    if (iri.length > 1 && iri.startsWith("#")) {
      return this.getElementById(iri.substring(1));
    }
    return null;
  }

  private cssQuotedString(str: string): string {
    if (str.startsWith("\"") && str.endsWith("\"")) {

      str = str.substring(1, str.length - 1).replace("\\\"", "\"");
    }
    else if (str.startsWith("'") && str.endsWith("'")) {

      str = str.substring(1, str.length - 1).replace("\\'", "'");
    }

    return str.replace("\\\n", "").replace("\\A", "\n");
  }

  addCSSRules(ruleset: Ruleset) {
    this.cssRules.addAll(ruleset);
  }

  getCSSRules(): Array<Rule> {
    return this.cssRules.getRules();
  }

  hasCSSRules(): boolean {
    return!this.cssRules.isEmpty();
  }

  clearRenderCSSRules() {
    this.cssRules.removeFromSource(Source.RenderOptions);
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDesc(desc: string) {
    this.desc = desc;
  }

  getElementById(id: string): SvgElementBase {
    if (id == null || id.length == 0)
    return null;
    if (id == (this.rootElement.id))
    return this.rootElement;

    if (this.idToElementMap.has(id))
    return this.idToElementMap.get(id);


    let result: SvgElementBase = this.getElementById2(this.rootElement, id);
    this.idToElementMap.set(id, result);
    return result;
  }

  private getElementById2(obj: SvgContainer, id: string): SvgElementBase {
    // @ts-ignore
    let elem: SvgElementBase = obj as SvgElementBase;
    if (id == elem.id)
    return elem;
    for (let i = 0; i < obj.getChildren().length; i++) {
      let child = obj.getChildren()[i]
      if (!(child instanceof SvgElementBase))
      continue;
      let childElem: SvgElementBase = child as SvgElementBase;
      if (id == childElem.id)
      return childElem;
      if (child.type.indexOf("SvgContainer") > -1) {
        // @ts-ignore
        let found: SvgElementBase = this.getElementById2(child as SvgContainer, id);
        if (found != null)
        return found;
      }
    }
    return null;
  }

  private getElementsByTagName(nodeName?: string, result?: Array<SvgObject>, obj?: SvgObject): Array<SvgObject> {
    if (!result) {
      result = new Array<SvgObject>()
    }
    if (!obj) {
      obj = this.rootElement
    }

    if (obj.getNodeName() == (nodeName)) {
      result.push(obj);
    }
    if (obj.type == "SvgContainer") {
      // @ts-ignore
      (obj as SvgContainer).getChildren().forEach(child => {
        this.getElementsByTagName(nodeName, result, child);
      })
    }
    return result
  }
}

export class Unit {
  static px = "px";
  static em = "em";
  static ex = "ex";
  static in = "in";
  static cm = "cm";
  static mm = "mm";
  static pt = "pt";
  static pc = "pc";
  static percent = "percent";
}


export enum GradientSpread {
  pad = 'pad',
  reflect = 'reflect',
  repeat = 'repeat'
}

export class Box {
  minX: number
  minY: number
  width: number
  height: number

  constructor(minX: number, minY: number, width: number, height: number) {
    this.minX = minX;
    this.minY = minY;
    this.width = width;
    this.height = height;
  }

  copy(copy: Box) {
    this.minX = copy.minX;
    this.minY = copy.minY;
    this.width = copy.width;
    this.height = copy.height;
  }

  static fromLimits(minX: number, minY: number, maxX: number, maxY: number): Box {
    return new Box(minX, minY, maxX - minX, maxY - minY);
  }

  toRectF(): MyRect {
    return new MyRect(this.minX, this.minY, this.maxX(), this.maxY());
  }

  maxX(): number {
    return this.minX + this.width;
  }

  maxY(): number {
    return this.minY + this.height;
  }

  union(other: Box) {
    if (other.minX < this.minX) this.minX = other.minX;
    if (other.minY < this.minY) this.minY = other.minY;
    if (other.maxX() > this.maxX()) this.width = other.maxX() - this.minX;
    if (other.maxY() > this.maxY()) this.height = other.maxY() - this.minY;
  }

  public toString(): string {
    return "[" + this.minX + " " + this.minY + " " + this.width + " " + this.height + "]";
  }
}


export class SvgPaint {
}


export class Colour extends SvgPaint {
  colour: string;
  static BLACK: Colour = new Colour("#000000");
  static TRANSPARENT: Colour = new Colour("#ffffffff");

  constructor(val: string) {
    super()
    this.colour = val;
  }

  public toString(): string {
    return `#%08x ${this.colour}`
  }
}


export class CurrentColor extends SvgPaint {
  private static instance: CurrentColor = new CurrentColor();

  constructor() {
    super()
  }

  static getInstance(): CurrentColor {
    return this.instance;
  }
}


export class PaintReference extends SvgPaint {
  href: string;
  fallback: SvgPaint;

  constructor(href: string, fallback: SvgPaint) {
    super()
    this.href = href;
    this.fallback = fallback;
  }

  public toString(): string {
    return this.href + " " + this.fallback;
  }
}


export class Length {
  value: number;
  unit: Unit;
  static ZERO: Length = new Length(0);

  constructor(value: number, unit?: Unit) {
    this.value = value;
    if (unit == undefined) {
      unit = Unit.px
    }
    this.unit = unit;
  }

  floatValueX(renderer: SVGRenderer): number {
    switch (this.unit) {
      case Unit.em:
        return this.value * renderer.getCurrentFontSize();
      case Unit.ex:
        return this.value * renderer.getCurrentFontXHeight();
      case Unit.in:
        return px2vp(this.value * renderer.getDPI());
      case Unit.cm:
        return px2vp(this.value * renderer.getDPI() / 2.54);
      case Unit.mm:
        return px2vp(this.value * renderer.getDPI() / 25.4);
      case Unit.pt:
        return px2vp(this.value * renderer.getDPI() / 72);
      case Unit.pc:
        return px2vp(this.value * renderer.getDPI() / 6);
      case Unit.percent:
        let viewPortUser: Box = renderer.getCurrentViewPortInUserUnits();
        if (viewPortUser == null)
        return px2vp(this.value);
        return px2vp(this.value * viewPortUser.width / 100);
      case Unit.px:
      default:
        return px2vp(this.value);
    }
  }

  floatValueY(renderer: SVGRenderer): number {
    if (this.unit == Unit.percent) {
      let viewPortUser: Box = renderer.getCurrentViewPortInUserUnits();
      if (viewPortUser == null)
      return this.value;
      return this.value * viewPortUser.height / 100;
    }
    return this.floatValueX(renderer);
  }

  getFloatValue(): number {
    return this.value;
  }

  floatValue(renderer: SVGRenderer, max?: number): number {
    if (max) {
      if (this.unit == Unit.percent) {
        return this.value * max / 100;
      }
      return this.floatValueX(renderer);
    } else {
      if (this.unit == Unit.percent) {
        let viewPortUser: Box = renderer.getCurrentViewPortInUserUnits();
        if (viewPortUser == null)
        return this.value;
        let w: number = viewPortUser.width;
        let h: number = viewPortUser.height;
        if (w == h)
        return this.value * w / 100;
        let n: number = (Math.sqrt(w * w + h * h) / SVGBase.SQRT2);
        return px2vp(this.value * n / 100);
      }
      return this.floatValueX(renderer);
    }

  }

  floatValueWithDpi(dpi: number): number {
    switch (this.unit) {
      case Unit.in:
        return this.value * dpi;
      case Unit.cm:
        return this.value * dpi / 2.54;
      case Unit.mm:
        return this.value * dpi / 25.4;
      case Unit.pt:
        return this.value * dpi / 72;
      case Unit.pc:
        return this.value * dpi / 6;
      case Unit.px:
      case Unit.em:
      case Unit.ex:
      case Unit.percent:
      default:
        return this.value;
    }
  }

  isZero(): boolean {
    return this.value == 0;
  }

  isNegative(): boolean {
    return this.value < 0;
  }

  public toString(): string {
    return this.value + this.unit.toString();
  }
}


export class CSSClipRect {
  top: Length;
  right: Length;
  bottom: Length;
  left: Length;

  constructor(top: Length, right: Length, bottom: Length, left: Length) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  }
}


export class SvgObject {
  document: SVGBase;
  parent: SvgContainer;
  isRender = true;
  type = "";

  getNodeName(): string {
    return "";
  }
}


export class SvgElementBase extends SvgObject {
  id: string = null;
  spacePreserve: boolean = null;
  baseStyle: Style = null;
  style: Style = null;
  classNames: Array<string> = null;

  public toString(): string {
    return this.getNodeName();
  }
}


export class SvgElement extends SvgElementBase {
  public boundingBox: Box = null;
}


export interface SvgConditional {
  setRequiredFeatures(features: Set<string>);

  getRequiredFeatures(): Set<string>;

  setRequiredExtensions(extensions: string);

  getRequiredExtensions(): string;

  setSystemLanguage(languages: Set<string>);

  getSystemLanguage();

  setRequiredFormats(mimeTypes: Set<string>);

  getRequiredFormats();

  setRequiredFonts(fontNames: Set<string>);

  getRequiredFonts();
}


export class SvgConditionalElement extends SvgElement implements SvgConditional {
  requiredFeatures: Set<string> = null;
  requiredExtensions: string = null;
  systemLanguage: Set<string> = null;
  requiredFormats: Set<string> = null;
  requiredFonts: Set<string> = null;

  public setRequiredFeatures(features: Set<string>) {
    this.requiredFeatures = features;
  }

  public getRequiredFeatures(): Set<string> {
    return this.requiredFeatures;
  }

  public setRequiredExtensions(extensions: string) {
    this.requiredExtensions = extensions;
  }

  public getRequiredExtensions(): string {
    return this.requiredExtensions;
  }

  public setSystemLanguage(languages: Set<string>) {
    this.systemLanguage = languages;
  }

  public getSystemLanguage(): Set<string> {
    return this.systemLanguage;
  }

  public setRequiredFormats(mimeTypes: Set<string>) {
    this.requiredFormats = mimeTypes;
  }

  public getRequiredFormats(): Set<string> {
    return this.requiredFormats;
  }

  public setRequiredFonts(fontNames: Set<string>) {
    this.requiredFonts = fontNames;
  }

  public getRequiredFonts(): Set<string> {
    return this.requiredFonts;
  }
}


export interface SvgContainer {
  getChildren(): Array<SvgObject>;

  addChild(elem: SvgObject);
}


export class SvgConditionalContainer extends SvgElement implements SvgContainer, SvgConditional {
  children: Array<SvgObject> = [];
  requiredFeatures: Set<string> = null;
  requiredExtensions: string = null;
  systemLanguage: Set<string> = null;
  requiredFormats: Set<string> = null;
  requiredFonts: Set<string> = null;
  type = "SvgContainer | SvgConditional"

  public getChildren(): Array<SvgObject> {
    return this.children;
  }

  public addChild(elem: SvgObject) {
    this.children.push(elem);
  }

  public setRequiredFeatures(features: Set<string>) {
    this.requiredFeatures = features;
  }

  public getRequiredFeatures(): Set<string> {
    return this.requiredFeatures;
  }

  public setRequiredExtensions(extensions: string) {
    this.requiredExtensions = extensions;
  }

  public getRequiredExtensions(): string {
    return this.requiredExtensions;
  }

  public setSystemLanguage(languages: Set<string>) {
    this.systemLanguage = languages;
  }

  public getSystemLanguage(): Set<string> {
    return null;
  }

  public setRequiredFormats(mimeTypes: Set<string>) {
    this.requiredFormats = mimeTypes;
  }

  public getRequiredFormats(): Set<string> {
    return this.requiredFormats;
  }

  public setRequiredFonts(fontNames: Set<string>) {
    this.requiredFonts = fontNames;
  }

  public getRequiredFonts(): Set<string> {
    return this.requiredFonts;
  }
}


export interface HasTransform {
  setTransform(matrix: Matrix2D2);
}


export class SvgPreserveAspectRatioContainer extends SvgConditionalContainer {
  preserveAspectRatio: PreserveAspectRatio = null;
}


export class SvgViewBoxContainer extends SvgPreserveAspectRatioContainer {
  viewBox: Box;
}


export class Svg extends SvgViewBoxContainer {
  x: Length;
  y: Length;
  width: Length;
  height: Length;
  public version: string;

  getNodeName(): string {
    return "svg";
  }
}


export class Group extends SvgConditionalContainer implements HasTransform {
  transform;
  Matrix;

  public setTransform(transform: Matrix2D2) {
    this.transform = transform;
  }

  getNodeName(): string {
    return "group";
  }
}


export interface NotDirectlyRendered {}


export class Defs extends Group implements NotDirectlyRendered {
  isRender = false;

  getNodeName(): string {
    return "defs";
  }
}


export class GraphicsElement extends SvgConditionalElement implements HasTransform {
  transform: Matrix2D2;

  public setTransform(transform: Matrix2D2) {
    this.transform = transform;
  }
}


export class A extends Group {
  href: string;

  getNodeName(): string {
    return "a";
  }
}


export class Use extends Group {
  href: string;
  x: Length;
  y: Length;
  width: Length;
  height: Length;

  getNodeName(): string {
    return "use";
  }
}


export class Path2 extends GraphicsElement {
  d: PathDefinition;
  pathLength: number;

  getNodeName(): string {
    return "path";
  }
}


export class Rect2 extends GraphicsElement {
  x: Length;
  y: Length;
  width: Length;
  height: Length;
  rx: Length;
  ry: Length;

  getNodeName(): string {
    return "rect";
  }
}


export class Circle2 extends GraphicsElement {
  cx: Length;
  cy: Length;
  r: Length;

  getNodeName(): string {
    return "circle";
  }
}


export class Ellipse2 extends GraphicsElement {
  cx: Length;
  cy: Length;
  rx: Length;
  ry: Length;

  getNodeName(): string {
    return "ellipse";
  }
}


export class Line2 extends GraphicsElement {
  x1: Length;
  y1: Length;
  x2: Length;
  y2: Length;

  getNodeName(): string {
    return "line";
  }
}


export class PolyLine extends GraphicsElement {
  points: Array<number>;

  getNodeName(): string {
    return "polyline";
  }
}


export class Polygon2 extends PolyLine {
  getNodeName(): string {
    return "polygon";
  }
}


export interface TextRoot {}


export interface TextChild {
  setTextRoot(obj: TextRoot);

  getTextRoot(): TextRoot;
}


export class TextContainer extends SvgConditionalContainer {
  public addChild(elem: SvgObject) {
    try {
      this.children.push(elem);
    } catch (e) {

    }
  }
}


export class TextPositionedContainer extends TextContainer {
  x: Array<Length> = null;
  y: Array<Length> = null;
  dx: Array<Length> = null;
  dy: Array<Length> = null;
}


export class Text2 extends TextPositionedContainer implements TextRoot, HasTransform {
  transform: Matrix2D2;
  text: string

  public setTransform(transform: Matrix2D2) {
    this.transform = transform;
  }

  getNodeName(): string {
    return "text";
  }
}


export class TSpan extends TextPositionedContainer implements TextChild {
  private textRoot: TextRoot;
  text: string

  public setTextRoot(obj: TextRoot) {
    this.textRoot = obj;
  }

  public getTextRoot(): TextRoot {
    return this.textRoot;
  }

  getNodeName(): string {
    return "tspan";
  }
}


export class TextSequence extends SvgObject implements TextChild {
  text: string;
  private textRoot: TextRoot;

  constructor(text: string) {
    super()
    this.text = text;
  }

  public toString(): string {
    return "TextChild: '" + this.text + "'";
  }

  public setTextRoot(obj: TextRoot) {
    this.textRoot = obj;
  }

  public getTextRoot(): TextRoot {
    return this.textRoot;
  }
}


export class TRef extends TextContainer implements TextChild {
  href: string;
  private textRoot: TextRoot;

  public setTextRoot(obj: TextRoot) {
    this.textRoot = obj;
  }

  public getTextRoot(): TextRoot {
    return this.textRoot;
  }

  getNodeName(): string {
    return "tref";
  }
}


export class TextPath extends TextContainer implements TextChild {
  href: string;
  startOffset: Length;
  private textRoot: TextRoot;

  public setTextRoot(obj: TextRoot) {
    this.textRoot = obj;
  }

  public getTextRoot(): TextRoot {
    return this.textRoot;
  }

  getNodeName(): string {
    return "textPath";
  }
}


export class Switch extends Group {
  getNodeName(): string {
    return "switch";
  }
}


export class Symbol extends SvgViewBoxContainer implements NotDirectlyRendered {
  isRender = false;

  getNodeName(): string {
    return "symbol";
  }
}


export class Marker extends SvgViewBoxContainer implements NotDirectlyRendered {
  isRender = false;
  markerUnitsAreUser: boolean;
  refX: Length;
  refY: Length;
  markerWidth: Length;
  markerHeight: Length;
  orient: number;

  getNodeName(): string {
    return "marker";
  }
}


export class GradientElement extends SvgElementBase implements SvgContainer {
  children: Array<SvgObject> = new Array<SvgObject>();
  gradientUnitsAreUser: boolean;
  gradientTransform: Matrix2D2;
  spreadMethod: GradientSpread;
  href: string;
  type = "SvgContainer"

  public getChildren(): Array<SvgObject> {
    return this.children;
  }

  public addChild(elem: SvgObject) {
    if (elem instanceof Stop) {
      this.children.push(elem);
    } else {
      throw new SVGParseException("Gradient elements cannot contain " + elem + " elements.");
    }
  }
}


export class Stop extends SvgElementBase implements SvgContainer {
  offset: number;
  type = "SvgContainer"

  public getChildren(): Array<SvgObject> {
    return [];
  }

  public addChild(elem: SvgObject) {
  }

  getNodeName(): string {
    return "stop";
  }
}


export class SvgLinearGradient extends GradientElement {
  x1: Length;
  y1: Length;
  x2: Length;
  y2: Length;

  getNodeName(): string {
    return "linearGradient";
  }
}


export class SvgRadialGradient extends GradientElement {
  cx: Length;
  cy: Length;
  r: Length;
  fx: Length;
  fy: Length;

  getNodeName(): string {
    return "radialGradient";
  }
}


export class ClipPath extends Group implements NotDirectlyRendered {
  isRender = false;
  clipPathUnitsAreUser: boolean;

  getNodeName(): string {
    return "clipPath";
  }
}


export class Pattern extends SvgViewBoxContainer implements NotDirectlyRendered {
  isRender = false;
  patternUnitsAreUser: boolean;
  patternContentUnitsAreUser: boolean;
  patternTransform: Matrix2D2;
  x: Length;
  y: Length;
  width: Length;
  height: Length;
  href: string;

  getNodeName(): string {
    return "pattern";
  }
}


export class Image2 extends SvgPreserveAspectRatioContainer implements HasTransform {
  href: string;
  x: Length;
  y: Length;
  width: Length;
  height: Length;
  transform: Matrix2D2;
  translateX: Length;
  translateY: Length;

  public setTransform(transform: Matrix2D2) {
    this.transform = transform;
  }

  getNodeName(): string {
    return "image";
  }
}


export class View extends SvgViewBoxContainer implements NotDirectlyRendered {
  isRender = false;
  static NODE_NAME: string = "view";

  getNodeName(): string {
    return View.NODE_NAME;
  }
}


export class Mask extends SvgConditionalContainer implements NotDirectlyRendered {
  isRender = false;
  maskUnitsAreUser;
  boolean;
  maskContentUnitsAreUser: boolean;
  x: Length;
  y: Length;
  width: Length;
  height: Length;

  getNodeName(): string {
    return "mask";
  }
}


export class SolidColor extends SvgElementBase implements SvgContainer {
  type = "SvgContainer"

  public getChildren(): Array<SvgObject> {
    return new Array<SvgObject>();
  }

  public addChild(elem: SvgObject) {
  }

  getNodeName(): string {
    return "solidColor";
  }
}

export interface PathInterface {
  moveTo(x: number, y: number);

  lineTo(x: number, y: number);

  cubicTo(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number);

  quadTo(x1: number, y1: number, x2: number, y2: number);

  arcTo(rx: number, ry: number, xAxisRotation: number, largeArcFlag: boolean, sweepFlag: boolean, x: number, y: number);

  close();
}

export class PathDefinition implements PathInterface {
  private commands: number[];
  private commandsLength: number = 0;
  private coords: number[];
  private coordsLength: number = 0;
  private static MOVETO: number = 0;
  private static LINETO: number = 1;
  private static CUBICTO: number = 2;
  private static QUADTO: number = 3;
  private static ARCTO: number = 4;
  private static CLOSE: number = 8;
  d: string;

  constructor() {
    this.commands = new Array<number>(8);
    this.coords = new Array<number>(16);
  }

  isEmpty(): boolean {
    return this.commandsLength == 0;
  }

  private addCommand(value: number) {
    if (this.commandsLength == this.commands.length) {
      let newCommands: number[] = new Array<number>(this.commands.length * 2);
      for (let i = 0;i < this.commands.length; i++) {
        newCommands[i] = this.commands[i];
      }
      this.commands = newCommands;
    }
    this.commands[this.commandsLength++] = value;
  }

  private coordsEnsure(num: number) {
    if (this.coords.length < (this.coordsLength + num)) {
      let newCoords: number[] = new Array<number>(this.coords.length * 2);
      for (let i = 0;i < this.coords.length; i++) {
        newCoords[i] = this.coords[i];
      }
      this.coords = newCoords;
    }
  }

  public moveTo(x: number, y: number) {
    this.addCommand(PathDefinition.MOVETO);
    this.coordsEnsure(2);
    this.coords[this.coordsLength++] = x;
    this.coords[this.coordsLength++] = y;
  }

  public lineTo(x: number, y: number) {
    this.addCommand(PathDefinition.LINETO);
    this.coordsEnsure(2);
    this.coords[this.coordsLength++] = x;
    this.coords[this.coordsLength++] = y;
  }

  public cubicTo(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    this.addCommand(PathDefinition.CUBICTO);
    this.coordsEnsure(6);
    this.coords[this.coordsLength++] = x1;
    this.coords[this.coordsLength++] = y1;
    this.coords[this.coordsLength++] = x2;
    this.coords[this.coordsLength++] = y2;
    this.coords[this.coordsLength++] = x3;
    this.coords[this.coordsLength++] = y3;
  }

  public quadTo(x1: number, y1: number, x2: number, y2: number) {
    this.addCommand(PathDefinition.QUADTO);
    this.coordsEnsure(4);
    this.coords[this.coordsLength++] = x1;
    this.coords[this.coordsLength++] = y1;
    this.coords[this.coordsLength++] = x2;
    this.coords[this.coordsLength++] = y2;
  }

  public arcTo(rx: number, ry: number, xAxisRotation: number, largeArcFlag: boolean, sweepFlag: boolean, x: number, y: number) {
    let arc: number = PathDefinition.ARCTO | (largeArcFlag ? 2 : 0) | (sweepFlag ? 1 : 0);
    this.addCommand(arc);
    this.coordsEnsure(5);
    this.coords[this.coordsLength++] = rx;
    this.coords[this.coordsLength++] = ry;
    this.coords[this.coordsLength++] = xAxisRotation;
    this.coords[this.coordsLength++] = x;
    this.coords[this.coordsLength++] = y;
  }

  public close() {
    this.addCommand(PathDefinition.CLOSE);
  }

  enumeratePath(handler: PathInterface) {
    let coordsPos: number = 0;
    for (var commandPos = 0; commandPos < this.commandsLength; commandPos++) {
      let command = this.commands[commandPos];
      switch (command) {
        case PathDefinition.MOVETO:
          handler.moveTo(this.coords[coordsPos++], this.coords[coordsPos++]);
          break;
        case PathDefinition.LINETO:
          handler.lineTo(this.coords[coordsPos++], this.coords[coordsPos++]);
          break;
        case PathDefinition.CUBICTO:
          handler.cubicTo(this.coords[coordsPos++], this.coords[coordsPos++], this.coords[coordsPos++], this.coords[coordsPos++], this.coords[coordsPos++], this.coords[coordsPos++]);
          break;
        case PathDefinition.QUADTO:
          handler.quadTo(this.coords[coordsPos++], this.coords[coordsPos++], this.coords[coordsPos++], this.coords[coordsPos++]);
          break;
        case PathDefinition.CLOSE:
          handler.close();
          break;
        default:
          let largeArcFlag: boolean = (command & 2) != 0;
          let sweepFlag: boolean = (command & 1) != 0;
          handler.arcTo(this.coords[coordsPos++], this.coords[coordsPos++], this.coords[coordsPos++], largeArcFlag, sweepFlag, this.coords[coordsPos++], this.coords[coordsPos++]);
      }
    }
  }
}
