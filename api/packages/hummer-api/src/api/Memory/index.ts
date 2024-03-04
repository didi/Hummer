
import { HummerComponent } from "../../HummerComponent"

export class Memory extends HummerComponent {

    private static instance: Memory;

    public constructor(props: any = {}) {
        super("Memory", props);
    }

    protected static newInstance(): Memory {
        return new Memory();
    }

    protected static checkInstance() {
        if (!Memory.instance) {
            Memory.instance = Memory.newInstance();
        }
    }

    /**
     * 保存键值对
     *
     * @param key 名称
     * @param value 值
     */
    static set(key: string, value: Object) {
        Memory.checkInstance();
        Memory.instance.set(key, value);
    }

    /**
    * 获取键对应的值
    *
    * @param key 名称
    * @return value 值
    */
    static get(key: string): any {
        Memory.checkInstance();
        return Memory.instance.get(key);
    }



    /**
     * 删除键值对
     *
     * @param key 名称
     */
    static remove(key: string) {
        Memory.checkInstance();
        Memory.instance.remove(key);
    }


    /**
    * 删除所有数据
    */
    public static removeAll() {
        Memory.checkInstance();
        Memory.instance.removeAll();
    }

    /**
     * 是否存在某个键值对
     *
     * @param key 名称
     */
    public static exist(key: string): boolean {
        Memory.checkInstance();
        return Memory.instance.exist(key);
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