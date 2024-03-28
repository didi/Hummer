import { HummerComponent } from "../../HummerComponent"

const HUMMER = __Hummer__;

export class Memory extends HummerComponent {

    public constructor(props: any = {}) {
        super("Memory", props);
    }

    protected static newInstance(): Memory {
        return new Memory();
    }

    protected static checkInstance() {
        if (!HUMMER.__memory__) {
            HUMMER.__memory__ = Memory.newInstance();
        }
    }

    static get instance(): Memory {
        return HUMMER.__memory__
    }


    /**
     * 保存键值对
     *
     * @param key 名称
     * @param value 值
     */
    static set(key: string, value: Record<string, any>, cb?: Function) {
        Memory.checkInstance();
        Memory.instance.set(key, value, cb);
    }

    /**
    * 获取键对应的值
    *
    * @param key 名称
    * @return value 值
    */
    static get(key: string, cb?: Function): any {
        Memory.checkInstance();
        return Memory.instance.get(key, cb);
    }



    /**
     * 删除键值对
     *
     * @param key 名称
     */
    static remove(key: string, cb?: Function) {
        Memory.checkInstance();
        Memory.instance.remove(key, cb);
    }


    /**
    * 删除所有数据
    */
    public static removeAll(cb?: Function) {
        Memory.checkInstance();
        Memory.instance.removeAll(cb);
    }

    /**
     * 是否存在某个键值对
     *
     * @param key 名称
     */
    public static exist(key: string, cb?: Function) {
        Memory.checkInstance();
        return Memory.instance.exist(key, cb);
    }


    protected set(key: string, value: Record<string, any>, cb?: Function) {
        this.call("set", key, value, cb);
    }


    protected get(key: string, cb?: Function): any {
        return this.call("get", key, cb);
    }

    protected remove(key: string, cb?: Function) {
        this.call("remove", key, cb);
    }

    protected removeAll(cb?: Function) {
        this.call("removeAll", cb);
    }

    protected exist(key: string, cb?: Function) {
        return this.call("exist", key, cb);
    }

}