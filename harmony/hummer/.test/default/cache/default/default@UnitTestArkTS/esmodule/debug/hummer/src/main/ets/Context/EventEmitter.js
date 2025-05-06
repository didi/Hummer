var EventMode;
(function (EventMode) {
    EventMode[EventMode["default"] = 0] = "default";
    EventMode[EventMode["queue"] = 1] = "queue";
})(EventMode || (EventMode = {}));
class EventOperation {
    constructor(fn, isOnce = false) {
        this.fn = fn;
        this.isOnce = isOnce;
    }
}
class EventChannel {
    constructor(name) {
        this._operations = new Array();
        this.name = name;
    }
    on(callback) {
        const item = new EventOperation(callback);
        this._operations.push(item);
        return () => {
            this.off(callback);
        };
    }
    once(callback) {
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
            return operation.isOnce == false;
        });
    }
    off(callback) {
        if (this._operations.length == 0) {
            return;
        }
        if (!callback) {
            this._operations = new Array();
            return;
        }
        this._operations = this._operations.filter((operation) => {
            return operation.fn != callback;
        });
    }
}
class EventChannelQueue {
    constructor(name) {
        this._operations = new Array();
        this._eventQueue = new Array();
        this.name = name;
    }
    on(callback) {
        const item = new EventOperation(callback);
        this._operations.push(item);
        this._checkQueue();
        return () => {
            this.off(callback);
        };
    }
    once(callback) {
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
    off(callback) {
        if (this._operations.length == 0) {
            return;
        }
        if (!callback) {
            this._operations = new Array();
            return;
        }
        this._operations = this._operations.filter((operation) => {
            return operation.fn != callback;
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
        this._eventQueue = this._eventQueue.filter((args) => {
            return this._emit(...args);
        });
    }
    ///发送消息，并移除 once 类型，如果没有监听者，则返回 false；
    _emit(...args) {
        if (this._operations.length == 0) {
            return true;
        }
        this._operations = this._operations.filter((operation) => {
            operation.fn.call(this, ...args);
            return operation.isOnce == false;
        });
        return false;
    }
}
class EventEmitter {
    constructor(options) {
        this._channels = new Map();
        this._options = { mode: EventMode.queue };
        this._options = Object.assign(Object.assign({}, this._options), options);
    }
    on(eventName, callback) {
        const eventChannel = this._createChannelIfNeeded(eventName);
        return eventChannel.on(callback);
    }
    once(eventName, callback) {
        const eventChannel = this._createChannelIfNeeded(eventName);
        return eventChannel.once(callback);
    }
    emit(eventName, ...args) {
        const channel = this._createChannelIfNeeded(eventName);
        if (!channel) {
            return;
        }
        channel.emit(...args);
    }
    off(eventName, callback) {
        const channel = this._channels[eventName];
        if (!channel) {
            return;
        }
        channel.off(callback);
    }
    _createChannelIfNeeded(eventName) {
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
    _TestOnlyGetCallback(eventName) {
        const channel = this._channels[eventName];
        const res = new Array();
        if (!channel) {
            return res;
        }
        const _operations = channel['_operations'];
        _operations.forEach((operation) => {
            res.push(operation.fn);
        });
        return res;
    }
}
export { EventEmitter };
//# sourceMappingURL=EventEmitter.js.map