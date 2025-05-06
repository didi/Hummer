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

export default class MyRect {
  left: number;
  top: number;
  right: number;
  bottom: number;

  constructor(left?: number, top?: number, right?: number, bottom?: number, r?: MyRect) {
    this.left = left == undefined ? 0 : left
    this.top = top == undefined ? 0 : top;
    this.right = right == undefined ? 0 : right;
    this.bottom = bottom == undefined ? 0 : bottom;
    if (r != null || r != undefined) {
      this.left = r.left;
      this.top = r.top;
      this.right = r.right;
      this.bottom = r.bottom;
    }
  }

  public static copyOrNull(r: MyRect): MyRect {
    return r == null ? null : new MyRect(r.left, r.top, r.right, r.bottom);
  }

  public isEmpty(): boolean {
    return this.left >= this.right || this.top >= this.bottom;
  }

  public width(): number {
    return this.right - this.left;
  }

  public height(): number {
    return this.bottom - this.top;
  }

  public centerX(): number {
    return (this.left + this.right) >> 1;
  }

  public centerY(): number {
    return (this.top + this.bottom) >> 1;
  }

  public exactCenterX(): number {
    return (this.left + this.right) * 0.5;
  }

  public exactCenterY(): number {
    return (this.top + this.bottom) * 0.5;
  }

  public setEmpty() {
    this.left = this.right = this.top = this.bottom = 0;
  }

  public set(left: number, top: number, right: number, bottom: number) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }

  public offset(dx: number, dy: number) {
    this.left += dx;
    this.top += dy;
    this.right += dx;
    this.bottom += dy;
  }

  public offsetTo(newLeft: number, newTop: number) {
    this.right += newLeft - this.left;
    this.bottom += newTop - this.top;
    this.left = newLeft;
    this.top = newTop;
  }

  public inset(left: number, top: number, right: number, bottom: number) {
    this.left += left;
    this.top += top;
    this.right -= right;
    this.bottom -= bottom;
  }

  public contains(x: number, y: number): boolean {
    return this.left < this.right && this.top < this.bottom
    && x >= this.left && x < this.right && y >= this.top && y < this.bottom;
  }
}