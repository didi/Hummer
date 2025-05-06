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

class ClassFilter {
    constructor(suiteName, itName, params) {
        this.suiteName = suiteName;
        this.itName = itName;
        this.params = params;
    }

    filterSuite() {
        return !this.params.split(',').map(item => item.split('#')[0]).map(item => item == this.suiteName).reduce((pre, cur) => pre || cur, false);
    }

    filterIt() {
        let classArray = this.params.split(',') || [];
        let suiteFilterResult = classArray.filter(item => !item.includes('#')).map(item => item == this.suiteName).reduce((pre, cur) => pre || cur, false);
        let itFilterResult = classArray.filter(item => item.includes('#')).map(item => item == (this.suiteName + '#' + this.itName)).reduce((pre, cur) => pre || cur, false);
        return !(suiteFilterResult || itFilterResult);
    }
}

class NotClassFilter {
    constructor(suiteName, itName, params) {
        this.suiteName = suiteName;
        this.itName = itName;
        this.params = params;
    }

    filterSuite() {
        return this.params.split(',').map(item => item == this.suiteName).reduce((pre, cur) => pre || cur, false);
    }

    filterIt() {
        return this.params.split(',').some(item => item == (this.suiteName + '#' + this.itName));
    }
}

class SuiteAndItNameFilter {
    constructor(suiteName, itName, params) {
        this.suiteName = suiteName;
        this.itName = itName;
        this.params = params;
    }

    filterSuite() {
        return !this.params.split(',').map(item => item == this.suiteName).reduce((pre, cur) => pre || cur, false);
    }

    filterIt() {
        return !this.params.split(',').map(item => item == this.itName).reduce((pre, cur) => pre || cur, false);
    }
}


class TestTypesFilter {
    constructor(suiteName, itName, fi, params) {
        this.suiteName = suiteName;
        this.itName = itName;
        this.params = params;
        this.fi = fi;
    }

    filterIt() {
        return !((this.params === (this.fi & this.params)) || this.fi === 0);
    }
}

export {ClassFilter, NotClassFilter, SuiteAndItNameFilter, TestTypesFilter};
