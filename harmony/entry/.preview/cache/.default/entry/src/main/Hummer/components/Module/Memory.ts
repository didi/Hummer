import HashMap from "@ohos:util.HashMap";
import { Component } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Component";
export class HMMemory extends Component {
    // 命名空间
    private nameSpace: string = this.context.config.nameSpace;
    private static storage: HashMap<string, HashMap<string, any>> = new HashMap();
    init() {
        let realEventMap: HashMap<string, any> = new HashMap();
        HMMemory.storage.set(this.nameSpace, realEventMap);
    }
    // set
    private set(key: string, value: string, callback?: Function) {
        // 区分nameSpace
        if (!HMMemory.storage.hasKey(this.nameSpace)) {
            this.init();
        }
        let nameSpaceMemory = HMMemory.storage.get(this.nameSpace);
        if (!nameSpaceMemory.hasKey(key)) {
            nameSpaceMemory.set(key, value);
        }
        callback && callback({
            code: 0,
            data: null,
            msg: null
        });
    }
    // remove
    private remove(key: string, callback?: Function) {
        HMMemory.storage.get(this.nameSpace)?.remove(key);
        callback && callback({
            code: 0,
            data: true,
            msg: null
        });
    }
    // removeAll
    private removeAll(callback?: Function) {
        HMMemory.storage.remove(this.nameSpace);
        callback && callback({
            code: 0,
            data: true,
            msg: null
        });
    }
    // get
    private get(key: string, callback: Function) {
        callback({
            code: 0,
            data: HMMemory.storage.get(this.nameSpace)?.get(key),
            msg: null
        });
    }
    // exist
    private exist(key: string, callback: Function) {
        callback({
            code: 0,
            data: !!HMMemory.storage.get(this.nameSpace)?.hasKey(key),
            msg: null
        });
    }
}
