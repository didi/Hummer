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

import { NativeEglRender } from '../gl/NativeEglRender'
import { GPUFilterType } from '../gl/GPUFilterType'
import type { Runnable } from '../interface/Runnable'
import LinkedList from '@ohos.util.LinkedList';
import ArrayList from '@ohos.util.ArrayList';

export abstract class GPUImageFilter {
    private render: NativeEglRender;
    private isInitialized: boolean;
    private runOnDraw: LinkedList<Runnable>;
    protected width: number;
    protected height: number;

    constructor() {
        this.render = new NativeEglRender();
        this.runOnDraw = new LinkedList();
    }

    private init() {
        if (this.render) {
            this.render.native_EglRenderInit();
        }
        this.onInitialized();
    }

    protected setSurfaceFilterType() {
        let filter = this.getFilterType();
        if (!this.render.native_glIsInit()) {
            throw new Error("the egl surface not init");
        }
        this.render.native_EglRenderSetIntParams(300, filter.valueOf());
    }

    setImageData(buf: ArrayBuffer, width: number, height: number) {
        if (!buf) {
            throw new Error("this pixelMap data is empty");
        }
        if (width <= 0 || height <= 0) {
            throw new Error("this pixelMap width and height is invalidation")
        }
        this.width = width;
        this.height = height;
        this.ensureInit();
        this.onReadySize();
        this.setSurfaceFilterType();
        this.render.native_EglRenderSetImageData(buf, width, height);
    }

    protected onDraw() {
        if (!this.render.native_glIsInit()) {
            throw new Error("the egl surface not init")
        }
        this.render.native_EglUseProgram();
        this.runPendingOnDrawTasks();
        this.onRendering();
    }

    protected onRendering() {
        this.render.native_EglRendering();
    }

    getPixelMapBuf(x: number, y: number, width: number, height: number): Promise<ArrayBuffer> {
        if (x < 0 || y < 0) {
            throw new Error("the x or y should be greater than 0")
        }
        if (width <= 0 || height <= 0) {
            throw new Error("the width or height should be greater than 0")
        }
        let that = this;
        return new Promise((resolve, rejects) => {
            that.onDraw();
            let buf = this.render.native_EglBitmapFromGLSurface(x, y, width, height);
            if (!buf) {
                rejects(new Error("get pixelMap fail"))
            } else {
                resolve(buf);
                that.destroy();
            }
        })
    }

    ensureInit() {
        if (this.render) {
            this.isInitialized = this.render.native_glIsInit();
            if (!this.isInitialized) {
                this.init();
            }
        }
    }

    protected runPendingOnDrawTasks() {
        while (this.runOnDraw.length > 0) {
            this.runOnDraw.removeFirst().run();
        }
    }

    protected addRunOnDraw(runAble: Runnable) {
        if (!runAble) {
            return;
        }
        this.runOnDraw.add(runAble);
    }

    protected setInteger(location: string, value: number) {
        let that = this;
        let able: Runnable = {
            run() {
                that.ensureInit();
                that.render.native_setInteger(location, value);
            }
        }
        this.addRunOnDraw(able);
    }

    protected setFloat(location: string, value: number) {
        let that = this;
        let able: Runnable = {
            run() {
                that.ensureInit();
                that.render.native_setFloat(location, value);
            }
        }
        this.addRunOnDraw(able);
    }

    protected setPoint(location: string, vf1: number, vf2: number) {

        let that = this;
        let able: Runnable = {
            run() {
                that.ensureInit();
                that.render.native_setPoint(location, vf1, vf2);
            }
        }
        this.addRunOnDraw(able);
    }

    protected setFloat2f(location: string, value: Array<number>) {
        if (value.length !== 2) {
            return;
        }
        let that = this;
        let able: Runnable = {
            run() {
                that.ensureInit();
                let array = new Float32Array(2);
                array[0] = value[0];
                array[1] = value[1];
                that.render.native_setFloat2f(location, array);
            }
        }
        this.addRunOnDraw(able);
    }

    protected setFloatVec2(location: string, value: Array<number>) {
        if (value.length !== 2) {
            return;
        }
        let that = this;
        let able: Runnable = {
            run() {
                that.ensureInit();
                let array = new Float32Array(2);
                array[0] = value[0];
                array[1] = value[1];
                that.render.native_setFloatVec2(location, array);
            }
        }
        this.addRunOnDraw(able);
    }

    protected setFloatVec3(location: string, value: Array<number>) {
        if (value.length !== 3) {
            return;
        }
        let that = this;
        let able: Runnable = {
            run() {
                that.ensureInit();
                let array = new Float32Array(3);
                array[0] = value[0];
                array[1] = value[1];
                array[2] = value[2];
                that.render.native_setFloatVec3(location, array);
            }
        }
        this.addRunOnDraw(able);
    }

    protected setFloatVec4(location: string, value: Array<number>) {
        if (value.length !== 4) {
            return;
        }
        let that = this;
        let able: Runnable = {
            run() {
                that.ensureInit();
                let array = new Float32Array(4);
                array[0] = value[0];
                array[1] = value[1];
                array[2] = value[2];
                array[3] = value[3];

                that.render.native_setFloatVec4(location, array);
            }
        }
        this.addRunOnDraw(able);
    }

    protected setUniformMatrix3f(location: string, value: Array<number>) {
        if (!value) {
            return;
        }
        let that = this;
        let able: Runnable = {
            run() {
                that.ensureInit();
                let array = new Float32Array(value.length);
                for (let i = 0; i < value.length; i++) {
                    array[i] = value[i];

                }
                that.render.native_setUniformMatrix3f(location, array);
            }
        }
        this.addRunOnDraw(able);
    }

    protected setUniformMatrix4f(location: string, value: Array<number>) {
        if (!value) {
            return;
        }
        let that = this;
        let able: Runnable = {
            run() {
                that.ensureInit();
                let array = new Float32Array(value.length);
                for (let i = 0; i < value.length; i++) {
                    array[i] = value[i];

                }
                that.render.native_setUniformMatrix4f(location, array);
            }
        }
        this.addRunOnDraw(able);
    }

    getFilters(): ArrayList<GPUImageFilter> {
        return null;
    }

    destroy() {
        this.render.native_glIsDestroy();
        this.render = null;
        this.isInitialized = false;
    }

    abstract getFilterType(): GPUFilterType;

    abstract onReadySize();

    abstract onInitialized();
}