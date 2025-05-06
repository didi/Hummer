/*
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
import image from "@ohos.multimedia.image"
import { Crop } from './Crop'
import { CropCallback } from './CropCallback'
import { BusinessError } from '@ohos.base'
@Component
export struct PixelMapCrop {
  @Watch('watchOptions') @Link options: Options;
  @Watch('watchCropTap') @Prop cropTap: boolean = false;
  @State bWidth: number = 0;
  @State bHeight: number = 0;
  @State cWidth: number = 0;
  @State cHeight: number = 0;
  downX: number = 0;
  downY: number = 0;
  moveX: number = 0;
  moveY: number = 0;
  lastMoveX: number = 0;
  lastMoveY: number = 0;
  // 裁剪4个角区域 下标0和1左上点 下标2和3右下点
  leftTopArea: number[] = [0, 0, 0, 0]
  leftBottomArea: number[] = [0, 0, 0, 0]
  rightTopArea: number[] = [0, 0, 0, 0]
  rightBottomArea: number[] = [0, 0, 0, 0]
  // 4个边框区域
  leftLineArea: number[] = [0, 0, 0, 0]
  topLineArea: number[] = [0, 0, 0, 0]
  rightLineArea: number[] = [0, 0, 0, 0]
  bottomLineArea: number[] = [0, 0, 0, 0]
  //四个角的点
  topLeftPoint: number[] = [0, 0]
  topRightPoint: number[] = [0, 0]
  bottomLeftPoint: number[] = [0, 0]
  bottomRightPoint: number[] = [0, 0]
  //角宽
  connerWidth: number = 4
  //边框线宽
  lineWidth: number = 2
  //内部预览细线
  gridLineWidth: number = 1
  MIN_LENGTH = this.connerWidth * 2 * 4
  isValidTouch = false;
  isTopLeftAreaTouch = false;
  isTopRightAreaTouch = false;
  isBottomLeftAreaTouch = false;
  isBottomRightAreaTouch = false;
  isTopLineAreaTouch = false;
  isLeftLineAreaTouch = false;
  isRightLineAreaTouch = false;
  isBottomLineAreaTouch = false;
  isMoveTouch = false;
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  private contextGesture: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)

  watchOptions() {
    this.readyCrop();
  }

  watchCropTap() {
    console.log('PMC watchCropTap callback')
    if (this.options.cropAction) {
      console.log('PMC cropAction start')
      this.options.cropAction(this.topLeftPoint, this.bottomRightPoint, this.options.pixelScale);
    }
  }

  readyCrop() {
    if (!this.options.width || !this.options.height || !this.options.pixelBuffer || !this.options.pixelMap) {
      throw new Error('PixelMapCrop Options width must not be null & height must not be null & pixelMap must not be null & pixelBuffer must not be null ')
      return
    }

    this.bWidth = px2vp(this.options.width);
    this.bHeight = px2vp(this.options.height);

    this.cWidth = px2vp(this.options.pixelWidth)
    this.cHeight = px2vp(this.options.pixelHeight)


    this.context.drawImage(this.options.pixelMap, 0, 0)


    this.cropDefault();

    this.buildCropBoxConnerArea()

    this.buildCropBoxLineArea()


    this.drawCropBox();
  }


  //获取裁剪 初始位置
  cropDefault() {
    // 左上角 初始坐标
    this.topLeftPoint = [this.cWidth / 4.0 - this.connerWidth / 2.0, this.cHeight / 4.0 - this.connerWidth / 2.0]

    // 右上角 初始坐标
    this.topRightPoint = [this.cWidth / 4.0 * 3.0 + this.connerWidth / 2.0, this.cHeight / 4.0 - this.connerWidth / 2.0]

    // 左下角 初始坐标
    this.bottomLeftPoint = [this.cWidth / 4.0 - this.connerWidth / 2.0, this.cHeight / 4.0 * 3.0 + this.connerWidth / 2.0]

    // 右下角 初始坐标
    this.bottomRightPoint = [this.cWidth / 4.0 * 3.0 + this.connerWidth / 2.0, this.cHeight / 4.0 * 3.0 + this.connerWidth / 2.0]
  }

  buildCropBoxConnerArea() {
    // 左上角 初始区域
    this.leftTopArea = [this.topLeftPoint[0], this.topLeftPoint[1], this.topLeftPoint[0] + this.MIN_LENGTH / 2, this.topLeftPoint[1] + this.MIN_LENGTH / 2]
    // 右上角 初始区域
    this.rightTopArea = [this.topRightPoint[0] - this.MIN_LENGTH / 2, this.topRightPoint[1], this.topRightPoint[0], this.topRightPoint[1] + this.MIN_LENGTH / 2]
    // 左下角 初始区域
    this.leftBottomArea = [this.bottomLeftPoint[0], this.bottomLeftPoint[1] - this.MIN_LENGTH / 2, this.bottomLeftPoint[0] + this.MIN_LENGTH / 2, this.bottomLeftPoint[1]]
    // 右下角 初始区域
    this.rightBottomArea = [this.bottomRightPoint[0] - this.MIN_LENGTH / 2, this.bottomRightPoint[1] - this.MIN_LENGTH / 2, this.bottomRightPoint[0], this.bottomRightPoint[1]]
  }

  buildCropBoxLineArea() {
    // 左线
    this.leftLineArea = [this.topLeftPoint[0], this.topLeftPoint[1] + this.MIN_LENGTH / 2, this.bottomLeftPoint[0] + this.MIN_LENGTH / 2, this.bottomLeftPoint[1] - this.MIN_LENGTH / 2]
    // 上线
    this.topLineArea = [this.topLeftPoint[0] + this.MIN_LENGTH / 2, this.topLeftPoint[1], this.topRightPoint[0] - this.MIN_LENGTH / 2, this.topRightPoint[1] + this.MIN_LENGTH / 2]
    // 右线
    this.rightLineArea = [this.topRightPoint[0] - this.MIN_LENGTH / 2, this.topRightPoint[1] + this.MIN_LENGTH / 2, this.bottomRightPoint[0], this.bottomRightPoint[1] - this.MIN_LENGTH / 2]
    // 下线
    this.bottomLineArea = [this.bottomLeftPoint[0] + this.MIN_LENGTH / 2, this.bottomLeftPoint[1] - this.MIN_LENGTH / 2, this.bottomRightPoint[0] - this.MIN_LENGTH / 2, this.bottomRightPoint[1]]
  }


  // 绘制裁剪框
  drawCropBox() {
    this.contextGesture.clearRect(0, 0, this.cWidth, this.cHeight)
    // 绘制 裁剪框内部 透明底色 外部非透明底色
    this.drawTransparentBackground();
    // 绘制网格线
    if (this.options.hasGuideLine) {
      this.drawGridLine()
    }
    // 绘制裁剪框边框线
    this.drawConnerLine()
    // 绘制裁剪框边框
    this.drawConner()
  }

  drawTransparentBackground() {

    this.contextGesture.fillStyle = 'rgba(0,0,0,0.8)'
    this.contextGesture.moveTo(this.topLeftPoint[0], this.topLeftPoint[1])
    this.contextGesture.lineTo(this.topRightPoint[0], this.topRightPoint[1])
    this.contextGesture.lineTo(this.bottomRightPoint[0], this.bottomRightPoint[1])
    this.contextGesture.lineTo(this.bottomLeftPoint[0], this.bottomLeftPoint[1])
    this.contextGesture.closePath();

    this.contextGesture.moveTo(0, 0)
    this.contextGesture.lineTo(0, this.cHeight)
    this.contextGesture.lineTo(this.cWidth, this.cHeight)
    this.contextGesture.lineTo(this.cWidth, 0)
    this.contextGesture.closePath();

    this.contextGesture.fill();
  }

  drawGridLine() {

    this.contextGesture.lineWidth = this.gridLineWidth * px2vp(1)
    this.contextGesture.lineCap = 'square'
    this.contextGesture.strokeStyle = '#ffffff'

    let contentW = this.topRightPoint[0] - this.topLeftPoint[0]
    let stepW = contentW / 3.0;

    let contentH = this.bottomLeftPoint[1] - this.topLeftPoint[1]
    let stepH = contentH / 3.0;

    // 竖线1
    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.topLeftPoint[0] + stepW * 1.0, this.topLeftPoint[1])
    this.contextGesture.lineTo(this.bottomLeftPoint[0] + stepW * 1.0, this.bottomLeftPoint[1])
    this.contextGesture.stroke()

    // 竖线2
    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.topLeftPoint[0] + stepW * 2.0, this.topLeftPoint[1])
    this.contextGesture.lineTo(this.bottomLeftPoint[0] + stepW * 2.0, this.bottomLeftPoint[1])
    this.contextGesture.stroke()

    //横线1
    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.topLeftPoint[0], this.topLeftPoint[1] + stepH * 1.0)
    this.contextGesture.lineTo(this.topRightPoint[0], this.topRightPoint[1] + stepH * 1.0)
    this.contextGesture.stroke()
    //横线2
    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.topLeftPoint[0], this.topLeftPoint[1] + stepH * 2.0)
    this.contextGesture.lineTo(this.topRightPoint[0], this.topRightPoint[1] + stepH * 2.0)
    this.contextGesture.stroke()
  }

  // 边框
  drawConnerLine() {
    this.contextGesture.lineWidth = this.lineWidth
    this.contextGesture.lineCap = 'square'
    this.contextGesture.strokeStyle = '#aaaaaa'
    // 上框
    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.topLeftPoint[0], this.topLeftPoint[1])
    this.contextGesture.lineTo(this.topRightPoint[0], this.topRightPoint[1])
    this.contextGesture.stroke()
    // 左框
    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.topLeftPoint[0], this.topLeftPoint[1])
    this.contextGesture.lineTo(this.bottomLeftPoint[0], this.bottomLeftPoint[1])
    this.contextGesture.stroke()
    // 右框
    console.log('PMC this.topRightPoint=' + this.topRightPoint + '   this.bottomRightPoint=' + this.bottomRightPoint)
    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.topRightPoint[0], this.topRightPoint[1])
    this.contextGesture.lineTo(this.bottomRightPoint[0], this.bottomRightPoint[1])
    this.contextGesture.stroke()
    // 下框
    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.bottomLeftPoint[0], this.bottomLeftPoint[1])
    this.contextGesture.lineTo(this.bottomRightPoint[0], this.bottomRightPoint[1])
    this.contextGesture.stroke()
  }
  // 边框角
  drawConner() {
    this.contextGesture.lineWidth = this.connerWidth
    this.contextGesture.lineCap = 'square'
    this.contextGesture.strokeStyle = '#ffffff'

    // 左上角
    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.topLeftPoint[0], this.topLeftPoint[1])
    this.contextGesture.lineTo(this.topLeftPoint[0], this.topLeftPoint[1] + this.MIN_LENGTH / 2.0)
    this.contextGesture.stroke()

    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.topLeftPoint[0], this.topLeftPoint[1])
    this.contextGesture.lineTo(this.topLeftPoint[0] + this.MIN_LENGTH / 2.0, this.topLeftPoint[1])
    this.contextGesture.stroke()

    // 右上角
    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.topRightPoint[0], this.topRightPoint[1])
    this.contextGesture.lineTo(this.topRightPoint[0], this.topRightPoint[1] + this.MIN_LENGTH / 2.0)
    this.contextGesture.stroke()

    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.topRightPoint[0], this.topRightPoint[1])
    this.contextGesture.lineTo(this.topRightPoint[0] - this.MIN_LENGTH / 2.0, this.topRightPoint[1])
    this.contextGesture.stroke()

    // 左下角
    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.bottomLeftPoint[0], this.bottomLeftPoint[1])
    this.contextGesture.lineTo(this.bottomLeftPoint[0], this.bottomLeftPoint[1] - this.MIN_LENGTH / 2.0)
    this.contextGesture.stroke()

    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.bottomLeftPoint[0], this.bottomLeftPoint[1])
    this.contextGesture.lineTo(this.bottomLeftPoint[0] + this.MIN_LENGTH / 2.0, this.bottomLeftPoint[1])
    this.contextGesture.stroke()


    // 右下角
    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.bottomRightPoint[0], this.bottomRightPoint[1])
    this.contextGesture.lineTo(this.bottomRightPoint[0], this.bottomRightPoint[1] - this.MIN_LENGTH / 2.0)
    this.contextGesture.stroke()

    this.contextGesture.beginPath()
    this.contextGesture.moveTo(this.bottomRightPoint[0], this.bottomRightPoint[1])
    this.contextGesture.lineTo(this.bottomRightPoint[0] - this.MIN_LENGTH / 2.0, this.bottomRightPoint[1])
    this.contextGesture.stroke()
  }

  build() {
    Stack() {
      Canvas(this.context)
        .width(this.cWidth)
        .height(this.cHeight)
        .onReady(() => {
        }).backgroundColor(Color.Yellow)

      Canvas(this.contextGesture)
        .width(this.cWidth)
        .height(this.cHeight)
          //        .backgroundColor('#33000000')
        .onReady(() => {
        })
        .onTouch((event?: TouchEvent) => {
          if(event != undefined) {
            if (event.type === TouchType.Down) {
              // 手指按下
              this.downX = event.touches[0].x;
              this.downY = event.touches[0].y;

              this.lastMoveX = event.touches[0].x;
              this.lastMoveY = event.touches[0].y;

              this.belongRegion()

            }
            if (event.type === TouchType.Up) {
              // 手指放开
              this.downX = 0;
              this.downY = 0;

              this.moveX = 0;
              this.moveY = 0;

              this.resetTouch();

            }
            if (event.type === TouchType.Move) {
              // 手指移动
              this.moveX = event.touches[0].x;
              this.moveY = event.touches[0].y;
              // 每次移动的delta数据
              let dx = this.moveX - this.lastMoveX;
              let dy = this.moveY - this.lastMoveY;

              console.log('PMC this.isTopLeftAreaTouch =' + this.isTopLeftAreaTouch + ' this.isTopRightAreaTouch =' + this.isTopRightAreaTouch
              + '  this.isBottomLeftAreaTouch=' + this.isBottomLeftAreaTouch + '  isBottomRightAreaTouch' + this.isBottomRightAreaTouch
              + ' dx =' + dx + ' dy =' + dy)

              this.touchLeftTopArea(dx, dy)
              this.touchRightTopArea(dx, dy)
              this.touchLeftBottomArea(dx, dy)
              this.touchRightBottomArea(dx, dy)


              this.touchTopLineArea(dx, dy)
              this.touchLeftLineArea(dx, dy)
              this.touchRightLineArea(dx, dy)
              this.touchBottomLineArea(dx, dy)

              this.touchMoveCropBox(dx, dy);

              this.lastMoveX = event.touches[0].x
              this.lastMoveY = event.touches[0].y

            }
          }
        })

    }
    .width(this.bWidth)
    .height(this.bHeight)
    .padding({
      left: (this.bWidth - this.cWidth) / 2.0,
      top: (this.bHeight - this.cHeight) / 2.0,
      right: (this.bWidth - this.cWidth) / 2.0,
      bottom: (this.bHeight - this.cHeight) / 2.0
    })
    .backgroundColor(Color.Pink)
  }

  touchLeftTopArea(dx: number, dy: number) {
    if (this.isTopLeftAreaTouch) {
      let boarderLeft = this.topLeftPoint[0] + dx

      if (boarderLeft < 0) {
        dx = 0 - this.topLeftPoint[0];
      }

      let boarderTop = this.topLeftPoint[1] + dy
      if (boarderTop < 0) {
        dy = 0 - this.topLeftPoint[1]
      }

      let boarderRight = this.topLeftPoint[0] + dx
      if (boarderRight > this.topRightPoint[0] - this.MIN_LENGTH) {
        dx = this.topRightPoint[0] - this.MIN_LENGTH - this.topLeftPoint[0]
      }

      let boarderBottom = this.topLeftPoint[1] + dy
      if (boarderBottom > this.bottomLeftPoint[1] - this.MIN_LENGTH) {
        dy = this.bottomLeftPoint[1] - this.MIN_LENGTH - this.topLeftPoint[1]
      }


      this.topLeftPoint[0] = this.topLeftPoint[0] + dx;
      this.topLeftPoint[1] = this.topLeftPoint[1] + dy;

      this.topRightPoint[1] = this.topRightPoint[1] + dy;

      this.bottomLeftPoint[0] = this.bottomLeftPoint[0] + dx;

      this.buildCropBoxConnerArea();
      this.buildCropBoxLineArea();
      this.drawCropBox();

    }
  }

  touchRightTopArea(dx: number, dy: number) {
    if (this.isTopRightAreaTouch) {
      let boarderLeft = this.topRightPoint[0] + dx

      if (boarderLeft < this.topLeftPoint[0] + this.MIN_LENGTH) {
        dx = this.topLeftPoint[0] + this.MIN_LENGTH - this.topRightPoint[0];
      }

      let boarderTop = this.topRightPoint[1] + dy
      if (boarderTop < 0) {
        dy = 0 - this.topRightPoint[1]
      }

      let boarderRight = this.topRightPoint[0] + dx
      if (boarderRight > this.cWidth) {
        dx = this.cWidth - this.topRightPoint[0]
      }

      let boarderBottom = this.topRightPoint[1] + dy
      if (boarderBottom > this.bottomRightPoint[1] - this.MIN_LENGTH) {
        dy = this.bottomRightPoint[1] - this.MIN_LENGTH - this.topLeftPoint[1]
      }


      this.topRightPoint[0] = this.topRightPoint[0] + dx;
      this.topRightPoint[1] = this.topRightPoint[1] + dy;

      this.topLeftPoint[1] = this.topLeftPoint[1] + dy;
      this.bottomRightPoint[0] = this.bottomRightPoint[0] + dx;

      this.buildCropBoxConnerArea();
      this.buildCropBoxLineArea();
      this.drawCropBox();

    }
  }

  touchLeftBottomArea(dx: number, dy: number) {
    if (this.isBottomLeftAreaTouch) {
      let boarderLeft = this.bottomLeftPoint[0] + dx

      if (boarderLeft < 0) {
        dx = 0 - this.bottomLeftPoint[0];
      }

      let boarderTop = this.bottomLeftPoint[1] + dy
      if (boarderTop < this.topLeftPoint[1] + this.MIN_LENGTH) {
        dy = this.topLeftPoint[1] + this.MIN_LENGTH - this.bottomLeftPoint[1]
      }

      let boarderRight = this.bottomLeftPoint[0] + dx
      if (boarderRight > this.bottomRightPoint[0] - this.MIN_LENGTH) {
        dx = this.bottomRightPoint[0] - this.MIN_LENGTH - this.bottomLeftPoint[0]
      }

      let boarderBottom = this.bottomLeftPoint[1] + dy
      if (boarderBottom > this.cHeight) {
        dy = this.cHeight - this.bottomLeftPoint[1]
      }


      this.bottomLeftPoint[0] = this.bottomLeftPoint[0] + dx;
      this.bottomLeftPoint[1] = this.bottomLeftPoint[1] + dy;

      this.topLeftPoint[0] = this.topLeftPoint[0] + dx;
      this.bottomRightPoint[1] = this.bottomRightPoint[1] + dy;

      this.buildCropBoxConnerArea();
      this.buildCropBoxLineArea();
      this.drawCropBox();

    }
  }

  touchRightBottomArea(dx: number, dy: number) {
    if (this.isBottomRightAreaTouch) {
      let boarderLeft = this.bottomRightPoint[0] + dx

      if (boarderLeft < this.bottomLeftPoint[0] + this.MIN_LENGTH) {
        dx = this.bottomLeftPoint[0] + this.MIN_LENGTH - this.bottomRightPoint[0];
      }

      let boarderTop = this.bottomRightPoint[1] + dy
      if (boarderTop < this.topRightPoint[1] + this.MIN_LENGTH) {
        dy = this.topRightPoint[1] + this.MIN_LENGTH - this.bottomRightPoint[1]
      }

      let boarderRight = this.bottomRightPoint[0] + dx
      if (boarderRight > this.cWidth) {
        dx = this.cWidth - this.bottomRightPoint[0]
      }

      let boarderBottom = this.bottomRightPoint[1] + dy
      if (boarderBottom > this.cHeight) {
        dy = this.cHeight - this.bottomRightPoint[1]
      }


      this.bottomRightPoint[0] = this.bottomRightPoint[0] + dx;
      this.bottomRightPoint[1] = this.bottomRightPoint[1] + dy;

      this.bottomLeftPoint[1] = this.bottomLeftPoint[1] + dy;
      this.topRightPoint[0] = this.topRightPoint[0] + dx;

      this.buildCropBoxConnerArea();
      this.buildCropBoxLineArea();
      this.drawCropBox();

    }
  }

  touchTopLineArea(dx: number, dy: number) {

    if (this.isTopLineAreaTouch) {


      let boarderTop = this.topLeftPoint[1] + dy
      if (boarderTop < 0) {
        dy = 0 - this.topLeftPoint[1]
      }

      let boarderBottom = this.topLeftPoint[1] + dy
      if (boarderBottom > this.bottomLeftPoint[1] - this.MIN_LENGTH) {
        dy = this.bottomLeftPoint[1] - this.MIN_LENGTH - this.topLeftPoint[1]
      }


      this.topLeftPoint[1] = this.topLeftPoint[1] + dy;

      this.topRightPoint[1] = this.topRightPoint[1] + dy;


      this.buildCropBoxConnerArea();
      this.buildCropBoxLineArea();
      this.drawCropBox();

    }
  }

  touchBottomLineArea(dx: number, dy: number) {

    if (this.isBottomLineAreaTouch) {

      let boarderTop = this.bottomLeftPoint[1] + dy
      if (boarderTop < this.topLeftPoint[1] + this.MIN_LENGTH) {
        dy = this.topLeftPoint[1] + this.MIN_LENGTH - this.bottomLeftPoint[1]
      }

      let boarderBottom = this.bottomLeftPoint[1] + dy
      if (boarderBottom > this.cHeight) {
        dy = this.cHeight - this.bottomLeftPoint[1]
      }

      this.bottomLeftPoint[1] = this.bottomLeftPoint[1] + dy;
      this.bottomRightPoint[1] = this.bottomRightPoint[1] + dy;

      this.buildCropBoxConnerArea();
      this.buildCropBoxLineArea();
      this.drawCropBox();

    }
  }

  touchLeftLineArea(dx: number, dy: number) {

    if (this.isLeftLineAreaTouch) {
      let boarderLeft = this.topLeftPoint[0] + dx
      if (boarderLeft < 0) {
        dx = 0 - this.topLeftPoint[0];
      }

      let boarderRight = this.topLeftPoint[0] + dx
      if (boarderRight > this.topRightPoint[0] - this.MIN_LENGTH) {
        dx = this.topRightPoint[0] - this.MIN_LENGTH - this.topLeftPoint[0]
      }

      this.topLeftPoint[0] = this.topLeftPoint[0] + dx;
      this.bottomLeftPoint[0] = this.bottomLeftPoint[0] + dx;


      this.buildCropBoxConnerArea();
      this.buildCropBoxLineArea();
      this.drawCropBox();
    }
  }

  touchRightLineArea(dx: number, dy: number) {
    if (this.isRightLineAreaTouch) {

      let boarderLeft = this.topRightPoint[0] + dx
      if (boarderLeft < this.topLeftPoint[0] + this.MIN_LENGTH) {
        dx = this.topLeftPoint[0] + this.MIN_LENGTH - this.topRightPoint[0];
      }

      let boarderRight = this.topRightPoint[0] + dx
      if (boarderRight > this.cWidth) {
        dx = this.cWidth - this.topRightPoint[0]
      }

      this.topRightPoint[0] = this.topRightPoint[0] + dx;
      this.bottomRightPoint[0] = this.bottomRightPoint[0] + dx;

      this.buildCropBoxConnerArea();
      this.buildCropBoxLineArea();
      this.drawCropBox();
    }
  }

  touchMoveCropBox(dx: number, dy: number) {
    if (this.isMoveTouch) {
      let boarderLeft = this.topLeftPoint[0] + dx
      if (boarderLeft < 0) {
        dx = 0 - this.topLeftPoint[0];
      }

      let boarderTop = this.topLeftPoint[1] + dy
      if (boarderTop < 0) {
        dy = 0 - this.topLeftPoint[1]
      }

      let boarderRight = this.bottomRightPoint[0] + dx
      if (boarderRight > this.cWidth) {
        dx = this.cWidth - this.bottomRightPoint[0]
      }

      let boarderBottom = this.bottomRightPoint[1] + dy
      if (boarderBottom > this.cHeight) {
        dy = this.cHeight - this.bottomRightPoint[1]
      }

      this.topLeftPoint[0] = this.topLeftPoint[0] + dx;
      this.topLeftPoint[1] = this.topLeftPoint[1] + dy;

      this.topRightPoint[0] = this.topRightPoint[0] + dx;
      this.topRightPoint[1] = this.topRightPoint[1] + dy;

      this.bottomLeftPoint[0] = this.bottomLeftPoint[0] + dx;
      this.bottomLeftPoint[1] = this.bottomLeftPoint[1] + dy;

      this.bottomRightPoint[0] = this.bottomRightPoint[0] + dx;
      this.bottomRightPoint[1] = this.bottomRightPoint[1] + dy;


      this.buildCropBoxConnerArea();
      this.buildCropBoxLineArea();
      this.drawCropBox();

    }
  }


  // 判断用户手指按下的点的位置
  belongRegion() {
    this.resetTouch();
    // 首先判断是否落在裁剪框默认范围内
    this.isBelongCropBox();
    console.log('PMC this.isValidTouch=' + this.isValidTouch)
    console.log('PMC downx =' + this.downX + '  downy =' + this.downY + 'this.leftTopArea =' + this.leftTopArea + '  this.leftBottomArea=' + this.leftBottomArea
    + ' this.rightTopArea=' + this.rightTopArea + '  this.rightBottomArea=' + this.rightBottomArea);
    // 其次判断是否落在裁剪框4个角位置范围
    if (this.isValidTouch) {
      console.log('PMC C1')
      this.isTopLeftAreaTouch = this.connerBelonged(this.leftTopArea)
      console.log('PMC C2')
      this.isBottomLeftAreaTouch = this.connerBelonged(this.leftBottomArea)
      console.log('PMC C3')
      this.isTopRightAreaTouch = this.connerBelonged(this.rightTopArea)
      console.log('PMC C4')
      this.isBottomRightAreaTouch = this.connerBelonged(this.rightBottomArea)
      console.log('PMC result this.isTopLeftAreaTouch =' + this.isTopLeftAreaTouch + ' this.isTopRightAreaTouch =' + this.isTopRightAreaTouch
      + '  this.isBottomLeftAreaTouch=' + this.isBottomLeftAreaTouch + '  isBottomRightAreaTouch' + this.isBottomRightAreaTouch)

      // 再判断是否落在裁剪框4个边框范围
      if (!this.isTopLeftAreaTouch && !this.isBottomLeftAreaTouch && !this.isTopRightAreaTouch && !this.isBottomRightAreaTouch) {
        console.log('PMC L1')
        this.isTopLineAreaTouch = this.lineBelonged(this.topLineArea)
        console.log('PMC L2')
        this.isLeftLineAreaTouch = this.lineBelonged(this.leftLineArea)
        console.log('PMC L3')
        this.isRightLineAreaTouch = this.lineBelonged(this.rightLineArea)
        console.log('PMC L4')
        this.isBottomLineAreaTouch = this.lineBelonged(this.bottomLineArea)

        console.log('PMC result this.isTopLineAreaTouch =' + this.isTopLineAreaTouch + ' this.isLeftLineAreaTouch =' + this.isLeftLineAreaTouch
        + '  this.isRightLineAreaTouch=' + this.isRightLineAreaTouch + '  isBottomLineAreaTouch' + this.isBottomLineAreaTouch)

      }
      if (!this.isTopLeftAreaTouch && !this.isBottomLeftAreaTouch && !this.isTopRightAreaTouch && !this.isBottomRightAreaTouch
      && !this.isTopLineAreaTouch && !this.isLeftLineAreaTouch && !this.isRightLineAreaTouch && !this.isBottomLineAreaTouch
      ) {
        this.belongMoveTouch();
      }
    }

    // 最后的其他位置都是整体平移整个裁剪框
  }

  resetTouch() {
    this.isValidTouch = false;

    this.isTopLeftAreaTouch = false;
    this.isTopRightAreaTouch = false;
    this.isBottomLeftAreaTouch = false;
    this.isBottomRightAreaTouch = false;

    this.isTopLineAreaTouch = false;
    this.isLeftLineAreaTouch = false;
    this.isRightLineAreaTouch = false;
    this.isBottomLineAreaTouch = false;

    this.isMoveTouch = false;
  }

  isBelongCropBox() {

    let x0 = this.topLeftPoint[0];
    let y0 = this.topLeftPoint[1];

    let x1 = this.bottomRightPoint[0];
    let y1 = this.bottomRightPoint[1];

    if (this.downX >= x0 && this.downX <= x1 && this.downY >= y0 && this.downY <= y1) {
      this.isValidTouch = true;
    } else {
      this.isValidTouch = false;
    }

  }

  belongMoveTouch() {

    let x0 = this.topLeftPoint[0] + this.MIN_LENGTH / 2;
    let y0 = this.topLeftPoint[1] + this.MIN_LENGTH / 2;

    let x1 = this.bottomRightPoint[0] - this.MIN_LENGTH / 2;
    let y1 = this.bottomRightPoint[1] - this.MIN_LENGTH / 2;

    if (this.downX > x0 && this.downX < x1 && this.downY > y0 && this.downY < y1) {
      this.isMoveTouch = true;
    } else {
      this.isMoveTouch = false;
    }

  }

  lineBelonged(area: number[]) {

    let x0 = area[0];
    let y0 = area[1];

    let x1 = area[2];
    let y1 = area[3];

    if (this.downX > x0 && this.downX < x1 && this.downY > y0 && this.downY < y1) {
      return true;
    }
    return false;
  }

  connerBelonged(area: number[]): boolean {

    let x0 = area[0];
    let y0 = area[1];

    let x1 = area[2];
    let y1 = area[3];
    console.log('PMC downx=' + this.downX + ' downY' + this.downY + '  x0=' + x0 + ' y0=' + y0 + ' x1=' + x1 + ' y1=' + y1)
    if (this.downX >= x0 && this.downX <= x1 && this.downY >= y0 && this.downY <= y1) {
      console.log('PMC conner is belonged!')
      return true
    }
    return false;
  }
}

export class Options {
    width: number = 0;
    height: number = 0;
    pixelMap?: PixelMap = undefined;

    // 是否需要绘制线
    hasGuideLine: boolean = false;
    pixelBuffer: ArrayBuffer = new ArrayBuffer(0);
    // 展示pixel宽度
    pixelWidth: number = 0;
    // 展示pixel高度
    pixelHeight: number = 0;
    // 缩放scale:center-inside类型缩放的比例
    pixelScale: number = 1;

    // 用户裁剪后的回调
    cropFunction: (error:BusinessError|string, pixelmap:PixelMap|null, sx:number, sy:number) => void =  (error:BusinessError|string, pixelmap:PixelMap|null, sx:number, sy:number)=>{};

    // 本地裁剪框 回调
    cropAction: (topLeftPoint:number[], bottomRightPoint:number[], scaleInside:number) =>void = (topLeftPoint:number[], bottomRightPoint:number[], scaleInside:number)=>{};

    constructor() {

    }

    // 裁剪动作
    setCropFunction(crop: (error:BusinessError|string, pixelmap:PixelMap|null, sx:number, sy:number) => void) {
      this.cropFunction = crop;

      this.cropAction = (topLeftPoint:number[], bottomRightPoint:number[], scaleInside:number) => {
        let dx:number = vp2px(1) * topLeftPoint[0] * 1.0 / scaleInside;
        let dy:number = vp2px(1) * topLeftPoint[1] * 1.0 / scaleInside;
        let sx:number = vp2px(1) * (bottomRightPoint[0] - topLeftPoint[0]) * 1.0 / scaleInside;
        let sy:number = vp2px(1) * (bottomRightPoint[1] - topLeftPoint[1]) * 1.0 / scaleInside;
        Crop.crop(this.pixelBuffer, dx, dy, sx, sy, {
          cropCallback: (error: BusinessError | string, pixelmap: PixelMap | null) => {
            this.cropFunction(error, pixelmap, sx, sy)
          }
        }, 1);

      }

      return this;
    }

    setWidth(imageWidth: number) {
      this.width = imageWidth;
      return this;
    }

    setHeight(imageHeight: number) {
      this.height = imageHeight;
      return this;
    }

    setGuideLine(guideLine: boolean) {
      this.hasGuideLine = guideLine;
    }

    getGuideLine() {
      return this.hasGuideLine;
    }

    async loadBuffer(buffer: ArrayBuffer, readyCrop: Function) {
      if (!buffer || buffer.byteLength <= 0) {
        console.log('PixelMapCrop "loadBuffer" method buf is empty');
        return;
      }

      //数据赋值
      this.pixelBuffer = buffer;

      let imageSource:image.ImageSource = image.createImageSource(buffer);
      imageSource.getImageInfo().then((imageInfo) => {
        //获取宽高

        let scaleInside = 1;

        if (this.width && this.height) {
          //center_inside 模式判断
          let scaleW = imageInfo.size.width / (this.width * 1.0)
          let scaleH = imageInfo.size.height / (this.height * 1.0)
          if (scaleH > 1 || scaleW > 1) {
            scaleInside = 1.0 / Math.max(scaleW, scaleH)
          }

        } else {
          this.width = imageInfo.size.width;
          this.height = imageInfo.size.height;
        }
        this.pixelScale = scaleInside;
        this.pixelWidth = imageInfo.size.width * scaleInside;
        this.pixelHeight = imageInfo.size.height * scaleInside;

        let options:image.DecodingOptions = {
          editable: true,
          rotate: 0,
          desiredSize: {
            width: imageInfo.size.width * scaleInside,
            height: imageInfo.size.height * scaleInside,
          }
        }
        imageSource.createPixelMap(options).then((pixelmap:PixelMap) => {
          this.pixelMap = pixelmap;
          if (readyCrop) {
            readyCrop();
          }
          imageSource.release()
        })

      });

    }
  }



