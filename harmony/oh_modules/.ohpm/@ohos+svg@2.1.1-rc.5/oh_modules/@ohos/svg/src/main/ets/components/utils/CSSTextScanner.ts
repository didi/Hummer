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

import { TextScanner } from './TextScanner'
import { IntegerParser } from './IntegerParser'
import {
  AttribOp,
  Combinator,
  CSSParser,
  PseudoClass,
  PseudoClassAnPlusB,
  PseudoClassEmpty,
  PseudoClassIdents,
  PseudoClassNot,
  PseudoClassNotSupported,
  PseudoClassOnlyChild,
  PseudoClassRoot,
  PseudoClassTarget,
  Selector,
  SimpleSelector
} from './CSSParser'

export class CSSTextScanner extends TextScanner {
  static PATTERN_BLOCK_COMMENTS: RegExp = new RegExp("/\\*.*?\\*/", "g");

  constructor(input: string) {
    super(input.replace(CSSTextScanner.PATTERN_BLOCK_COMMENTS, ""))
  }

  public nextIdentifier(): string {
    let end: number = this.scanForIdentifier();
    if (end == this.position)
    return null;
    let result: string = this.input.substring(this.position, end);
    this.position = end;
    return result;
  }

  private scanForIdentifier(): number {
    if (this.empty())
    return this.position;
    let start: number = this.position;
    let lastValidPos: number = this.position;

    let ch = this.input.charAt(this.position).charCodeAt(0);
    if (ch == '-'.charCodeAt(0))
    ch = this.advanceChar();

    if ((ch >= 'A'.charCodeAt(0) && ch <= 'Z'.charCodeAt(0)) || (ch >= 'a'.charCodeAt(0) && ch <= 'z'.charCodeAt(0)) || (ch == '-'.charCodeAt(0)) || (ch == '_'.charCodeAt(0)) || (ch >= 0x80)) {
      ch = this.advanceChar();

      while ((ch >= 'A'.charCodeAt(0) && ch <= 'Z'.charCodeAt(0)) || (ch >= 'a'.charCodeAt(0) && ch <= 'z'.charCodeAt(0)) || (ch >= '0'.charCodeAt(0) && ch <= '9'.charCodeAt(0)) || (ch == '-'.charCodeAt(0)) || (ch == '_'.charCodeAt(0)) || (ch >= 0x80)) {
        ch = this.advanceChar();
      }
      lastValidPos = this.position;
    }
    this.position = start;
    return lastValidPos;
  }

  public nextSelectorGroup(): Array<Selector> {
    if (this.empty())
    return null;

    let selectorGroup: Array<Selector> = new Array<Selector>(1);
    let selector: Selector = new Selector();

    while (!this.empty()) {
      if (this.nextSimpleSelector(selector)) {

        if (!this.skipCommaWhitespace())
        continue;
        selectorGroup.push(selector);
        selector = new Selector();
      }
      else
      break;
    }
    if (!selector.isEmpty())
    selectorGroup.push(selector);
    return selectorGroup;
  }

  nextSimpleSelector(selector: Selector): boolean {
    if (this.empty())
    return false;

    let start: number = this.position;
    let combinator: Combinator = null;
    let selectorPart: SimpleSelector = null;

    if (!selector.isEmpty()) {
      if (this.consume('>')) {
        combinator = Combinator.CHILD;
        this.skipWhitespace();
      } else if (this.consume('+')) {
        combinator = Combinator.FOLLOWS;
        this.skipWhitespace();
      }
    }

    if (this.consume('*')) {
      selectorPart = new SimpleSelector(combinator, null);
    } else {
      let tag: string = this.nextIdentifier();
      if (tag != null) {
        selectorPart = new SimpleSelector(combinator, tag);
        selector.addedElement();
      }
    }

    while (!this.empty()) {
      if (this.consume('.')) {

        if (selectorPart == null)
        selectorPart = new SimpleSelector(combinator, null);
        let value: string = this.nextIdentifier();
        if (value == null)
        throw new Error("Invalid \".class\" simpleSelectors");
        selectorPart.addAttrib(CSSParser.CLASS, AttribOp.EQUALS, value);
        selector.addedAttributeOrPseudo();
        continue;
      }

      if (this.consume('#')) {

        if (selectorPart == null)
        selectorPart = new SimpleSelector(combinator, null);
        let value: string = this.nextIdentifier();
        if (value == null)
        throw new Error("Invalid \"#id\" simpleSelectors");
        selectorPart.addAttrib(CSSParser.ID, AttribOp.EQUALS, value);
        selector.addedIdAttribute();
        continue;
      }


      if (this.consume('[')) {
        if (selectorPart == null)
        selectorPart = new SimpleSelector(combinator, null);
        this.skipWhitespace();
        let attrName: string = this.nextIdentifier();
        let attrValue: string = null;
        if (attrName == null)
        throw new Error("Invalid attribute simpleSelectors");
        this.skipWhitespace();
        let op: AttribOp = null;
        if (this.consume('='))
        op = AttribOp.EQUALS;
        else if (this.consume("~="))
        op = AttribOp.INCLUDES;
        else if (this.consume("|="))
        op = AttribOp.DASHMATCH;
        if (op != null) {
          this.skipWhitespace();
          attrValue = this.nextAttribValue();
          if (attrValue == null)
          throw new Error("Invalid attribute simpleSelectors");
          this.skipWhitespace();
        }
        if (!this.consume(']'))
        throw new Error("Invalid attribute simpleSelectors");
        selectorPart.addAttrib(attrName, (op == null) ? AttribOp.EXISTS : op, attrValue);
        selector.addedAttributeOrPseudo();
        continue;
      }

      if (this.consume(':')) {
        if (selectorPart == null)
        selectorPart = new SimpleSelector(combinator, null);
        this.parsePseudoClass(selector, selectorPart);
        continue;
      }

      break;
    }

    if (selectorPart != null) {
      selector.add(selectorPart);
      return true;
    }


    this.position = start;
    return false;
  }

  private nextAnPlusB(): AnPlusB {
    if (this.empty())
    return null;

    let start: number = this.position;

    if (!this.consume('('))
    return null;
    this.skipWhitespace();

    let result: AnPlusB;
    if (this.consume("odd"))
    result = new AnPlusB(2, 1);
    else if (this.consume("even"))
    result = new AnPlusB(2, 0);
    else {
      let aSign: number = 1,
        bSign = 1;
      if (this.consume('+')) {

      } else if (this.consume('-')) {
        bSign = -1;
      }

      let a: IntegerParser = null,
        b = IntegerParser.parseInt(this.input, this.position, this.inputLength, false);
      if (b != null)
      this.position = b.getEndPos();

      if (this.consume('n') || this.consume('N')) {
        a = (b != null) ? b : new IntegerParser(1, this.position);
        aSign = bSign;
        b = null;
        bSign = 1;
        this.skipWhitespace();

        let hasB: boolean = this.consume('+');
        if (!hasB) {
          hasB = this.consume('-');
          if (hasB)
          bSign = -1;
        }

        if (hasB) {
          this.skipWhitespace();
          b = IntegerParser.parseInt(this.input, this.position, this.inputLength, false);
          if (b != null) {
            this.position = b.getEndPos();
          } else {
            this.position = start;
            return null;
          }
        }
      }

      result = new AnPlusB((a == null) ? 0 : aSign * a.getValue(),
          (b == null) ? 0 : bSign * b.getValue());
    }

    this.skipWhitespace();
    if (this.consume(')'))
    return result;

    this.position = start;
    return null;
  }

  private nextIdentListParam(): Array<string> {
    if (this.empty())
    return null;

    let start: number = this.position;
    let result: Array<string> = null;

    if (!this.consume('('))
    return null;
    this.skipWhitespace();

    do {
      let ident: string = this.nextIdentifier();
      if (ident == null) {
        this.position = start;
        return null;
      }
      if (result == null)
      result = new Array<string>();
      result.push(ident);
      this.skipWhitespace();
    } while (this.skipCommaWhitespace());

    if (this.consume(')'))
    return result;

    this.position = start;
    return null;
  }

  private nextPseudoNotParam(): Array<Selector> {
    if (this.empty())
    return null;

    let start: number = this.position;

    if (!this.consume('('))
    return null;
    this.skipWhitespace();


    let result: Array<Selector> = this.nextSelectorGroup();

    if (result == null) {
      this.position = start;
      return null;
    }

    if (!this.consume(')')) {
      this.position = start;
      return null;
    }

    for (let i = 0;i < result.length; i++) {
      let selector = result[i];
      if (selector.simpleSelectors == null)
      break;
      for (let j = 0;j < selector.simpleSelectors.length; j++) {
        let simpleSelector = selector.simpleSelectors[j];
        if (simpleSelector.pseudos == null)
        break;
        for (let z = 0;z < simpleSelector.pseudos.length; z++) {
          let pseudo = simpleSelector.pseudos[z];
          if (pseudo instanceof PseudoClassNot)
          return null;
        }
      }
    }

    return result;
  }

  private parsePseudoClass(selector: Selector, selectorPart: SimpleSelector) {


    let ident: string = this.nextIdentifier();
    if (ident == null)
    throw new Error("Invalid pseudo class");

    let pseudo: PseudoClass;
    switch (ident) {
      case PseudoClassIdents.first_child:
        pseudo = new PseudoClassAnPlusB(0, 1, true, false, null);
        selector.addedAttributeOrPseudo();
        break;

      case PseudoClassIdents.last_child:
        pseudo = new PseudoClassAnPlusB(0, 1, false, false, null);
        selector.addedAttributeOrPseudo();
        break;

      case PseudoClassIdents.only_child:
        pseudo = new PseudoClassOnlyChild(false, null);
        selector.addedAttributeOrPseudo();
        break;

      case PseudoClassIdents.first_of_type:
        pseudo = new PseudoClassAnPlusB(0, 1, true, true, selectorPart.tag);
        selector.addedAttributeOrPseudo();
        break;

      case PseudoClassIdents.last_of_type:
        pseudo = new PseudoClassAnPlusB(0, 1, false, true, selectorPart.tag);
        selector.addedAttributeOrPseudo();
        break;

      case PseudoClassIdents.only_of_type:
        pseudo = new PseudoClassOnlyChild(true, selectorPart.tag);
        selector.addedAttributeOrPseudo();
        break;

      case PseudoClassIdents.root:
        pseudo = new PseudoClassRoot();
        selector.addedAttributeOrPseudo();
        break;

      case PseudoClassIdents.empty:
        pseudo = new PseudoClassEmpty();
        selector.addedAttributeOrPseudo();
        break;

      case PseudoClassIdents.nth_child:
      case PseudoClassIdents.nth_last_child:
      case PseudoClassIdents.nth_of_type:
      case PseudoClassIdents.nth_last_of_type:
        let fromStart: boolean = ident == PseudoClassIdents.nth_child || ident == PseudoClassIdents.nth_of_type;
        let ofType: boolean = ident == PseudoClassIdents.nth_of_type || ident == PseudoClassIdents.nth_last_of_type;
        let ab: AnPlusB = this.nextAnPlusB();
        if (ab == null)
        throw new Error("Invalid or missing parameter section for pseudo class: " + ident);
        pseudo = new PseudoClassAnPlusB(ab.a, ab.b, fromStart, ofType, selectorPart.tag);
        selector.addedAttributeOrPseudo();
        break;

      case PseudoClassIdents.not:
        let notSelectorGroup: Array<Selector> = this.nextPseudoNotParam();
        if (notSelectorGroup == null)
        throw new Error("Invalid or missing parameter section for pseudo class: " + ident);
        pseudo = new PseudoClassNot(notSelectorGroup);
        selector.specificity = (pseudo as PseudoClassNot).getSpecificity();
        break;

      case PseudoClassIdents.target:

        pseudo = new PseudoClassTarget();
        selector.addedAttributeOrPseudo();
        break;

      case PseudoClassIdents.lang:
        let langs: Array<string> = this.nextIdentListParam();
        pseudo = new PseudoClassNotSupported(ident);
        selector.addedAttributeOrPseudo();
        break;

      case PseudoClassIdents.link:
      case PseudoClassIdents.visited:
      case PseudoClassIdents.hover:
      case PseudoClassIdents.active:
      case PseudoClassIdents.focus:
      case PseudoClassIdents.enabled:
      case PseudoClassIdents.disabled:
      case PseudoClassIdents.checked:
      case PseudoClassIdents.indeterminate:
        pseudo = new PseudoClassNotSupported(ident);
        selector.addedAttributeOrPseudo();
        break;

      default:
        throw new Error("Unsupported pseudo class: " + ident);
    }


    selectorPart.addPseudo(pseudo);

  }

  private nextAttribValue(): string {
    if (this.empty())
    return null;

    let result: string = this.nextQuotedString();
    if (result != null)
    return result;
    return this.nextIdentifier();
  }

  public nextPropertyValue(): string {
    if (this.empty())
    return null;
    let start = this.position;
    let lastValidPos = this.position;

    let ch = this.input.charAt(this.position).charCodeAt(0);
    while (ch != -1 && ch != ';'.charCodeAt(0) && ch != '}'.charCodeAt(0) && ch != '!'.charCodeAt(0) && !this.isEOL(ch)) {
      if (!this.isWhitespace(ch)) {
        lastValidPos = this.position + 1;
      }
      ch = this.advanceChar();
    }
    if (this.position > start) {
      return this.input.substring(start, lastValidPos);
    }
    this.position = start;
    return null;
  }

  public nextCSSString(): string {
    if (this.empty())
    return null;
    let ch = this.input.charAt(this.position);
    let endQuote = ch;
    if (ch.charCodeAt(0) != '\''.charCodeAt(0) && ch.charCodeAt(0) != '"'.charCodeAt(0))
    return null;

    let sb: string = '';
    this.position++;
    ch = this.nextChar();
    while (ch.charCodeAt(0) != -1 && ch.charCodeAt(0) != endQuote.charCodeAt(0)) {
      if (ch.charCodeAt(0) == '\\'.charCodeAt(0)) {

        ch = this.nextChar();
        if (ch.charCodeAt(0) == -1)
        continue;
        if (ch.charCodeAt(0) == '\n'.charCodeAt(0) || ch.charCodeAt(0) == '\r'.charCodeAt(0) || ch.charCodeAt(0) == '\f'.charCodeAt(0)) {
          ch = this.nextChar();
          continue;
        }
        let hc = this.hexChar(ch);
        if (hc != -1) {
          let codepoint = hc;
          for (let i = 1; i <= 5; i++) {
            ch = this.nextChar();
            hc = this.hexChar(ch);
            if (hc == -1)
            break;
            codepoint = codepoint * 16 + hc;
          }
          sb += codepoint.toString()
          continue;
        }


      }
      sb += ch.toString()
      ch = this.nextChar();
    }
    return sb.toString();
  }

  private hexChar(ch: string): number {
    if (ch.charCodeAt(0) >= '0'.charCodeAt(0) && ch.charCodeAt(0) <= '9'.charCodeAt(0))
    return (ch.charCodeAt(0) - '0'.charCodeAt(0));
    if (ch.charCodeAt(0) >= 'A'.charCodeAt(0) && ch.charCodeAt(0) <= 'F'.charCodeAt(0))
    return (ch.charCodeAt(0) - 'A'.charCodeAt(0)) + 10;
    if (ch.charCodeAt(0) >= 'a'.charCodeAt(0) && ch.charCodeAt(0) <= 'f'.charCodeAt(0))
    return (ch.charCodeAt(0) - 'a'.charCodeAt(0)) + 10;
    return -1;
  }

  public nextURL(): string {
    if (this.empty())
    return null;
    let start = this.position;
    if (!this.consume("url("))
    return null;

    this.skipWhitespace();

    let url = this.nextCSSString();
    if (url == null)
    url = this.nextLegacyURL();

    if (url == null) {
      this.position = start;
      return null;
    }

    this.skipWhitespace();

    if (this.empty() || this.consume(")"))
    return url;

    this.position = start;
    return null;
  }

  isISOControl(codePoint): boolean {
    return codePoint.charCodeAt(0) <= 0x9F && (codePoint.charCodeAt(0) >= 0x7F || (codePoint.charCodeAt(0) >>> 5 == 0));
  }

  nextLegacyURL(): string {
    let sb: string = '';

    while (!this.empty()) {
      let ch = this.input.charAt(this.position);

      if (ch.charCodeAt(0) == '\''.charCodeAt(0) || ch.charCodeAt(0) == '"'.charCodeAt(0) || ch.charCodeAt(0) == '('.charCodeAt(0) || ch.charCodeAt(0) == ')'.charCodeAt(0) || this.isWhitespace(ch) || this.isISOControl(ch))
      break;

      this.position++;
      if (ch.charCodeAt(0) == '\\'.charCodeAt(0)) {
        if (this.empty())
        continue;

        ch = this.input.charAt(this.position++);
        if (ch.charCodeAt(0) == '\n'.charCodeAt(0) || ch.charCodeAt(0) == '\r'.charCodeAt(0) || ch.charCodeAt(0) == '\f'.charCodeAt(0)) {
          continue;
        }
        let hc = this.hexChar(ch);
        if (hc != -1) {
          let codepoint = hc;
          for (let i = 1; i <= 5; i++) {
            if (this.empty())
            break;
            hc = this.hexChar(this.input.charAt(this.position));
            if (hc == -1)
            break;
            this.position++;
            codepoint = codepoint * 16 + hc;
          }
          sb += codepoint;
          continue;
        }


      }
      sb += ch;
    }
    if (sb.length == 0)
    return null;
    return sb.toString();
  }
}

export class AnPlusB {
  a: number;
  b: number;

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }
}
