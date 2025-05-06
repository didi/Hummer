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

import isPromiseLike from './isPromiseLike';

function assertPromiseIsRejectedWithError(actualPromise, expectedValue) {
    if (!isPromiseLike(actualPromise)) {
        return Promise.reject().then(function () {
        }, function () {
            return {pass: false, message: 'Expected not be called on a promise.'};
        });
    }
    const helper = {};
    return Promise.race([actualPromise, Promise.resolve(helper)]).then(
        function (got) {
            return {
                pass: false,
                message: 'Expected a promise to be rejected but actualValue is '
                    + (helper === got ? 'isPending' : 'resolve')
            };
        },
        function (actualValue) {
            return matchError(actualValue, expectedValue);
        }
    );

}

function matchError(actualValue, expectedValue) {
    if (expectedValue.length == 1 && typeof expectedValue[0] === 'function') {
        if (expectedValue[0].name === actualValue.__proto__.name) {
            return {pass: true, message: 'actual error type is ' + actualValue.name + '.'};
        }
        return {pass: false, message: `except error type is ${expectedValue[0].name},but actual is ${actualValue.name}.`};
    }

    if (expectedValue.length == 1 && typeof expectedValue[0] === 'string') {
        if (expectedValue[0] === actualValue.message) {
            return {pass: true, message: `actual error message is ${actualValue.message}.`};
        }
        return {pass: false, message: `except error message ${expectedValue[0]},but actual is ${actualValue.message}.`};
    }

    if (expectedValue.length == 1) {
        return {pass: false, message: 'When only one parameter, it should be error type or error message.'};
    }

    if (expectedValue.length == 2 && typeof expectedValue[0] === 'function' && expectedValue[0].name === actualValue.name) {
        if (typeof expectedValue[1] === 'string' && actualValue.message === expectedValue[1]) {
            return {pass: true, message: 'actual error message is ' + actualValue.message + '.'};
        }
        return {pass: false, message: `except error message is ${expectedValue[1]},but actual is ${actualValue.message}.`};
    }

    if (expectedValue.length == 2 && typeof expectedValue[0] === 'function' && expectedValue[0].name !== actualValue.name) {
        if (typeof expectedValue[1] === 'string' && actualValue.message === expectedValue[1]) {
            return {pass: false, message: `except error type is ${expectedValue[0].name},but actual is ${actualValue.name}.`};
        }
        return {pass: false, message: 'except error type and message are incorrect.'};
    }
    if (expectedValue.length > 2) {
        return {pass: false, message: 'Up to two parameters are supported.'};
    }
}

export default assertPromiseIsRejectedWithError;