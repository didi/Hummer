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

import { GPUImageFilter } from './GPUImageFilter'
import { GPUFilterType } from '../gl/GPUFilterType'

export class GPUImageColorMatrixFilter extends GPUImageFilter {
    private intensity: number = 1.0;
    private colorMatrix: Array<number> = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]

    constructor(intensity?: number) {
        super()
        if (intensity) {
            this.intensity = intensity;
        }
    }

    getFilterType(): GPUFilterType {
        return GPUFilterType.CONTRAST;
    }

    onInitialized() {

    }

    onReadySize() {

    }

    setIntensity(intensity: number) {
        this.intensity = intensity;
        this.setFloat("intensity", this.intensity);
    }

    setColorMatrix(colorMatrix: Array<number>) {
        this.colorMatrix = colorMatrix;
        this.setUniformMatrix4f("colorMatrix", this.colorMatrix);
    }
}