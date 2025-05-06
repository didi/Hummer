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

class ExtendInterface {
    constructor(mocker) {
        this.mocker = mocker;
    }

    stub() {
        this.params = arguments;
        return this;
    }

    stubMockedCall(returnInfo) {
        this.mocker.stubApply(this, this.params, returnInfo);
    }

    afterReturn(value) {
        this.stubMockedCall(function () {
            return value;
        });
    }

    afterReturnNothing() {
        this.stubMockedCall(function () {
            return undefined;
        });
    }

    afterAction(action) {
        this.stubMockedCall(action);
    }

    afterThrow(msg) {
        this.stubMockedCall(function () {
            throw msg;
        });
    }

    clear() {
        this.mocker.clear();
    }
}

export default ExtendInterface;