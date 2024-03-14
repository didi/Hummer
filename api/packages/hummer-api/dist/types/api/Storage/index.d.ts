import { HummerComponent } from "../../HummerComponent";
export declare class Storage extends HummerComponent {
    private static instance;
    constructor(props?: any);
    protected static newInstance(): Storage;
    protected static checkInstance(): void;
    static set(key: string, value: Object, cb?: Function): void;
    static get(key: string, cb: Function): any;
    static remove(key: string, cb?: Function): void;
    static removeAll(cb?: Function): void;
    static exist(key: string, cb: Function): void;
    protected set(key: string, value: Object, cb?: Function): void;
    protected get(key: string, cb: Function): any;
    protected remove(key: string, cb?: Function): void;
    protected removeAll(cb?: Function): void;
    protected exist(key: string, cb: Function): void;
}
