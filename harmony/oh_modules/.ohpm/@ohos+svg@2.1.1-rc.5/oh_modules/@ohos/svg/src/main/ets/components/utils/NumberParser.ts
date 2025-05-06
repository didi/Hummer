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

export class NumberParser {
  private pos: number;

  getEndPos(): number {
    return this.pos;
  }

  parseNumber(input: string, startpos: number, len: number): number {
    let isNegative: boolean = false;
    let significand: number = 0;
    let numDigits: number = 0;
    let numLeadingZeroes: number = 0;
    let numTrailingZeroes: number = 0;
    let decimalSeen: boolean = false;
    let sigStart: number;
    let decimalPos: number = 0;
    let exponent: number;
    const TOO_BIG_L: number = Number.MAX_VALUE / 10;
    const TOO_BIG_I: number = Number.MAX_VALUE / 10;
    this.pos = startpos;
    if (this.pos >= len) {
      return Number.NaN;
    }
    let ch = input.charAt(this.pos).charCodeAt(0);
    switch (ch) {
      case '-'.charCodeAt(0):
        isNegative = true;
      case '+'.charCodeAt(0):
        this.pos++;
    }
    sigStart = this.pos;
    while (this.pos < len) {
      ch = input.charAt(this.pos).charCodeAt(0);
      if (ch == '0'.charCodeAt(0)) {
        if (numDigits == 0) {
          numLeadingZeroes++;
        } else {
          numTrailingZeroes++;
        }
      }
      else if (ch >= '1'.charCodeAt(0) && ch <= '9'.charCodeAt(0)) {
        numDigits += numTrailingZeroes;
        while (numTrailingZeroes > 0) {
          if (significand > TOO_BIG_L) {
            return Number.NaN;
          }
          significand *= 10;
          numTrailingZeroes--;
        }
        if (significand > TOO_BIG_L) {
          return Number.NaN;
        }
        significand = significand * 10 + (ch - '0'.charCodeAt(0));
        numDigits++;
        if (significand < 0)
        return Number.NaN;
      }
      else if (ch == '.'.charCodeAt(0)) {
        if (decimalSeen) {
          break;
        }
        decimalPos = this.pos - sigStart;
        decimalSeen = true;
      }
      else {
        break;
      }
      this.pos++;
    }
    if (decimalSeen && this.pos == (decimalPos + 1)) {
      return Number.NaN;
    }
    if (numDigits == 0) {
      if (numLeadingZeroes == 0) {
        return Number.NaN;
      }
      numDigits = 1;
    }
    if (decimalSeen) {
      exponent = decimalPos - numLeadingZeroes - numDigits;
    } else {
      exponent = numTrailingZeroes;
    }
    if (this.pos < len) {
      ch = input.charAt(this.pos).charCodeAt(0);
      if (ch == 'E'.charCodeAt(0) || ch == 'e'.charCodeAt(0)) {
        let expIsNegative: boolean = false;
        let expVal: number = 0;
        let abortExponent: boolean = false;
        this.pos++;
        if (this.pos == len) {
          return Number.NaN;
        }
        switch (input.charAt(this.pos).charCodeAt(0)) {
          case '-'.charCodeAt(0):
            expIsNegative = true;
          case '+'.charCodeAt(0):
            this.pos++;
            break;
          case '0'.charCodeAt(0):
          case '1'.charCodeAt(0):
          case '2'.charCodeAt(0):
          case '3'.charCodeAt(0):
          case '4'.charCodeAt(0):
          case '5'.charCodeAt(0):
          case '6'.charCodeAt(0):
          case '7'.charCodeAt(0):
          case '8'.charCodeAt(0):
          case '9'.charCodeAt(0):
            break;
          default:
            abortExponent = true;
            this.pos--;
        }
        if (!abortExponent) {
          let expStart: number = this.pos;
          while (this.pos < len) {
            ch = input.charAt(this.pos).charCodeAt(0);
            if (ch >= '0'.charCodeAt(0) && ch <= '9'.charCodeAt(0)) {
              if (expVal > TOO_BIG_I) {
                return Number.NaN;
              }
              expVal = expVal * 10 + (ch - '0'.charCodeAt(0));
              this.pos++;
            }
            else {
              break;
            }
          }
          if (this.pos == expStart) {
            return Number.NaN;
          }
          if (expIsNegative) {
            exponent -= expVal;
          }
          else {
            exponent += expVal;
          }
        }
      }
    }
    if ((exponent + numDigits) > 39 || (exponent + numDigits) < -44) {
      return Number.NaN;
    }
    let f: number = significand;
    if (significand != 0) {
      if (exponent > 0) {
        f *= NumberParser.positivePowersOf10[exponent];
      }
      else if (exponent < 0) {
        if (exponent < -38) {
          f *= 1e-20;
          exponent += 20;
        }
        f *= NumberParser.negativePowersOf10[-exponent];
      }
    }
    return (isNegative) ? -f : f;
  }

  private static positivePowersOf10: number[] = [
    1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9,
    1e10, 1e11, 1e12, 1e13, 1e14, 1e15, 1e16, 1e17, 1e18, 1e19,
    1e20, 1e21, 1e22, 1e23, 1e24, 1e25, 1e26, 1e27, 1e28, 1e29,
    1e30, 1e31, 1e32, 1e33, 1e34, 1e35, 1e36, 1e37, 1e38
  ];
  private static negativePowersOf10: number[] = [
    1e0, 1e-1, 1e-2, 1e-3, 1e-4, 1e-5, 1e-6, 1e-7, 1e-8, 1e-9,
    1e-10, 1e-11, 1e-12, 1e-13, 1e-14, 1e-15, 1e-16, 1e-17, 1e-18, 1e-19,
    1e-20, 1e-21, 1e-22, 1e-23, 1e-24, 1e-25, 1e-26, 1e-27, 1e-28, 1e-29,
    1e-30, 1e-31, 1e-32, 1e-33, 1e-34, 1e-35, 1e-36, 1e-37, 1e-38
  ];
}
