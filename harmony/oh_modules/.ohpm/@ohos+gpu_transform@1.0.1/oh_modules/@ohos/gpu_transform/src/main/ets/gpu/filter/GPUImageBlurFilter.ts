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

export class GPUImageBlurFilter extends GPUImageFilter {
    private blurRadius: number;
    private blurOffset: Array<number>;
    private sumWeight: number;

    constructor() {
        super();
    }

    getFilterType(): GPUFilterType {
        return GPUFilterType.BLUR;
    }

    onInitialized() {

    }

    onReadySize() {

    }

    setBlurRadius(blurRadius: number) {
        this.blurRadius = blurRadius;
        this.setInteger("blurRadius", this.blurRadius);
        this.calculateSumWeight();
    }

    setBlurOffset(blurOffset: Array<number>) {
        let offset = new Array<number>(2);

        if (this.width <= 0 || this.height <= 0) {
            throw new Error("the width or height must be greater than 0");
        }
        if (!blurOffset || blurOffset.length !== 2) {
            throw new Error("you should a valid value needs to be set.")
        }
        offset[0] = blurOffset[0] / this.width;
        offset[1] = blurOffset[1] / this.height;
        this.blurOffset = offset;
        this.setFloat2f("blurOffset", this.blurOffset);
    }

    setSumWeight(sumWeight: number) {
        this.sumWeight = sumWeight;
        this.setFloat("sumWeight", this.sumWeight);
    }

    private calculateSumWeight() {
        if (this.blurRadius < 1) {
            this.setSumWeight(0);
            return;
        }
        let sumWeight = 0;
        let sigma = this.blurRadius / 3.0;
        for (let i = 0; i < this.blurRadius; i++) {
            let weight = ((1.0 / Math.sqrt(2.0 * Math.PI * sigma * sigma)) * Math.exp(-(i * i) / (2.0 * sigma * sigma)));
            sumWeight += weight;
            if (i != 0) {
                sumWeight += weight;
            }
        }
        this.setSumWeight(sumWeight);
    }
}