const { document: _Document } = __Hummer__


import { HummerComponent } from "../../HummerComponent"

export class Storage extends HummerComponent {

    private static instance: Storage;

    public constructor(props: any = {}) {
        super("Storage", props);
    }

    protected static newInstance(): Storage {
        return new Storage();
    }

    protected static checkInstance() {
        if (!Storage.instance) {
            Storage.instance = Storage.newInstance();
        }
    }

    /**
     * 保存键值对
     *
     * @param key 名称
     * @param value 值
     */
    static set(key: string, value: Object, cb?: Function) {
        Storage.checkInstance();
        Storage.instance.set(key, value, cb);
    }

    /**
    * 获取键对应的值
    *
    * @param key 名称
    * @return value 值
    */
    static get(key: string, cb: Function): any {
        Storage.checkInstance();
        return Storage.instance.get(key, cb);
    }



    /**
     * 删除键值对
     *
     * @param key 名称
     */
    static remove(key: string, cb?: Function) {
        Storage.checkInstance();
        Storage.instance.remove(key, cb);
    }


    /**
    * 删除所有数据
    */
    public static removeAll(cb?: Function) {
        Storage.checkInstance();
        Storage.instance.removeAll(cb);
    }

    /**
     * 是否存在某个键值对
     *
     * @param key 名称
     */
    public static exist(key: string, cb: Function) {
        Storage.checkInstance();
        Storage.instance.exist(key, cb);
    }


    protected set(key: string, value: Object, cb?: Function) {
        this.call("set", key, value, cb);
    }


    protected get(key: string, cb: Function): any {
        return this.call("get", key, cb);
    }

    protected remove(key: string, cb?: Function) {
        this.call("remove", key, cb);
    }

    protected removeAll(cb?: Function) {
        this.call("removeAll", cb);
    }

    protected exist(key: string, cb: Function) {
        this.call("exist", key, cb)
    }

}