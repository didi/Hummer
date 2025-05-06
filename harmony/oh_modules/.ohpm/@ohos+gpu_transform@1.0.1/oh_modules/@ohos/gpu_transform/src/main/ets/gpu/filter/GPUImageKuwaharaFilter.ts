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

export class GPUImageKuwaharaFilter extends GPUImageFilter {
    private _radius: number = 25;

    constructor(radius?: number) {
        super()
        if (radius) {
            this._radius = radius;
        }

    }

    getFilterType(): GPUFilterType {
        return GPUFilterType.KUWAHARA;
    }

    onInitialized() {

    }

    onReadySize() {

    }

    setRadius(radius: number) {
        this._radius = radius;
        this.setFloat("radius", this._radius);
    }
}

