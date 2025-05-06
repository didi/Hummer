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

import { GPUImageColorMatrixFilter } from './GPUImageColorMatrixFilter'
import { GPUFilterType } from '../gl/GPUFilterType'

export class GPUImageSepiaToneFilter extends GPUImageColorMatrixFilter {
    constructor(intensity?: number) {
        super()
        this.setIntensity(intensity ? intensity : 1.0);
        this.setColorMatrix([
            0.3588, 0.7044, 0.1368, 0.0,
            0.2990, 0.5870, 0.1140, 0.0,
            0.2392, 0.4696, 0.0912, 0.0,
            0.0, 0.0, 0.0, 1.0
        ])
    }

    getFilterType(): GPUFilterType {
        return GPUFilterType.SEPIA;
    }

    onReadySize() {

    }
}

