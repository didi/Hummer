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

import { SVGXMLChecker } from './SVGXMLChecker';

import { Colour, CurrentColor, Length, SvgPaint, Unit } from './SVGBase';
import { SVGParserImpl } from './SVGParserImpl';

export class Style {
  specifiedFlags: number = 0;
  fill: SvgPaint = Colour.BLACK;
  fillRule: FillRule;
  fillOpacity: number = 1;
  stroke: SvgPaint = Colour.BLACK;
  strokeOpacity: number;
  strokeWidth: Length;
  strokeLineCap: LineCap;
  strokeLineJoin: LineJoin;
  strokeMiterLimit: number;
  strokeDashArray: Length[];
  strokeDashOffset: Length;
  opacity: number = 1;
  color: Colour;
  fontFamily: Array<string>;
  fontSize: Length;
  fontWeight: number;
  fontStyle: FontStyle;
  fontStretch: number;
  textDecoration: TextDecoration;
  direction: TextDirection;
  textAnchor: TextAnchor;
  overflow: boolean;
  clip: CSSClipRect;
  markerStart: string;
  markerMid: string;
  markerEnd: string;
  display: boolean;
  visibility: boolean;
  stopColor: SvgPaint;
  stopOpacity: number;
  clipPath: string;
  clipRule: FillRule;
  mask: string;
  solidColor: SvgPaint;
  solidOpacity: number;
  viewportFill: SvgPaint;
  viewportFillOpacity: number;
  vectorEffect: VectorEffect;
  imageRendering: RenderQuality;
  isolation: Isolation;
  mixBlendMode: string;
  fontKerning: FontKerning;
  writingMode: WritingMode;
  glyphOrientationVertical: GlypOrientationVertical;
  textOrientation: TextOrientation;
  letterSpacing: Length;
  wordSpacing: Length;
  static FONT_WEIGHT_MIN: number = 1;
  static FONT_WEIGHT_NORMAL: number = 400;
  static FONT_WEIGHT_BOLD: number = 700;
  static FONT_WEIGHT_MAX: number = 1000;
  static FONT_WEIGHT_LIGHTER: number = Number.MIN_VALUE;
  static FONT_WEIGHT_BOLDER: number = Number.MAX_VALUE;
  static FONT_STRETCH_MIN: number = 0;
  static FONT_STRETCH_NORMAL: number = 100;
  static SPECIFIED_FILL = (1 << 0);
  static SPECIFIED_FILL_RULE = (1 << 1);
  static SPECIFIED_FILL_OPACITY = (1 << 2);
  static SPECIFIED_STROKE = (1 << 3);
  static SPECIFIED_STROKE_OPACITY = (1 << 4);
  static SPECIFIED_STROKE_WIDTH = (1 << 5);
  static SPECIFIED_STROKE_LINECAP = (1 << 6);
  static SPECIFIED_STROKE_LINEJOIN = (1 << 7);
  static SPECIFIED_STROKE_MITERLIMIT = (1 << 8);
  static SPECIFIED_STROKE_DASHARRAY = (1 << 9);
  static SPECIFIED_STROKE_DASHOFFSET = (1 << 10);
  static SPECIFIED_OPACITY = (1 << 11);
  static SPECIFIED_COLOR = (1 << 12);
  static SPECIFIED_FONT_FAMILY = (1 << 13);
  static SPECIFIED_FONT_SIZE = (1 << 14);
  static SPECIFIED_FONT_WEIGHT = (1 << 15);
  static SPECIFIED_FONT_STYLE = (1 << 16);
  static SPECIFIED_TEXT_DECORATION = (1 << 17);
  static SPECIFIED_TEXT_ANCHOR = (1 << 18);
  static SPECIFIED_OVERFLOW = (1 << 19);
  static SPECIFIED_CLIP = (1 << 20);
  static SPECIFIED_MARKER_START = (1 << 21);
  static SPECIFIED_MARKER_MID = (1 << 22);
  static SPECIFIED_MARKER_END = (1 << 23);
  static SPECIFIED_DISPLAY = (1 << 24);
  static SPECIFIED_VISIBILITY = (1 << 25);
  static SPECIFIED_STOP_COLOR = (1 << 26);
  static SPECIFIED_STOP_OPACITY = (1 << 27);
  static SPECIFIED_CLIP_PATH = (1 << 28);
  static SPECIFIED_CLIP_RULE = (1 << 29);
  static SPECIFIED_MASK = (1 << 30);
  static SPECIFIED_SOLID_COLOR = (1 << 31);
  static SPECIFIED_SOLID_OPACITY = (1 << 32);
  static SPECIFIED_VIEWPORT_FILL = (1 << 33);
  static SPECIFIED_VIEWPORT_FILL_OPACITY = (1 << 34);
  static SPECIFIED_VECTOR_EFFECT = (1 << 35);
  static SPECIFIED_DIRECTION = (1 << 36);
  static SPECIFIED_IMAGE_RENDERING = (1 << 37);
  static SPECIFIED_ISOLATION = (1 << 38);
  static SPECIFIED_MIX_BLEND_MODE = (1 << 39);
  static SPECIFIED_FONT_VARIANT_LIGATURES = (1 << 40);
  static SPECIFIED_FONT_VARIANT_POSITION = (1 << 41);
  static SPECIFIED_FONT_VARIANT_CAPS = (1 << 42);
  static SPECIFIED_FONT_VARIANT_NUMERIC = (1 << 43);
  static SPECIFIED_FONT_VARIANT_EAST_ASIAN = (1 << 44);
  static SPECIFIED_FONT_FEATURE_SETTINGS = (1 << 45);
  static SPECIFIED_WRITING_MODE = (1 << 46);
  static SPECIFIED_GLYPH_ORIENTATION_VERTICAL = (1 << 47);
  static SPECIFIED_TEXT_ORIENTATION = (1 << 48);
  static SPECIFIED_FONT_KERNING = (1 << 49);
  static SPECIFIED_FONT_VARIATION_SETTINGS = (1 << 50);
  static SPECIFIED_FONT_STRETCH = (1 << 51);
  static SPECIFIED_LETTER_SPACING = (1 << 52);
  static SPECIFIED_WORD_SPACING = (1 << 53);

  static getDefaultStyle(): Style {
    let def = new Style();

    def.fill = Colour.BLACK;
    def.fillRule = FillRule.NonZero;
    def.fillOpacity = 1;
    def.stroke = null;
    def.strokeOpacity = 1;
    def.strokeWidth = new Length(1);
    def.strokeLineCap = LineCap.Butt;
    def.strokeLineJoin = LineJoin.Miter;
    def.strokeMiterLimit = 4;
    def.strokeDashArray = null;
    def.strokeDashOffset = Length.ZERO;
    def.opacity = 1;
    def.color = Colour.BLACK;
    def.fontFamily = null;
    def.fontSize = new Length(12, Unit.pt);
    def.fontWeight = this.FONT_WEIGHT_NORMAL;
    def.fontStyle = FontStyle.normal;
    def.fontStretch = this.FONT_STRETCH_NORMAL;
    def.textDecoration = TextDecoration.None;
    def.direction = TextDirection.LTR;
    def.textAnchor = TextAnchor.Start;
    def.overflow = true;
    def.clip = null;
    def.markerStart = null;
    def.markerMid = null;
    def.markerEnd = null;
    def.display = true;
    def.visibility = true;
    def.stopColor = Colour.BLACK;
    def.stopOpacity = 1;
    def.clipPath = null;
    def.clipRule = FillRule.NonZero;
    def.mask = null;
    def.solidColor = null;
    def.solidOpacity = 1;
    def.viewportFill = null;
    def.viewportFillOpacity = 1;
    def.vectorEffect = VectorEffect.None;
    def.imageRendering = RenderQuality.auto;
    def.isolation = Isolation.auto;
    def.mixBlendMode = CSSBlendMode.normal;
    def.fontKerning = FontKerning.auto;
    def.letterSpacing = Length.ZERO;
    def.wordSpacing = Length.ZERO;
    def.writingMode = WritingMode.horizontal_tb;
    def.glyphOrientationVertical = GlypOrientationVertical.auto;
    def.textOrientation = TextOrientation.mixed;
    return def;
  }

  resetNonInheritingProperties(isRootSVG: boolean) {
    this.display = true;
    this.overflow = isRootSVG
    this.clip = null;
    this.clipPath = null;
    this.opacity = 1;
    this.stopColor = Colour.BLACK;
    this.stopOpacity = 1;
    this.mask = null;
    this.solidColor = null;
    this.solidOpacity = 1;
    this.viewportFill = null;
    this.viewportFillOpacity = 1;
    this.vectorEffect = VectorEffect.None;
    this.isolation = Isolation.auto;
    this.mixBlendMode = CSSBlendMode.normal;
  }

  clone(): Object {
    let obj = this.clone() as Style
    return obj;
  }

  static processStyleProperty(style: Style, attributes: any, isFromAttribute: boolean) {
    if (SVGXMLChecker.checkObjectEmpty(attributes)) {
      return;
    }
    if (!SVGXMLChecker.checkObjectEmpty(attributes.fill)) {
      style.fill = SVGParserImpl.parsePaintSpecifier(attributes.fill);
      if (style.fill != null)
      style.specifiedFlags |= Style.SPECIFIED_FILL;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.fill_rule)) {
      style.fillRule = SVGParserImpl.parseFillRule(attributes.fill_rule);
      if (style.fillRule != null)
      style.specifiedFlags |= Style.SPECIFIED_FILL_RULE;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.fill_opacity)) {
      style.fillOpacity = SVGParserImpl.parseOpacity(attributes.fill_opacity);
      if (style.fillOpacity != null)
      style.specifiedFlags |= Style.SPECIFIED_FILL_OPACITY;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.stroke)) {
      style.stroke = SVGParserImpl.parsePaintSpecifier(attributes.stroke);
      if (style.stroke != null)
      style.specifiedFlags |= Style.SPECIFIED_STROKE;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.stroke_opacity)) {
      style.strokeOpacity = SVGParserImpl.parseOpacity(attributes.stroke_opacity);
      if (style.strokeOpacity != null)
      style.specifiedFlags |= Style.SPECIFIED_STROKE_OPACITY;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.stroke_width)) {
      try {
        style.strokeWidth = SVGParserImpl.parseLength(attributes.stroke_width);
        style.specifiedFlags |= Style.SPECIFIED_STROKE_WIDTH;
      } catch (e) {
      }
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.stroke_linecap)) {
      style.strokeLineCap = SVGParserImpl.parseStrokeLineCap(attributes.stroke_linecap);
      if (style.strokeLineCap != null)
      style.specifiedFlags |= Style.SPECIFIED_STROKE_LINECAP;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.stroke_linejoin)) {
      style.strokeLineJoin = SVGParserImpl.parseStrokeLineJoin(attributes.stroke_linejoin);
      if (style.strokeLineJoin != null)
      style.specifiedFlags |= Style.SPECIFIED_STROKE_LINEJOIN;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.stroke_miterlimit)) {
      try {
        style.strokeMiterLimit = SVGParserImpl.parseFloat(attributes.stroke_miterlimit);
        style.specifiedFlags |= Style.SPECIFIED_STROKE_MITERLIMIT;
      } catch (e) {
      }
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.stroke_dasharray)) {
      if (SVGParserImpl.NONE == (attributes.stroke_dasharray)) {
        style.strokeDashArray = null;
        style.specifiedFlags |= Style.SPECIFIED_STROKE_DASHARRAY;
      } else {
        style.strokeDashArray = SVGParserImpl.parseStrokeDashArray(attributes.stroke_dasharray);
        if (style.strokeDashArray != null)
        style.specifiedFlags |= Style.SPECIFIED_STROKE_DASHARRAY;
      }
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.stroke_dashoffset)) {
      try {
        style.strokeDashOffset = SVGParserImpl.parseLength(attributes.stroke_dashoffset);
        if (style.strokeDashOffset != null)
        style.specifiedFlags |= Style.SPECIFIED_STROKE_DASHOFFSET;
      } catch (e) {
      }
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.opacity)) {
      style.opacity = SVGParserImpl.parseOpacity(attributes.opacity);
      if (style.opacity != null)
      style.specifiedFlags |= Style.SPECIFIED_OPACITY;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.color)) {
      style.color = SVGParserImpl.parseColour(attributes.color);
      style.specifiedFlags |= Style.SPECIFIED_COLOR;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.font)) {
      if (!isFromAttribute) {
        SVGParserImpl.parseFont(style, attributes.font);
      }
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.font_family)) {
      style.fontFamily = SVGParserImpl.parseFontFamily(attributes.font_family);
      if (style.fontFamily != null)
      style.specifiedFlags |= Style.SPECIFIED_FONT_FAMILY;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.font_size)) {
      style.fontSize = SVGParserImpl.parseFontSize(attributes.font_size);
      if (style.fontSize != null)
      style.specifiedFlags |= Style.SPECIFIED_FONT_SIZE;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.font_weight)) {
      style.fontWeight = SVGParserImpl.parseFontWeight(attributes.font_weight);
      if (style.fontWeight != null)
      style.specifiedFlags |= Style.SPECIFIED_FONT_WEIGHT;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.font_style)) {
      style.fontStyle = SVGParserImpl.parseFontStyle(attributes.font_style);
      if (style.fontStyle != null)
      style.specifiedFlags |= Style.SPECIFIED_FONT_STYLE;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.font_stretch)) {
      style.fontStretch = SVGParserImpl.parseFontStretch(attributes.font_stretch);
      if (style.fontStretch != null)
      style.specifiedFlags |= Style.SPECIFIED_FONT_STRETCH;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.text_decoration)) {
      style.textDecoration = SVGParserImpl.parseTextDecoration(attributes.text_decoration);
      if (style.textDecoration != null)
      style.specifiedFlags |= Style.SPECIFIED_TEXT_DECORATION;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.direction)) {
      style.direction = SVGParserImpl.parseTextDirection(attributes.direction);
      if (style.direction != null)
      style.specifiedFlags |= Style.SPECIFIED_DIRECTION;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.direction)) {
      style.textAnchor = SVGParserImpl.parseTextAnchor(attributes.direction);
      if (style.textAnchor != null)
      style.specifiedFlags |= Style.SPECIFIED_TEXT_ANCHOR;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.overflow)) {
      style.overflow = SVGParserImpl.parseOverflow(attributes.overflow);
      if (style.overflow != null)
      style.specifiedFlags |= Style.SPECIFIED_OVERFLOW;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.marker)) {
      style.markerStart = SVGParserImpl.parseFunctionalIRI(attributes.marker);
      style.markerMid = style.markerStart;
      style.markerEnd = style.markerStart;
      style.specifiedFlags |= (Style.SPECIFIED_MARKER_START | Style.SPECIFIED_MARKER_MID | Style.SPECIFIED_MARKER_END);
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.marker_start)) {
      style.markerStart = SVGParserImpl.parseFunctionalIRI(attributes.marker_start);
      style.specifiedFlags |= Style.SPECIFIED_MARKER_START;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.marker_mid)) {
      style.markerMid = SVGParserImpl.parseFunctionalIRI(attributes.marker_mid);
      style.specifiedFlags |= Style.SPECIFIED_MARKER_MID;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.marker_end)) {
      style.markerEnd = SVGParserImpl.parseFunctionalIRI(attributes.marker_end);
      style.specifiedFlags |= Style.SPECIFIED_MARKER_END;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.display)) {
      if (attributes.display.indexOf('|') < 0 && SVGParserImpl.VALID_DISPLAY_VALUES.includes('|' + attributes.display + '|')) {
        style.display = !(attributes.display == SVGParserImpl.NONE);
        style.specifiedFlags |= Style.SPECIFIED_DISPLAY;
      }
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.visibility)) {
      if (attributes.visibility.indexOf('|') < 0 && SVGParserImpl.VALID_VISIBILITY_VALUES.includes('|' + attributes.visibility + '|')) {
        style.visibility = (attributes.visibility == "visible");
        style.specifiedFlags |= Style.SPECIFIED_VISIBILITY;
      }
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.stop_color)) {
      if (attributes.stop_color == (SVGParserImpl.CURRENTCOLOR)) {
        style.stopColor = CurrentColor.getInstance();
      } else {
        style.stopColor = SVGParserImpl.parseColour(attributes.stop_color);
      }
      style.specifiedFlags |= Style.SPECIFIED_STOP_COLOR;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.stop_opacity)) {
      style.stopOpacity = SVGParserImpl.parseOpacity(attributes.stop_opacity);
      style.specifiedFlags |= Style.SPECIFIED_STOP_OPACITY;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.clip)) {
      style.clip = SVGParserImpl.parseClip(attributes.clip);
      if (style.clip != null)
      style.specifiedFlags |= Style.SPECIFIED_CLIP;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.clip_path)) {
      style.clipPath = SVGParserImpl.parseFunctionalIRI(attributes.clip_path);
      style.specifiedFlags |= Style.SPECIFIED_CLIP_PATH;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.clip_rule)) {
      style.clipRule = SVGParserImpl.parseFillRule(attributes.clip_rule);
      style.specifiedFlags |= Style.SPECIFIED_CLIP_RULE;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.mask)) {
      style.mask = SVGParserImpl.parseFunctionalIRI(attributes.mask);
      style.specifiedFlags |= Style.SPECIFIED_MASK;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.solid_color)) {
      if (isFromAttribute) {
        if (attributes.solid_color == (SVGParserImpl.CURRENTCOLOR)) {
          style.solidColor = CurrentColor.getInstance();
        } else {
          style.solidColor = SVGParserImpl.parseColour(attributes.solid_color);
        }
        style.specifiedFlags |= Style.SPECIFIED_SOLID_COLOR;
      }
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.solid_opacity)) {
      if (isFromAttribute) {
        style.solidOpacity = SVGParserImpl.parseOpacity(attributes.solid_opacity);
        style.specifiedFlags |= Style.SPECIFIED_SOLID_OPACITY;
      }
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.viewport_fill)) {
      if (attributes.viewport_fill == (SVGParserImpl.CURRENTCOLOR)) {
        style.viewportFill = CurrentColor.getInstance();
      } else {
        style.viewportFill = SVGParserImpl.parseColour(attributes.viewport_fill);
      }
      style.specifiedFlags |= Style.SPECIFIED_VIEWPORT_FILL;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.viewport_fill_opacity)) {
      style.viewportFillOpacity = SVGParserImpl.parseOpacity(attributes.viewport_fill_opacity);
      style.specifiedFlags |= Style.SPECIFIED_VIEWPORT_FILL_OPACITY;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.vector_effect)) {
      style.vectorEffect = SVGParserImpl.parseVectorEffect(attributes.vector_effect);
      if (style.vectorEffect != null)
      style.specifiedFlags |= Style.SPECIFIED_VECTOR_EFFECT;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.image_rendering)) {
      style.imageRendering = SVGParserImpl.parseRenderQuality(attributes.image_rendering);
      if (style.imageRendering != null)
      style.specifiedFlags |= Style.SPECIFIED_IMAGE_RENDERING;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.isolation)) {
      if (!isFromAttribute) {
        style.isolation = SVGParserImpl.parseIsolation(attributes.isolation);
        if (style.isolation != null)
        style.specifiedFlags |= Style.SPECIFIED_ISOLATION;
      }
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.mix_blend_mode)) {
      if (!isFromAttribute) {
        let cssBlendMode = new CSSBlendMode()
        style.mixBlendMode = cssBlendMode.fromString(attributes.mix_blend_mode);
        if (style.mixBlendMode != null)
        style.specifiedFlags |= Style.SPECIFIED_MIX_BLEND_MODE;
      }
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.letter_spacing)) {
      style.letterSpacing = SVGParserImpl.parseLetterOrWordSpacing(attributes.letter_spacing);
      if (style.letterSpacing != null)
      style.specifiedFlags |= Style.SPECIFIED_LETTER_SPACING;
    }

    if (!SVGXMLChecker.checkObjectEmpty(attributes.word_spacing)) {
      style.wordSpacing = SVGParserImpl.parseLetterOrWordSpacing(attributes.word_spacing);
      if (style.wordSpacing != null)
      style.specifiedFlags |= Style.SPECIFIED_WORD_SPACING;
    }
  }
}


export enum FillRule {
  NonZero = 'NonZero',
  EvenOdd = 'EvenOdd'
}

export enum LineCap {
  Butt,
  Round,
  Square
}

export enum LineJoin {
  Miter,
  Round,
  Bevel
}

export enum FontStyle {
  normal = 'normal',
  italic = 'italic',
  oblique = 'oblique'
}

export enum TextAnchor {
  Start = 'Start',
  Middle = 'Middle',
  End = 'End'
}

export enum TextDecoration {
  None = 'None',
  Underline = 'Underline',
  Overline = 'Overline',
  LineThrough = 'LineThrough',
  Blink = 'Blink'
}

export enum TextDirection {
  LTR = 'LTR',
  RTL = 'RTL'
}

export enum VectorEffect {
  None = 'None',
  NonScalingStroke = 'NonScalingStroke'
}

export enum RenderQuality {
  auto = 'auto',
  optimizeQuality = 'optimizeQuality',
  optimizeSpeed = 'optimizeSpeed'
}

export enum Isolation {
  auto = 'auto',
  isolate = 'isolate'
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

export class CSSBlendMode {
  static normal = 'normal'
  static multiply = 'multiply'
  static screen = 'screen'
  static overlay = 'overlay'
  static darken = 'darken'
  static lighten = 'lighten'
  static color_dodge = 'color_dodge'
  static color_burn = 'color_burn'
  static hard_light = 'hard_light'
  static soft_light = 'soft_light'
  static difference = 'difference'
  static exclusion = 'exclusion'
  static hue = 'hue'
  static saturation = 'saturation'
  static color = 'color'
  static luminosity = 'luminosity'
  static UNSUPPORTED = 'UNSUPPORTED'
  private cache: Map<string, string> = new Map<string, string>();

  constructor() {
    this.cache.forEach(mode => {
      if (mode != CSSBlendMode.UNSUPPORTED) {
        let key = this.cache[mode].replace('_', '-');
        this.cache.set(key, mode);
      }
    })
  }

  public fromString(str: string): string {
    let mode = this.cache.get(str);
    if (mode != null) {
      return mode;
    }
    return CSSBlendMode.UNSUPPORTED;
  }
}

export enum FontKerning {
  auto = 'auto',
  normal = 'normal',
  none = 'none'
}

export enum WritingMode {

  lr_tb,
  rl_tb,
  tb_rl,
  lr,
  rl,
  tb,

  horizontal_tb,
  vertical_rl,
  vertical_lr
}

export enum GlypOrientationVertical {
  auto,
  angle0,
  angle90,
  angle180,
  angle270
}


export enum TextOrientation {
  mixed,
  upright,
  sideways
}
