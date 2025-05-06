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

export class IntegerParser {
  private pos: number
  private value: number

  constructor(value: number, pos: number) {
    this.value = value;
    this.pos = pos;
  }

  getEndPos(): number {
    return this.pos;
  }

  static parseInt(input: string, startpos: number, len: number, includeSign: boolean): IntegerParser {
    let pos: number = startpos;
    let isNegative: boolean = false;
    let value: number = 0;
    let ch: string;

    if (pos >= len)
    return null;

    if (includeSign) {
      ch = input.charAt(pos);
      switch (ch) {
        case '-':
          isNegative = true;

        case '+':
          pos++;
      }
    }
    let sigStart: number = pos;

    while (pos < len) {
      ch = input.charAt(pos);
      if (ch >= '0' && ch <= '9') {
        if (isNegative) {
          value = value * 10 - (Number(ch) - Number('0'));
          if (value < Number.MIN_VALUE)
          return null;
        } else {
          value = value * 10 + (Number(ch) - Number('0'));
          if (value > Number.MAX_VALUE)
          return null;
        }
      } else
      break;
      pos++;
    }


    if (pos == sigStart) {
      return null;
    }

    return new IntegerParser(value, pos);
  }

  getValue(): number {
    return Number(this.value);
  }

  static parseHex(input: string, startpos: number, len: number): IntegerParser {
    let pos: number = startpos;
    let value: number = 0;
    let ch: string;


    if (pos >= len)
    return null;

    while (pos < len) {
      ch = input.charAt(pos);
      if (ch.charCodeAt(0) >= '0'.charCodeAt(0) && ch.charCodeAt(0) <= '9'.charCodeAt(0)) {
        value = value * 16 + (Number(ch.charCodeAt(0)) - Number('0'.charCodeAt(0)));
      } else if (ch >= 'A' && ch <= 'F') {
        value = value * 16 + (Number(ch.charCodeAt(0)) - Number('A'.charCodeAt(0))) + 10;
      } else if (ch >= 'a' && ch <= 'f') {
        value = value * 16 + (Number(ch.charCodeAt(0)) - Number('a'.charCodeAt(0))) + 10;
      } else
      break;

      if (value > 0xffffffff) {
        return null;
      }

      pos++;
    }


    if (pos == startpos) {
      return null;
    }

    return new IntegerParser(value, pos);
  }
}
