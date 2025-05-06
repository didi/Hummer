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
import image from '@ohos.multimedia.image';
export  interface Dims{
    width: number;
    height: number;
    top: number;
    left: number
}
export class GIFFrame {

    // 显示帧 width 宽  height 高 top上边距 left左边距
    dims: Dims

    // 当前帧的像素数据指向的颜色数组 只为了生成patch,非必要
    colorTable?: [number, number, number][]

    // 当前帧到下一帧的间隔时长
    delay: number

    // 当前帧绘制要求 0保留 1在上一帧绘制此帧 2恢复画布背景 3.将画布恢复到绘制当前图像之前的先前状态
    disposalType: number

    // Uint8CampedArray颜色转换后的补片信息用于绘制 必要
    patch?: Uint8ClampedArray

    // drawPixelMap 如果像素转换为PixelMap后使用PixelMap展示， patch和drawPixelMap 2选1
    drawPixelMap?:image.PixelMap

    // 当前帧每个像素的颜色表查找索引 只为了生成patch,非必要
    pixels?: number[]

    // 表示透明度的可选颜色索引
    transparentIndex: number
}