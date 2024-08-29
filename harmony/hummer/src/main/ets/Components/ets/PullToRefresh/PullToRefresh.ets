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
import { isUndefined } from '../../../Utils/is';
import { RefreshEventState } from './Event';
import { PullToRefreshConfigurator } from './PullToRefreshConfigurator';

const IS_FREE = 0;
const IS_PULL_DOWN_1 = 11;
const IS_PULL_DOWN_2 = 12;
const IS_REFRESHING = 3;
const IS_REFRESHED = 5;
const IS_PULL_UP_1 = 41;
const IS_PULL_UP_2 = 42;
const IS_LOADING = 7;

class HummerState {
  action: string
  state: RefreshEventState
  constructor(action: string, state: RefreshEventState) {
    this.action = action;
    this.state = state;
  }
}
const state2HummerState = (state: number, lastState: number): HummerState|undefined => {
  let hummerState:RefreshEventState|undefined = undefined
  let action:string|undefined = undefined
  if(Math.abs(state-lastState) == 1){return undefined}
  switch (state) {
    case IS_PULL_DOWN_1:
    case IS_PULL_DOWN_2:
      action = 'refresh'
      hummerState = 0
      break;
    case IS_REFRESHING:
      action = 'refresh'
      hummerState = 1
      break;
    case IS_REFRESHED:
      action = 'refresh'
      hummerState = 2
      break;
  case IS_PULL_UP_1:
  case IS_PULL_UP_2:
    action = 'loadMore'
    hummerState = 0
    break;
    case IS_LOADING:
      action = 'loadMore'
      hummerState = 1
      break;
    case IS_FREE:
      if (lastState == IS_LOADING) {
        action = 'loadMore'
        hummerState = 2
      }
      break;
    default:
      break;
  }
  if(action && !isUndefined(hummerState)){
    return new HummerState(action, hummerState);
  }
  return undefined
}

@Component
export struct PullToRefresh {
  // @Link data: Object[];
  scroller: Scroller = new Scroller();
  @BuilderParam customList?: () => void;
  refreshConfigurator?: PullToRefreshConfigurator;
  mWidth?: Length = '100%';
  mHeight?: Length = '100%';
  onRefresh?: () => Promise<string> = () => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        resolve('刷新失败');
      }, 1000);
    });
  };
  onLoadMore?: () => Promise<string> = () => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        resolve('');
      }, 1000);
    });
  };
  // 自定义下拉动画
  @BuilderParam customRefresh?: (() => void) | null;
  //开启自定义下拉动画
  onAnimPullDown?: (value?: number, width?: number, height?: number) => void;
  onAnimRefreshing?: (value?: number, width?: number, height?: number) => void;
  // 自定义上拉动画
  @BuilderParam customLoad?: (() => void) | null;
  onAnimPullUp?: (value?: number, width?: number, height?: number) => void;
  onAnimLoading?: (value?: number, width?: number, height?: number) => void;
  refreshStateChange?: ((state: RefreshEventState) => void) | null;
  loadMoreStateChange?: ((state: RefreshEventState) => void) | null;
  //-----------------------------以下为组件内自用属性-----------------------------//
  @State private mHeightNumber?: number = 0;
  @State private trYTop?: number = 0;
  @State private trYBottom?: number = 0;
  @State @Watch('onStateChange') private state?: number = IS_FREE;
  private lastState: number = IS_FREE
  @State private refreshText?: string = '';
  @State private loadText?: string = '';
  @State private angle1?: number | string = 0;
  @State private angle2?: number | string = 0;
  private mWidthNumber?: number = 0;
  private touchYOld?: number = 0;
  private touchYNew?: number = 0;
  private listOffsetOld?: number = 0;
  private listOffsetNew?: number = 0;
  private canvasSetting?: RenderingContextSettings = new RenderingContextSettings(true);
  private canvasRefresh?: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.canvasSetting);
  private value?: number = 0;
  private timer?: number;
  private refreshRingOx?: number = 0;
  private refreshRingOy?: number = 0;
  private refreshRingRadius?: number = 0;
  private refreshPoint1x?: number = 0;
  private refreshPoint1y?: number = 0;
  private refreshPoint2x?: number = 0;
  private refreshPoint2y?: number = 0;
  private panOption: PanGestureOptions = new PanGestureOptions({ direction: PanDirection.Up | PanDirection.Down })

  aboutToAppear() {
    if (!this.refreshConfigurator) {
      this.refreshConfigurator = new PullToRefreshConfigurator();
    }
  }

  onStateChange() {
    if (this.state === this.lastState) {
      return
    }
    const hummerState = state2HummerState(this.state as number, this.lastState)
    if(hummerState){
      // 触发通知
      if (hummerState.action === 'loadMore') {
        this.loadMoreStateChange?.(hummerState.state!)
      } else {
        this.refreshStateChange?.(hummerState.state!)
      }
    }
    this.lastState = this.state as number
  }

  private initCanvas(): void {
    if (this.refreshRingOx == 0) {

      if (this.canvasRefresh !== undefined && this.refreshConfigurator !== undefined) {
        this.canvasRefresh.strokeStyle = this.refreshConfigurator.getRefreshColor();
        this.canvasRefresh.fillStyle = this.refreshConfigurator.getRefreshColor();
        this.canvasRefresh.lineWidth = this.refreshConfigurator.getRefreshHeight() / 60 + 1;
      }
      if (this.refreshConfigurator !== undefined) {
        this.refreshRingOx = this.refreshConfigurator.getRefreshWidth() / 2; // 圆心x坐标
        this.refreshRingOy = this.refreshConfigurator.getRefreshHeight() / 2; // 圆心y坐标
        this.refreshRingRadius = this.refreshConfigurator.getRefreshHeight() / 4; // 半径
        this.refreshPoint1x = this.refreshRingOx + this.refreshRingRadius * Math.cos(Math.PI * 150 / 180);
        this.refreshPoint1y = this.refreshRingOy + this.refreshRingRadius * Math.sin(Math.PI * 150 / 180);
        this.refreshPoint2x = this.refreshRingOx + this.refreshRingRadius * Math.cos(Math.PI * -30 / 180);
        this.refreshPoint2y = this.refreshRingOy + this.refreshRingRadius * Math.sin(Math.PI * -30 / 180);
      }
    }
  }

  build() {
    Column() {
      // 下拉刷新动画部分
      Stack() {
        this.headerUI()
      }
      .width('100%')
      .height(this.trYTop !== undefined ? this.trYTop : 0)
      .backgroundColor(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshBackgroundColor() : 0)

      // 主体列表部分
      Column() {
        if (this.customList !== undefined) {
          this.customList()
        }
      }
      .width('100%')
      .height((this.mHeightNumber !== undefined ? this.mHeightNumber : 0) - (this.trYTop !== undefined ? this.trYTop : 0) + (this.trYBottom !== undefined ? this.trYBottom : 0))

      // 上拉加载动画部分
      Stack() {
        this.footerUI()
      }
      .width('100%')
      .height(this.trYBottom !== undefined ? -this.trYBottom : 0)
      .backgroundColor(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getLoadBackgroundColor() : 0)
    }
    .width(this.mWidth === undefined ? '100%' : this.mWidth)
    .height(this.mHeight === undefined ? '100%' : this.mHeight)
    .onAreaChange((oldValue: Area, newValue: Area) => {
      this.mWidthNumber = Math.round(newValue.width as number);
      this.mHeightNumber = Math.round(newValue.height as number);
    })
    .parallelGesture(
      PanGesture(this.panOption)
        .onActionStart((event?: GestureEvent) => {
          if (event !== undefined) {
            this.touchYOld = event.offsetY;
          }
        })
        .onActionUpdate((event?: GestureEvent) => {
          if (event !== undefined) {
            this.onActionUpdate(event);
          }
        })
        .onActionEnd(() => {
          this.onActionEnd();
        })
    )
  }

  @Builder
  private headerUI() {
    if (this.customRefresh !== undefined && this.customRefresh !== null) {
      Column() {
        this.customRefresh()
      }
      .clip(true)
      .width('100%')
      .height('100%')
    } else {
      Stack() {
        Text(this.refreshText)
          .textAlign(TextAlign.Center)
          .fontColor(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshTextColor() : 0)
          .fontSize(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshTextSize() : 0)
        Stack() {
          Canvas(this.canvasRefresh)
            .width('100%')
            .height('100%')
            .onReady(() => {
              this.initCanvas();
            })
            .visibility(this.state == IS_PULL_DOWN_2 ? Visibility.Visible : Visibility.Hidden)
          LoadingProgress()
            .width(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshHeight() : 0)
            .height(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshHeight() : 0)
            .color(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshColor() : 0)
            .visibility(this.state == IS_REFRESHING ? Visibility.Visible : Visibility.Hidden)
        }
        .width(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshWidth() : 0)
        .height(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshHeight() : 0)
      }
      .width('100%')
      .height('100%')
    }
  }

  @Builder
  private footerUI() {
    if (this.customLoad !== undefined && this.customLoad !== null) {
      Column() {
        this.customLoad()
      }
      .clip(true)
      .width('100%')
      .height('100%')
    } else {
      Row() {
        Stack() {
          Image($r('app.media.icon_up'))
            .width('100%')
            .height('100%')
            .objectFit(ImageFit.Contain)
            .visibility(this.state == IS_PULL_UP_2 ? Visibility.Visible : Visibility.Hidden)
            .rotate({
              z: 1,
              angle: this.angle1 !== undefined ? this.angle1 : 0
            })
          Image($r('app.media.icon_load'))
            .width('100%')
            .height('100%')
            .objectFit(ImageFit.Contain)
            .visibility(this.state == IS_LOADING ? Visibility.Visible : Visibility.Hidden)
            .rotate({
              z: 1,
              angle: this.angle2 !== undefined ? this.angle2 : 0
            })
        }
        .width(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getLoadImgHeight() : 0)
        .height(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getLoadImgHeight() : 0)

        Text(this.loadText)
          .height('100%')
          .textAlign(TextAlign.Center)
          .margin({ left: 8 })
          .fontColor(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getLoadTextColor() : 0)
          .fontSize(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getLoadTextSize() : 0)
      }
      .height('100%')
    }
  }

  private onActionUpdate(event: GestureEvent): void {
    if (this.state !== undefined && this.refreshConfigurator !== undefined && this.touchYOld !== undefined) {
      if (this.state == IS_FREE ||
        this.state == IS_PULL_DOWN_1 || this.state == IS_PULL_DOWN_2 ||
        this.state == IS_PULL_UP_1 || this.state == IS_PULL_UP_2) {
        let maxTranslate = this.refreshConfigurator.getMaxTranslate()
        let loadImgHeight = this.refreshConfigurator.getLoadImgHeight()
        let refreshHeight = this.refreshConfigurator.getRefreshHeight()
        if (!this.scroller.currentOffset()) {
          return;
        }
        this.touchYNew = event.offsetY;

        // 当前手势是否下拉
        let distanceY = this.touchYNew - this.touchYOld;
        let isPullAction = distanceY > 0;

        //兼容页面滑动到顶部时，this.scroller.currentOffset().yOffset返回0.000000....的浮点数的情况
        let yOffset: number = this.scroller.currentOffset().yOffset;
        let isTop: boolean = yOffset == 0 ? true : false;
        if (yOffset > -0.0001 && yOffset < 0.001) {
          isTop = true;
        }

        if ((this.state == IS_FREE && isTop && isPullAction) || // 处于自由状态且列表处于顶部位置 并且 当前手势是下拉手势
          this.state == IS_PULL_DOWN_1 || this.state == IS_PULL_DOWN_2) { // 处于下拉状态中
          if (this.refreshConfigurator.getHasRefresh()) {
            if (this.touchYOld !== undefined && refreshHeight !== undefined) {
              // 获取最新位移距离
              let trY = this.touchYNew - this.touchYOld;

              //防止下拉回滑时list组件底层跟着滑动
              if(trY < 0) {
                this.scroller.scrollTo({xOffset: 0, yOffset: 0})
              }

              // 计算当前需要位移的总距离
              this.trYTop = this.getTranslateYOfRefresh(trY);
              if (this.trYTop < refreshHeight) {
                this.state = IS_PULL_DOWN_1;
              } else {
                this.state = IS_PULL_DOWN_2;
              }
              // 如果没有自定义刷新动画，就执行内置动画下拉时的逻辑
              if (!this.customRefresh && maxTranslate !== undefined) {
                this.drawRefreshView(this.trYTop / maxTranslate);
              }
              // 如果有下拉中动画回调，就执行下拉中动画回调
              if (this.onAnimPullDown && maxTranslate !== undefined) {
                this.onAnimPullDown(this.trYTop / maxTranslate, this.mWidthNumber, this.trYTop);
              }
            }
          }
        } else if (this.refreshConfigurator.getHasLoadMore()) {
          this.listOffsetNew = this.scroller.currentOffset().yOffset;
          // 列表处于底部位置且上滑时，2.已上滑时
          try {
            if (this.touchYOld !== undefined) {
              if ((this.state == IS_FREE && this.listOffsetOld == this.listOffsetNew && this.listOffsetOld != 0 && this.touchYNew < this.touchYOld && this.scroller.isAtEnd()) ||
                this.state == IS_PULL_UP_1 || this.state == IS_PULL_UP_2) {
                // 获取最新的位移距离
                let trY = this.touchYNew - this.touchYOld;
                // 计算当前需要位移的总距离
                this.trYBottom = this.getTranslateYOfLoadMore(trY);
                if (loadImgHeight !== undefined && this.trYBottom > -loadImgHeight) {
                  this.state = IS_PULL_UP_1;
                } else {
                  this.state = IS_PULL_UP_2;
                }
                // 如果没有自定义加载更多动画，就执行内置动画上拉时的逻辑
                if (!this.customLoad && maxTranslate !== undefined) {
                  this.drawLoadView(true, -this.trYBottom / maxTranslate);
                }
                // 如果有上拉中动画回调，就执行上拉中动画回调
                if (this.onAnimPullUp) {
                  if (this.trYBottom !== undefined && maxTranslate !== undefined) {
                    this.onAnimPullUp(-this.trYBottom / maxTranslate, this.mWidthNumber, -this.trYBottom);
                  }
                }
              }
            }
          } catch (error) {
            if (this.touchYOld !== undefined) {
              if ((this.state == IS_FREE && this.listOffsetOld == this.listOffsetNew && this.listOffsetOld != 0 && this.touchYNew < this.touchYOld) ||
                this.state == IS_PULL_UP_1 || this.state == IS_PULL_UP_2) {
                if (this.touchYNew !== undefined && this.touchYOld !== undefined && loadImgHeight !== undefined) {
                  // 获取最新的位移距离
                  let trY = this.touchYNew - this.touchYOld;
                  // 计算当前需要位移的总距离
                  this.trYBottom = this.getTranslateYOfLoadMore(trY);
                  if (this.trYBottom > -loadImgHeight) {
                    this.state = IS_PULL_UP_1;
                  } else {
                    this.state = IS_PULL_UP_2;
                  }
                  // 如果没有自定义加载更多动画，就执行内置动画上拉时的逻辑
                  if (!this.customLoad && maxTranslate !== undefined) {
                    this.drawLoadView(true, -this.trYBottom / maxTranslate);
                  }
                  // 如果有上拉中动画回调，就执行上拉中动画回调
                  if (this.onAnimPullUp) {
                    if (this.trYBottom !== undefined && maxTranslate !== undefined) {
                      this.onAnimPullUp(-this.trYBottom / maxTranslate, this.mWidthNumber, -this.trYBottom);
                    }
                  }
                }
              }
            }
          }
          this.listOffsetOld = this.listOffsetNew;
        }
        this.touchYOld = this.touchYNew;
      }
    }
  }

  private onActionEnd(): void {
    if (this.refreshConfigurator !== undefined) {
      let maxTranslate = this.refreshConfigurator.getMaxTranslate()
      let refreshAnimDuration = this.refreshConfigurator.getRefreshAnimDuration();
      if (this.refreshConfigurator.getListIsPlacement()) {
        if (this.state !== undefined) {
          if (this.state == IS_PULL_DOWN_1 || this.state == IS_PULL_DOWN_2) {
            // 让列表归位到顶部
            this.scroller.scrollEdge(Edge.Top);
            // 让列表归位到底部
          } else if (this.state == IS_PULL_UP_1 || this.state == IS_PULL_UP_2) {
            this.scroller.scrollEdge(Edge.Bottom);
          }
        }
      }
      if (this.trYTop !== undefined) {
        if (this.trYTop > 0) { // 下拉结束
          if (this.state !== undefined && maxTranslate !== undefined) {
            if (this.state == IS_FREE || this.state == IS_PULL_DOWN_1 || this.state == IS_PULL_DOWN_2) {
              if (this.trYTop / maxTranslate < 0.75) {
                this.closeRefresh();
              } else {
                this.state = IS_REFRESHING;
                this.trYTop = maxTranslate * 0.75;
                clearInterval(this.timer);
                this.timer = setInterval(() => {
                  if (this.value !== undefined) {
                    if (this.value >= 1) {
                      this.value -= 1;
                    } else {
                      if (refreshAnimDuration !== undefined && refreshAnimDuration !== 0) {
                        this.value += 10 / refreshAnimDuration;
                      }
                    }
                    // 保留3位小数
                    this.value = Math.round(this.value * 1000) / 1000;
                  }
                  // 刷新中动画采用系统组件，因此不用自己去执行动画
                  // 如果有刷新中动画回调，就执行刷新中动画回调
                  if (this.onAnimRefreshing) {
                    this.onAnimRefreshing(this.value, this.mWidthNumber, this.trYTop);
                  }
                }, 10);
                if (this.onRefresh !== undefined) {
                  this.onRefresh().then((refreshText) => {
                    if (refreshText.length == 0) {
                      this.closeRefresh();
                    } else {
                      this.state = IS_REFRESHED;
                      if (!this.customRefresh) {
                        this.refreshText = refreshText;
                      }
                      setTimeout(() => {
                        this.closeRefresh();
                      }, 1000);
                    }
                  });
                }
              }
            }
          }
        } else if (this.trYBottom !== undefined && this.trYBottom < 0) { // 上拉结束
          if (this.state !== undefined && maxTranslate !== undefined) {
            if (this.state == IS_FREE || this.state == IS_PULL_UP_1 || this.state == IS_PULL_UP_2) {
              if (-this.trYBottom / maxTranslate < 0.75) {
                this.closeLoad();
              } else {
                this.state = IS_LOADING;
                this.trYBottom = -maxTranslate * 0.75;
                clearInterval(this.timer);
                this.timer = setInterval(() => {
                  if (this.value !== undefined) {
                    if (this.value >= 1) {
                      this.value -= 1;
                    } else {
                      this.value += 0.01;
                    }
                    // 保留2位小数
                    this.value = Math.round(this.value * 100) / 100;
                    // 如果没有自定义加载中动画，就执行内置加载中动画
                    if (!this.customLoad) {
                      this.drawLoadView(false, this.value);
                    }
                  }
                  // 如果有加载中动画回调，就执行加载中动画回调
                  if (this.onAnimLoading) {
                    if (this.trYBottom !== undefined) {
                      this.onAnimLoading(this.value, this.mWidthNumber, -this.trYBottom);
                    }
                  }
                }, 10);
                if (this.onLoadMore !== undefined) {
                  this.onLoadMore().then((loadText) => {
                    this.closeLoad();
                  });
                }
              }
            }
          }
        } else {
          this.state = IS_FREE;
        }
      }
    }
  }

  private getTranslateYOfRefresh(newTranslateY: number): number {
    if (this.refreshConfigurator !== undefined) {
      let maxTranslateY = this.refreshConfigurator.getMaxTranslate();
      let sensitivity = this.refreshConfigurator.getSensitivity();
      if (maxTranslateY !== undefined && sensitivity !== undefined && this.trYTop !== undefined) {
        // 阻尼值计算
        if (this.trYTop / maxTranslateY < 0.2) {
          newTranslateY = newTranslateY * 1 * sensitivity;
        } else if (this.trYTop / maxTranslateY < 0.4) {
          newTranslateY = newTranslateY * 0.8 * sensitivity;
        } else if (this.trYTop / maxTranslateY < 0.6) {
          newTranslateY = newTranslateY * 0.6 * sensitivity;
        } else if (this.trYTop / maxTranslateY < 0.8) {
          newTranslateY = newTranslateY * 0.4 * sensitivity;
        } else {
          newTranslateY = newTranslateY * 0.2 * sensitivity;
        }
        // 下拉值计算
        if (this.trYTop + newTranslateY > maxTranslateY) {
          return maxTranslateY;
        } else if (this.trYTop + newTranslateY < 0) {
          return 0;
        } else {
          return this.trYTop + newTranslateY;
        }
      }
    }
    return 0;
  }

  private getTranslateYOfLoadMore(newTranslateY: number): number {
    if (this.refreshConfigurator !== undefined) {
      let maxTranslateY = this.refreshConfigurator.getMaxTranslate();
      let sensitivity = this.refreshConfigurator.getSensitivity();
      if (maxTranslateY !== undefined && sensitivity !== undefined && this.trYBottom !== undefined) {
        // 阻尼值计算
        if (this.trYBottom / maxTranslateY > -0.2) {
          newTranslateY = newTranslateY * 1 * sensitivity;
        } else if (this.trYBottom / maxTranslateY > -0.4) {
          newTranslateY = newTranslateY * 0.8 * sensitivity;
        } else if (this.trYBottom / maxTranslateY > -0.6) {
          newTranslateY = newTranslateY * 0.6 * sensitivity;
        } else if (this.trYBottom / maxTranslateY > -0.8) {
          newTranslateY = newTranslateY * 0.4 * sensitivity;
        } else {
          newTranslateY = newTranslateY * 0.2 * sensitivity;
        }
        // 下拉值计算
        if (this.trYBottom + newTranslateY < -maxTranslateY) {
          return -maxTranslateY;
        } else if (this.trYBottom + newTranslateY > 0) {
          return 0;
        } else {
          return this.trYBottom + newTranslateY;
        }
      }
    }
    return 0;
  }

  private drawRefreshView(value: number): void {
    if (this.refreshConfigurator !== undefined && this.trYTop !== undefined) {
      let refreshHeight = this.refreshConfigurator.getRefreshHeight()
      if (refreshHeight !== undefined && this.trYTop >= refreshHeight) {
        if (this.canvasRefresh !== undefined) {
          let refreshWidth = this.refreshConfigurator.getRefreshWidth()
          if (refreshWidth !== undefined) {
            this.canvasRefresh.clearRect(0, 0, refreshWidth, refreshHeight);
          }
          // 绘制圆环
          this.canvasRefresh.beginPath();
          if (this.refreshRingOx !== undefined && this.refreshRingOy !== undefined && this.refreshRingRadius !== undefined) {
            this.canvasRefresh.arc(this.refreshRingOx, this.refreshRingOy, this.refreshRingRadius, 0, Math.PI * 2);
          }
          this.canvasRefresh.stroke();
          // 绘制卫星
          value = value > 0.75 ? 0.75 : value;
          this.canvasRefresh.beginPath();
          if (this.refreshPoint2x !== undefined && this.refreshPoint1x !== undefined
            && this.refreshPoint2y !== undefined && this.refreshPoint1y !== undefined) {
            this.canvasRefresh.arc(
              value * (this.refreshPoint2x - this.refreshPoint1x) + this.refreshPoint1x,
              value * (this.refreshPoint2y - this.refreshPoint1y) + this.refreshPoint1y,
              refreshHeight / 20 + 1, 0, Math.PI * 2);
          }
          this.canvasRefresh.fill();
        }
      }
    }
  }

  private drawLoadView(isPullUp: boolean, value: number): void {
    if (isPullUp) {
      if (this.refreshConfigurator !== undefined) {
        let loadImgHeight = this.refreshConfigurator.getLoadImgHeight()
        if (loadImgHeight !== undefined && this.trYBottom !== undefined) {
          if (this.trYBottom <= -loadImgHeight) {
            if (value < 0.75) {
              this.angle1 = 0;
              if (this.refreshConfigurator !== undefined) {
                this.loadText = this.refreshConfigurator.getLoadTextPullUp1();
              }
            } else {
              this.angle1 = 180;
              if (this.refreshConfigurator !== undefined) {
                this.loadText = this.refreshConfigurator.getLoadTextPullUp2();
              }
            }
          } else {
            this.loadText = '';
          }
        }
      }
    } else {
      this.angle2 = value * 360;
      if (this.refreshConfigurator !== undefined) {
        this.loadText = this.refreshConfigurator.getLoadTextLoading();
      }
    }
  }

  public closeRefresh(): void {
    clearInterval(this.timer);
    if (this.refreshConfigurator !== undefined) {
      animateTo({ duration: this.refreshConfigurator.getAnimDuration() }, () => {
        this.trYTop = 0;
      });
    }
    if (this.refreshConfigurator !== undefined) {
      setTimeout(() => {
        this.state = IS_FREE;
        this.refreshText = '';
      }, this.refreshConfigurator.getAnimDuration());
    }
  }

  public closeLoad(): void {
    clearInterval(this.timer);
    if (this.refreshConfigurator !== undefined) {
      animateTo({ duration: this.refreshConfigurator.getAnimDuration() }, () => {
        this.trYBottom = 0;
      });
    }
    this.state = IS_FREE;
    this.loadText = '';
  }
}