import HashMap from '@ohos:util.HashMap';
import { HMComponent } from '@bundle:com.example.hummer/hummer/ets/Components/Component';
export class Memory {
    static instance(nameSpace) {
        const _instance = Memory._memoryMap.get(nameSpace);
        if (_instance) {
            return _instance;
        }
        const newInstance = new Memory();
        newInstance.nameSpace = nameSpace;
        Memory._memoryMap.set(nameSpace, newInstance);
        return newInstance;
    }
    init() {
        let realEventMap = new HashMap();
        Memory.storage.set(this.nameSpace, realEventMap);
    }
    // set
    set(key, value, callback) {
        // 区分nameSpace
        if (!Memory.storage.hasKey(this.nameSpace)) {
            this.init();
        }
        let nameSpaceMemory = Memory.storage.get(this.nameSpace);
        if (!nameSpaceMemory.hasKey(key)) {
            nameSpaceMemory.set(key, value);
        }
        let res = {
            code: 0,
            data: null,
            msg: null
        };
        callback && callback(res);
    }
    // remove
    remove(key, callback) {
        var _a;
        (_a = Memory.storage.get(this.nameSpace)) === null || _a === void 0 ? void 0 : _a.remove(key);
        let res = {
            code: 0,
            data: null,
            msg: null
        };
        callback && callback(res);
    }
    // removeAll
    removeAll(callback) {
        Memory.storage.remove(this.nameSpace);
        let res = {
            code: 0,
            data: null,
            msg: null
        };
        callback && callback(res);
    }
    // get
    get(key, callback) {
        var _a, _b;
        let res = {
            code: 0,
            data: (_a = Memory.storage.get(this.nameSpace)) === null || _a === void 0 ? void 0 : _a.get(key),
            msg: null
        };
        if (callback) {
            callback(res);
        }
        else {
            return (_b = Memory.storage.get(this.nameSpace)) === null || _b === void 0 ? void 0 : _b.get(key);
        }
    }
    // exist
    exist(key, callback) {
        var _a, _b;
        let res = {
            code: 0,
            data: !!((_a = Memory.storage.get(this.nameSpace)) === null || _a === void 0 ? void 0 : _a.hasKey(key)),
            msg: null
        };
        if (callback) {
            callback(res);
        }
        else {
            return !!((_b = Memory.storage.get(this.nameSpace)) === null || _b === void 0 ? void 0 : _b.hasKey(key));
        }
    }
}
Memory._memoryMap = new Map();
// 命名空间
Memory.storage = new HashMap();
export class HMMemory extends HMComponent {
    constructor() {
        super(...arguments);
        this.memory = Memory.instance(this.context.config.nameSpace);
    }
    // set
    set(key, value, callback) {
        this.memory.set(key, value, callback);
    }
    // remove
    remove(key, callback) {
        this.memory.remove(key, callback);
    }
    // removeAll
    removeAll(callback) {
        this.memory.removeAll(callback);
    }
    // get
    get(key, callback) {
        return this.memory.get(key, callback);
    }
    // exist
    exist(key, callback) {
        return this.memory.exist(key, callback);
    }
}
//# sourceMappingURL=Memory.js.map