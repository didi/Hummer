/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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

import {ClassFilter, NotClassFilter, SuiteAndItNameFilter, TestTypesFilter} from './Filter';
import {TAG} from '../../Constant';
const STRESS_RULE = /^[1-9]\d*$/;

class ConfigService {
    constructor(attr) {
        this.id = attr.id;
        this.supportAsync = false;
        this.random = false;
        this.filterValid = [];
        this.filter = 0;
        this.flag = false;
        this.suite = null;
        this.itName = null;
        this.testType = null;
        this.level = null;
        this.size = null;
        this.class = null;
        this.notClass = null;
        this.timeout = null;
        // 遇错即停模式配置
        this.breakOnError = false;
        // 压力测试配置
        this.stress = null;
    }

    init(coreContext) {
        this.coreContext = coreContext;
    }

    isNormalInteger(str) {
        const n = Math.floor(Number(str));
        return n !== Infinity && String(n) === String(str) && n >= 0;
    }

    getStress() {
        if (this.stress === undefined || this.stress === '' || this.stress === null) {
            return 1;
        }
        return !this.stress.match(STRESS_RULE) ? 1 : Number.parseInt(this.stress);
    }

    basicParamValidCheck(params) {
        let size = params.size;
        if (size !== undefined && size !== '' && size !== null) {
            let sizeArray = ['small', 'medium', 'large'];
            if (sizeArray.indexOf(size) === -1) {
                this.filterValid.push('size:' + size);
            }
        }
        let level = params.level;
        if (level !== undefined && level !== '' && level !== null) {
            let levelArray = ['0', '1', '2', '3', '4'];
            if (levelArray.indexOf(level) === -1) {
                this.filterValid.push('level:' + level);
            }
        }
        let testType = params.testType;
        if (testType !== undefined && testType !== '' && testType !== null) {
            let testTypeArray = ['function', 'performance', 'power', 'reliability', 'security',
                'global', 'compatibility', 'user', 'standard', 'safety', 'resilience'];
            if (testTypeArray.indexOf(testType) === -1) {
                this.filterValid.push('testType:' + testType);
            }
        }
    }

    filterParamValidCheck(params) {
        let timeout = params.timeout;
        if (timeout !== undefined && timeout !== '' && timeout !== null) {
            if (!this.isNormalInteger(timeout)) {
                this.filterValid.push('timeout:' + timeout);
            }
        }

        let paramKeys = ['dryRun', 'random', 'breakOnError', 'coverage'];
        for (const key of paramKeys) {
            if (params[key] !== undefined && params[key] !== 'true' && params[key] !== 'false') {
                this.filterValid.push(`${key}:${params[key]}`);
            }
        }

        // 压力测试参数验证,正整数
        if (params.stress !== undefined && params.stress !== '' && params.stress !== null) {
            if (!params.stress.match(STRESS_RULE)) {
                this.filterValid.push('stress:' + params.stress);
            }
        }

        let nameRule = /^[A-Za-z]{1}[\w#,.]*$/;
        let paramClassKeys = ['class', 'notClass'];
        for (const key of paramClassKeys) {
            if (params[key] !== undefined && params[key] !== '' && params[key] !== null) {
                let classArray = params[key].split(',');
                classArray.forEach(item => !item.match(nameRule) ? this.filterValid.push(`${key}:${params[key]}`) : null);
            }
        }
    }

    setConfig(params) {
        this.basicParamValidCheck(params);
        this.filterParamValidCheck(params);
        try {
            this.class = params.class;
            this.notClass = params.notClass;
            this.flag = params.flag || {flag: false};
            this.suite = params.suite;
            this.itName = params.itName;
            this.filter = params.filter;
            this.testType = params.testType;
            this.level = params.level;
            this.size = params.size;
            this.timeout = params.timeout;
            this.dryRun = params.dryRun;
            this.breakOnError = params.breakOnError;
            this.random = params.random === 'true' ? true : false;
            this.stress = params.stress;
            this.coverage = params.coverage;
            this.filterParam = {
                testType: {
                    'function': 1,
                    'performance': 1 << 1,
                    'power': 1 << 2,
                    'reliability': 1 << 3,
                    'security': 1 << 4,
                    'global': 1 << 5,
                    'compatibility': 1 << 6,
                    'user': 1 << 7,
                    'standard': 1 << 8,
                    'safety': 1 << 9,
                    'resilience': 1 << 10,
                },
                level: {
                    '0': 1 << 24,
                    '1': 1 << 25,
                    '2': 1 << 26,
                    '3': 1 << 27,
                    '4': 1 << 28,
                },
                size: {
                    'small': 1 << 16,
                    'medium': 1 << 17,
                    'large': 1 << 18,
                }
            };
            this.parseParams();
        } catch (err) {
            console.info(`${TAG}setConfig error: ${err.message}`);
        }
    }

    parseParams() {
        if (this.filter != null) {
            return;
        }
        let testTypeFilter = 0;
        let sizeFilter = 0;
        let levelFilter = 0;
        if (this.testType != null) {
            testTypeFilter = this.testType.split(',')
                .map(item => this.filterParam.testType[item] || 0)
                .reduce((pre, cur) => pre | cur, 0);
        }
        if (this.level != null) {
            levelFilter = this.level.split(',')
                .map(item => this.filterParam.level[item] || 0)
                .reduce((pre, cur) => pre | cur, 0);
        }
        if (this.size != null) {
            sizeFilter = this.size.split(',')
                .map(item => this.filterParam.size[item] || 0)
                .reduce((pre, cur) => pre | cur, 0);
        }
        this.filter = testTypeFilter | sizeFilter | levelFilter;
        console.info(`${TAG}filter params:${this.filter}`);
    }

    isCurrentSuite(description) {
        if (this.suite !== undefined && this.suite !== '' && this.suite !== null) {
            let suiteArray = this.suite.split(',');
            return suiteArray.indexOf(description) !== -1;
        }
        return false;
    }

    filterSuite(currentSuiteName) {
        let filterArray = [];
        if (this.suite !== undefined && this.suite !== '' && this.suite !== null) {
            filterArray.push(new SuiteAndItNameFilter(currentSuiteName, '', this.suite));
        }
        if (this.class !== undefined && this.class !== '' && this.class !== null) {
            filterArray.push(new ClassFilter(currentSuiteName, '', this.class));
        }
        if (this.notClass !== undefined && this.notClass !== '' && this.notClass !== null) {
            filterArray.push(new NotClassFilter(currentSuiteName, '', this.notClass));
        }

        let result = filterArray.map(item => item.filterSuite()).reduce((pre, cur) => pre || cur, false);
        return result;
    }

    filterDesc(currentSuiteName, desc, fi, coreContext) {
        let filterArray = [];
        if (this.itName !== undefined && this.itName !== '' && this.itName !== null) {
            filterArray.push(new SuiteAndItNameFilter(currentSuiteName, desc, this.itName));
        }
        if (this.class !== undefined && this.class !== '' && this.class !== null) {
            filterArray.push(new ClassFilter(currentSuiteName, desc, this.class));
        }
        if (this.notClass !== undefined && this.notClass !== '' && this.notClass !== null) {
            filterArray.push(new NotClassFilter(currentSuiteName, desc, this.notClass));
        }
        if (typeof (this.filter) !== 'undefined' && this.filter !== 0 && fi !== 0) {
            filterArray.push(new TestTypesFilter('', '', fi, this.filter));
        }
        let result = filterArray.map(item => item.filterIt()).reduce((pre, cur) => pre || cur, false);
        return result;
    }

    isRandom() {
        return this.random || false;
    }

    isBreakOnError() {
        return this.breakOnError !== 'true' ? false : true;
    }

    setSupportAsync(value) {
        this.supportAsync = value;
    }

    isSupportAsync() {
        return this.supportAsync;
    }

    translateParams(parameters) {
        const keySet = new Set([
            '-s class', '-s notClass', '-s suite', '-s itName',
            '-s level', '-s testType', '-s size', '-s timeout',
            '-s dryRun', '-s random', '-s breakOnError', '-s stress',
            '-s coverage', 'class', 'notClass', 'suite', 'itName',
            'level', 'testType', 'size', 'timeout', 'dryRun', 'random',
            'breakOnError', 'stress', 'coverage'
        ]);
        let targetParams = {};
        for (const key in parameters) {
            if (keySet.has(key)) {
                var newKey = key.replace("-s ", "");
                targetParams[newKey] = parameters[key];
            }
        }
        return targetParams;
    }
    translateParamsToString(parameters) {
        const keySet = new Set([
            '-s class', '-s notClass', '-s suite', '-s itName',
            '-s level', '-s testType', '-s size', '-s timeout',
            '-s dryRun', '-s random', '-s breakOnError', '-s stress',
            '-s coverage', 'class', 'notClass', 'suite', 'itName',
            'level', 'testType', 'size', 'timeout', 'dryRun', 'random',
            'breakOnError', 'stress', 'coverage'
        ]);
        let targetParams = '';
        for (const key in parameters) {
            if (keySet.has(key)) {
                targetParams += ' ' + key + ' ' + parameters[key];
            }
        }
        return targetParams.trim();
    }

    execute() {
    }
}

export {
    ConfigService
};
