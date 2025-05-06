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

import {CropOptions,Size} from "../crop/CropOptions";

@Component
export struct CropImage {
  @Link _mOptions: CropOptions;
  @State _rotate: number= 0;
  @State _scale: number= 1;

  build() {
    Stack() {
      Image(this._mOptions.src)
        .width(this._mOptions.size.width)
        .height(this._mOptions.size.height)
        .objectFit(ImageFit.None)
        .rotate({
          z: 1,
          centerX: this._mOptions.size.width / 2,
          centerY: this._mOptions.size.height / 2,
          angle: this._rotate
        })
        .scale({ x: this._scale, y: this._scale, z: 1.0 })
        .gesture(GestureGroup(GestureMode.Parallel,
        RotationGesture({ fingers: 1 }).onActionUpdate((event?: GestureEvent)  => {
          if(event != undefined) {
            this._rotate = event.angle;
          }
        }), PinchGesture({ fingers: 2 }).onActionUpdate((event?: GestureEvent)  => {
            if(event != undefined) {
              this._scale = event.scale;
            }

        })
        ).onCancel(() => {
          console.log("CropImage gesture cancel");
        })
        )
    }.width(this._mOptions.size.width).height(this._mOptions.size.height);
  }
}
