import { HummerComponent } from "../../HummerComponent"

const HUMMER = __Hummer__;
export class Storage extends HummerComponent {


    public constructor(props: any = {}) {
        super("Storage", props,false);
    }

    protected static get instance(): Storage {
        if (!HUMMER.__storage__) {
            HUMMER.__storage__ = new Storage();
        }
        return HUMMER.__storage__
    }


    /**
     * 保存键值对
     *
     * @param key 名称
     * @param value 值
     */
    public static set(key: string, value: string, cb?: Function) {
        return Storage.instance.set(key, value, cb);
    }

    /**
    * 获取键对应的值
    *
    * @param key 名称
    * @return value 值
    */
    public static get(key: string, cb: Function): any {
        return Storage.instance.get(key, cb);
    }



    /**
     * 删除键值对
     *
     * @param key 名称
     */
    public static remove(key: string, cb?: Function) {
        return Storage.instance.remove(key, cb);
    }


    /**
    * 删除所有数据
    */
    public static removeAll(cb?: Function) {
        return Storage.instance.removeAll(cb);
    }

    /**
     * 是否存在某个键值对
     *
     * @param key 名称
     */
    public static exist(key: string, cb?: Function): boolean {
        return Storage.instance.exist(key, cb);
    }


    protected set(key: string, value: string, cb?: Function) {
        return this.call("set", key, value, cb);
    }


    protected get(key: string, cb?: Function): any {
        return this.call("get", key, cb);
    }

    protected remove(key: string, cb?: Function) {
        return this.call("remove", key, cb);
    }

    protected removeAll(cb?: Function) {
        return this.call("removeAll", cb);
    }

    protected exist(key: string, cb?: Function): boolean {
        return this.call("exist", key, cb)
    }

}