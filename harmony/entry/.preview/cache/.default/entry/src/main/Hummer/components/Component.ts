import { unrecognizedMethod } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/Error";
import { forceToString } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/Utils";
import Base from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Base";
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
