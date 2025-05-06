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

class SpecEvent {
    constructor(attr) {
        this.id = attr.id;
        this.coreContext = attr.context;
        this.eventMonitors = [];
    }

    subscribeEvent(service) {
        this.eventMonitors.push(service);
    }

    async specStart() {
        for (const monitor of this.eventMonitors) {
            await monitor['specStart']();
        }
    }

    async specDone() {
        for (const monitor of this.eventMonitors) {
            await monitor['specDone']();
        }
    }
}

class SuiteEvent {
    constructor(attr) {
        this.id = attr.id;
        this.suiteContext = attr.coreContext;
        this.eventMonitors = [];
    }

    subscribeEvent(service) {
        this.eventMonitors.push(service);
    }

    async suiteStart() {
        for (const monitor of this.eventMonitors) {
            await monitor['suiteStart']();
        }
    }

    async suiteDone() {
        for (const monitor of this.eventMonitors) {
            await monitor['suiteDone']();
        }
    }
}

class TaskEvent {
    constructor(attr) {
        this.id = attr.id;
        this.coreContext = attr.coreContext;
        this.eventMonitors = [];
    }

    subscribeEvent(service) {
        this.eventMonitors.push(service);
    }

    async taskStart() {
        for (const monitor of this.eventMonitors) {
            await monitor['taskStart']();
        }
    }

    async taskDone() {
        for (const monitor of this.eventMonitors) {
            await monitor['taskDone']();
        }
    }

    incorrectFormat() {
        for (const monitor of this.eventMonitors) {
            monitor['incorrectFormat']();
        }
    }
}

export {SpecEvent, TaskEvent, SuiteEvent};
