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

import Core from './core';

const core = Core.getInstance();

const describe = function (desc, func) {
    return Reflect.has(core, 'describe') ? core.describe(desc, func) : (desc, func) => { };
};
const it = function (desc, filter, func) {
    return Reflect.has(core, 'it') ? core.it(desc, filter, func) : (desc, filter, func) => { };
};
const beforeItSpecified = function (itDescs, func) {
    return Reflect.has(core, 'beforeItSpecified') ? core.beforeItSpecified(itDescs, func) : (itDescs, func) => { };
};

const afterItSpecified = function (itDescs, func) {
    return Reflect.has(core, 'afterItSpecified') ? core.afterItSpecified(itDescs, func) : (itDescs, func) => { };
};
const beforeEach = function (func) {
    return Reflect.has(core, 'beforeEach') ? core.beforeEach(func) : (func) => { };
};
const afterEach = function (func) {
    return Reflect.has(core, 'afterEach') ? core.afterEach(func) : (func) => { };
};
const beforeAll = function (func) {
    return Reflect.has(core, 'beforeAll') ? core.beforeAll(func) : (func) => { };
};
const afterAll = function (func) {
    return Reflect.has(core, 'afterAll') ? core.afterAll(func) : (func) => { };
};
const expect = function (actualValue) {
    return Reflect.has(core, 'expect') ? core.expect(actualValue) : (actualValue) => { };
};

export {
    describe, it, beforeAll, beforeEach, afterEach, afterAll, expect, beforeItSpecified, afterItSpecified
};
