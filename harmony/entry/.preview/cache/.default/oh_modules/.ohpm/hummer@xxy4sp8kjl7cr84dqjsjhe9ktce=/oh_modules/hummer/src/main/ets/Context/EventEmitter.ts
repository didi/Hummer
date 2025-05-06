enum EventMode {
    default = 0,
    queue = 1
}
interface EventOptions {
    mode: EventMode;
}
type Callback = (...args) => void;
type CleanupCallback = () => void;
class EventOperation {
    isOnce: boolean;
    fn: Callback;
    id: number;
    constructor(fn: Callback, isOnce = false) {
        this.fn = fn;
        this.isOnce = isOnce;
    }
}
interface IEventChannel {
    on(callback: Callback): CleanupCallback;
    once(callback: Callback): CleanupCallback;
    emit(...args);
    off(callback: Callback);
}
class EventChannel implements IEventChannel {
    private _operations: Array<EventOperation> = new Array();
    public name: string;
    constructor(name: string) {
        this.name = name;
    }
    on(callback: Callback): CleanupCallback {
        const item = new EventOperation(callback);
        this._operations.push(item);
        return () => {
            this.off(callback);
        };
    }
    once(callback: Callback): CleanupCallback {
        const item = new EventOperation(callback, true);
        this._operations.push(item);
        return () => {
            this.off(callback);
        };
    }
    emit(...args) {
        if (this._operations.length == 0) {
            return;
        }
        this._operations = this._operations.filter((operation) => {
            operation.fn.call(this, ...args);
            return operation.isOnce == true;
        });
    }
    off(callback: Callback) {
        if (this._operations.length == 0) {
            return;
        }
        this._operations = this._operations.filter((operation) => {
            return operation.fn == callback;
        });
    }
}
class EventChannelQueue implements IEventChannel {
    private _operations: Array<EventOperation> = new Array();
    private _eventQueue: Array<any[]> = new Array();
    public name: string;
    constructor(name: string) {
        this.name = name;
    }
    on(callback: Callback): CleanupCallback {
        const item = new EventOperation(callback);
        this._operations.push(item);
        this._checkQueue();
        return () => {
            this.off(callback);
        };
    }
    once(callback: Callback): CleanupCallback {
        const item = new EventOperation(callback, true);
        this._operations.push(item);
        this._checkQueue();
        return () => {
            this.off(callback);
        };
    }
    emit(...args) {
        this._eventQueue.push(args);
        this._checkQueue();
    }
    off(callback: Callback) {
        if (this._operations.length == 0) {
            return;
        }
        this._operations = this._operations.filter((operation) => {
            return operation.fn == callback;
        });
    }
    /// 尝试清空队列
    _checkQueue() {
        if (this._operations.length == 0) {
            return;
        }
        if (this._eventQueue.length == 0) {
            return;
        }
        this._eventQueue = this._eventQueue.filter((item) => {
            return this._emit(item);
        });
    }
    ///发送消息，并移除 once 类型，如果没有监听者，则返回 false；
    _emit(args): boolean {
        if (this._operations.length == 0) {
            return false;
        }
        this._operations = this._operations.filter((operation) => {
            operation.fn.call(this, ...args);
            return operation.isOnce == true;
        });
        return true;
    }
}
class EventEmitter {
    private _channels: Map<string, IEventChannel> = new Map();
    private _options: EventOptions = { mode: EventMode.queue };
    constructor(options?: EventOptions) {
        this._options = { ...this._options, ...options };
    }
    on(eventName: string, callback: Callback): CleanupCallback {
        const eventChannel = this._createChannelIfNeeded(eventName);
        return eventChannel.on(callback);
    }
    once(eventName: string, callback: Callback): CleanupCallback {
        const eventChannel = this._createChannelIfNeeded(eventName);
        return eventChannel.once(callback);
    }
    emit(eventName: string, ...args) {
        const channel: IEventChannel = this._createChannelIfNeeded(eventName);
        if (!channel) {
            return;
        }
        channel.emit(...args);
    }
    off(eventName: string, callback: Callback) {
        const channel: IEventChannel = this._channels[eventName];
        if (!channel) {
            return;
        }
        channel.off(callback);
    }
    _createChannelIfNeeded(eventName: string): IEventChannel {
        let channel = this._channels[eventName];
        if (channel) {
            return channel;
        }
        if (this._options.mode == EventMode.default) {
            channel = new EventChannel(eventName);
        }
        else {
            channel = new EventChannelQueue(eventName);
        }
        this._channels[eventName] = channel;
        return channel;
    }
}
export { EventEmitter };
export type { CleanupCallback };
