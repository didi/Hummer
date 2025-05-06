export default class HMBase {
    constructor(context, id, name, ...args) {
        this.eventListeners = new Set();
        this.context = context;
        this.id = id;
        this.name = name;
        const ctxId = this.context.id;
        this.uniqueId = ctxId + '+' + id;
    }
    setEventTarget(eventTarget) {
        this.eventChannel = eventTarget;
    }
    dispatchEvent(eventName, ...args) {
        if (this.eventChannel) {
            this.eventChannel(eventName, ...args);
        }
    }
    addEventListener(event) {
        if (this.eventListeners.has(event)) {
            return false;
        }
        this.eventListeners.add(event);
        return true;
    }
    removeEventListener(event) {
        if (!this.eventListeners.has(event)) {
            return false;
        }
        this.eventListeners.delete(event);
        return true;
    }
}
//# sourceMappingURL=Base.js.map