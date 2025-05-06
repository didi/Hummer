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

import { GPUImage3x3TextureSamplingFilter } from './GPUImage3x3TextureSamplingFilter'
import { GPUFilterType } from '../gl/GPUFilterType'

export class GPUImageToonFilter extends GPUImage3x3TextureSamplingFilter {
    private threshold: number = 0.2;
    private quantizationLevels: number = 10.0;

    constructor() {
        super()
    }

    getFilterType(): GPUFilterType {
        return GPUFilterType.TOON;
    }

    onInitialized() {

    }

    onReadySize() {
        this.setTexelWidth(this.width);
        this.setTexelHeight(this.height);
    }

    setThreshold(threshold: number) {
        this.threshold = threshold;
        this.setFloat("threshold", threshold);
    }

    setQuantizationLevels(quantizationLevels: number) {
        this.quantizationLevels = quantizationLevels;
        this.setFloat("quantizationLevels", quantizationLevels);
    }
}