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

import nativeGpu from "libnativeGpu.so"

export class NativeEglRender {
    static EGLTrue: number = 1;

    native_EglRenderInit(): void {
        nativeGpu.EglRenderInit();
    }

    native_EglRenderSetImageData(bytes: ArrayBuffer, width: number, height: number) {
        nativeGpu.EglRenderSetImageData(bytes, width, height);
    }

    native_EglRenderSetIntParams(paramType: number, param: number) {
        nativeGpu.EglRenderSetIntParams(paramType, param);
    }

    native_EglBitmapFromGLSurface(x: number, y: number, w: number, h: number): ArrayBuffer {
        let num = nativeGpu.EglPixelMapSurface(x, y, w, h);
        return num;
    }

    native_glIsInit(): boolean {
        let initStatus = nativeGpu.EglIsInit();
        if (initStatus === NativeEglRender.EGLTrue) {
            return true;
        }
        return false;
    }

    native_EglUseProgram() {
        nativeGpu.EglUseProgram();
    }

    native_EglRendering() {
        nativeGpu.EglRendering();
    }

    native_setInteger(key: string, value: number) {
        nativeGpu.EglUniform1i(key, value)
    }

    native_setFloat(key: string, value: number) {
        nativeGpu.EglUniform1f(key, value)
    }

    native_setPoint(key: string, vf1: number, vf2: number) {
        nativeGpu.EglUniform2fv(key, vf1, vf2);
    }

    native_setFloat2f(key: string, value: Float32Array) {
        this.native_setTypeArray(key, "glUniform2f", value);
    }

    native_setFloatVec2(key: string, value: Float32Array) {
        this.native_setTypeArray(key, "glUniform2fv", value);
    }

    native_setFloatVec3(key: string, value: Float32Array) {
        this.native_setTypeArray(key, "glUniform3fv", value);
    }

    native_setFloatVec4(key: string, value: Float32Array) {
        this.native_setTypeArray(key, "glUniform4fv", value);
    }

    native_setFloatArray(key: string, value: Float32Array) {
        this.native_setTypeArray(key, "glUniform1fv", value);
    }

    native_setUniformMatrix3f(key: string, value: Float32Array) {
        nativeGpu.EglSetTypeArrayOfMatrix3f(key, value);
    }

    native_setUniformMatrix4f(key: string, value: Float32Array) {
        nativeGpu.EglSetTypeArrayOfMatrix4f(key, value);
    }

    native_setTypeArray(key: string, uniformType: string, data: Float32Array) {
        nativeGpu.EglSetTypeArrayOfFloat(key, uniformType, data);
    }

    native_glIsDestroy() {
        nativeGpu.EglDestroy();
    }
}