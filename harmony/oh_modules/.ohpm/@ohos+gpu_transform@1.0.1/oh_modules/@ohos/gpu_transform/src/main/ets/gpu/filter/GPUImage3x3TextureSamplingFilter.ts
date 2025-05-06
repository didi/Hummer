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

export class GPUImage3x3TextureSamplingFilter extends GPUImageFilter {
    private texelWidth: number;
    private texelHeight: number;
    private lineSize: number = 1.0;

    constructor() {
        super();
    }

    getFilterType(): GPUFilterType {
        return GPUFilterType.X3TEXTURE;
    }

    onInitialized() {

    }

    onReadySize() {

    }

    setLineSize(lineSize: number) {
        this.lineSize = lineSize;
    }

    setTexelWidth(texelWidth: number) {
        this.texelWidth = this.lineSize / texelWidth;
        this.setFloat("texelWidth", this.texelWidth);
    }

    setTexelHeight(texelHeight: number) {
        this.texelHeight = this.lineSize / texelHeight;
        this.setFloat("texelHeight", this.texelHeight);
    }
}