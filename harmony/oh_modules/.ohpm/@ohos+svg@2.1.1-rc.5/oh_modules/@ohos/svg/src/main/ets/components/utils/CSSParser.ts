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

import {SVGExternalFileResolver} from '../SVGExternalFileResolver'
import {Style} from './Style'
import {CSSTextScanner} from './CSSTextScanner'
import {SvgElementBase,SvgObject} from './SVGBase'
import type {SvgContainer} from './SVGBase'

export class CSSParser {
  private static TAG: string = "CSSParser";
  static CSS_MIME_TYPE: string = "text/css";
  static ID: string = "id";
  static CLASS: string = "class";
  public static SPECIFICITY_ID_ATTRIBUTE: number = 1000000;
  public static SPECIFICITY_ATTRIBUTE_OR_PSEUDOCLASS: number = 1000;
  public static SPECIFICITY_ELEMENT_OR_PSEUDOELEMENT: number = 1;
  private deviceMediaType: string  ;
  private externalFileResolver: SVGExternalFileResolver;
  private source: Source;
  private inMediaRule: boolean = false;

  constructor(rendererMediaType?: string, source?: Source, externalFileResolver?: SVGExternalFileResolver) {
    if (rendererMediaType == undefined) {
      this.deviceMediaType = "screen";
    }
    if (source == undefined) {
      source = Source.Document;
    }
    if (externalFileResolver == undefined) {
      externalFileResolver == null;
    }
    this.deviceMediaType = rendererMediaType;
    this.source = source;
    this.externalFileResolver = externalFileResolver;
  }

  parse(sheet: string): Ruleset {
    let scan: CSSTextScanner = new CSSTextScanner(sheet);
    scan.skipWhitespace();

    return this.parseRuleset(scan);
  }

  static mediaMatches(mediaListStr: string, rendererMediaType: string): boolean {
    let scan: CSSTextScanner = new CSSTextScanner(mediaListStr);
    scan.skipWhitespace();
    let mediaList: Array<string> = CSSParser.parseMediaList(scan);
    return this.mediaMatchesArray(mediaList, rendererMediaType);
  }

  private static mediaMatchesArray(mediaList: Array<string>, rendererMediaType: string): boolean {
    if (mediaList.length == 0)
    return true;
    for (let i = 0;i < mediaList.length; i++) {
      if (mediaList[i] == "all" || mediaList[i] == rendererMediaType)
      return true;
    }
    return false;
  }

  private static parseMediaList(scan: CSSTextScanner): Array<string> {
    let typeList: Array<string> = new Array();
    while (!scan.empty()) {
      let type: string = scan.nextWord();
      if (type == null)
      break;
      try {
        typeList.push(type);
      } catch (e) {

      }

      if (!scan.skipCommaWhitespace())
      break;
    }
    return typeList;
  }

  private parseAtRule(ruleset: Ruleset, scan: CSSTextScanner) {
    let atKeyword: string = scan.nextIdentifier();
    scan.skipWhitespace();
    if (atKeyword == null)
    throw new Error("Invalid '@' rule");
    if (!this.inMediaRule && atKeyword == "media") {
      let mediaList: Array<string> = CSSParser.parseMediaList(scan);
      if (!scan.consume('{'))
      throw new Error("Invalid @media rule: missing rule set");

      scan.skipWhitespace();
      if (CSSParser.mediaMatchesArray(mediaList, this.deviceMediaType)) {
        this.inMediaRule = true;
        ruleset.addAll(this.parseRuleset(scan));
        this.inMediaRule = false;
      } else {
        this.parseRuleset(scan);
      }

      if (!scan.empty() && !scan.consume('}'))
      throw new Error("Invalid @media rule: expected '}' at end of rule set");

    }
    else if (!this.inMediaRule && atKeyword == "import") {
      let file: string = scan.nextURL();
      if (file == null)
      file = scan.nextCSSString();
      if (file == null)
      throw new Error("Invalid @import rule: expected string or url()");

      scan.skipWhitespace();
      let mediaList: Array<string> = CSSParser.parseMediaList(scan);

      if (!scan.empty() && !scan.consume(';'))
      throw new Error("Invalid @media rule: expected '}' at end of rule set");

      if (this.externalFileResolver != null && CSSParser.mediaMatchesArray(mediaList, this.deviceMediaType)) {
        let css: string = this.externalFileResolver.resolveCSSStyleSheet(file);
        if (css == null)
        return;
        ruleset.addAll(this.parse(css));
      }
    }
    else {
      this.skipAtRule(scan);
    }
    scan.skipWhitespace();
  }

  private skipAtRule(scan: CSSTextScanner) {
    let depth = 0;
    while (!scan.empty()) {
      let ch = scan.nextChar();
      if (ch == ';' && depth == 0)
      return;
      if (ch == '{')
      depth++;
      else if (ch == '}' && depth > 0) {
        if (--depth == 0)
        return;
      }
    }
  }

  private parseRuleset(scan: CSSTextScanner): Ruleset {
    let ruleset = new Ruleset();
    try {
      while (!scan.empty()) {
        if (scan.consume("<!--"))
        continue;
        if (scan.consume("-->"))
        continue;
        if (scan.consume('@')) {
          this.parseAtRule(ruleset, scan);
          continue;
        }
        if (this.parseRule(ruleset, scan))
        continue;

        break;
      }
    }
    catch (e) {
      console.info(CSSParser.TAG + "CSS parser terminated early due to error: " + e.getMessage());

    }
    return ruleset;
  }

  private parseRule(ruleset: Ruleset, scan: CSSTextScanner): boolean {
    let selectors: Array<Selector> = scan.nextSelectorGroup();
    if (selectors != null && selectors.length > 0) {
      if (!scan.consume('{'))
      throw new Error("Malformed rule block: expected '{'");
      scan.skipWhitespace();
      let ruleStyle: Style = this.parseDeclarations(scan);
      scan.skipWhitespace();
      for (let i = 0;i < selectors.length; i++) {
        if (selectors[i] != undefined) {
          ruleset.add(new Rule(selectors[i], ruleStyle, this.source));
        }
      }
      return true;
    } else {
      return false;
    }
  }

  private parseDeclarations(scan: CSSTextScanner): Style {
    let ruleStyle = new Style();
    do {
      let propertyName = scan.nextIdentifier();
      scan.skipWhitespace();
      if (!scan.consume(':'))
      throw new Error("Expected ':'");
      scan.skipWhitespace();
      let propertyValue = scan.nextPropertyValue();
      if (propertyValue == null)
      throw new Error("Expected property value");

      scan.skipWhitespace();
      if (scan.consume('!')) {
        scan.skipWhitespace();
        if (!scan.consume("important")) {
          throw new Error("Malformed rule set: found unexpected '!'");
        }
        scan.skipWhitespace();
      }
      scan.consume(';');
      let attr = "{\"" + propertyName + "\":\"" + propertyValue + "\"}";
      Style.processStyleProperty(ruleStyle, JSON.parse(attr), false);
      scan.skipWhitespace();
    } while (!scan.empty() && !scan.consume('}'));
    return ruleStyle;
  }

  public static parseClassAttribute(val: string): Array<string> {
    let scan = new CSSTextScanner(val);
    let classNameList: Array<string> = null;

    while (!scan.empty()) {
      let className = scan.nextToken();
      if (className == null)
      continue;
      if (classNameList == null)
      classNameList = new Array();
      classNameList.push(className);
      scan.skipWhitespace();
    }
    return classNameList;
  }

  static ruleMatch(ruleMatchContext: RuleMatchContext, selector: Selector, obj: SvgElementBase): boolean {
    if (selector.size() == 1)
    return this.selectorMatch(ruleMatchContext, selector.get(0), obj);

    let ancestors: Array<SvgContainer> = new Array();
    let parent: SvgContainer = obj.parent;
    while (parent != null) {
      ancestors.push(parent);
      // @ts-ignore
      parent = (parent as SvgObject).parent;
    }
    return this.ruleMatch2(ruleMatchContext, selector, selector.size() - 1, ancestors, ancestors.length - 1, obj);
  }

  private static ruleMatch2(ruleMatchContext: RuleMatchContext, selector: Selector, selPartPos?: number, ancestors?: Array<SvgContainer>, ancestorsPos?: number, obj?: SvgElementBase): boolean {
    let sel: SimpleSelector = selector.get(selPartPos);
    if (!this.selectorMatch(ruleMatchContext, sel, obj))
    return false;

    if (sel.combinator == Combinator.DESCENDANT) {
      if (selPartPos == 0)
      return true;
      while (ancestorsPos >= 0) {
        if (this.ruleMatchOnAncestors(ruleMatchContext, selector, selPartPos - 1, ancestors, ancestorsPos))
        return true;
        ancestorsPos--;
      }
      return false;
    }
    else if (sel.combinator == Combinator.CHILD) {
      return this.ruleMatchOnAncestors(ruleMatchContext, selector, selPartPos - 1, ancestors, ancestorsPos);
    }
    else {
      let childPos = this.getChildPosition(ancestors, ancestorsPos, obj);
      if (childPos <= 0)
      return false;
      let prevSibling: SvgElementBase = obj.parent.getChildren()[childPos - 1] as SvgElementBase;
      return this.ruleMatch2(ruleMatchContext, selector, selPartPos - 1, ancestors, ancestorsPos, prevSibling);
    }
  }

  private static ruleMatchOnAncestors(ruleMatchContext: RuleMatchContext, selector: Selector, selPartPos: number, ancestors: Array<SvgContainer>, ancestorsPos: number): boolean {
    let sel: SimpleSelector = selector.get(selPartPos);
    // @ts-ignore
    let obj: SvgElementBase = ancestors[ancestorsPos] as SvgElementBase;

    if (!this.selectorMatch(ruleMatchContext, sel, obj))
    return false;

    if (sel.combinator == Combinator.DESCENDANT) {
      if (selPartPos == 0)
      return true;
      while (ancestorsPos > 0) {
        if (this.ruleMatchOnAncestors(ruleMatchContext, selector, selPartPos - 1, ancestors, --ancestorsPos))
        return true;
      }
      return false;
    }
    else if (sel.combinator == Combinator.CHILD) {
      return this.ruleMatchOnAncestors(ruleMatchContext, selector, selPartPos - 1, ancestors, ancestorsPos - 1);
    }
    else {
      let childPos: number = this.getChildPosition(ancestors, ancestorsPos, obj);
      if (childPos <= 0)
      return false;
      let prevSibling: SvgElementBase = obj.parent.getChildren()[childPos - 1] as SvgElementBase;
      return this.ruleMatch2(ruleMatchContext, selector, selPartPos - 1, ancestors, ancestorsPos, prevSibling);
    }
  }

  private static getChildPosition(ancestors: Array<SvgContainer>, ancestorsPos: number, obj: SvgElementBase): number {
    if (ancestorsPos < 0)
    return 0;
    if (ancestors[ancestorsPos] != obj.parent)
    return -1;
    let childPos = 0;
    for (let i = 0;i < obj.parent.getChildren().length; i++) {
      if (obj.parent.getChildren()[i] == obj)
      return childPos;
      childPos++;
    }
    return -1;
  }

  private static selectorMatch(ruleMatchContext: RuleMatchContext, sel: SimpleSelector, obj: SvgElementBase): boolean {
    if (sel.tag != null && sel.tag != obj.getNodeName().toLowerCase())
    return false;

    if (sel.attribs != null) {
      let count = sel.attribs.length;
      for (let i = 0; i < count; i++) {
        let attr: Attrib = sel.attribs[i];
        switch (attr.name) {
          case this.ID:
            if (attr.value != obj.id)
            return false;
            break;
          case this.CLASS:
            if (obj.classNames == null)
            return false;
            if (obj.classNames.indexOf(attr.value) == -1)
            return false;
            break;
          default:
            return false;
        }
      }
    }

    if (sel.pseudos != null) {
      let count = sel.pseudos.length;
      for (let i = 0; i < count; i++) {
        let pseudo: PseudoClass = sel.pseudos[i];
        if (!pseudo.matches(ruleMatchContext, obj))
        return false;
      }
    }

    return true;
  }
}

export enum Combinator {
  DESCENDANT,
  CHILD,
  FOLLOWS
}

export enum AttribOp {
  EXISTS,
  EQUALS,
  INCLUDES,
  DASHMATCH,
}

export class PseudoClassIdents {
  static target = "target";
  static root = "root";
  static nth_child = "nth_child";
  static nth_last_child = "nth_last_child";
  static nth_of_type = "nth_of_type";
  static nth_last_of_type = "nth_last_of_type";
  static first_child = "first_child";
  static last_child = "last_child";
  static first_of_type = "first_of_type";
  static last_of_type = "last_of_type";
  static only_child = "only_child";
  static only_of_type = "only_of_type";
  static empty = "empty";
  static not = "not";
  static link = "link";
  static visited = "visited";
  static hover = "hover";
  static active = "active";
  static focus = "focus";
  static enabled = "enabled";
  static disabled = "disabled";
  static checked = "checked";
  static indeterminate = "indeterminate";
  static lang = "lang";
}

export enum Source {
  Document,
  RenderOptions
}

export class Attrib {
  public name: string;
  operation: AttribOp;
  public value: string;

  constructor(name: string, op: AttribOp, value: string) {
    this.name = name;
    this.operation = op;
    this.value = value;
  }
}

export class SimpleSelector {
  combinator: Combinator;
  tag: string;
  attribs: Array<Attrib> = null;
  pseudos: Array<PseudoClass> = null;

  constructor(combinator: Combinator, tag: string) {
    this.combinator = (combinator != null) ? combinator : Combinator.DESCENDANT;
    this.tag = tag;
  }

  addAttrib(attrName: string, op: AttribOp, attrValue: string) {
    if (this.attribs == null)
    this.attribs = new Array();
    this.attribs.push(new Attrib(attrName, op, attrValue));
  }

  addPseudo(pseudo: PseudoClass) {
    if (this.pseudos == null)
    this.pseudos = new Array();
    this.pseudos.push(pseudo);
  }
}

export class Ruleset {
  private rules: Array<Rule> = null;

  add(rule: Rule) {
    if (this.rules == null)
    this.rules = new Array();
    for (let i = 0;i < this.rules.length; i++) {
      let nextRule: Rule = this.rules[i]
      if (nextRule.selector.specificity > rule.selector.specificity) {
        this.rules.push(rule);
        return;
      }
    }

    this.rules.push(rule);
  }

  public addAll(rules: Ruleset) {
    if (rules.rules == null)
    return;
    if (this.rules == null)
    this.rules = new Array();
    for (let i = 0;i < rules.rules.length; i++) {
      this.add(rules.rules[i])
    }
  }

  public getRules(): Array<Rule> {
    return this.rules;
  }

  public isEmpty(): boolean {
    return this.rules == null || this.rules.length == 0;
  }

  ruleCount(): number {
    return (this.rules != null) ? this.rules.length : 0;
  }

  public removeFromSource(sourceToBeRemoved: Source) {
    if (this.rules == null)
    return;
    for (let i = 0;i < this.rules.length; i++) {
      if (this.rules[i].source == sourceToBeRemoved)
      this.rules.splice(i, 1);
    }
  }
}

export class Rule {
  selector: Selector;
  style: Style;
  source: Source;

  constructor(selector: Selector, style: Style, source: Source) {
    this.selector = selector;
    this.style = style;
    this.source = source;
  }
}

export interface PseudoClass {
  matches(ruleMatchContext: RuleMatchContext, obj: SvgElementBase): boolean;
}

export class Selector {
  simpleSelectors: Array<SimpleSelector> = null;
  specificity: number = 0;

  add(part: SimpleSelector) {
    if (this.simpleSelectors == null)
    this.simpleSelectors = new Array();
    this.simpleSelectors.push(part);
  }

  size(): number {
    return (this.simpleSelectors == null) ? 0 : this.simpleSelectors.length;
  }

  get(i: number): SimpleSelector {
    return this.simpleSelectors[i];
  }

  isEmpty(): boolean {
    return (this.simpleSelectors == null) || this.simpleSelectors.length == 0;
  }

  addedIdAttribute() {
    this.specificity += CSSParser.SPECIFICITY_ID_ATTRIBUTE;
  }

  addedAttributeOrPseudo() {
    this.specificity += CSSParser.SPECIFICITY_ATTRIBUTE_OR_PSEUDOCLASS;
  }

  addedElement() {
    this.specificity += CSSParser.SPECIFICITY_ELEMENT_OR_PSEUDOELEMENT;
  }
}

export class RuleMatchContext {
  targetElement: SvgElementBase;
}

export class PseudoClassAnPlusB implements PseudoClass {
  private a: number;
  private b: number;
  private isFromStart: boolean;
  private isOfType: boolean;
  private nodeName: string;

  constructor(a: number, b: number, isFromStart: boolean, isOfType: boolean, nodeName: string) {
    this.a = a;
    this.b = b;
    this.isFromStart = isFromStart;
    this.isOfType = isOfType;
    this.nodeName = nodeName;
  }

  public matches(ruleMatchContext: RuleMatchContext, obj: SvgElementBase): boolean {
    let nodeNameToCheck: string = (this.isOfType && this.nodeName == null) ? obj.getNodeName() : this.nodeName;

    let childPos = 0;
    let childCount = 1;

    if (obj.parent != null) {
      childCount = 0;

      for (let i = 0;i < obj.parent.getChildren().length; i++) {
        let child: SvgElementBase =
          obj.parent.getChildren()[i] as SvgElementBase;
        if (child == obj)
        childPos = childCount;
        if (nodeNameToCheck == null || child.getNodeName() == nodeNameToCheck)
        childCount++;
      }
    }

    childPos = this.isFromStart ? childPos + 1
                                : childCount - childPos;

    if (this.a == 0) {
      return childPos == this.b;
    }
    return ((childPos - this.b) % this.a) == 0 &&
    (childPos - this.b == 0 || (childPos - this.b > 0 ? 1 : -1) == (this.a > 0 ? 1 : -1));
  }
}


export class PseudoClassOnlyChild implements PseudoClass {
  private isOfType: boolean;
  private nodeName: string;

  public constructor(isOfType: boolean, nodeName: string) {
    this.isOfType = isOfType;
    this.nodeName = nodeName;
  }

  public matches(ruleMatchContext: RuleMatchContext, obj: SvgElementBase): boolean {
    let nodeNameToCheck: string = (this.isOfType && this.nodeName == null) ? obj.getNodeName() : this.nodeName;

    let childCount = 1;

    if (obj.parent != null) {
      childCount = 0;
      for (let i = 0;i < obj.parent.getChildren().length; i++) {
        let child: SvgElementBase =
          obj.parent.getChildren()[i] as SvgElementBase;
        if (nodeNameToCheck == null || child.getNodeName() == nodeNameToCheck)
        childCount++;
      }

    }

    return (childCount == 1);
  }
}

export class PseudoClassRoot implements PseudoClass {
  public matches(ruleMatchContext: RuleMatchContext, obj: SvgElementBase): boolean {
    return obj.parent == null;
  }
}


export class PseudoClassEmpty implements PseudoClass {
  public matches(ruleMatchContext: RuleMatchContext, obj: SvgElementBase): boolean {

    // @ts-ignore
    if (obj instanceof SvgContainer)
    // @ts-ignore
    return (obj as SvgContainer).getChildren().length == 0;
    else
    return true;

  }
}


export class PseudoClassNot implements PseudoClass {
  private selectorGroup: Array<Selector>;

  constructor(selectorGroup: Array<Selector>) {
    this.selectorGroup = selectorGroup;
  }

  public matches(ruleMatchContext: RuleMatchContext, obj: SvgElementBase): boolean {

    for (let i = 0;i < this.selectorGroup.length; i++) {
      if (CSSParser.ruleMatch(ruleMatchContext, this.selectorGroup[i], obj))
      return false;
    }
    return true;
  }

  getSpecificity(): number {

    let highest = Number.MIN_VALUE;
    for (let i = 0;i < this.selectorGroup.length; i++) {
      if (this.selectorGroup[i].specificity > highest)
      highest = this.selectorGroup[i].specificity;
    }
    return highest;
  }
}


export class PseudoClassTarget implements PseudoClass {
  public matches(ruleMatchContext: RuleMatchContext, obj: SvgElementBase): boolean {
    if (ruleMatchContext != null)
    return obj == ruleMatchContext.targetElement;
    else
    return false;
  }
}


export class PseudoClassNotSupported implements PseudoClass {
  private clazz: string;

  constructor(clazz: string) {
    this.clazz = clazz;
  }

  public matches(ruleMatchContext: RuleMatchContext, obj: SvgElementBase): boolean {
    return false;
  }
}


