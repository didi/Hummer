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

class ReportExtend {
    constructor(fileModule) {
        this.id = 'extend';
        this.fileModule = fileModule;
    }

    init(coreContext) {
        this.coreContext = coreContext;
        this.suiteService = this.coreContext.getDefaultService('suite');
    }

    taskStart() {

    }

    taskDone() {
        const report = {
            tag: 'testsuites',
            name: 'summary_report',
            timestamp: new Date().toDateString(),
            time: '1',
            errors: 0,
            failures: 0,
            tests: 0,
            children: []
        };
        const rootSuite = this.suiteService.rootSuite;
        if (rootSuite && rootSuite.childSuites) {
            for (let testsuite of rootSuite.childSuites) {
                let suiteReport = {
                    tag: 'testsuite',
                    name: testsuite['description'],
                    errors: 0,
                    tests: 0,
                    failures: 0,
                    time: '0.1',
                    children: []
                };
                let specs = testsuite['specs'];
                for (let testcase of specs) {
                    report.tests++;
                    suiteReport.tests++;
                    let caseReport = {
                        tag: 'testcase',
                        name: testcase['description'],
                        status: 'run',
                        time: '0.0',
                        classname: testsuite['description']
                    };
                    if (testcase.error) {
                        caseReport['result'] = false;
                        caseReport['children'] = [{
                            tag: 'error',
                            type: '',
                            message: testcase.error.message
                        }];
                        report.errors++;
                        suiteReport.errors++;
                    } else if (testcase.result.failExpects.length > 0) {
                        caseReport['result'] = false;
                        let message = '';
                        testcase.result.failExpects.forEach(failExpect => {
                            message += failExpect.message || ('expect ' + failExpect.actualValue + ' ' + failExpect.checkFunc + ' ' + (failExpect.expectValue || '')) + ';';
                        });
                        caseReport['children'] = [{
                            tag: 'failure',
                            type: '',
                            message: message
                        }];
                        report.failures++;
                        suiteReport.failures++;
                    } else {
                        caseReport['result'] = true;
                    }
                    suiteReport.children.push(caseReport);
                }
                report.children.push(suiteReport);
            }
        }

        let reportXml = '<?xml version="1.0" encoding="UTF-8"?>\n' + json2xml(report);
        this.fileModule.writeText({
            uri: 'internal://app/report.xml',
            text: reportXml,
            success: function () {
                console.info('call success callback success');
            },
            fail: function (data, code) {
                console.info('call fail callback success:');
            },
            complete: function () {
                console.info('call complete callback success');
            }
        });
    }
}

function json2xml(json) {
    let tagName;
    let hasChildren = false;
    let childrenStr = '';
    let attrStr = '';
    for (let key in json) {
        if (key === 'tag') {
            tagName = json[key];
        } else if (key === 'children') {
            if (json[key].length > 0) {
                hasChildren = true;
                for (let child of json[key]) {
                    childrenStr += json2xml(child);
                }
            }
        } else {
            attrStr += ` ${key}="${json[key]}"`;
        }
    }
    let xml = `<${tagName}${attrStr}`;
    xml += hasChildren ? `>${childrenStr}</${tagName}>` : '/>';
    return xml;
}

export default ReportExtend;
