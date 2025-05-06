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
import {PngjException} from "../PngjException"

export class ImageInfo {
  private static MAX_COLS_ROW: number= 16777216;
  private cols: number;
  private rows: number;
  private bitDepth: number;
  private channels: number;
  private alpha: boolean;
  private greyscale: boolean;
  private indexed: boolean;
  private packed: boolean;
  private bitspPixel: number;
  private bytesPixel: number;
  private bytesPerRow: number;
  private samplesPerRow: number;
  private samplesPerRowPacked: number ;
  private totalPixels: number= -1;
  private totalRawBytes: number= -1;

  /**
	 * Full constructor
	 *
	 * @param cols
	 *            Width in pixels
	 * @param rows
	 *            Height in pixels
	 * @param bitdepth
	 *            Bits per sample, in the buffer : 8-16 for RGB true color and
	 *            greyscale
	 * @param alpha
	 *            Flag: has an alpha channel (RGBA or GA)
	 * @param grayscale
	 *            Flag: is gray scale (any bitdepth, with or without alpha)
	 * @param indexed
	 *            Flag: has palette
	 */
  constructor(cols: number, rows: number, bitdepth: number
              , alpha: boolean, grayscale: boolean, indexed: boolean) {
    this.cols = cols;
    this.rows = rows;
    this.alpha = alpha;
    this.indexed = indexed;
    this.greyscale = grayscale;

    if (grayscale && indexed) {
      throw new PngjException("palette and greyscale are mutually exclusive");
    }
    this.channels = (grayscale || indexed) ? (alpha ? 2 : 1) : (alpha ? 4 : 3);
    this.bitDepth = bitdepth;
    this.packed = bitdepth < 8;
    this.bitspPixel = (this.channels * this.bitDepth);
    this.bytesPixel = (this.bitspPixel + 7) / 8;
    this.bytesPerRow = (this.bitspPixel * cols + 7) / 8;
    this.samplesPerRow = this.channels * this.cols;
    this.samplesPerRowPacked = this.packed ? this.bytesPerRow : this.samplesPerRow;

    switch (this.bitDepth) {
      case 1:
      case 2:
      case 4:
        if (!(this.indexed || this.greyscale))
        throw new PngjException("only indexed or grayscale can have bitdepth=" + this.bitDepth);
        break;
      case 8:
        break;
      case 16:
        if (this.indexed) {
          throw new PngjException("indexed can't have bitdepth=" + this.bitDepth);
        }
        break;
      default:
        throw new PngjException("invalid bitdepth=" + this.bitDepth);
    }
    if (cols < 1 || cols > ImageInfo.MAX_COLS_ROW) {
      throw new PngjException("invalid cols=" + cols + " ???");
    }

    if (rows < 1 || rows > ImageInfo.MAX_COLS_ROW) {
      throw new PngjException("invalid rows=" + rows + " ???");
    }
    if (this.samplesPerRow < 1) {
      throw new PngjException("invalid image parameters (overflow?)");
    }
  }

  /**
	 * returns a copy with different size
	 *
	 * @param cols
	 *            if non-positive, the original is used
	 * @param rows
	 *            if non-positive, the original is used
	 * @return a new copy with the specified size and same properties
	 */
  public withSize(cols: number, rows: number): ImageInfo {
    return new ImageInfo(cols > 0 ? cols : this.cols, rows > 0 ? rows : this.rows, this.bitDepth, this.alpha,
      this.greyscale, this.indexed);
  }

  public getTotalPixels(): number {
    if (this.totalPixels < 0)
    this.totalPixels = this.cols * this.rows;
    return this.totalPixels;
  }

  public getTotalRawBytes(): number {
    if (this.totalRawBytes < 0)
    this.totalRawBytes = (this.bytesPerRow + 1) * this.rows;
    return this.totalRawBytes;
  }

  public toString(): string{
    return "ImageInfo [cols=" + this.cols + ", rows=" + this.rows + ", bitDepth="
    + this.bitDepth + ", channels=" + this.channels
    + ", alpha=" + this.alpha + ", greyscale="
    + this.greyscale + ", indexed=" + this.indexed + "]";
  }

  public toStringBrief(): string{
    return this.cols + "x" + this.rows + (this.bitDepth != 8 ? ("d" + this.bitDepth) : "") + (this.alpha ? "a" : "")
    + (this.indexed ? "p" : "") + (this.greyscale ? "g" : "");
  }

  public toStringDetail(): string{
    return "ImageInfo [cols=" + this.cols + ", rows=" + this.rows + ", bitDepth="
    + this.bitDepth + ", channels=" + this.channels + ", bitspPixel=" + this.bitspPixel
    + ", bytesPixel=" + this.bytesPixel + ", bytesPerRow=" + this.bytesPerRow
    + ", samplesPerRow=" + this.samplesPerRow + ", samplesPerRowP=" + this.samplesPerRowPacked
    + ", alpha=" + this.alpha + ", greyscale=" + this.greyscale + ", indexed=" + this.indexed
    + ", packed=" + this.packed + "]";
  }

  public hashCode(): number {
    const prime: number = 31;
    let result: number = 1;
    result = prime * result + (this.alpha ? 1231 : 1237);
    result = prime * result + this.bitDepth;
    result = prime * result + this.cols;
    result = prime * result + (this.greyscale ? 1231 : 1237);
    result = prime * result + (this.indexed ? 1231 : 1237);
    result = prime * result + this.rows;
    return result;
  }

  public equals(obj: ImageInfo): boolean {
    if (this == obj)
    return true;
    if (obj == null)
    return false;
    let other = obj;
    if (this.alpha != other.alpha)
    return false;
    if (this.bitDepth != other.bitDepth)
    return false;
    if (this.cols != other.cols)
    return false;
    if (this.greyscale != other.greyscale)
    return false;
    if (this.indexed != other.indexed)
    return false;
    if (this.rows != other.rows)
    return false;
    return true;
  }
}