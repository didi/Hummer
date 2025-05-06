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

import { Matrix2D2 } from './Matrix';
import {
  A,
  Box,
  Circle2,
  ClipPath,
  Colour,
  CSSClipRect,
  CurrentColor,
  Defs,
  Ellipse2,
  GradientElement,
  GradientSpread,
  Group,
  HasTransform,
  Image2,
  Length,
  Line2,
  Marker,
  Mask,
  PaintReference,
  Path2,
  PathDefinition,
  Pattern,
  Polygon2,
  PolyLine,
  Rect2,
  SolidColor,
  Stop,
  Svg,
  SVGBase,
  SvgConditional,
  SvgConditionalContainer,
  SvgContainer,
  SvgElementBase,
  SvgLinearGradient,
  SvgObject,
  SvgPaint,
  SvgPreserveAspectRatioContainer,
  SvgRadialGradient,
  SvgViewBoxContainer,
  Switch,
  Symbol,
  Text2,
  TextChild,
  TextContainer,
  TextPath,
  TextPositionedContainer,
  TextRoot,
  TextSequence,
  TRef,
  TSpan,
  Unit,
  Use,
  View
} from './SVGBase';
import { CSSParser, Source } from './CSSParser';
import { SVGParser } from './SVGParser';
import { TextScanner } from './TextScanner';
import { NumberParser } from './NumberParser';
import { IntegerParser } from './IntegerParser';
import { SVGParseException } from '../SVGParseException';
import {
  FillRule,
  FontKerning,
  FontStyle,
  Isolation,
  LineCap,
  LineJoin,
  RenderQuality,
  Style,
  TextAnchor,
  TextDecoration,
  TextDirection,
  VectorEffect
} from './Style';
import { PreserveAspectRatio } from '../PreserveAspectRatio';
import { CSSTextScanner } from './CSSTextScanner';
import { SVGExternalFileResolver } from '../SVGExternalFileResolver';
import SVGXMLConstants from './SVGXMLConstants';
import { SVGXMLChecker } from './SVGXMLChecker'
import { Character } from './Character'
import xml from '@ohos.convertxml';

export class SVGParserImpl implements SVGParser {
  private static TAG: string = "SVGParser";
  private static SVG_NAMESPACE: string = "http://www.w3.org/2000/svg";
  private static XLINK_NAMESPACE: string = "http://www.w3.org/1999/xlink";
  private static FEATURE_STRING_PREFIX: string = "http://www.w3.org/TR/SVG11/feature#";
  private static XML_STYLESHEET_PROCESSING_INSTRUCTION: string = "xml-stylesheet";
  private static FORCE_SAX_ON_EARLY_ANDROIDS: boolean = false;
  private static PATTERN_BLOCK_COMMENTS: RegExp = new RegExp("/\\*.*?\\*/", "g");
  public static XML_STYLESHEET_ATTR_TYPE: string = "type";
  public static XML_STYLESHEET_ATTR_ALTERNATE: string = "alternate";
  public static XML_STYLESHEET_ATTR_HREF: string = "href";
  public static XML_STYLESHEET_ATTR_MEDIA: string = "media";
  public static XML_STYLESHEET_ATTR_MEDIA_ALL: string = "all";
  public static XML_STYLESHEET_ATTR_ALTERNATE_NO: string = "no";
  public static ENTITY_WATCH_BUFFER_SIZE: number = 4096;
  private svgDocument: SVGBase = null;
  private currentElement: SvgContainer = null;
  private myCurrentElement: SvgContainer = null;
  private enableInternalEntities: boolean = true;
  private externalFileResolver: SVGExternalFileResolver = null;
  private ignoring: boolean = false;
  private ignoreDepth: number;
  private inMetadataElement: boolean = false;
  private metadataTag: string = null;
  private metadataElementContents: string = null;
  private inStyleElement ;
  private styleElementContents: string = null;
  static NONE: string = "none";
  static CURRENTCOLOR: string = "currentColor";
  static VALID_DISPLAY_VALUES: string = "|inline|block|list-item|run-in|compact|marker|table|inline-table" +
  "|table-row-group|table-header-group|table-footer-group|table-row" +
  "|table-column-group|table-column|table-cell|table-caption|none|";
  static VALID_VISIBILITY_VALUES: string = "|visible|hidden|collapse|";

  public setInternalEntitiesEnabled(enable: boolean): SVGParser {
    this.enableInternalEntities = enable;
    return this;
  }

  public setExternalFileResolver(fileResolver: SVGExternalFileResolver): SVGParser {
    this.externalFileResolver = fileResolver;
    return this;
  }

  parseString(str: string): SVGBase {
    var xmlInstance = new xml.ConvertXML();
    var xmlResult = xmlInstance.convert(str, {
      trim: false,
      declarationKey: 'declaration',
      instructionKey: 'instruction',
      attributesKey: 'attributes',
      textKey: 'text',
      cdataKey: 'cdata',
      doctypeKey: 'doctype',
      commentKey: 'comment',
      parentKey: 'parent',
      typeKey: 'type',
      nameKey: 'name',
      elementsKey: 'elements'
    });
    if (xmlResult) {
      this.startDocument()
      let jsonString = JSON.stringify(xmlResult)
      var reg = new RegExp("stroke-", "g")
      jsonString = String(jsonString).replace(reg, "stroke_");
      reg = new RegExp("font-", "g")
      jsonString = String(jsonString).replace(reg, "font_");
      reg = new RegExp("text-", "g")
      jsonString = String(jsonString).replace(reg, "text_");
      reg = new RegExp("fill-", "g")
      jsonString = String(jsonString).replace(reg, "fill_");
      reg = new RegExp("stop-", "g")
      jsonString = String(jsonString).replace(reg, "stop_");
      reg = new RegExp("clip-", "g")
      jsonString = String(jsonString).replace(reg, "clip_");
      reg = new RegExp("marker-", "g")
      jsonString = String(jsonString).replace(reg, "marker_");
      reg = new RegExp("xml:", "g")
      jsonString = String(jsonString).replace(reg, "xml_");
      var svgElements: any[] = JSON.parse(jsonString).elements;
      console.info("json结果 = " + jsonString)
      if (!SVGXMLChecker.checkArrayEmpty(svgElements)) {
        for (let i = 0; i < svgElements.length; i++) {
          this.startElement(svgElements[i])
        }
      }
      return this.svgDocument;
    } else {
      new Error("parse failed, result is empty")
    }
  }

  startDocument() {
    this.svgDocument = new SVGBase(this.enableInternalEntities, this.externalFileResolver);
  }

  startElement(data: any) {
    if (this.ignoring) {
      this.ignoreDepth++;
      return;
    }
    switch (data.name) {
      case SVGXMLConstants.SVG_SVG_TAG:
        this.svg(data);
        break;
      case SVGXMLConstants.SVG_G_TAG:
        this.g(data);
        break;
      case SVGXMLConstants.SVG_DEFS_TAG:
        this.defs(data);
        break;
      case SVGXMLConstants.SVG_A_TAG:
        this.a(data);
        break;
      case SVGXMLConstants.SVG_USE_TAG:
        this.use(data);
        break;
      case SVGXMLConstants.SVG_PATH_TAG:
        this.path(data);
        break;
      case SVGXMLConstants.SVG_RECT_TAG:
        this.rect(data);
        break;
      case SVGXMLConstants.SVG_CIRCLE_TAG:
        this.circle(data);
        break;
      case SVGXMLConstants.SVG_ELLIPSE_TAG:
        this.ellipse(data);
        break;
      case SVGXMLConstants.SVG_LINE_TAG:
        this.line(data);
        break;
      case SVGXMLConstants.SVG_POLYLINE_TAG:
        this.polyline(data);
        break;
      case SVGXMLConstants.SVG_POLYGON_TAG:
        this.polygon(data);
        break;
      case SVGXMLConstants.SVG_TEXT_TAG:
        this.text(data);
        break;
      case SVGXMLConstants.SVG_TSPAN_TAG:
        this.tspan(data);
        break;
      case SVGXMLConstants.SVG_TREF_TAG:
        this.tref(data);
        break;
      case SVGXMLConstants.SVG_SWITCH_TAG:
        this.zwitch(data);
        break;
      case SVGXMLConstants.SVG_SYMBOL_TAG:
        this.symbol(data);
        break;
      case SVGXMLConstants.SVG_MARKER_TAG:
        this.marker(data);
        break;
      case SVGXMLConstants.SVG_LINEAR_GRADIENT_TAG:
        this.linearGradient(data);
        break;
      case SVGXMLConstants.SVG_RADIAL_GRADIENT_TAG:
        this.radialGradient(data);
        break;
      case SVGXMLConstants.SVG_STOP_TAG:
        this.stop(data);
        break;
      case SVGXMLConstants.SVG_TITLE_TAG:
      case SVGXMLConstants.SVG_DESC_TAG:
        this.inMetadataElement = true;
        this.metadataTag = data.name;
        break;
      case SVGXMLConstants.SVG_CLIP_PATH_TAG:
        this.clipPath(data);
        break;
      case SVGXMLConstants.SVG_TEXT_PATH_TAG:
        this.textPath(data);
        break;
      case SVGXMLConstants.SVG_PATTERN_TAG:
        this.pattern(data);
        break;
      case SVGXMLConstants.SVG_IMAGE_TAG:
        this.image(data);
        break;
      case SVGXMLConstants.SVG_VIEW_TAG:
        this.view(data);
        break;
      case SVGXMLConstants.SVG_MASK_TAG:
        this.mask(data);
        break;
      case SVGXMLConstants.SVG_STYLE_TAG:
        this.style(data);
        break;
      default:
        this.ignoring = true;
        this.ignoreDepth = 1;
        break;
    }
    this.endElement(data)
  }

  text(data: any) {
    this.debug("<text>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Text2 = new Text2();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesTransform(obj, data.attributes);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesTextPosition(obj, data.attributes);
    this.parseElementsOfText(obj, data.elements);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private parseElementsOfText(svg, elements: any[]) {
    if (elements == undefined || elements == null) {
      return
    }
    elements.forEach(item => {
      for (let itemKey in item) {
        let v = item[itemKey]
        switch (itemKey) {
          case "type":

            break
          case "text":
            svg.text = v
            break
        }
      }
    })
  }

  endElement(data: any) {
    if (this.ignoring) {
      if (--this.ignoreDepth == 0) {
        this.ignoring = false;
      }
      return;
    }

    switch (data.name) {
      case SVGXMLConstants.SVG_TITLE_TAG:
      case SVGXMLConstants.SVG_DESC_TAG:
        this.inMetadataElement = false;
        if (this.metadataElementContents != null) {
          if (this.metadataTag == SVGXMLConstants.SVG_TITLE_TAG)
          this.svgDocument.setTitle(this.metadataElementContents.toString());
          else if (this.metadataTag == SVGXMLConstants.SVG_DESC_TAG)
          this.svgDocument.setDesc(this.metadataElementContents.toString());
          this.metadataElementContents = '';
        }
        return;

      case SVGXMLConstants.SVG_STYLE_TAG:
        if (this.styleElementContents != null) {
          this.inStyleElement = false;
          this.parseCSSStyleSheet(this.styleElementContents);
          this.styleElementContents = '';
          return;
        }
        break;

      case SVGXMLConstants.SVG_SVG_TAG:
      case SVGXMLConstants.SVG_G_TAG:
      case SVGXMLConstants.SVG_DEFS_TAG:
      case SVGXMLConstants.SVG_A_TAG:
      case SVGXMLConstants.SVG_USE_TAG:
      case SVGXMLConstants.SVG_IMAGE_TAG:
      case SVGXMLConstants.SVG_TEXT_TAG:
      case SVGXMLConstants.SVG_TSPAN_TAG:
      case SVGXMLConstants.SVG_SWITCH_TAG:
      case SVGXMLConstants.SVG_SYMBOL_TAG:
      case SVGXMLConstants.SVG_MARKER_TAG:
      case SVGXMLConstants.SVG_LINEAR_GRADIENT_TAG:
      case SVGXMLConstants.SVG_RADIAL_GRADIENT_TAG:
      case SVGXMLConstants.SVG_STOP_TAG:
      case SVGXMLConstants.SVG_CLIP_PATH_TAG:
      case SVGXMLConstants.SVG_TEXT_PATH_TAG:
      case SVGXMLConstants.SVG_PATTERN_TAG:
      case SVGXMLConstants.SVG_VIEW_TAG:
      case SVGXMLConstants.SVG_MASK_TAG:
        if (this.currentElement == null) {
          throw new SVGParseException(`Unbalanced end element </%s> found ${data.name}`);
        }
      // @ts-ignore
        this.currentElement = (this.currentElement as SvgObject).parent;
        break;

      default:
    }

  }

  private debug(format: string, attributes, elements?) {
    console.info('正在解析 ' + format + '标签' + JSON.stringify(attributes));
  }

  private svg(data: any) {
    this.debug("<svg>", data.attributes);
    let obj: Svg = new Svg();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesViewBox(obj, data.attributes);
    this.parseAttributesSVG(obj, data.attributes);
    if (this.currentElement == null) {
      this.svgDocument.setRootElement(obj);
    } else {
      this.currentElement.addChild(obj);
    }
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private parseAttributesSVG(obj: Svg, attributes: any) {
    if (!SVGXMLChecker.checkObjectEmpty(attributes.x)) {
      obj.x = SVGParserImpl.parseLength(attributes.x);
    }
    if (!SVGXMLChecker.checkObjectEmpty(attributes.y)) {
      obj.y = SVGParserImpl.parseLength(attributes.y);
    }
    if (!SVGXMLChecker.checkObjectEmpty(attributes.width)) {
      obj.width = SVGParserImpl.parseLength(attributes.width);
      if (obj.width.isNegative())
      throw new SVGParseException("Invalid <svg> element. width cannot be negative");
    }
    if (!SVGXMLChecker.checkObjectEmpty(attributes.height)) {
      obj.height = SVGParserImpl.parseLength(attributes.height);
      if (obj.height.isNegative())
      throw new SVGParseException("Invalid <svg> element. height cannot be negative");
    }
    if (!SVGXMLChecker.checkObjectEmpty(attributes.version)) {
      obj.version = attributes.version;
    }

  }

  private g(data: any) {
    this.debug("<g>", data.attributes);
    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Group = new Group();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesTransform(obj, data.attributes);
    this.parseAttributesConditional(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private defs(data: any) {
    this.debug("<defs>", data.attributes);
    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Defs = new Defs();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesTransform(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private a(data: any) {
    this.debug("<a>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: A = new A();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesTransform(obj, data.attributes);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesA(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private parseAttributesA(obj: A, attributes: any) {
    for (let attributesKey in attributes) {
      let v = attributes[attributesKey]
      switch (attributesKey) {
        case "href":
          obj.href = v;
          break
      }
    }
  }

  private use(data: any) {
    this.debug("<use>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Use = new Use();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesTransform(obj, data.attributes);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesUse(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private parseAttributesUse(obj: Use, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "x":
          obj.x = SVGParserImpl.parseLength(val);
          break
        case "y":
          obj.y = SVGParserImpl.parseLength(val);
          break
        case "width":
          obj.width = SVGParserImpl.parseLength(val);
          if (obj.width.isNegative())
          throw new SVGParseException("Invalid <use> element. width cannot be negative");
          break
        case "height":
          obj.height = SVGParserImpl.parseLength(val);
          if (obj.height.isNegative())
          throw new SVGParseException("Invalid <use> element. height cannot be negative");
          break
        case "href":
          obj.href = val;
          break
      }
    }
  }

  private image(data: any) {
    this.debug("<image>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Image2 = new Image2();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesTransform(obj, data.attributes);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesImage(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private parseAttributesImage(obj: Image2, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "x":
          obj.x = SVGParserImpl.parseLength(val);
          break
        case "y":
          obj.y = SVGParserImpl.parseLength(val);
          break
        case "width":
          obj.width = SVGParserImpl.parseLength(val);
          if (obj.width.isNegative())
          throw new SVGParseException("Invalid <use> element. width cannot be negative");
          break
        case "height":
          obj.height = SVGParserImpl.parseLength(val);
          if (obj.height.isNegative())
          throw new SVGParseException("Invalid <use> element. height cannot be negative");
          break
        case "href":
          obj.href = val;
          break
        case "preserveAspectRatio":
          SVGParserImpl.parsePreserveAspectRatio(obj, val);
          break
      }
    }
  }

  private path(data: any) {
    this.debug("<path>", data.attributes);
    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Path2 = new Path2();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesTransform(obj, data.attributes);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesPath(obj, data.attributes);
    this.currentElement.addChild(obj);
  }

  private parseAttributesPath(obj: Path2, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "d":
          obj.d = SVGParserImpl.parsePath(val);
          break
        case "pathLength":
          obj.pathLength = SVGParserImpl.parseFloat(val);
          if (obj.pathLength < 0)
          throw new SVGParseException("Invalid <path> element. pathLength cannot be negative");
          break
      }
    }
  }

  private rect(data: any) {
    this.debug("<rect>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Rect2 = new Rect2();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesTransform(obj, data.attributes);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesRect(obj, data.attributes);
    this.currentElement.addChild(obj);
  }

  private parseAttributesRect(obj: Rect2, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey];
      switch (attributesKey) {
        case "x":
          obj.x = SVGParserImpl.parseLength(val);
          break
        case "y":
          obj.y = SVGParserImpl.parseLength(val);
          break
        case "width":
          obj.width = SVGParserImpl.parseLength(val);
          if (obj.width.isNegative())
          throw new SVGParseException("Invalid <rect> element. width cannot be negative");

          break
        case "height":
          obj.height = SVGParserImpl.parseLength(val);
          if (obj.height.isNegative())
          throw new SVGParseException("Invalid <rect> element. height cannot be negative");

          break
        case "rx":
          obj.rx = SVGParserImpl.parseLength(val);
          if (obj.rx.isNegative())
          throw new SVGParseException("Invalid <rect> element. rx cannot be negative");

          break
        case "ry":
          obj.ry = SVGParserImpl.parseLength(val);
          if (obj.ry.isNegative())
          throw new SVGParseException("Invalid <rect> element. ry cannot be negative");

          break
      }
    }
  }

  private circle(data: any) {
    this.debug("<circle>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Circle2 = new Circle2();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesTransform(obj, data.attributes);
    this.parseAttributesConditional(obj, data.ttributes);
    this.parseAttributesCircle(obj, data.attributes);
    this.currentElement.addChild(obj);
  }

  private parseAttributesCircle(obj: Circle2, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "cx":
          obj.cx = SVGParserImpl.parseLength(val);
          break
        case "cy":
          obj.cy = SVGParserImpl.parseLength(val);
          break
        case "r":
          obj.r = SVGParserImpl.parseLength(val);
          if (obj.r.isNegative())
          throw new SVGParseException("Invalid <circle> element. r cannot be negative");
          break
      }
    }
  }

  private ellipse(data: any) {
    this.debug("<ellipse>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Ellipse2 = new Ellipse2();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesTransform(obj, data.attributes);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesEllipse(obj, data.attributes);
    this.currentElement.addChild(obj);
  }

  private parseAttributesEllipse(obj: Ellipse2, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "cx":
          obj.cx = SVGParserImpl.parseLength(val);
          break
        case "cy":
          obj.cy = SVGParserImpl.parseLength(val);
          break
        case "rx":
          obj.rx = SVGParserImpl.parseLength(val);
          if (obj.rx.isNegative())
          throw new SVGParseException("Invalid <ellipse> element. rx cannot be negative");
          break
        case "ry":
          obj.ry = SVGParserImpl.parseLength(val);
          if (obj.ry.isNegative())
          throw new SVGParseException("Invalid <ellipse> element. ry cannot be negative");
      }
    }
  }

  private line(data: any) {
    this.debug("<line>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Line2 = new Line2();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesTransform(obj, data.attributes);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesLine(obj, data.attributes);
    this.currentElement.addChild(obj);
  }

  private parseAttributesLine(obj: Line2, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "x1":
          obj.x1 = SVGParserImpl.parseLength(val);
          break
        case "y1":
          obj.y1 = SVGParserImpl.parseLength(val);
          break
        case "x2":
          obj.x2 = SVGParserImpl.parseLength(val);
          break
        case "y2":
          obj.y2 = SVGParserImpl.parseLength(val);
      }
    }
  }

  private polyline(data: any) {
    this.debug("<polyline>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: PolyLine = new PolyLine();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesTransform(obj, data.attributes);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesPolyLine(obj, data.attributes, "polyline");
    this.currentElement.addChild(obj);
  }

  private parseAttributesPolyLine(obj: PolyLine, attributes: any, tag: string) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "points":
          let scan: TextScanner = new TextScanner(val);
          let points: Array<number> = new Array<number>();
          scan.skipWhitespace();

          while (!scan.empty()) {
            let x: number = scan.nextFloat();
            if (Number.isNaN(x))
            throw new SVGParseException("Invalid <" + tag + "> points attribute. Non-coordinate content found in list.");
            scan.skipCommaWhitespace();
            let y: number = scan.nextFloat();
            if (Number.isNaN(y))
            throw new SVGParseException("Invalid <" + tag + "> points attribute. There should be an even number of coordinates.");
            scan.skipCommaWhitespace();
            points.push(x);
            points.push(y);
          }
          obj.points = new Array<number>(points.length);
          let j: number = 0;
          points.forEach(f => {
            obj.points[j++] = f;
          })
          break
      }
    }
  }

  private polygon(data: any) {
    this.debug("<polygon>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Polygon2 = new Polygon2();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesTransform(obj, data.attributes);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesPolyLine(obj, data.attributes, "polygon");
    this.currentElement.addChild(obj);
  }

  private parseAttributesTextPosition(obj: TextPositionedContainer, attributes: any) {
    if (attributes == undefined || attributes == null) {
      return
    }
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "x":
          obj.x = SVGParserImpl.parseLengthList(val);
          break
        case "y":
          obj.y = SVGParserImpl.parseLengthList(val);
          break
        case "dx":
          obj.dx = SVGParserImpl.parseLengthList(val);
          break
        case "hredyf":
          obj.dy = SVGParserImpl.parseLengthList(val);
          break
      }
    }
  }

  private tspan(data: any) {
    this.debug("<tspan>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    if (!(this.currentElement instanceof TextContainer))
    throw new SVGParseException("Invalid document. <tspan> elements are only valid inside <text> or other <tspan> elements.");
    let obj: TSpan = new TSpan();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesTextPosition(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.parseElementsOfText(obj, data.elements);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private tref(data: any) {
    this.debug("<tref>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    if (!(this.currentElement instanceof TextContainer))
    throw new SVGParseException("Invalid document. <tref> elements are only valid inside <text> or <tspan> elements.");
    let obj: TRef = new TRef();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesTRef(obj, data.attributes);
    this.currentElement.addChild(obj);
  }

  private parseAttributesTRef(obj: TRef, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "href":
          obj.href = val;
          break
      }
    }
  }

  private zwitch(data: any) {
    this.debug("<switch>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Switch = new Switch();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesTransform(obj, data.attributes);
    this.parseAttributesConditional(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private parseAttributesConditional(obj: SvgConditional, attributes: any) {
    if (attributes == undefined || attributes == null) {
      return
    }
    for (let attributesKey in attributes) {
      let v = attributes[attributesKey]
      switch (attributesKey) {
        case "requiredFeatures":
          obj.setRequiredFeatures(SVGParserImpl.parseRequiredFeatures(v));
          break
        case "requiredExtensions":
          obj.setRequiredExtensions(v);
          break
        case "systemLanguage":
          obj.setSystemLanguage(SVGParserImpl.parseSystemLanguage(v));
          break
        case "requiredFormats":
          obj.setRequiredFormats(SVGParserImpl.parseRequiredFormats(v));
          break
        case "requiredFonts":
          let fonts: Array<string> = SVGParserImpl.parseFontFamily(v);
          let fontSet: Set<string> = (fonts != null) ? new Set<string>(fonts) : new Set<string>();
          obj.setRequiredFonts(fontSet);
          break
      }
    }
  }

  private symbol(data: any) {
    this.debug("<symbol>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Symbol = new Symbol();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesViewBox(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private marker(data: any) {
    this.debug("<marker>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Marker = new Marker();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesViewBox(obj, data.attributes);
    this.parseAttributesMarker(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private parseAttributesMarker(obj: Marker, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "refX":
          obj.refX = SVGParserImpl.parseLength(val);
          break
        case "refY":
          obj.refY = SVGParserImpl.parseLength(val);
          break
        case "markerWidth":
          obj.markerWidth = SVGParserImpl.parseLength(val);
          if (obj.markerWidth.isNegative())
          throw new SVGParseException("Invalid <marker> element. markerWidth cannot be negative");
          break
        case "markerHeight":
          obj.markerHeight = SVGParserImpl.parseLength(val);
          if (obj.markerHeight.isNegative())
          throw new SVGParseException("Invalid <marker> element. markerHeight cannot be negative");
          break
        case "markerUnits":
          if ("strokeWidth" == (val)) {
            obj.markerUnitsAreUser = false;
          } else if ("userSpaceOnUse" == (val)) {
            obj.markerUnitsAreUser = true;
          } else {
            throw new SVGParseException("Invalid value for attribute markerUnits");
          }
          break
        case "orient":
          if ("auto" == (val)) {
            obj.orient = Number.NaN;
          } else {
            obj.orient = SVGParserImpl.parseFloat(val);
          }
          break
      }
    }
  }

  private linearGradient(data: any) {
    this.debug("<linearGradient>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: SvgLinearGradient = new SvgLinearGradient();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesGradient(obj, data.attributes);
    this.parseAttributesLinearGradient(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private parseAttributesGradient(obj: GradientElement, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "gradientUnits":
          if ("objectBoundingBox" == (val)) {
            obj.gradientUnitsAreUser = false;
          } else if ("userSpaceOnUse" == (val)) {
            obj.gradientUnitsAreUser = true;
          } else {
            throw new SVGParseException("Invalid value for attribute gradientUnits");
          }
          break
        case "gradientTransform":
          obj.gradientTransform = this.parseTransformList(val);
          break
        case "spreadMethod":
          try {
            obj.spreadMethod = val;
          } catch (e) {
            throw new SVGParseException("Invalid spreadMethod attribute. \"" + val + "\" is not a valid value.");
          }
          break
        case "href":
          obj.href = val;
          break
      }
    }
  }

  private parseAttributesLinearGradient(obj: SvgLinearGradient, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "x1":
          obj.x1 = SVGParserImpl.parseLength(val);
          break
        case "y1":
          obj.y1 = SVGParserImpl.parseLength(val);
          break
        case "x2":
          obj.x2 = SVGParserImpl.parseLength(val);
          break
        case "y2":
          obj.y2 = SVGParserImpl.parseLength(val);
          break
      }
    }
  }

  private radialGradient(data: any) {
    this.debug("<radialGradient>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: SvgRadialGradient = new SvgRadialGradient();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesGradient(obj, data.attributes);
    this.parseAttributesRadialGradient(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private parseAttributesRadialGradient(obj: SvgRadialGradient, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "cx":
          obj.cx = SVGParserImpl.parseLength(val);
          break
        case "cy":
          obj.cy = SVGParserImpl.parseLength(val);
          break
        case "r":
          obj.r = SVGParserImpl.parseLength(val);
          if (obj.r.isNegative())
          throw new SVGParseException("Invalid <radialGradient> element. r cannot be negative");
          break
        case "fx":
          obj.fx = SVGParserImpl.parseLength(val);
          break
        case "fy":
          obj.fy = SVGParserImpl.parseLength(val);
          break
      }
    }
  }

  private stop(data: any) {
    this.debug("<stop>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    if (!(this.currentElement instanceof GradientElement))
    throw new SVGParseException("Invalid document. <stop> elements are only valid inside <linearGradient> or <radialGradient> elements.");
    let obj: Stop = new Stop();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesStop(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private parseAttributesStop(obj: Stop, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "offset":
          obj.offset = this.parseGradientOffset(val);
          break
      }
    }
  }

  private parseGradientOffset(val: string): number {
    if (val.length == 0)
    throw new SVGParseException("Invalid offset value in <stop> (empty string)");
    let end: number = val.length;
    let isPercent: boolean = false;

    if (val.charAt(val.length - 1).charCodeAt(0) == '%'.charCodeAt(0)) {
      end -= 1;
      isPercent = true;
    }
    try {
      let scalar: number = SVGParserImpl.parseFloat(val);
      if (isPercent)
      scalar /= 100;
      return (scalar < 0) ? 0 : (scalar > 100) ? 100 : scalar;
    } catch (e) {
      throw new SVGParseException("Invalid offset value in <stop>: " + val, e);
    }
  }

  private clipPath(data: any) {
    this.debug("<clipPath>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: ClipPath = new ClipPath();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesTransform(obj, data.attributes);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesClipPath(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private parseAttributesClipPath(obj: ClipPath, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "clipPathUnits":
          if ("objectBoundingBox" == (val)) {
            obj.clipPathUnitsAreUser = false;
          } else if ("userSpaceOnUse" == (val)) {
            obj.clipPathUnitsAreUser = true;
          } else {
            throw new SVGParseException("Invalid value for attribute clipPathUnits");
          }
          break
      }
    }
  }

  private textPath(data: any) {
    this.debug("<textPath>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: TextPath = new TextPath();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesTextPath(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private parseAttributesTextPath(obj: TextPath, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "href":
          obj.href = val;
          break
        case "startOffset":
          obj.startOffset = SVGParserImpl.parseLength(val);
          break
      }
    }
  }

  private pattern(data: any) {
    this.debug("<pattern>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Pattern = new Pattern();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesViewBox(obj, data.attributes);
    this.parseAttributesPattern(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private parseAttributesPattern(obj: Pattern, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "patternUnits":
          if ("objectBoundingBox" == (val)) {
            obj.patternUnitsAreUser = false;
          } else if ("userSpaceOnUse" == (val)) {
            obj.patternUnitsAreUser = true;
          } else {
            throw new SVGParseException("Invalid value for attribute patternUnits");
          }
          break
        case "patternContentUnits":
          if ("objectBoundingBox" == (val)) {
            obj.patternContentUnitsAreUser = false;
          } else if ("userSpaceOnUse" == (val)) {
            obj.patternContentUnitsAreUser = true;
          } else {
            throw new SVGParseException("Invalid value for attribute patternContentUnits");
          }
          break
        case "patternTransform":
          obj.patternTransform = this.parseTransformList(val);
          break
        case "x":
          obj.x = SVGParserImpl.parseLength(val);
          break
        case "y":
          obj.y = SVGParserImpl.parseLength(val);
          break
        case "width":
          obj.width = SVGParserImpl.parseLength(val);
          if (obj.width.isNegative())
          throw new SVGParseException("Invalid <pattern> element. width cannot be negative");
          break
        case "height":
          obj.height = SVGParserImpl.parseLength(val);
          if (obj.height.isNegative())
          throw new SVGParseException("Invalid <pattern> element. height cannot be negative");
          break
        case "href":
          obj.href = val;
          break
      }
    }
  }

  private view(data: any) {
    this.debug("<view>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: View = new View();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesViewBox(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private mask(data: any) {
    this.debug("<mask>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");
    let obj: Mask = new Mask();
    obj.document = this.svgDocument;
    obj.parent = this.currentElement;
    this.parseAttributesCore(obj, data.attributes);
    this.parseAttributesStyle(obj, data);
    this.parseAttributesConditional(obj, data.attributes);
    this.parseAttributesMask(obj, data.attributes);
    this.currentElement.addChild(obj);
    this.currentElement = obj;
    this.parseAttributesChild(data.elements);
  }

  private parseAttributesMask(obj: Mask, attributes: any) {
    for (let attributesKey in attributes) {
      let val = attributes[attributesKey]
      switch (attributesKey) {
        case "maskUnits":
          if ("objectBoundingBox" == (val)) {
            obj.maskUnitsAreUser = false;
          } else if ("userSpaceOnUse" == (val)) {
            obj.maskUnitsAreUser = true;
          } else {
            throw new SVGParseException("Invalid value for attribute maskUnits");
          }
          break
        case "maskContentUnits":
          if ("objectBoundingBox" == (val)) {
            obj.maskContentUnitsAreUser = false;
          } else if ("userSpaceOnUse" == (val)) {
            obj.maskContentUnitsAreUser = true;
          } else {
            throw new SVGParseException("Invalid value for attribute maskContentUnits");
          }
          break
        case "x":
          obj.x = SVGParserImpl.parseLength(val);
          break
        case "y":
          obj.y = SVGParserImpl.parseLength(val);
          break
        case "width":
          obj.width = SVGParserImpl.parseLength(val);
          if (obj.width.isNegative())
          throw new SVGParseException("Invalid <mask> element. width cannot be negative");
          break
        case "height":
          obj.height = SVGParserImpl.parseLength(val);
          if (obj.height.isNegative())
          throw new SVGParseException("Invalid <mask> element. height cannot be negative");
          break
      }
    }
  }

  private parseAttributesCore(obj: SvgElementBase, attributes: any) {
    if (!SVGXMLChecker.checkObjectEmpty(attributes) && !SVGXMLChecker.checkObjectEmpty(attributes.id)) {
      obj.id = attributes.id;
    }
  }

  private parseAttributesStyle(obj: SvgElementBase, data: any) {
    if (data.attributes == undefined || data.attributes == null) {
      return
    }
    if (!SVGXMLChecker.checkObjectEmpty(data.attributes.class)) {
      obj.classNames = data.attributes.class;
    }
    if (!SVGXMLChecker.checkObjectEmpty(data.attributes.style)) {
      SVGParserImpl.parseStyle(obj, data.attributes.style);
    }
    if (obj.baseStyle == null) {
      obj.baseStyle = new Style();
    }
    Style.processStyleProperty(obj.baseStyle, data.attributes, true);
  }

  private static parseStyle(obj: SvgElementBase, style: string) {
    let scan: CSSTextScanner = new CSSTextScanner(style.replace(SVGParserImpl.PATTERN_BLOCK_COMMENTS, ""));
    while (!scan.empty()) {
      scan.skipWhitespace();
      let propertyName: string = scan.nextIdentifier();
      scan.skipWhitespace();
      if (scan.consume(';'))
      continue;
      if (!scan.consume(':'))
      break;
      scan.skipWhitespace();
      let propertyValue: string = scan.nextPropertyValue();
      if (propertyValue == null)
      continue;
      scan.skipWhitespace();
      if (scan.empty() || scan.consume(';')) {
        if (obj.style == null) {
          obj.style = new Style();
        }
        let attr = "{\"" + propertyName + "\":\"" + propertyValue + "\"}";
        Style.processStyleProperty(obj.style, JSON.parse(attr), false);
        scan.skipWhitespace();
      }
    }
  }

  private parseAttributesViewBox(obj: SvgViewBoxContainer, attributes: any) {
    for (let attributesKey in attributes) {
      let v = attributes[attributesKey]
      switch (attributesKey) {
        case "viewBox":
          obj.viewBox = SVGParserImpl.parseViewBox(v);
          break
        case "preserveAspectRatio":
          SVGParserImpl.parsePreserveAspectRatio(obj, v);
          break
      }
    }
  }

  private parseAttributesChild(elements: any[]) {
    if (elements != undefined && elements != null) {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].type == "element") {
          this.startElement(elements[i])
        }
      }
    }
  }

  private parseAttributesTransform(obj: HasTransform, attributes: any) {
    if (!SVGXMLChecker.checkObjectEmpty(attributes) && !SVGXMLChecker.checkObjectEmpty(attributes.transform)) {
      obj.setTransform(this.parseTransformList(attributes.transform));
    }
  }

  private parseTransformList(val: string): Matrix2D2 {
    let matrix: Matrix2D2 = new Matrix2D2();

    let scan: TextScanner = new TextScanner(val);
    scan.skipWhitespace();

    console.info("解析transform v= " + val)
    while (!scan.empty()) {
      let cmd: string = scan.nextFunction();
      if (cmd == null) {
        return matrix;
      }
      console.info('cmd = ' + cmd)

      switch (cmd) {
        case "matrix":
          scan.skipWhitespace();
          let a = scan.nextFloat();
          scan.skipCommaWhitespace();
          let b = scan.nextFloat();
          scan.skipCommaWhitespace();
          let c = scan.nextFloat();
          scan.skipCommaWhitespace();
          let d = scan.nextFloat();
          scan.skipCommaWhitespace();
          let e = scan.nextFloat();
          scan.skipCommaWhitespace();
          let f = scan.nextFloat();
          scan.skipWhitespace();

          if (Number.isNaN(f) || !scan.consume(')'))
          throw new SVGParseException("Invalid transform list: " + val);

          let m: Matrix2D2 = new Matrix2D2();
          m.setValues(a, c, e, b, px2vp(d), px2vp(f))
          matrix.appendMatrix(m);
          break;

        case "translate":
          scan.skipWhitespace();
          let tx: number = scan.nextFloat();
          let ty: number = scan.possibleNextFloat();
          scan.skipWhitespace();

          if (Number.isNaN(tx) || !scan.consume(')'))
          throw new SVGParseException("Invalid transform list: " + val);

          if (Number.isNaN(ty))
          matrix.translate(px2vp(tx), 0);
          else
          matrix.translate(px2vp(tx), px2vp(ty));
          break;

        case "scale":
          scan.skipWhitespace();
          let sx: number = scan.nextFloat();
          let sy: number = scan.possibleNextFloat();
          scan.skipWhitespace();
          if (Number.isNaN(sx) || !scan.consume(')')) {
            throw new SVGParseException("Invalid transform list: " + val);
          }
          if (Number.isNaN(sy)) {
            matrix.scale(sx, sx);
          } else {
            matrix.scale(sx, sy);
          }
          break;

        case "rotate": {
          scan.skipWhitespace();
          let ang: number = scan.nextFloat();
          let cx: number = scan.possibleNextFloat();
          let cy: number = scan.possibleNextFloat();
          scan.skipWhitespace();

          if (Number.isNaN(ang) || !scan.consume(')'))
          throw new SVGParseException("Invalid transform list: " + val);
          if (Number.isNaN(cx)) {
            matrix.rotate(ang);
          } else if (!Number.isNaN(cy)) {
            matrix.rotate(ang, cx, cy);
          } else {
            throw new SVGParseException("Invalid transform list: " + val);
          }
          break;
        }

        case "skewX":
          scan.skipWhitespace();
          let ang: number = scan.nextFloat();
          scan.skipWhitespace();

          if (Number.isNaN(ang) || !scan.consume(')'))
          throw new SVGParseException("Invalid transform list: " + val);

          matrix.skew(Math.tan(ang * (Math.PI / 180)), 0);
          break;

        case "skewY":
          scan.skipWhitespace();
          let ang2: number = scan.nextFloat();
          scan.skipWhitespace();

          if (Number.isNaN(ang2) || !scan.consume(')'))
          throw new SVGParseException("Invalid transform list: " + val);

          matrix.skew(0, Math.tan(ang2 * (Math.PI / 180)));
          break;

        default:
          throw new SVGParseException("Invalid transform list fn: " + cmd + ")");
      }
      if (scan.empty())
      break;
      scan.skipCommaWhitespace();
    }
    console.error('matrix = ' + JSON.stringify(matrix))
    return matrix;
  }

  static parseLength(val: string): Length {
    if (val.length == 0)
    throw new SVGParseException("Invalid length value (empty string)");
    let end: number = val.length;
    let unit: Unit = Unit.px;
    let lastChar: string = val.charAt(end - 1);
    if (lastChar == '%') {
      end -= 1;
      unit = Unit.percent;
    } else if (end > 2 && Character.isLetter(lastChar) && Character.isLetter(val.charAt(end - 2))) {
      end -= 2;
      let unitStr: string = val.substring(end);
      try {
        unit = Unit[unitStr.toLowerCase()];
      } catch (e) {
        throw new SVGParseException("Invalid length unit specifier: " + val);
      }
    }
    try {
      let scalar: number = this.parseFloat(val);
      return new Length(scalar, unit);
    }
    catch (e) {
      throw new SVGParseException("Invalid length value: " + val, e);
    }
  }

  private static parseLengthList(val: string): Array<Length> {
    if (val.length == 0)
    throw new SVGParseException("Invalid length list (empty string)");

    let coords: Array<Length> = [];

    let scan: TextScanner = new TextScanner(val);
    scan.skipWhitespace();

    while (!scan.empty()) {
      let scalar: number = scan.nextFloat();
      if (Number.isNaN(scalar))
      throw new SVGParseException("Invalid length list value: " + scan.ahead());
      let unit: Unit = scan.nextUnit();
      if (unit == null)
      unit = Unit.px;
      coords.push(new Length(scalar, unit));
      scan.skipCommaWhitespace();
    }
    return coords;
  }

  static parseFloat(val: string, offset?: number, len?: number): number {
    if (!offset) {
      offset = 0
    }
    if (!len) {
      len = val.length
    }
    let np: NumberParser = new NumberParser();
    let num: number = np.parseNumber(val, offset, len);
    if (!Number.isNaN(num)) {
      return num;
    } else {
      throw new SVGParseException("Invalid number value: " + val);
    }
  }

  static parseOpacity(val: string): number {
    try {
      let o: number = this.parseFloat(val);
      return (o < 0) ? 0 : Math.min(o, 1);
    } catch (e) {
      return null;
    }
  }

  private static parseViewBox(val: string): Box {
    let scan: TextScanner = new TextScanner(val);
    scan.skipWhitespace();

    let minX: number = scan.nextFloat();
    scan.skipCommaWhitespace();
    let minY: number = scan.nextFloat();
    scan.skipCommaWhitespace();
    let width: number = scan.nextFloat();
    scan.skipCommaWhitespace();
    let height: number = scan.nextFloat();

    if (Number.isNaN(minX) || Number.isNaN(minY) || Number.isNaN(width) || Number.isNaN(height))
    throw new SVGParseException("Invalid viewBox definition - should have four numbers");
    if (width < 0)
    throw new SVGParseException("Invalid viewBox. width cannot be negative");
    if (height < 0)
    throw new SVGParseException("Invalid viewBox. height cannot be negative");

    return new Box(minX, minY, width, height);
  }

  private static parsePreserveAspectRatio(obj: SvgPreserveAspectRatioContainer, val: string) {
    obj.preserveAspectRatio = PreserveAspectRatio.of(val);
  }

  static parsePaintSpecifier(val: string): SvgPaint {
    if (val.startsWith("url(")) {
      let closeBracket: number = val.indexOf(")");
      if (closeBracket != -1) {
        let href: string = val.substring(4, closeBracket).trim();
        let fallback: SvgPaint = null;
        val = val.substring(closeBracket + 1).trim();
        if (val.length > 0)
        fallback = this.parseColourSpecifer(val);
        return new PaintReference(href, fallback);
      }
      else {
        let href: string = val.substring(4).trim();
        return new PaintReference(href, null);
      }
    }
    return this.parseColourSpecifer(val);
  }

  private static parseColourSpecifer(val: string): SvgPaint {
    switch (val) {
      case SVGParserImpl.NONE:
        return Colour.TRANSPARENT;
      case SVGParserImpl.CURRENTCOLOR:
        return CurrentColor.getInstance();
      default:
        return this.parseColour(val);
    }
  }

  static parseColour(val: string): Colour {
    return new Colour(val)
  }

  private static clamp255(val: number): number {
    return (val < 0) ? 0 : (val > 255) ? 255 : Math.round(val);
  }

  private static hslToRgb(hue: number, sat: number, light: number): number {
    hue = (hue >= 0) ? hue % 360 : (hue % 360) + 360;
    hue /= 60;
    sat /= 100;
    light /= 100;
    sat = (sat < 0) ? 0 : Math.min(sat, 1);
    light = (light < 0) ? 0 : Math.min(light, 1);
    let t1, t2;
    if (light <= 0.5) {
      t2 = light * (sat + 1);
    } else {
      t2 = light + sat - (light * sat);
    }
    t1 = light * 2 - t2;
    let r = this.hueToRgb(t1, t2, hue + 2);
    let g = this.hueToRgb(t1, t2, hue);
    let b = this.hueToRgb(t1, t2, hue - 2);
    return this.clamp255(r * 256) << 16 | this.clamp255(g * 256) << 8 | this.clamp255(b * 256);
  }

  private static hueToRgb(t1: number, t2: number, hue: number): number {
    if (hue < 0) hue += 6;
    if (hue >= 6) hue -= 6;
    if (hue < 1) return (t2 - t1) * hue + t1;
    else if (hue < 3) return t2;
    else if (hue < 4) return (t2 - t1) * (4 - hue) + t1;
    else return t1;
  }

  private static parseColourKeyword(nameLowerCase: string): Colour {
    let colour = new ColourKeywords()
    let col: number = colour.get(nameLowerCase);
    return (col == null) ? Colour.BLACK : new Colour(col + "");
  }

  static parseFont(style: Style, val: string) {
    let fontWeight: number = null;
    let fontStyle: FontStyle = null;
    let fontVariant: string = null;
    let fontStretch: number = null;
    let fontVariantSmallCaps: boolean = null;

    let NORMAL: string = "normal";
    if ("|caption|icon|menu|message-box|small-caption|status-bar|".includes('|' + val + '|'))
    return;
    let scan: TextScanner = new TextScanner(val);
    let item: string;
    while (true) {
      item = scan.nextToken('/');
      scan.skipWhitespace();
      if (item == null)
      return;
      if (fontWeight != null && fontStyle != null)
      break;
      if (item == (NORMAL)) {
        continue;
      }
      let fontWeightKeywords = new FontWeightKeywords()
      if (fontWeight == null && fontWeightKeywords.contains(item)) {
        fontWeight = fontWeightKeywords.getValue(item);
        continue;
      }
      if (fontStyle == null) {
        fontStyle = this.parseFontStyle(item);
        if (fontStyle != null)
        continue;
      }

      let fontStretchKeywords = new FontStretchKeywords()
      if (fontStretch == null && fontStretchKeywords.contains(item)) {
        fontStretch = fontStretchKeywords.getValue(item);
        continue;
      }

      break;
    }
    let fontSize: Length = this.parseFontSize(item);
    if (scan.consume('/')) {
      scan.skipWhitespace();
      item = scan.nextToken();
      if (item != null) {
        try {
          SVGParserImpl.parseLength(item);
        } catch (e) {
          return;
        }
      }
      scan.skipWhitespace();
    }
    style.fontFamily = this.parseFontFamily(scan.restOfText());
    style.fontSize = fontSize;
    style.fontWeight = (fontWeight == null) ? Style.FONT_WEIGHT_NORMAL : fontWeight;
    style.fontStyle = (fontStyle == null) ? FontStyle.normal : fontStyle;
    style.fontStretch = (fontStretch == null) ? Style.FONT_STRETCH_NORMAL : fontStretch;
    style.fontKerning = FontKerning.auto;

    if (fontVariantSmallCaps == true) {
      style.specifiedFlags |= (Style.SPECIFIED_FONT_FAMILY | Style.SPECIFIED_FONT_SIZE | Style.SPECIFIED_FONT_WEIGHT | Style.SPECIFIED_FONT_STYLE | Style.SPECIFIED_FONT_STRETCH |
      Style.SPECIFIED_FONT_KERNING | Style.SPECIFIED_FONT_VARIANT_LIGATURES | Style.SPECIFIED_FONT_VARIANT_POSITION | Style.SPECIFIED_FONT_VARIANT_CAPS |
      Style.SPECIFIED_FONT_VARIANT_NUMERIC | Style.SPECIFIED_FONT_VARIANT_EAST_ASIAN | Style.SPECIFIED_FONT_FEATURE_SETTINGS | Style.SPECIFIED_FONT_VARIATION_SETTINGS);
    }
  }

  static parseFontFamily(val: string): Array<string> {
    let fonts: Array<string> = null;
    let scan: TextScanner = new TextScanner(val);
    while (true) {
      let item: string = scan.nextQuotedString();
      if (item == null)
      item = scan.nextTokenWithWhitespace(',');
      if (item == null)
      break;
      if (fonts == null)
      fonts = new Array<string>();
      fonts.push(item);
      scan.skipCommaWhitespace();
      if (scan.empty())
      break;
    }
    return fonts;
  }

  static parseFontSize(val: string): Length {
    try {
      let fontSizeKeywords = new FontSizeKeywords()
      let size: Length = fontSizeKeywords.get(val);
      if (size == null)
      size = SVGParserImpl.parseLength(val);
      return size;
    } catch (e) {
      return null;
    }
  }

  static parseFontWeight(val: string): number {
    let fontWeightKeywords = new FontWeightKeywords()
    let result: number = fontWeightKeywords.getValue(val);
    if (result == null) {
      let scan: TextScanner = new TextScanner(val);
      result = scan.nextFloat();
      scan.skipWhitespace();
      if (!scan.empty())
      return null;
      if (result < Style.FONT_WEIGHT_MIN || result > Style.FONT_WEIGHT_MAX)
      return null;
    }
    return result;
  }

  static parseFontStretch(val: string): number {
    let fontStretchKeywords = new FontStretchKeywords()
    let result: number = fontStretchKeywords.getValue(val);
    if (result == null) {
      let scan: TextScanner = new TextScanner(val);
      result = scan.nextFloat();
      if (!scan.consume('%'))
      return null;
      scan.skipWhitespace();
      if (!scan.empty())
      return null;
      if (result < Style.FONT_STRETCH_MIN)
      return null;
    }
    return result;
  }

  static parseFontStyle(val: string): FontStyle {
    switch (val) {
      case "italic":
        return FontStyle.italic;
      case "normal":
        return FontStyle.normal;
      case "oblique":
        return FontStyle.oblique;
      default:
        return null;
    }
  }

  static parseTextDecoration(val: string): TextDecoration {
    switch (val) {
      case SVGParserImpl.NONE:
        return TextDecoration.None;
      case "underline":
        return TextDecoration.Underline;
      case "overline":
        return TextDecoration.Overline;
      case "line-through":
        return TextDecoration.LineThrough;
      case "blink":
        return TextDecoration.Blink;
      default:
        return null;
    }
  }

  static parseTextDirection(val: string): TextDirection {
    switch (val) {
      case "ltr":
        return TextDirection.LTR;
      case "rtl":
        return TextDirection.RTL;
      default:
        return null;
    }
  }

  static parseFillRule(val: string): FillRule {
    if ("nonzero" == (val))
    return FillRule.NonZero;
    if ("evenodd" == (val))
    return FillRule.EvenOdd;
    return null;
  }

  static parseStrokeLineCap(val: string): LineCap {
    if ("butt" == (val))
    return LineCap.Butt;
    if ("round" == (val))
    return LineCap.Round;
    if ("square" == (val))
    return LineCap.Square;
    return null;
  }

  static parseStrokeLineJoin(val: string): LineJoin {
    if ("miter" == (val))
    return LineJoin.Miter;
    if ("round" == (val))
    return LineJoin.Round;
    if ("bevel" == (val))
    return LineJoin.Bevel;
    return null;
  }

  static parseStrokeDashArray(val: string): Length[] {
    let scan: TextScanner = new TextScanner(val);
    scan.skipWhitespace();
    if (scan.empty())
    return null;
    let dash: Length = scan.nextLength();
    if (dash == null)
    return null;
    if (dash.isNegative())
    return null;
    let sum: number = dash.getFloatValue();
    let dashes: Array<Length> = new Array<Length>();
    dashes.push(dash);
    while (!scan.empty()) {
      scan.skipCommaWhitespace();
      dash = scan.nextLength();
      if (dash == null)
      return null;
      if (dash.isNegative())
      return null;
      dashes.push(dash);
      sum += dash.getFloatValue();
    }
    if (sum == 0) {
      return null;
    }
    return dashes;
  }

  static parseTextAnchor(val: string): TextAnchor {
    switch (val) {
      case "start":
        return TextAnchor.Start;
      case "middle":
        return TextAnchor.Middle;
      case "end":
        return TextAnchor.End;
      default:
        return null;
    }
  }

  static parseOverflow(val: string): boolean {
    switch (val) {
      case "visible":
      case "auto":
        return true;
      case "hidden":
      case "scroll":
        return false;
      default:
        return null;
    }
  }

  static parseClip(val: string): CSSClipRect {
    if ("auto" == (val))
    return null;
    if (!val.startsWith("rect("))
    return null;

    let scan: TextScanner = new TextScanner(val.substring(5));
    scan.skipWhitespace();

    let top: Length = this.parseLengthOrAuto(scan);
    scan.skipCommaWhitespace();
    let right: Length = this.parseLengthOrAuto(scan);
    scan.skipCommaWhitespace();
    let bottom: Length = this.parseLengthOrAuto(scan);
    scan.skipCommaWhitespace();
    let left: Length = this.parseLengthOrAuto(scan);

    scan.skipWhitespace();
    if (!scan.consume(')') && !scan.empty()) {
      return null;
    }
    return new CSSClipRect(top, right, bottom, left);
  }

  private static parseLengthOrAuto(scan: TextScanner): Length {
    if (scan.consume("auto")) {
      return Length.ZERO;
    }
    return scan.nextLength();
  }

  static parseVectorEffect(val: string): VectorEffect {
    switch (val) {
      case SVGParserImpl.NONE:
        return VectorEffect.None;
      case "non-scaling-stroke":
        return VectorEffect.NonScalingStroke;
      default:
        return null;
    }
  }

  static parseRenderQuality(val: string): RenderQuality {
    switch (val) {
      case "auto":
        return RenderQuality.auto;
      case "optimizeQuality":
        return RenderQuality.optimizeQuality;
      case "optimizeSpeed":
        return RenderQuality.optimizeSpeed;
      default:
        return null;
    }
  }

  static parseIsolation(val: string): Isolation {
    switch (val) {
      case "auto":
        return Isolation.auto;
      case "isolate":
        return Isolation.isolate;
      default:
        return null;
    }
  }

  static parseLetterOrWordSpacing(val: string): Length {
    if ("normal" == (val))
    return Length.ZERO;
    else {
      try {
        let result: Length = SVGParserImpl.parseLength(val);
        return (result.unit == Unit.percent) ? null : result;
      } catch (e) {
        return null;
      }
    }
  }

  static parsePath(val: string): PathDefinition {
    let scan: TextScanner = new TextScanner(val);

    let currentX: number = 0, currentY = 0;
    let lastMoveX: number = 0, lastMoveY = 0;
    let lastControlX: number = 0, lastControlY = 0;
    let x, y, x1, y1, x2, y2: number;
    let rx, ry, xAxisRotation: number;
    let largeArcFlag, sweepFlag: boolean;

    let path: PathDefinition = new PathDefinition();
    path.d = val;

    if (scan.empty())
    return path;

    let pathCommand = scan.nextChar();
    if (pathCommand != 'M' && pathCommand != 'm')
    return path;

    while (true) {
      scan.skipWhitespace();

      switch (pathCommand) {

        case 'M':
        case 'm':
          x = scan.nextFloat();
          y = scan.checkedNextFloat(x);
          if (Number.isNaN(y)) {
            console.info("Bad path coords for " + (pathCommand) + " path segment");
            return path;
          }

          if (pathCommand == 'm' && !path.isEmpty()) {
            x += currentX;
            y += currentY;
          }
          path.moveTo(x, y);
          currentX = lastMoveX = lastControlX = x;
          currentY = lastMoveY = lastControlY = y;

          pathCommand = (pathCommand == 'm') ? 'l' : 'L';
          break;


        case 'L':
        case 'l':
          x = scan.nextFloat();
          y = scan.checkedNextFloat(x);
          if (Number.isNaN(y)) {
            console.info("Bad path coords for " + (pathCommand) + " path segment");
            return path;
          }
          if (pathCommand == 'l') {
            x += currentX;
            y += currentY;
          }
          path.lineTo(x, y);
          currentX = lastControlX = x;
          currentY = lastControlY = y;
          break;


        case 'C':
        case 'c':
          x1 = scan.nextFloat();
          y1 = scan.checkedNextFloat(x1);
          x2 = scan.checkedNextFloat(y1);
          y2 = scan.checkedNextFloat(x2);
          x = scan.checkedNextFloat(y2);
          y = scan.checkedNextFloat(x);
          if (Number.isNaN(y)) {
            console.info("Bad path coords for " + (pathCommand) + " path segment");
            return path;
          }
          if (pathCommand == 'c') {
            x += currentX;
            y += currentY;
            x1 += currentX;
            y1 += currentY;
            x2 += currentX;
            y2 += currentY;
          }
          path.cubicTo(x1, y1, x2, y2, x, y);
          lastControlX = x2;
          lastControlY = y2;
          currentX = x;
          currentY = y;
          break;


        case 'S':
        case 's':
          x1 = 2 * currentX - lastControlX;
          y1 = 2 * currentY - lastControlY;
          x2 = scan.nextFloat();
          y2 = scan.checkedNextFloat(x2);
          x = scan.checkedNextFloat(y2);
          y = scan.checkedNextFloat(x);
          if (Number.isNaN(y)) {
            console.info("Bad path coords for " + (pathCommand) + " path segment");
            return path;
          }
          if (pathCommand == 's') {
            x += currentX;
            y += currentY;
            x2 += currentX;
            y2 += currentY;
          }
          path.cubicTo(x1, y1, x2, y2, x, y);
          lastControlX = x2;
          lastControlY = y2;
          currentX = x;
          currentY = y;
          break;


        case 'Z':
        case 'z':
          path.close();
          currentX = lastControlX = lastMoveX;
          currentY = lastControlY = lastMoveY;
          break;


        case 'H':
        case 'h':
          x = scan.nextFloat();
          if (Number.isNaN(x)) {
            console.info("Bad path coords for " + (pathCommand) + " path segment");
            return path;
          }
          if (pathCommand == 'h') {
            x += currentX;
          }
          path.lineTo(x, currentY);
          currentX = lastControlX = x;
          break;


        case 'V':
        case 'v':
          y = scan.nextFloat();
          if (Number.isNaN(y)) {
            console.info("Bad path coords for " + (pathCommand) + " path segment");
            return path;
          }
          if (pathCommand == 'v') {
            y += currentY;
          }
          path.lineTo(currentX, y);
          currentY = lastControlY = y;
          break;


        case 'Q':
        case 'q':
          x1 = scan.nextFloat();
          y1 = scan.checkedNextFloat(x1);
          x = scan.checkedNextFloat(y1);
          y = scan.checkedNextFloat(x);
          if (Number.isNaN(y)) {
            console.info("Bad path coords for " + (pathCommand) + " path segment");
            return path;
          }
          if (pathCommand == 'q') {
            x += currentX;
            y += currentY;
            x1 += currentX;
            y1 += currentY;
          }
          path.quadTo(x1, y1, x, y);
          lastControlX = x1;
          lastControlY = y1;
          currentX = x;
          currentY = y;
          break;


        case 'T':
        case 't':
          x1 = 2 * currentX - lastControlX;
          y1 = 2 * currentY - lastControlY;
          x = scan.nextFloat();
          y = scan.checkedNextFloat(x);
          if (Number.isNaN(y)) {
            console.info("Bad path coords for " + (pathCommand) + " path segment");
            return path;
          }
          if (pathCommand == 't') {
            x += currentX;
            y += currentY;
          }
          path.quadTo(x1, y1, x, y);
          lastControlX = x1;
          lastControlY = y1;
          currentX = x;
          currentY = y;
          break;


        case 'A':
        case 'a':
          rx = scan.nextFloat();
          ry = scan.checkedNextFloat(rx);
          xAxisRotation = scan.checkedNextFloat(ry);
          largeArcFlag = scan.checkedNextFlag(xAxisRotation);
          sweepFlag = scan.checkedNextFlag(largeArcFlag);
          x = scan.checkedNextFloat(sweepFlag);
          y = scan.checkedNextFloat(x);
          if (Number.isNaN(y) || rx < 0 || ry < 0) {
            console.info("Bad path coords for " + (pathCommand) + " path segment");
            return path;
          }
          if (pathCommand == 'a') {
            x += currentX;
            y += currentY;
          }
          path.arcTo(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y);
          currentX = lastControlX = x;
          currentY = lastControlY = y;
          break;

        default:
          return path;
      }

      scan.skipCommaWhitespace();
      if (scan.empty())
      break;


      if (scan.hasLetter()) {

        pathCommand = scan.nextChar();
      }
    }
    return path;
  }

  private static parseRequiredFeatures(val: string): Set<string> {
    let scan: TextScanner = new TextScanner(val);
    let result: Set<string> = new Set<string>();

    while (!scan.empty()) {
      let feature: string = scan.nextToken();
      if (feature.startsWith(SVGParserImpl.FEATURE_STRING_PREFIX)) {
        result.add(feature.substring(SVGParserImpl.FEATURE_STRING_PREFIX.length));
      } else {
        result.add("UNSUPPORTED");
      }
      scan.skipWhitespace();
    }
    return result;
  }

  private static parseSystemLanguage(val: string): Set<string> {
    let scan: TextScanner = new TextScanner(val);
    let result: Set<string> = new Set<string>();

    while (!scan.empty()) {
      let language = scan.nextToken();
      let hyphenPos = language.indexOf('-');
      if (hyphenPos != -1) {
        language = language.substring(0, hyphenPos);
      }
      language = val
      result.add(language);
      scan.skipWhitespace();
    }
    return result;
  }

  private static parseRequiredFormats(val: string): Set<string> {
    let scan: TextScanner = new TextScanner(val);
    let result: Set<string> = new Set<string>();

    while (!scan.empty()) {
      let mimetype: string = scan.nextToken();
      result.add(mimetype);
      scan.skipWhitespace();
    }
    return result;
  }

  static parseFunctionalIRI(val: string): string {
    if (val == (SVGParserImpl.NONE))
    return null;
    if (!val.startsWith("url("))
    return null;
    if (val.endsWith(")"))
    return val.substring(4, val.length - 1).trim();
    else
    return val.substring(4).trim();

  }

  private style(data: any) {
    this.debug("<style>", data.attributes);

    if (this.currentElement == null)
    throw new SVGParseException("Invalid document. Root element must be <svg>");


    let isTextCSS: boolean = true;
    let media: string = "all";

    if (!SVGXMLChecker.checkObjectEmpty(data.attributes) && !SVGXMLChecker.checkObjectEmpty(data.attributes.type)) {
      isTextCSS = (data.attributes.type == CSSParser.CSS_MIME_TYPE);
    }
    if (!SVGXMLChecker.checkObjectEmpty(data.attributes) && !SVGXMLChecker.checkObjectEmpty(data.attributes.media)) {
      media = data.attributes.media;
    }
    if (!SVGXMLChecker.checkArrayEmpty(data.elements)) {
      this.styleElementContents = String(data.elements[0].text).trim()
    }
    if (isTextCSS && CSSParser.mediaMatches(media, "screen")) {
      this.inStyleElement = true;
    } else {
      this.ignoring = true;
      this.ignoreDepth = 1;
    }
  }

  private parseCSSStyleSheet(sheet: string) {
    let cssp: CSSParser = new CSSParser("screen", Source.Document, this.externalFileResolver);
    this.svgDocument.addCSSRules(cssp.parse(sheet));
  }
}

export class ColourKeywords {
  private colourKeywords: Map<string, number> = new Map<string, number>();

  constructor() {
    this.init()
  }

  init() {
    this.colourKeywords.set("aliceblue", 0xfff0f8ff);
    this.colourKeywords.set("antiquewhite", 0xfffaebd7);
    this.colourKeywords.set("aqua", 0xff00ffff);
    this.colourKeywords.set("aquamarine", 0xff7fffd4);
    this.colourKeywords.set("azure", 0xfff0ffff);
    this.colourKeywords.set("beige", 0xfff5f5dc);
    this.colourKeywords.set("bisque", 0xffffe4c4);
    this.colourKeywords.set("black", 0xff000000);
    this.colourKeywords.set("blanchedalmond", 0xffffebcd);
    this.colourKeywords.set("blue", 0xff0000ff);
    this.colourKeywords.set("blueviolet", 0xff8a2be2);
    this.colourKeywords.set("brown", 0xffa52a2a);
    this.colourKeywords.set("burlywood", 0xffdeb887);
    this.colourKeywords.set("cadetblue", 0xff5f9ea0);
    this.colourKeywords.set("chartreuse", 0xff7fff00);
    this.colourKeywords.set("chocolate", 0xffd2691e);
    this.colourKeywords.set("coral", 0xffff7f50);
    this.colourKeywords.set("cornflowerblue", 0xff6495ed);
    this.colourKeywords.set("cornsilk", 0xfffff8dc);
    this.colourKeywords.set("crimson", 0xffdc143c);
    this.colourKeywords.set("cyan", 0xff00ffff);
    this.colourKeywords.set("darkblue", 0xff00008b);
    this.colourKeywords.set("darkcyan", 0xff008b8b);
    this.colourKeywords.set("darkgoldenrod", 0xffb8860b);
    this.colourKeywords.set("darkgray", 0xffa9a9a9);
    this.colourKeywords.set("darkgreen", 0xff006400);
    this.colourKeywords.set("darkgrey", 0xffa9a9a9);
    this.colourKeywords.set("darkkhaki", 0xffbdb76b);
    this.colourKeywords.set("darkmagenta", 0xff8b008b);
    this.colourKeywords.set("darkolivegreen", 0xff556b2f);
    this.colourKeywords.set("darkorange", 0xffff8c00);
    this.colourKeywords.set("darkorchid", 0xff9932cc);
    this.colourKeywords.set("darkred", 0xff8b0000);
    this.colourKeywords.set("darksalmon", 0xffe9967a);
    this.colourKeywords.set("darkseagreen", 0xff8fbc8f);
    this.colourKeywords.set("darkslateblue", 0xff483d8b);
    this.colourKeywords.set("darkslategray", 0xff2f4f4f);
    this.colourKeywords.set("darkslategrey", 0xff2f4f4f);
    this.colourKeywords.set("darkturquoise", 0xff00ced1);
    this.colourKeywords.set("darkviolet", 0xff9400d3);
    this.colourKeywords.set("deeppink", 0xffff1493);
    this.colourKeywords.set("deepskyblue", 0xff00bfff);
    this.colourKeywords.set("dimgray", 0xff696969);
    this.colourKeywords.set("dimgrey", 0xff696969);
    this.colourKeywords.set("dodgerblue", 0xff1e90ff);
    this.colourKeywords.set("firebrick", 0xffb22222);
    this.colourKeywords.set("floralwhite", 0xfffffaf0);
    this.colourKeywords.set("forestgreen", 0xff228b22);
    this.colourKeywords.set("fuchsia", 0xffff00ff);
    this.colourKeywords.set("gainsboro", 0xffdcdcdc);
    this.colourKeywords.set("ghostwhite", 0xfff8f8ff);
    this.colourKeywords.set("gold", 0xffffd700);
    this.colourKeywords.set("goldenrod", 0xffdaa520);
    this.colourKeywords.set("gray", 0xff808080);
    this.colourKeywords.set("green", 0xff008000);
    this.colourKeywords.set("greenyellow", 0xffadff2f);
    this.colourKeywords.set("grey", 0xff808080);
    this.colourKeywords.set("honeydew", 0xfff0fff0);
    this.colourKeywords.set("hotpink", 0xffff69b4);
    this.colourKeywords.set("indianred", 0xffcd5c5c);
    this.colourKeywords.set("indigo", 0xff4b0082);
    this.colourKeywords.set("ivory", 0xfffffff0);
    this.colourKeywords.set("khaki", 0xfff0e68c);
    this.colourKeywords.set("lavender", 0xffe6e6fa);
    this.colourKeywords.set("lavenderblush", 0xfffff0f5);
    this.colourKeywords.set("lawngreen", 0xff7cfc00);
    this.colourKeywords.set("lemonchiffon", 0xfffffacd);
    this.colourKeywords.set("lightblue", 0xffadd8e6);
    this.colourKeywords.set("lightcoral", 0xfff08080);
    this.colourKeywords.set("lightcyan", 0xffe0ffff);
    this.colourKeywords.set("lightgoldenrodyellow", 0xfffafad2);
    this.colourKeywords.set("lightgray", 0xffd3d3d3);
    this.colourKeywords.set("lightgreen", 0xff90ee90);
    this.colourKeywords.set("lightgrey", 0xffd3d3d3);
    this.colourKeywords.set("lightpink", 0xffffb6c1);
    this.colourKeywords.set("lightsalmon", 0xffffa07a);
    this.colourKeywords.set("lightseagreen", 0xff20b2aa);
    this.colourKeywords.set("lightskyblue", 0xff87cefa);
    this.colourKeywords.set("lightslategray", 0xff778899);
    this.colourKeywords.set("lightslategrey", 0xff778899);
    this.colourKeywords.set("lightsteelblue", 0xffb0c4de);
    this.colourKeywords.set("lightyellow", 0xffffffe0);
    this.colourKeywords.set("lime", 0xff00ff00);
    this.colourKeywords.set("limegreen", 0xff32cd32);
    this.colourKeywords.set("linen", 0xfffaf0e6);
    this.colourKeywords.set("magenta", 0xffff00ff);
    this.colourKeywords.set("maroon", 0xff800000);
    this.colourKeywords.set("mediumaquamarine", 0xff66cdaa);
    this.colourKeywords.set("mediumblue", 0xff0000cd);
    this.colourKeywords.set("mediumorchid", 0xffba55d3);
    this.colourKeywords.set("mediumpurple", 0xff9370db);
    this.colourKeywords.set("mediumseagreen", 0xff3cb371);
    this.colourKeywords.set("mediumslateblue", 0xff7b68ee);
    this.colourKeywords.set("mediumspringgreen", 0xff00fa9a);
    this.colourKeywords.set("mediumturquoise", 0xff48d1cc);
    this.colourKeywords.set("mediumvioletred", 0xffc71585);
    this.colourKeywords.set("midnightblue", 0xff191970);
    this.colourKeywords.set("mintcream", 0xfff5fffa);
    this.colourKeywords.set("mistyrose", 0xffffe4e1);
    this.colourKeywords.set("moccasin", 0xffffe4b5);
    this.colourKeywords.set("navajowhite", 0xffffdead);
    this.colourKeywords.set("navy", 0xff000080);
    this.colourKeywords.set("oldlace", 0xfffdf5e6);
    this.colourKeywords.set("olive", 0xff808000);
    this.colourKeywords.set("olivedrab", 0xff6b8e23);
    this.colourKeywords.set("orange", 0xffffa500);
    this.colourKeywords.set("orangered", 0xffff4500);
    this.colourKeywords.set("orchid", 0xffda70d6);
    this.colourKeywords.set("palegoldenrod", 0xffeee8aa);
    this.colourKeywords.set("palegreen", 0xff98fb98);
    this.colourKeywords.set("paleturquoise", 0xffafeeee);
    this.colourKeywords.set("palevioletred", 0xffdb7093);
    this.colourKeywords.set("papayawhip", 0xffffefd5);
    this.colourKeywords.set("peachpuff", 0xffffdab9);
    this.colourKeywords.set("peru", 0xffcd853f);
    this.colourKeywords.set("pink", 0xffffc0cb);
    this.colourKeywords.set("plum", 0xffdda0dd);
    this.colourKeywords.set("powderblue", 0xffb0e0e6);
    this.colourKeywords.set("purple", 0xff800080);
    this.colourKeywords.set("rebeccapurple", 0xff663399);
    this.colourKeywords.set("red", 0xffff0000);
    this.colourKeywords.set("rosybrown", 0xffbc8f8f);
    this.colourKeywords.set("royalblue", 0xff4169e1);
    this.colourKeywords.set("saddlebrown", 0xff8b4513);
    this.colourKeywords.set("salmon", 0xfffa8072);
    this.colourKeywords.set("sandybrown", 0xfff4a460);
    this.colourKeywords.set("seagreen", 0xff2e8b57);
    this.colourKeywords.set("seashell", 0xfffff5ee);
    this.colourKeywords.set("sienna", 0xffa0522d);
    this.colourKeywords.set("silver", 0xffc0c0c0);
    this.colourKeywords.set("skyblue", 0xff87ceeb);
    this.colourKeywords.set("slateblue", 0xff6a5acd);
    this.colourKeywords.set("slategray", 0xff708090);
    this.colourKeywords.set("slategrey", 0xff708090);
    this.colourKeywords.set("snow", 0xfffffafa);
    this.colourKeywords.set("springgreen", 0xff00ff7f);
    this.colourKeywords.set("steelblue", 0xff4682b4);
    this.colourKeywords.set("tan", 0xffd2b48c);
    this.colourKeywords.set("teal", 0xff008080);
    this.colourKeywords.set("ColourKeywordstle", 0xffd8bfd8);
    this.colourKeywords.set("tomato", 0xffff6347);
    this.colourKeywords.set("turquoise", 0xff40e0d0);
    this.colourKeywords.set("violet", 0xffee82ee);
    this.colourKeywords.set("wheat", 0xfff5deb3);
    this.colourKeywords.set("white", 0xffffffff);
    this.colourKeywords.set("whitesmoke", 0xfff5f5f5);
    this.colourKeywords.set("yellow", 0xffffff00);
    this.colourKeywords.set("yellowgreen", 0xff9acd32);
    this.colourKeywords.set("transparent", 0x00000000);
  }

  get(colourName: string): number {
    return this.colourKeywords.get(colourName);
  }
}

export class FontSizeKeywords {
  private fontSizeKeywords: Map<string, Length> = new Map<string, Length>();

  constructor() {
    this.init()
  }

  init() {
    this.fontSizeKeywords.set("xx-small", new Length(0.694, Unit.pt));
    this.fontSizeKeywords.set("x-small", new Length(0.833, Unit.pt));
    this.fontSizeKeywords.set("small", new Length(10.0, Unit.pt));
    this.fontSizeKeywords.set("medium", new Length(12.0, Unit.pt));
    this.fontSizeKeywords.set("large", new Length(14.4, Unit.pt));
    this.fontSizeKeywords.set("x-large", new Length(17.3, Unit.pt));
    this.fontSizeKeywords.set("xx-large", new Length(20.7, Unit.pt));
    this.fontSizeKeywords.set("smaller", new Length(83.33, Unit.percent));
    this.fontSizeKeywords.set("larger", new Length(120, Unit.percent));
  }

  get(fontSize: string): Length {
    return this.fontSizeKeywords.get(fontSize);
  }
}

export class FontWeightKeywords {
  private fontWeightKeywords: Map<string, number> = new Map<string, number>();

  constructor() {
    this.init()
  }

  init() {
    this.fontWeightKeywords.set("normal", Style.FONT_WEIGHT_NORMAL);
    this.fontWeightKeywords.set("bold", Style.FONT_WEIGHT_BOLD);
    this.fontWeightKeywords.set("bolder", Style.FONT_WEIGHT_BOLDER);
    this.fontWeightKeywords.set("lighter", Style.FONT_WEIGHT_LIGHTER);
  }

  getValue(fontWeight: string): number {
    return this.fontWeightKeywords.get(fontWeight);
  }

  contains(fontStretch: string): boolean {
    return this.fontWeightKeywords.has(fontStretch);
  }
}

export class FontStretchKeywords {
  private fontStretchKeywords: Map<string, number> = new Map<string, number>();

  constructor() {
    this.init()
  }

  init() {
    this.fontStretchKeywords.set("ultra-condensed", 50);
    this.fontStretchKeywords.set("extra-condensed", 62.5);
    this.fontStretchKeywords.set("condensed", 75);
    this.fontStretchKeywords.set("semi-condensed", 87.5);
    this.fontStretchKeywords.set("normal", Style.FONT_STRETCH_NORMAL);
    this.fontStretchKeywords.set("semi-expanded", 112.5);
    this.fontStretchKeywords.set("expanded", 125);
    this.fontStretchKeywords.set("extra-expanded", 150);
    this.fontStretchKeywords.set("ultra-expanded", 200);
  }

  getValue(fontStretch: string): number {
    return this.fontStretchKeywords.get(fontStretch);
  }

  contains(fontStretch: string): boolean {
    return this.fontStretchKeywords.has(fontStretch);
  }
}
