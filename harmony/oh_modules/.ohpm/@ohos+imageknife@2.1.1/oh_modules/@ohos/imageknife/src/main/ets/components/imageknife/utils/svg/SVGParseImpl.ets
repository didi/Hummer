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
import  {IParseSvg} from'./IParseSvg'
import {SVGImageView} from '@ohos/svg'
import {Size} from '../../RequestOption'

export class SVGParseImpl implements IParseSvg{
  parseSvg(imageinfo: ArrayBuffer,size?:Size): Promise<PixelMap>{
    let model = new SVGImageView.SVGImageViewModel();
    let svgSize:SVGImageView.Size = new SVGImageView.Size();
    svgSize.width = 0;
    svgSize.height = 0;
    if(size != undefined){
      svgSize.width = size.width;
      svgSize.height = size.height;
    }
    return model.getSVGPixelMap(new Uint8Array(imageinfo),svgSize);
  }
}