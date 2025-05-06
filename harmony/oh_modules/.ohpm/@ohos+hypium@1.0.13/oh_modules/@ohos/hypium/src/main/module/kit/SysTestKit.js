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

import {TAG} from '../../Constant';

export default class SysTestKit {

    static delegator = null;
    static systemTime = null;

    constructor() {
        this.id = 'sysTestKit';
        this.index = 0;
    }

    static actionStart(tag) {
        console.info(`${TAG}${JSON.stringify(tag)}`);
        var message = '\n' + 'OHOS_REPORT_ACTIONSTART: ' + JSON.stringify(tag) + '\n';
        SysTestKit.print(message);
        console.info(`${TAG}${JSON.stringify(tag)} actionStart print success`);
    }

    static actionEnd(tag) {
        console.info(`${TAG}${JSON.stringify(tag)}`);
        var message = '\n' + 'OHOS_REPORT_ACTIONEND: ' + JSON.stringify(tag) + '\n';
        SysTestKit.print(message);
        console.info(`${TAG}${JSON.stringify(tag)}  actionEnd print success`);
    }

    static async existKeyword(keyword, timeout) {
        let reg = new RegExp(/^[a-zA-Z0-9]{1,}$/);
        if (!reg.test(keyword)) {
            throw new Error('keyword must contain more than one string, and only letters and numbers are supported.');
        }
        timeout = timeout || 4;

        let searchResult = false;
        let cmd = 'hilog -x | grep -i \'' + keyword + '\' | wc -l';
        await executePromise(cmd, timeout).then((data) => {
            searchResult = data;
        });
        return searchResult;
    }
    static async print(message) {
        if ('printSync' in SysTestKit.delegator) {
            console.debug(`${TAG}printSync called ...`);
            SysTestKit.delegator.printSync(message);
        } else {
            await SysTestKit.delegator.print(message);
        }
    }

    static async getRealTime() {
        let currentTime = new Date().getTime();
        if (SysTestKit.systemTime !== null && SysTestKit.systemTime !== undefined) {
            await SysTestKit.systemTime.getRealTime().then((time) => {
                console.info(`${TAG}systemTime.getRealTime success data: ${JSON.stringify(time)}`);
                currentTime = time;
            }).catch((error) => {
                console.error(`${TAG}failed to systemTime.getRealTime because ${JSON.stringify(error)}`);
            });
        }
        return currentTime;
    }
}

function executePromise(cmd, timeout) {
    return new Promise((resolve, reject) => {
        SysTestKit.delegator.executeShellCommand(cmd, timeout,
            (error, data) => {
                console.info(`${TAG}existKeyword CallBack: err : ${JSON.stringify(error)}`);
                console.info(`${TAG}existKeyword CallBack: data : ${JSON.stringify(data)}`);
                resolve(parseInt(data.stdResult) > 3 ? true : false);
            });
    });
}