/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

import {expect} from '../../interface';

class VerificationMode {
    constructor(times) {
        this.doTimes = times;
    }

    times(count) {
        expect(count).assertEqual(this.doTimes);
    }

    never() {
        console.log(this.doTimes);
        expect(0).assertEqual(this.doTimes);
    }

    once() {
        expect(1).assertEqual(this.doTimes);
    }

    atLeast(count) {
        if (count > this.doTimes) {
            throw Error('failed ' + count + ' greater than the actual execution times of method');
        }
    }

    atMost(count) {
        if (count < this.doTimes) {
            throw Error('failed ' + count + ' less than the actual execution times of method');
        }
    }
}

export default VerificationMode;