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
import { AsyncTransform } from '../transform/AsyncTransform'
import image from '@ohos.multimedia.image'
import { Size } from '../../imageknife/RequestOption'
import { BusinessError } from '@ohos.base'
import { Constants } from '../constants/Constants'

export class TransformUtils {
  static centerCrop(buf: ArrayBuffer, outWidth: number, outHeihgt: number,
                    callback?: AsyncTransform<Promise<PixelMap>>) {
    let imageSource: image.ImageSource = image.createImageSource(buf);
    imageSource.getImageInfo()
      .then((p) => {
        let sw: number = 0;
        let sh: number = 0;
        let scale: number = 1;
        let pw: number = p.size.width;
        let ph: number = p.size.height;
        if (pw == outWidth && ph == outHeihgt) {
          sw = outWidth;
          sh = outHeihgt;
        } else {
          if (pw * outHeihgt > outWidth * ph) {
            scale = outHeihgt / ph;
          } else {
            scale = outWidth / pw;
          }
          sw = pw * scale;
          sh = ph * scale;
        }
        let options: image.DecodingOptions = {
          editable: true,
          rotate: 0,
          desiredRegion: { size: { width: sw, height: sh },
            x: pw / 2 - sw / 2,
            y: ph / 2 - sh / 2,
          },
        }
        if (callback) {
          callback.asyncTransform('', imageSource.createPixelMap(options));
        }
      })
      .catch((error: BusinessError) => {
        callback?.asyncTransform(error, null);
      })

  }

  static rotateImage(buf: ArrayBuffer, degreesToRotate: number): Promise<PixelMap> {
    let imageSource: image.ImageSource = image.createImageSource(buf);
    let options: image.DecodingOptions = {
      editable: true,
      rotate: degreesToRotate
    }
    let promise: Promise<PixelMap> = imageSource.createPixelMap(options);
    imageSource.release()
    return promise;
  }

  static centerInside(buf: ArrayBuffer, outWidth: number, outHeihgt: number,
                      callback?: AsyncTransform<PixelMap>) {
    let imageSource: image.ImageSource = image.createImageSource(buf);
    imageSource.getImageInfo()
      .then((p: image.ImageInfo) => {
        let pw = p.size.width;
        let ph = p.size.height;
        if (pw <= outWidth && ph <= outHeihgt) {
          imageSource.createPixelMap()
            .then(p => {
              callback?.asyncTransform('', p);
              imageSource.release()
            }).catch((e: BusinessError) => {
            callback?.asyncTransform(Constants.PROJECT_TAG + ';CenterInside error:' + e, null);
            imageSource.release()
          })
        } else {
          TransformUtils.fitCenter(buf, outWidth, outHeihgt, callback);
        }
      })
      .catch((error: BusinessError) => {
        callback?.asyncTransform(error, null);
      })

  }

  static fitCenter(buf: ArrayBuffer, outWidth: number, outHeihgt: number
                   , callback?: AsyncTransform<PixelMap>) {
    let imageSource: image.ImageSource = image.createImageSource(buf);
    imageSource.getImageInfo()
      .then((p: image.ImageInfo) => {
        let pw: number = p.size.width;
        let ph: number = p.size.height;
        let widthPercentage: number = outWidth / pw;
        let heightPercentage: number = outHeihgt / ph;
        let minPercentage: number = Math.min(widthPercentage, heightPercentage);

        let targetWidth: number = Math.round(minPercentage * pw);
        let targetHeight: number = Math.round(minPercentage * ph);

        if (pw == targetWidth && ph == targetHeight) {
          targetWidth = pw;
          targetHeight = ph;
        } else {
          targetWidth = minPercentage * pw;
          targetHeight = minPercentage * ph;
        }
        let options: image.DecodingOptions = {
          editable: true,
          rotate: 0,
          desiredSize: { width: targetWidth, height: targetHeight }
        }
        if (callback != undefined) {
          imageSource.createPixelMap(options)
            .then(p => {
              callback?.asyncTransform('', p);
              imageSource.release();
            })
            .catch((e: BusinessError) => {
              callback?.asyncTransform(Constants.PROJECT_TAG + ';FitCenter error:' + e, null);
              imageSource.release();
            })
        }
      })
      .catch((e: BusinessError) => {
        if (callback) {
          callback.asyncTransform(e, null);
        }
      })
  }

  static getPixelMapSize(imageSource: image.ImageSource, func: AsyncTransform<Size>) {
    if (!imageSource) {
      return;
    }
    imageSource.getImageInfo((err: BusinessError, value: image.ImageInfo) => {
      if (err) {
        func?.asyncTransform(err, null)
        return;
      }
      let pWidth: number = value.size.width;
      let pHeight: number = value.size.height;
      func?.asyncTransform('', { width: pWidth, height: pHeight });
    })
  }
}