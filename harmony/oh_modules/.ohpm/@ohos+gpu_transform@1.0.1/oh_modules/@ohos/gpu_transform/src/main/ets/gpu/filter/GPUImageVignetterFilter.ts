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

export class GPUImageVignetterFilter extends GPUImageFilter {
    private vignetteCenter: Array<number> = [0.0, 0.0];
    private vignetteColor: Array<number> = [0.0, 0.0, 0.0];
    private vignetteStart: number;
    private vignetteEnd: number;

    constructor() {
        super()
    }

    getFilterType(): GPUFilterType {
        return GPUFilterType.VIGNETTE;
    }

    onInitialized() {

    }

    onReadySize() {
    }

    setVignetteCenter(center: Array<number>) {
        this.vignetteCenter = center;
        this.setFloatVec2("vignetteCenter", center);
    }

    setVignetteColor(colors: Array<number>) {
        this.vignetteColor = colors;
        this.setFloatVec3("vignetteColor", colors);
    }

    setVignetteStart(start: number) {
        this.vignetteStart = start;
        this.setFloat("vignetteStart", this.vignetteStart);
    }

    setVignetteEnd(end: number) {
        this.vignetteEnd = end;
        this.setFloat("vignetteEnd", this.vignetteEnd);
    }
}