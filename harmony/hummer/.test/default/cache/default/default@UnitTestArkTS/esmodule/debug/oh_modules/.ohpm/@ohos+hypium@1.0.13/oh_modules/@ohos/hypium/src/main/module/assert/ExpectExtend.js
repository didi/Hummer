/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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

import assertNull from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertNull';
import assertClose from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertClose';
import assertContain from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertContain';
import assertLess from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertLess';
import assertLarger from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertLarger';
import assertFail from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertFail';
import assertUndefined from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertUndefined';
import assertFalse from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertFalse';
import assertInstanceOf from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertInstanceOf';
import assertThrowError from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertThrowError';
import assertLargerOrEqual from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertLargerOrEqual'
import assertLessOrEqual from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertLessOrEqual'
import assertNaN from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertNaN'
import assertNegUnlimited from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertNegUnlimited'
import assertPosUnlimited from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertPosUnlimited'
import assertDeepEquals from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/deepEquals/assertDeepEquals'
import assertPromiseIsPending from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertPromiseIsPending';
import assertPromiseIsRejected from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertPromiseIsRejected';
import assertPromiseIsRejectedWith from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertPromiseIsRejectedWith';
import assertPromiseIsRejectedWithError from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertPromiseIsRejectedWithError';
import assertPromiseIsResolved from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertPromiseIsResolved';
import assertPromiseIsResolvedWith from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/src/main/module/assert/assertPromiseIsResolvedWith';
class ExpectExtend {
    constructor(attr) {
        this.id = attr.id;
        this.matchers = {};
    }

    extendsMatchers() {
        this.matchers.assertNull = assertNull;
        this.matchers.assertClose = assertClose;
        this.matchers.assertContain = assertContain;
        this.matchers.assertLess = assertLess;
        this.matchers.assertLarger = assertLarger;
        this.matchers.assertFail = assertFail;
        this.matchers.assertUndefined = assertUndefined;
        this.matchers.assertFalse = assertFalse;
        this.matchers.assertInstanceOf = assertInstanceOf;
        this.matchers.assertThrowError = assertThrowError;
        this.matchers.assertLargerOrEqual = assertLargerOrEqual;
        this.matchers.assertLessOrEqual = assertLessOrEqual;
        this.matchers.assertNaN = assertNaN;
        this.matchers.assertNegUnlimited = assertNegUnlimited;
        this.matchers.assertPosUnlimited = assertPosUnlimited;
        this.matchers.assertDeepEquals = assertDeepEquals;
        this.matchers.assertPromiseIsPending = assertPromiseIsPending;
        this.matchers.assertPromiseIsRejected = assertPromiseIsRejected;
        this.matchers.assertPromiseIsRejectedWith = assertPromiseIsRejectedWith;
        this.matchers.assertPromiseIsRejectedWithError = assertPromiseIsRejectedWithError;
        this.matchers.assertPromiseIsResolved = assertPromiseIsResolved;
        this.matchers.assertPromiseIsResolvedWith = assertPromiseIsResolvedWith;
    }

    init(coreContext) {
        this.coreContext = coreContext;
        this.extendsMatchers();
        const expectService = this.coreContext.getDefaultService('expect');
        expectService.addMatchers(this.matchers);
    }

    apis() {
        return {
            'expect': function (actualValue) {
                return this.coreContext.getDefaultService('expect').expect(actualValue);
            }
        };
    }
}

export default ExpectExtend;
