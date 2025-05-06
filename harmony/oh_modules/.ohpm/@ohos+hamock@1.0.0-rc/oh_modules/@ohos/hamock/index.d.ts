/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License")
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

export class ArgumentMatchers {
    static any;
    static anyString;
    static anyBoolean;
    static anyNumber;
    static anyObj;
    static anyFunction;
    static matchRegexs(Regex: RegExp): void
}

declare interface when {
    afterReturn(value: any): any
    afterReturnNothing(): undefined
    afterAction(action: any): any
    afterThrow(e_msg: string): string
    (argMatchers?: any): when;
}

export const when: when;

export interface VerificationMode {
    times(count: Number): void
    never(): void
    once(): void
    atLeast(count: Number): void
    atMost(count: Number): void
}

export class MockKit {
    constructor()
    mockFunc(obj: Object, func: Function): Function
    mockObject(obj: Object): Object
    verify(methodName: String, argsArray: Array<any>): VerificationMode
    ignoreMock(obj: Object, func: Function): void
    clear(obj: Object): void
    clearAll(): void
}

export declare function MockSetup(
    target: Object,
    propertyName: string | Symbol,
    descriptor: TypedPropertyDescriptor<() => void>
): void;