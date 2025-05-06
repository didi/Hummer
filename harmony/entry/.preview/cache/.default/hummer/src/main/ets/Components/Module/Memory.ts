import HashMap from "@ohos:util.HashMap";
import { HMComponent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Component";
export type resType = {
    code: Number;
    data: any;
    msg: string | null | undefined;
};
export class Memory {
    private static _memoryMap: Map<string, Memory> = new Map();
    private nameSpace: string; // nameSpace
    // 命名空间
    private static storage: HashMap<string, HashMap<string, any>> = new HashMap();
    public static instance(nameSpace: string): Memory {
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
        let realEventMap: HashMap<string, any> = new HashMap();
        Memory.storage.set(this.nameSpace, realEventMap);
    }
    // set
    public set(key: string, value: string, callback?: Function) {
        // 区分nameSpace
        if (!Memory.storage.hasKey(this.nameSpace)) {
            this.init();
        }
        let nameSpaceMemory = Memory.storage.get(this.nameSpace);
        if (!nameSpaceMemory.hasKey(key)) {
            nameSpaceMemory.set(key, value);
        }
        let res: resType = {
            code: 0,
            data: null,
            msg: null
        };
        callback && callback(res);
    }
    // remove
    public remove(key: string, callback?: Function) {
        Memory.storage.get(this.nameSpace)?.remove(key);
        let res: resType = {
            code: 0,
            data: null,
            msg: null
        };
        callback && callback(res);
    }
    // removeAll
    public removeAll(callback?: Function) {
        Memory.storage.remove(this.nameSpace);
        let res: resType = {
            code: 0,
            data: null,
            msg: null
        };
        callback && callback(res);
    }
    // get
    public get(key: string, callback?: Function) {
        let res: resType = {
            code: 0,
            data: Memory.storage.get(this.nameSpace)?.get(key),
            msg: null
        };
        if (callback) {
            callback(res);
        }
        else {
            return Memory.storage.get(this.nameSpace)?.get(key);
        }
    }
    // exist
    public exist(key: string, callback: Function) {
        let res: resType = {
            code: 0,
            data: !!Memory.storage.get(this.nameSpace)?.hasKey(key),
            msg: null
        };
        if (callback) {
            callback(res);
        }
        else {
            return !!Memory.storage.get(this.nameSpace)?.hasKey(key);
        }
    }
}
export class HMMemory extends HMComponent {
    private memory = Memory.instance(this.context.config.nameSpace);
    // set
    private set(key: string, value: string, callback?: Function) {
        this.memory.set(key, value, callback);
    }
    // remove
    private remove(key: string, callback?: Function) {
        this.memory.remove(key, callback);
    }
    // removeAll
    private removeAll(callback?: Function) {
        this.memory.removeAll(callback);
    }
    // get
    private get(key: string, callback?: Function) {
        return this.memory.get(key, callback);
    }
    // exist
    private exist(key: string, callback: Function) {
        return this.memory.exist(key, callback);
    }
}
