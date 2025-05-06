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

declare type FontStyle = "normal" | "talic";

declare type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

declare type FontFamily = 'sans-serif' | 'serif' | 'monospace';

import Matrix2D2 from './Matrix'


export class Paint {
  private offScreen: boolean = false;
  private stroke: boolean = false;
  private alpha: number = 1;
  private color: string = "#000000";
  private strokeWidth: number = 2;
  private fontAlign: CanvasTextAlign = "start";
  private fontBaseline: CanvasTextBaseline = "top";
  private fontSize: number = vp2px(20);
  private fontStyle: FontStyle = 'talic';
  private fontWeight: FontWeight = 'normal';
  private fontFamily: FontFamily = 'sans-serif';
  private shadowBlur: number = 0;
  private shadowColor: string = "#00000000";
  private shadowOffsetX: number = 0;
  private shadowOffsetY: number = 0;
  private globalCompositeOperation: string = '';
  private lineCap: LineCapStyle;
  private lineJoin: LineJoinStyle;
  private strokeMiterLimit: number;
  private strokeDashArray: number[];
  private strokeDashOffset: number;
  private gr: CanvasGradient = null;

  constructor(paint?: Paint) {
    if (paint != undefined) {
      this.offScreen = paint.offScreen;
      this.stroke = paint.stroke;
      this.alpha = paint.alpha;
      this.color = paint.color;
      this.strokeWidth = paint.strokeWidth;
      this.fontAlign = paint.fontAlign;
      this.fontBaseline = paint.fontBaseline;
      this.fontSize = paint.fontSize;
      this.fontStyle = paint.fontStyle;
      this.fontWeight = paint.fontWeight;
      this.fontFamily = paint.fontFamily;
      this.shadowBlur = paint.shadowBlur;
      this.shadowColor = paint.shadowColor;
      this.shadowOffsetX = paint.shadowOffsetX;
      this.shadowOffsetY = paint.shadowOffsetY;
      this.globalCompositeOperation = paint.globalCompositeOperation;
      this.lineCap = paint.lineCap;
      this.lineJoin = paint.lineJoin;
      this.strokeMiterLimit = paint.strokeMiterLimit;
      this.strokeDashArray = paint.strokeDashArray;
      this.strokeDashOffset = paint.strokeDashOffset;
    }
  }

  setGradient(gr: CanvasGradient) {
    this.gr = gr
  }

  setStrokeDashOffset(strokeDashOffset: number) {
    this.strokeDashOffset = strokeDashOffset;
  }

  setStrokeDashArray(strokeDashArray: number[]) {
    this.strokeDashArray = strokeDashArray;
  }

  setStrokeMiterLimit(strokeMiterLimit: number) {
    this.strokeMiterLimit = strokeMiterLimit;
  }

  setLineJoin(lineJoin: LineJoinStyle) {
    this.lineJoin = lineJoin;
  }

  setLineCap(lineCap: LineCapStyle) {
    this.lineCap = lineCap;
  }

  setOffScreen(offScreen: boolean) {
    this.offScreen = offScreen;
    return this;
  }

  isOffScreen() {
    return this.offScreen;
  }

  setShadowOffsetY(shadowOffsetY: number) {
    this.shadowOffsetY = shadowOffsetY;
    return this;
  }

  getShadowOffsetY() {
    return this.shadowOffsetY;
  }

  setShadowOffsetX(shadowOffsetX: number) {
    this.shadowOffsetX = shadowOffsetX
    return this;
  }

  getShadowOffsetX() {
    return this.shadowOffsetX
  }

  setShadowColor(shadowColor: string) {
    this.shadowColor = shadowColor;
    return this;
  }

  getGradient() {
    return this.gr;
  }

  getShadowColor() {
    return this.shadowColor;
  }

  setShadowBlur(shadowBlur: number) {
    this.shadowBlur = shadowBlur;
    return this;
  }

  getShadowBlur() {
    return this.shadowBlur;
  }

  setFontStyle(fontStyle: FontStyle) {
    this.fontStyle = fontStyle;
    return this;
  }

  getFontStyle() {
    return this.fontStyle;
  }

  setFontWeight(fontWeight: FontWeight) {
    this.fontWeight = fontWeight;
    return this;
  }

  getFontWeight() {
    return this.fontWeight;
  }

  setFontFamily(fontFamily: FontFamily) {
    this.fontFamily = fontFamily;
    return this;
  }

  getFontFamily() {
    return this.fontFamily;
  }

  setStroke(stroke: boolean) {
    this.stroke = stroke;
    return this;
  }

  isStroke() {
    return this.stroke;
  }

  setAlpha(alpha: number) {
    this.alpha = alpha < 0 ? 0 : alpha;
    this.alpha = alpha > 1 ? 1 : alpha;
    return this;
  }

  getAlpha() {
    return this.alpha;
  }

  setColor(color: string) {
    this.color = color;
    return this;
  }

  getColor() {
    return this.color;
  }

  setStrokeWidth(strokeWidth: number) {
    this.strokeWidth = strokeWidth < 0 ? 0 : strokeWidth;
    return this;
  }

  getStrokeWidth() {
    return this.strokeWidth;
  }

  setFontAlign(fontAlign: CanvasTextAlign) {
    this.fontAlign = fontAlign;
    return this;
  }

  getFontAlign() {
    return this.fontAlign;
  }

  setFontBaseline(fontBaseline: CanvasTextBaseline) {
    this.fontBaseline = fontBaseline;
    return this;
  }

  getFontBaseline() {
    return this.fontBaseline;
  }

  setFontSize(fontSize: number): Paint {
    this.fontSize = fontSize < 0 ? 0 : fontSize;
    return this;
  }

  getFontSize() {
    return this.fontSize;
  }

  setGlobalCompositeOperation(globalCompositeOperation: string) {
    this.globalCompositeOperation = globalCompositeOperation;
  }

  getGlobalCompositeOperation() {
    return this.globalCompositeOperation;
  }
}


export interface ICanvas {


  drawLine(startX: number, startY: number, stopX: number, stopY: number, paint: Paint): void;

  drawText(text: string, x: number, y: number, paint: Paint, maxWidth?: number): void;

  drawCircle(x: number, y: number, radius: number, paint: Paint): void;

  drawOval(x: number, y: number, width: number, height: number, paint: Paint): void;

  drawArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, paint: Paint, counterclockwise?: boolean): void;

  drawRect(x: number, y: number, width: number, height: number, paint: Paint): void;

  drawRoundRect(x: number, y: number, width: number, height: number, radius: number, paint: Paint): void;

  drawImage(image: ImageBitmap, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number, paint: Paint): void;

  measureText(text: string, paint: Paint): TextMetrics;

  rotate(x: number, y: number, angle: number, paint: Paint): void;

  scale(x: number, y: number, paint: Paint): void;

  translate(x: number, y: number, paint: Paint): void;

  restore(paint: Paint): void;

  save(paint: Paint): void;

  clear(): void;

  getImageData(): ImageData;

  getPixelMap(): PixelMap;
}


export class CanvasImpl implements ICanvas {
  private offScreenContext: OffscreenCanvasRenderingContext2D = null;
  private matrix: Matrix2D2;
  public context: CanvasRenderingContext2D

  constructor(context: CanvasRenderingContext2D, private attribute: MiniCanvasAttribute) {
    this.context = context;
  }

  public setOffScreenCanvas(offScreenContext: OffscreenCanvasRenderingContext2D) {
    this.offScreenContext = offScreenContext;
  }

  private updateContextAttributes(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, paint: Paint) {
    context.lineWidth = paint.getStrokeWidth();
    context.fillStyle = paint.getColor();
    context.strokeStyle = paint.getColor();
    context.globalAlpha = paint.getAlpha();
    context.textBaseline = paint.getFontBaseline();
    context.textAlign = paint.getFontAlign();

    if (paint.getShadowBlur() > 0) {
      context.shadowBlur = paint.getShadowBlur();
      context.shadowColor = paint.getShadowColor();
      context.shadowOffsetX = paint.getShadowOffsetX();
      context.shadowOffsetY = paint.getShadowOffsetY();
    }
    context.font = `${paint.getFontStyle()} ${paint.getFontWeight()} ${paint.getFontSize()}px ${paint.getFontFamily()}`;
  }

  public drawLine(startX: number, startY: number, stopX: number, stopY: number, paint: Paint) {
    if (paint) {
      if (this.offScreenContext != null) {
        this.drawLineInternal(this.offScreenContext, startX, startY, stopX, stopY, paint);
      } else {
        this.drawLineInternal(this.context, startX, startY, stopX, stopY, paint);
      }
    } else {
      console.warn("paint invalid");
    }
  }

  private drawLineInternal(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, startX: number, startY: number, stopX: number, stopY: number, paint: Paint) {
    this.updateContextAttributes(context, paint);
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(stopX, stopY);
    context.stroke();
  }

  public drawText(text: string, x: number, y: number, paint: Paint, maxWidth?: number): void {
    if (paint) {
      if (this.offScreenContext != null) {
        this.drawTextInternal(this.offScreenContext, text, x, y, paint, maxWidth);
      } else {
        this.drawTextInternal(this.context, text, x, y, paint, maxWidth);
      }
    } else {
      console.warn("paint invalid");
    }
  }

  private drawTextInternal(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, text: string, x: number, y: number, paint: Paint, maxWidth?: number) {
    this.updateContextAttributes(context, paint);
    context.beginPath();
    context.font = paint.getFontSize() + " sans-serif";
    if (paint.isStroke()) {
      context.strokeText(text, x, y, maxWidth);
    } else {
      context.fillText(text, x, y, maxWidth);
    }
  }

  public drawCircle(x: number, y: number, radius: number, paint: Paint) {
    if (paint) {
      if (this.offScreenContext != null) {
        this.drawCircleInternal(this.offScreenContext, x, y, radius, paint);
      } else {
        this.drawCircleInternal(this.context, x, y, radius, paint);
      }
    } else {
      console.warn("paint invalid");
    }
  }

  private drawCircleInternal(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, x: number, y: number, radius: number, paint: Paint) {
    this.updateContextAttributes(context, paint);
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    this.invalidate(context, paint);
  }

  public drawOval(x: number, y: number, width: number, height: number, paint: Paint) {
    if (paint) {
      if (this.offScreenContext != null) {
        this.drawOvalInternal(this.offScreenContext, x, y, width, height, paint);
      } else {
        this.drawOvalInternal(this.context, x, y, width, height, paint);
      }
    } else {
      console.warn("paint invalid");
    }
  }

  public concat(matrix: Matrix2D2) {
    if (this.offScreenContext != null) {
      this.offScreenContext.transform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    } else {
      this.context.transform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    }
  }

  private drawOvalInternal(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, x: number, y: number, width: number, height: number, paint: Paint) {
    this.updateContextAttributes(context, paint);
    context.beginPath();
    context.ellipse(x + (width / 2.0), y + (height / 2.0), (width / 2.0), (height / 2.0), 0, 0, Math.PI * 2)
    this.invalidate(context, paint);
  }

  public drawArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, paint: Paint, counterclockwise?: boolean) {
    if (paint) {
      if (this.offScreenContext != null) {
        this.drawArcInternal(this.offScreenContext, x, y, radius, startAngle, endAngle, paint, counterclockwise);
      } else {
        this.drawArcInternal(this.context, x, y, radius, startAngle, endAngle, paint, counterclockwise);
      }
    } else {
      console.warn("paint invalid");
    }
  }

  public drawArcInternal(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, x: number, y: number, radius: number, startAngle: number, endAngle: number, paint: Paint, counterclockwise?: boolean) {
    this.updateContextAttributes(context, paint);
    context.beginPath();
    if (!paint.isStroke()) {
      context.moveTo(x, y);
    }
    context.arc(x, y, radius, startAngle / 360 * Math.PI * 2, endAngle / 360 * Math.PI * 2, counterclockwise)
    this.invalidate(context, paint)
  }

  public drawRect(x: number, y: number, width: number, height: number, paint: Paint) {
    if (paint) {
      if (this.offScreenContext != null) {
        this.drawRectInternal(this.offScreenContext, x, y, width, height, paint);
      } else {
        this.drawRectInternal(this.context, x, y, width, height, paint);
      }
    } else {
      console.warn("paint invalid");
    }
  }

  public drawRectInternal(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, x: number, y: number, width: number, height: number, paint: Paint) {
    this.updateContextAttributes(context, paint);
    context.beginPath();
    if (paint.isStroke()) {
      context.strokeRect(x, y, width, height);
    } else {
      context.fillRect(x, y, width, height);
    }
  }

  public drawRoundRect(x: number, y: number, width: number, height: number, radius: number, paint: Paint) {
    if (paint) {
      if (this.offScreenContext != null) {
        this.drawRoundRectInternal(this.offScreenContext, x, y, width, height, radius, paint);
      } else {
        this.drawRoundRectInternal(this.context, x, y, width, height, radius, paint);
      }
    } else {
      console.warn("paint invalid");
    }
  }

  private drawRoundRectInternal(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number, paint: Paint) {
    this.updateContextAttributes(context, paint);

    context.beginPath();
    context.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
    context.lineTo(width - radius + x, y);
    context.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
    context.lineTo(width + x, height + y - radius);
    context.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
    context.lineTo(radius + x, height + y);
    context.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
    context.closePath();

    this.invalidate(context, paint);
  }

  public drawImage(image: ImageBitmap | PixelMap, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number, paint: Paint) {
    if (paint) {
      if (this.offScreenContext != null) {
        this.drawImageInternal(this.offScreenContext, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      } else {
        this.drawImageInternal(this.context, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      }
    } else {
      console.warn("paint invalid");
    }
  }

  public drawImageInternal(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, image: ImageBitmap | PixelMap, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number) {
    context.beginPath();
    context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    context.stroke();
  }

  public drawPath(path: Path2D, paint: Paint) {
    if (paint) {
      if (this.offScreenContext != null) {
        if (paint.isStroke()) {
          this.offScreenContext.lineWidth = paint.getStrokeWidth();
          this.offScreenContext.strokeStyle = paint.getColor()
          this.offScreenContext.stroke(path)
        } else {
          if (paint.getGradient() != null) {
            this.offScreenContext.fillStyle = paint.getGradient()
          } else {
            this.offScreenContext.fillStyle = paint.getColor()
          }
          this.offScreenContext.fill(path)
        }
      } else {
        if (paint.isStroke()) {
          this.context.lineWidth = paint.getStrokeWidth();
          this.context.strokeStyle = paint.getColor()
          this.context.stroke(path)
        } else {
          if (paint.getGradient() != null) {
            this.context.fillStyle = paint.getGradient()
          } else {
            this.context.fillStyle = paint.getColor()
          }
          this.context.fill(path)
        }
      }
    } else {
      console.warn("paint invalid");
    }
  }

  private invalidate(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, paint: Paint) {
    if (paint.isStroke()) {
      context.stroke();
    } else {
      context.fill();
    }
  }

  public measureText(text: string, paint: Paint): TextMetrics {
    return this.offScreenContext != null ? this.offScreenContext.measureText(text) : this.context.measureText(text);
  }

  public rotate(x: number, y: number, angle: number, paint: Paint) {
    if (this.offScreenContext != null) {
      this.rotateInternal(this.offScreenContext, x, y, angle);
    } else {
      this.rotateInternal(this.context, x, y, angle);
    }
  }

  public rotateInternal(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, x: number, y: number, angle: number) {
    context.translate(x, y);
    context.rotate(angle / 360 * Math.PI * 2);
    context.translate(-x, -y);
  }

  public scale(x: number, y: number) {
    if (this.offScreenContext != null) {
      this.offScreenContext.scale(x, y);
    } else {
      this.context.scale(x, y);
    }
  }

  public getMatrix() {
    return this.matrix;
  }

  public setMatrix(matrix: Matrix2D2) {
    this.matrix = matrix;
  }

  public getContext() {
    return this.offScreenContext != null ? this.offScreenContext : this.context;
  }

  public static colorTo16(number: number) {
    let color = number;
    const blue = parseInt(color % 0x100 + "", 10);
    color = color >>> 8;
    const green = parseInt(color % 0x100 + "", 10);
    color = color >>> 8;
    const red = parseInt(color % 0x100 + "", 10);
    const alpha = (parseInt((color >>> 8) + "", 10) / 0xFF).toFixed(1);
    var hR = red.toString(16);
    var hG = green.toString(16);
    var hB = blue.toString(16);
    return "#" + (red < 16 ? ("0" + hR) : hR) + (green < 16 ? ("0" + hG) : hG) + (blue < 16 ? ("0" + hB) : hB);
  }

  public clipRect(left: number, top: number, right: number, bottom: number) {
    if (this.offScreenContext != null) {
      this.offScreenContext.beginPath();
      this.offScreenContext.rect(left, top, right, bottom);
      this.offScreenContext.clip()
    } else {
      this.context.beginPath();
      this.context.rect(left, top, right, bottom);
      this.context.clip()
    }
  }

  public clipPath(path: Path2D) {
    if (this.offScreenContext != null) {
      this.offScreenContext.beginPath();
      this.offScreenContext.clip(path)
    } else {
      this.context.beginPath();
      this.context.clip(path)
    }
  }

  public drawColor(color: string) {
    if (this.offScreenContext != null) {
      this.offScreenContext.fillStyle = color;
    } else {
      this.context.fillStyle = color;
    }
  }

  public translate(x: number, y: number,) {
    if (this.offScreenContext != null) {
      this.offScreenContext.translate(x, y);
    } else {
      this.context.translate(x, y);
    }
  }

  public restore(paint?: Paint): void {
    if (this.offScreenContext != null) {
      this.offScreenContext.restore();
    } else {
      this.context.restore();
    }
  }

  public save(paint?: Paint) {
    if (this.offScreenContext != null) {
      this.offScreenContext.save();
    } else {
      this.context.save();
    }
  }

  public clear() {
    this.context.clearRect(0, 0, this.context.width, this.context.height);
  }

  public getImageData() {
    return this.context.getImageData(0, 0, this.context.width, this.context.height);
  }

  public getPixelMap() {
    return this.context.getPixelMap(0, 0, this.context.width, this.context.height);
  }
}


export class MiniCanvasAttribute {
  private static DEFAULT_WIDTH = '100%';
  private static DEFAULT_HEIGHT = '100%';
  private static DEFAULT_BACKGROUND = "#FFFFFF";
  private static DEFAULT_ANTIALIAS = true;
  antiAlias?: boolean;
  width?: number | string;
  height?: number | string;
  background?: string;
  clickListener?: (event?: ClickEvent) => void;
  touchListener?: (event?: TouchEvent) => void;

  static checkAttribute(attribute: MiniCanvasAttribute | undefined ) {
    if (undefined == attribute) {
      attribute = new MiniCanvasAttribute();
    }

    attribute.antiAlias = Preconditions.check(attribute.antiAlias, MiniCanvasAttribute.DEFAULT_ANTIALIAS);
    attribute.width = Preconditions.check(attribute.width, MiniCanvasAttribute.DEFAULT_WIDTH);
    attribute.height = Preconditions.check(attribute.height, MiniCanvasAttribute.DEFAULT_HEIGHT);
    attribute.background = Preconditions.check(attribute.background, MiniCanvasAttribute.DEFAULT_BACKGROUND);

    return attribute;
  }
}



class Preconditions {
  public static check(target: any, defaultValue: any): any {
    return undefined == target ? defaultValue : target;
  }
}