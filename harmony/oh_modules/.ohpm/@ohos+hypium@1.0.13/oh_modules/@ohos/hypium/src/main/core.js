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

import {SuiteService, SpecService, ExpectService, ReportService} from './service';
import {ConfigService} from './module/config/configService';
import {SpecEvent, TaskEvent, SuiteEvent} from './event';

/**
 * core service for execute testcase.
 */
class Core {
    static getInstance() {
        if (!this.instance) {
            this.instance = new Core();
        }
        return this.instance;
    }

    constructor() {
        this.instance = null;
        this.services = {
            suite: {},
            spec: {},
            config: {},
            expect: {},
            log: {},
            report: {}

        };
        this.events = {
            suite: {},
            spec: {},
            task: {}
        };
    }

    addService(name, service) {
        let serviceObj = {};
        if (!this.services[name]) {
            this.services[name] = serviceObj;
        } else {
            serviceObj = this.services[name];
        }
        serviceObj[service.id] = service;
    }

    getDefaultService(name) {
        return this.services[name].default;
    }

    getServices(name) {
        return this.services[name];
    }

    registerEvent(serviceName, event) {
        let eventObj = {};
        if (!this.events[serviceName]) {
            this.events[serviceName] = eventObj;
        } else {
            eventObj = this.events[serviceName];
        }
        eventObj[event.id] = event;
    }

    unRegisterEvent(serviceName, eventID) {
        const eventObj = this.events[serviceName];
        if (eventObj) {
            delete eventObj[eventID];
        }
    }

    subscribeEvent(serviceName, serviceObj) {
        const eventObj = this.events[serviceName];
        if (eventObj) {
            for (const attr in eventObj) {
                eventObj[attr]['subscribeEvent'](serviceObj);
            }
        }
    }

    async fireEvents(serviceName, eventName) {
        const eventObj = this.events[serviceName];
        if (!eventObj) {
            return;
        }
        for (const attr in eventObj) {
            await eventObj[attr][eventName]();
        }
    }

    addToGlobal(apis) {
        if (typeof globalThis !== 'undefined') {
            for (let api in apis) {
                globalThis[api] = apis[api];
            }
        }
        for (const api in apis) {
            this[api] = apis[api];
        }
    }

    init() {
        this.addService('suite', new SuiteService({id: 'default'}));
        this.addService('spec', new SpecService({id: 'default'}));
        this.addService('expect', new ExpectService({id: 'default'}));
        this.addService('report', new ReportService({id: 'default'}));
        this.addService('config', new ConfigService({id: 'default'}));
        this.registerEvent('task', new TaskEvent({id: 'default', coreContext: this}));
        this.registerEvent('suite', new SuiteEvent({id: 'default', coreContext: this}));
        this.registerEvent('spec', new SpecEvent({id: 'default', coreContext: this}));
        this.subscribeEvent('spec', this.getDefaultService('report'));
        this.subscribeEvent('suite', this.getDefaultService('report'));
        this.subscribeEvent('task', this.getDefaultService('report'));
        const context = this;
        for (const key in this.services) {
            const serviceObj = this.services[key];
            for (const serviceID in serviceObj) {
                const service = serviceObj[serviceID];
                service.init(context);

                if (typeof service.apis !== 'function') {
                    continue;
                }
                const apis = service.apis();
                if (apis) {
                    this.addToGlobal(apis);
                }
            }
        }
    }

    execute(abilityDelegator) {
        const suiteService = this.getDefaultService('suite');
        const configService = this.getDefaultService('config');
        if (configService['dryRun'] === 'true') {
            (async function () {
                await suiteService.dryRun(abilityDelegator);
            })();
            return;
        }
        setTimeout(() => {
            suiteService.execute();
        }, 10);
    }
}

export default Core;
