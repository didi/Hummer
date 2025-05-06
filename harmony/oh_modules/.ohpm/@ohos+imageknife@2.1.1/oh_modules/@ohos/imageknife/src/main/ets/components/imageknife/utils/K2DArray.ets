/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
/**
 * 定义一个二维数组
 */
export class K2DArray {
  private _2dArray: Array<Array<number>> = new Array<Array<number>>();
  private rows: number;
  private columns: number;

  public constructor(r: number, c: number, value: number) {
    this.rows = r;
    this.columns = c;
    this.initRows(r);
    this.initColumns(c, value);
  }

  private initRows(row: number) {
    if (row < 1) {
      return;
    }
    for (let i = 0; i < row; i++) {
      this._2dArray.push(new Array<number>())
    }
  }

  private initColumns(c: number, value: number) {
    if (c < 1) {
      return;
    }
    for (let i = 0; i < this._2dArray.length; i++) {
      for (let j = 0; j < c; j++) {
        this._2dArray[i].push(value);
      }
    }
  }

  /**
   * 获取数组
   */
  public getArray(): Array<Array<number>>{
    return this._2dArray;
  }

  /**
   * 获取数组
   */
  public getColumnsArray(r: number): Array<number>|null{
    if (r < 0 || r >= this.rows) {
      return null;
    }
    return this._2dArray[r];
  }

  /**
   * 获取值
   */
  public getValue(r: number, c: number): number|undefined{
    if (r < 0 || c < 0 || r >= this.rows || c >= this.columns) {
      return undefined;
    }
    return this._2dArray[r][c];
  }

  /**
   * 设置值
   */
  public setValye(r: number, c: number, value: number) {
    if (r < 0 || c < 0 || r >= this.rows || c >= this.columns) {
      return;
    }
    this._2dArray[r][c] = value;
  }
}