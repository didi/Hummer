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
    static set(key: string, value: Object) {
        Storage.checkInstance();
        Storage.instance.set(key, value);
    }

    /**
    * 获取键对应的值
    *
    * @param key 名称
    * @return value 值
    */
    static get(key: string): any {
        Storage.checkInstance();
        return Storage.instance.get(key);
    }



    /**
     * 删除键值对
     *
     * @param key 名称
     */
    static remove(key: string) {
        Storage.checkInstance();
        Storage.instance.remove(key);
    }


    /**
    * 删除所有数据
    */
    public static removeAll() {
        Storage.checkInstance();
        Storage.instance.removeAll();
    }

    /**
     * 是否存在某个键值对
     *
     * @param key 名称
     */
    public static exist(key: string): boolean {
        Storage.checkInstance();
        return Storage.instance.exist(key);
    }


    protected set(key: string, value: Object) {
        this.call("set", key, value);
    }


    protected get(key: string): any {
        return this.call("get", key);
    }

    protected remove(key: string) {
        this.call("remove", key);
    }

    protected removeAll() {
        this.call("removeAll");
    }

    protected exist(key: string): boolean {
        let value: boolean = this.call("exist", key);
        return value;
    }

}