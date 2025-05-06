import { unrecognizedMethod } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/Error";
import { forceToString } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/Utils";
import Base from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Base";
import type { IComponentInstruction } from './IPlatformInst';
export class Component extends Base implements IComponentInstruction {
    public eventListeners: Set<string> = new Set();
    public eventChannel?: Function;
    setEventTarget(eventTarget: Function) {
        this.eventChannel = eventTarget;
    }
    dispatchEvent(eventName: string, ...args: any[]) {
        if (this.eventChannel) {
            this.eventChannel(eventName, ...args);
        }
    }
    addEventListener(event: string) {
        if (this.eventListeners.has(event)) {
            return;
        }
        this.eventListeners.add(event);
    }
    removeEventListener(event: string) {
        if (!this.eventListeners.has(event)) {
            return;
        }
        this.eventListeners.delete(event);
    }
    invoke(funcName: string, ...args: any[]): any {
        /// 不使用
        const props = this[funcName];
        if (props instanceof Function) {
            const func = props as Function;
            try {
                return func.call(this, ...args);
            }
            catch (e) {
                this.context.handleException(forceToString(e));
            }
        }
        else {
            this.context.handleError(unrecognizedMethod(funcName));
        }
    }
}
