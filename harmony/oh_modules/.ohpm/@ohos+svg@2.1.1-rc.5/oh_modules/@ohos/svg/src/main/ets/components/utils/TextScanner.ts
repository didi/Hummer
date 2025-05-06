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

import { NumberParser } from './NumberParser';
import { Length, Unit } from './SVGBase';
import { Character } from './Character';


export class TextScanner {
  input: string;
  position: number = 0;
  inputLength: number;
  private numberParser: NumberParser = new NumberParser();

  constructor(input: string) {
    this.input = input.trim();
    this.inputLength = this.input.length;
  }

  public empty(): boolean {
    return (this.position == this.inputLength);
  }

  isWhitespace(c): boolean {
    return (c == ' '.charCodeAt(0) || c == '\n'.charCodeAt(0) || c == '\r'.charCodeAt(0) || c == '\t'.charCodeAt(0));
  }

  public skipWhitespace() {
    while (this.position < this.inputLength) {
      if (!this.isWhitespace(this.input.charAt(this.position).charCodeAt(0)))
      break;
      this.position++;
    }
  }

  isEOL(c): boolean {
    return (c == '\n'.charCodeAt(0) || c == '\r'.charCodeAt(0));
  }

  public skipCommaWhitespace(): boolean {
    this.skipWhitespace();
    if (this.position == this.inputLength)
    return false;
    if (!(this.input.charAt(this.position).charCodeAt(0) == ','.charCodeAt(0))) {
      return false;
    }
    this.position++;
    this.skipWhitespace();
    return true;
  }

  public nextFloat(): number {
    let val: number = this.numberParser.parseNumber(this.input, this.position, this.inputLength);
    if (!Number.isNaN(val)) {
      this.position = this.numberParser.getEndPos();
    }
    return val;
  }

  possibleNextFloat(): number {
    this.skipCommaWhitespace();
    let val: number = this.numberParser.parseNumber(this.input, this.position, this.inputLength);
    if (!Number.isNaN(val))
    this.position = this.numberParser.getEndPos();
    return val;
  }

  checkedNextFloat(lastRead): number {
    if (typeof lastRead == 'number') {
      if (Number.isNaN(lastRead)) {
        return Number.NaN;
      }
      this.skipCommaWhitespace();
      return this.nextFloat();
    } else {
      if (lastRead == null) {
        return Number.NaN;
      }
      this.skipCommaWhitespace();
      return this.nextFloat();
    }

  }

  nextChar(): string {
    if (this.position == this.inputLength)
    return null;
    return this.input.charAt(this.position++);
  }

  nextLength(): Length {
    let scalar: number = this.nextFloat();
    console.log('scalar = ' + scalar)
    if (Number.isNaN(scalar))
    return null;
    let unit: Unit = this.nextUnit();
    if (unit == null)
    return new Length(scalar, Unit.px);
    else
    return new Length(scalar, unit);
  }

  nextFlag(): boolean {
    if (this.position == this.inputLength)
    return null;
    let ch: number = this.input.charAt(this.position).charCodeAt(0);
    if (ch == '0'.charCodeAt(0) || ch == '1'.charCodeAt(0)) {
      this.position++;
      return (ch == '1'.charCodeAt(0));
    }
    return null;
  }

  checkedNextFlag(lastRead): boolean {
    if (lastRead == null) {
      return null;
    }
    this.skipCommaWhitespace();
    return this.nextFlag();
  }

  public consume(str: string): boolean {
    if (str.length == 1) {
      let found = (this.position < this.inputLength && this.input.charAt(this.position).charCodeAt(0) == str.charCodeAt(0));
      if (found)
      this.position++;
      return found;
    } else {
      let len: number = str.length;
      let found: boolean = (this.position <= (this.inputLength - len) && this.input.charAt(this.position) == (str));
      if (found)
      this.position++;
      return found;
    }
  }

  advanceChar(): number {
    if (this.position == this.inputLength)
    return -1;
    this.position++;
    if (this.position < this.inputLength)
    return this.input.charAt(this.position).charCodeAt(0);
    else
    return -1;
  }

  nextTokenWithWhitespace(terminator: string): string {
    return this.nextToken(terminator, true);
  }

  nextToken(terminator?: string, allowWhitespace?: boolean): string {
    terminator = terminator == undefined ? ' ' : terminator
    allowWhitespace = allowWhitespace == undefined ? false : allowWhitespace

    if (this.empty())
    return null;

    let ch = this.input.charAt(this.position).charCodeAt(0);
    if ((!allowWhitespace && this.isWhitespace(ch)) || ch == terminator.charCodeAt(0))
    return null;

    let start: number = this.position;
    ch = this.advanceChar();
    while (ch != -1) {
      if (ch == terminator.charCodeAt(0))
      break;
      if (!allowWhitespace && this.isWhitespace(ch))
      break;
      ch = this.advanceChar();
    }
    return this.input.substring(start, this.position);
  }

  public nextWord(): string {
    if (this.empty())
    return null;
    let start: number = this.position;

    let ch = this.input.charAt(this.position).charCodeAt(0);
    if ((ch >= 'A'.charCodeAt(0) && ch <= 'Z'.charCodeAt(0)) || (ch >= 'a'.charCodeAt(0) && ch <= 'z'.charCodeAt(0))) {
      ch = this.advanceChar();
      while ((ch >= 'A'.charCodeAt(0) && ch <= 'Z'.charCodeAt(0)) || (ch >= 'a'.charCodeAt(0) && ch <= 'z'.charCodeAt(0)))
      ch = this.advanceChar();
      return this.input.substring(start, this.position);
    }
    this.position = start;
    return null;
  }

  nextFunction(): string {
    if (this.empty())
    return null;
    let start: number = this.position;

    let ch = this.input.charAt(this.position).charCodeAt(0);
    while ((ch >= 'a'.charCodeAt(0) && ch <= 'z'.charCodeAt(0)) || (ch >= 'A'.charCodeAt(0) && ch <= 'Z'.charCodeAt(0)))
    ch = this.advanceChar();
    let end: number = this.position;
    while (this.isWhitespace(ch))
    ch = this.advanceChar();
    if (ch == '('.charCodeAt(0)) {
      this.position++;
      return this.input.substring(start, end);
    }
    this.position = start;
    return null;
  }

  ahead(): string {
    let start: number = this.position;
    while (!this.empty() && !this.isWhitespace(this.input.charAt(this.position).charCodeAt(0)))
    this.position++;
    let str: string = this.input.substring(start, this.position);
    this.position = start;
    return str;
  }

  nextUnit(): string {
    if (this.empty())
    return null;
    let ch = this.input.charAt(this.position);
    if (ch.charCodeAt(0) == '%'.charCodeAt(0)) {
      this.position++;
      return Unit.percent;
    }
    if (this.position > (this.inputLength - 2))
    return null;
    try {
      let str: string = this.input.substring(this.position, this.position + 2);
      if (Character.isLetter(str)) {
        let result = str.toLocaleLowerCase('en-US')
        this.position += 2;
        return result
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  hasLetter(): boolean {
    if (this.position == this.inputLength)
    return false;
    let ch: number = this.input.charAt(this.position).charCodeAt(0);
    return ((ch >= 'a'.charCodeAt(0) && ch <= 'z'.charCodeAt(0)) || (ch >= 'A'.charCodeAt(0) && ch <= 'Z'.charCodeAt(0)));
  }

  public nextQuotedString(): string {
    if (this.empty())
    return null;
    let start: number = this.position;
    let ch = this.input.charAt(this.position).charCodeAt(0);
    let endQuote = ch;
    if (ch != '\''.charCodeAt(0) && ch != '"'.charCodeAt(0))
    return null;
    ch = this.advanceChar();
    while (ch != -1 && ch != endQuote)
    ch = this.advanceChar();
    if (ch == -1) {
      this.position = start;
      return null;
    }
    this.position++;
    return this.input.substring(start + 1, this.position - 1);
  }

  restOfText(): string {
    if (this.empty())
    return null;
    let start: number = this.position;
    this.position = this.inputLength;
    return this.input.substring(start);
  }
}


