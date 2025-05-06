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

function isPromiseLike(obj) {
    return !!obj && isFunction_(obj.then);
}

function isFunction_(value) {
    return isA_('Function', value);
}

function isA_(typeName, value) {
    return getType_(value) === '[object ' + typeName + ']';
}

function getType_(value) {
    return Object.prototype.toString.apply(value);
}

export default isPromiseLike;
