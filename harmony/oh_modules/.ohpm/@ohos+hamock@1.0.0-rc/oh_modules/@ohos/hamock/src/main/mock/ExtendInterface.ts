/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

import { MockKit } from "./MockKit.js";

class ExtendInterface {

    private mocker: MockKit
    private params: any

    constructor(mocker: MockKit) {
        this.mocker = mocker;
    }

    stub() {
        this.params = arguments;
        return this;
    }

    stubMockedCall(returnInfo: any) {
        this.mocker.stubApply(this, this.params, returnInfo);
    }

    afterReturn(value: any) {
        this.stubMockedCall(function () {
            return value;
        });
    }

    afterReturnNothing() {
        this.stubMockedCall(function () {
            return undefined;
        });
    }

    afterAction(action: Function) {
        this.stubMockedCall(action);
    }

    afterThrow(msg: string) {
        this.stubMockedCall(function () {
            throw msg;
        });
    }

    clear(obj?: any) {
        this.mocker.clear(obj);
    }
}

export default ExtendInterface;