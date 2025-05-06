import { EventEmitter } from '@bundle:com.example.hummer/hummer/ets/Context/EventEmitter';
import { HMContextEventType } from '@bundle:com.example.hummer/hummer/ets/Context/HMContext';
import { HMComponent } from '@bundle:com.example.hummer/hummer/ets/Components/Component';
export class NotifyCenter {
    static getInstance(namespace) {
        let notifyCenter = NotifyCenter.instanceMap.get(namespace);
        if (!notifyCenter) {
            notifyCenter = new NotifyCenter();
            NotifyCenter.instanceMap.set(namespace, notifyCenter);
        }
        return notifyCenter;
    }
    constructor() {
        this.eventEmitter = new EventEmitter();
    }
    addEventListener(event, callback) {
        return this.eventEmitter.on(event, callback);
    }
    removeEventListener(event, callback) {
        this.eventEmitter.off(event, callback);
    }
    triggerEvent(event, ...args) {
        this.eventEmitter.emit(event, ...args);
    }
}
NotifyCenter.instanceMap = new Map();
export class HMNotifyCenter extends HMComponent {
    constructor(context, id, name, ...args) {
        super(context, id, name, ...args);
        this.eventCleanMap = new Map();
        this.notifyCenter = NotifyCenter.getInstance(context.config.nameSpace);
        const cleanFunc = this.context.eventEmitter.on(HMContextEventType.OnDestroy, () => {
            cleanFunc();
            this.eventCleanMap.forEach((value, key) => {
                value();
            });
            this.eventCleanMap = undefined;
        });
    }
    addEventListener(event) {
        const res = super.addEventListener(event);
        if (!res) {
            return res;
        }
        const fn = this.notifyCenter.addEventListener(event, (...args) => {
            this.dispatchEvent(event, ...args);
        });
        this.eventCleanMap.set(event, fn);
        return res;
    }
    removeEventListener(event) {
        const res = super.removeEventListener(event);
        if (!res) {
            return res;
        }
        const cleanFn = this.eventCleanMap.get(event);
        this.eventCleanMap.delete(event);
        cleanFn === null || cleanFn === void 0 ? void 0 : cleanFn();
        return res;
    }
    triggerEvent(event, ...args) {
        this.notifyCenter.triggerEvent(event, ...args);
    }
}
//# sourceMappingURL=NotifyCenter.js.map