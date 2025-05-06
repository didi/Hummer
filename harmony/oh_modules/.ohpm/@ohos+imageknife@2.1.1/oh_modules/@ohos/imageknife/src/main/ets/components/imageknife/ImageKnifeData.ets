/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { GIFFrame } from './utils/gif/GIFFrame'
import { DetachFromLayout } from './RequestOption'
import { LogUtil } from './utils/LogUtil'
import { Ellipse2 } from '@ohos/svg/src/main/ets/components/utils/SVGBase'

export enum ImageKnifeType {
  PIXELMAP = 'PixelMap',
  STRING = 'String',
  RESOURCE = 'Resource',
  GIFFRAME = 'GIFFrame'
}

export class DrawPixelMap {
  imagePixelMap: PixelMap | undefined = undefined
  isShowOnComponent: boolean = false; // gif是否显示在组件上 true：显示在组件上 false：不显示在组件上
  isLruCacheRelease: boolean = false; // 当前lru是否释放gif资源，true的就释放了gif资源 false就是没有释放

  detachFromLayoutPixelMap: DetachFromLayout = {
    detach: () => {
      this.isShowOnComponent = false
      if (this.isLruCacheRelease) {
        let pixelMap = this.imagePixelMap;
        if (pixelMap != undefined) {
          pixelMap.release();
        }
        this.imagePixelMap = undefined;
      }
    }
  }
}

export class DrawString {
  imageString: string | undefined = undefined
}

export class DrawResource {
  imageResource: Resource | undefined = undefined
}

export class DrawGIFFrame {
  imageGIFFrames: GIFFrame[] | undefined = undefined
  isShowOnComponent: boolean = false; //gif是否显示在组件上 true：显示在组件上 false：不显示在组件上
  isLruCacheRelease: boolean = false; //当前lru是否释放gif资源，true的就释放了gif资源 false就是没有释放

  detachFromLayoutGIF: DetachFromLayout = {
    detach: () => {
      this.isShowOnComponent = false
      if (this.isLruCacheRelease) {
        let gifFrames = this.imageGIFFrames;
        if (gifFrames != undefined) {
          for (let i = 0; i < gifFrames.length; i++) {
            let tempFrame = gifFrames[i];
            if (tempFrame.drawPixelMap != undefined) {
              tempFrame.drawPixelMap.release()
            }
          }
        }
        this.imageGIFFrames = undefined;
      }
    }
  };

  getGIFFramesBytesNumber(): number {
    let pixelMapBytes: number = 0;
    if (this.imageGIFFrames != undefined) {
      for (let index = 0; index < this.imageGIFFrames.length; index++) {
        let drawPixelMap = this.imageGIFFrames[index].drawPixelMap;
        if (drawPixelMap != undefined) {
          pixelMapBytes += drawPixelMap.getPixelBytesNumber();
          LogUtil.info("getGIFFramesBytesNumber gif总大小为：" + pixelMapBytes);
        }
      }
    }
    return pixelMapBytes;
  }
}

export class ImageKnifeData {
  static SVG = 'svg';
  static GIF = 'gif';
  static JPG = 'jpg';
  static PNG = 'png';
  static BMP = 'bmp';
  static WEBP = 'webp';
  waitSaveDisk = false;
  imageKnifeType: ImageKnifeType | undefined = undefined;
  drawPixelMap: DrawPixelMap | undefined = undefined;
  drawGIFFrame: DrawGIFFrame | undefined = undefined;
  drawResource: DrawResource | undefined = undefined;
  drawString: DrawString | undefined = undefined;

  static createImagePixelMap(type: ImageKnifeType, value: PixelMap) {
    let data = new ImageKnifeData();
    data.imageKnifeType = type;
    data.drawPixelMap = new DrawPixelMap();
    data.drawPixelMap.imagePixelMap = value;
    data.drawPixelMap.isShowOnComponent = true;
    return data;
  }

  static createImageGIFFrame(type: ImageKnifeType, value: GIFFrame[]) {
    let data = new ImageKnifeData();
    data.imageKnifeType = type;
    data.drawGIFFrame = new DrawGIFFrame();
    data.drawGIFFrame.imageGIFFrames = value;
    data.drawGIFFrame.isShowOnComponent = true;
    return data;
  }

  isPixelMap(): boolean {
    return ImageKnifeType.PIXELMAP == this.imageKnifeType;
  }

  isGIFFrame(): boolean {
    return ImageKnifeType.GIFFRAME == this.imageKnifeType;
  }

  isString(): boolean {
    return ImageKnifeType.STRING == this.imageKnifeType;
  }

  isResource(): boolean {
    return ImageKnifeType.RESOURCE == this.imageKnifeType;
  }

  release() {
    let promise = new Promise<void>((resolve) => {
      resolve()
    })
    if (this.isPixelMap()) {
      if (this.drawPixelMap != undefined && this.drawPixelMap.imagePixelMap != undefined) {
        this.drawPixelMap.isLruCacheRelease = true;
        if (this.drawPixelMap.isShowOnComponent) {
          return;
        } else {
          promise.then(() => {
            if (this.drawPixelMap != undefined && this.drawPixelMap.imagePixelMap != undefined) {
              this.drawPixelMap.imagePixelMap.release(() => {
                if (this.drawPixelMap != undefined && this.drawPixelMap.imagePixelMap != undefined) {
                  this.drawPixelMap.imagePixelMap = undefined
                }
              })
            }
          })
        }
        LogUtil.info("MemoryLruCache removeMemorySize---- end  释放普通图片：")
      }
    }
    if (this.isGIFFrame()) {
      if (this.drawGIFFrame != undefined) {
        this.drawGIFFrame.isLruCacheRelease = true;

        if (this.drawGIFFrame.isShowOnComponent) {
          return;
        } else {
          let gifFrames = this.drawGIFFrame.imageGIFFrames;
          if (gifFrames != undefined) {
            for (let i = 0; i < gifFrames.length; i++) {
              let tempFrame = gifFrames[i];
              if (tempFrame.drawPixelMap != undefined) {
                promise.then(() => {
                  if (tempFrame.drawPixelMap != undefined) {
                    tempFrame.drawPixelMap.release()
                  }
                })
              }
            }
            LogUtil.info("MemoryLruCache removeMemorySize---- end  释放GIF图片：")
            this.drawGIFFrame.imageGIFFrames = undefined
          }
          this.drawGIFFrame.imageGIFFrames = undefined
        }
      }
    }

    if (this.isString()) {
      if (this.drawString != undefined && this.drawString.imageString != undefined) {
        this.drawString.imageString = undefined
      }
    }

    if (this.isResource()) {
      if (this.drawResource != undefined && this.drawResource.imageResource != undefined) {
        this.drawResource.imageResource = undefined
      }
    }

  }
}