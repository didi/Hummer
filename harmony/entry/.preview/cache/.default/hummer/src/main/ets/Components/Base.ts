import type { HMContext } from '../Context/HMContext';
export default class HMBase {
    // 不同上下文 会重复
    public readonly id: number;
    public readonly name: string;
    // 全局唯一
    public readonly uniqueId: string;
    public readonly context: HMContext;
    public eventListeners: Set<string> = new Set();
    public eventChannel?: Function;
    constructor(context: HMContext, id: number, name: string, ...args: any[]) {
        this.context = context;
        this.id = id;
        this.name = name;
        const ctxId = this.context.id;
        this.uniqueId = ctxId + '+' + id;
    }
    setEventTarget(eventTarget: Function) {
        this.eventChannel = eventTarget;
    }
    dispatchEvent(eventName: string, ...args: any[]) {
        if (this.eventChannel) {
            this.eventChannel(eventName, ...args);
        }
    }
    addEventListener(event: string): boolean {
        if (this.eventListeners.has(event)) {
            return false;
        }
        this.eventListeners.add(event);
        return true;
    }
    removeEventListener(event: string): boolean {
        if (!this.eventListeners.has(event)) {
            return false;
        }
        this.eventListeners.delete(event);
        return true;
    }
}
